from ..models.flood import FloodRiskInput
from ..services.risk_engine import calculate_flood_risk


SAIDAPET_SCENARIO = FloodRiskInput(
    rainfall=85,
    water_level=1.6,
    water_level_trend="rising",
    drainage_utilization=88,
    vulnerability=75,
)


def get_demo_scenario() -> dict:
    result = calculate_flood_risk(SAIDAPET_SCENARIO)

    return {
        "location": "Saidapet, Chennai",
        "scenario": "Urban flood demonstration scenario",
        "inputs": SAIDAPET_SCENARIO.model_dump(),
        "risk_result": result,
    }