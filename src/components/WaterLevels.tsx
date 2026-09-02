import {
  Waves,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Gauge,
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

const waterLevelTrend = [
  { time: "12 PM", level: 1.02 },
  { time: "1 PM", level: 1.12 },
  { time: "2 PM", level: 1.24 },
  { time: "3 PM", level: 1.38 },
  { time: "4 PM", level: 1.52 },
  { time: "5 PM", level: 1.68 },
  { time: "6 PM", level: 1.80 },
  { time: "7 PM", level: 1.92 },
];

const stations = [
  {
    id: "WL-01",
    location: "Adyar River",
    current: "1.80 m",
    safe: "1.20 m",
    warning: "1.60 m",
    critical: "2.00 m",
    rate: "+12 cm/hr",
    status: "Warning",
  },
  {
    id: "WL-02",
    location: "Cooum River",
    current: "1.42 m",
    safe: "1.20 m",
    warning: "1.60 m",
    critical: "2.00 m",
    rate: "+7 cm/hr",
    status: "Normal",
  },
  {
    id: "WL-03",
    location: "Velachery",
    current: "1.67 m",
    safe: "1.10 m",
    warning: "1.50 m",
    critical: "1.90 m",
    rate: "+10 cm/hr",
    status: "Warning",
  },
  {
    id: "WL-04",
    location: "Saidapet",
    current: "1.91 m",
    safe: "1.20 m",
    warning: "1.60 m",
    critical: "2.00 m",
    rate: "+15 cm/hr",
    status: "Critical",
  },
];

export default function WaterLevels() {
  const warningCount = stations.filter(
    (station) => station.status === "Warning"
  ).length;

  const criticalCount = stations.filter(
    (station) => station.status === "Critical"
  ).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Waves className="h-7 w-7 text-blue-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Water Levels
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Monitor water levels, rising trends and potential flood
            thresholds across monitored locations.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          DEMO / SIMULATED DATA
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Current Water Level
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                1.80 m
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <Waves className="h-6 w-6 text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Highest monitored simulated reading
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Rising Rate
              </p>

              <p className="mt-2 text-2xl font-bold text-orange-600">
                +12 cm/hr
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-3">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Simulated rate of increase
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Warning Stations
              </p>

              <p className="mt-2 text-2xl font-bold text-orange-600">
                {warningCount}
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-3">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Above simulated warning threshold
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Critical Stations
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {criticalCount}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3">
              <Gauge className="h-6 w-6 text-red-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-red-600">
            Requires immediate monitoring
          </p>
        </div>

      </div>

      {/* Main Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Water Level Trend
          </h2>

          <p className="text-sm text-slate-500">
            Simulated water-level changes over the last several hours
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={waterLevelTrend}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis
                domain={[0, 2.2]}
                label={{
                  value: "Water Level (m)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />

              <Tooltip
                formatter={(value) => [`${value} m`, "Water Level"]}
              />

              <Line
                type="monotone"
                dataKey="level"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Current Alert */}
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

        <div className="flex gap-4">

          <div className="rounded-lg bg-orange-100 p-3">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>

          <div>
            <h2 className="font-semibold text-orange-900">
              Water Level Rising
            </h2>

            <p className="mt-1 text-sm text-orange-800">
              Simulated water-level readings show an increasing trend.
              Continued rainfall and drainage stress may increase flood
              risk in vulnerable low-lying areas.
            </p>

            <p className="mt-2 text-xs font-medium text-orange-700">
              Prototype observation — not a real-time emergency warning.
            </p>
          </div>

        </div>

      </div>

      {/* Station Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Water Level Stations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Simulated monitoring stations and flood thresholds.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="bg-slate-50">
              <tr>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Station
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Location
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Current
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Safe
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Warning
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Critical
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Trend
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {stations.map((station) => (

                <tr
                  key={station.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-blue-600" />

                      <span className="font-semibold text-slate-900">
                        {station.id}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {station.location}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm font-bold text-slate-900">
                    {station.current}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {station.safe}
                  </td>

                  <td className="px-5 py-4 text-sm text-orange-600">
                    {station.warning}
                  </td>

                  <td className="px-5 py-4 text-sm text-red-600">
                    {station.critical}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-orange-600">
                    {station.rate}
                  </td>

                  <td className="px-5 py-4">

                    {station.status === "Normal" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        Normal
                      </span>
                    )}

                    {station.status === "Warning" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        <AlertTriangle className="h-3 w-3" />
                        Warning
                      </span>
                    )}

                    {station.status === "Critical" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        <AlertTriangle className="h-3 w-3" />
                        Critical
                      </span>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* FloodGuard Logic */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Water-Level Risk Logic
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Water-level changes can be combined with rainfall and
            drainage conditions to improve flood-risk estimation.
          </p>

          <div className="mt-5 space-y-3">

            {[
              "Monitor current water level",
              "Compare against warning and critical thresholds",
              "Calculate rate of water-level rise",
              "Combine with rainfall and drainage conditions",
            ].map((item, index) => (

              <div
                key={item}
                className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
              >

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                  {index + 1}
                </div>

                <span className="text-sm text-slate-700">
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Backend / IoT Ready
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The prototype is structured so simulated readings can
            later be replaced with authorized sensor data.
          </p>

          <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4">

            <p className="text-sm font-semibold text-blue-900">
              Example integration
            </p>

            <div className="mt-3 space-y-2 text-sm text-blue-800">
              <p>Sensor → Water Level Reading</p>
              <p>Gateway → Data Transmission</p>
              <p>Backend → Data Processing</p>
              <p>AI Engine → Flood Risk</p>
              <p>FloodGuard → Alert / Action</p>
            </div>

          </div>

        </div>

      </div>

      {/* Prototype Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> All water-level values,
        thresholds and trends shown here are simulated demonstration
        data. They are not live sensor readings or official flood
        warnings.
      </div>

    </div>
  );
}