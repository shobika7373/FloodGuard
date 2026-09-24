import { useState } from "react";
import {
  SlidersHorizontal,
  Play,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";

type SimulationResult = {
  risk: number;
  depth: number;
  level: string;
};

export default function WhatIfSimulator() {
  const [rainfall, setRainfall] = useState(60);
  const [drainage, setDrainage] = useState(75);
  const [blockage, setBlockage] = useState(20);

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const runSimulation = () => {
    const calculatedRisk = Math.min(
      100,
      Math.max(
        0,
        Math.round(
          rainfall * 0.7 + blockage * 0.3 - drainage * 0.35
        )
      )
    );

    const calculatedDepth = Math.max(
      5,
      Math.round(
        rainfall * 0.7 + blockage * 0.25 - drainage * 0.3
      )
    );

    const calculatedLevel =
      calculatedRisk >= 76
        ? "Critical"
        : calculatedRisk >= 51
        ? "High"
        : calculatedRisk >= 26
        ? "Moderate"
        : "Low";

    setResult({
      risk: calculatedRisk,
      depth: calculatedDepth,
      level: calculatedLevel,
    });

    setShowResponse(false);
  };

  const getResponseActions = () => {
    if (!result) return [];

    switch (result.level) {
      case "Critical":
        return [
          "Review drainage and flood-prone locations immediately.",
          "Review prototype evacuation and warning workflows.",
          "Prioritize inspection of severely affected drainage points.",
        ];

      case "High":
        return [
          "Review vulnerable drainage locations.",
          "Prepare prototype warning and monitoring actions.",
          "Continue monitoring rainfall, blockage, and drainage conditions.",
        ];

      case "Moderate":
        return [
          "Continue monitoring rainfall and drainage conditions.",
          "Review locations with elevated blockage.",
          "Prepare precautionary response measures if conditions worsen.",
        ];

      default:
        return [
          "Continue monitoring simulated conditions.",
          "Maintain normal drainage observation.",
          "Review the scenario again if rainfall or blockage increases.",
        ];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          What-If Flood Simulator
        </h2>

        <p className="text-gray-500">
          Test how changing conditions can affect flood risk
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="rounded-xl border bg-white p-6 space-y-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="text-blue-600" />

            <h3 className="font-bold">
              Scenario Controls
            </h3>
          </div>

          {/* Rainfall */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">
                Rainfall
              </label>

              <span>
                {rainfall} mm/hr
              </span>
            </div>

            <input
              type="range"
              min="20"
              max="120"
              value={rainfall}
              onChange={(e) =>
                setRainfall(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          {/* Drainage */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">
                Drainage Capacity
              </label>

              <span>
                {drainage}%
              </span>
            </div>

            <input
              type="range"
              min="20"
              max="100"
              value={drainage}
              onChange={(e) =>
                setDrainage(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          {/* Blockage */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">
                Drain Blockage
              </label>

              <span>
                {blockage}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={blockage}
              onChange={(e) =>
                setBlockage(Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          <button
            onClick={runSimulation}
            className="w-full rounded-lg bg-blue-600 text-white py-3 flex justify-center items-center gap-2 hover:bg-blue-700"
          >
            <Play size={18} />
            Run Simulation
          </button>
        </div>

        {/* Result */}
        <div className="rounded-xl border bg-white p-6">
          <h3 className="font-bold mb-5">
            Simulation Result
          </h3>

          {!result ? (
            <div className="rounded-lg bg-blue-50 p-5 text-blue-800">
              Adjust the scenario controls and click{" "}
              <strong>Run Simulation</strong> to generate a
              simulated flood-risk result.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Risk Score
                  </p>

                  <p className="text-3xl font-bold">
                    {result.risk}/100
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Flood Depth
                  </p>

                  <p className="text-3xl font-bold">
                    {result.depth} cm
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-red-50 p-5">
                <p className="text-sm text-gray-500">
                  Predicted Category
                </p>

                <p className="text-2xl font-bold text-red-700">
                  {result.level}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2 text-gray-600">
                {result.risk > 60 ? (
                  <TrendingUp />
                ) : (
                  <TrendingDown />
                )}

                <span>
                  Scenario indicates{" "}
                  {result.risk > 60
                    ? "increasing flood exposure"
                    : "manageable flood exposure"}
                  .
                </span>
              </div>

              <button
                onClick={() => setShowResponse(true)}
                className="mt-5 w-full rounded-lg border border-blue-600 text-blue-700 py-3 font-medium hover:bg-blue-50"
              >
                Review Response
              </button>
            </>
          )}

          <p className="mt-5 text-xs text-gray-400">
            DEMO / Simulated Data — prototype calculation only.
          </p>
        </div>
      </div>

      {/* Prototype Response Review */}
      {showResponse && result && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">
                Prototype Response Review
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Simulated response options based on the scenario result.
              </p>
            </div>

            <button
              onClick={() => setShowResponse(false)}
              className="rounded-lg p-2 hover:bg-gray-100"
              aria-label="Close response review"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-5 rounded-lg bg-gray-50 p-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs uppercase text-gray-500">
                  Risk Score
                </p>
                <p className="text-xl font-bold">
                  {result.risk}/100
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-500">
                  Flood Depth
                </p>
                <p className="text-xl font-bold">
                  {result.depth} cm
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-500">
                  Category
                </p>
                <p className="text-xl font-bold">
                  {result.level}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="font-bold">
              Suggested Prototype Actions
            </h4>

            <div className="mt-3 space-y-3">
              {getResponseActions().map((action, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-gray-50 p-4"
                >
                  <p className="text-sm">
                    {index + 1}. {action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-yellow-50 border border-yellow-200 p-4">
            <p className="text-sm text-yellow-800">
              <strong>Prototype notice:</strong> These are simulated
              response suggestions for demonstration. They are not
              real emergency instructions and do not dispatch rescue,
              evacuation, medical, or other emergency services.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
