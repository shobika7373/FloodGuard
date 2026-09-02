import { useState } from "react";
import {
  Brain,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
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

type Prediction = {
  time: string;
  probability: number;
  risk: "Low" | "Moderate" | "High" | "Critical";
};

const predictions: Prediction[] = [
  { time: "30 min", probability: 58, risk: "Moderate" },
  { time: "1 hour", probability: 68, risk: "High" },
  { time: "2 hours", probability: 79, risk: "High" },
  { time: "3 hours", probability: 86, risk: "Critical" },
];

const riskColor = {
  Low: "text-green-700 bg-green-100",
  Moderate: "text-yellow-700 bg-yellow-100",
  High: "text-orange-700 bg-orange-100",
  Critical: "text-red-700 bg-red-100",
};

export default function AIFloodPrediction() {
  const [selectedTime, setSelectedTime] = useState("3 hours");

  const selected =
    predictions.find(
      (item) => item.time.toLowerCase() === selectedTime
    ) ?? predictions[3];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Brain size={24} />
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                DEMO / SIMULATED AI
              </span>
            </div>

            <h1 className="text-3xl font-bold">
              AI Flood Prediction
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-purple-100">
              Short-term flood-risk prediction using simulated rainfall,
              water-level, drainage and vulnerability inputs.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-5 py-4 text-center">
            <p className="text-xs text-purple-200">Prediction Status</p>
            <p className="mt-1 font-bold">Analysis Ready</p>
          </div>
        </div>
      </div>

      {/* Prediction Horizon */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Clock className="text-purple-600" size={22} />

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Prediction Horizon
            </h2>
            <p className="text-sm text-gray-500">
              Select a future time window
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {predictions.map((prediction) => {
            const active =
              selectedTime === prediction.time.toLowerCase();

            return (
              <button
                key={prediction.time}
                onClick={() =>
                  setSelectedTime(prediction.time.toLowerCase())
                }
                className={`rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-purple-600 bg-purple-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <p className="text-sm text-gray-500">
                  Next
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {prediction.time}
                </p>

                <p className="mt-2 text-sm font-semibold text-purple-700">
                  {prediction.probability}% probability
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Prediction */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-100 p-3 text-red-600">
              <AlertTriangle size={25} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Predicted Risk
              </p>
              <h2 className="text-2xl font-bold">
                {selected.risk}
              </h2>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-[14px] border-red-200">
              <span className="text-4xl font-bold text-gray-900">
                {selected.probability}%
              </span>

              <span className="text-xs text-gray-500">
                probability
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-500">
              Selected horizon
            </p>

            <p className="mt-1 font-bold text-gray-900">
              {selected.time}
            </p>
          </div>
        </div>

        {/* Risk Chart */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Flood Risk Progression
              </h2>

              <p className="text-sm text-gray-500">
                Simulated prediction probability
              </p>
            </div>

            <TrendingUp className="text-purple-600" size={23} />
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictions}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <YAxis domain={[0, 100]} />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Flood Probability",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="probability"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Factors */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Info className="text-blue-600" size={22} />

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Prediction Inputs
            </h2>

            <p className="text-sm text-gray-500">
              Example factors used by the prototype prediction pipeline.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Rainfall Intensity", "78 mm/hr", "High"],
            ["Water Level", "1.42 m", "Rising"],
            ["Drainage Utilization", "84%", "High"],
            ["Area Vulnerability", "82 / 100", "High"],
          ].map(([name, value, status]) => (
            <div
              key={name}
              className="rounded-xl bg-gray-50 p-4"
            >
              <p className="text-sm text-gray-500">{name}</p>

              <p className="mt-2 text-xl font-bold text-gray-900">
                {value}
              </p>

              <p className="mt-1 text-xs font-semibold text-orange-600">
                {status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Table */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Prediction Summary
        </h2>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Probability</th>
                <th className="px-4 py-3">Risk Category</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {predictions.map((prediction) => (
                <tr
                  key={prediction.time}
                  className="border-b last:border-0"
                >
                  <td className="px-4 py-4 font-semibold">
                    {prediction.time}
                  </td>

                  <td className="px-4 py-4 font-bold">
                    {prediction.probability}%
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${riskColor[prediction.risk]}`}
                    >
                      {prediction.risk}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {prediction.risk === "Critical" ? (
                      <span className="flex items-center gap-2 text-sm font-semibold text-red-600">
                        <AlertTriangle size={16} />
                        Immediate attention
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={16} />
                        Monitor
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Explanation */}
      <div className="rounded-2xl border bg-indigo-50 p-6">
        <div className="flex items-start gap-3">
          <Brain className="mt-1 text-indigo-700" size={24} />

          <div>
            <h2 className="font-bold text-indigo-900">
              AI Model Concept
            </h2>

            <p className="mt-2 text-sm leading-6 text-indigo-800">
              The prototype represents a future machine-learning pipeline
              where rainfall, water level, drainage utilization, elevation,
              soil saturation and historical vulnerability can be combined
              to estimate short-term flood risk.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Random Forest / XGBoost",
                "Temporal Prediction",
                "Feature Engineering",
                "Risk Classification",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-indigo-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confidence */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <Shield
            size={20}
            className="mt-0.5 text-blue-600"
          />

          <div>
            <p className="text-sm font-semibold text-blue-900">
              Prototype Confidence
            </p>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              Confidence values are intentionally presented as simulated
              demonstration outputs. A production model would require
              validated historical datasets, continuous calibration and
              independent evaluation before operational use.
            </p>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Prototype Notice
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          All predictions and input values on this page are simulated.
          This module does not currently run a trained machine-learning model
          or provide official flood forecasts.
        </p>
      </div>
    </div>
  );
}