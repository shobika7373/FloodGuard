import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CloudRain,
  Droplets,
  Gauge,
  MapPin,
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
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [showAreas, setShowAreas] = useState(false);

  const currentArea = useMemo(() => {
    if (!selectedArea) {
      return null;
    }

    return (
      supportedAreas.find(
        (item) => item.area === selectedArea
      ) || null
    );
  }, [selectedArea]);

  const selectArea = (area: string) => {
    setSelectedArea(area);
    setShowAreas(false);
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h2 className="text-2xl font-bold">
          Flood Digital Twin
        </h2>

        <p className="text-gray-500">
          Digital representation of a flood-prone Chennai locality
        </p>
      </div>

      {/* AREA SELECTION */}
      <div className="rounded-xl border bg-white p-5">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          {/* CENTERED AREA HEADER */}
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-base font-semibold text-gray-800">
              Area Selection
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Select an area to view its digital twin information
            </p>

            {/* SELECT AREA BUTTON */}
            <button
              type="button"
              onClick={() =>
                setShowAreas((current) => !current)
              }
              className="mt-4 flex min-w-[220px] items-center justify-between gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-left shadow-sm transition hover:border-blue-500 hover:bg-blue-50"
            >
              <span className="flex items-center gap-2">
                <MapPin
                  size={18}
                  className="text-blue-600"
                />

                <span>
                  {selectedArea || "Select Area"}
                </span>
              </span>

              <span className="text-sm text-gray-500">
                {showAreas ? "▲" : "▼"}
              </span>
            </button>
          </div>

          {/* AREA BUTTONS */}
          {showAreas && (
            <div className="mt-6 border-t border-gray-200 pt-5">
              <p className="mb-4 text-center text-sm font-semibold text-gray-700">
                Select an area
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {supportedAreas.map((item) => (
                  <button
                    key={item.area}
                    type="button"
                    onClick={() => selectArea(item.area)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                      selectedArea === item.area
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MapPin size={15} />
                      {item.area}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SELECTED AREA CONTENT */}
      {currentArea && (
        <>
          {/* DIGITAL TWIN HEADER + MAP */}
          <div className="rounded-xl border bg-white p-5">
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

            {/* DIGITAL TWIN MAP */}
            <div className="relative mt-5 h-72 overflow-hidden rounded-lg bg-gray-100">
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
                  getRiskMapStyle(
                    currentArea.riskLevel
                  )
                }
              />

              <div className="absolute right-[15%] top-[20%] h-20 w-32 rounded border-2 border-blue-500 bg-blue-200/80" />

              <div className="absolute bottom-[15%] left-[45%] h-20 w-36 rounded border-2 border-yellow-500 bg-yellow-200/80" />

              <div className="absolute bottom-4 left-4 rounded-lg bg-white p-3 shadow">
                <p className="text-sm font-semibold">
                  Selected Area
                </p>

                <p className="text-xs text-gray-500">
                  {currentArea.area}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  DEMO / SIMULATED DATA
                </p>
              </div>

              <div className="absolute right-4 top-4 rounded-lg bg-white p-3 shadow">
                <p className="text-xs text-gray-500">
                  Modelled Risk
                </p>

                <p className="text-lg font-bold">
                  {currentArea.riskPercentage}%
                </p>
              </div>
            </div>
          </div>

          {/* FLOOD METRICS */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-xl border bg-white p-4">
              <Waves
                className="mb-2 text-blue-600"
                size={22}
              />

              <p className="text-sm text-gray-500">
                Flood Depth
              </p>

              <p className="text-xl font-bold">
                {currentArea.floodDepth}
              </p>

              <span className="text-xs text-gray-400">
                Demo Data
              </span>
            </div>

            <div className="rounded-xl border bg-white p-4">
              <Droplets
                className="mb-2 text-blue-600"
                size={22}
              />

              <p className="text-sm text-gray-500">
                Water Flow
              </p>

              <p className="text-xl font-bold">
                {currentArea.waterFlow}
              </p>

              <span className="text-xs text-gray-400">
                Demo Data
              </span>
            </div>

            <div className="rounded-xl border bg-white p-4">
              <Gauge
                className="mb-2 text-blue-600"
                size={22}
              />

              <p className="text-sm text-gray-500">
                Drainage Capacity
              </p>

              <p className="text-xl font-bold">
                {currentArea.drainageCapacity}
              </p>

              <span className="text-xs text-gray-400">
                Demo Data
              </span>
            </div>

            <div className="rounded-xl border bg-white p-4">
              <CloudRain
                className="mb-2 text-blue-600"
                size={22}
              />

              <p className="text-sm text-gray-500">
                Rainfall
              </p>

              <p className="text-xl font-bold">
                {currentArea.rainfall}
              </p>

              <span className="text-xs text-gray-400">
                Demo Data
              </span>
            </div>
          </div>

          {/* FLOOD PROPAGATION SCENARIO */}
          <div className="rounded-xl border bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-bold">
                  Flood Propagation Scenario
                </h3>

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
                <p className="text-sm text-gray-500">
                  Rainfall Scenario
                </p>

                <p className="text-xl font-bold">
                  {currentArea.rainfallScenario}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Expected Water Rise
                </p>

                <p className="text-xl font-bold">
                  {currentArea.expectedWaterRise}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Projected Risk
                </p>

                <p className="text-xl font-bold">
                  {currentArea.riskLevel}
                </p>

                <p className="text-xs text-gray-400">
                  Modelled risk:{" "}
                  {currentArea.riskPercentage}%
                </p>
              </div>
            </div>
          </div>

          {/* CONTRIBUTING FACTORS + RECOMMENDED ACTIONS */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border bg-white p-5">
              <h3 className="mb-4 font-bold">
                Contributing Factors
              </h3>

              <div className="space-y-3">
                {currentArea.contributingFactors.map(
                  (factor) => (
                    <div
                      key={factor}
                      className="rounded-lg bg-gray-50 p-3 text-sm"
                    >
                      {factor}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <h3 className="mb-4 font-bold">
                Recommended Monitoring Actions
              </h3>

              <div className="space-y-3">
                {currentArea.recommendedActions.map(
                  (action) => (
                    <div
                      key={action}
                      className="rounded-lg bg-gray-50 p-3 text-sm"
                    >
                      {action}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* PROTOTYPE NOTICE */}
          <div className="flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
            <AlertTriangle className="shrink-0 text-orange-600" />

            <p className="text-sm text-orange-800">
              This digital twin is a prototype simulation
              using demo spatial and environmental data. It
              is not an operational emergency model.
            </p>
          </div>
        </>
      )}
    </div>
  );
}