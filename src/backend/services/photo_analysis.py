from __future__ import annotations

import hashlib
import io
import json
from pathlib import Path
from typing import Any

from PIL import Image, UnidentifiedImageError


MAX_IMAGE_SIZE = 10 * 1024 * 1024
HASH_STORE = Path(__file__).resolve().parent.parent / "data" / "photo_hashes.json"


def _file_sha256(image_bytes: bytes) -> str:
    return hashlib.sha256(image_bytes).hexdigest()


def _load_known_hashes() -> set[str]:
    if not HASH_STORE.exists():
        return set()

    try:
        data = json.loads(HASH_STORE.read_text(encoding="utf-8"))
        if isinstance(data, list):
            return {str(item) for item in data}
    except (json.JSONDecodeError, OSError):
        pass

    return set()


def _save_hash(file_hash: str) -> None:
    known_hashes = _load_known_hashes()

    if file_hash in known_hashes:
        return

    known_hashes.add(file_hash)
    HASH_STORE.parent.mkdir(parents=True, exist_ok=True)
    HASH_STORE.write_text(
        json.dumps(sorted(known_hashes), indent=2),
        encoding="utf-8",
    )


def _analyze_water_pixels(image: Image.Image) -> dict[str, float]:
    image = image.convert("RGB")
    image.thumbnail((800, 800))
    pixels = list(image.getdata())

    if not pixels:
        return {
            "water_like_ratio": 0.0,
            "dark_wet_ratio": 0.0,
            "reflective_ratio": 0.0,
        }

    water_like = 0
    dark_wet = 0
    reflective = 0

    for red, green, blue in pixels:
        brightness = (red + green + blue) / 3

        blue_dominant = blue > red * 1.05 and blue >= green * 0.95
        low_saturation_dark = (
            brightness < 100
            and abs(red - green) < 30
            and abs(green - blue) < 35
        )
        bright_reflection = (
            brightness > 180
            and max(red, green, blue) - min(red, green, blue) < 35
        )

        if blue_dominant:
            water_like += 1

        if low_saturation_dark:
            dark_wet += 1

        if bright_reflection:
            reflective += 1

    total = len(pixels)

    return {
        "water_like_ratio": round(water_like / total, 4),
        "dark_wet_ratio": round(dark_wet / total, 4),
        "reflective_ratio": round(reflective / total, 4),
    }


def _analyze_spatial_water(image: Image.Image) -> dict[str, float]:
    image = image.convert("RGB").copy()
    image.thumbnail((80, 80))

    width, height = image.size

    if width == 0 or height == 0:
        return {
            "largest_water_region_ratio": 0.0,
            "water_region_count": 0,
        }

    water_mask = []

    for y in range(height):
        row = []

        for x in range(width):
            red, green, blue = image.getpixel((x, y))

            brightness = (red + green + blue) / 3
            saturation = max(red, green, blue) - min(red, green, blue)

            blue_water = (
                blue > red * 1.05
                and blue >= green * 0.95
                and blue > 70
            )

            dark_neutral = (
                brightness < 100
                and saturation < 45
            )

            row.append(blue_water or dark_neutral)

        water_mask.append(row)

    visited = set()
    regions: list[int] = []

    for start_y in range(height):
        for start_x in range(width):
            if not water_mask[start_y][start_x]:
                continue

            if (start_x, start_y) in visited:
                continue

            stack = [(start_x, start_y)]
            visited.add((start_x, start_y))
            region_size = 0

            while stack:
                x, y = stack.pop()
                region_size += 1

                for next_x, next_y in (
                    (x + 1, y),
                    (x - 1, y),
                    (x, y + 1),
                    (x, y - 1),
                ):
                    if not (0 <= next_x < width and 0 <= next_y < height):
                        continue

                    if (next_x, next_y) in visited:
                        continue

                    if not water_mask[next_y][next_x]:
                        continue

                    visited.add((next_x, next_y))
                    stack.append((next_x, next_y))

            regions.append(region_size)

    total_pixels = width * height
    largest_region = max(regions, default=0)

    return {
        "largest_water_region_ratio": round(
            largest_region / total_pixels,
            4,
        ),
        "water_region_count": len(regions),
    }

def _assess_depth_reference(
    image: Image.Image,
    water_detected: bool,
) -> dict[str, Any]:
    width, height = image.size

    if not water_detected:
        return {
            "reference_available": False,
            "reference_type": "none",
            "reference_confidence": 0,
            "note": "No water signal was detected, so depth reference assessment was not applied.",
        }

    if width < 300 or height < 300:
        return {
            "reference_available": False,
            "reference_type": "insufficient_resolution",
            "reference_confidence": 15,
            "note": "The image is too low-resolution for reliable reference-object assessment.",
        }

    return {
        "reference_available": False,
        "reference_type": "not_automatically_verified",
        "reference_confidence": 25,
        "note": (
            "A reliable physical reference such as a curb, step, vehicle, "
            "person, wall marking, or calibrated scale was not automatically verified. "
            "The prototype must not treat the visual score as a measured depth."
        ),
    }

def analyze_photo(
    image_bytes: bytes,
    filename: str | None = None,
) -> dict[str, Any]:
    if not image_bytes:
        raise ValueError("No image data was provided.")

    if len(image_bytes) > MAX_IMAGE_SIZE:
        raise ValueError("Image is too large. Maximum size is 10 MB.")

    file_hash = _file_sha256(image_bytes)

    try:
        image = Image.open(io.BytesIO(image_bytes))
        image.verify()
        image = Image.open(io.BytesIO(image_bytes))
        image.load()

    except (UnidentifiedImageError, OSError):
        raise ValueError("The uploaded file is not a valid readable image.")

    width, height = image.size
    image_format = image.format or "UNKNOWN"
    image_quality = _analyze_image_quality(image)

    known_hashes = _load_known_hashes()
    is_exact_duplicate = file_hash in known_hashes

    if not is_exact_duplicate:
        _save_hash(file_hash)

    signals = _analyze_water_pixels(image)
    spatial_signals = _analyze_spatial_water(image)

    water_score = (
        signals["water_like_ratio"] * 0.55
        + signals["dark_wet_ratio"] * 0.20
        + signals["reflective_ratio"] * 0.05
        + spatial_signals["largest_water_region_ratio"] * 0.20
    )

    flood_score = max(0, min(100, round(water_score * 100)))

    water_detected = flood_score >= 20

    if not water_detected:
        severity = "No clear water signal"
        estimated_depth_cm = 0
    elif flood_score < 40:
        severity = "Low"
        estimated_depth_cm = 10 + round(flood_score * 0.5)
    elif flood_score < 65:
        severity = "Moderate"
        estimated_depth_cm = 30 + round((flood_score - 40) * 1.2)
    else:
        severity = "High"
        estimated_depth_cm = 60 + round((flood_score - 65) * 1.5)

    confidence = max(35, min(92, round(45 + flood_score * 0.45)))

    depth_reference = _assess_depth_reference(
        image,
        water_detected,
    )

    return {
        "status": "demo",
        "mode": "DEMO / SIMULATED DATA",
        "filename": filename,
        "file_sha256": file_hash,
        "duplicate_detection": {
            "method": "SHA-256 exact file hash",
            "hash": file_hash,
            "is_exact_duplicate": is_exact_duplicate,
            "note": (
                "Exact duplicates are detected when the uploaded file has "
                "the same SHA-256 hash as a previously analyzed file. "
                "Resized, edited, or re-encoded copies may have a different hash."
            ),
        },
        "image": {
            "format": image_format,
            "width": width,
            "height": height,
            "size_bytes": len(image_bytes),
            "quality": image_quality,
        },
        "water_analysis": {
            "water_detected": water_detected,
            "water_score": flood_score,
            "estimated_depth_cm": estimated_depth_cm,
            "severity": severity,
            "confidence_percent": confidence,
            "visual_signals": {
                **signals,
                **spatial_signals,
            },
            "depth_reference": depth_reference,
        },
        "prototype_notice": (
            "Water detection and depth are prototype visual estimates. "
            "They are not validated measurements and should not be used "
            "as real emergency measurements."
        ),
    }
def _analyze_image_quality(image: Image.Image) -> dict[str, Any]:
    width, height = image.size
    pixel_count = width * height

    warnings: list[str] = []

    if width < 300 or height < 300:
        warnings.append("Image resolution is low for reliable visual analysis.")

    if pixel_count < 150000:
        warnings.append("The image contains limited visual detail.")

    return {
        "width": width,
        "height": height,
        "sufficient_resolution": not warnings,
        "warnings": warnings,
    }
