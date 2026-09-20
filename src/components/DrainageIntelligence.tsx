import { useEffect, useState } from "react";
import {
  Droplets,
  Gauge,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Wrench,
  TrendingUp,
} from "lucide-react";
import { getDrainage } from "../services/api";

const demoStations = [
  {
    id: "Drain 01",
    location: "T. Nagar",
    utilization: 84,
    condition: "High Load",
  },
  {
    id: "Drain 04",
    location: "Velachery",
    utilization: 76,
    condition: "High Load",
  },
  {
    id: "Drain 08",
    location: "Adyar",
    utilization: 61,
    condition: "Normal",
  },
  {
    id: "Drain 12",
    location: "Saidapet",
    utilization: 91,
    condition: "Critical",
  },
];

export default function DrainageIntelligence() {
  const [drainageStations, setDrainageStations] =
    useState(demoStations);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDrainage()
      .then((response) => {
        const backendData = response.data || [];

        const mappedStations = backendData.map(
          (
            item: {
              area: string;
              utilization: number;
              condition: string;
            },
            index: number
          ) => ({
            id: `Drain ${String(index + 1).padStart(2, "0")}`,
            location: item.area,
            utilization: item.utilization,
            condition: item.condition,
          })
        );

        setDrainageStations(mappedStations);
        setError("");
      })
      .catch((error) => {
        console.error("Drainage API error:", error);
        setError(
          "Backend unavailable — showing DEMO / SIMULATED DATA."
        );
        setDrainageStations(demoStations);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-sm font-medium text-slate-600">
          Loading drainage data...
        </div>
      </div>
    );
  }

  const highRisk = drainageStations.filter(
    (station) => station.condition === "Critical"
  ).length;

  const warning = drainageStations.filter(
    (station) => station.condition === "High Load"
  ).length;

  const normal = drainageStations.filter(
    (station) => station.condition === "Normal"
  ).length;

  const highestUtilization =
    drainageStations.length > 0
      ? Math.max(
          ...drainageStations.map(
            (station) => station.utilization
          )
        )
      : 0;

  const highestStation =
    drainageStations.find(
      (station) =>
        station.utilization === highestUtilization
    )?.location || "N/A";

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
            Monitor drainage utilization, operating conditions and
            possible blockage risks.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          DEMO / SIMULATED DATA
        </div>
      </div>

      {/* Error / Fallback */}
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
            Backend-connected demonstration points
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
            Operating within normal condition
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                High Load
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
                Critical
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
            Highest utilization requires monitoring
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
                  High Drainage Utilization Detected
                </h2>

                <p className="mt-1 text-sm text-red-800">
                  {highestStation} currently has the highest simulated
                  drainage utilization among the monitored locations.
                </p>
              </div>

              <span className="w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                {highestUtilization}% UTILIZATION
              </span>

            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-xs text-slate-500">
                  Highest Utilization
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {highestUtilization}%
                </p>
              </div>

              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-xs text-slate-500">
                  Location
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {highestStation}
                </p>
              </div>

              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-xs text-slate-500">
                  Data Type
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  Simulated
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
            Backend-connected drainage utilization and operating
            conditions.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px]">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Drain
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Location
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Utilization
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Condition
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

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {station.condition}
                  </td>

                  <td className="px-5 py-4">

                    {station.condition === "Normal" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        Normal
                      </span>
                    )}

                    {station.condition === "High Load" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        <AlertTriangle className="h-3 w-3" />
                        High Load
                      </span>
                    )}

                    {station.condition === "Critical" && (
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

      {/* Drainage Risk Logic */}
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
            drainage utilization to identify potential bottlenecks.
          </p>

          <div className="mt-5 space-y-3">

            {[
              "Monitor drainage utilization",
              "Identify high-load conditions",
              "Compare drainage conditions across locations",
              "Use backend data for further flood-risk analysis",
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
              Monitor {highestStation}
            </p>

            <p className="mt-2 text-sm text-orange-800">
              This location currently has the highest simulated
              drainage utilization. Field inspection may be considered
              if authorized operational data confirms the condition.
            </p>

            <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
              <Wrench className="h-4 w-4" />
              Create Inspection Action
            </button>

          </div>

        </div>

      </div>

      {/* Prototype Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> Drainage utilization and
        conditions shown here are simulated demonstration data from
        the prototype backend. They are not live drainage sensor
        readings or confirmed blockage measurements.
      </div>

    </div>
  );
}