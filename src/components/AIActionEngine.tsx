import { useEffect, useMemo, useState } from "react";
import {
  Brain,
  Bell,
  Wrench,
  Route,
  ShieldAlert,
  CheckCircle,
  Clock,
  ArrowRight,
  X,
  Play,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getActionRecommendations } from "../services/api";
import { sendPrototypeAlert } from "../services/pushNotifications";

type Priority = "Immediate" | "High" | "Monitor";

type AreaData = {
  area: string;
  priority: Priority;
  risk: number;
  action: string;
  reason: string;
  factors: string[];
  waterDepth?: number;
  drainage?: number;
  rainfall?: number;
};

type ModalType =
  | "drainage"
  | "warning"
  | "route"
  | "simulation"
  | "monitor"
  | null;

const areas = [
  "T. Nagar",
  "Velachery",
  "Adyar",
  "Saidapet",
  "Anna Nagar",
  "Tambaram",
];

const areaData: Record<string, AreaData> = {
  "T. Nagar": {
    area: "T. Nagar",
    priority: "High",
    risk: 86,
    action: "Prepare public warning",
    reason: "High simulated flood risk with rainfall and drainage pressure.",
    factors: [
      "High simulated flood-risk score",
      "Increasing rainfall conditions",
      "Drainage pressure",
      "Low-lying urban roads",
    ],
    waterDepth: 65,
    drainage: 84,
    rainfall: 78,
  },

  Velachery: {
    area: "Velachery",
    priority: "High",
    risk: 79,
    action: "Inspect vulnerable drainage points",
    reason: "Heavy simulated rainfall and high drainage utilization.",
    factors: [
      "High simulated flood-risk score",
      "Heavy rainfall",
      "High drainage utilization",
      "Surface runoff pressure",
    ],
    waterDepth: 48,
    drainage: 76,
    rainfall: 65,
  },

  Adyar: {
    area: "Adyar",
    priority: "High",
    risk: 68,
    action: "Continue water-level monitoring",
    reason: "Simulated water levels are increasing near drainage channels.",
    factors: [
      "Elevated simulated flood risk",
      "Rising water-level condition",
      "Drainage-channel pressure",
      "Rainfall monitoring required",
    ],
    waterDepth: 28,
    drainage: 61,
    rainfall: 58,
  },

  Saidapet: {
    area: "Saidapet",
    priority: "Immediate",
    risk: 91,
    action: "Deploy drainage response team",
    reason: "Critical simulated risk with rising water level and drainage stress.",
    factors: [
      "Critical simulated flood-risk score",
      "Rising water level",
      "High drainage pressure",
      "Low-lying urban area",
    ],
    waterDepth: 42,
    drainage: 91,
    rainfall: 82,
  },

  "Anna Nagar": {
    area: "Anna Nagar",
    priority: "Monitor",
    risk: 48,
    action: "Continue monitoring conditions",
    reason: "Moderate simulated risk with increasing rainfall conditions.",
    factors: [
      "Moderate simulated flood-risk score",
      "Increasing rainfall",
      "Surface runoff",
      "Continued monitoring recommended",
    ],
    waterDepth: 22,
    rainfall: 45,
  },

  Tambaram: {
    area: "Tambaram",
    priority: "Monitor",
    risk: 52,
    action: "Monitor rainfall and drainage conditions",
    reason: "Simulated conditions indicate moderate flood exposure.",
    factors: [
      "Moderate simulated flood-risk score",
      "Rainfall monitoring",
      "Drainage observation",
      "Scenario requires continued monitoring",
    ],
  },
};

const workflow = [
  "Risk Detected",
  "Action Generated",
  "Authority Notification",
  "Citizen Warning",
  "Traffic Management",
  "Shelter Activation",
];

function getIcon(priority: Priority): LucideIcon {
  if (priority === "Immediate") return ShieldAlert;
  if (priority === "High") return Bell;
  return Clock;
}

function getPriorityClass(priority: Priority) {
  if (priority === "Immediate") {
    return "bg-red-100 text-red-700";
  }

  if (priority === "High") {
    return "bg-orange-100 text-orange-700";
  }

  return "bg-yellow-100 text-yellow-700";
}

export default function AIActionEngine() {
  const [backendActions, setBackendActions] = useState<
    Record<string, Partial<AreaData>>
  >({});
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(false);

  const [selectedArea, setSelectedArea] = useState("T. Nagar");
  const [selectedActionArea, setSelectedActionArea] = useState<string | null>(
    null
  );
  const [compareMode, setCompareMode] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    "T. Nagar",
  ]);

  const [modal, setModal] = useState<ModalType>(null);
  const [warningText, setWarningText] = useState("");
  const [inspectionNotes, setInspectionNotes] = useState("");
  const [monitorNotes, setMonitorNotes] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);

  const [simulation, setSimulation] = useState<{
    currentRisk: number;
    simulatedRisk: number;
    currentDepth?: number;
    simulatedDepth?: number;
  } | null>(null);

  useEffect(() => {
    async function loadActions() {
      try {
        setLoading(true);
        setBackendError(false);

        const response = await getActionRecommendations();

        if (Array.isArray(response?.recommendations)) {
          const mapped: Record<string, Partial<AreaData>> = {};

          response.recommendations.forEach((item: any) => {
            mapped[item.area] = {
              priority: item.priority,
              action: item.action,
            };
          });

          setBackendActions(mapped);
        }
      } catch (error) {
        console.error("AI Action Engine backend error:", error);
        setBackendError(true);
      } finally {
        setLoading(false);
      }
    }

    loadActions();
  }, []);

  const allActions = useMemo(() => {
    return areas.map((area) => {
      const base = areaData[area];
      const backend = backendActions[area];

      return {
        ...base,
        priority: backend?.priority || base.priority,
        action: backend?.action || base.action,
      };
    });
  }, [backendActions]);

  const selectedData =
    allActions.find((item) => item.area === selectedArea) ||
    allActions[0];

  const immediateCount = allActions.filter(
    (item) => item.priority === "Immediate"
  ).length;

  const highCount = allActions.filter(
    (item) => item.priority === "High"
  ).length;

  function toggleArea(area: string) {
    setSelectedAreas((current) => {
      if (current.includes(area)) {
        if (current.length === 1) return current;
        return current.filter((item) => item !== area);
      }

      return [...current, area];
    });
  }

  function openModal(type: ModalType) {
    setModal(type);
    setDraftSaved(false);

    if (type === "warning") {
      setWarningText(
        `Prototype warning for ${selectedData.area}: ${selectedData.reason}`
      );
    }

    if (type === "drainage") {
      setInspectionNotes(
        `Review simulated drainage conditions in ${selectedData.area}.`
      );
    }

    if (type === "monitor") {
      setMonitorNotes(
        `Continue reviewing simulated rainfall, water-level, and drainage conditions in ${selectedData.area}.`
      );
    }

    if (type === "simulation") {
      const currentRisk = selectedData.risk;
      const simulatedRisk = Math.max(0, currentRisk - 15);

      const currentDepth = selectedData.waterDepth;
      const simulatedDepth = currentDepth
        ? Math.max(5, currentDepth - 8)
        : undefined;

      setSimulation({
        currentRisk,
        simulatedRisk,
        currentDepth,
        simulatedDepth,
      });
    }
  }

  function getReviewModalType(action: string): ModalType {
    const normalizedAction = action.toLowerCase();

    if (normalizedAction.includes("warning")) return "warning";
    if (normalizedAction.includes("drainage")) return "drainage";
    if (normalizedAction.includes("monitor")) return "monitor";

    return "simulation";
  }

  function selectRecommendation(area: string) {
    setSelectedArea(area);
    setCompareMode(false);
    setSelectedActionArea(area);
  }

  function reviewRecommendation(item: AreaData) {
    setSelectedArea(item.area);
    setCompareMode(false);
    setSelectedActionArea(item.area);

    const reviewType = getReviewModalType(item.action);

    setModal(reviewType);
    setDraftSaved(false);

    if (reviewType === "warning") {
      setWarningText(
        `Prototype warning for ${item.area}: ${item.reason}`
      );
    }

    if (reviewType === "drainage") {
      setInspectionNotes(
        `Review simulated drainage conditions in ${item.area}.`
      );
    }

    if (reviewType === "monitor") {
      setMonitorNotes(
        `Continue reviewing simulated rainfall, water-level, and drainage conditions in ${item.area}.`
      );
    }
  }

  function closeModal() {
    setModal(null);
    setDraftSaved(false);
  }

  return (
    <div className="space-y-6">
      {/* Backend status */}
      {loading && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-900">
            Loading action recommendations...
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
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="h-7 w-7 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">
              AI Action Engine
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Convert predicted flood risk into prioritized response actions.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          DEMO / SIMULATED DATA
        </div>
      </div>

      {/* Area Selection */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Area Selection
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select one area for the AI decision or compare multiple areas.
            </p>
          </div>

          <button
            onClick={() => setCompareMode(!compareMode)}
            className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
          >
            {compareMode ? "Single Area Mode" : "Compare Multiple Areas"}
          </button>
        </div>

        {!compareMode ? (
          <div className="mt-5">
            <label className="text-sm font-semibold text-slate-700">
              Select Area
            </label>

            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none focus:border-blue-500 md:max-w-md"
            >
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <label
                key={area}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={selectedAreas.includes(area)}
                  onChange={() => toggleArea(area)}
                  className="h-4 w-4"
                />

                <span className="text-sm font-semibold text-slate-800">
                  {area}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Areas</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {areas.length}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Simulated monitored areas
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
          <p className="text-sm text-red-600">Immediate Actions</p>
          <p className="mt-2 text-3xl font-bold text-red-700">
            {immediateCount}
          </p>
          <p className="mt-2 text-xs text-red-600">
            Based on simulated conditions
          </p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <p className="text-sm text-orange-600">High Priority</p>
          <p className="mt-2 text-3xl font-bold text-orange-700">
            {highCount}
          </p>
          <p className="mt-2 text-xs text-orange-600">
            Requires monitoring and response
          </p>
        </div>
      </div>

      {/* AI Decision Card */}
      <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-red-600" />
            <h2 className="text-lg font-bold text-red-900">
              AI Decision Card
            </h2>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${getPriorityClass(
              selectedData.priority
            )}`}
          >
            {selectedData.priority.toUpperCase()}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase text-slate-500">Selected Area</p>
            <p className="mt-2 text-xl font-bold text-slate-900">
              {selectedData.area}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Risk Score</p>
            <p className="mt-2 text-xl font-bold text-red-600">
              {selectedData.risk}/100
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">Priority</p>
            <p className="mt-2 text-xl font-bold text-slate-900">
              {selectedData.priority}
            </p>
          </div>
        </div>

        {/* Why this action */}
        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-900">
            Why this action?
          </p>

          <p className="mt-2 text-sm text-slate-600">
            {selectedData.reason}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
            {selectedData.factors.map((factor) => (
              <div
                key={factor}
                className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700"
              >
                • {factor}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended action */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 p-4">
          <ArrowRight className="h-4 w-4 text-blue-600" />
          <p className="text-sm font-semibold text-blue-900">
            Recommended Action: {selectedData.action}
          </p>
        </div>

        {/* Functional buttons */}
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            onClick={() => openModal("drainage")}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <Wrench className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-slate-800">
                Inspect Drainage
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => openModal("warning")}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-slate-800">
                Create Warning
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => openModal("route")}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <Route className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-slate-800">
                View Safer Route
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => openModal("simulation")}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-slate-800">
                Run Simulation
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Multi-area comparison */}
      {compareMode && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Area Comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compact comparison of the selected simulated areas.
          </p>

          <div className="mt-5 space-y-3">
            {allActions
              .filter((item) => selectedAreas.includes(item.area))
              .sort((a, b) => b.risk - a.risk)
              .map((item) => {
                const Icon = getIcon(item.priority);

                return (
                  <div
                    key={item.area}
                    className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-bold text-slate-900">
                          {item.area}
                        </p>
                        <p className="text-sm text-slate-500">
                          {item.action}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">
                        {item.risk}/100
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getPriorityClass(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Recommended Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Recommended Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Backend recommendations combined with simulated area conditions.
        </p>

        <div className="mt-5 space-y-4">
          {allActions.map((item) => {
            const Icon = getIcon(item.priority);

            return (
              <div
                key={item.area}
                className={`rounded-lg border p-4 ${
                  item.area === selectedArea
                    ? "border-blue-300 bg-blue-50/40"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-3 lg:w-52">
                    <div className="rounded-lg bg-slate-100 p-3">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {item.area}
                      </h3>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${getPriorityClass(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-700">
                      Risk: {item.risk}/100
                    </div>

                    <p className="mt-2 text-sm text-slate-600">
                      {item.reason}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-slate-500" />
                      <p className="text-sm font-semibold text-slate-800">
                        {item.action}
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-32">
                    <button
                      type="button"
                      onClick={() => selectRecommendation(item.area)}
                      aria-pressed={selectedActionArea === item.area}
                      aria-label={
                        selectedActionArea === item.area
                          ? `${item.area} recommendation selected`
                          : `Select ${item.area} recommendation`
                      }
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        selectedActionArea === item.area
                          ? "border-blue-300 bg-blue-100 text-blue-800"
                          : "border-slate-300 text-slate-700 hover:bg-white"
                      }`}
                    >
                      {selectedActionArea === item.area
                        ? "Selected"
                        : "Select"}
                    </button>

                    {selectedActionArea === item.area && (
                      <button
                        type="button"
                        onClick={() => reviewRecommendation(item)}
                        aria-label={`Review action for ${item.area}: ${item.action}`}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Review Action
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Response Workflow */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-900">
            Response Workflow
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Example flow from flood-risk detection to coordinated response.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {workflow.map((step, index) => (
            <div
              key={step}
              className="relative rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                {index + 1}
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-800">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            {/* Drainage */}
            {modal === "drainage" && (
              <>
                <ModalHeader
                  title="Drainage Inspection Review"
                  subtitle={`Prototype inspection for ${selectedData.area}`}
                  onClose={closeModal}
                />

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoBox
                    label="Area"
                    value={selectedData.area}
                  />
                  <InfoBox
                    label="Simulated Drainage"
                    value={
                      selectedData.drainage
                        ? `${selectedData.drainage}% utilization`
                        : "Data not configured"
                    }
                  />
                </div>

                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  Inspection Notes
                </label>

                <textarea
                  value={inspectionNotes}
                  onChange={(e) => setInspectionNotes(e.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm"
                />

                {draftSaved && (
                  <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">
                    Prototype inspection draft saved locally for review.
                  </div>
                )}

                <button
                  onClick={() => setDraftSaved(true)}
                  className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Create Inspection Draft
                </button>
              </>
            )}

            {/* Warning */}
            {modal === "warning" && (
              <>
                <ModalHeader
                  title="Prototype Warning Review"
                  subtitle={`Review a simulated warning for ${selectedData.area}`}
                  onClose={closeModal}
                />

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoBox
                    label="Affected Area"
                    value={selectedData.area}
                  />
                  <InfoBox
                    label="Priority"
                    value={selectedData.priority}
                  />
                </div>

                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  Warning Message
                </label>

                <textarea
                  value={warningText}
                  onChange={(e) => setWarningText(e.target.value)}
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm"
                />

                {draftSaved && (
                  <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">
                    Prototype warning draft saved locally for review.
                  </div>
                )}

                <button
                  onClick={async () => {
                    try {
                      await sendPrototypeAlert({
                        area: selectedData.area,
                        risk: selectedData.priority,
                        riskScore: selectedData.risk,
                        action: "Issue simulated flood warning",
                        reason: selectedData.reason,
                      });

                      const notificationRisk =
                        selectedData.priority === "Immediate"
                          ? "CRITICAL"
                          : selectedData.priority === "High"
                          ? "HIGH"
                          : "MODERATE";

                      window.dispatchEvent(
                        new CustomEvent("floodguard-prototype-alert", {
                          detail: {
                            area: selectedData.area,
                            risk: notificationRisk,
                            action: "Issue simulated flood warning",
                          },
                        })
                      );
                    } catch (error) {
                      console.error(
                        "Prototype warning notification failed:",
                        error
                      );
                    }

                    setDraftSaved(true);
                  }}
                  className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Save Warning Draft
                </button>

                <p className="mt-3 text-xs text-amber-700">
                  This does not send SMS, email, or any real emergency
                  notification.
                </p>
              </>
            )}

            {/* Monitoring */}
            {modal === "monitor" && (
              <>
                <ModalHeader
                  title="Monitoring Action Review"
                  subtitle={`Review simulated monitoring for ${selectedData.area}`}
                  onClose={closeModal}
                />

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <InfoBox
                    label="Area"
                    value={selectedData.area}
                  />

                  <InfoBox
                    label="Risk Score"
                    value={`${selectedData.risk}/100`}
                  />

                  <InfoBox
                    label="Priority"
                    value={selectedData.priority}
                  />
                </div>

                <div className="mt-5 rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-900">
                    Monitoring Focus
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    {selectedData.reason}
                  </p>
                </div>

                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  Monitoring Notes
                </label>

                <textarea
                  value={monitorNotes}
                  onChange={(e) => setMonitorNotes(e.target.value)}
                  rows={4}
                  aria-label={`Monitoring notes for ${selectedData.area}`}
                  className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                {draftSaved && (
                  <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">
                    Prototype monitoring review saved locally for review.
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setDraftSaved(true)}
                  className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Monitoring Review
                </button>

                <p className="mt-3 text-xs text-amber-700">
                  This is a simulated review step and does not execute an
                  emergency action or send a real notification.
                </p>
              </>
            )}

            {/* Route */}
            {modal === "route" && (
              <>
                <ModalHeader
                  title="Simulated Safer Route"
                  subtitle={`Prototype route review for ${selectedData.area}`}
                  onClose={closeModal}
                />

                <div className="mt-5 rounded-xl bg-blue-50 p-5">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-blue-600" />

                    <div>
                      <p className="text-xs uppercase text-slate-500">
                        Starting Area
                      </p>

                      <p className="font-bold text-slate-900">
                        {selectedData.area}
                      </p>
                    </div>
                  </div>

                  <div className="my-4 ml-3 h-8 border-l-2 border-dashed border-blue-300" />

                  <div className="flex items-center gap-3">
                    <Route className="text-green-600" />

                    <div>
                      <p className="text-xs uppercase text-slate-500">
                        Prototype Destination
                      </p>

                      <p className="font-bold text-slate-900">
                        Simulated Safe Zone
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  <strong>Prototype notice:</strong> This route is simulated
                  for demonstration and is not a verified emergency route.
                  Real deployment requires current road and authority data.
                </div>
              </>
            )}

            {/* Simulation */}
            {modal === "simulation" && simulation && (
              <>
                <ModalHeader
                  title="Run Flood-Risk Simulation"
                  subtitle={`Simulated scenario for ${selectedData.area}`}
                  onClose={closeModal}
                />

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoBox
                    label="Current Risk"
                    value={`${simulation.currentRisk}/100`}
                  />

                  <InfoBox
                    label="Simulated Risk"
                    value={`${simulation.simulatedRisk}/100`}
                  />

                  {simulation.currentDepth !== undefined && (
                    <InfoBox
                      label="Current Depth"
                      value={`${simulation.currentDepth} cm`}
                    />
                  )}

                  {simulation.simulatedDepth !== undefined && (
                    <InfoBox
                      label="Simulated Depth"
                      value={`${simulation.simulatedDepth} cm`}
                    />
                  )}
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-lg bg-green-50 p-4">
                  <Play className="text-green-600" />

                  <p className="text-sm text-green-800">
                    Scenario calculation shows a simulated reduction in risk
                    after response conditions are improved.
                  </p>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  This uses the same prototype-style calculation approach as
                  the existing What-If Flood Simulator. It is not a scientific
                  flood forecast.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> Recommendations and area values are
        simulated demonstration data. They are not real emergency
        instructions. Warning drafts, inspection drafts, routes, and
        simulations do not trigger real-world services or notifications.
        Actual emergency actions should be issued only by authorized
        authorities.
      </div>
    </div>
  );
}

function ModalHeader({
  title,
  subtitle,
  onClose,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      <button
        onClick={onClose}
        className="rounded-lg p-2 hover:bg-slate-100"
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </div>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}