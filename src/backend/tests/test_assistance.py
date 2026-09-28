from src.backend.models.assistance import AssistanceRequest
from src.backend.services.assistance_service import (
    create_assistance_request,
    get_assistance_requests,
    update_assistance_status,
)


def test_create_assistance_request():
    request = AssistanceRequest(
        assistance_type="Medical assistance",
        name="Test User",
        contact="9876543210",
        location="T. Nagar",
        people_count=2,
        description="Need medical help",
    )

    result = create_assistance_request(request)

    assert result.request_id is not None
    assert result.status == "Submitted"
    assert result.priority == "Normal"


def test_get_assistance_requests():
    requests = get_assistance_requests()

    assert len(requests) >= 1


def test_update_assistance_status():
    request = get_assistance_requests()[0]

    updated = update_assistance_status(
        request.request_id,
        "Acknowledged",
    )

    assert updated is not None
    assert updated.status == "Acknowledged"