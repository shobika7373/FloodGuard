from src.backend.models.flood import FloodRiskInput
from src.backend.services.risk_engine import calculate_flood_risk


def test_low_risk():
    data = FloodRiskInput(
        rainfall=10,
        water_level=0.2,
        water_level_trend="stable",
        drainage_utilization=20,
        vulnerability=10,
    )

    result = calculate_flood_risk(data)

    assert result["risk_level"] == "LOW"
    assert result["risk_score"] == 16.0


def test_high_risk():
    data = FloodRiskInput(
        rainfall=70,
        water_level=1.2,
        water_level_trend="rising",
        drainage_utilization=70,
        vulnerability=60,
    )

    result = calculate_flood_risk(data)

    assert result["risk_level"] == "HIGH"
    assert result["risk_score"] == 69.0


def test_critical_risk():
    data = FloodRiskInput(
        rainfall=100,
        water_level=2.0,
        water_level_trend="rising",
        drainage_utilization=90,
        vulnerability=90,
    )

    result = calculate_flood_risk(data)

    assert result["risk_level"] == "CRITICAL"
    assert result["risk_score"] == 96.0


def test_rainfall_increase_changes_score():
    data_50 = FloodRiskInput(
        rainfall=50,
        water_level=1.0,
        water_level_trend="stable",
        drainage_utilization=50,
        vulnerability=50,
    )

    data_100 = FloodRiskInput(
        rainfall=100,
        water_level=1.0,
        water_level_trend="stable",
        drainage_utilization=50,
        vulnerability=50,
    )

    result_50 = calculate_flood_risk(data_50)
    result_100 = calculate_flood_risk(data_100)

    assert result_50["risk_score"] == 50.0
    assert result_100["risk_score"] == 65.0
    assert result_100["risk_score"] > result_50["risk_score"]