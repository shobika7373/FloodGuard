import {
  CloudRain,
  Droplets,
  Gauge,
  MapPin,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const hourlyRainfall = [
  { time: "12 PM", rainfall: 8 },
  { time: "1 PM", rainfall: 14 },
  { time: "2 PM", rainfall: 22 },
  { time: "3 PM", rainfall: 31 },
  { time: "4 PM", rainfall: 38 },
  { time: "5 PM", rainfall: 42 },
  { time: "6 PM", rainfall: 47 },
  { time: "7 PM", rainfall: 51 },
];

const dailyRainfall = [
  { day: "Mon", rainfall: 18 },
  { day: "Tue", rainfall: 32 },
  { day: "Wed", rainfall: 24 },
  { day: "Thu", rainfall: 45 },
  { day: "Fri", rainfall: 61 },
  { day: "Sat", rainfall: 38 },
  { day: "Sun", rainfall: 52 },
];

const stations = [
  {
    id: "RAIN-01",
    location: "T. Nagar",
    intensity: "42 mm/hr",
    total: "78 mm",
    status: "Heavy",
  },
  {
    id: "RAIN-02",
    location: "Velachery",
    intensity: "51 mm/hr",
    total: "94 mm",
    status: "Very Heavy",
  },
  {
    id: "RAIN-03",
    location: "Adyar",
    intensity: "36 mm/hr",
    total: "69 mm",
    status: "Heavy",
  },
  {
    id: "RAIN-04",
    location: "Anna Nagar",
    intensity: "21 mm/hr",
    total: "43 mm",
    status: "Moderate",
  },
];

export default function Rainfall() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CloudRain className="h-7 w-7 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">
              Rainfall Monitoring
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Monitor rainfall intensity and identify areas experiencing
            increasing precipitation.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          DEMO / SIMULATED DATA
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Current Intensity</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                42 mm/hr
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <CloudRain className="h-6 w-6 text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Current simulated rainfall rate
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">1 Hour Rainfall</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                42 mm
              </p>
            </div>

            <div className="rounded-lg bg-cyan-50 p-3">
              <Droplets className="h-6 w-6 text-cyan-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Accumulated rainfall
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">24 Hour Rainfall</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                78 mm
              </p>
            </div>

            <div className="rounded-lg bg-indigo-50 p-3">
              <Gauge className="h-6 w-6 text-indigo-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Simulated accumulated total
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Trend</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                Rising
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-3">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-orange-600">
            Rainfall intensity increasing
          </p>
        </div>

      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Hourly Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Rainfall Intensity
            </h2>
            <p className="text-sm text-slate-500">
              Simulated hourly rainfall intensity
            </p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyRainfall}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <YAxis
                  label={{
                    value: "mm/hr",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="rainfall"
                  strokeWidth={3}
                  stroke="#2563eb"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              7-Day Rainfall
            </h2>
            <p className="text-sm text-slate-500">
              Simulated rainfall accumulation
            </p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyRainfall}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis
                  label={{
                    value: "mm",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />

                <Tooltip />

                <Bar
                  dataKey="rainfall"
                  fill="#0ea5e9"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Rainfall Alert */}
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
        <div className="flex gap-4">
          <div className="rounded-lg bg-orange-100 p-3">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>

          <div>
            <h3 className="font-semibold text-orange-900">
              Increasing Rainfall Intensity
            </h3>

            <p className="mt-1 text-sm text-orange-800">
              Simulated rainfall intensity is increasing across several
              monitored locations. Higher rainfall can increase drainage
              stress and flood risk when combined with rising water levels.
            </p>

            <p className="mt-2 text-xs font-medium text-orange-700">
              Prototype observation — not a real-time emergency warning.
            </p>
          </div>
        </div>
      </div>

      {/* Monitoring Stations */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Rainfall Stations
          </h2>

          <p className="text-sm text-slate-500">
            Simulated rainfall monitoring points across Chennai
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">

            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Station
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Location
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Intensity
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  24h Total
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
                      <span className="font-medium text-slate-900">
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

                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                    {station.intensity}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {station.total}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      {station.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>

      {/* Data Pipeline */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Rainfall Data Flow
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          How rainfall information supports the FloodGuard prediction
          pipeline.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">

          {[
            ["Rainfall Stations", "Rainfall measurements"],
            ["Data Processing", "Cleaning & aggregation"],
            ["AI Nowcasting", "Flood-risk prediction"],
            ["FloodGuard Alert", "Actionable warning"],
          ].map(([title, description], index) => (
            <div
              key={title}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                  {index + 1}
                </span>

                <span className="font-semibold text-slate-900">
                  {title}
                </span>
              </div>

              <p className="text-xs text-slate-500">
                {description}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* Prototype Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> All rainfall values shown on this
        page are simulated demonstration data. The production system can be
        connected to authorized rainfall/weather data services through the
        backend API.
      </div>

    </div>
  );
}