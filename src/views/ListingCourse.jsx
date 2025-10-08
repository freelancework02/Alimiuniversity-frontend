import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function ListingCourse() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Intro to Fiqh",
      department: "Islamic Studies",
      language: "Arabic",
      duration: "6 Months",
      faculty: "Dr. Ahmad Khan",
      created_at: "2025-10-08 10:30 AM",
    },
    {
      id: 2,
      title: "Computer Programming 101",
      department: "Computer Science",
      language: "English",
      duration: "1 Year",
      faculty: "Prof. Ali Raza",
      created_at: "2025-09-25 09:00 AM",
    },
  ]);

  const handleAdd = () => navigate("/addcourses");
  const handleEdit = (id) => navigate(`/courses/edit/${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Courses</h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            کورس کی فہرست
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Faculty
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {course.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {course.language}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {course.duration}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {course.faculty}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {course.created_at}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(course.id)}
                      className="inline-flex items-center text-green-600 hover:bg-green-50 px-2 py-1 rounded-md transition"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="inline-flex items-center text-red-600 hover:bg-red-50 px-2 py-1 rounded-md transition"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-slate-500 text-sm"
                >
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
