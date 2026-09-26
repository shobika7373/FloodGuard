import { useState } from "react";
import{
  Users,
  MapPin,
  Camera,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  FileText,
} from "lucide-react";

const initialReports = [
  {
    id: "RPT-1042",
    location: "T. Nagar",
    category: "Road Flooding",
    severity: "High",
    time: "10 min ago",
    status: "AI Verified",
    description: "Water accumulation reported on a main road.",
  },
  {
    id: "RPT-1041",
    location: "Velachery",
    category: "Waterlogging",
    severity: "Critical",
    time: "18 min ago",
    status: "Pending Verification",
    description: "Deep water reported near a residential area.",
  },
  {
    id: "RPT-1040",
    location: "Adyar",
    category: "Drain Overflow",
    severity: "High",
    time: "31 min ago",
    status: "Authority Verified",
    description: "Drainage overflow reported after heavy rainfall.",
  },
  {
    id: "RPT-1039",
    location: "Anna Nagar",
    category: "Road Condition",
    severity: "Moderate",
    time: "45 min ago",
    status: "Resolved",
    description: "Temporary water accumulation reported.",
  },
];

export default function CommunityReports() {
  const [reports, setReports] = useState(initialReports);

  const [showForm, setShowForm] = useState(false);

  const [location, setLocation] = useState("");
  const [reportType, setReportType] = useState("");
  const [waterDepth, setWaterDepth] = useState("");
  const [description, setDescription] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submittedReport, setSubmittedReport] = useState<any>(null);
  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPhoto(null);
      setPhotoPreview("");
      return;
    }

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    if (!location.trim()) {
      setError("Please enter the area/location.");
      return;
    }

    if (!reportType) {
      setError("Please select a report type.");
      return;
    }

    if (!waterDepth) {
      setError("Please select the estimated water depth.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }

    const reportId = `FR-DEMO-${String(reports.length + 1).padStart(3, "0")}`;

    const newReport = {
      id: reportId,
      location: location.trim(),
      category: reportType,
      severity: "Demo",
      time: new Date().toLocaleString(),
      status: "DEMO SUBMITTED",
      description: description.trim(),
      waterDepth,
      photoAttached: Boolean(photo),
    };

    setReports((previousReports) => [
      newReport,
      ...previousReports,
    ]);

    setSubmittedReport(newReport);
    setSuccess("Demo report submitted successfully.");

    setLocation("");
    setReportType("");
    setWaterDepth("");
    setDescription("");
    setPhoto(null);
    setPhotoPreview("");
  };
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-7 w-7 text-blue-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Community Reports
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Use citizen reports as an additional source of flood intelligence.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          DEMO / SIMULATED DATA
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Reports
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            128
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Simulated citizen submissions
          </p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <p className="text-sm text-orange-700">
            Pending Verification
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-700">
            17
          </p>

          <p className="mt-2 text-xs text-orange-600">
            Awaiting review
          </p>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <p className="text-sm text-blue-700">
            AI Verified
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-700">
            84
          </p>

          <p className="mt-2 text-xs text-blue-600">
            Prototype verification result
          </p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <p className="text-sm text-green-700">
            Resolved
          </p>

          <p className="mt-2 text-3xl font-bold text-green-700">
            62
          </p>

          <p className="mt-2 text-xs text-green-600">
            Reports marked resolved
          </p>
        </div>

      </div>

      {/* Submit Demo Report */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="flex gap-4">

            <div className="rounded-lg bg-white p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h2 className="font-semibold text-blue-900">
                Submit Demo Report
              </h2>

              <p className="mt-1 text-sm text-blue-800">
                Submit a simulated citizen observation for the FloodGuard
                prototype workflow.
              </p>
            </div>

          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setError("");
              setSuccess("");
            }}
            className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {showForm ? "Close Form" : "Submit Demo Report"}
          </button>

        </div>

        {/* Demo Notice */}
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800">
          DEMO MODE — Reports submitted here are simulated prototype reports
          and are not sent to emergency authorities.
        </div>

        {showForm && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Location */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Area / Location *
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Example: Velachery"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {/* Report Type */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Report Type *
                </label>

                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select report type</option>
                  <option value="Road Flooding">Road Flooding</option>
                  <option value="Waterlogging">Waterlogging</option>
                  <option value="Drainage Blockage">
                    Drainage Blockage
                  </option>
                  <option value="Rising Water Level">
                    Rising Water Level
                  </option>
                  <option value="Flooded Building">
                    Flooded Building
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Water Depth */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Estimated Water Depth *
                </label>

                <select
                  value={waterDepth}
                  onChange={(e) => setWaterDepth(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select water depth</option>
                  <option value="Less than 15 cm">
                    Less than 15 cm
                  </option>
                  <option value="15–30 cm">15–30 cm</option>
                  <option value="30–60 cm">30–60 cm</option>
                  <option value="60–90 cm">60–90 cm</option>
                  <option value="More than 90 cm">
                    More than 90 cm
                  </option>
                  <option value="Unknown">Unknown</option>
                </select>

                <p className="mt-1 text-xs text-slate-500">
                  Citizen-estimated value. Not measured by an actual sensor.
                </p>
              </div>

              {/* Photo */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Photo (Optional)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                />

                {photo && (
                  <p className="mt-2 text-xs text-green-600">
                    Photo attached: {photo.name}
                  </p>
                )}
              </div>

            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Description *
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the observed flood condition..."
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Photo Preview */}
            {photoPreview && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Photo Preview
                </p>

                <img
                  src={photoPreview}
                  alt="Demo report preview"
                  className="max-h-48 rounded-lg border border-slate-200 object-cover"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Photo is shown locally for this prototype. It is not
                  uploaded to cloud storage or analyzed by AI.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Success */}
            {success && submittedReport && (
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />

                  <p className="font-semibold text-green-800">
                    {success}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-green-900 md:grid-cols-2">

                  <p>
                    <strong>Report ID:</strong>{" "}
                    {submittedReport.id}
                  </p>

                  <p>
                    <strong>Area:</strong>{" "}
                    {submittedReport.location}
                  </p>

                  <p>
                    <strong>Report Type:</strong>{" "}
                    {submittedReport.category}
                  </p>

                  <p>
                    <strong>Water Depth:</strong>{" "}
                    {submittedReport.waterDepth}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {submittedReport.status}
                  </p>

                  <p>
                    <strong>Photo:</strong>{" "}
                    {submittedReport.photoAttached
                      ? "Attached"
                      : "Not attached"}
                  </p>

                  <p className="md:col-span-2">
                    <strong>Timestamp:</strong>{" "}
                    {submittedReport.time}
                  </p>

                </div>

              </div>
            )}

            {/* Submit Button */}
            <div className="mt-5 flex justify-end">

              <button
                onClick={handleSubmit}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Submit Demo Report
              </button>

            </div>

          </div>
        )}

      </div>

      {/* Report Workflow */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Report Verification Workflow
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Example process for converting citizen observations into useful
          flood intelligence.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">

          {[
            "Citizen Report",
            "Location Check",
            "AI Verification",
            "Authority Review",
            "Flood Intelligence",
          ].map((step, index) => (

            <div
              key={step}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                {index + 1}
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-800">
                {step}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Reports Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Community Reports
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Simulated citizen observations requiring monitoring or verification.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-slate-50">
              <tr>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Report
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Location
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Category
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Severity
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Time
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {reports.map((report) => (

                <tr
                  key={report.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />

                      <div>
                        <p className="font-semibold text-slate-900">
                          {report.id}
                        </p>

                        <p className="text-xs text-slate-500">
                          {report.description}
                        </p>
                      </div>
                    </div>

                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {report.location}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {report.category}
                  </td>

                  <td className="px-5 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
  report.severity === "Critical"
    ? "bg-red-100 text-red-700"
    : report.severity === "High"
    ? "bg-orange-100 text-orange-700"
    : report.severity === "Moderate"
    ? "bg-yellow-100 text-yellow-700"
    : "bg-blue-100 text-blue-700"
}`}
>
                      {report.severity}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4 text-slate-400" />
                      {report.time}
                    </div>

                  </td>

                  <td className="px-5 py-4">

                    {report.status === "AI Verified" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        <CheckCircle className="h-3 w-3" />
                        AI Verified
                      </span>
                    )}

                    {report.status === "Authority Verified" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        Authority Verified
                      </span>
                    )}

                    {report.status === "Pending Verification" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        <AlertTriangle className="h-3 w-3" />
                        Pending
                      </span>
                    )}

                    {report.status === "Resolved" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        <CheckCircle className="h-3 w-3" />
                        Resolved
                      </span>
                    )}
                    {report.status === "DEMO SUBMITTED" && (
  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
    <CheckCircle className="h-3 w-3" />
    Demo Submitted
  </span>
)}
                  </td>

                  <td className="px-5 py-4">

                    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100">
                      <Eye className="h-4 w-4" />
                      Review
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* AI Verification */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              AI Image Verification
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Uploaded images can be analyzed for flooding relevance,
            duplicate reports, location correspondence and visual evidence.
          </p>

          <div className="mt-5 rounded-lg bg-slate-50 p-4">

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Example confidence
              </span>

              <span className="font-bold text-blue-600">
                91%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: "91%" }}
              />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Demonstration value only. A trained computer-vision model
              would be required for real deployment.
            </p>

          </div>

        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Community Intelligence
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Verified community observations can provide additional
            localized signals alongside rainfall, water-level and
            drainage data.
          </p>

          <div className="mt-5 space-y-3">

            {[
              "Identify localized flooding",
              "Detect conditions not covered by sensors",
              "Support authority verification",
              "Improve spatial flood awareness",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />

                <span className="text-sm text-slate-700">
                  {item}
                </span>
              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> Reports, verification results,
        locations and statistics are simulated demonstration data.
        Citizen reports should be verified before being used for official
        emergency decisions.
      </div>

    </div>
  );
}