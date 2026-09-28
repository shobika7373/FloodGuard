import { useState } from "react";
import {
  Activity,
  Accessibility,
  AlertTriangle,
  BarChart3,
  Bell,
  Brain,
  HeartHandshake,
  ChevronRight,
  Droplets,
  Gauge,
  Home,
  Leaf,
  Map,
  Menu,
  Settings,
  Shield,
  Siren,
  Waves,
  X,
} from "lucide-react";

import FloodDigitalTwin from "./components/FloodDigitalTwin";
import WhatIfSimulator from "./components/WhatIfSimulator";
import AIInsights from "./components/AIInsights";
import AuthorityDashboard from "./components/AuthorityDashboard";
import RequestHelp from "./components/RequestHelp";
import AdminPanel from "./components/AdminPanel";
import AboutFloodGuard from "./components/AboutFloodGuard";
import Alerts from "./components/Alerts";
import Rainfall from "./components/Rainfall";
import DrainageIntelligence from "./components/DrainageIntelligence";
import LiveFloodMap from "./components/LiveFloodMap";
import AIFloodPrediction from "./components/AIFloodPrediction";
import ExplainableAI from "./components/ExplainableAI";
import WaterLevels from "./components/WaterLevels";
import AIActionEngine from "./components/AIActionEngine";
import CommunityReports from "./components/CommunityReports";
import PhotoWaterDepthAnalysis from "./components/PhotoWaterDepthAnalysis";
import NotificationBell from "./components/NotificationBell";
import EvacuationRoutes from "./components/EvacuationRoutes";
import HistoricalFloods from "./components/HistoricalFloods";
import SustainableSolutions from "./components/SustainableSolutions";

type Page =
  | "Overview"
  | "Live Flood Map"
  | "Flood Digital Twin"
  | "AI Prediction"
  | "Why This Area Will Flood?"
  | "Rainfall"
  | "Drainage Intelligence"
  | "Water Levels"
  | "AI Action Engine"
  | "Community Reports"
  | "Request Help"
  | "Photo Water-Depth Analysis"
  | "Evacuation Routes"
  | "Alerts"
  | "Historical Floods"
  | "Sustainable Solutions"
  | "What-If Simulator"
  | "AI Insights"
  | "Authority Dashboard"
  | "Admin Panel"
  | "About FloodGuard";

const menuGroups = [
  {
    title: "MONITOR",
    items: [
      { name: "Overview", icon: Home },
      { name: "Live Flood Map", icon: Map },
      { name: "Flood Digital Twin", icon: Waves },
      { name: "AI Prediction", icon: Brain },
      { name: "Why This Area Will Flood?", icon: BarChart3 },
      { name: "Rainfall", icon: Droplets },
      { name: "Drainage Intelligence", icon: Activity },
      { name: "Water Levels", icon: Gauge },
    ],
  },
  {
    title: "RESPOND",
    items: [
      { name: "AI Action Engine", icon: Brain },
      { name: "Community Reports", icon: Bell },
      { name: "Request Help", icon: HeartHandshake },
      { name: "Photo Water-Depth Analysis", icon: Waves },
      { name: "Evacuation Routes", icon: Map },
      { name: "Alerts", icon: Siren },
    ],
  },
  {
    title: "PLAN",
    items: [
      { name: "Historical Floods", icon: BarChart3 },
      { name: "Sustainable Solutions", icon: Leaf },
      { name: "What-If Simulator", icon: Activity },
      { name: "AI Insights", icon: Brain },
    ],
  },
  {
    title: "MANAGE",
    items: [
      { name: "Authority Dashboard", icon: Shield },
      { name: "Admin Panel", icon: Settings },
      { name: "About FloodGuard", icon: Shield },
    ],
  },
];

function Overview({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const zones = [
    { name: "T. Nagar", risk: 86, level: "Critical" },
    { name: "Velachery", risk: 72, level: "High" },
    { name: "Adyar", risk: 68, level: "High" },
    { name: "Anna Nagar", risk: 48, level: "Moderate" },
  ];

  return (
    <div className="space-y-6 bg-blue-50 p-6 rounded-xl min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2 py-4">
        <h1 className="text-3xl font-bold tracking-widest">FLOODGUARD COMMAND CENTER</h1>
        <p className="text-gray-600">Chennai Urban Flood Nowcasting & Decision Support</p>
        <span className="inline-block bg-yellow-300 text-black font-bold px-4 py-1 rounded-full text-sm animate-pulse">
          DEMO / SIMULATED DATA
        </span>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            FloodGuard Overview
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Chennai Urban Flood Nowcasting & Early Warning System
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          System Operational
        </div>
      </div>

      {/* Demo Notice */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <strong>DEMO / SIMULATED DATA:</strong> Values shown on this prototype
        are demonstration values and are not live official Chennai data.
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Current Flood Risk</p>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>

          <p className="mt-2 text-3xl font-bold text-orange-600">
            Moderate
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Chennai demo condition
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Rainfall Intensity</p>
            <Droplets className="h-5 w-5 text-blue-500" />
          </div>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            42 mm/hr
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Simulated value
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Water Level</p>
            <Waves className="h-5 w-5 text-blue-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            1.8 m
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Simulated value
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Drainage Utilization</p>
            <Gauge className="h-5 w-5 text-purple-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            76%
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Simulated value
          </p>
        </div>
      </div>

      {/* Main grid */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
  <div className="flex items-center justify-between">
    <p className="text-sm text-slate-500">Prediction Horizon</p>
    <Activity className="h-5 w-5 text-purple-600" />
  </div>

  <p className="mt-2 text-3xl font-bold text-slate-900">
    3 Hours
  </p>

  <p className="mt-1 text-xs text-slate-500">
    Simulated forecast window
  </p>
</div>

<div className="rounded-xl border border-slate-200 bg-white p-4">
  <div className="flex items-center justify-between">
    <p className="text-sm text-slate-500">Focus Area</p>
    <Map className="h-5 w-5 text-red-500" />
  </div>

  <p className="mt-2 text-2xl font-bold text-slate-900">
    T. Nagar
  </p>

  <p className="mt-1 text-xs text-slate-500">
    Demo high-risk zone
  </p>
</div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Map */}
        <div className="rounded-xl border border-slate-200 bg-white xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h2 className="font-semibold text-slate-900">
                Chennai Flood Risk Map
              </h2>

              <p className="text-xs text-slate-500">
                DEMO / SIMULATED DATA
              </p>
              <button
  onClick={() => onNavigate("Live Flood Map")}
  className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
>
  View Existing Live Flood Map
</button>
            </div>

            <Map className="h-5 w-5 text-slate-500" />
          </div>

          <div className="relative h-[380px] overflow-hidden rounded-b-xl bg-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,#dbeafe,transparent_25%),radial-gradient(circle_at_70%_60%,#bfdbfe,transparent_30%),linear-gradient(135deg,#e2e8f0,#f8fafc)]" />

            {/* Roads */}
            <div className="absolute left-[10%] top-[35%] h-2 w-[80%] rotate-12 bg-white shadow" />

            <div className="absolute left-[30%] top-[10%] h-[80%] w-2 rotate-[15deg] bg-white shadow" />

            <div className="absolute left-[15%] top-[70%] h-2 w-[70%] -rotate-12 bg-white shadow" />

            {/* Critical */}
            <div className="absolute left-[25%] top-[30%] flex h-24 w-24 items-center justify-center rounded-full bg-red-500/60 ring-4 ring-red-300/50">
              <span className="text-xs font-bold text-red-900">
                CRITICAL
              </span>
            </div>

            {/* High */}
            <div className="absolute right-[20%] top-[25%] flex h-28 w-28 items-center justify-center rounded-full bg-orange-400/60 ring-4 ring-orange-200/60">
              <span className="text-xs font-bold text-orange-900">
                HIGH
              </span>
            </div>

            {/* Moderate */}
            <div className="absolute bottom-[18%] left-[55%] flex h-24 w-24 items-center justify-center rounded-full bg-yellow-300/60 ring-4 ring-yellow-100/70">
              <span className="text-xs font-bold text-yellow-900">
                MODERATE
              </span>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 rounded-lg bg-white/95 p-3 shadow">
              <p className="mb-2 text-xs font-semibold text-slate-700">
                Flood Risk
              </p>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  Low
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  Moderate
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-orange-500" />
                  High
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  Critical
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Nowcasting */}
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />

              <h2 className="font-semibold text-slate-900">
                AI Nowcasting
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Flood risk prediction
            </p>
          </div>

          <div className="space-y-4 p-5">
            {[
              ["30 min", "Moderate", "54%"],
              ["1 hour", "High", "71%"],
              ["2 hours", "High", "79%"],
              ["3 hours", "Critical", "86%"],
            ].map(([time, risk, probability]) => (
              <div
                key={time}
                className="rounded-lg border border-slate-200 p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {time}
                  </span>

                  <span className="text-xs font-semibold text-slate-500">
                    {probability}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span
  className={`text-sm font-bold ${
    risk === "Critical"
      ? "text-red-600"
      : risk === "High"
        ? "text-orange-600"
        : "text-yellow-600"
  }`}
>
  {risk}
</span>

                  <span className="text-xs text-slate-400">
                    DEMO
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High risk zones + alerts */}
      {/* Why this area is at risk */}
<div className="rounded-xl border border-slate-200 bg-white p-5">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="font-semibold text-slate-900">
        Why This Area Is At Risk
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        Key factors contributing to the simulated risk
      </p>
    </div>

    <AlertTriangle className="h-5 w-5 text-orange-500" />
  </div>

  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
    <div className="rounded-lg bg-blue-50 p-4">
      <p className="text-sm font-semibold text-blue-800">
        Heavy Rainfall
      </p>
      <p className="mt-1 text-xs text-blue-700">
        Rainfall intensity is increasing.
      </p>
    </div>

    <div className="rounded-lg bg-cyan-50 p-4">
      <p className="text-sm font-semibold text-cyan-800">
        Rising Water Level
      </p>
      <p className="mt-1 text-xs text-cyan-700">
        Simulated water level is rising.
      </p>
    </div>

    <div className="rounded-lg bg-purple-50 p-4">
      <p className="text-sm font-semibold text-purple-800">
        Drainage Load
      </p>
      <p className="mt-1 text-xs text-purple-700">
        Drainage utilization is elevated.
      </p>
    </div>

    <div className="rounded-lg bg-orange-50 p-4">
      <p className="text-sm font-semibold text-orange-800">
        Area Vulnerability
      </p>
      <p className="mt-1 text-xs text-orange-700">
        Low-lying urban areas may face higher exposure.
      </p>
    </div>
  </div>
</div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">
              High-Risk Zones
            </h2>

            <span className="text-xs text-slate-400">
              DEMO
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {zones.map((zone) => (
              <div
                key={zone.name}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium text-slate-800">
                    {zone.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    Risk score: {zone.risk}/100
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    zone.level === "Critical"
                      ? "bg-red-100 text-red-700"
                      : zone.level === "High"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {zone.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">
              Recent Alerts
            </h2>

            <Bell className="h-5 w-5 text-red-500" />
          </div>

          <div className="space-y-3 p-5">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="font-semibold text-red-800">
                Critical flood risk — T. Nagar
              </p>

              <p className="mt-1 text-xs text-red-700">
                Simulated rapid water-level rise
              </p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
              <p className="font-semibold text-orange-800">
                High rainfall — Velachery
              </p>

              <p className="mt-1 text-xs text-orange-700">
                Simulated rainfall intensity increase
              </p>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="font-semibold text-yellow-800">
                Drainage warning — Adyar
              </p>

              <p className="mt-1 text-xs text-yellow-700">
                Simulated drainage utilization increase
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline */}
      {/* Recommended response */}
<div className="rounded-xl border border-slate-200 bg-white p-5">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="font-semibold text-slate-900">
        Recommended Response
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        Prototype recommendations based on simulated conditions
      </p>
    </div>

    <Siren className="h-5 w-5 text-red-500" />
  </div>

  <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="font-semibold text-slate-800">
        Monitor affected zone
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Review the current risk condition.
      </p>
    </div>

    <div className="rounded-lg border border-slate-200 p-4">
      <p className="font-semibold text-slate-800">
        Inspect drainage capacity
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Review drainage utilization and bottlenecks.
      </p>
    </div>

    <div className="rounded-lg border border-slate-200 p-4">
      <p className="font-semibold text-slate-800">
        Prepare response teams
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Prototype planning recommendation.
      </p>
    </div>

    <div className="rounded-lg border border-slate-200 p-4">
      <p className="font-semibold text-slate-800">
        Review evacuation route
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Check the existing evacuation route page.
      </p>
    </div>
  </div>

  <p className="mt-4 text-xs font-medium text-amber-700">
    Prototype recommendations only — not emergency instructions.
  </p>
</div>
{/* Quick investigation */}
<div className="rounded-xl border border-slate-200 bg-white p-5">
  <div>
    <h2 className="font-semibold text-slate-900">
      Quick Investigation
    </h2>

    <p className="mt-1 text-xs text-slate-500">
      Explore existing FloodGuard intelligence modules.
    </p>
  </div>

  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {[
      ["Live Flood Map", Map],
      ["AI Flood Prediction", Brain],
      ["Why This Area Will Flood?", BarChart3],
      ["Water Levels", Waves],
      ["Drainage Intelligence", Activity],
      ["AI Action Engine", Siren],
    ].map(([name, Icon]) => (
      <button
        key={name as string}
        onClick={() => onNavigate(name as Page)}
        className="flex items-center justify-between rounded-lg border border-slate-200 p-4 text-left transition hover:border-slate-400 hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-slate-600" />
          <span className="text-sm font-semibold text-slate-800">
            {name as string}
          </span>
        </div>

        <ChevronRight className="h-4 w-4 text-slate-400" />
      </button>
    ))}
  </div>
</div>
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">
          FloodGuard Intelligence Pipeline
        </h2>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {[
            "Rainfall",
            "Prediction",
            "Risk",
            "Explanation",
            "Action",
            "Citizen Response",
            "Prevention",
          ].map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-2"
            >
              <div className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
                {item}
              </div>

              {index < 6 && (
                <ChevronRight className="h-4 w-4 text-slate-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* Accessibility settings */
  const [language, setLanguage] =
    useState<"English" | "Tamil">("English");

  const [largeText, setLargeText] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] =
    useState(false);

  /* Page rendering */
  const renderPage = () => {
    switch (page) {
      case "Overview":
        return <Overview onNavigate={(p:Page)=> setPage(p)}/>;

      case "Flood Digital Twin":
        return <FloodDigitalTwin />;

      case "What-If Simulator":
        return <WhatIfSimulator />;

      case "AI Insights":
        return <AIInsights />;
      case "Request Help":
        return <RequestHelp />;

      case "Authority Dashboard":
        return <AuthorityDashboard />;

      case "Admin Panel":
        return <AdminPanel />;

      case "About FloodGuard":
        return <AboutFloodGuard />;

      case "Alerts":
        return <Alerts />;

      case "Live Flood Map":
        return <LiveFloodMap />;

      case "AI Prediction":
        return <AIFloodPrediction />;

      case "Why This Area Will Flood?":
  return <ExplainableAI onNavigate={(p) => setPage(p as Page)} />;

      case "Rainfall":
        return <Rainfall />;

      case "Drainage Intelligence":
        return <DrainageIntelligence />;

      case "Water Levels":
        return <WaterLevels />;

      case "AI Action Engine":
        return <AIActionEngine />;

      case "Community Reports":
        return <CommunityReports />;

      case "Photo Water-Depth Analysis":
        return <PhotoWaterDepthAnalysis />;

      case "Evacuation Routes":
        return <EvacuationRoutes />;

      case "Historical Floods":
        return <HistoricalFloods />;

      case "Sustainable Solutions":
        return <SustainableSolutions />;

      default:
        return <Overview onNavigate={(p)=>setPage(p)}/>;
    }
  };

  /* Accessibility text */
  const accessibilityText =
    language === "Tamil"
      ? {
          title: "அணுகல்தன்மை",
          subtitle: "அணுகல்தன்மை அமைப்புகள்",
          language: "மொழி",
          largeText: "பெரிய எழுத்து",
          largeTextDesc: "உரையை பெரியதாக மாற்றவும்",
          voice: "குரல் எச்சரிக்கைகள்",
          voiceDesc: "வெள்ள எச்சரிக்கைகளை குரலில் கேட்கவும்",
          close: "மூடு",
          speak: "குரல் எச்சரிக்கையை சோதிக்கவும்",
        }
      : {
          title: "Accessibility",
          subtitle: "Accessibility settings",
          language: "Language",
          largeText: "Large Text",
          largeTextDesc: "Increase text size for better readability",
          voice: "Voice Alerts",
          voiceDesc: "Hear flood alerts using voice playback",
          close: "Close",
          speak: "Test Voice Alert",
        };

  /* Voice playback */
  const speakAlert = () => {
    if (!("speechSynthesis" in window)) {
      alert(
        "Voice playback is not supported in this browser."
      );
      return;
    }

    window.speechSynthesis.cancel();

    const message =
      language === "Tamil"
        ? "எச்சரிக்கை. இது FloodGuard மாதிரி தரவு எச்சரிக்கை. T Nagar பகுதியில் வெள்ள அபாயம் உள்ளது."
        : "Alert. This is a FloodGuard simulated data warning. There is a flood risk in T Nagar.";

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang =
      language === "Tamil" ? "ta-IN" : "en-IN";

    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const tamilGroupNames: Record<string, string> = {
    MONITOR: "கண்காணிப்பு",
    RESPOND: "பதில் நடவடிக்கைகள்",
    PLAN: "திட்டமிடல்",
    MANAGE: "மேலாண்மை",
  };

  const tamilPageNames: Record<string, string> = {
    Overview: "முகப்பு",
    "AI Prediction": "AI கணிப்பு",
    Alerts: "எச்சரிக்கைகள்",
    Rainfall: "மழைப்பொழிவு",
    "Water Levels": "நீர்மட்டம்",
    "Live Flood Map": "நேரடி வெள்ள வரைபடம்",
    "Flood Digital Twin": "வெள்ள டிஜிட்டல் ட்வின்",
    "Why This Area Will Flood?":
      "இந்த பகுதி ஏன் வெள்ளத்தில் மூழ்கும்?",
    "Drainage Intelligence": "வடிகால் நுண்ணறிவு",
    "AI Action Engine": "AI நடவடிக்கை இயந்திரம்",
    "Community Reports": "சமூக அறிக்கைகள்",
    "Photo Water-Depth Analysis":
      "புகைப்பட நீர்மட்ட பகுப்பாய்வு",
    "Evacuation Routes": "வெளியேற்ற வழிகள்",
    "Historical Floods": "வரலாற்று வெள்ளங்கள்",
    "Sustainable Solutions": "நிலையான தீர்வுகள்",
    "What-If Simulator": "என்ன ஆகும்? சிமுலேட்டர்",
    "AI Insights": "AI நுண்ணறிவுகள்",
    "Authority Dashboard": "அதிகாரி டாஷ்போர்டு",
    "Admin Panel": "நிர்வாகப் பலகம்",
    "Request Help": "\u0b89\u0ba4\u0bb5\u0bbf \u0b95\u0bcb\u0bb0\u0bbf\u0b95\u0bcd\u0b95\u0bc8",
    "About FloodGuard": "FloodGuard பற்றி",
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 ${
        largeText ? "fg-large-text" : ""
      }`}
    >
      <style>
        {`
          .fg-large-text main {
            zoom: 1.1;
          }

        `}
      </style>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 transform border-r border-slate-200 bg-white transition-transform duration-200 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <button
            onClick={() => {
              setPage("Overview");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3"
            aria-label="Go to FloodGuard overview"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Waves className="h-5 w-5" />
            </div>

            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">
                FloodGuard
              </p>

              <p className="text-[10px] text-slate-400">
                Chennai Urban Flood Intelligence
              </p>
            </div>
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            aria-label="Close navigation menu"
            title="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="h-[calc(100vh-128px)] overflow-y-auto p-4"
          aria-label="FloodGuard pages"
        >
          {menuGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-2 px-3 text-[10px] font-bold tracking-wider text-slate-400">
                {language === "Tamil"
                  ? tamilGroupNames[group.title]
                  : group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = page === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setPage(item.name as Page);
                        setSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        active
                          ? "bg-slate-900 font-semibold text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                      aria-current={
                        active ? "page" : undefined
                      }
                    >
                      <Icon className="h-4 w-4 shrink-0" />

                      <span className="flex-1">
                        {language === "Tamil"
                          ? tamilPageNames[item.name] ||
                            item.name
                          : item.name}
                      </span>

                      {active && (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Demo Status */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-xs font-semibold text-slate-700">
                DEMO MODE
              </span>
            </div>

            <p className="mt-1 text-[10px] text-slate-400">
              Simulated data environment
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {language === "Tamil"
          ? `??????????? ????. ????: ?????. ????? ???????: ${
              largeText ? "???????????" : "??????????????????"
            }. ????? ?????????????: ${
              voiceEnabled ? "???????????" : "??????????????????"
            }.`
          : `Accessibility status. Language: English. Large text: ${
              largeText ? "on" : "off"
            }. Voice alerts: ${
              voiceEnabled ? "on" : "off"
            }.`}
      </div>
      <main className="lg:ml-72">

        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
              aria-label="Open navigation menu"
              title="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden text-xs text-slate-400 sm:block">
              {language === "Tamil"
                ? "சென்னை நகர்ப்புற வெள்ள நுண்ணறிவு தளம்"
                : "Chennai Urban Flood Intelligence Platform"}
            </div>

          </div>

          <div className="flex items-center gap-2">

            {/* Accessibility */}
            <div className="relative">

              <button
                onClick={() =>
                  setAccessibilityOpen(
                    !accessibilityOpen
                  )
                }
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  accessibilityOpen
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
                aria-label={accessibilityText.title}
                aria-expanded={accessibilityOpen}
                aria-controls="accessibility-panel"
                title={accessibilityText.title}
              >
                <Accessibility className="h-4 w-4" />

                <span className="hidden md:inline">
                  {accessibilityText.title}
                </span>
              </button>

              {/* Accessibility Panel */}
              {accessibilityOpen && (
                <div
                  id="accessibility-panel"
                  className="absolute right-0 top-12 z-50 w-[min(92vw,360px)] rounded-xl border border-slate-200 bg-white shadow-2xl"
                  role="dialog"
                  aria-label={accessibilityText.title}
                >

                  {/* Panel Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                        <Accessibility className="h-5 w-5" />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-slate-900">
                          {accessibilityText.title}
                        </h2>

                        <p className="text-[11px] text-slate-400">
                          {accessibilityText.subtitle}
                        </p>
                      </div>

                    </div>

                    <button
                      onClick={() =>
                        setAccessibilityOpen(false)
                      }
                      className="rounded-lg p-2 hover:bg-slate-100"
                      aria-label={accessibilityText.close}
                      title={accessibilityText.close}
                    >
                      <X className="h-4 w-4" />
                    </button>

                  </div>

                  <div className="space-y-4 p-4">

                    {/* Language */}
                    <div className="rounded-lg border border-slate-200 p-3">

                      <div className="mb-3">
                        <p className="text-sm font-semibold text-slate-800">
                          {accessibilityText.language}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">

                        <button
                          onClick={() =>
                            setLanguage("English")
                          }
                          className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                            language === "English"
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                          aria-pressed={
                            language === "English"
                          }
                        >
                          English
                        </button>

                        <button
                          onClick={() =>
                            setLanguage("Tamil")
                          }
                          className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                            language === "Tamil"
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                          aria-pressed={
                            language === "Tamil"
                          }
                        >
                          தமிழ்
                        </button>

                      </div>
                    </div>

                    {/* Large Text */}
                    <button
                      onClick={() =>
                        setLargeText(!largeText)
                      }
                      className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 text-left hover:bg-slate-50"
                      aria-pressed={largeText}
                      aria-label={
                        language === "Tamil"
                          ? "பெரிய எழுத்து"
                          : "Large Text"
                      }
                    >

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {accessibilityText.largeText}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {accessibilityText.largeTextDesc}
                        </p>
                      </div>

                      <span
                        className={`relative h-6 w-11 rounded-full transition ${
                          largeText
                            ? "bg-slate-900"
                            : "bg-slate-300"
                        }`}
                        aria-hidden="true"
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            largeText
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </span>

                    </button>

                    {/* Voice Alerts */}
                    <button
                      onClick={() =>
                        setVoiceEnabled(!voiceEnabled)
                      }
                      className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 text-left hover:bg-slate-50"
                      aria-pressed={voiceEnabled}
                      aria-label={
                        language === "Tamil"
                          ? "குரல் எச்சரிக்கைகள்"
                          : "Voice Alerts"
                      }
                    >

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {accessibilityText.voice}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {accessibilityText.voiceDesc}
                        </p>
                      </div>

                      <span
                        className={`relative h-6 w-11 rounded-full transition ${
                          voiceEnabled
                            ? "bg-slate-900"
                            : "bg-slate-300"
                        }`}
                        aria-hidden="true"
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            voiceEnabled
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </span>

                    </button>

                    {/* Test Voice Alert */}
                    <button
                      onClick={speakAlert}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                      aria-label={
                        language === "Tamil"
                          ? "குரல் எச்சரிக்கையை சோதிக்கவும்"
                          : "Test Voice Alert"
                      }
                    >
                      <Bell className="h-4 w-4" />

                      {accessibilityText.speak}
                    </button>

                  </div>
                </div>
              )}
            </div>

            {/* Weather Service */}
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500 md:flex">

              <span className="h-2 w-2 rounded-full bg-green-500" />

              {language === "Tamil"
                ? "வானிலை சேவை"
                : "Weather Service"}

            </div>

            <NotificationBell />

            {/* Profile */}
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white"
              aria-label="FloodGuard user"
              title="FloodGuard user"
            >
              FG
            </div>

          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {renderPage()}
        </div>

      </main>
    </div>
  );
}
