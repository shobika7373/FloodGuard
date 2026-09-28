from typing import Literal

from pydantic import BaseModel, Field


class FloodRiskInput(BaseModel):
    rainfall: float = Field(
        ...,
        ge=0,
        description="Rainfall intensity in mm/hr"
    )

    water_level: float = Field(
        ...,
        ge=0,
        description="Water level in metres"
    )

    water_level_trend: Literal["rising", "stable", "falling"]

    drainage_utilization: float = Field(
        ...,
        ge=0,
        le=100,
        description="Drainage utilization percentage"
    )

    vulnerability: float = Field(
        ...,
        ge=0,
        le=100,
        description="Historical flood vulnerability score"
    )


class FloodRiskResponse(BaseModel):
    risk_score: float
    risk_level: Literal["LOW", "MODERATE", "HIGH", "CRITICAL"]
    contributing_factors: list[str]
    explanation: str
    recommended_actions: list[str]
    prediction_horizon: str
    demo_confidence: float
    data_mode: str