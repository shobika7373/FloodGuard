import {
  Shield,
  Brain,
  Map,
  Droplets,
  Users,
  Database,
  ArrowRight,
  CheckCircle,
  Target,
  Cpu,
  Globe,
} from "lucide-react";

const capabilities = [
  {
    title: "Flood Nowcasting",
    description:
      "Predict short-term urban flood risk using rainfall, water-level and spatial risk inputs.",
    icon: Brain,
  },
  {
    title: "Digital Twin",
    description:
      "Represent flood-prone urban areas through an interactive spatial prototype.",
    icon: Map,
  },
  {
    title: "Drainage Intelligence",
    description:
      "Highlight drainage pressure and potential bottlenecks for better decision support.",
    icon: Droplets,
  },
  {
    title: "Community Intelligence",
    description:
      "Use citizen reports and image-analysis concepts to improve situational awareness.",
    icon: Users,
  },
];

const architecture = [
  "Data Collection",
  "Data Fusion",
  "AI Nowcasting",
  "Explainable Risk",
  "Digital Twin",
  "Action Recommendation",
];

export default function AboutFloodGuard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Shield size={25} />
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                SIH 2026 PROTOTYPE
              </span>
            </div>

            <h1 className="text-3xl font-bold">
              About FLOODGUARD
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-50">
              Chennai Urban Flood Nowcasting, Digital Twin & Early Warning
              System — designed to support earlier, smarter and more
              coordinated flood-response decisions.
            </p>
          </div>

          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15">
            <Shield size={40} />
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
              <Target size={24} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Our Mission
            </h2>
          </div>

          <p className="text-sm leading-7 text-gray-600">
            FLOODGUARD aims to transform urban flood management from a
            reactive process into a proactive decision-support system.
            Instead of only responding after flooding occurs, the platform
            combines environmental, spatial and community information to
            identify potential risks earlier.
          </p>

          <div className="mt-5 rounded-xl bg-blue-50 p-4">
            <p className="text-lg font-bold text-blue-900">
              “Predict. Prevent. Protect.”
            </p>
            <p className="mt-1 text-sm text-blue-700">
              The core idea behind FLOODGUARD.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
              <Globe size={24} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              The Problem We Address
            </h2>
          </div>

          <p className="text-sm leading-7 text-gray-600">
            Chennai can experience intense rainfall, rapid surface runoff,
            drainage overload and localized water accumulation. Flood
            conditions can vary significantly between nearby locations.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            FLOODGUARD provides a unified prototype environment where these
            factors can be visualized, analyzed and converted into
            understandable decision-support information.
          </p>
        </div>
      </div>

      {/* Capabilities */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            FLOODGUARD Capabilities
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Major capabilities demonstrated by the prototype.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border p-5 transition hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="rounded-xl bg-gray-100 p-3 text-blue-700">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-100 p-3 text-indigo-700">
            <Cpu size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              FLOODGUARD Architecture
            </h2>

            <p className="text-sm text-gray-500">
              End-to-end conceptual processing pipeline.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {architecture.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex-1 rounded-xl bg-gray-50 p-4 text-center md:min-w-[120px]">
                <p className="text-sm font-semibold text-gray-800">
                  {step}
                </p>
              </div>

              {index < architecture.length - 1 && (
                <ArrowRight
                  size={18}
                  className="hidden shrink-0 text-gray-400 md:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Technology */}
      <div className="rounded-2xl border bg-gray-50 p-6">
        <div className="flex items-center gap-3">
          <Database className="text-blue-600" size={24} />

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Technology Concept
            </h2>

            <p className="text-sm text-gray-500">
              Technologies planned for the complete system architecture.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            "React + TypeScript",
            "Tailwind CSS",
            "Leaflet + OpenStreetMap",
            "Python FastAPI",
            "PostgreSQL + PostGIS",
            "Machine Learning",
            "Computer Vision",
            "IoT / MQTT Ready",
          ].map((technology) => (
            <div
              key={technology}
              className="flex items-center gap-2 rounded-lg bg-white p-3 text-sm font-medium text-gray-700"
            >
              <CheckCircle size={16} className="text-green-600" />
              {technology}
            </div>
          ))}
        </div>
      </div>

      {/* What makes it different */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          What Makes FLOODGUARD Different?
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-blue-50 p-5">
            <h3 className="font-bold text-blue-900">
              Predictive
            </h3>
            <p className="mt-2 text-sm leading-6 text-blue-800">
              Focuses on anticipating flood risk instead of only displaying
              current conditions.
            </p>
          </div>

          <div className="rounded-xl bg-purple-50 p-5">
            <h3 className="font-bold text-purple-900">
              Explainable
            </h3>
            <p className="mt-2 text-sm leading-6 text-purple-800">
              Converts model outputs into understandable factors that explain
              why an area may be at risk.
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-900">
              Action-Oriented
            </h3>
            <p className="mt-2 text-sm leading-6 text-green-800">
              Connects predicted risk with response recommendations and
              long-term resilience planning.
            </p>
          </div>
        </div>
      </div>

      {/* Final */}
      <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6 text-center">
        <Shield className="mx-auto text-cyan-700" size={32} />

        <h2 className="mt-3 text-2xl font-bold text-cyan-900">
          FLOODGUARD
        </h2>

        <p className="mt-2 text-sm font-medium text-cyan-800">
          Predict. Prevent. Protect.
        </p>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-cyan-700">
          A prototype vision for smarter and more resilient urban flood
          management in Chennai.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Prototype Notice
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          FLOODGUARD is an SIH 2026 prototype. Demonstration values,
          predictions and system capabilities shown in the interface are
          simulated unless explicitly connected to verified live data sources.
        </p>
      </div>
    </div>
  );
}