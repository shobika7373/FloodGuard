import { useState } from "react";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  MapPin,
  ShieldAlert,
  Siren,
  X,
} from "lucide-react";

const alerts = [
  {
    id: "AL-001",
    severity: "Critical",
    title: "Critical Flood Risk Detected",
    location: "T. Nagar",
    time: "10 minutes ago",
    reason: "Rapid water-level rise with high drainage utilization",
    action: "Prioritize emergency response and monitor affected roads",
    status: "Active",
  },
  {
    id: "AL-002",
    severity: "High",
    title: "Heavy Rainfall Warning",
    location: "Velachery",
    time: "25 minutes ago",
    reason: "High rainfall intensity may exceed local drainage capacity",
    action: "Issue precautionary warning and inspect drainage network",
    status: "Active",
  },
  {
    id: "AL-003",
    severity: "High",
    title: "Possible Drainage Overflow",
    location: "Adyar",
    time: "42 minutes ago",
    reason: "Drain utilization approaching critical level",
    action: "Inspect drainage station and monitor water levels",
    status: "Active",
  },
  {
    id: "AL-004",
    severity: "Moderate",
    title: "Flood Risk Increasing",
    location: "Anna Nagar",
    time: "1 hour ago",
    reason: "Rainfall intensity is increasing gradually",
    action: "Continue monitoring the area",
    status: "Monitoring",
  },
];

function severityStyle(severity: string) {
  switch (severity) {
    case "Critical":
      return {
        badge: "bg-red-100 text-red-700",
        icon: "text-red-600",
        border: "border-red-200",
      };

    case "High":
      return {
        badge: "bg-orange-100 text-orange-700",
        icon: "text-orange-600",
        border: "border-orange-200",
      };

    default:
      return {
        badge: "bg-yellow-100 text-yellow-700",
        icon: "text-yellow-600",
        border: "border-yellow-200",
      };
  }
}

export default function Alerts() {
  const [showResponse, setShowResponse] = useState(false);

  const activeAlerts = alerts.filter(
    (alert) => alert.status === "Active"
  ).length;

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "Critical"
  ).length;

  const criticalAlert = alerts.find(
    (alert) => alert.severity === "Critical"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-3">
              <Bell className="h-7 w-7 text-red-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Flood Alerts
              </h1>

              <p className="text-sm text-slate-500">
                Monitor active flood warnings and recommended response actions
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500">
          DEMO / SIMULATED DATA
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Active Alerts</p>
            <Bell className="h-5 w-5 text-blue-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {activeAlerts}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Currently requiring attention
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-red-700">Critical Alerts</p>
            <Siren className="h-5 w-5 text-red-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-red-700">
            {criticalAlerts}
          </p>

          <p className="mt-1 text-xs text-red-600">
            Requires immediate authority attention
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Monitoring Zones</p>
            <ShieldAlert className="h-5 w-5 text-orange-600" />
          </div>

          <p className="mt-2 text-3xl font-bold text-slate-900">12</p>

          <p className="mt-1 text-xs text-slate-500">
            High-risk areas being monitored
          </p>
        </div>
      </div>

      {/* Emergency banner */}
      <div className="flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />

          <div>
            <h2 className="font-semibold text-red-800">
              Critical Risk Response
            </h2>

            <p className="mt-1 text-sm text-red-700">
              A simulated critical flood condition has been detected in
              T. Nagar. Authorities should review the recommended actions.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowResponse(true)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Review Response
        </button>
      </div>

      {/* Response Review */}
      {showResponse && criticalAlert && (
        <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Critical Risk Response Review
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Prototype response options for the simulated critical alert.
              </p>
            </div>

            <button
              onClick={() => setShowResponse(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Close response review"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-xs uppercase tracking-wide text-red-600">
                Severity
              </p>
              <p className="mt-1 text-xl font-bold text-red-700">
                {criticalAlert.severity}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Location
              </p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {criticalAlert.location}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Alert ID
              </p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {criticalAlert.id}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Why was this alert generated?
              </p>

              <p className="mt-2 text-sm text-slate-700">
                {criticalAlert.reason}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Recommended Prototype Action
              </p>

              <p className="mt-2 text-sm text-slate-700">
                {criticalAlert.action}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="font-semibold text-slate-900">
              Response Review Checklist
            </h3>

            <div className="mt-3 space-y-3">
              {[
                "Review the affected roads and vulnerable drainage locations.",
                "Review prototype evacuation and public-warning workflows.",
                "Prioritize inspection of critical drainage points.",
                "Continue monitoring rainfall and water-level conditions.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                    {index + 1}
                  </div>

                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Prototype Notice:</strong> These are simulated response
              suggestions for demonstration. They do not dispatch rescue
              teams, issue real emergency alerts, or replace instructions from
              authorized emergency authorities.
            </p>
          </div>
        </div>
      )}

      {/* Alert list */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Active & Recent Alerts
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            FloodGuard converts detected risks into actionable warnings.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {alerts.map((alert) => {
            const style = severityStyle(alert.severity);

            return (
              <div
                key={alert.id}
                className={`p-5 transition hover:bg-slate-50 ${style.border}`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Main alert information */}
                  <div className="flex gap-4">
                    <div className="mt-1 rounded-lg bg-slate-100 p-2">
                      <ShieldAlert
                        className={`h-5 w-5 ${style.icon}`}
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-900">
                          {alert.title}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}
                        >
                          {alert.severity}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {alert.status}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {alert.location}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {alert.time}
                        </span>

                        <span>{alert.id}</span>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Reason
                          </p>

                          <p className="mt-1 text-sm text-slate-700">
                            {alert.reason}
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Recommended Action
                          </p>

                          <p className="mt-1 text-sm text-slate-700">
                            {alert.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    <CheckCircle className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert workflow */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          FloodGuard Alert Workflow
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">
          {[
            "Risk Detected",
            "Alert Generated",
            "Authority Notified",
            "Citizen Warning",
            "Response Action",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-lg border border-slate-200 p-4 text-center"
            >
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {index + 1}
              </div>

              <p className="mt-2 text-sm font-medium text-slate-700">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
        <strong>Prototype Notice:</strong> All alerts, locations, risk levels,
        timestamps, and recommendations shown on this page are simulated
        demonstration data. Real emergency alerts require validated data,
        authorized agency integration, and operational verification.
      </div>
    </div>
  );
}
