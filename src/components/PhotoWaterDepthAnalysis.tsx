import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import {
  AlertTriangle,
  Brain,
  Camera,
  CheckCircle,
  Droplets,
  FileImage,
  Loader2,
  MapPin,
  RefreshCw,
  Ruler,
  ShieldAlert,
  Upload,
  XCircle,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://floodguard-backend-x0sv.onrender.com"

const MAX_FILE_SIZE = 10 * 1024 * 1024;

type AnalysisResult = {
  status: string;
  mode: string;
  filename: string;
  file_sha256: string;
  duplicate_detection: {
    method: string;
    hash: string;
    is_exact_duplicate: boolean;
    note: string;
  };
  image: {
    format: string;
    width: number;
    height: number;
    size_bytes: number;
    quality: {
      width: number;
      height: number;
      sufficient_resolution: boolean;
      warnings: string[];
    };
  };
  water_analysis: {
    water_detected: boolean;
    water_score: number;
    estimated_depth_cm: number;
    severity: string;
    confidence_percent: number;
    visual_signals: {
      water_like_ratio: number;
      dark_wet_ratio: number;
      reflective_ratio: number;
      largest_water_region_ratio: number;
      water_region_count: number;
    };
    depth_reference: {
      reference_available: boolean;
      reference_type: string;
      reference_confidence: number;
      note: string;
    };
  };
  prototype_notice: string;
};

export default function PhotoWaterDepthAnalysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setResult(null);

    if (!file.type.startsWith("image/")) {
      setSelectedFile(null);
      setPreviewUrl("");
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setPreviewUrl("");
      setError("Image size must be 10 MB or smaller.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const analyzePhoto = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        `${API_BASE_URL}/api/photo-water-depth`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Photo analysis failed.",
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message} Make sure the FloodGuard backend is running.`
          : "Photo analysis failed. Make sure the FloodGuard backend is running.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl("");
    setResult(null);
    setError("");
  };

  const waterScore = result?.water_analysis.water_score ?? 0;
  const confidence = result?.water_analysis.confidence_percent ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Camera className="h-7 w-7 text-blue-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Photo Water-Depth Analysis
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Analyze a citizen-submitted photograph for prototype floodwater
            signals.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          DEMO / SIMULATED AI
        </div>
      </div>

      {/* Main Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upload */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              Upload Flood Photograph
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Upload an image showing a flooded road, street, or public area.
          </p>

          <div className="mt-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-5">
            {previewUrl ? (
              <div className="space-y-4">
                <img
                  src={previewUrl}
                  alt="Selected flood photograph preview"
                  className="max-h-72 w-full rounded-lg object-contain"
                />

                <div className="flex items-center gap-3 text-sm">
                  <FileImage className="h-5 w-5 text-blue-600" />

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">
                      {selectedFile?.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {selectedFile
                        ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[190px] flex-col items-center justify-center text-center">
                <div className="rounded-full bg-blue-100 p-4">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>

                <h3 className="mt-4 font-semibold text-slate-800">
                  Select a flood photograph
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  JPG, JPEG, PNG or another browser-supported image - Max 10 MB
                </p>
              </div>
            )}

            <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              <Upload className="h-4 w-4" />
              {selectedFile ? "Choose Another Image" : "Select Image"}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {selectedFile && !result && (
            <button
              type="button"
              onClick={analyzePhoto}
              disabled={isAnalyzing}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing Photograph...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" />
                  Analyze Photograph
                </>
              )}
            </button>
          )}

          {result && (
            <button
              type="button"
              onClick={resetAnalysis}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
              Analyze Another Image
            </button>
          )}

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 p-3">
            <MapPin className="h-4 w-4 text-slate-500" />

            <span className="text-xs text-slate-600">
              Location context can be added separately to improve future
              analysis.
            </span>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              AI Analysis Result
            </h2>
          </div>

          {!result ? (
            <div className="mt-6 flex min-h-[360px] flex-col items-center justify-center rounded-xl bg-slate-50 px-6 text-center">
              <Droplets className="h-12 w-12 text-blue-300" />

              <p className="mt-4 font-semibold text-slate-700">
                No analysis result yet
              </p>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Select an image and run the prototype analysis to see the
                backend-generated result.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {/* Depth */}
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      Prototype Estimated Water Depth
                    </p>

                    <p className="mt-1 text-4xl font-bold text-blue-900">
                      {result.water_analysis.estimated_depth_cm} cm
                    </p>
                  </div>

                  <div className="rounded-full bg-white p-4">
                    <Ruler className="h-7 w-7 text-blue-600" />
                  </div>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-blue-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${Math.min(waterScore, 100)}%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-blue-700">
                  <span>0</span>
                  <span>Water signal: {waterScore}%</span>
                  <span>100</span>
                </div>
              </div>

              {/* Severity + Confidence */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <p className="text-xs text-orange-600">
                    Flood Severity
                  </p>

                  <p className="mt-1 text-lg font-bold text-orange-700">
                    {result.water_analysis.severity}
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <p className="text-xs text-purple-600">
                    Analysis Confidence
                  </p>

                  <p className="mt-1 text-lg font-bold text-purple-700">
                    {confidence}%
                  </p>
                </div>
              </div>

              {/* Depth reference */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                  <div>
                    <p className="font-semibold text-amber-900">
                      Depth Reference Check
                    </p>

                    <p className="mt-1 text-sm text-amber-800">
                      {result.water_analysis.depth_reference.note}
                    </p>

                    <p className="mt-2 text-xs text-amber-700">
                      Reference confidence:{" "}
                      {result.water_analysis.depth_reference.reference_confidence}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Duplicate */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  {result.duplicate_detection.is_exact_duplicate ? (
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
                  ) : (
                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                  )}

                  <div>
                    <p className="font-semibold text-slate-800">
                      Exact Duplicate Check
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {result.duplicate_detection.is_exact_duplicate
                        ? "This exact file has been analyzed before."
                        : "This exact file hash has not been analyzed before."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Factors */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />

          <h2 className="text-lg font-semibold text-slate-900">
            Analysis Factors
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Visual signals currently used by the prototype backend.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <Droplets className="h-5 w-5 text-blue-600" />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Water-like Pixels
                </p>

                <p className="text-xs text-slate-500">
                  Detects visual colour and brightness patterns associated
                  with water.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <Ruler className="h-5 w-5 text-green-600" />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Spatial Water Region
                </p>

                <p className="text-xs text-slate-500">
                  Checks whether water-like pixels form connected regions.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-orange-600" />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Reference Verification
                </p>

                <p className="text-xs text-slate-500">
                  Prevents the prototype from treating an unverified visual
                  estimate as measured depth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Information */}
      {result && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Image Analysis Information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Format</p>
              <p className="mt-1 font-semibold text-slate-800">
                {result.image.format}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Dimensions</p>
              <p className="mt-1 font-semibold text-slate-800">
                {result.image.width} x {result.image.height}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Water Regions</p>
              <p className="mt-1 font-semibold text-slate-800">
                {result.water_analysis.visual_signals.water_region_count}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">File Size</p>
              <p className="mt-1 font-semibold text-slate-800">
                {(result.image.size_bytes / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>

          {result.image.quality.warnings.length > 0 && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="font-semibold text-amber-900">
                Image Quality Warnings
              </p>

              <ul className="mt-2 space-y-1 text-sm text-amber-800">
                {result.image.quality.warnings.map((warning) => (
                  <li key={warning}>- {warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Risk Assessment */}
      {result && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-600" />

              <div>
                <h2 className="font-semibold text-orange-900">
                  Prototype Flood Risk Assessment
                </h2>

                <p className="text-sm text-orange-700">
                  Based on the current visual-analysis signals.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-orange-800">
                  Prototype estimated depth
                </span>

                <strong className="text-orange-900">
                  {result.water_analysis.estimated_depth_cm} cm
                </strong>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-orange-800">
                  Risk category
                </span>

                <strong className="text-orange-900">
                  {result.water_analysis.severity}
                </strong>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-orange-800">
                  Analysis confidence
                </span>

                <strong className="text-orange-900">
                  {confidence}%
                </strong>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-200 bg-green-50 p-6">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 text-green-600" />

              <div>
                <h2 className="font-semibold text-green-900">
                  Prototype Response Guidance
                </h2>

                <p className="text-sm text-green-700">
                  Analysis should support, not replace, authorized decisions.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />

                <p className="text-sm text-green-800">
                  Cross-check the photograph with rainfall and water-level
                  information.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />

                <p className="text-sm text-green-800">
                  Treat the visual depth as an unvalidated prototype estimate.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />

                <p className="text-sm text-green-800">
                  Actual emergency action should follow authorized authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pipeline */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Photo Analysis Pipeline
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">
          {[
            "Photo Upload",
            "Image Quality Check",
            "Water Detection",
            "Depth Reference Check",
            "Risk Update",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                {index + 1}
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-800">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prototype Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>DEMO / SIMULATED DATA:</strong>{" "}
        {result?.prototype_notice ||
          "This prototype provides visual-analysis estimates only. Water depth is not a validated physical measurement, and photographic authenticity is not automatically verified."}
      </div>
    </div>
  );
}