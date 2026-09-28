import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  Brain,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CloudRain,
  Droplets,
  Gauge,
  MapPin,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { getExplainableAI } from "../services/api";

interface ExplainableAIProps {
  onNavigate?: (page: string) => void;
}

interface AreaData {
  name: string;
  riskScore: number;
  category: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  confidence: number;
  rainfall: number;
  waterLevel: number;
  drainageUtilization: number;
  vulnerability: number;
  explanation: string;
  action: string;
}

interface BackendFactorObject {
  factor?: string;
  value?: number;
  contribution?: number;
}

interface BackendResponse {
  area?: string;
  risk_score?: number;
  category?: string;
  confidence?: number;
  factors?: string[] | BackendFactorObject[];
}

const AREA_DATA: Record<string, AreaData> = {
  "T. Nagar": {
    name: "T. Nagar",
    riskScore: 86,
    category: "CRITICAL",
    confidence: 91,
    rainfall: 72,
    waterLevel: 1.42,
    drainageUtilization: 94,
    vulnerability: 82,
    explanation:
      "High rainfall intensity combined with very high drainage utilization and elevated water level creates a critical flood-risk condition.",
    action:
      "Immediate drainage inspection, traffic diversion planning, and continuous flood monitoring are recommended.",
  },

  Velachery: {
    name: "Velachery",
    riskScore: 78,
    category: "HIGH",
    confidence: 88,
    rainfall: 65,
    waterLevel: 1.18,
    drainageUtilization: 89,
    vulnerability: 79,
    explanation:
      "Heavy rainfall, high drainage utilization, and area vulnerability increase the probability of urban flooding.",
    action:
      "Monitor drainage capacity, prepare pumping resources, and issue precautionary alerts.",
  },

  Adyar: {
    name: "Adyar",
    riskScore: 74,
    category: "HIGH",
    confidence: 86,
    rainfall: 61,
    waterLevel: 1.05,
    drainageUtilization: 84,
    vulnerability: 76,
    explanation:
      "Sustained rainfall and increasing water levels combined with high drainage utilization indicate elevated flood risk.",
    action:
      "Inspect vulnerable drainage points and maintain readiness for localized water accumulation.",
  },

  Saidapet: {
    name: "Saidapet",
    riskScore: 58,
    category: "MODERATE",
    confidence: 81,
    rainfall: 48,
    waterLevel: 0.82,
    drainageUtilization: 68,
    vulnerability: 61,
    explanation:
      "Moderate rainfall and drainage utilization produce a moderate flood-risk condition with localized vulnerability.",
    action:
      "Continue monitoring rainfall and drainage utilization for changes in risk level.",
  },

  "Anna Nagar": {
    name: "Anna Nagar",
    riskScore: 49,
    category: "MODERATE",
    confidence: 79,
    rainfall: 42,
    waterLevel: 0.68,
    drainageUtilization: 63,
    vulnerability: 55,
    explanation:
      "Current rainfall and drainage conditions indicate moderate flood susceptibility.",
    action:
      "Maintain routine monitoring and review drainage conditions if rainfall increases.",
  },

  Tambaram: {
    name: "Tambaram",
    riskScore: 36,
    category: "LOW",
    confidence: 76,
    rainfall: 31,
    waterLevel: 0.42,
    drainageUtilization: 48,
    vulnerability: 43,
    explanation:
      "Lower rainfall intensity and available drainage capacity currently result in a lower flood-risk condition.",
    action:
      "Continue normal monitoring and reassess if rainfall intensity increases.",
  },
};

const AREA_NAMES = Object.keys(AREA_DATA);

function normalizeCategory(
  category?: string
): AreaData["category"] | undefined {
  if (!category) {
    return undefined;
  }

  const normalized = category.trim().toUpperCase();

  switch (normalized) {
    case "LOW":
      return "LOW";

    case "MODERATE":
      return "MODERATE";

    case "HIGH":
      return "HIGH";

    case "CRITICAL":
      return "CRITICAL";

    default:
      return undefined;
  }
}

function normalizeFactors(
  factors?: string[] | BackendFactorObject[]
): string[] | undefined {
  if (!Array.isArray(factors)) {
    return undefined;
  }

  if (factors.length === 0) {
    return [];
  }

  if (typeof factors[0] === "string") {
    return factors as string[];
  }

  return (factors as BackendFactorObject[])
    .filter((item) => item && item.factor)
    .map((item) => {
      const name = item.factor ?? "Risk Factor";

      let valueText = "--";

      if (typeof item.value === "number") {
        if (name.toLowerCase().includes("water level")) {
          valueText = `${item.value.toFixed(2)} m`;
        } else if (name.toLowerCase().includes("rainfall")) {
          valueText = `${item.value} mm/hr`;
        } else if (
          name.toLowerCase().includes("utilization") ||
          name.toLowerCase().includes("vulnerability")
        ) {
          valueText = `${item.value}%`;
        } else {
          valueText = `${item.value}`;
        }
      }

      const contributionText =
        typeof item.contribution === "number"
          ? ` (${item.contribution}% contribution)`
          : "";

      return `${name}: ${valueText}${contributionText}`;
    });
}

export default function ExplainableAI({
  onNavigate,
}: ExplainableAIProps) {
  const [area, setArea] = useState("");
  const [showAreas, setShowAreas] = useState(false);

  const [riskScore, setRiskScore] = useState(0);
  const [category, setCategory] =
    useState<AreaData["category"]>("LOW");
  const [confidence, setConfidence] = useState(0);

  const [factors, setFactors] = useState<string[]>([]);

  const [backendLoading, setBackendLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const selectedData = area ? AREA_DATA[area] : undefined;

  const loadBackendData = useCallback(
    async (selectedArea: string) => {
      try {
        setBackendLoading(true);
        setBackendError("");

        const response =
          (await getExplainableAI()) as BackendResponse;

        /*
         * IMPORTANT:
         * Keep this selected-area safeguard.
         *
         * Backend data is applied only when the backend
         * response belongs to the area selected by the user.
         */
        if (response?.area === selectedArea) {
          if (typeof response.risk_score === "number") {
            setRiskScore(response.risk_score);
          }

          const normalizedCategory =
            normalizeCategory(response.category);

          if (normalizedCategory) {
            setCategory(normalizedCategory);
          }

          if (typeof response.confidence === "number") {
            setConfidence(response.confidence);
          }

          const normalizedFactors =
            normalizeFactors(response.factors);

          /*
           * Only replace prototype factors when valid
           * backend factors are available.
           */
          if (
            normalizedFactors &&
            normalizedFactors.length > 0
          ) {
            setFactors(normalizedFactors);
          }
        } else {
          /*
           * The selected area's prototype values remain
           * visible if the backend responds for another area.
           */
          console.warn(
            `Explainable AI response area "${response?.area}" does not match selected area "${selectedArea}".`
          );
        }
      } catch (error) {
        console.error(
          "Explainable AI backend error:",
          error
        );

        /*
         * Prototype data remains visible.
         */
        setBackendError(
          "Backend data unavailable. Showing prototype area data."
        );
      } finally {
        setBackendLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!area) {
      return;
    }

    loadBackendData(area);
  }, [area, loadBackendData]);

  const selectArea = (selectedArea: string) => {
    const data = AREA_DATA[selectedArea];

    if (!data) {
      return;
    }

    setArea(selectedArea);
    setShowAreas(false);

    /*
     * Immediately show local prototype data.
     */
    setRiskScore(data.riskScore);
    setCategory(data.category);
    setConfidence(data.confidence);

    setFactors([
      `Rainfall intensity: ${data.rainfall} mm/hr`,
      `Drainage utilization: ${data.drainageUtilization}%`,
      `Water level: ${data.waterLevel.toFixed(2)} m`,
      `Area vulnerability: ${data.vulnerability}%`,
    ]);

    setBackendError("");
  };

  const getCategoryClasses = () => {
    switch (category) {
      case "CRITICAL":
        return "bg-red-100 text-red-700 border-red-200";

      case "HIGH":
        return "bg-orange-100 text-orange-700 border-orange-200";

      case "MODERATE":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getScoreClasses = () => {
    if (category === "CRITICAL") {
      return "text-red-600";
    }

    if (category === "HIGH") {
      return "text-orange-600";
    }

    if (category === "MODERATE") {
      return "text-yellow-600";
    }

    return "text-green-600";
  };

  return (
    <div className="min-h-full bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Why This Area Will Flood?
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Explainable AI-based flood-risk reasoning
                  </p>
                </div>
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              <Brain size={14} />
              DEMO / SIMULATED AI
            </div>
          </div>
        </div>

        {/* AREA SELECTION */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>

            <h2 className="mt-3 text-lg font-bold text-slate-900">
              Select Area
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose an area to view its explainable flood-risk
              analysis.
            </p>

            <div className="relative mx-auto mt-5 max-w-md">
              <button
                type="button"
                onClick={() => setShowAreas((value) => !value)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-400"
              >
                <span>
                  {area || "Select Area"}
                </span>

                {showAreas ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {showAreas && (
                <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                  {AREA_NAMES.map((areaName) => (
                    <button
                      key={areaName}
                      type="button"
                      onClick={() => selectArea(areaName)}
                      className="block w-full border-b border-slate-100 px-4 py-3 text-left text-sm font-medium text-slate-700 last:border-b-0 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {areaName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* NOTHING BELOW BEFORE AREA IS SELECTED */}
        {!area ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <MapPin className="mx-auto h-10 w-10 text-slate-300" />

            <h3 className="mt-4 text-lg font-semibold text-slate-700">
              Select an area to begin
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Flood-risk explanation, risk factors and recommended
              actions will appear after an area is selected.
            </p>
          </div>
        ) : (
          <>
            {/* BACKEND STATUS */}
            <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                {backendLoading ? (
                  <>
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500" />
                    <span className="text-slate-600">
                      Updating with backend data...
                    </span>
                  </>
                ) : backendError ? (
                  <>
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="text-amber-700">
                      {backendError}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span className="text-green-700">
                      Prototype analysis available
                    </span>
                  </>
                )}
              </div>

              <span className="text-xs font-semibold text-slate-400">
                Selected Area: {area}
              </span>
            </div>

            {/* RISK SUMMARY */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Flood Risk Score
                    </p>

                    <p
                      className={`mt-2 text-4xl font-bold ${getScoreClasses()}`}
                    >
                      {riskScore}
                    </p>
                  </div>

                  <div className="rounded-xl bg-red-50 p-3">
                    <ShieldAlert className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Risk Category
                    </p>

                    <div
                      className={`mt-3 inline-flex rounded-full border px-3 py-1.5 text-sm font-bold ${getCategoryClasses()}`}
                    >
                      {category}
                    </div>
                  </div>

                  <div className="rounded-xl bg-orange-50 p-3">
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      AI Confidence
                    </p>

                    <p className="mt-2 text-4xl font-bold text-blue-600">
                      {confidence}%
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-3">
                    <Brain className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN ANALYSIS */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* RISK FACTORS */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-100 p-2.5">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Main Risk Factors
                    </h2>

                    <p className="text-sm text-slate-500">
                      Factors contributing to the selected area's
                      flood risk.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {factors.map((factor, index) => (
                    <div
                      key={`${factor}-${index}`}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
                        {index + 1}
                      </div>

                      <p className="text-sm font-medium leading-6 text-slate-700">
                        {factor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* EXPLANATION */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-100 p-2.5">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Area Explanation
                    </h2>

                    <p className="text-sm text-slate-500">
                      Why FloodGuard assigns this risk level.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-5">
                  <p className="text-sm leading-7 text-slate-700">
                    {selectedData?.explanation}
                  </p>
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      AI Reasoning
                    </p>

                    <p className="mt-1 text-sm leading-6 text-green-700">
                      The displayed explanation is based on the
                      selected area's rainfall, water level,
                      drainage utilization and vulnerability
                      parameters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RISK BREAKDOWN */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Gauge className="h-6 w-6 text-blue-600" />

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Risk Breakdown
                  </h2>

                  <p className="text-sm text-slate-500">
                    Key environmental and infrastructure indicators
                    for {area}.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-slate-500">
                      Rainfall
                    </span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {selectedData?.rainfall}{" "}
                    <span className="text-sm font-medium text-slate-500">
                      mm/hr
                    </span>
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-cyan-500" />
                    <span className="text-sm font-medium text-slate-500">
                      Water Level
                    </span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {selectedData?.waterLevel.toFixed(2)}{" "}
                    <span className="text-sm font-medium text-slate-500">
                      m
                    </span>
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium text-slate-500">
                      Drainage Utilization
                    </span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {selectedData?.drainageUtilization}%
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium text-slate-500">
                      Vulnerability
                    </span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {selectedData?.vulnerability}%
                  </p>
                </div>
              </div>
            </div>

            {/* RECOMMENDED ACTION */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-100 p-3">
                  <ShieldAlert className="h-6 w-6 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Recommended Prototype Action
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {selectedData?.action}
                  </p>
                </div>
              </div>
            </div>

            {/* SELECTED AREA DATA */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Selected Area Data
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Area
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {area}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Data Mode
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    MODELLED / DEMO ESTIMATE
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Risk Score
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {riskScore}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Confidence
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {confidence}%
                  </p>
                </div>
              </div>
            </div>

            {/* DEMO NOTICE */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                <div>
                  <h3 className="font-semibold text-amber-800">
                    Prototype / Demonstration Notice
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-amber-700">
                    The current area values are prototype/modelled
                    demonstration data. They are intended to
                    demonstrate the explainable AI workflow and
                    should not be interpreted as live sensor
                    measurements.
                  </p>
                </div>
              </div>
            </div>

            {/* LIVE FLOOD MAP */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-100 p-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      LIVE FLOOD MAP
                    </h2>

                    <p className="text-sm text-slate-500">
                      View the selected area's flood-risk location
                      on the GIS flood map.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate?.("Live Flood Map")
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <MapPin size={18} />
                  Open Live Flood Map
                </button>
              </div>
            </div>

            {/* FLOODGUARD SYSTEM FLOW */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-100 p-3">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    FloodGuard System Flow
                  </h2>

                  <p className="text-sm text-slate-500">
                    How FloodGuard converts environmental inputs
                    into explainable flood-risk information.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <CloudRain className="h-5 w-5 text-blue-600" />

                  <p className="mt-3 font-semibold text-slate-900">
                    Rainfall
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Rainfall intensity and predicted rainfall.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Droplets className="h-5 w-5 text-cyan-600" />

                  <p className="mt-3 font-semibold text-slate-900">
                    Water Level
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Current and predicted water accumulation.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Gauge className="h-5 w-5 text-orange-600" />

                  <p className="mt-3 font-semibold text-slate-900">
                    Drainage
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Drainage utilization and capacity.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <TrendingUp className="h-5 w-5 text-red-600" />

                  <p className="mt-3 font-semibold text-slate-900">
                    Risk Engine
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Flood-risk score and contributing factors.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <ShieldAlert className="h-5 w-5 text-green-600" />

                  <p className="mt-3 font-semibold text-slate-900">
                    Action
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Explainable recommendations for the selected
                    area.
                  </p>
                </div>
              </div>
            </div>

            {/* QUICK NAVIGATION */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-blue-600" />

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Quick Navigation
                  </h2>

                  <p className="text-sm text-slate-500">
                    Continue exploring other FloodGuard modules.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate?.("Live Flood Map")
                  }
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <MapPin className="h-5 w-5 text-blue-600" />

                  <p className="mt-2 font-semibold text-slate-900">
                    Live Flood Map
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Open GIS flood-risk map
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate?.("AI Flood Prediction")
                  }
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <Brain className="h-5 w-5 text-purple-600" />

                  <p className="mt-2 font-semibold text-slate-900">
                    AI Flood Prediction
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    View AI flood prediction
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate?.("Why This Area Will Flood?")
                  }
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <AlertTriangle className="h-5 w-5 text-orange-600" />

                  <p className="mt-2 font-semibold text-slate-900">
                    Why This Area Will Flood?
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Explainable AI risk reasoning
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate?.("AI Action Engine")
                  }
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <ShieldAlert className="h-5 w-5 text-red-600" />

                  <p className="mt-2 font-semibold text-slate-900">
                    AI Action Engine
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    View recommended actions
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate?.("What-If Simulator")
                  }
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <TrendingUp className="h-5 w-5 text-cyan-600" />

                  <p className="mt-2 font-semibold text-slate-900">
                    What-If Simulator
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Test rainfall scenarios
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate?.("Flood Digital Twin")
                  }
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <MapPin className="h-5 w-5 text-green-600" />

                  <p className="mt-2 font-semibold text-slate-900">
                    Flood Digital Twin
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Explore the digital twin
                  </p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}