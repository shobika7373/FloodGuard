from typing import Optional

from pydantic import BaseModel, Field


class AssistanceRequest(BaseModel):
    request_id: Optional[str] = None
    assistance_type: str = Field(min_length=1)
    name: str
    contact: str
    location: str
    people_count: int = Field(gt=0)
    description: str
    created_at: str = ""
    priority: Optional[str] = None
    flood_risk: Optional[float] = None
    flood_risk_level: Optional[str] = None
    status: str = "Submitted"