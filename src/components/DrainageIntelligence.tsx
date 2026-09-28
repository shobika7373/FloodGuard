import { useEffect, useState } from "react";
import {
  Droplets,
  Gauge,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Wrench,
  TrendingUp,
  X,
  ClipboardCheck,
} from "lucide-react";
import { getDrainage } from "../services/api";

const demoStations = [
  {
    id: "Drain 01",
    location: "T. Nagar",
    utilization: 84,
    condition: "High Load",
  },
  {
    id: "Drain 04",
    location: "Velachery",
    utilization: 76,
    condition: "High Load",
  },
  {
    id: "Drain 08",
    location: "Adyar",
    utilization: 61,
    condition: "Normal",
  },
  {
    id: "Drain 12",
    location: "Saidapet",
    utilization: 91,
    condition: "Critical",
  },
];

type DrainageStation = {
  id: string;
  location: string;
  utilization: number;
  condition: string;
};

type Inspection = {
  id: string;
  location: string;
  action: string;
  priority: string;
  status: string;
  reason: string;
  assignedTeam: string;
  schedule: string;
  notes: string;
};

export default function DrainageIntelligence() {
  const [drainageStations, setDrainageStations] =
    useState<DrainageStation[]>(demoStations);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showInspectionForm, setShowInspectionForm] = useState(false);

  // Editable inspection fields
  const [inspectionLocation, setInspectionLocation] = useState("");
  const [inspectionPriority, setInspectionPriority] = useState("Medium");
  const [inspectionReason, setInspectionReason] = useState(
    "Highest simulated drainage utilization"
  );
  const [inspectionAction, setInspectionAction] =
    useState("Field Inspection");
  const [inspectionTeam, setInspectionTeam] =
    useState("Drainage Field Team");
  const [inspectionSchedule, setInspectionSchedule] = useState("");
  const [inspectionNotes, setInspectionNotes] = useState("");

  const [formError, setFormError] = useState("");

  const [inspections, setInspections] = useState<Inspection[]>([]);

  useEffect(() => {
    getDrainage()
      .then((response) => {
        const backendData = response.data || [];

        const mappedStations: DrainageStation[] = backendData.map(
          (
            item: {
              area: string;
              utilization: number;
              condition: string;
            },
            index: number
          ) => ({
            id: `Drain ${String(index + 1).padStart(2, "0")}`,
            location: item.area,
            utilization: item.utilization,
            condition: item.condition,
          })
        );

        if (mappedStations.length > 0) {
          setDrainageStations(mappedStations);
        }

        setError("");
      })
      .catch((apiError) => {
        console.error("Drainage API error:", apiError);

        setError(
          "Backend unavailable — showing DEMO / SIMULATED DATA."
        );

        setDrainageStations(demoStations);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-sm font-medium text-slate-600">
          Loading drainage data...
        </div>
      </div>
    );
  }

  const highRisk = drainageStations.filter(
    (station) => station.condition === "Critical"
  ).length;

  const warning = drainageStations.filter(
    (station) => station.condition === "High Load"
  ).length;

  const normal = drainageStations.filter(
    (station) => station.condition === "Normal"
  ).length;

  const highestUtilization =
    drainageStations.length > 0
      ? Math.max(
          ...drainageStations.map(
            (station) => station.utilization
          )
        )
      : 0;

  const highestStation =
    drainageStations.find(
      (station) => station.utilization === highestUtilization
    )?.location || "N/A";

  const highestCondition =
    drainageStations.find(
      (station) => station.utilization === highestUtilization
    )?.condition || "N/A";

  const openInspectionForm = () => {
    if (drainageStations.length === 0) {
      setFormError(
        "No drainage station data is available. Inspection cannot be created."
      );
      return;
    }

    // Fill the editable form with initial recommended values
    setInspectionLocation(highestStation);
    setInspectionPriority(
      highestUtilization >= 85 ? "High" : "Medium"
    );
    setInspectionReason(
      "Highest simulated drainage utilization"
    );
    setInspectionAction("Field Inspection");
    setInspectionTeam("Drainage Field Team");
    setInspectionSchedule("");
    setInspectionNotes("");
    setFormError("");

    setShowInspectionForm(true);
  };

  const cancelInspection = () => {
    setShowInspectionForm(false);

    setInspectionLocation("");
    setInspectionPriority("Medium");
    setInspectionReason(
      "Highest simulated drainage utilization"
    );
    setInspectionAction("Field Inspection");
    setInspectionTeam("Drainage Field Team");
    setInspectionSchedule("");
    setInspectionNotes("");
    setFormError("");
  };

  const createInspection = () => {
    if (drainageStations.length === 0) {
      setFormError(
        "No drainage station data is available."
      );
      return;
    }

    if (!inspectionLocation.trim()) {
      setFormError("Please select a location.");
      return;
    }

    if (!inspectionPriority.trim()) {
      setFormError("Please select a priority.");
      return;
    }

    if (!inspectionReason.trim()) {
      setFormError("Please enter a reason.");
      return;
    }

    if (!inspectionAction.trim()) {
      setFormError("Please select an action type.");
      return;
    }

    if (!inspectionTeam.trim()) {
      setFormError("Please enter the assigned team.");
      return;
    }

    if (!inspectionSchedule.trim()) {
      setFormError(
        "Please select a schedule before creating the inspection."
      );
      return;
    }

    const nextNumber = inspections.length + 1;

    const inspectionId = `INS-${String(
      nextNumber
    ).padStart(3, "0")}`;

    const newInspection: Inspection = {
      id: inspectionId,
      location: inspectionLocation,
      action: inspectionAction,
      priority: inspectionPriority,
      status: "Scheduled",
      reason: inspectionReason,
      assignedTeam: inspectionTeam,
      schedule: inspectionSchedule,
      notes: inspectionNotes,
    };

    setInspections((currentInspections) => [
      ...currentInspections,
      newInspection,
    ]);

    setShowInspectionForm(false);

    setInspectionLocation("");
    setInspectionPriority("Medium");
    setInspectionReason(
      "Highest simulated drainage utilization"
    );
    setInspectionAction("Field Inspection");
    setInspectionTeam("Drainage Field Team");
    setInspectionSchedule("");
    setInspectionNotes("");
    setFormError("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Drainage Intelligence
              </h1>

              <p className="text-sm text-slate-500">
                Smart drainage monitoring and maintenance
                recommendations
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />

            <span className="text-xs font-bold text-amber-700">
              DEMO / SIMULATED DATA
            </span>
          </div>
        </div>
      </div>

      {/* API Error / Demo Notice */}
      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />

            <p className="text-sm font-medium text-amber-800">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Drainage Stations
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {drainageStations.length}
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-3">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Critical
              </p>

              <p className="mt-2 text-3xl font-bold text-red-600">
                {highRisk}
              </p>
            </div>

            <div className="rounded-xl bg-red-100 p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                High Load
              </p>

              <p className="mt-2 text-3xl font-bold text-orange-600">
                {warning}
              </p>
            </div>

            <div className="rounded-xl bg-orange-100 p-3">
              <Gauge className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Normal
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {normal}
              </p>
            </div>

            <div className="rounded-xl bg-green-100 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alert */}
      {highestUtilization >= 85 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-red-100 p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>

            <div>
              <h2 className="font-bold text-red-800">
                High Drainage Utilization Detected
              </h2>

              <p className="mt-1 text-sm text-red-700">
                {highestStation} has the highest simulated
                drainage utilization at{" "}
                <strong>{highestUtilization}%</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Drainage Stations */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <Gauge className="h-5 w-5 text-blue-600" />

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Drainage Stations
              </h2>

              <p className="text-sm text-slate-500">
                Current simulated drainage utilization
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {drainageStations.map((station) => (
            <div
              key={station.id}
              className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-slate-100 p-3">
                  <MapPin className="h-5 w-5 text-slate-600" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {station.location}
                  </p>

                  <p className="text-sm text-slate-500">
                    {station.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="min-w-[140px]">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-500">
                      Utilization
                    </span>

                    <span className="font-semibold text-slate-700">
                      {station.utilization}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${Math.min(
                          station.utilization,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    station.condition === "Critical"
                      ? "bg-red-100 text-red-700"
                      : station.condition === "High Load"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {station.condition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drainage Risk Logic */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-blue-600" />

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Drainage Risk Logic
            </h2>

            <p className="text-sm text-slate-500">
              Utilization-based simulated risk classification
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-700">
              Normal
            </p>

            <p className="mt-1 text-xs text-green-600">
              Below 60% utilization
            </p>
          </div>

          <div className="rounded-xl bg-orange-50 p-4">
            <p className="text-sm font-semibold text-orange-700">
              Moderate / High Load
            </p>

            <p className="mt-1 text-xs text-orange-600">
              60%–85% utilization
            </p>
          </div>

          <div className="rounded-xl bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              Critical
            </p>

            <p className="mt-1 text-xs text-red-600">
              Above 85% utilization
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Maintenance */}
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-orange-100 p-3">
              <Wrench className="h-6 w-6 text-orange-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recommended Maintenance
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Create a field inspection action based on
                the current drainage condition.
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-600">
                  Location: {highestStation}
                </span>

                <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-600">
                  Utilization: {highestUtilization}%
                </span>

                <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-600">
                  Condition: {highestCondition}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openInspectionForm}
            disabled={drainageStations.length === 0}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Wrench className="h-4 w-4" />
            Create Inspection Action
          </button>
        </div>
      </div>

      {/* Created Inspection Actions */}
      {inspections.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5 text-blue-600" />

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Created Inspection Actions
                </h2>

                <p className="text-sm text-slate-500">
                  Inspection actions created during this demo
                  session
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-6">
            {inspections.map((inspection) => (
              <div
                key={inspection.id}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                        {inspection.id}
                      </span>

                      <span className="rounded-lg bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                        {inspection.status}
                      </span>

                      <span className="rounded-lg bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                        {inspection.priority} Priority
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-slate-900">
                      {inspection.action}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {inspection.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Action Type
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {inspection.action}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Reason
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {inspection.reason}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Assigned Team
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {inspection.assignedTeam}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Schedule
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {inspection.schedule}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Notes
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {inspection.notes || "No additional notes"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prototype Notice */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-xs leading-5 text-blue-800">
          <strong>Prototype Notice:</strong> Inspection actions
          are stored in the current browser session only.
          This workflow uses DEMO / SIMULATED drainage data
          and does not represent live field operations.
        </p>
      </div>

      {/* Inspection Form Modal */}
      {showInspectionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-100 p-3">
                    <ClipboardCheck className="h-5 w-5 text-orange-600" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Create Inspection Action
                    </h2>

                    <p className="text-sm text-slate-500">
                      Enter and review inspection details
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={cancelInspection}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close inspection form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Demo Notice */}
            <div className="mx-6 mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    DEMO / SIMULATED DATA
                  </p>

                  <p className="mt-1 text-xs leading-5 text-amber-700">
                    This inspection action is a prototype
                    workflow. You can edit all fields before
                    creating the inspection.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5 p-6">
              <div className="grid gap-5 md:grid-cols-2">
                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Location
                  </label>

                  <select
                    value={inspectionLocation}
                    onChange={(event) =>
                      setInspectionLocation(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select location
                    </option>

                    {drainageStations.map((station) => (
                      <option
                        key={station.id}
                        value={station.location}
                      >
                        {station.location}
                      </option>
                    ))}
                  </select>

                  <p className="mt-1 text-xs text-slate-400">
                    Initially selected from the highest-utilization
                    station, but editable.
                  </p>
                </div>

                {/* Priority */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Priority
                  </label>

                  <select
                    value={inspectionPriority}
                    onChange={(event) =>
                      setInspectionPriority(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">
                      Critical
                    </option>
                  </select>

                  <p className="mt-1 text-xs text-slate-400">
                    Initially calculated from simulated
                    utilization, but editable.
                  </p>
                </div>

                {/* Reason */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Reason
                  </label>

                  <input
                    type="text"
                    value={inspectionReason}
                    onChange={(event) =>
                      setInspectionReason(event.target.value)
                    }
                    placeholder="Enter inspection reason"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Action Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Action Type
                  </label>

                  <select
                    value={inspectionAction}
                    onChange={(event) =>
                      setInspectionAction(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Field Inspection">
                      Field Inspection
                    </option>

                    <option value="Drain Cleaning">
                      Drain Cleaning
                    </option>

                    <option value="Blockage Removal">
                      Blockage Removal
                    </option>

                    <option value="Maintenance">
                      Maintenance
                    </option>

                    <option value="Emergency Inspection">
                      Emergency Inspection
                    </option>
                  </select>
                </div>

                {/* Assigned Team */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Assigned Team
                  </label>

                  <input
                    type="text"
                    value={inspectionTeam}
                    onChange={(event) =>
                      setInspectionTeam(event.target.value)
                    }
                    placeholder="Enter assigned team"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Schedule */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Schedule
                  </label>

                  <input
                    type="datetime-local"
                    value={inspectionSchedule}
                    onChange={(event) =>
                      setInspectionSchedule(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Notes
                </label>

                <textarea
                  rows={4}
                  value={inspectionNotes}
                  onChange={(event) =>
                    setInspectionNotes(event.target.value)
                  }
                  placeholder="Enter inspection notes"
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Form Error */}
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />

                    <p className="text-sm font-medium text-red-700">
                      {formError}
                    </p>
                  </div>
                </div>
              )}

              {/* Review Details */}
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-blue-600" />

                  <h3 className="font-bold text-slate-900">
                    Review Details
                  </h3>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {inspectionLocation || "Not selected"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Priority
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {inspectionPriority}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Action
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {inspectionAction || "Not selected"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Assigned Team
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {inspectionTeam || "Not assigned"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Schedule
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {inspectionSchedule || "Not scheduled"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </p>

                    <p className="mt-1 text-sm font-semibold text-green-700">
                      Scheduled
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={cancelInspection}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={createInspection}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  Create Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}