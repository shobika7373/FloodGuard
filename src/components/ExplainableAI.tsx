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

interface BackendResponse {
  area?: string;
  risk_score?: number;
  category?: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  confidence?: number;
  factors?: string[];
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

function getRiskClass(category: AreaData["category"]) {
  switch (category) {
    case "CRITICAL":
      return "border-red-500/40 bg-red-500/10 text-red-300";

    case "HIGH":
      return "border-orange-500/40 bg-orange-500/10 text-orange-300";

    case "MODERATE":
      return "border-yellow-500/40 bg-yellow-500/10 text-yellow-300";

    default:
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
  }
}

function getRiskBarClass(category: AreaData["category"]) {
  switch (category) {
    case "CRITICAL":
      return "bg-red-500";

    case "HIGH":
      return "bg-orange-500";

    case "MODERATE":
      return "bg-yellow-500";

    default:
      return "bg-emerald-500";
  }
}

function getRiskIcon(category: AreaData["category"]) {
  switch (category) {
    case "CRITICAL":
      return <ShieldAlert className="h-6 w-6" />;

    case "HIGH":
      return <AlertTriangle className="h-6 w-6" />;

    case "MODERATE":
      return <TrendingUp className="h-6 w-6" />;

    default:
      return <CheckCircle className="h-6 w-6" />;
  }
}

export default function ExplainableAI({
  onNavigate,
}: ExplainableAIProps) {
  const [area, setArea] = useState<string | null>(null);
  const [showAreas, setShowAreas] = useState(false);

  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [category, setCategory] =
    useState<AreaData["category"] | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);

  const [factors, setFactors] = useState<string[]>([]);

  const [backendLoading, setBackendLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const selectedAreaData = area ? AREA_DATA[area] : null;

  /*
   * Load Explainable AI data from backend
   * whenever an area is selected.
   */
  const loadBackendData = useCallback(
    async (selectedArea: string) => {
      try {
        setBackendLoading(true);
        setBackendError("");

        const response: BackendResponse =
          await getExplainableAI();

        /*
         * Apply backend values only when the backend response
         * belongs to the selected area.
         */
        if (response?.area === selectedArea) {
          if (typeof response.risk_score === "number") {
            setRiskScore(response.risk_score);
          }

          if (response.category) {
            setCategory(response.category);
          }

          if (typeof response.confidence === "number") {
            setConfidence(response.confidence);
          }

          if (Array.isArray(response.factors)) {
            setFactors(response.factors);
          }
        }
      } catch (error) {
        console.error(
          "Explainable AI backend error:",
          error
        );

        setBackendError(
          "Backend data unavailable. Showing prototype area data."
        );
      } finally {
        setBackendLoading(false);
      }
    },
    []
  );

  /*
   * Automatically load backend information
   * after an area has been selected.
   */
  useEffect(() => {
    if (!area) {
      return;
    }

    loadBackendData(area);
  }, [area, loadBackendData]);

  /*
   * Select an area from the button list.
   */
  const selectArea = (selectedArea: string) => {
    const data = AREA_DATA[selectedArea];

    if (!data) {
      return;
    }

    setArea(selectedArea);
    setShowAreas(false);

    /*
     * Show local prototype values immediately.
     * Backend values can update them after the API call.
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

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="rounded-xl bg-cyan-500/10 p-3">
                  <Brain className="h-7 w-7 text-cyan-400" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">
                    Why This Area Will Flood?
                  </h1>

                  <p className="text-sm text-slate-400">
                    Explainable AI-based flood-risk reasoning
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300">
              DEMO / SIMULATED AI
            </div>
          </div>
        </div>

        {/* AREA SELECTION */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-cyan-400" />

              <h2 className="text-lg font-semibold">
                Area Selection
              </h2>
            </div>

            <p className="mb-5 text-sm text-slate-400">
              Select an area to view its explainable flood-risk analysis.
            </p>

            {/* MAIN SELECT BUTTON */}
            <button
              type="button"
              onClick={() => setShowAreas((previous) => !previous)}
              className="mx-auto flex min-w-[240px] items-center justify-between gap-4 rounded-xl border border-cyan-500/40 bg-slate-950 px-5 py-3 text-left transition hover:border-cyan-400 hover:bg-slate-800"
            >
              <span className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-cyan-400" />

                <span
                  className={
                    area
                      ? "font-medium text-white"
                      : "font-medium text-slate-400"
                  }
                >
                  {area ?? "Select Area"}
                </span>
              </span>

              {showAreas ? (
                <ChevronUp className="h-5 w-5 text-slate-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-400" />
              )}
            </button>

            {/* AREA BUTTONS */}
            {showAreas && (
              <div className="mx-auto mt-4 grid max-w-md grid-cols-2 gap-3">
                {AREA_NAMES.map((areaName) => (
                  <button
                    key={areaName}
                    type="button"
                    onClick={() => selectArea(areaName)}
                    className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                      area === areaName
                        ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                        : "border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800"
                    }`}
                  >
                    {areaName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* NOTHING ELSE IS SHOWN UNTIL AREA IS SELECTED */}
        {area && selectedAreaData && (
          <>
            {/* BACKEND STATUS */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      backendLoading
                        ? "animate-pulse bg-yellow-400"
                        : backendError
                        ? "bg-orange-400"
                        : "bg-emerald-400"
                    }`}
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Explainable AI Data
                    </p>

                    <p className="text-xs text-slate-500">
                      {backendLoading
                        ? "Loading backend information..."
                        : backendError
                        ? backendError
                        : "Prototype analysis active"}
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-400">
                  {selectedAreaData.name}
                </span>
              </div>
            </div>

            {/* RISK SUMMARY */}
            <div className="grid gap-6 lg:grid-cols-3">

              {/* RISK SCORE */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Flood Risk Score
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      AI-derived prototype score
                    </p>
                  </div>

                  <Gauge className="h-6 w-6 text-cyan-400" />
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold">
                    {riskScore ?? "--"}
                  </span>

                  <span className="mb-2 text-slate-500">
                    / 100
                  </span>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all ${getRiskBarClass(
                      category ?? selectedAreaData.category
                    )}`}
                    style={{
                      width: `${Math.min(
                        Math.max(riskScore ?? 0, 0),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* RISK CATEGORY */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <p className="text-sm text-slate-400">
                  Risk Category
                </p>

                <div
                  className={`mt-5 flex items-center gap-4 rounded-xl border p-5 ${getRiskClass(
                    category ?? selectedAreaData.category
                  )}`}
                >
                  {getRiskIcon(
                    category ?? selectedAreaData.category
                  )}

                  <div>
                    <p className="text-2xl font-bold">
                      {category ?? selectedAreaData.category}
                    </p>

                    <p className="text-xs opacity-80">
                      Current prototype classification
                    </p>
                  </div>
                </div>
              </div>

              {/* CONFIDENCE */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      AI Confidence
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Model confidence estimate
                    </p>
                  </div>

                  <Brain className="h-6 w-6 text-purple-400" />
                </div>

                <div className="text-5xl font-bold">
                  {confidence ?? "--"}%
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{
                      width: `${Math.min(
                        Math.max(confidence ?? 0, 0),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* MAIN ANALYSIS */}
            <div className="grid gap-6 lg:grid-cols-2">

              {/* MAIN RISK FACTORS */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-lg bg-orange-500/10 p-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      Main Risk Factors
                    </h2>

                    <p className="text-xs text-slate-500">
                      Variables contributing to the AI decision
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {factors.map((factor, index) => (
                    <div
                      key={`${factor}-${index}`}
                      className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                    >
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-xs font-bold text-cyan-400">
                        {index + 1}
                      </div>

                      <p className="text-sm text-slate-300">
                        {factor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AREA EXPLANATION */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-lg bg-cyan-500/10 p-2">
                    <Brain className="h-5 w-5 text-cyan-400" />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      Area Explanation
                    </h2>

                    <p className="text-xs text-slate-500">
                      Human-readable AI reasoning
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                  <p className="text-sm leading-7 text-slate-300">
                    {selectedAreaData.explanation}
                  </p>
                </div>
              </div>
            </div>

            {/* RISK BREAKDOWN */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">
                  Risk Breakdown
                </h2>

                <p className="text-sm text-slate-500">
                  Input variables used in the prototype risk assessment
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                {/* RAINFALL */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <CloudRain className="h-5 w-5 text-cyan-400" />

                    <span className="text-sm text-slate-400">
                      Rainfall
                    </span>
                  </div>

                  <p className="text-2xl font-bold">
                    {selectedAreaData.rainfall}
                  </p>

                  <p className="text-xs text-slate-500">
                    mm/hr
                  </p>

                  <div className="mt-4 h-2 rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{
                        width: `${Math.min(
                          (selectedAreaData.rainfall / 80) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* WATER LEVEL */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-blue-400" />

                    <span className="text-sm text-slate-400">
                      Water Level
                    </span>
                  </div>

                  <p className="text-2xl font-bold">
                    {selectedAreaData.waterLevel.toFixed(2)}
                  </p>

                  <p className="text-xs text-slate-500">
                    meters
                  </p>

                  <div className="mt-4 h-2 rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${Math.min(
                          (selectedAreaData.waterLevel / 1.5) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* DRAINAGE */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-orange-400" />

                    <span className="text-sm text-slate-400">
                      Drainage Utilization
                    </span>
                  </div>

                  <p className="text-2xl font-bold">
                    {selectedAreaData.drainageUtilization}%
                  </p>

                  <p className="text-xs text-slate-500">
                    capacity utilization
                  </p>

                  <div className="mt-4 h-2 rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-orange-500"
                      style={{
                        width: `${selectedAreaData.drainageUtilization}%`,
                      }}
                    />
                  </div>
                </div>

                {/* VULNERABILITY */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 text-red-400" />

                    <span className="text-sm text-slate-400">
                      Vulnerability
                    </span>
                  </div>

                  <p className="text-2xl font-bold">
                    {selectedAreaData.vulnerability}%
                  </p>

                  <p className="text-xs text-slate-500">
                    area vulnerability index
                  </p>

                  <div className="mt-4 h-2 rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{
                        width: `${selectedAreaData.vulnerability}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RECOMMENDED ACTION */}
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="rounded-xl bg-orange-500/10 p-3">
                    <AlertTriangle className="h-6 w-6 text-orange-400" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      Recommended Prototype Action
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                      {selectedAreaData.action}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
                  AI RECOMMENDATION
                </span>
              </div>
            </div>

            {/* SELECTED AREA DATA */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="mb-5 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-cyan-400" />

                <div>
                  <h2 className="font-semibold">
                    Selected Area Data
                  </h2>

                  <p className="text-xs text-slate-500">
                    Current prototype inputs for {selectedAreaData.name}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">
                    Area
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedAreaData.name}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">
                    Risk Score
                  </p>

                  <p className="mt-1 font-semibold">
                    {riskScore}/100
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">
                    Category
                  </p>

                  <p className="mt-1 font-semibold">
                    {category}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">
                    Confidence
                  </p>

                  <p className="mt-1 font-semibold">
                    {confidence}%
                  </p>
                </div>
              </div>
            </div>

            {/* PROTOTYPE NOTICE */}
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />

                <div>
                  <p className="font-medium text-yellow-300">
                    Prototype / Demonstration Notice
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    The values shown in this Explainable AI module
                    are prototype or simulated values for demonstration.
                    They should not be interpreted as live emergency
                    measurements or official flood warnings.
                  </p>
                </div>
              </div>
            </div>

            {/* NAVIGATION */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => onNavigate?.("gis-map")}
                className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm font-medium text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/20"
              >
                <MapPin className="h-5 w-5" />
                Open Flood Map
              </button>
            </div>

            {/* SYSTEM FLOW */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="mb-5 text-lg font-semibold">
                Explainable AI System Flow
              </h2>

              <div className="grid gap-3 md:grid-cols-5">
                {[
                  "Rainfall Data",
                  "Water Level",
                  "Drainage Status",
                  "Area Vulnerability",
                  "AI Risk Explanation",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="relative rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-center"
                  >
                    <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-bold text-cyan-400">
                      {index + 1}
                    </div>

                    <p className="text-sm text-slate-300">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK NAVIGATION */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold">
                  Quick Navigation
                </h2>

                <p className="text-sm text-slate-500">
                  Continue analysis using other FloodGuard modules.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => onNavigate?.("gis-map")}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-left transition hover:border-cyan-500/50 hover:bg-slate-800"
                >
                  <MapPin className="mb-2 h-5 w-5 text-cyan-400" />

                  <p className="font-medium">
                    GIS Flood Map
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    View spatial flood-risk information
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate?.("flood-prediction")
                  }
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-left transition hover:border-cyan-500/50 hover:bg-slate-800"
                >
                  <TrendingUp className="mb-2 h-5 w-5 text-cyan-400" />

                  <p className="font-medium">
                    Flood Prediction
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Review flood prediction information
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate?.("drainage")}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-left transition hover:border-cyan-500/50 hover:bg-slate-800"
                >
                  <Gauge className="mb-2 h-5 w-5 text-cyan-400" />

                  <p className="font-medium">
                    Drainage
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Inspect drainage capacity and utilization
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