import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { RichTextEditor } from "./ui/RichTextEditor";

export default function AddArticle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    lang: "English",
    category: "",
    topic: "",
    content: "",
    slug: "",
    metaTitle: "",
    published: false,
  });

  // Simulated fetch for editing
  useEffect(() => {
    if (id) {
      const fakeArticle = {
        title: "Understanding Islamic Jurisprudence",
        lang: "English",
        category: "Fiqh",
        topic: "Sharia Law",
        content:
          "<p>This article explains the principles of Islamic jurisprudence.</p>",
        slug: "islamic-jurisprudence",
        metaTitle: "Islamic Jurisprudence - Article",
        published: true,
      };
      setFormData(fakeArticle);
    }
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id ? "Updating article..." : "Creating new article...");
    console.log(formData);
    navigate("/articles");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Article" : "Add New Article"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            {id
              ? "یہاں مضمون میں ترمیم کریں"
              : "یہاں نیا مضمون شامل کریں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/articles")}
          className="flex items-center text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Articles
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              Title
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              عنوان
            </span>
          </div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
            required
          />
        </div>

        {/* Language */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              Language
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              زبان
            </span>
          </div>
          <select
            value={formData.lang}
            onChange={(e) => handleChange("lang", e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          >
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>

        {/* Category & Topic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="e.g., Fiqh, History"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Topic
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
              placeholder="e.g., Sharia Law, Education"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Content
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(value) => handleChange("content", value)}
          />
        </div>

        {/* SEO Section */}
        <div className="border-t border-slate-200 pt-6 space-y-4">
          <h4 className="text-lg font-semibold text-slate-700">SEO / AEO</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => handleChange("metaTitle", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => handleChange("published", e.target.checked)}
              className="h-4 w-4 text-blue-600 border-slate-300 rounded"
            />
            <label className="text-sm text-slate-700">Published?</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 mt-6">
          <button
            type="button"
            onClick={() => navigate("/articles")}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
          >
            Save Article
          </button>
        </div>
      </form>
    </div>
  );
}
