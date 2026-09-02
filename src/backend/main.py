from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ---------------------------------------------------------
# FLOODGUARD BACKEND
# Prototype / Demo Backend
# ---------------------------------------------------------

app = FastAPI(
    title="FloodGuard API",
    description="Chennai Urban Flood Nowcasting - Prototype Backend",
    version="1.0.0",
)

# ---------------------------------------------------------
# CORS
# Allows the React frontend to communicate with this API.
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# HOME / HEALTH CHECK
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "project": "FLOODGUARD",
        "status": "Backend running",
        "mode": "DEMO / SIMULATED DATA",
    }


# ---------------------------------------------------------
# RAINFALL
# ---------------------------------------------------------

@app.get("/api/rainfall")
def get_rainfall():
    return {
        "status": "demo",
        "unit": "mm/hr",
        "data": [
            {
                "area": "T. Nagar",
                "rainfall": 78,
                "intensity": "High",
            },
            {
                "area": "Velachery",
                "rainfall": 65,
                "intensity": "Moderate",
            },
            {
                "area": "Saidapet",
                "rainfall": 82,
                "intensity": "High",
            },
            {
                "area": "Adyar",
                "rainfall": 58,
                "intensity": "Moderate",
            },
        ],
    }


# ---------------------------------------------------------
# WATER LEVELS
# ---------------------------------------------------------

@app.get("/api/water-levels")
def get_water_levels():
    return {
        "status": "demo",
        "unit": "meters",
        "data": [
            {
                "area": "Adyar",
                "level": 1.42,
                "trend": "Rising",
            },
            {
                "area": "Saidapet",
                "level": 1.18,
                "trend": "Rising",
            },
            {
                "area": "Velachery",
                "level": 0.96,
                "trend": "Stable",
            },
            {
                "area": "T. Nagar",
                "level": 0.84,
                "trend": "Rising",
            },
        ],
    }


# ---------------------------------------------------------
# FLOOD RISK
# ---------------------------------------------------------

@app.get("/api/flood-risk")
def get_flood_risk():
    return {
        "status": "demo",
        "data": [
            {
                "area": "Saidapet",
                "risk": 91,
                "category": "Critical",
            },
            {
                "area": "T. Nagar",
                "risk": 86,
                "category": "Critical",
            },
            {
                "area": "Velachery",
                "risk": 79,
                "category": "High",
            },
            {
                "area": "Adyar",
                "risk": 68,
                "category": "High",
            },
        ],
    }


# ---------------------------------------------------------
# AI FLOOD PREDICTION
# ---------------------------------------------------------

@app.get("/api/ai-prediction")
def get_ai_prediction():
    return {
        "status": "demo",
        "model": "Prototype Rule-Based Model",
        "note": "Not a trained production ML model.",
        "predictions": [
            {
                "horizon": "30 min",
                "probability": 58,
                "category": "Moderate",
            },
            {
                "horizon": "1 hour",
                "probability": 68,
                "category": "High",
            },
            {
                "horizon": "2 hours",
                "probability": 79,
                "category": "High",
            },
            {
                "horizon": "3 hours",
                "probability": 86,
                "category": "Critical",
            },
        ],
    }


# ---------------------------------------------------------
# EXPLAINABLE AI
# ---------------------------------------------------------

@app.get("/api/explainable-ai")
def get_explainable_ai():
    return {
        "status": "demo",
        "area": "T. Nagar",
        "risk_score": 86,
        "category": "Critical",
        "confidence": 87,
        "factors": [
            {
                "factor": "Heavy Rainfall",
                "value": 78,
                "contribution": 30,
            },
            {
                "factor": "Water Level",
                "value": 1.42,
                "contribution": 22,
            },
            {
                "factor": "Drainage Utilization",
                "value": 84,
                "contribution": 18,
            },
            {
                "factor": "Low Elevation",
                "value": 72,
                "contribution": 12,
            },
            {
                "factor": "Historical Vulnerability",
                "value": 80,
                "contribution": 10,
            },
        ],
    }


# ---------------------------------------------------------
# DRAINAGE INTELLIGENCE
# ---------------------------------------------------------

@app.get("/api/drainage")
def get_drainage():
    return {
        "status": "demo",
        "data": [
            {
                "area": "T. Nagar",
                "utilization": 84,
                "condition": "High Load",
            },
            {
                "area": "Saidapet",
                "utilization": 91,
                "condition": "Critical",
            },
            {
                "area": "Velachery",
                "utilization": 76,
                "condition": "High Load",
            },
            {
                "area": "Adyar",
                "utilization": 61,
                "condition": "Normal",
            },
        ],
    }


# ---------------------------------------------------------
# AI ACTION RECOMMENDATIONS
# ---------------------------------------------------------

@app.get("/api/action-recommendations")
def get_action_recommendations():
    return {
        "status": "demo",
        "recommendations": [
            {
                "area": "Saidapet",
                "priority": "Immediate",
                "action": "Deploy drainage response team",
            },
            {
                "area": "Velachery",
                "priority": "High",
                "action": "Inspect vulnerable drainage points",
            },
            {
                "area": "T. Nagar",
                "priority": "High",
                "action": "Prepare public warning",
            },
            {
                "area": "Adyar",
                "priority": "Monitor",
                "action": "Continue water-level monitoring",
            },
        ],
    }


# ---------------------------------------------------------
# COMMUNITY REPORTS
# ---------------------------------------------------------

@app.get("/api/community-reports")
def get_community_reports():
    return {
        "status": "demo",
        "summary": {
            "total_reports": 128,
            "pending": 17,
            "ai_verified": 84,
            "resolved": 62,
        },
        "reports": [
            {
                "id": "RPT-1042",
                "area": "Velachery",
                "status": "AI Verified",
                "severity": "High",
            },
            {
                "id": "RPT-1043",
                "area": "Saidapet",
                "status": "Pending",
                "severity": "Critical",
            },
            {
                "id": "RPT-1044",
                "area": "T. Nagar",
                "status": "Resolved",
                "severity": "Moderate",
            },
        ],
    }


# ---------------------------------------------------------
# EVACUATION ROUTES
# ---------------------------------------------------------

@app.get("/api/evacuation-routes")
def get_evacuation_routes():
    return {
        "status": "demo",
        "routes": [
            {
                "area": "Saidapet",
                "status": "Recommended",
                "distance_km": 1.8,
            },
            {
                "area": "Velachery",
                "status": "Recommended",
                "distance_km": 2.1,
            },
            {
                "area": "T. Nagar",
                "status": "Monitor",
                "distance_km": 1.5,
            },
        ],
    }


# ---------------------------------------------------------
# ALERTS
# ---------------------------------------------------------

@app.get("/api/alerts")
def get_alerts():
    return {
        "status": "demo",
        "active_alerts": 3,
        "alerts": [
            {
                "area": "Saidapet",
                "severity": "Critical",
                "message": "Flood risk is elevated.",
            },
            {
                "area": "T. Nagar",
                "severity": "Critical",
                "message": "Heavy rainfall and drainage stress detected.",
            },
            {
                "area": "Velachery",
                "severity": "High",
                "message": "Monitor rising flood risk.",
            },
        ],
    }


# ---------------------------------------------------------
# MAIN DASHBOARD
# ---------------------------------------------------------

@app.get("/api/dashboard")
def get_dashboard():
    return {
        "project": "FLOODGUARD",
        "city": "Chennai",
        "mode": "DEMO / SIMULATED DATA",

        "overall_risk": 86,
        "risk_category": "Critical",

        "rainfall": 78,
        "rainfall_unit": "mm/hr",

        "water_level": 1.42,
        "water_level_unit": "meters",

        "drainage_utilization": 84,
        "drainage_unit": "%",

        "prediction_3h": 86,
        "prediction_unit": "%",

        "active_alerts": 3,

        "system_status": "Prototype Operational",
    }