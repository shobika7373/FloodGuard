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

const factors = [
  {
    name: "Heavy Rainfall",
    value: 92,
    impact: "Very High",
    icon: CloudRain,
    description: "High rainfall intensity increases surface runoff.",
  },
  {
    name: "Water Level",
    value: 88,
    impact: "High",
    icon: Waves,
    description: "Rising water levels indicate increasing flood pressure.",
  },
  {
    name: "Drainage Utilization",
    value: 84,
    impact: "High",
    icon: Droplets,
    description: "Drainage capacity is approaching a stressed condition.",
  },
  {
    name: "Low Elevation",
    value: 79,
    impact: "High",
    icon: Mountain,
    description: "Lower-elevation areas can accumulate water more easily.",
  },
  {
    name: "Historical Vulnerability",
    value: 74,
    impact: "High",
    icon: History,
    description: "Previous flood events increase the area's vulnerability score.",
  },
];

export default function ExplainableAI({onNavigate}:{onNavigate?:(page:string) =>void}) {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
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

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm md:col-span-2">
            <p className="text-sm font-medium text-slate-500">Selected Area</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">T. Nagar</h2>
            <p className="mt-2 text-sm text-slate-500">Chennai, Tamil Nadu</p>
            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-semibold text-slate-900">Critical Flood Risk</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Multiple simulated environmental factors are contributing to elevated flood risk in this area.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-sm text-slate-300">Overall Risk Score</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-6xl font-bold">86</span>
              <span className="mb-2 text-lg text-slate-400">/100</span>
            </div>
            <div className="mt-4 inline-block rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300">
              Critical
            </div>
            <p className="mt-5 text-xs text-slate-400">
              Prototype risk score generated from simulated inputs.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Main Risk Factors</h2>
              <p className="mt-1 text-sm text-slate-500">Factors contributing to the simulated flood-risk score.</p>
            </div>
            <div className="space-y-5">
              {factors.map((factor) => {
                const Icon = factor.icon;
                return (
                  <div key={factor.name} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-slate-100 p-3">
                        <Icon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div>
                            <h3 className="font-semibold text-slate-900">{factor.name}</h3>
                            <p className="mt-1 text-xs text-slate-500">{factor.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-slate-900">{factor.value}%</p>
                            <p className="text-xs font-medium text-red-500">{factor.impact}</p>
                          </div>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-indigo-500" style={{ width: `${factor.value}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">AI Explanation</h2>
            <div className="mt-5 rounded-xl bg-indigo-50 p-5">
              <Brain className="h-6 w-6 text-indigo-600" />
              <p className="mt-4 text-sm leading-6 text-slate-700">
                The simulated assessment indicates that T. Nagar has elevated flood risk because rainfall intensity is high while drainage capacity and water levels are under pressure.
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Lower elevation and historical vulnerability further increase the overall risk score.
              </p>
            </div>
            <div className="mt-5 rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">Model Confidence</p>
              <p className="mt-2 text-3xl font-bold text-indigo-600">87%</p>
              <p className="mt-2 text-xs text-slate-500">Demonstration value only. Not a validated operational model.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Risk Breakdown</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-xs text-slate-500">Rainfall Impact</p>
              <p className="mt-2 text-2xl font-bold text-red-600">92%</p>
            </div>
            <div className="rounded-xl bg-orange-50 p-4">
              <p className="text-xs text-slate-500">Drainage Pressure</p>
              <p className="mt-2 text-2xl font-bold text-orange-600">84%</p>
            </div>
            <div className="rounded-xl bg-yellow-50 p-4">
              <p className="text-xs text-slate-500">Terrain Risk</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">79%</p>
            </div>
            <div className="rounded-xl bg-indigo-50 p-4">
              <p className="text-xs text-slate-500">Historical Risk</p>
              <p className="mt-2 text-2xl font-bold text-indigo-600">74%</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <Info className="mt-0.5 h-5 w-5 text-amber-600" />
          <div>
            <p className="font-semibold text-amber-900">Prototype Notice</p>
            <p className="mt-1 text-sm text-amber-800">
              This demonstration uses simulated data and rule-based explanations. It is not an official flood warning or a trained production ML model.
            </p>
          </div>
        </div>

        {/* Step 15: Live Flood Map Link */}
        <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-xl">
          <h3 className="text-xs font-bold tracking-widest text-gray-400">LIVE FLOOD MAP</h3>
          <p className="text-sm text-gray-300 mt-2">Explore flood-risk zones and drainage stress in the existing map.</p>
         <button onClick={() => onNavigate ? onNavigate("Live Flood Map") : window.scrollTo(0,0)} className="mt-3 text-sm font-semibold text-blue-400 hover:text-blue-300">
            [ Open Live Flood Map → ]
          </button>
        </div>
      {/* Step 16: FloodGuard System Flow */}
<div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
  <h3 className="text-lg font-bold text-slate-900">FloodGuard System Flow</h3>
  <p className="mt-1 text-xs text-slate-500">How data flows to action — prototype overview</p>

  <div className="mt-6">
    {/* Mobile: vertical, Desktop: horizontal */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">

      {[
        "Rainfall",
        "Water Levels",
        "Drainage",
        "AI / Risk Engine",
        "Explainable Risk",
        "Action Recommendation",
        "Citizen + Authority Response"
      ].map((step, i, arr) => (
        <div key={step} className="flex flex-col md:flex-row items-center w-full">
          <div className="w-full md:w-auto text-center rounded-xl bg-slate-900 text-white px-4 py-3 text-xs md:text-[11px] font-bold tracking-wide">
            {step}
          </div>

          {/* Arrow */}
          {i < arr.length - 1 && (
            <>
              <div className="md:hidden my-1 text-slate-400 text-xl">↓</div>
              <div className="hidden md:block mx-2 text-slate-400 text-xl">→</div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
</div>
        {/* Step 17: Quick Navigation */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h3 className="text-xs font-bold tracking-widest text-slate-500">QUICK NAVIGATION</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                onClick={() => onNavigate ? onNavigate(name) : window.scrollTo(0,0)}
                className="text-left rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-900 hover:text-white transition"
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