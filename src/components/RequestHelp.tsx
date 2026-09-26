import { useState } from "react";
import { CheckCircle, HeartHandshake } from "lucide-react";
import { getApiBaseUrl } from "../services/api";

const assistanceTypes = [
  "Medical assistance",
  "Rescue / evacuation",
  "Food / drinking water",
  "Shelter",
  "Elderly / child assistance",
  "Other",
];

export default function RequestHelp() {
  const [form, setForm] = useState({
    assistance_type: "",
    name: "",
    contact: "",
    location: "",
    people_count: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.assistance_type ||
      !form.name ||
      !form.contact ||
      !form.location ||
      !form.people_count ||
      !form.description
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (Number(form.people_count) <= 0) {
      alert("Number of people must be greater than 0.");
      return;
    }

    try {
      const response = await fetch(
        `${getApiBaseUrl()}/api/assistance-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assistance_type: form.assistance_type,
            name: form.name,
            contact: form.contact,
            location: form.location,
            people_count: Number(form.people_count),
            description: form.description,
            flood_risk: 86,
            flood_risk_level: "Critical",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Request submission failed");
      }

      const data = await response.json();

      setRequestId(data.request_id);
      setSubmitted(true);
    } catch (error) {
      alert("Unable to submit the request. Please check that the backend is running.");
    }
  };

  if (submitted) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />

          <h2 className="text-2xl font-bold text-gray-900">
            Assistance Request Submitted
          </h2>

          <p className="text-gray-600 mt-2">
            Your prototype assistance request has been submitted successfully.
          </p>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">Request ID</p>
            <p className="text-xl font-bold text-gray-900">
              {requestId}
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-5">
            Status: Submitted
          </p>

          <p className="text-xs text-gray-400 mt-6">
            DEMO / SIMULATED DATA — This prototype does not represent a live
            emergency dispatch system.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-8 h-8 text-red-500" />

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Request Help
              </h1>

              <p className="text-gray-600">
                Request assistance during a flood situation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assistance Type *
              </label>

              <select
                name="assistance_type"
                value={form.assistance_type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select assistance</option>

                {assistanceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name / Identifier *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name or identifier"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Information *
              </label>

              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Enter contact information"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of People Needing Assistance *
              </label>

              <input
                type="number"
                min="1"
                name="people_count"
                value={form.people_count}
                onChange={handleChange}
                placeholder="Enter number of people"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Briefly describe the assistance needed"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700">
                Available Flood Risk Context
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Current demo context: T. Nagar — Critical flood risk (86)
              </p>

              <p className="text-xs text-gray-400 mt-1">
                DEMO / SIMULATED DATA
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700"
            >
              Submit Assistance Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}