import {
  Droplets,
  Gauge,
  MapPin,
  Waves,
  CloudRain,
  AlertTriangle,
} from "lucide-react";

const twinData = [
  { label: "Flood Depth", value: "42 cm", icon: Waves },
  { label: "Water Flow", value: "68%", icon: Droplets },
  { label: "Drainage Capacity", value: "74%", icon: Gauge },
  { label: "Rainfall", value: "60 mm/hr", icon: CloudRain },
];

export default function FloodDigitalTwin() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Flood Digital Twin</h2>
        <p className="text-gray-500">
          Digital representation of a flood-prone Chennai locality
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-blue-600" />
          <div>
            <h3 className="font-bold">T. Nagar Digital Twin</h3>
            <p className="text-sm text-gray-500">
              DEMO / Simulated Spatial Model
            </p>
          </div>
        </div>

        <div className="h-72 rounded-lg bg-gray-100 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg,#cbd5e1 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute left-[20%] top-[30%] h-24 w-40 rounded bg-blue-200/80 border-2 border-blue-500" />

          <div className="absolute right-[15%] top-[20%] h-20 w-32 rounded bg-orange-300/80 border-2 border-orange-500" />

          <div className="absolute left-[45%] bottom-[15%] h-20 w-36 rounded bg-red-300/80 border-2 border-red-500" />

          <div className="absolute left-4 bottom-4 rounded-lg bg-white p-3 shadow">
            <p className="text-sm font-semibold">Selected Area</p>
            <p className="text-xs text-gray-500">T. Nagar</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {twinData.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border bg-white p-4"
            >
              <Icon className="mb-2 text-blue-600" size={22} />

              <p className="text-sm text-gray-500">
                {item.label}
              </p>

              <p className="text-xl font-bold">
                {item.value}
              </p>

              <span className="text-xs text-gray-400">
                Demo Data
              </span>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h3 className="font-bold mb-4">
          Flood Propagation Scenario
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Rainfall Scenario
            </p>
            <p className="text-xl font-bold">
              80 mm/hr
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Expected Water Rise
            </p>
            <p className="text-xl font-bold">
              +28 cm
            </p>
          </div>

          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-600">
              Projected Risk
            </p>
            <p className="text-xl font-bold text-red-700">
              Critical
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 flex gap-3">
        <AlertTriangle className="text-orange-600 shrink-0" />

        <p className="text-sm text-orange-800">
          This digital twin is a prototype simulation using
          demo spatial and environmental data. It is not an
          operational emergency model.
        </p>
      </div>
    </div>
  );
}