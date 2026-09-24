import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Users,
  Droplets,
  Activity,
  CheckCircle,
  Clock,
  Siren,
  ArrowUpRight,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const riskTrend = [
  { time: "12 PM", risk: 38 },
  { time: "1 PM", risk: 46 },
  { time: "2 PM", risk: 55 },
  { time: "3 PM", risk: 67 },
  { time: "4 PM", risk: 74 },
  { time: "5 PM", risk: 82 },
  { time: "6 PM", risk: 86 },
];

const incidents = [
  {
    area: "T. Nagar",
    risk: "Critical",
    issue: "Rapid water accumulation",
    status: "Action Required",
  },
  {
    area: "Velachery",
    risk: "High",
    issue: "Drainage capacity exceeded",
    status: "Monitoring",
  },
  {
    area: "Saidapet",
    risk: "High",
    issue: "Low-lying road flooding",
    status: "Action Required",
  },
  {
    area: "Adyar",
    risk: "Moderate",
    issue: "Rising water level",
    status: "Monitoring",
  },
];

export default function AuthorityDashboard() {
  const [showResponsePlan, setShowResponsePlan] = useState(false);
  const [reviewedSteps, setReviewedSteps] = useState<boolean[]>(Array(5).fill(false));
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-800 to-slate-700 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Shield size={24} />
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                DEMO / SIMULATED DATA
              </span>
            </div>

            <h1 className="text-3xl font-bold">
              Authority Dashboard
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-slate-300">
              Command-centre view for monitoring flood risk, incidents,
              vulnerable areas and recommended response actions.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-5 py-4 text-center">
            <p className="text-xs text-slate-300">System Status</p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="font-semibold">Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Critical Zones</p>
            <AlertTriangle className="text-red-600" size={22} />
          </div>
          <p className="mt-2 text-3xl font-bold">3</p>
          <p className="mt-1 text-xs text-red-600">Immediate attention</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">High-Risk Areas</p>
            <MapPin className="text-orange-600" size={22} />
          </div>
          <p className="mt-2 text-3xl font-bold">8</p>
          <p className="mt-1 text-xs text-orange-600">Under monitoring</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">People at Risk</p>
            <Users className="text-purple-600" size={22} />
          </div>
          <p className="mt-2 text-3xl font-bold">24.6K</p>
          <p className="mt-1 text-xs text-purple-600">Simulated estimate</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Water Level</p>
            <Droplets className="text-blue-600" size={22} />
          </div>
          <p className="mt-2 text-3xl font-bold">1.42 m</p>
          <p className="mt-1 text-xs text-blue-600">Rising trend</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Risk Trend */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Flood Risk Trend
              </h2>
              <p className="text-sm text-gray-500">
                Simulated city risk progression
              </p>
            </div>

            <Activity className="text-blue-600" size={22} />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="risk"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Critical Decision */}
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-100 p-3 text-red-700">
              <Siren size={25} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-900">
                Priority Response
              </h2>
              <p className="text-sm text-red-700">
                AI-assisted prototype recommendation
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Priority Area</p>
                <p className="text-2xl font-bold text-gray-900">
                  T. Nagar
                </p>
              </div>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-700">
                CRITICAL
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "Deploy field response team",
                "Monitor drainage blockage",
                "Review evacuation readiness",
                "Issue authority-level warning if verified",
              ].map((action) => (
                <div
                  key={action}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <CheckCircle size={17} className="text-red-600" />
                  {action}
                </div>
              ))}
            </div>

            <button onClick={()=> setShowResponsePlan(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700">
              Review Response Plan
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Incident Table */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Active Flood Incidents
            </h2>
            <p className="text-sm text-gray-500">
              Prototype incident monitoring view
            </p>
          </div>

          <Clock className="text-gray-500" size={22} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Issue</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((incident) => (
                <tr
                  key={incident.area}
                  className="border-b last:border-0"
                >
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {incident.area}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        incident.risk === "Critical"
                          ? "bg-red-100 text-red-700"
                          : incident.risk === "High"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {incident.risk}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {incident.issue}
                  </td>

                  <td className="px-4 py-4">
                    <span className="flex items-center gap-2 text-sm">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          incident.status === "Action Required"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      {incident.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Operational Modules */}
      <div className="rounded-2xl border bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Authority Operations
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-4">
            <CheckCircle className="text-green-600" size={22} />
            <p className="mt-3 font-semibold">Monitoring</p>
            <p className="mt-1 text-sm text-gray-500">
              Flood-risk zones continuously reviewed.
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <Activity className="text-blue-600" size={22} />
            <p className="mt-3 font-semibold">Decision Support</p>
            <p className="mt-1 text-sm text-gray-500">
              AI-assisted prioritization of response actions.
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <Shield className="text-purple-600" size={22} />
            <p className="mt-3 font-semibold">Coordination</p>
            <p className="mt-1 text-sm text-gray-500">
              Designed for future integration with authorized agencies.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Prototype Notice
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          All values shown are simulated demonstration data. This dashboard
          does not represent a live government control system and does not
          independently issue emergency alerts or dispatch field teams.
          Real deployment would require verified data sources, backend
          services, authorized agencies and operational validation.
        </p>
      </div>
            {/* Response Plan Popup */}
      {showResponsePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Review Response Plan - T. Nagar</h3>
              <button onClick={() => setShowResponsePlan(false)} className="rounded-full p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "1. Verify water level with field team - T. Nagar Market area",
                "2. Check drainage pump status - Pumping station 4",
                "3. Alert traffic control - Usman Road diversion",
                "4. Prepare evacuation notice - Low-lying streets",
                "5. Confirm team deployment - Rescue team on standby"
              ].map((step, idx) => (
                <label key={idx} className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={reviewedSteps[idx]}
                    onChange={(e) => {
                      const newSteps = [...reviewedSteps];
                      newSteps[idx] = e.target.checked;
                      setReviewedSteps(newSteps);
                    }}
                    className="mt-1 h-4 w-4"
                  />
                  <span className={`text-sm ${reviewedSteps[idx]? 'line-through text-gray-400' : 'text-gray-700'}`}>{step}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowResponsePlan(false)} className="flex-1 rounded-lg border py-2.5 font-semibold">Close</button>
              <button onClick={() => { setShowResponsePlan(false); alert('Response Plan Reviewed - Demo Success! This is for SIH presentation.'); }} disabled={reviewedSteps.filter(Boolean).length < 5} className="flex-1 rounded-lg bg-green-600 py-2.5 font-semibold text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Confirm Review ({reviewedSteps.filter(Boolean).length}/5)
              </button>
            </div>
          </div>
        </div>
      )}
      {showResponsePlan && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-300">
            DEMO / SIMULATED DATA
          </div>
          <h2 className="text-2xl font-bold text-white">Priority Response Plan Review</h2>
          <p className="mt-1 text-sm text-slate-400">Prototype response planning for this simulated T. Nagar critical risk scenario.</p>
        </div>
        <button onClick={() => setShowResponsePlan(false)} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"><X size={20} /></button>
      </div>

      <div className="mt-6 space-y-3">
        {[
          "Verify water level with field team - T. Nagar Market area",
          "Check drainage pump status - Pumping station 4",
          "Alert traffic control - Usman Road diversion",
          "Prepare evacuation notice - Low-lying streets",
          "Confirm team deployment - Rescue team on standby"
        ].map((step, idx) => (
          <label key={idx} className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/50 p-3 cursor-pointer hover:bg-slate-800">
            <input type="checkbox" checked={reviewedSteps[idx]} onChange={(e) => { const ns = [...reviewedSteps]; ns[idx] = e.target.checked; setReviewedSteps(ns); }} className="mt-1 h-4 w-4" />
            <span className={`text-sm ${reviewedSteps[idx]? 'line-through text-slate-500' : 'text-slate-200'}`}>{step}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={() => setShowResponsePlan(false)} className="flex-1 rounded-lg border border-slate-700 py-2.5 font-semibold text-slate-300 hover:bg-slate-800">Close</button>
        <button onClick={() => { setShowResponsePlan(false); alert('Response Plan Reviewed - Demo Success!'); }} disabled={reviewedSteps.filter(Boolean).length < 5} className="flex-1 rounded-lg bg-green-600 py-2.5 font-semibold text-white hover:bg-green-700 disabled:opacity-50">
          Confirm Review ({reviewedSteps.filter(Boolean).length}/5)
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}