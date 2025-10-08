import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon, X } from "lucide-react";

export default function AddTopic() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    topic_title: "",
    slug: "",
    description: "",
    image: "", // data URL (preview) – maps to longblob in backend
  });

  // Simulated fetch to prefill when editing
  useEffect(() => {
    if (id) {
      const fake = {
        topic_title: "Hadith Sciences",
        slug: "hadith-sciences",
        description:
          "Research and discussions on the methodology and principles of Hadith.",
        image: "",
      };
      setFormData(fake);
    }
  }, [id]);

  const handleChange = (key, val) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      handleChange("image", e.target.result || "");
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => handleChange("image", "");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with real API call — send formData.image (dataURL) as blob on backend
    console.log(id ? "Updating topic..." : "Creating topic...");
    console.log(formData);
    navigate("/topics");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Topic" : "Add New Topic"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            {id ? "موضوع میں ترمیم کریں" : "نئے موضوع کا اضافہ کریں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/listingtopic")}
          className="flex items-center text-slate-600 hover:text-slate-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Topics
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Title */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              Topic Title
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              موضوع کا عنوان
            </span>
          </div>
          <input
            type="text"
            value={formData.topic_title}
            onChange={(e) => handleChange("topic_title", e.target.value)}
            placeholder="e.g., Hadith Sciences"
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
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
            placeholder="e.g., hadith-sciences"
            required
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
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Write a short description for this topic..."
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Image (longblob) */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              Image (optional)
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              تصویر
            </span>
          </div>

          {!formData.image ? (
            <label className="mt-1 flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-300 rounded-xl py-10 cursor-pointer hover:border-slate-400 transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0])}
                className="hidden"
              />
              <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
              <span className="text-sm text-slate-600">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-slate-400 mt-1">
                PNG, JPG up to ~2MB
              </span>
            </label>
          ) : (
            <div className="mt-2 relative inline-block">
              <img
                src={formData.image}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-lg border border-slate-200 shadow-sm"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-white border border-slate-200 rounded-full p-1 shadow hover:bg-slate-50"
                aria-label="Remove image"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 mt-6">
          <button
            type="button"
            onClick={() => navigate("/topics")}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
          >
            {id ? "Save Changes" : "Save Topic"}
          </button>
        </div>
      </form>
    </div>
  );
}
