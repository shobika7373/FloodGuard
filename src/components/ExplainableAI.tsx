import { useEffect, useState } from "react";
import {
  Brain,
  CloudRain,
  Waves,
  Droplets,
  Mountain,
  History,
  AlertTriangle,
  Info,
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
};

const factorIcons: Record<string, any> = {
  "Heavy Rainfall": CloudRain,
  "Water Level": Waves,
  "Drainage Utilization": Droplets,
  "Low Elevation": Mountain,
  "Historical Vulnerability": History,
};

const factorDescriptions: Record<string, string> = {
  "Heavy Rainfall":
    "High rainfall intensity increases surface runoff.",
  "Water Level":
    "Rising water levels indicate increasing flood pressure.",
  "Drainage Utilization":
    "High drainage utilization indicates increased system pressure.",
  "Low Elevation":
    "Lower-elevation areas can accumulate water more easily.",
  "Historical Vulnerability":
    "Previous flood events increase the area's vulnerability score.",
};

function getImpact(value: number) {
  if (value >= 90) return "Very High";
  if (value >= 75) return "High";
  if (value >= 50) return "Moderate";
  return "Low";
}

export default function ExplainableAI() {
  const [area, setArea] = useState("T. Nagar");
  const [riskScore, setRiskScore] = useState(86);
  const [category, setCategory] = useState("Critical");
  const [confidence, setConfidence] = useState(87);
  const [factors, setFactors] = useState<Factor[]>([]);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(false);

  useEffect(() => {
    async function loadExplainableAI() {
      try {
        setLoading(true);
        setBackendError(false);

        const response = await getExplainableAI();

        if (response?.area) {
          setArea(response.area);
        }

        if (typeof response?.risk_score === "number") {
          setRiskScore(response.risk_score);
        }

        if (response?.category) {
          setCategory(response.category);
        }

        if (typeof response?.confidence === "number") {
          setConfidence(response.confidence);
        }

        if (Array.isArray(response?.factors)) {
          const mappedFactors: Factor[] =
            response.factors.map(
              (factor: BackendFactor) => ({
                name: factor.factor,
                value: factor.value,
                contribution: factor.contribution,
                impact: getImpact(factor.value),
                icon:
                  factorIcons[factor.factor] ?? Info,
                description:
                  factorDescriptions[factor.factor] ??
                  "Backend-provided simulated risk factor.",
              })
            );

          setFactors(mappedFactors);
        }
      } catch (error) {
        console.error(
          "Explainable AI backend error:",
          error
        );

        setBackendError(true);

        setFactors([
          {
            name: "Heavy Rainfall",
            value: 78,
            impact: "High",
            contribution: 30,
            icon: CloudRain,
            description:
              "High rainfall intensity increases surface runoff.",
          },
          {
            name: "Water Level",
            value: 1.42,
            impact: "Moderate",
            contribution: 22,
            icon: Waves,
            description:
              "Rising water levels indicate increasing flood pressure.",
          },
          {
            name: "Drainage Utilization",
            value: 84,
            impact: "High",
            contribution: 18,
            icon: Droplets,
            description:
              "High drainage utilization indicates increased system pressure.",
          },
          {
            name: "Low Elevation",
            value: 72,
            impact: "Moderate",
            contribution: 12,
            icon: Mountain,
            description:
              "Lower-elevation areas can accumulate water more easily.",
          },
          {
            name: "Historical Vulnerability",
            value: 80,
            impact: "High",
            contribution: 10,
            icon: History,
            description:
              "Previous flood events increase the area's vulnerability score.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadExplainableAI();
  }, []);

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

        {/* Backend Status */}
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
              Explainable AI-based flood-risk assessment for the selected area.
            </p>
          </div>

          <div className="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-700">
            DEMO / SIMULATED DATA
          </div>
        </div>

        {/* Selected Area + Risk */}
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
                    Multiple simulated environmental factors are contributing
                    to the flood-risk score for this area.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-sm text-slate-300">
              Overall Risk Score
            </p>

            <div className="mt-3 flex items-end gap-2">
              <span className="text-6xl font-bold">
                {riskScore}
              </span>

              <span className="mb-2 text-lg text-slate-400">
                /100
              </span>
            </div>

            <div className="mt-4 inline-block rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300">
              {category}
            </div>

            <p className="mt-5 text-xs text-slate-400">
              Prototype risk score generated from simulated inputs.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Factors */}
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Main Risk Factors
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Factors contributing to the simulated flood-risk score.
              </p>
            </div>

            <div className="space-y-5">
              {factors.map((factor) => {
                const Icon = factor.icon;

                const displayValue =
                  factor.name === "Water Level"
                    ? factor.value
                    : factor.value;

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
                              {displayValue}
                              {factor.name === "Water Level"
                                ? " m"
                                : "%"}
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
                            style={{
                              width: `${
                                factor.name === "Water Level"
                                  ? Math.min(
                                      factor.value * 50,
                                      100
                                    )
                                  : Math.min(
                                      factor.value,
                                      100
                                    )
                              }%`,
                            }}
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
              AI Explanation
            </h2>

            <div className="mt-5 rounded-xl bg-indigo-50 p-5">
              <Brain className="h-6 w-6 text-indigo-600" />

              <p className="mt-4 text-sm leading-6 text-slate-700">
                The simulated assessment indicates that{" "}
                {area} has {category.toLowerCase()} flood risk.
                The backend risk factors show how rainfall, water
                level, drainage utilization and vulnerability contribute
                to the overall assessment.
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-700">
                These factors are demonstration values and should not
                be interpreted as an official flood warning.
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

        {/* Risk Breakdown */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Risk Breakdown
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-xs text-slate-500">
                Rainfall Impact
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {rainfallFactor?.contribution ?? "--"}
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 p-4">
              <p className="text-xs text-slate-500">
                Drainage Pressure
              </p>

              <p className="mt-2 text-2xl font-bold text-orange-600">
                {drainageFactor?.contribution ?? "--"}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-50 p-4">
              <p className="text-xs text-slate-500">
                Terrain Risk
              </p>

              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {elevationFactor?.contribution ?? "--"}
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-4">
              <p className="text-xs text-slate-500">
                Historical Risk
              </p>

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
              Prototype Notice
            </p>

            <p className="mt-1 text-sm text-amber-800">
              This demonstration uses simulated backend data and
              rule-based explanations. It is not an official flood
              warning or a trained production ML model.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}