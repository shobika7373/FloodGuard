import { useEffect, useState } from "react";
import {
  Brain,
  Bell,
  Wrench,
  Route,
  ShieldAlert,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { getActionRecommendations } from "../services/api";

type ActionItem = {
  priority: string;
  location: string;
  action: string;
  risk?: string;
  time?: string;
  reason?: string;
  icon: typeof ShieldAlert;
};

const fallbackActions: ActionItem[] = [
  {
    priority: "CRITICAL",
    location: "Saidapet",
    risk: "91/100",
    time: "Demo",
    reason: "Backend simulated critical flood condition",
    action: "Deploy drainage response team",
    icon: ShieldAlert,
  },
  {
    priority: "HIGH",
    location: "Velachery",
    risk: "Demo",
    time: "Demo",
    reason: "Backend simulated high-priority condition",
    action: "Inspect vulnerable drainage points",
    icon: Bell,
  },
  {
    priority: "HIGH",
    location: "T. Nagar",
    risk: "Demo",
    time: "Demo",
    reason: "Backend simulated high-priority condition",
    action: "Prepare public warning",
    icon: Route,
  },
  {
    priority: "MONITOR",
    location: "Adyar",
    risk: "Demo",
    time: "Demo",
    reason: "Backend simulated monitoring condition",
    action: "Continue water-level monitoring",
    icon: Clock,
  },
];

const workflow = [
  "Risk Detected",
  "Action Generated",
  "Authority Notification",
  "Citizen Warning",
  "Traffic Management",
  "Shelter Activation",
];

function getIcon(priority: string) {
  if (priority === "Immediate") return ShieldAlert;
  if (priority === "High") return Bell;
  return Clock;
}

export default function AIActionEngine() {
  const [actions, setActions] =
    useState<ActionItem[]>(fallbackActions);

  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(false);

  useEffect(() => {
    async function loadActions() {
      try {
        setLoading(true);
        setBackendError(false);

        const response = await getActionRecommendations();

        if (Array.isArray(response?.recommendations)) {
          const mappedActions: ActionItem[] =
            response.recommendations.map((item: any) => ({
              priority: item.priority,
              location: item.area,
              action: item.action,
              risk: "Backend",
              time: "Demo",
              reason:
                "Recommendation generated from simulated backend flood-risk conditions",
              icon: getIcon(item.priority),
            }));

          setActions(mappedActions);
        }
      } catch (error) {
        console.error(
          "AI Action Engine backend error:",
          error
        );

        setBackendError(true);
        setActions(fallbackActions);
      } finally {
        setLoading(false);
      }
    }

    loadActions();
  }, []);

  const criticalCount = actions.filter(
    (item) => item.priority === "Immediate"
  ).length;

  const highCount = actions.filter(
    (item) => item.priority === "High"
  ).length;

  const highestPriority =
    actions.find((item) => item.priority === "Immediate") ??
    actions.find((item) => item.priority === "High") ??
    actions[0];

  return (
    <div className="space-y-6">

      {/* Backend Status */}
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

      {/* Decision Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Actions Generated
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {actions.length}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Based on simulated flood conditions
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
          <p className="text-sm text-red-700">
            Critical Priority
          </p>

          <p className="mt-2 text-3xl font-bold text-red-700">
            {criticalCount}
          </p>

          <p className="mt-2 text-xs text-red-600">
            Backend priority: Immediate
          </p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <p className="text-sm text-orange-700">
            High Priority
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-700">
            {highCount}
          </p>

          <p className="mt-2 text-xs text-orange-600">
            Requires proactive response
          </p>
        </div>

      </div>

      {/* Main Decision Card */}
      <div className="rounded-xl border border-red-200 bg-white shadow-sm">

        <div className="border-b border-red-100 bg-red-50 p-5">

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>
              <div className="flex items-center gap-2">

                <ShieldAlert className="h-6 w-6 text-red-600" />

                <h2 className="text-lg font-bold text-red-900">
                  AI Decision Card
                </h2>

              </div>

              <p className="mt-1 text-sm text-red-700">
                Highest-priority simulated flood response recommendation.
              </p>
            </div>

            <span className="w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
              {highestPriority?.priority ?? "DEMO"}
            </span>

          </div>

        </div>

        <div className="p-5">

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

            <div>
              <p className="text-xs uppercase text-slate-500">
                Location
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {highestPriority?.location ?? "Loading"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">
                Risk
              </p>

              <p className="mt-1 text-xl font-bold text-red-600">
                {highestPriority?.risk ?? "Backend"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">
                Predicted Time
              </p>

              <p className="mt-1 text-xl font-bold text-orange-600">
                {highestPriority?.time ?? "Demo"}
              </p>
            </div>

          </div>

          <div className="mt-5 rounded-lg bg-slate-50 p-4">

            <p className="text-sm font-semibold text-slate-900">
              Why is action recommended?
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {highestPriority?.reason ??
                "Backend simulated flood-risk conditions are used to generate this recommendation."}
            </p>

          </div>

          {/* Actions */}
          <div className="mt-5">

            <p className="mb-3 text-sm font-semibold text-slate-900">
              Recommended Actions
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

              {[
                ["Inspect Drainage", Wrench],
                ["Create Warning", Bell],
                ["View Safer Route", Route],
                ["Run Simulation", Brain],
              ].map(([label, Icon]) => {

                const ActionIcon = Icon as typeof Wrench;

                return (
                  <button
                    key={label as string}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                  >

                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-blue-50 p-2">
                        <ActionIcon className="h-5 w-5 text-blue-600" />
                      </div>

                      <span className="text-sm font-semibold text-slate-800">
                        {label as string}
                      </span>

                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-400" />

                  </button>
                );
              })}

            </div>

          </div>

        </div>
      </div>

      {/* Action Recommendations */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-5">

          <h2 className="text-lg font-semibold text-slate-900">
            Prioritized Action Recommendations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Actions generated from simulated backend flood-risk conditions.
          </p>

        </div>

        <div className="divide-y divide-slate-100">

          {actions.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.location}
                className="p-5 transition hover:bg-slate-50"
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                  <div className="flex items-center gap-3 lg:w-48">

                    <div className="rounded-lg bg-slate-100 p-2">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.location}
                      </p>

                      <span
                        className={`text-xs font-bold ${
                          item.priority === "Immediate"
                            ? "text-red-600"
                            : item.priority === "High"
                            ? "text-orange-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>

                  </div>

                  <div className="lg:w-32">

                    <p className="text-xs text-slate-500">
                      Risk
                    </p>

                    <p className="font-bold text-slate-900">
                      {item.risk}
                    </p>

                  </div>

                  <div className="lg:w-32">

                    <p className="text-xs text-slate-500">
                      Time
                    </p>

                    <p className="font-semibold text-slate-700">
                      {item.time}
                    </p>

                  </div>

                  <div className="flex-1">

                    <p className="text-xs text-slate-500">
                      Reason
                    </p>

                    <p className="text-sm text-slate-700">
                      {item.reason}
                    </p>

                  </div>

                  <div className="flex-1">

                    <p className="text-xs text-slate-500">
                      Recommended Action
                    </p>

                    <p className="text-sm font-medium text-slate-900">
                      {item.action}
                    </p>

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

      {/* Prototype Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> Recommendations shown here
        are generated from simulated backend flood conditions using
        transparent rule-based logic. They are not real emergency
        instructions. Actual emergency actions should be issued only
        by authorized authorities.
      </div>

    </div>
  );
}