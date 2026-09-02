import {
  Camera,
  Droplets,
  Brain,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Upload,
  Ruler,
  ShieldAlert,
} from "lucide-react";

export default function PhotoWaterDepthAnalysis() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Camera className="h-7 w-7 text-blue-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Photo Water-Depth Analysis
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Estimate floodwater depth from citizen-submitted photographs.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          DEMO / SIMULATED AI
        </div>
      </div>

      {/* Main Analysis Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Upload Section */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              Upload Flood Photograph
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Upload an image showing a flooded road, street or public area.
          </p>

          <div className="mt-6 flex min-h-[230px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center">

            <div className="rounded-full bg-blue-100 p-4">
              <Camera className="h-8 w-8 text-blue-600" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              Drop an image here
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              JPG, PNG or JPEG
            </p>

            <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              <Upload className="h-4 w-4" />
              Select Image
            </button>

          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 p-3">
            <MapPin className="h-4 w-4 text-slate-500" />

            <span className="text-xs text-slate-600">
              Location can be attached to improve analysis context.
            </span>
          </div>

        </div>

        {/* Analysis Result */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              AI Analysis Result
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Example result generated using simulated analysis.
          </p>

          {/* Depth */}
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-blue-700">
                  Estimated Water Depth
                </p>

                <p className="mt-1 text-4xl font-bold text-blue-900">
                  42 cm
                </p>
              </div>

              <div className="rounded-full bg-white p-4">
                <Ruler className="h-7 w-7 text-blue-600" />
              </div>

            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: "58%" }}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-blue-700">
              <span>0 cm</span>
              <span>75 cm+</span>
            </div>

          </div>

          {/* Severity */}
          <div className="mt-4 grid grid-cols-2 gap-3">

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
              <p className="text-xs text-orange-600">
                Flood Severity
              </p>

              <p className="mt-1 text-lg font-bold text-orange-700">
                High
              </p>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <p className="text-xs text-purple-600">
                AI Confidence
              </p>

              <p className="mt-1 text-lg font-bold text-purple-700">
                87%
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Analysis Factors */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />

          <h2 className="text-lg font-semibold text-slate-900">
            Analysis Factors
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Example visual signals that a future computer-vision model could use.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center gap-3">
              <Droplets className="h-5 w-5 text-blue-600" />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Waterline Detection
                </p>

                <p className="text-xs text-slate-500">
                  Detect visible water boundaries.
                </p>
              </div>
            </div>

          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center gap-3">
              <Ruler className="h-5 w-5 text-green-600" />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Reference Objects
                </p>

                <p className="text-xs text-slate-500">
                  Compare water level with known objects.
                </p>
              </div>
            </div>

          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-orange-600" />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Location Context
                </p>

                <p className="text-xs text-slate-500">
                  Combine image and location information.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Risk Assessment */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">

          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-orange-600" />

            <div>
              <h2 className="font-semibold text-orange-900">
                Flood Risk Assessment
              </h2>

              <p className="text-sm text-orange-700">
                Estimated from the simulated water-depth result.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">

            <div className="flex justify-between text-sm">
              <span className="text-orange-800">
                Estimated depth
              </span>

              <strong className="text-orange-900">
                42 cm
              </strong>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-orange-800">
                Risk category
              </span>

              <strong className="text-orange-900">
                High
              </strong>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-orange-800">
                Analysis confidence
              </span>

              <strong className="text-orange-900">
                87%
              </strong>
            </div>

          </div>

        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-6">

          <div className="flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-green-600" />

            <div>
              <h2 className="font-semibold text-green-900">
                Recommended Response
              </h2>

              <p className="text-sm text-green-700">
                Example system recommendation.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">

            <div className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />

              <p className="text-sm text-green-800">
                Monitor the reported location for increasing water depth.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />

              <p className="text-sm text-green-800">
                Cross-check the report with rainfall and water-level data.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />

              <p className="text-sm text-green-800">
                Escalate to authorized authorities if conditions worsen.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Pipeline */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Photo Analysis Pipeline
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">

          {[
            "Photo Upload",
            "Image Quality Check",
            "Water Detection",
            "Depth Estimation",
            "Risk Update",
          ].map((step, index) => (

            <div
              key={step}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                {index + 1}
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-800">
                {step}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Prototype Notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <strong>Prototype Notice:</strong> The water depth, confidence,
        severity and AI analysis shown here are simulated demonstration
        values. Actual deployment would require a validated computer-vision
        model, calibrated reference information and field verification.
      </div>

    </div>
  );
}