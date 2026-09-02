import {
  Map,
  MapPin,
  Navigation,
  ShieldCheck,
  AlertTriangle,
  Users,
  Clock,
  Route,
  CheckCircle,
  Building2,
} from "lucide-react";

const routes = [
  {
    id: "ER-01",
    from: "T. Nagar",
    destination: "Designated Safe Zone A",
    distance: "2.4 km",
    time: "12 min",
    risk: "Low",
    status: "Open",
  },
  {
    id: "ER-02",
    from: "Velachery",
    destination: "Designated Safe Zone B",
    distance: "3.1 km",
    time: "18 min",
    risk: "Moderate",
    status: "Open",
  },
  {
    id: "ER-03",
    from: "Saidapet",
    destination: "Designated Safe Zone C",
    distance: "1.8 km",
    time: "10 min",
    risk: "High",
    status: "Use With Caution",
  },
  {
    id: "ER-04",
    from: "Adyar",
    destination: "Designated Safe Zone D",
    distance: "2.7 km",
    time: "15 min",
    risk: "Critical",
    status: "Avoid",
  },
];

const shelters = [
  {
    name: "Safe Zone A",
    area: "T. Nagar",
    capacity: "500 people",
    occupancy: "320",
    status: "Available",
  },
  {
    name: "Safe Zone B",
    area: "Velachery",
    capacity: "750 people",
    occupancy: "490",
    status: "Available",
  },
  {
    name: "Safe Zone C",
    area: "Saidapet",
    capacity: "400 people",
    occupancy: "360",
    status: "Limited",
  },
  {
    name: "Safe Zone D",
    area: "Adyar",
    capacity: "600 people",
    occupancy: "580",
    status: "Near Capacity",
  },
];

export default function EvacuationRoutes() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Route className="h-7 w-7 text-blue-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Evacuation Routes
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Prototype evacuation planning using flood-risk and route conditions.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          DEMO / SIMULATED DATA
        </div>
      </div>

      {/* Alert */}
      <div className="flex items-start gap-4 rounded-xl border border-orange-200 bg-orange-50 p-5">

        <div className="rounded-lg bg-white p-3">
          <AlertTriangle className="h-6 w-6 text-orange-600" />
        </div>

        <div>
          <h2 className="font-semibold text-orange-900">
            Route Safety Advisory
          </h2>

          <p className="mt-1 text-sm text-orange-800">
            Some evacuation routes may become unsafe as flood conditions
            change. The prototype prioritizes routes with lower simulated
            flood risk.
          </p>
        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Routes Monitored
            </p>

            <Route className="h-5 w-5 text-blue-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            24
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Simulated evacuation corridors
          </p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-green-700">
              Safe Routes
            </p>

            <ShieldCheck className="h-5 w-5 text-green-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-green-700">
            17
          </p>

          <p className="mt-2 text-xs text-green-600">
            Currently suitable
          </p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-orange-700">
              Caution Routes
            </p>

            <AlertTriangle className="h-5 w-5 text-orange-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-orange-700">
            5
          </p>

          <p className="mt-2 text-xs text-orange-600">
            Require monitoring
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-red-700">
              Routes to Avoid
            </p>

            <Navigation className="h-5 w-5 text-red-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-red-700">
            2
          </p>

          <p className="mt-2 text-xs text-red-600">
            High simulated flood risk
          </p>
        </div>

      </div>

      {/* Map / Route Visualization */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Evacuation Route Map
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Chennai route visualization — prototype view.
              </p>
            </div>

            <Map className="h-6 w-6 text-blue-600" />

          </div>

          {/* Simulated Map */}
          <div className="relative mt-5 h-[360px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">

            {/* Road-like lines */}
            <div className="absolute left-[10%] top-[50%] h-2 w-[80%] rotate-[-8deg] rounded-full bg-slate-300" />

            <div className="absolute left-[25%] top-[15%] h-[75%] w-2 rotate-[15deg] rounded-full bg-slate-300" />

            <div className="absolute left-[55%] top-[10%] h-[80%] w-2 rotate-[-25deg] rounded-full bg-slate-300" />

            <div className="absolute left-[15%] top-[25%] h-2 w-[70%] rotate-[25deg] rounded-full bg-slate-300" />

            {/* Route 1 */}
            <div className="absolute left-[15%] top-[58%] h-2 w-[52%] rotate-[-8deg] rounded-full bg-green-500" />

            {/* Route 2 */}
            <div className="absolute left-[30%] top-[30%] h-2 w-[43%] rotate-[15deg] rounded-full bg-yellow-500" />

            {/* Route 3 */}
            <div className="absolute left-[48%] top-[58%] h-2 w-[32%] rotate-[5deg] rounded-full bg-orange-500" />

            {/* Safe zone markers */}
            <div className="absolute left-[18%] top-[63%] flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow">
              <ShieldCheck className="h-3 w-3" />
              Safe Zone A
            </div>

            <div className="absolute right-[15%] top-[20%] flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow">
              <ShieldCheck className="h-3 w-3" />
              Safe Zone B
            </div>

            <div className="absolute left-[44%] bottom-[18%] flex items-center gap-1 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white shadow">
              <AlertTriangle className="h-3 w-3" />
              Caution
            </div>

            <div className="absolute right-[12%] bottom-[25%] flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
              <Navigation className="h-3 w-3" />
              Avoid
            </div>

            <div className="absolute bottom-4 left-4 rounded-lg bg-white/95 p-3 shadow">

              <p className="text-xs font-semibold text-slate-700">
                Route Legend
              </p>

              <div className="mt-2 space-y-1 text-xs text-slate-600">

                <div className="flex items-center gap-2">
                  <span className="h-2 w-5 rounded-full bg-green-500" />
                  Safe
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-5 rounded-full bg-yellow-500" />
                  Moderate
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-5 rounded-full bg-orange-500" />
                  High Risk
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-5 rounded-full bg-red-500" />
                  Avoid
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Recommended Route */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

          <div className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-semibold text-blue-900">
              Recommended Route
            </h2>
          </div>

          <p className="mt-1 text-sm text-blue-700">
            Example recommendation for a simulated high-risk area.
          </p>

          <div className="mt-5 rounded-xl bg-white p-4">

            <div className="flex items-center gap-3">

              <div className="rounded-full bg-blue-100 p-2">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Starting Area
                </p>

                <p className="font-semibold text-slate-900">
                  T. Nagar
                </p>
              </div>

            </div>

            <div className="my-4 ml-5 h-8 border-l-2 border-dashed border-blue-300" />

            <div className="flex items-center gap-3">

              <div className="rounded-full bg-green-100 p-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Destination
                </p>

                <p className="font-semibold text-slate-900">
                  Safe Zone A
                </p>
              </div>

            </div>

          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">

            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-slate-500">
                Distance
              </p>

              <p className="mt-1 font-bold text-slate-900">
                2.4 km
              </p>
            </div>

            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-slate-500">
                Travel Time
              </p>

              <p className="mt-1 font-bold text-slate-900">
                12 min
              </p>
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-100 p-3 text-sm font-semibold text-green-700">
            <CheckCircle className="h-4 w-4" />
            Lowest simulated route risk
          </div>

        </div>

      </div>

      {/* Routes Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-5">

          <h2 className="text-lg font-semibold text-slate-900">
            Route Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Simulated route conditions based on current prototype flood-risk values.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Route
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  From
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Destination
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Distance
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Time
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Risk
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {routes.map((route) => (

                <tr
                  key={route.id}
                  className="hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">
                      <Route className="h-4 w-4 text-blue-600" />

                      <span className="font-semibold text-slate-900">
                        {route.id}
                      </span>
                    </div>

                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {route.from}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {route.destination}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {route.distance}
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Clock className="h-4 w-4 text-slate-400" />
                      {route.time}
                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        route.risk === "Low"
                          ? "bg-green-100 text-green-700"
                          : route.risk === "Moderate"
                          ? "bg-yellow-100 text-yellow-700"
                          : route.risk === "High"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {route.risk}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        route.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : route.status === "Use With Caution"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {route.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Safe Zones */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-2">

          <Building2 className="h-5 w-5 text-green-600" />

          <h2 className="text-lg font-semibold text-slate-900">
            Designated Safe Zones
          </h2>

        </div>

        <p className="mt-1 text-sm text-slate-500">
          Example shelter-capacity information for the prototype.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

          {shelters.map((shelter) => {

            const capacity = Number(
              shelter.capacity.replace(" people", "")
            );

            const occupancy = Number(shelter.occupancy);

            const percentage = Math.round(
              (occupancy / capacity) * 100
            );

            return (
              <div
                key={shelter.name}
                className="rounded-xl border border-slate-200 p-4"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="font-semibold text-slate-900">
                      {shelter.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {shelter.area}
                    </p>
                  </div>

                  <Users className="h-5 w-5 text-slate-400" />

                </div>

                <div className="mt-4">

                  <div className="flex justify-between text-xs text-slate-500">
                    <span>
                      Occupancy
                    </span>

                    <span>
                      {shelter.occupancy} / {capacity}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">

                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${percentage}%` }}
                    />

                  </div>

                </div>

                <div className="mt-4 flex items-center gap-2">

                  {shelter.status === "Available" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                  )}

                  <span className="text-xs font-semibold text-slate-700">
                    {shelter.status}
                  </span>

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Prototype Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> Routes, travel times, flood-risk
        conditions, safe zones and capacity figures are simulated
        demonstration data. In a real deployment, evacuation guidance must
        use verified road conditions and instructions from authorized
        emergency-management authorities.
      </div>

    </div>
  );
}