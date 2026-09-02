import {
  CalendarDays,
  MapPin,
  CloudRain,
  AlertTriangle,
  TrendingUp,
  History,
  Waves,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const floodEvents = [
  {
    year: "2015",
    event: "Chennai Floods",
    rainfall: "Heavy",
    severity: "Critical",
    affected: "Multiple zones",
    lesson: "Need for better drainage and early warning",
  },
  {
    year: "2021",
    event: "Chennai Urban Flooding",
    rainfall: "Very Heavy",
    severity: "High",
    affected: "Several low-lying areas",
    lesson: "Importance of rainfall and drainage monitoring",
  },
  {
    year: "2023",
    event: "Cyclone Michaung",
    rainfall: "Extreme",
    severity: "Critical",
    affected: "Large parts of Chennai",
    lesson: "Need for rapid flood forecasting and response",
  },
  {
    year: "2024",
    event: "Urban Flooding Episodes",
    rainfall: "Heavy",
    severity: "Moderate",
    affected: "Localized areas",
    lesson: "Localized nowcasting can improve preparedness",
  },
];

const rainfallData = [
  { year: "2015", rainfall: 494 },
  { year: "2021", rainfall: 410 },
  { year: "2023", rainfall: 520 },
  { year: "2024", rainfall: 360 },
];

const severityData = [
  { year: "2015", risk: 95 },
  { year: "2021", risk: 82 },
  { year: "2023", risk: 94 },
  { year: "2024", risk: 68 },
];

export default function HistoricalFloods() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <History className="h-7 w-7 text-blue-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Historical Floods
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Explore historical flood events and lessons for urban flood
            preparedness.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          DEMO / HISTORICAL REFERENCE
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Events Tracked
            </p>

            <History className="h-5 w-5 text-blue-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            4
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Example historical events
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-red-700">
              Critical Events
            </p>

            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-red-700">
            2
          </p>

          <p className="mt-2 text-xs text-red-600">
            High-impact examples
          </p>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-blue-700">
              Maximum Risk
            </p>

            <Waves className="h-5 w-5 text-blue-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-blue-700">
            95/100
          </p>

          <p className="mt-2 text-xs text-blue-600">
            Example historical risk score
          </p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-orange-700">
              Key Pattern
            </p>

            <TrendingUp className="h-5 w-5 text-orange-600" />
          </div>

          <p className="mt-2 text-lg font-bold text-orange-700">
            Heavy Rain + Drainage
          </p>

          <p className="mt-2 text-xs text-orange-600">
            Important flood-risk factors
          </p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Rainfall Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-600" />

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Historical Rainfall Comparison
              </h2>

              <p className="text-sm text-slate-500">
                Illustrative rainfall values for the prototype.
              </p>
            </div>
          </div>

          <div className="mt-5 h-[280px]">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="rainfall"
                  fill="#2563eb"
                  name="Rainfall"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

          <p className="text-center text-xs text-slate-400">
            Illustrative rainfall index / reference values
          </p>

        </div>

        {/* Risk Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Historical Risk Trend
              </h2>

              <p className="text-sm text-slate-500">
                Example flood-risk scoring for demonstration.
              </p>
            </div>
          </div>

          <div className="mt-5 h-[280px]">

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={severityData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" />

                <YAxis domain={[0, 100]} />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#ea580c"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Risk Score"
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

          <p className="text-center text-xs text-slate-400">
            0 = lower risk · 100 = higher risk
          </p>

        </div>

      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-blue-600" />

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Chennai Flood Timeline
            </h2>

            <p className="text-sm text-slate-500">
              Selected historical events used to demonstrate learning from
              previous floods.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">

          {floodEvents.map((event, index) => (

            <div
              key={event.year}
              className="relative flex gap-4"
            >

              {/* Timeline line */}
              {index !== floodEvents.length - 1 && (
                <div className="absolute left-[15px] top-9 h-full w-px bg-slate-200" />
              )}

              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {event.year.slice(2)}
              </div>

              <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4">

                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                  <div>
                    <p className="font-semibold text-slate-900">
                      {event.event}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {event.year}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      event.severity === "Critical"
                        ? "bg-red-100 text-red-700"
                        : event.severity === "High"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {event.severity}
                  </span>

                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">

                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-blue-600" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Rainfall
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        {event.rainfall}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-600" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Affected Area
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        {event.affected}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Key Lesson
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      {event.lesson}
                    </p>
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Lessons */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">

        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />

          <h2 className="text-lg font-semibold text-blue-900">
            Lessons for FLOODGUARD
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

          <div className="rounded-lg bg-white p-4">
            <p className="font-semibold text-slate-900">
              1. Early Detection
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Combining rainfall, water-level and drainage information can
              support earlier identification of flood-prone conditions.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <p className="font-semibold text-slate-900">
              2. Localized Risk
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Flood impacts can vary significantly between different parts
              of an urban area.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <p className="font-semibold text-slate-900">
              3. Drainage Awareness
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Drainage capacity and possible bottlenecks should be considered
              alongside rainfall forecasts.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4">
            <p className="font-semibold text-slate-900">
              4. Faster Response
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Flood intelligence can help authorities prioritize areas that
              may require closer monitoring or intervention.
            </p>
          </div>

        </div>

      </div>

      {/* Prototype Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> This page is a demonstration
        interface. Historical event summaries and chart values are
        illustrative/reference data and should be replaced with verified
        datasets before operational use.
      </div>

    </div>
  );
}