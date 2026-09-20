import { useEffect, useState } from "react";
import {
  Layers,
  MapPin,
  AlertTriangle,
  Info,
  Droplets,
  Navigation,
  Clock,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getFloodRisk } from "../services/api";

type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

interface FloodZone {
  name: string;
  position: [number, number];
  risk: RiskLevel;
  depth: string;
  reason: string;
  source: "Backend" | "Demo";
}

interface BackendRisk {
  area: string;
  risk: number;
  category: string;
}

interface BackendRiskResponse {
  status: string;
  data: BackendRisk[];
}

const floodZones: FloodZone[] = [
  {
    name: "T. Nagar",
    position: [13.0418, 80.2341],
    risk: "Critical",
    depth: "65 cm",
    reason: "High rainfall + drainage pressure + low elevation",
    source: "Demo",
  },
  {
    name: "Velachery",
    position: [12.9815, 80.218],
    risk: "High",
    depth: "48 cm",
    reason: "Surface runoff and drainage capacity exceeded",
    source: "Demo",
  },
  {
    name: "Saidapet",
    position: [13.0213, 80.2231],
    risk: "High",
    depth: "42 cm",
    reason: "Low-lying roads and accumulated stormwater",
    source: "Demo",
  },
  {
    name: "Adyar",
    position: [13.0067, 80.257],
    risk: "Moderate",
    depth: "28 cm",
    reason: "Rising water level near drainage channels",
    source: "Demo",
  },
  {
    name: "Anna Nagar",
    position: [13.0878, 80.2085],
    risk: "Moderate",
    depth: "22 cm",
    reason: "Moderate rainfall and surface runoff",
    source: "Demo",
  },
  {
    name: "Guindy",
    position: [13.0067, 80.2206],
    risk: "Low",
    depth: "8 cm",
    reason: "Drainage currently within simulated capacity",
    source: "Demo",
  },
];

const riskStyles: Record<
  RiskLevel,
  { color: string; fill: string; label: string }
> = {
  Low: {
    color: "#16a34a",
    fill: "#22c55e",
    label: "Low",
  },
  Moderate: {
    color: "#ca8a04",
    fill: "#eab308",
    label: "Moderate",
  },
  High: {
    color: "#ea580c",
    fill: "#f97316",
    label: "High",
  },
  Critical: {
    color: "#dc2626",
    fill: "#ef4444",
    label: "Critical",
  },
};

function createMarkerIcon(risk: RiskLevel) {
  const color = riskStyles[risk].color;

  return L.divIcon({
    className: "custom-flood-marker",
    html: `
      <div style="
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">
        !
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function RecenterMap({
  position,
}: {
  position: [number, number];
}) {
  const map = useMap();

  return (
    <button
      onClick={() => map.setView(position, 12)}
      className="absolute right-4 top-4 z-[1000] flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-md"
    >
      <Navigation size={16} />
      Chennai
    </button>
  );
}

export default function LiveFloodMap() {
  const [selectedZone, setSelectedZone] = useState<FloodZone | null>(null);
  const [showZones, setShowZones] = useState(true);
  const [zones, setZones] = useState<FloodZone[]>(floodZones);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(false);

  const center: [number, number] = [13.05, 80.24];

  useEffect(() => {
    async function loadFloodRisk() {
      try {
        setLoading(true);
        setBackendError(false);

        const response: BackendRiskResponse = await getFloodRisk();

        const backendData = response.data || [];

        const updatedZones = floodZones.map((zone) => {
          const backendZone = backendData.find(
            (item) => item.area.toLowerCase() === zone.name.toLowerCase()
          );

          if (!backendZone) {
            return zone;
          }

          const backendRisk = backendZone.category as RiskLevel;

          const validRisk: RiskLevel =
            backendRisk === "Low" ||
            backendRisk === "Moderate" ||
            backendRisk === "High" ||
            backendRisk === "Critical"
              ? backendRisk
              : zone.risk;

          return {
            ...zone,
            risk: validRisk,
            source: "Backend" as const,
          };
        });

        setZones(updatedZones);
      } catch (error) {
        console.error("Flood-risk backend unavailable:", error);
        setBackendError(true);
        setZones(floodZones);
      } finally {
        setLoading(false);
      }
    }

    loadFloodRisk();
  }, []);

  const counts = {
    Low: zones.filter((z) => z.risk === "Low").length,
    Moderate: zones.filter((z) => z.risk === "Moderate").length,
    High: zones.filter((z) => z.risk === "High").length,
    Critical: zones.filter((z) => z.risk === "Critical").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MapPin size={22} />

              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                DEMO / SIMULATED DATA
              </span>
            </div>

            <h1 className="text-3xl font-bold">
              Live Flood Map
            </h1>

            <p className="mt-2 text-sm text-blue-50">
              Interactive Chennai flood-risk visualization using
              backend-connected simulated risk data and demo map geometry.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <Clock size={17} />
              <span className="text-sm">
                Prototype Monitoring
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Backend Status */}
      {loading && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-900">
            Loading flood-risk data from backend...
          </p>
        </div>
      )}

      {!loading && backendError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">
            Backend unavailable — showing DEMO / SIMULATED DATA.
          </p>

          <p className="mt-1 text-sm text-amber-800">
            The map is still available using the existing simulated
            flood-zone values.
          </p>
        </div>
      )}

      {!loading && !backendError && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-900">
            Flood-risk data connected to backend successfully.
          </p>

          <p className="mt-1 text-sm text-green-800">
            Risk categories for available backend areas are displayed on
            the map. Map locations and depth values remain simulated.
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {(["Low", "Moderate", "High", "Critical"] as RiskLevel[]).map(
          (risk) => (
            <div
              key={risk}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {risk} Risk
                </span>

                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: riskStyles[risk].fill,
                  }}
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {counts[risk]}
              </p>

              <p className="text-xs text-gray-500">
                Simulated zones
              </p>
            </div>
          )
        )}
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-bold text-gray-900">
              Chennai Flood-Risk Visualization
            </h2>

            <p className="text-xs text-gray-500">
              Click a marker or flood zone to inspect the simulated
              conditions.
            </p>
          </div>

          <button
            onClick={() => setShowZones(!showZones)}
            className="flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Layers size={17} />
            {showZones ? "Hide Zones" : "Show Zones"}
          </button>
        </div>

        <div className="relative h-[550px]">
          <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RecenterMap position={center} />

            {showZones &&
              zones.map((zone) => {
                const style = riskStyles[zone.risk];

                return (
                  <div key={zone.name}>
                    <Circle
                      center={zone.position}
                      radius={
                        zone.risk === "Critical"
                          ? 900
                          : zone.risk === "High"
                          ? 750
                          : zone.risk === "Moderate"
                          ? 600
                          : 450
                      }
                      pathOptions={{
                        color: style.color,
                        fillColor: style.fill,
                        fillOpacity: 0.28,
                        weight: 2,
                      }}
                      eventHandlers={{
                        click: () => setSelectedZone(zone),
                      }}
                    />

                    <Marker
                      position={zone.position}
                      icon={createMarkerIcon(zone.risk)}
                      eventHandlers={{
                        click: () => setSelectedZone(zone),
                      }}
                    >
                      <Popup>
                        <div className="min-w-[180px]">
                          <strong>{zone.name}</strong>

                          <p className="mt-1">
                            Risk:{" "}
                            <b style={{ color: style.color }}>
                              {zone.risk}
                            </b>
                          </p>

                          <p>
                            Estimated depth:{" "}
                            <b>{zone.depth}</b>
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Source: {zone.source}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  </div>
                );
              })}
          </MapContainer>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Legend */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Layers size={20} className="text-blue-600" />
            <h2 className="font-bold text-gray-900">
              Risk Legend
            </h2>
          </div>

          <div className="mt-5 space-y-3">
            {(["Low", "Moderate", "High", "Critical"] as RiskLevel[]).map(
              (risk) => (
                <div
                  key={risk}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-4 w-4 rounded-full"
                      style={{
                        backgroundColor: riskStyles[risk].fill,
                      }}
                    />

                    <span className="text-sm font-medium">
                      {risk}
                    </span>
                  </div>

                  <span className="text-xs text-gray-500">
                    {counts[risk]} zones
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Selected Zone */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2">
            <Info size={20} className="text-blue-600" />

            <h2 className="font-bold text-gray-900">
              Selected Area
            </h2>
          </div>

          {selectedZone ? (
            <div className="mt-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedZone.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Simulated flood-risk assessment
                  </p>
                </div>

                <span
                  className="w-fit rounded-full px-3 py-1 text-sm font-bold"
                  style={{
                    color: riskStyles[selectedZone.risk].color,
                    backgroundColor: `${riskStyles[selectedZone.risk].fill}20`,
                  }}
                >
                  {selectedZone.risk}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-blue-50 p-4">
                  <Droplets
                    className="text-blue-600"
                    size={20}
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Estimated Water Depth
                  </p>

                  <p className="text-xl font-bold">
                    {selectedZone.depth}
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-4">
                  <AlertTriangle
                    className="text-orange-600"
                    size={20}
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Primary Risk Driver
                  </p>

                  <p className="text-sm font-semibold">
                    {selectedZone.reason}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5 flex min-h-[150px] items-center justify-center rounded-xl bg-gray-50 text-center">
              <div>
                <MapPin
                  size={30}
                  className="mx-auto text-gray-400"
                />

                <p className="mt-2 text-sm text-gray-500">
                  Select a flood zone on the map to view details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Zone Table */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Flood-Risk Zones
        </h2>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">
                  Estimated Depth
                </th>
                <th className="px-4 py-3">Risk Driver</th>
              </tr>
            </thead>

            <tbody>
              {zones.map((zone) => (
                <tr
                  key={zone.name}
                  onClick={() => setSelectedZone(zone)}
                  className="cursor-pointer border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-4 font-semibold">
                    {zone.name}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        color: riskStyles[zone.risk].color,
                        backgroundColor: `${riskStyles[zone.risk].fill}20`,
                      }}
                    >
                      {zone.risk}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm">
                    {zone.depth}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-500">
                    {zone.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notice */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Prototype Notice
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          This map uses simulated flood-risk data. Available risk
          categories are connected to the FloodGuard backend. Map
          coordinates, estimated water depths and risk-driver descriptions
          remain demonstration values. This is not a live government
          flood-monitoring or GIS service.
        </p>
      </div>
    </div>
  );
}