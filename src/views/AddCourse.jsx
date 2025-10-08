import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [departments] = useState([
    { id: 1, name: "Islamic Studies" },
    { id: 2, name: "Computer Science" },
    { id: 3, name: "Business Administration" },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    department_id: "",
    language: "English",
    duration: "",
    faculty: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      // Simulated edit data (replace with actual fetch call)
      const fakeData = {
        id,
        title: "Intro to Fiqh",
        department_id: "1",
        language: "Arabic",
        duration: "6 Months",
        faculty: "Dr. Ahmad Khan",
        description:
          "An introductory course covering the fundamentals of Islamic jurisprudence.",
      };
      setFormData(fakeData);
    }
  }, [id]);

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id ? "Updating course..." : "Creating course...");
    console.log(formData);
    navigate("/courses");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Course" : "Add New Course"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            {id ? "کورس میں ترمیم کریں" : "نیا کورس شامل کریں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/listingcourses")}
          className="flex items-center text-slate-600 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Courses
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Course Title
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g., Introduction to Hadith"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Department
          </label>
          <select
            required
            value={formData.department_id}
            onChange={(e) => handleChange("department_id", e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
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

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Duration
          </label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            placeholder="e.g., 6 Months / 1 Year"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Faculty */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Faculty
          </label>
          <input
            type="text"
            value={formData.faculty}
            onChange={(e) => handleChange("faculty", e.target.value)}
            placeholder="e.g., Dr. Ali Raza"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Write a brief description of the course..."
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 mt-6">
          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
          >
            {id ? "Save Changes" : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}
