import {
  Brain,
  Database,
  Cpu,
  Map,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Data Sources",
    description:
      "Rainfall, water level, drainage, elevation, soil and community reports",
    icon: Database,
  },
  {
    title: "Data Fusion",
    description:
      "Clean, normalize and combine spatial and time-series data",
    icon: Cpu,
  },
  {
    title: "AI Models",
    description:
      "Flood-risk classification and temporal flood prediction",
    icon: Brain,
  },
  {
    title: "Explainability",
    description:
      "Identify the factors contributing to flood risk",
    icon: ShieldCheck,
  },
  {
    title: "Spatial Output",
    description:
      "Generate flood zones and flood-propagation insights",
    icon: Map,
  },
];

export default function AIInsights() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          AI Insights & System Architecture
        </h2>

        <p className="text-gray-500">
          How FloodGuard converts environmental data into
          actionable intelligence
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h3 className="text-lg font-bold mb-6">
          FloodGuard AI Pipeline
        </h3>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="flex items-center gap-4"
              >
                <div className="rounded-xl bg-blue-50 p-3">
                  <Icon className="text-blue-600" />
                </div>

                <div className="flex-1">
                  <h4 className="font-bold">
                    {step.title}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block text-gray-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">
            Risk Model
          </p>

          <p className="text-xl font-bold">
            Random Forest / XGBoost
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Planned ML integration
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">
            Temporal Model
          </p>

          <p className="text-xl font-bold">
            LSTM
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Prototype placeholder
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">
            Spatial Database
          </p>

          <p className="text-xl font-bold">
            PostgreSQL + PostGIS
          </p>

          <p className="text-xs text-gray-400 mt-2">
            API-ready architecture
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <h3 className="font-bold mb-2">
          Key Design Principle
        </h3>

        <p className="text-sm text-gray-700">
          FloodGuard does not only predict flood risk. It also
          aims to explain <strong>why</strong> an area may flood
          and translate the prediction into recommended actions.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h3 className="font-bold mb-4">
          Architecture Flow
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {[
            "Rainfall",
            "Water Level",
            "Drainage",
            "Terrain",
            "AI Prediction",
            "Risk Explanation",
            "Action",
          ].map((item, index, arr) => (
            <div key={item} className="flex items-center gap-2">
              <span className="rounded-lg bg-gray-100 px-3 py-2 font-medium">
                {item}
              </span>

              {index < arr.length - 1 && (
                <ArrowRight
                  size={16}
                  className="text-gray-400"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400">
        DEMO / Prototype architecture. ML and live data services
        can be connected through backend APIs.
      </p>
    </div>
  );
}