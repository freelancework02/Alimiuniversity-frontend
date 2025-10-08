import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddDepartment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    under_department: "",
    department_teacher: "",
    language: "English",
    overview: "",
    objectives: "",
  });

  useEffect(() => {
    if (id) {
      // Simulated existing data fetch
      const fakeDepartment = {
        id,
        name: "Islamic Studies",
        under_department: "Faculty of Theology",
        department_teacher: "Dr. Ahmad Khan",
        language: "Arabic",
        overview:
          "The Islamic Studies Department focuses on Quranic sciences and Hadith studies.",
        objectives:
          "To train students in Islamic scholarship, research, and teaching methodology.",
      };
      setFormData(fakeDepartment);
    }
  }, [id]);

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id ? "Updating Department..." : "Creating Department...");
    console.log(formData);
    navigate("/departments");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Department" : "Add New Department"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            {id ? "محکمہ میں ترمیم کریں" : "نیا محکمہ شامل کریں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/listingdepartment")}
          className="flex items-center text-slate-600 hover:text-slate-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Departments
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Department Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Department Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., Islamic Studies"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Under Department */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Under Department
          </label>
          <input
            type="text"
            value={formData.under_department}
            onChange={(e) => handleChange("under_department", e.target.value)}
            placeholder="e.g., Faculty of Theology"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Department Teacher */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Department Teacher
          </label>
          <input
            type="text"
            value={formData.department_teacher}
            onChange={(e) => handleChange("department_teacher", e.target.value)}
            placeholder="e.g., Dr. Ahmad Khan"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Language
          </label>
          <select
            value={formData.language}
            onChange={(e) => handleChange("language", e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          >
            <option>English</option>
            <option>Arabic</option>
            <option>Urdu</option>
          </select>
        </div>

        {/* Overview */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Overview
          </label>
          <textarea
            rows={3}
            value={formData.overview}
            onChange={(e) => handleChange("overview", e.target.value)}
            placeholder="Brief summary of the department..."
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Objectives */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Objectives
          </label>
          <textarea
            rows={3}
            value={formData.objectives}
            onChange={(e) => handleChange("objectives", e.target.value)}
            placeholder="Main objectives or goals of the department..."
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 mt-6">
          <button
            type="button"
            onClick={() => navigate("/departments")}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
          >
            {id ? "Save Changes" : "Save Department"}
          </button>
        </div>
      </form>
    </div>
  );
}
