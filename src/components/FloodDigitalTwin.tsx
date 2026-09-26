
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CloudRain,
  Droplets,
  Gauge,
  MapPin,
  Search,
  Waves,
} from "lucide-react";

type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

type TwinArea = {
  area: string;
  riskLevel: RiskLevel;
  riskPercentage: number;
  floodDepth: string;
  waterFlow: string;
  drainageCapacity: string;
  rainfall: string;
  rainfallScenario: string;
  expectedWaterRise: string;
  status: string;
  contributingFactors: string[];
  recommendedActions: string[];
};

const supportedAreas: TwinArea[] = [
  {
    area: "T. Nagar",
    riskLevel: "Critical",
    riskPercentage: 86,
    floodDepth: "42 cm",
    waterFlow: "68%",
    drainageCapacity: "74%",
    rainfall: "60 mm/hr",
    rainfallScenario: "80 mm/hr",
    expectedWaterRise: "+28 cm",
    status: "High Flood Risk",
    contributingFactors: [
      "High rainfall intensity",
      "Urban surface runoff",
      "Drainage utilization",
    ],
    recommendedActions: [
      "Monitor low-lying streets",
      "Inspect drainage routes",
      "Prepare local response teams",
    ],
  },
  {
    area: "Velachery",
    riskLevel: "High",
    riskPercentage: 78,
    floodDepth: "36 cm",
    waterFlow: "72%",
    drainageCapacity: "68%",
    rainfall: "55 mm/hr",
    rainfallScenario: "75 mm/hr",
    expectedWaterRise: "+24 cm",
    status: "Elevated Flood Risk",
    contributingFactors: [
      "Low-lying terrain",
      "High runoff concentration",
      "Drainage pressure",
    ],
    recommendedActions: [
      "Monitor vulnerable locations",
      "Inspect nearby drainage",
      "Review flood-prone routes",
    ],
  },
  {
    area: "Adyar",
    riskLevel: "High",
    riskPercentage: 74,
    floodDepth: "31 cm",
    waterFlow: "64%",
    drainageCapacity: "71%",
    rainfall: "52 mm/hr",
    rainfallScenario: "70 mm/hr",
    expectedWaterRise: "+21 cm",
    status: "Elevated Flood Risk",
    contributingFactors: [
      "River-basin influence",
      "Heavy rainfall",
      "Surface runoff",
    ],
    recommendedActions: [
      "Monitor basin areas",
      "Check drainage capacity",
      "Review nearby access routes",
    ],
  },
  {
    area: "Saidapet",
    riskLevel: "Moderate",
    riskPercentage: 58,
    floodDepth: "24 cm",
    waterFlow: "55%",
    drainageCapacity: "79%",
    rainfall: "44 mm/hr",
    rainfallScenario: "62 mm/hr",
    expectedWaterRise: "+16 cm",
    status: "Moderate Flood Risk",
    contributingFactors: [
      "Moderate rainfall",
      "Urban runoff",
      "Localized drainage stress",
    ],
    recommendedActions: [
      "Monitor rainfall changes",
      "Inspect drainage points",
      "Review local flood reports",
    ],
  },
  {
    area: "Anna Nagar",
    riskLevel: "Moderate",
    riskPercentage: 49,
    floodDepth: "19 cm",
    waterFlow: "48%",
    drainageCapacity: "82%",
    rainfall: "39 mm/hr",
    rainfallScenario: "58 mm/hr",
    expectedWaterRise: "+12 cm",
    status: "Moderate Flood Risk",
    contributingFactors: [
      "Urban runoff",
      "Rainfall accumulation",
      "Localized waterlogging",
    ],
    recommendedActions: [
      "Monitor rainfall",
      "Check drainage points",
      "Track water accumulation",
    ],
  },
  {
    area: "Tambaram",
    riskLevel: "Low",
    riskPercentage: 36,
    floodDepth: "13 cm",
    waterFlow: "41%",
    drainageCapacity: "86%",
    rainfall: "32 mm/hr",
    rainfallScenario: "50 mm/hr",
    expectedWaterRise: "+8 cm",
    status: "Lower Flood Risk",
    contributingFactors: [
      "Moderate rainfall",
      "Surface runoff",
      "Localized water accumulation",
    ],
    recommendedActions: [
      "Continue monitoring",
      "Review drainage condition",
      "Track rainfall changes",
    ],
  },
];

function getRiskStyle(risk: RiskLevel): string {
  if (risk === "Critical") {
    return "border-red-300 bg-red-50 text-red-700";
  }

  if (risk === "High") {
    return "border-orange-300 bg-orange-50 text-orange-700";
  }

  if (risk === "Moderate") {
    return "border-yellow-300 bg-yellow-50 text-yellow-700";
  }

  return "border-green-300 bg-green-50 text-green-700";
}

function getRiskMapStyle(risk: RiskLevel): string {
  if (risk === "Critical") {
    return "bg-red-300 border-red-500";
  }

  if (risk === "High") {
    return "bg-orange-300 border-orange-500";
  }

  if (risk === "Moderate") {
    return "bg-yellow-200 border-yellow-500";
  }

  return "bg-green-200 border-green-500";
}

export default function FloodDigitalTwin() {
  const [selectedArea, setSelectedArea] = useState("T. Nagar");
  const [searchQuery, setSearchQuery] = useState("");

  const currentArea = useMemo(() => {
    return (
      supportedAreas.find((item) => item.area === selectedArea) ||
      supportedAreas[0]
    );
  }, [selectedArea]);

  const filteredAreas = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return supportedAreas;
    }

    return supportedAreas.filter((item) =>
      item.area.toLowerCase().includes(query)
    );
  }, [searchQuery]);



  const selectArea = (area: string) => {
    setSelectedArea(area);
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Flood Digital Twin</h2>

        <p className="text-gray-500">
          Digital representation of a flood-prone Chennai locality
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="text-blue-600" />

            <div>
              <h3 className="font-bold">
                {currentArea.area} Digital Twin
              </h3>

              <p className="text-sm text-gray-500">
                DEMO / SIMULATED DATA
              </p>
            </div>
          </div>

          <div className="w-full lg:w-80">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search supported area..."
                className="w-full rounded-lg border px-10 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {searchQuery.trim() && (
              <div className="mt-2 rounded-lg border bg-white p-2 shadow-sm">
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((item) => (
                    <button
                      key={item.area}
                      type="button"
                      onClick={() => selectArea(item.area)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      <span>{item.area}</span>

                      <span
                        className={
                          "rounded-full border px-2 py-1 text-xs font-semibold " +
                          getRiskStyle(item.riskLevel)
                        }
                      >
                        {item.riskLevel}
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-gray-500">
                    Area not available in the current prototype.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {supportedAreas.map((item) => (
            <button
              key={item.area}
              type="button"
              onClick={() => selectArea(item.area)}
              className={
                "rounded-lg border px-3 py-2 text-sm text-left transition " +
                (item.area === currentArea.area
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100")
              }
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{item.area}</span>

                <span
                  className={
                    "rounded-full border px-2 py-1 text-xs font-semibold " +
                    getRiskStyle(item.riskLevel)
                  }
                >
                  {item.riskLevel}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 h-72 overflow-hidden rounded-lg bg-gray-100 relative">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg,#cbd5e1 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div
            className={
              "absolute left-[20%] top-[30%] h-24 w-40 rounded border-2 " +
              getRiskMapStyle(currentArea.riskLevel)
            }
          />

          <div className="absolute right-[15%] top-[20%] h-20 w-32 rounded border-2 border-blue-500 bg-blue-200/80" />

          <div className="absolute left-[45%] bottom-[15%] h-20 w-36 rounded border-2 border-yellow-500 bg-yellow-200/80" />

          <div className="absolute left-4 bottom-4 rounded-lg bg-white p-3 shadow">
            <p className="text-sm font-semibold">Selected Area</p>

            <p className="text-xs text-gray-500">
              {currentArea.area}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              DEMO / SIMULATED DATA
            </p>
          </div>

          <div className="absolute right-4 top-4 rounded-lg bg-white p-3 shadow">
            <p className="text-xs text-gray-500">Modelled Risk</p>

            <p className="text-lg font-bold">
              {currentArea.riskPercentage}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-4">
          <Waves className="mb-2 text-blue-600" size={22} />

          <p className="text-sm text-gray-500">Flood Depth</p>

          <p className="text-xl font-bold">{currentArea.floodDepth}</p>

          <span className="text-xs text-gray-400">Demo Data</span>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <Droplets className="mb-2 text-blue-600" size={22} />

          <p className="text-sm text-gray-500">Water Flow</p>

          <p className="text-xl font-bold">{currentArea.waterFlow}</p>

          <span className="text-xs text-gray-400">Demo Data</span>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <Gauge className="mb-2 text-blue-600" size={22} />

          <p className="text-sm text-gray-500">Drainage Capacity</p>

          <p className="text-xl font-bold">
            {currentArea.drainageCapacity}
          </p>

          <span className="text-xs text-gray-400">Demo Data</span>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <CloudRain className="mb-2 text-blue-600" size={22} />

          <p className="text-sm text-gray-500">Rainfall</p>

          <p className="text-xl font-bold">{currentArea.rainfall}</p>

          <span className="text-xs text-gray-400">Demo Data</span>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-bold">Flood Propagation Scenario</h3>

            <p className="text-sm text-gray-500">
              Modelled scenario for {currentArea.area}
            </p>
          </div>

          <span
            className={
              "rounded-full border px-3 py-1.5 text-sm " +
              getRiskStyle(currentArea.riskLevel)
            }
          >
            {currentArea.status}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Rainfall Scenario</p>

            <p className="text-xl font-bold">
              {currentArea.rainfallScenario}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Expected Water Rise</p>

            <p className="text-xl font-bold">
              {currentArea.expectedWaterRise}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Projected Risk</p>

            <p className="text-xl font-bold">
              {currentArea.riskLevel}
            </p>

            <p className="text-xs text-gray-400">
              Modelled risk: {currentArea.riskPercentage}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <h3 className="mb-4 font-bold">Contributing Factors</h3>

          <div className="space-y-3">
            {currentArea.contributingFactors.map((factor) => (
              <div
                key={factor}
                className="rounded-lg bg-gray-50 p-3 text-sm"
              >
                {factor}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h3 className="mb-4 font-bold">Recommended Monitoring Actions</h3>

          <div className="space-y-3">
            {currentArea.recommendedActions.map((action) => (
              <div
                key={action}
                className="rounded-lg bg-gray-50 p-3 text-sm"
              >
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 flex gap-3">
        <AlertTriangle className="shrink-0 text-orange-600" />

        <p className="text-sm text-orange-800">
          This digital twin is a prototype simulation using
          demo spatial and environmental data. It is not an
          operational emergency model.
        </p>
      </div>
    </div>
  );
}
