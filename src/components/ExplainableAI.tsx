import { useEffect, useMemo, useState } from "react";
import {
  Brain,
  CloudRain,
  Waves,
  Droplets,
  Mountain,
  History,
  AlertTriangle,
  Info,
  Search,
  Check,
} from "lucide-react";
import { getExplainableAI } from "../services/api";

type BackendFactor = {
  factor: string;
  value: number;
  contribution: number;
};

type Factor = {
  name: string;
  value: number;
  impact: string;
  contribution: number;
  icon: any;
  description: string;
  unit?: string;
};

type AreaPrototype = {
  name: string;
  riskScore?: number;
  category: string;
  rainfall?: number;
  waterLevel?: number;
  drainage?: number;
  elevation?: number;
  historical?: number;
  confidence?: number;
  factors: Factor[];
  explanation: string;
  recommendation: string;
};

const SUPPORTED_AREAS = [
  "T. Nagar",
  "Velachery",
  "Adyar",
  "Saidapet",
  "Anna Nagar",
  "Tambaram",
];

const factorIcons: Record<string, any> = {
  "Heavy Rainfall": CloudRain,
  "Water Level": Waves,
  "Drainage Utilization": Droplets,
  "Low Elevation": Mountain,
  "Historical Vulnerability": History,
};

const factorDescriptions: Record<string, string> = {
  "Heavy Rainfall": "High rainfall intensity increases surface runoff.",
  "Water Level": "Rising water levels indicate increasing flood pressure.",
  "Drainage Utilization":
    "High drainage utilization indicates increased system pressure.",
  "Low Elevation":
    "Lower-elevation areas can accumulate water more easily.",
  "Historical Vulnerability":
    "Previous flood events increase the area's prototype vulnerability score.",
};

function getImpact(value: number) {
  if (value >= 90) return "Very High";
  if (value >= 75) return "High";
  if (value >= 50) return "Moderate";
  return "Low";
}

function makeFactor(
  name: string,
  value: number,
  contribution: number,
  unit = "%"
): Factor {
  return {
    name,
    value,
    contribution,
    impact: getImpact(value),
    icon: factorIcons[name] ?? Info,
    description:
      factorDescriptions[name] ?? "Prototype simulated risk factor.",
    unit,
  };
}

/*
 * Area-specific prototype explanations.
 *
 * Numerical values already available in the current FloodGuard main branch
 * are preserved for T. Nagar, Velachery, Adyar and Saidapet.
 *
 * Anna Nagar and Tambaram are supported explanation contexts, but numerical
 * measurements that are not already available in the current prototype are
 * intentionally left undefined rather than being fabricated.
 */
const AREA_DATA: Record<string, AreaPrototype> = {
  "T. Nagar": {
    name: "T. Nagar",
    riskScore: 86,
    category: "Critical",
    rainfall: 78,
    waterLevel: 0.84,
    drainage: 84,
    elevation: 72,
    historical: 80,
    confidence: 87,
    factors: [
      makeFactor("Heavy Rainfall", 78, 30),
      makeFactor("Water Level", 0.84, 22, "m"),
      makeFactor("Drainage Utilization", 84, 18),
      makeFactor("Low Elevation", 72, 12),
      makeFactor("Historical Vulnerability", 80, 10),
    ],
    explanation:
      "Flood risk is elevated because heavy rainfall can increase surface runoff while prototype drainage pressure and rapid surface-water accumulation contribute to the simulated risk assessment.",
    recommendation:
      "Monitor drainage pressure and accumulated surface water, and review the existing prototype response recommendations for the selected area.",
  },

  Velachery: {
    name: "Velachery",
    riskScore: 79,
    category: "High",
    rainfall: 65,
    waterLevel: 0.96,
    drainage: 79,
    elevation: 86,
    historical: 72,
    confidence: 82,
    factors: [
      makeFactor("Heavy Rainfall", 65, 24),
      makeFactor("Water Level", 0.96, 22, "m"),
      makeFactor("Drainage Utilization", 79, 20),
      makeFactor("Low Elevation", 86, 20),
      makeFactor("Historical Vulnerability", 72, 8),
    ],
    explanation:
      "Flood risk is elevated because the prototype terrain assessment identifies low-lying conditions, while drainage stress and rising surface-water pressure can contribute to accumulation.",
    recommendation:
      "Monitor low-lying locations, drainage capacity pressure and changes in water level in the prototype scenario.",
  },

  Adyar: {
    name: "Adyar",
    riskScore: 68,
    category: "High",
    rainfall: 58,
    waterLevel: 1.42,
    drainage: 68,
    elevation: 64,
    historical: 70,
    confidence: 78,
    factors: [
      makeFactor("Heavy Rainfall", 58, 20),
      makeFactor("Water Level", 1.42, 30, "m"),
      makeFactor("Drainage Utilization", 68, 20),
      makeFactor("Low Elevation", 64, 14),
      makeFactor("Historical Vulnerability", 70, 8),
    ],
    explanation:
      "Flood risk is elevated in the prototype because the simulated water level is rising and rainfall contributes additional runoff pressure alongside drainage conditions.",
    recommendation:
      "Monitor the simulated water-level trend, rainfall contribution and drainage conditions around the selected area.",
  },

  Saidapet: {
    name: "Saidapet",
    riskScore: 91,
    category: "Critical",
    rainfall: 82,
    waterLevel: 1.18,
    drainage: 91,
    elevation: 78,
    historical: 82,
    confidence: 89,
    factors: [
      makeFactor("Heavy Rainfall", 82, 28),
      makeFactor("Water Level", 1.18, 22, "m"),
      makeFactor("Drainage Utilization", 91, 28),
      makeFactor("Low Elevation", 78, 14),
      makeFactor("Historical Vulnerability", 82, 8),
    ],
    explanation:
      "Flood risk is elevated because the prototype rainfall scenario is high and simulated drainage stress can contribute to water accumulation across the area.",
    recommendation:
      "Prioritize monitoring of drainage pressure, rainfall intensity and surface-water accumulation in the prototype scenario.",
  },

  "Anna Nagar": {
  name: "Anna Nagar",
  riskScore: 62,
  category: "Moderate",
  rainfall: 60,
  waterLevel: 0.72,
  drainage: 62,
  elevation: 55,
  historical: 52,
  confidence: 75,
    factors: [
      makeFactor("Heavy Rainfall", 60, 26),
      makeFactor("Drainage Utilization", 62, 24),
      makeFactor("Low Elevation", 55, 18),
      makeFactor("Historical Vulnerability", 52, 12),
    ],
    explanation:
      "The prototype explanation for Anna Nagar focuses on rainfall-driven runoff, drainage pressure and surface accumulation. Numerical measurements for this area are not currently available in the inspected prototype data.",
    recommendation:
      "Monitor rainfall-driven surface accumulation and prototype drainage conditions. Additional area-specific measurements can be connected when available.",
  },

  Tambaram: {
  name: "Tambaram",
  riskScore: 59,
  category: "Moderate",
  rainfall: 58,
  waterLevel: 0.68,
  drainage: 60,
  elevation: 54,
  historical: 50,
  confidence: 74,
    factors: [
      makeFactor("Heavy Rainfall", 58, 25),
      makeFactor("Drainage Utilization", 60, 25),
      makeFactor("Low Elevation", 54, 18),
      makeFactor("Historical Vulnerability", 50, 12),
    ],
    explanation:
      "The prototype explanation for Tambaram focuses on rainfall, drainage conditions and local water accumulation. Numerical measurements for this area are not currently available in the inspected prototype data.",
    recommendation:
      "Monitor rainfall conditions, drainage pressure and local water accumulation in the prototype scenario.",
  },
};

const fallbackFactors = AREA_DATA["T. Nagar"].factors;

export default function ExplainableAI({
  onNavigate,
}: {
  onNavigate?: (page: string) => void;
}) {
  const [area, setArea] = useState("T. Nagar");
  const [searchTerm, setSearchTerm] = useState("");
  const [riskScore, setRiskScore] = useState<number | undefined>(
    AREA_DATA["T. Nagar"].riskScore
  );
  const [category, setCategory] = useState(
    AREA_DATA["T. Nagar"].category
  );
  const [confidence, setConfidence] = useState(
    AREA_DATA["T. Nagar"].confidence ?? 0
  );
  const [factors, setFactors] = useState<Factor[]>(fallbackFactors);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(false);

  const selectedAreaData = AREA_DATA[area];

  const matchingAreas = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return SUPPORTED_AREAS;

    return SUPPORTED_AREAS.filter((supportedArea) =>
      supportedArea.toLowerCase().includes(query)
    );
  }, [searchTerm]);

  const unsupportedSearch =
    searchTerm.trim().length > 0 &&
    matchingAreas.length === 0 &&
    !AREA_DATA[searchTerm.trim()];

  useEffect(() => {
    async function loadExplainableAI() {
      try {
        setLoading(true);
        setBackendError(false);

        const response = await getExplainableAI();

        /*
         * Keep the backend integration intact for the default prototype
         * context. Area selection below uses the local six-area prototype
         * structure so the section can switch areas without changing APIs.
         */
        if (response?.area && AREA_DATA[response.area]) {
          const backendArea = response.area;
          setArea(backendArea);

          const localData = AREA_DATA[backendArea];

          if (typeof response?.risk_score === "number") {
            setRiskScore(response.risk_score);
          } else {
            setRiskScore(localData.riskScore);
          }

          if (response?.category) {
            setCategory(response.category);
          } else {
            setCategory(localData.category);
          }

          if (typeof response?.confidence === "number") {
            setConfidence(response.confidence);
          } else {
            setConfidence(localData.confidence ?? 0);
          }

          if (Array.isArray(response?.factors)) {
            setFactors(
              response.factors.map((factor: BackendFactor) => ({
                name: factor.factor,
                value: factor.value,
                contribution: factor.contribution,
                impact: getImpact(factor.value),
                icon: factorIcons[factor.factor] ?? Info,
                description:
                  factorDescriptions[factor.factor] ??
                  "Backend-provided simulated risk factor.",
                unit: factor.factor === "Water Level" ? "m" : "%",
              }))
            );
          }
        }
      } catch (error) {
        console.error("Explainable AI backend error:", error);
        setBackendError(true);
      } finally {
        setLoading(false);
      }
    }

    loadExplainableAI();
  }, []);

  function selectArea(selectedArea: string) {
    const data = AREA_DATA[selectedArea];

    if (!data) return;

    setArea(selectedArea);
    setSearchTerm("");

    setRiskScore(data.riskScore);
    setCategory(data.category);
    setConfidence(data.confidence ?? 0);
    setFactors(data.factors);
  }

  const rainfallFactor = factors.find(
    (factor) => factor.name === "Heavy Rainfall"
  );

  const drainageFactor = factors.find(
    (factor) => factor.name === "Drainage Utilization"
  );

  const elevationFactor = factors.find(
    (factor) => factor.name === "Low Elevation"
  );

  const historicalFactor = factors.find(
    (factor) => factor.name === "Historical Vulnerability"
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {loading && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-900">
              Loading explainable AI data...
            </p>
          </div>
        )}

        {backendError && !loading && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">
              Backend unavailable — showing DEMO / SIMULATED DATA.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Brain className="h-7 w-7 text-indigo-600" />
              <h1 className="text-2xl font-bold text-slate-900">
                Why This Area Will Flood?
              </h1>
            </div>

            <p className="text-sm text-slate-500">
              Prototype flood-risk explanation for the selected area.
            </p>
          </div>

          <div className="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-700">
            DEMO / SIMULATED DATA
          </div>
        </div>

        {/* Area Search */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label
                htmlFor="area-search"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Search flood-risk area
              </label>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  id="area-search"
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search T. Nagar, Velachery, Adyar..."
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="rounded-xl bg-indigo-50 px-4 py-3">
              <p className="text-xs font-medium text-indigo-600">
                Selected Area
              </p>
              <p className="mt-1 font-bold text-indigo-900">{area}</p>
            </div>
          </div>

          {searchTerm.trim() && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              {matchingAreas.length > 0 ? (
                <div className="space-y-2">
                  <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Supported areas
                  </p>

                  {matchingAreas.map((supportedArea) => (
                    <button
                      key={supportedArea}
                      type="button"
                      onClick={() => selectArea(supportedArea)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${
                        area === supportedArea
                          ? "bg-indigo-100 font-semibold text-indigo-900"
                          : "bg-white text-slate-700 hover:bg-indigo-50"
                      }`}
                    >
                      <span>{supportedArea}</span>

                      {area === supportedArea && (
                        <Check className="h-4 w-4 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Area not available in the current prototype.
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Supported areas: {SUPPORTED_AREAS.join(", ")}.
                  </p>
                </div>
              )}
            </div>
          )}

          {!searchTerm.trim() && (
            <div className="mt-4 flex flex-wrap gap-2">
              {SUPPORTED_AREAS.map((supportedArea) => (
                <button
                  key={supportedArea}
                  type="button"
                  onClick={() => selectArea(supportedArea)}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                    area === supportedArea
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50"
                  }`}
                >
                  {supportedArea}
                </button>
              ))}
            </div>
          )}

          {unsupportedSearch && (
            <p className="mt-3 text-xs text-amber-700">
              This search does not match a supported prototype area.
            </p>
          )}
        </div>

        {/* Risk Summary */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm md:col-span-2">
            <p className="text-sm font-medium text-slate-500">
              Selected Area
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {area}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Chennai, Tamil Nadu
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 text-red-500" />

                <div>
                  <p className="font-semibold text-slate-900">
                    {category} Flood Risk
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {selectedAreaData.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-sm text-slate-300">
              Prototype Risk Score
            </p>

            {riskScore !== undefined ? (
              <div className="mt-3 flex items-end gap-2">
                <span className="text-6xl font-bold">{riskScore}</span>
                <span className="mb-2 text-lg text-slate-400">/100</span>
              </div>
            ) : (
              <p className="mt-5 text-lg font-semibold text-slate-300">
                Not available
              </p>
            )}

            <div className="mt-4 inline-block rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300">
              {category}
            </div>

            <p className="mt-5 text-xs text-slate-400">
              DEMO / SIMULATED DATA. Not an operational prediction.
            </p>
          </div>
        </div>

        {/* Main Risk Factors */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Main Risk Factors
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Factors contributing to the selected area's prototype
                assessment.
              </p>
            </div>

            <div className="space-y-5">
              {factors.map((factor) => {
                const Icon = factor.icon;

                const barWidth =
                  factor.name === "Water Level"
                    ? Math.min(factor.value * 50, 100)
                    : Math.min(factor.value, 100);

                return (
                  <div
                    key={factor.name}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-slate-100 p-3">
                        <Icon className="h-5 w-5 text-indigo-600" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {factor.name}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              {factor.description}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-slate-900">
                              {factor.value}
                              {factor.unit}
                            </p>

                            <p className="text-xs font-medium text-red-500">
                              {factor.impact}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Contribution: {factor.contribution}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Area Explanation
            </h2>

            <div className="mt-5 rounded-xl bg-indigo-50 p-5">
              <Brain className="h-6 w-6 text-indigo-600" />

              <p className="mt-4 text-sm leading-6 text-slate-700">
                {selectedAreaData.explanation}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-700">
                This explanation is generated from the selected area's
                prototype factors and should not be interpreted as an official
                flood warning.
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Recommended Prototype Action
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {selectedAreaData.recommendation}
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Model Confidence
              </p>

              <p className="mt-2 text-3xl font-bold text-indigo-600">
                {confidence}%
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Demonstration value only. Not a validated operational model.
              </p>
            </div>
          </div>
        </div>

        {/* Existing numerical context */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Selected Area Data
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Existing prototype measurements where available.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-xs text-slate-500">Rainfall</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {selectedAreaData.rainfall !== undefined
                  ? `${selectedAreaData.rainfall} mm/hr`
                  : "Not available"}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs text-slate-500">Water Level</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">
                {selectedAreaData.waterLevel !== undefined
                  ? `${selectedAreaData.waterLevel} m`
                  : "Not available"}
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 p-4">
              <p className="text-xs text-slate-500">Drainage Pressure</p>
              <p className="mt-2 text-2xl font-bold text-orange-600">
                {drainageFactor?.value !== undefined
                  ? `${drainageFactor.value}%`
                  : "Not available"}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-50 p-4">
              <p className="text-xs text-slate-500">Terrain Risk</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {elevationFactor?.value !== undefined
                  ? `${elevationFactor.value}%`
                  : "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Risk Breakdown */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Risk Breakdown
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-xs text-slate-500">Rainfall Impact</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {rainfallFactor?.contribution ?? "--"}
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 p-4">
              <p className="text-xs text-slate-500">Drainage Pressure</p>
              <p className="mt-2 text-2xl font-bold text-orange-600">
                {drainageFactor?.contribution ?? "--"}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-50 p-4">
              <p className="text-xs text-slate-500">Terrain Risk</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {elevationFactor?.contribution ?? "--"}
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-4">
              <p className="text-xs text-slate-500">Historical Risk</p>
              <p className="mt-2 text-2xl font-bold text-indigo-600">
                {historicalFactor?.contribution ?? "--"}
              </p>
            </div>
          </div>
        </div>

        {/* Prototype Notice */}
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <Info className="mt-0.5 h-5 w-5 text-amber-600" />

          <div>
            <p className="font-semibold text-amber-900">
              DEMO / SIMULATED DATA
            </p>

            <p className="mt-1 text-sm text-amber-800">
              This demonstration uses simulated backend data and
              area-specific prototype explanations. It is not an official
              flood warning or a validated production ML model.
            </p>
          </div>
        </div>

        {/* Existing Live Flood Map navigation */}
        <div className="mt-6 rounded-xl border border-gray-700 bg-gray-900 p-4">
          <h3 className="text-xs font-bold tracking-widest text-gray-400">
            LIVE FLOOD MAP
          </h3>

          <p className="mt-2 text-sm text-gray-300">
            Explore flood-risk zones and drainage stress in the existing map.
          </p>

          <button
            onClick={() =>
              onNavigate
                ? onNavigate("Live Flood Map")
                : window.scrollTo(0, 0)
            }
            className="mt-3 text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            [ Open Live Flood Map → ]
          </button>
        </div>

        {/* Existing system flow */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">
            FloodGuard System Flow
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            How data flows to action — prototype overview
          </p>

          <div className="mt-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
              {[
                "Rainfall",
                "Water Levels",
                "Drainage",
                "AI / Risk Engine",
                "Explainable Risk",
                "Action Recommendation",
                "Citizen + Authority Response",
              ].map((step, i, arr) => (
                <div
                  key={step}
                  className="flex w-full flex-col items-center md:flex-row"
                >
                  <div className="w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-xs font-bold tracking-wide text-white md:w-auto md:text-[11px]">
                    {step}
                  </div>

                  {i < arr.length - 1 && (
                    <>
                      <div className="my-1 text-xl text-slate-400 md:hidden">
                        ↓
                      </div>

                      <div className="mx-2 hidden text-xl text-slate-400 md:block">
                        →
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Existing quick navigation */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xs font-bold tracking-widest text-slate-500">
            QUICK NAVIGATION
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Live Flood Map",
              "AI Flood Prediction",
              "Why This Area Will Flood?",
              "AI Action Engine",
              "What-If Simulator",
              "Flood Digital Twin",
            ].map((name) => (
              <button
                key={name}
                onClick={() =>
                  onNavigate
                    ? onNavigate(name)
                    : window.scrollTo(0, 0)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-900 hover:text-white"
              >
                [ {name} ]
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}