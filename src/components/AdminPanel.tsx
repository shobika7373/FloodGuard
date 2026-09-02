import {
  Settings,
  Database,
  Brain,
  Server,
  ShieldCheck,
  Users,
  Activity,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
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
              80 / 100
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
              3 Hours
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

      {/* Actions */}
      <div className="rounded-2xl border bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Administrative Actions
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white">
            <RefreshCw size={17} />
            Refresh System
          </button>

          <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-3 text-sm font-semibold text-gray-700">
            <Database size={17} />
            Check Data Sources
          </button>

          <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-3 text-sm font-semibold text-gray-700">
            <Settings size={17} />
            Configuration
          </button>
        </div>
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
    </div>
  );
}