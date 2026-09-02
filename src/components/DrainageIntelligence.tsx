import {
  Droplets,
  Gauge,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Wrench,
  TrendingUp,
} from "lucide-react";

const drainageStations = [
  {
    id: "Drain 01",
    location: "T. Nagar",
    capacity: "1200 m³/hr",
    flow: "620 m³/hr",
    utilization: 52,
    status: "Normal",
    blockage: "8%",
  },
  {
    id: "Drain 04",
    location: "Velachery",
    capacity: "950 m³/hr",
    flow: "760 m³/hr",
    utilization: 80,
    status: "Warning",
    blockage: "34%",
  },
  {
    id: "Drain 08",
    location: "Adyar",
    capacity: "1100 m³/hr",
    flow: "690 m³/hr",
    utilization: 63,
    status: "Normal",
    blockage: "16%",
  },
  {
    id: "Drain 12",
    location: "Saidapet",
    capacity: "800 m³/hr",
    flow: "210 m³/hr",
    utilization: 89,
    status: "Overflow Risk",
    blockage: "89%",
  },
];

export default function DrainageIntelligence() {
  const highRisk = drainageStations.filter(
    (station) => station.status === "Overflow Risk"
  ).length;

  const warning = drainageStations.filter(
    (station) => station.status === "Warning"
  ).length;

  const normal = drainageStations.filter(
    (station) => station.status === "Normal"
  ).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Droplets className="h-7 w-7 text-blue-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Drainage Intelligence
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Monitor drainage capacity, flow conditions, utilization and
            possible blockage risks.
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
                Monitored Drains
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {drainageStations.length}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Simulated monitoring points
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Normal
              </p>

              <p className="mt-2 text-2xl font-bold text-green-700">
                {normal}
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Operating within normal range
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Warning
              </p>

              <p className="mt-2 text-2xl font-bold text-orange-600">
                {warning}
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-3">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Increased drainage utilization
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Overflow Risk
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {highRisk}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3">
              <Gauge className="h-6 w-6 text-red-600" />
            </div>
          </div>

          <p className="mt-3 text-xs text-red-600">
            Requires inspection
          </p>
        </div>

      </div>

      {/* Critical Drain Alert */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">

        <div className="flex gap-4">

          <div className="rounded-lg bg-red-100 p-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <div className="flex-1">

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="font-semibold text-red-900">
                  Possible Drainage Bottleneck Detected
                </h2>

                <p className="mt-1 text-sm text-red-800">
                  Drain 12 shows high simulated utilization with low
                  observed flow, indicating a possible blockage or
                  drainage bottleneck.
                </p>
              </div>

              <span className="w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                89% BLOCKAGE PROBABILITY
              </span>

            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-xs text-slate-500">
                  Rainfall
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  51 mm/hr
                </p>
              </div>

              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-xs text-slate-500">
                  Water Level
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  Rising
                </p>
              </div>

              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-xs text-slate-500">
                  Drain Flow
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  210 m³/hr
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Drainage Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Drainage Network Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Simulated drainage capacity and operating conditions.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="bg-slate-50">

              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Drain
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Location
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Capacity
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Current Flow
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Utilization
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Blockage
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {drainageStations.map((station) => (

                <tr
                  key={station.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-600" />

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

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {station.capacity}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-900">
                    {station.flow}
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full ${
                            station.utilization >= 85
                              ? "bg-red-500"
                              : station.utilization >= 70
                              ? "bg-orange-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${station.utilization}%`,
                          }}
                        />
                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        {station.utilization}%
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {station.blockage}
                  </td>

                  <td className="px-5 py-4">

                    {station.status === "Normal" && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Normal
                      </span>
                    )}

                    {station.status === "Warning" && (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        Warning
                      </span>
                    )}

                    {station.status === "Overflow Risk" && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Overflow Risk
                      </span>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* Blockage Detection Logic */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              Drainage Risk Logic
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            FloodGuard can combine rainfall, water-level changes and
            drainage flow to identify potential bottlenecks.
          </p>

          <div className="mt-5 space-y-3">

            {[
              "Heavy rainfall detected",
              "Water level rising rapidly",
              "Drainage flow lower than expected",
              "Possible blockage or capacity constraint",
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

        {/* Recommended Action */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-orange-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              Recommended Maintenance
            </h2>
          </div>

          <div className="mt-5 rounded-lg border border-orange-200 bg-orange-50 p-4">

            <p className="text-sm font-semibold text-orange-900">
              Inspect Drain 12
            </p>

            <p className="mt-2 text-sm text-orange-800">
              Simulated conditions indicate a possible drainage
              bottleneck. Field inspection is recommended before
              treating this as a confirmed blockage.
            </p>

            <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
              <Wrench className="h-4 w-4" />
              Create Inspection Action
            </button>

          </div>

        </div>

      </div>

      {/* Future Integration */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> Drainage values and blockage
        probabilities are simulated demonstration data. A production
        system can connect authorized drainage sensors, GIS drainage
        networks and field inspection data through backend APIs.
      </div>

    </div>
  );
}