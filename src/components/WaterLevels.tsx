import { useEffect, useState } from "react";
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
import { getWaterLevels } from "../services/api";

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

const demoStations = [
  {
    id: "WL-01",
    location: "Adyar",
    current: "1.42 m",
    safe: "1.20 m",
    warning: "1.60 m",
    critical: "2.00 m",
    rate: "+12 cm/hr",
    status: "Rising",
  },
  {
    id: "WL-02",
    location: "Saidapet",
    current: "1.18 m",
    safe: "1.20 m",
    warning: "1.60 m",
    critical: "2.00 m",
    rate: "+7 cm/hr",
    status: "Rising",
  },
  {
    id: "WL-03",
    location: "Velachery",
    current: "0.96 m",
    safe: "1.10 m",
    warning: "1.50 m",
    critical: "1.90 m",
    rate: "Stable",
    status: "Stable",
  },
  {
    id: "WL-04",
    location: "T. Nagar",
    current: "0.84 m",
    safe: "1.20 m",
    warning: "1.60 m",
    critical: "2.00 m",
    rate: "+7 cm/hr",
    status: "Rising",
  },
];

export default function WaterLevels() {
  const [stations, setStations] = useState(demoStations);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getWaterLevels()
      .then((response) => {
        const backendData = response.data || [];

        const mappedStations = backendData.map(
          (
            item: {
              area: string;
              level: number;
              trend: string;
            },
            index: number
          ) => ({
            id: `WL-0${index + 1}`,
            location: item.area,
            current: `${item.level} m`,
            safe: "Demo",
            warning: "Demo",
            critical: "Demo",
            rate: item.trend,
            status: item.trend,
          })
        );

        setStations(mappedStations);
        setError("");
      })
      .catch((error) => {
        console.error("Water Levels API error:", error);
        setError("Backend unavailable — showing DEMO / SIMULATED DATA.");
        setStations(demoStations);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-sm font-medium text-slate-600">
          Loading water level data...
        </div>
      </div>
    );
  }

  const risingCount = stations.filter(
    (station) => station.status === "Rising"
  ).length;

  const stableCount = stations.filter(
    (station) => station.status === "Stable"
  ).length;

  const highestLevel =
    stations.length > 0
      ? Math.max(
          ...stations.map((station) =>
            parseFloat(station.current.replace(" m", ""))
          )
        )
      : 0;

  const highestStation =
    stations.find(
      (station) =>
        parseFloat(station.current.replace(" m", "")) === highestLevel
    )?.location || "N/A";

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

      {/* Error / Fallback Message */}
      {error && (
        <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Highest Water Level
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {highestLevel.toFixed(2)} m
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <Waves className="h-6 w-6 text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Highest monitored simulated reading: {highestStation}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Rising Stations
              </p>

              <p className="mt-2 text-2xl font-bold text-orange-600">
                {risingCount}
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-3">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Stations showing a rising simulated trend
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Stable Stations
              </p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {stableCount}
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Stations with stable simulated trends
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Monitored Stations
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-600">
                {stations.length}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <Gauge className="h-6 w-6 text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Backend-connected demonstration stations
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
              Water Level Trend
            </h2>

            <p className="mt-1 text-sm text-orange-800">
              Backend-connected simulated readings are being used to
              monitor rising and stable water-level trends.
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
            Backend-connected simulated monitoring stations.
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

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {station.safe}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {station.warning}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {station.critical}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-orange-600">
                    {station.rate}
                  </td>

                  <td className="px-5 py-4">
                    {station.status === "Stable" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        Stable
                      </span>
                    )}

                    {station.status === "Rising" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        <AlertTriangle className="h-3 w-3" />
                        Rising
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
              Current integration
            </p>

            <div className="mt-3 space-y-2 text-sm text-blue-800">
              <p>Backend API → Water Level Reading</p>
              <p>Backend API → Rising / Stable Trend</p>
              <p>Frontend → Water Level Display</p>
              <p>Frontend → Monitoring Status</p>
              <p>FloodGuard → Prototype Visualization</p>
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