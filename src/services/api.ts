const API_BASE_URL = "https://floodguard-backend-x0sv.onrender.com";

async function apiGet(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`);
  }

  return response.json();
}

export function getRainfall() {
  return apiGet("/api/rainfall");
}

export function getWaterLevels() {
  return apiGet("/api/water-levels");
}

export function getFloodRisk() {
  return apiGet("/api/flood-risk");
}

export function getAIPrediction() {
  return apiGet("/api/ai-prediction");
}

export function getExplainableAI() {
  return apiGet("/api/explainable-ai");
}

export function getDrainage() {
  return apiGet("/api/drainage");
}

export function getActionRecommendations() {
  return apiGet("/api/action-recommendations");
}

export function getDashboard() {
  return apiGet("/api/dashboard");
}
