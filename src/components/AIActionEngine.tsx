import {
  Brain,
  AlertTriangle,
  Bell,
  Wrench,
  Route,
  ShieldAlert,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    priority: "CRITICAL",
    location: "Saidapet",
    risk: "91/100",
    time: "45–60 min",
    reason: "Rapid water-level rise + drainage stress",
    action: "Prioritize emergency response and official evacuation procedures",
    icon: ShieldAlert,
  },
  {
    priority: "HIGH",
    location: "Velachery",
    risk: "78/100",
    time: "1–2 hr",
    reason: "Heavy rainfall + high drainage utilization",
    action: "Issue warning and inspect vulnerable drainage points",
    icon: Bell,
  },
  {
    priority: "HIGH",
    location: "T. Nagar",
    risk: "72/100",
    time: "2–3 hr",
    reason: "Increasing rainfall + low-lying roads",
    action: "Monitor flood-prone roads and prepare alternate routes",
    icon: Route,
  },
  {
    priority: "MODERATE",
    location: "Adyar",
    risk: "48/100",
    time: "3+ hr",
    reason: "Moderate rainfall with stable water levels",
    action: "Continue monitoring rainfall and water-level trends",
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

export default function AIActionEngine() {
  return (
    <div className="space-y-6">

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
            4
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
            1
          </p>

          <p className="mt-2 text-xs text-red-600">
            Requires immediate authority attention
          </p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <p className="text-sm text-orange-700">
            High Priority
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-700">
            2
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
              CRITICAL FLOOD RISK
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
                Saidapet
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">
                Risk Score
              </p>

              <p className="mt-1 text-xl font-bold text-red-600">
                91 / 100
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">
                Predicted Time
              </p>

              <p className="mt-1 text-xl font-bold text-orange-600">
                45–60 min
              </p>
            </div>

          </div>

          <div className="mt-5 rounded-lg bg-slate-50 p-4">

            <p className="text-sm font-semibold text-slate-900">
              Why is action recommended?
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Simulated heavy rainfall, drainage stress and rapidly
              increasing water levels are combining to produce a
              high flood-risk condition.
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
            Actions generated from simulated flood-risk conditions.
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
                          item.priority === "CRITICAL"
                            ? "text-red-600"
                            : item.priority === "HIGH"
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
        are generated from simulated flood conditions using transparent
        rule-based logic. They are not real emergency instructions.
        Actual emergency actions should be issued only by authorized
        authorities.
      </div>

    </div>
  );
}