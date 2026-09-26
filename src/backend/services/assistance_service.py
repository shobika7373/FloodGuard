from typing import List
from datetime import datetime

from src.backend.models.assistance import AssistanceRequest


# Temporary in-memory storage for the prototype.
_assistance_requests: List[AssistanceRequest] = []


def create_assistance_request(request: AssistanceRequest) -> AssistanceRequest:
    request.request_id = f"FG-REQ-{len(_assistance_requests) + 1:03d}"
    request.created_at = datetime.now().strftime("%d %b %Y, %I:%M %p")

    if request.priority is None:
        if request.people_count >= 5 or (
            request.flood_risk is not None and request.flood_risk >= 75
        ):
            request.priority = "High"
        elif request.people_count >= 3 or (
            request.flood_risk is not None and request.flood_risk >= 50
        ):
            request.priority = "Medium"
        else:
            request.priority = "Normal"

    _assistance_requests.append(request)

    return request


def get_assistance_requests() -> List[AssistanceRequest]:
    return _assistance_requests


def update_assistance_status(
    request_id: str,
    status: str
) -> AssistanceRequest | None:
    for request in _assistance_requests:
        if request.request_id == request_id:
            request.status = status
            return request

    return None