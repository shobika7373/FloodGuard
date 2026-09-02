import { useState } from "react";
import {
  SlidersHorizontal,
  Play,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function WhatIfSimulator() {
  const [rainfall, setRainfall] = useState(60);
  const [drainage, setDrainage] = useState(75);
  const [blockage, setBlockage] = useState(20);

  const risk = Math.min(
    100,
    Math.max(
      0,
      Math.round(rainfall * 0.7 + blockage * 0.3 - drainage * 0.35)
    )
  );

  const depth = Math.max(
    5,
    Math.round(rainfall * 0.7 + blockage * 0.25 - drainage * 0.3)
  );

  const level =
    risk >= 76
      ? "Critical"
      : risk >= 51
      ? "High"
      : risk >= 26
      ? "Moderate"
      : "Low";

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

          <button className="w-full rounded-lg bg-blue-600 text-white py-3 flex justify-center items-center gap-2 hover:bg-blue-700">
            <Play size={18} />

            Run Simulation
          </button>
        </div>

        {/* Result */}
        <div className="rounded-xl border bg-white p-6">
          <h3 className="font-bold mb-5">
            Simulation Result
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Risk Score
              </p>

              <p className="text-3xl font-bold">
                {risk}/100
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Flood Depth
              </p>

              <p className="text-3xl font-bold">
                {depth} cm
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-red-50 p-5">
            <p className="text-sm text-gray-500">
              Predicted Category
            </p>

            <p className="text-2xl font-bold text-red-700">
              {level}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2 text-gray-600">
            {risk > 60 ? (
              <TrendingUp />
            ) : (
              <TrendingDown />
            )}

            <span>
              Scenario indicates{" "}
              {risk > 60
                ? "increasing flood exposure"
                : "manageable flood exposure"}
              .
            </span>
          </div>

          <p className="mt-5 text-xs text-gray-400">
            DEMO / Simulated Data — prototype calculation only.
          </p>
        </div>
      </div>
    </div>
  );
}