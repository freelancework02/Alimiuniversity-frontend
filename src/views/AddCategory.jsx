import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    category_title: "",
    slug: "",
    description: "",
  });

  // Simulated fetch for edit mode
  useEffect(() => {
    if (id) {
      const fakeCategory = {
        category_title: "Islamic Studies",
        slug: "islamic-studies",
        description:
          "A category focused on articles and research in the field of Islamic Studies.",
      };
      setFormData(fakeCategory);
    }
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id ? "Updating category..." : "Creating new category...");
    console.log(formData);
    navigate("/categories");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Category" : "Add New Category"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            {id
              ? "زمرہ میں ترمیم کریں"
              : "نیا زمرہ شامل کریں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/categories")}
          className="flex items-center text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Categories
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Title */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              Category Title
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              زمرہ کا عنوان
            </span>
          </div>
          <input
            type="text"
            value={formData.category_title}
            onChange={(e) => handleChange("category_title", e.target.value)}
            placeholder="e.g., Islamic Studies"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              URL Slug
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              سلگ (یو آر ایل)
            </span>
          </div>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            placeholder="e.g., islamic-studies"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              تفصیل
            </span>
          </div>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Write a short description for this category..."
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 mt-6">
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
          >
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
}
