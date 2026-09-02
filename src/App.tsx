import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Brain,
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
  | "Photo Water-Depth Analysis"
  | "Evacuation Routes"
  | "Alerts"
  | "Historical Floods"
  | "Sustainable Solutions"
  | "What-If Simulator"
  | "AI Insights"
  | "Authority Dashboard"
  | "Admin Panel"
  | "About FloodGuard"
  | "AI Flood Prediction";

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



function Overview() {
  const zones = [
    { name: "T. Nagar", risk: 86, level: "Critical" },
    { name: "Velachery", risk: 72, level: "High" },
    { name: "Adyar", risk: 68, level: "High" },
    { name: "Anna Nagar", risk: 48, level: "Moderate" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Demo notice */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <strong>DEMO / SIMULATED DATA:</strong> Values shown on this prototype
        are demonstration values and are not live official Chennai data.
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
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

          <p className="mt-1 text-xs text-slate-500">Simulated value</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Water Level</p>
            <Waves className="h-5 w-5 text-blue-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-slate-900">1.8 m</p>

          <p className="mt-1 text-xs text-slate-500">Simulated value</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Drainage Utilization</p>
            <Gauge className="h-5 w-5 text-purple-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-slate-900">76%</p>

          <p className="mt-1 text-xs text-slate-500">Simulated value</p>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Map */}
        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h2 className="font-semibold text-slate-900">
                Chennai Flood Risk Map
              </h2>

              <p className="text-xs text-slate-500">
                DEMO / SIMULATED DATA
              </p>
            </div>

            <Map className="h-5 w-5 text-slate-500" />
          </div>

          <div className="relative h-[380px] overflow-hidden rounded-b-xl bg-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,#dbeafe,transparent_25%),radial-gradient(circle_at_70%_60%,#bfdbfe,transparent_30%),linear-gradient(135deg,#e2e8f0,#f8fafc)]" />

            {/* Roads */}
            <div className="absolute left-[10%] top-[35%] h-2 w-[80%] rotate-12 bg-white shadow" />
            <div className="absolute left-[30%] top-[10%] h-[80%] w-2 rotate-[15deg] bg-white shadow" />
            <div className="absolute left-[15%] top-[70%] h-2 w-[70%] -rotate-12 bg-white shadow" />

            {/* Risk zones */}
            <div className="absolute left-[25%] top-[30%] flex h-24 w-24 items-center justify-center rounded-full bg-red-500/60 ring-4 ring-red-300/50">
              <span className="text-xs font-bold text-red-900">CRITICAL</span>
            </div>

            <div className="absolute right-[20%] top-[25%] flex h-28 w-28 items-center justify-center rounded-full bg-orange-400/60 ring-4 ring-orange-200/60">
              <span className="text-xs font-bold text-orange-900">HIGH</span>
            </div>

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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">
              High-Risk Zones
            </h2>

            <span className="text-xs text-slate-400">DEMO</span>
          </div>

          <div className="divide-y divide-slate-100">
            {zones.map((zone) => (
              <div
                key={zone.name}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium text-slate-800">{zone.name}</p>
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
            <div key={item} className="flex items-center gap-2">
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

  const renderPage = () => {
    switch (page) {
      case "Overview":
        return <Overview />;

      case "Flood Digital Twin":
        return <FloodDigitalTwin />;

      case "What-If Simulator":
        return <WhatIfSimulator />;

      case "AI Insights":
        return <AIInsights />;

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

      case "AI Flood Prediction":
  return <AIFloodPrediction />;

      case "Why This Area Will Flood?":
  return <ExplainableAI />;

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
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-900 p-2.5">
                <Shield className="h-6 w-6 text-white" />
              </div>

              <div>
                <h1 className="font-bold text-slate-900">FLOODGUARD</h1>

                <p className="text-[10px] font-medium tracking-wide text-slate-400">
                  PREDICT. PREVENT. PROTECT.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {menuGroups.map((group) => (
              <div key={group.title} className="mb-6">
                <p className="mb-2 px-3 text-[10px] font-bold tracking-widest text-slate-400">
                  {group.title}
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
                            ? "bg-slate-900 text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />

                        <span className="truncate">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom status */}
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
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden text-xs text-slate-400 sm:block">
              Chennai Urban Flood Intelligence Platform
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500 md:flex">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Weather Service
            </div>

            <button className="relative rounded-lg p-2 hover:bg-slate-100">
              <Bell className="h-5 w-5 text-slate-600" />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              FG
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 md:p-6">{renderPage()}</div>
      </main>
    </div>
  );
}