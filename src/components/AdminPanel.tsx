import { useState } from "react";
import {
  Users,
  Activity,
  Settings,
  Database,
  Brain,
  Server,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  X,
} from "lucide-react";

const systemModules = [
  {
    name: "Flood Risk Engine",
    description: "Processes rainfall, water level and vulnerability inputs.",
    status: "Operational",
    icon: Brain,
  },
  {
    name: "Spatial Database",
    description: "Stores flood zones and geographic information.",
    status: "Operational",
    icon: Database,
  },
  {
    name: "API Services",
    description: "Backend-ready interface for future data integration.",
    status: "Prototype",
    icon: Server,
  },
  {
    name: "Security Layer",
    description: "Role-based access concept for authorized users.",
    status: "Operational",
    icon: ShieldCheck,
  },
];

export default function AdminPanel() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");

  const [showDataSources, setShowDataSources] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);

  const [riskThreshold, setRiskThreshold] = useState(80);
  const [predictionHorizon, setPredictionHorizon] = useState("3 Hours");

  const handleRefreshSystem = () => {
    setIsRefreshing(true);
    setRefreshMessage("");

    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshMessage("System status refreshed successfully.");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-700 p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-white/15 p-3">
            <Settings size={28} />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                DEMO / SIMULATED DATA
              </span>
            </div>

            <h1 className="text-3xl font-bold">Admin Panel</h1>

            <p className="mt-2 text-sm text-indigo-100">
              Manage system configuration, platform modules and operational
              status for the FLOODGUARD prototype.
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <Activity className="text-green-600" size={22} />
          <p className="mt-3 text-sm text-gray-500">System Status</p>
          <p className="text-xl font-bold text-green-700">Operational</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <Database className="text-blue-600" size={22} />
          <p className="mt-3 text-sm text-gray-500">Data Sources</p>
          <p className="text-xl font-bold">6</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <Brain className="text-purple-600" size={22} />
          <p className="mt-3 text-sm text-gray-500">AI Modules</p>
          <p className="text-xl font-bold">4</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <Users className="text-orange-600" size={22} />
          <p className="mt-3 text-sm text-gray-500">User Roles</p>
          <p className="text-xl font-bold">3</p>
        </div>
      </div>

      {/* System Modules */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            System Modules
          </h2>

          <p className="text-sm text-gray-500">
            Current status of major FLOODGUARD components.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {systemModules.map((module) => {
            const Icon = module.icon;

            return (
              <div
                key={module.name}
                className="rounded-xl border p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="rounded-lg bg-indigo-50 p-3 text-indigo-700">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {module.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      module.status === "Operational"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {module.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Configuration */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          System Configuration
        </h2>

        <div className="mt-5 space-y-4">
          <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold">Flood Risk Threshold</p>
              <p className="text-sm text-gray-500">
                Critical risk classification threshold
              </p>
            </div>

            <span className="rounded-lg border bg-white px-4 py-2 font-semibold">
              {riskThreshold} / 100
            </span>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold">Prediction Horizon</p>
              <p className="text-sm text-gray-500">
                Prototype nowcasting window
              </p>
            </div>

            <span className="rounded-lg border bg-white px-4 py-2 font-semibold">
              {predictionHorizon}
            </span>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold">Demo Mode</p>
              <p className="text-sm text-gray-500">
                Prevents prototype values from being treated as live data
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              Enabled
            </span>
          </div>
        </div>
      </div>

      {/* Access Control */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Access Control
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <ShieldCheck className="text-red-600" size={22} />
            <p className="mt-3 font-semibold">Administrator</p>
            <p className="mt-1 text-sm text-gray-500">
              System configuration and management.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <Activity className="text-blue-600" size={22} />
            <p className="mt-3 font-semibold">Authority</p>
            <p className="mt-1 text-sm text-gray-500">
              Monitoring and response decision support.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <Users className="text-green-600" size={22} />
            <p className="mt-3 font-semibold">Public User</p>
            <p className="mt-1 text-sm text-gray-500">
              Flood information and community reporting.
            </p>
          </div>
        </div>
      </div>

      {/* Administrative Actions */}
      <div className="rounded-2xl border bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Administrative Actions
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">
          {/* Refresh System */}
          <button
            onClick={handleRefreshSystem}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={isRefreshing ? "animate-spin" : ""}
            />

            {isRefreshing ? "Refreshing..." : "Refresh System"}
          </button>

          {/* Check Data Sources */}
          <button
            onClick={() => setShowDataSources(true)}
            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            <Database size={17} />
            Check Data Sources
          </button>

          {/* Configuration */}
          <button
            onClick={() => setShowConfiguration(true)}
            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            <Settings size={17} />
            Configuration
          </button>
        </div>

        {/* Refresh Message */}
        {refreshMessage && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="text-sm font-semibold text-green-800">
              {refreshMessage}
            </p>

            <p className="mt-1 text-xs text-green-700">
              DEMO / PROTOTYPE — No external system was actually restarted or
              refreshed.
            </p>
          </div>
        )}
      </div>

      {/* Notice */}
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle
          size={20}
          className="mt-0.5 shrink-0 text-amber-600"
        />

        <div>
          <p className="text-sm font-semibold text-amber-900">
            Prototype Notice
          </p>

          <p className="mt-1 text-sm leading-6 text-amber-800">
            This administration interface is a frontend prototype. User
            authentication, database configuration, API management and
            production security controls would be implemented in the backend
            deployment.
          </p>
        </div>
      </div>

      {/* Data Source Modal */}
      {showDataSources && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Data Source Check
              </h2>

              <button
                onClick={() => setShowDataSources(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "Rainfall Data",
                "Water Level Data",
                "Drainage Data",
                "Historical Flood Data",
                "Spatial/GIS Data",
                "Community Reports",
              ].map((source) => (
                <div
                  key={source}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {source}
                  </span>

                  <span className="text-sm font-semibold text-green-600">
                    Available — DEMO
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-bold text-amber-900">
                DEMO / SIMULATED DATA
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-800">
                These statuses are prototype values and are not verification
                of live external data sources.
              </p>
            </div>

            <button
              onClick={() => setShowDataSources(false)}
              className="mt-5 w-full rounded-lg bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfiguration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Prototype Configuration
              </h2>

              <button
                onClick={() => setShowConfiguration(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Risk Threshold */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-800">
                  Flood Risk Threshold
                </label>

                <span className="font-bold text-indigo-700">
                  {riskThreshold} / 100
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={riskThreshold}
                onChange={(e) => setRiskThreshold(Number(e.target.value))}
                className="mt-3 w-full"
              />

              <p className="mt-1 text-xs text-gray-500">
                Current value: {riskThreshold}
              </p>
            </div>

            {/* Prediction Horizon */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-800">
                Prediction Horizon
              </label>

              <select
                value={predictionHorizon}
                onChange={(e) => setPredictionHorizon(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800"
              >
                <option value="30 Minutes">30 Minutes</option>
                <option value="1 Hour">1 Hour</option>
                <option value="2 Hours">2 Hours</option>
                <option value="3 Hours">3 Hours</option>
              </select>
            </div>

            {/* Demo Mode */}
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">
                  Demo Mode
                </p>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  Enabled
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                Demo Mode prevents simulated values from being treated as
                live data.
              </p>
            </div>

            {/* Prototype Notice */}
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-bold text-amber-900">
                DEMO / PROTOTYPE CONFIGURATION
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-800">
                These settings are local interface values for the prototype.
                They do not change a production server or external system.
              </p>
            </div>

            <button
              onClick={() => setShowConfiguration(false)}
              className="mt-5 w-full rounded-lg bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}