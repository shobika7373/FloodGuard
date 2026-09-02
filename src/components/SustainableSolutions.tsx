import {
  Leaf,
  Droplets,
  TreePine,
  Waves,
  Recycle,
  Lightbulb,
  MapPin,
  TrendingUp,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";

const solutions = [
  {
    title: "Rain Gardens",
    category: "Green Infrastructure",
    icon: Leaf,
    impact: "High",
    description:
      "Vegetated areas that temporarily collect and absorb stormwater, reducing surface runoff.",
    benefit: "Runoff reduction",
    score: 82,
  },
  {
    title: "Permeable Pavements",
    category: "Urban Drainage",
    icon: Droplets,
    impact: "High",
    description:
      "Porous pavement systems allow more rainwater to infiltrate into the ground.",
    benefit: "Improved infiltration",
    score: 76,
  },
  {
    title: "Urban Tree Canopy",
    category: "Nature-Based Solution",
    icon: TreePine,
    impact: "Moderate",
    description:
      "Increasing vegetation can intercept rainfall and support better stormwater management.",
    benefit: "Natural water retention",
    score: 68,
  },
  {
    title: "Retention Ponds",
    category: "Water Management",
    icon: Waves,
    impact: "High",
    description:
      "Temporary storage areas can reduce peak stormwater flow during intense rainfall.",
    benefit: "Peak-flow reduction",
    score: 88,
  },
  {
    title: "Rainwater Harvesting",
    category: "Water Conservation",
    icon: Recycle,
    impact: "Moderate",
    description:
      "Capture and reuse rainwater from suitable buildings and public infrastructure.",
    benefit: "Water reuse",
    score: 71,
  },
  {
    title: "Smart Drainage Upgrades",
    category: "Infrastructure",
    icon: Lightbulb,
    impact: "High",
    description:
      "Prioritize drainage improvements using flood-risk, blockage and infrastructure data.",
    benefit: "Targeted investment",
    score: 91,
  },
];

const priorityAreas = [
  {
    area: "Velachery",
    priority: "Very High",
    solution: "Drainage upgrade + retention",
    reduction: "High potential",
  },
  {
    area: "T. Nagar",
    priority: "High",
    solution: "Permeable surfaces + rain gardens",
    reduction: "Moderate potential",
  },
  {
    area: "Saidapet",
    priority: "High",
    solution: "Drainage maintenance + green infrastructure",
    reduction: "High potential",
  },
  {
    area: "Adyar",
    priority: "Moderate",
    solution: "Rainwater harvesting + vegetation",
    reduction: "Moderate potential",
  },
];

export default function SustainableSolutions() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-green-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Sustainable Solutions
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Explore nature-based and infrastructure solutions for reducing
            long-term urban flood risk.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          DEMO / SIMULATED ANALYSIS
        </div>
      </div>

      {/* Introduction */}
      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-white p-3">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-green-900">
              From Flood Response to Flood Resilience
            </h2>

            <p className="mt-2 max-w-4xl text-sm leading-6 text-green-800">
              FLOODGUARD can use flood-risk intelligence to identify locations
              where sustainable interventions may reduce future flood exposure.
              The goal is to combine digital flood intelligence with
              long-term urban resilience planning.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Solutions Evaluated</p>
            <Lightbulb className="h-5 w-5 text-yellow-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-slate-900">18</p>

          <p className="mt-2 text-xs text-slate-500">
            Prototype intervention options
          </p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-green-700">High Priority</p>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-green-700">7</p>

          <p className="mt-2 text-xs text-green-600">
            Areas requiring attention
          </p>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-blue-700">Green Infrastructure</p>
            <TreePine className="h-5 w-5 text-blue-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-blue-700">9</p>

          <p className="mt-2 text-xs text-blue-600">
            Nature-based opportunities
          </p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-orange-700">Top Priority Score</p>
            <Lightbulb className="h-5 w-5 text-orange-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-orange-700">91/100</p>

          <p className="mt-2 text-xs text-orange-600">
            Smart drainage upgrades
          </p>
        </div>
      </div>

      {/* Solution Cards */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Recommended Sustainable Interventions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Example solutions ranked using simulated flood-resilience
            criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution) => {
            const Icon = solution.icon;

            return (
              <div
                key={solution.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-green-50 p-3">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      solution.impact === "High"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {solution.impact} Impact
                  </span>
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {solution.category}
                </p>

                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {solution.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {solution.description}
                </p>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Resilience Priority
                    </span>

                    <span className="font-bold text-slate-800">
                      {solution.score}/100
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-green-600"
                      style={{ width: `${solution.score}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-500">
                    {solution.benefit}
                  </span>

                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                    Explore
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Priority Areas */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              Priority Intervention Areas
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Example areas where flood intelligence could guide sustainable
            infrastructure planning.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Area
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Priority
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Suggested Intervention
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Potential
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {priorityAreas.map((item) => (
                <tr key={item.area} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />

                      <span className="font-semibold text-slate-800">
                        {item.area}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.priority === "Very High"
                          ? "bg-red-100 text-red-700"
                          : item.priority === "High"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {item.solution}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-700">
                    {item.reduction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impact Framework */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Sustainable Intervention Framework
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          How FLOODGUARD can connect flood intelligence with long-term
          resilience planning.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              1
            </div>

            <h3 className="mt-3 font-semibold text-slate-900">
              Identify Risk
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Use flood-risk and drainage information to locate vulnerable
              areas.
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
              2
            </div>

            <h3 className="mt-3 font-semibold text-slate-900">
              Select Solution
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Compare nature-based and infrastructure interventions.
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
              3
            </div>

            <h3 className="mt-3 font-semibold text-slate-900">
              Prioritize
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Rank interventions using risk, impact and feasibility criteria.
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
              4
            </div>

            <h3 className="mt-3 font-semibold text-slate-900">
              Monitor Impact
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Compare future flood conditions and intervention outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-lg font-semibold text-green-900">
            Nature-Based Benefits
          </h2>

          <div className="mt-5 space-y-3">
            {[
              "Reduce stormwater runoff",
              "Increase natural water infiltration",
              "Improve urban green spaces",
              "Support long-term climate resilience",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />

                <span className="text-sm text-green-800">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-semibold text-blue-900">
            Data-Driven Planning
          </h2>

          <div className="mt-5 space-y-3">
            {[
              "Use flood-risk maps for prioritization",
              "Identify drainage bottlenecks",
              "Compare intervention scenarios",
              "Support evidence-based planning",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-blue-600" />

                <span className="text-sm text-blue-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> Solution rankings, priority
        scores, affected areas and impact estimates are simulated
        demonstration values. Actual infrastructure decisions require
        engineering studies, environmental assessment, local planning data
        and authorization from relevant authorities.
      </div>
    </div>
  );
}