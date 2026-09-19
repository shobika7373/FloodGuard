from ..models.flood import FloodRiskInput


def calculate_flood_risk(data: FloodRiskInput) -> dict:
    """
    Calculate a transparent rule-based flood risk score.

    The score is based on:
    - Rainfall intensity
    - Water level
    - Water level trend
    - Drainage utilization
    - Historical vulnerability
    """

    # Rainfall contribution: maximum 30 points
    rainfall_score = min(data.rainfall / 100 * 30, 30)

    # Water-level contribution: maximum 20 points
    water_level_score = min(data.water_level / 2.0 * 20, 20)

    # Drainage utilization: maximum 20 points
    drainage_score = data.drainage_utilization / 100 * 20

    # Vulnerability: maximum 20 points
    vulnerability_score = data.vulnerability / 100 * 20

    # Water-level trend: maximum 10 points
    trend_scores = {
        "rising": 10,
        "stable": 5,
        "falling": 0,
    }
    trend_score = trend_scores[data.water_level_trend]

    # Total score
    raw_score = (
        rainfall_score
        + water_level_score
        + drainage_score
        + vulnerability_score
        + trend_score
    )

    risk_score = round(min(raw_score, 100), 1)

    # Risk level
    if risk_score < 30:
        risk_level = "LOW"
    elif risk_score < 50:
        risk_level = "MODERATE"
    elif risk_score < 75:
        risk_level = "HIGH"
    else:
        risk_level = "CRITICAL"

    # Identify important contributing factors
    factors = []

    if rainfall_score >= 15:
        factors.append("High rainfall intensity")

    if water_level_score >= 10:
        factors.append("Elevated water level")

    if data.water_level_trend == "rising":
        factors.append("Water level is rising")

    if data.drainage_utilization >= 70:
        factors.append("High drainage utilization")

    if data.vulnerability >= 60:
        factors.append("High historical flood vulnerability")

    if not factors:
        factors.append("No major flood-risk factor detected")

    explanation = (
        f"The calculated flood risk is {risk_level} with a score of "
        f"{risk_score}/100. The score considers rainfall, water level, "
        f"water-level trend, drainage utilization, and historical vulnerability."
    )

    if risk_level == "CRITICAL":
        recommended_actions = [
            "Issue an immediate flood-risk warning",
            "Monitor water levels continuously",
            "Inspect drainage systems for possible blockage",
            "Prepare emergency response teams",
        ]
    elif risk_level == "HIGH":
        recommended_actions = [
            "Increase monitoring frequency",
            "Inspect nearby drainage systems",
            "Alert local response teams",
        ]
    elif risk_level == "MODERATE":
        recommended_actions = [
            "Continue monitoring rainfall and water levels",
            "Check drainage conditions",
        ]
    else:
        recommended_actions = [
            "Continue routine monitoring",
        ]

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "contributing_factors": factors,
        "explanation": explanation,
        "recommended_actions": recommended_actions,
        "prediction_horizon": "0–3 hours",
        "demo_confidence": 85.0,
        "data_mode": "DEMO / SIMULATED DATA",
    }