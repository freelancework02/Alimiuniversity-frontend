import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ListingCategory() {
  const navigate = useNavigate();

  // Dummy category data
  const [categories, setCategories] = useState([
    {
      id: 1,
      category_title: "Islamic Studies",
      slug: "islamic-studies",
      description: "A category focused on Islamic research and articles.",
    },
    {
      id: 2,
      category_title: "Science & Faith",
      slug: "science-and-faith",
      description: "Exploring the harmony between science and faith.",
    },
    {
      id: 3,
      category_title: "Modern Education",
      slug: "modern-education",
      description: "Discussing trends in education from an Islamic perspective.",
    },
  ]);

  const handleEdit = (id) => {
    navigate(`/categories/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  const handleAdd = () => {
    navigate("/addcategory");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Categories</h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            زمرہ جات کی فہرست
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Category Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {category.category_title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {category.slug || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {category.description || "No description"}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="inline-flex items-center text-green-600 hover:bg-green-50 px-2 py-1 rounded-md transition"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
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
                  colSpan={4}
                  className="px-6 py-10 text-center text-slate-500 text-sm"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
