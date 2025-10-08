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
    // new fields
    imageFile: null,
    imagePreview: "",
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
        imageFile: null,
        imagePreview: "", // could be a URL if you had one
      };
      setFormData(fakeArticle);
    }
  }, [id]);

  // Revoke object URLs on unmount or when image changes
  useEffect(() => {
    return () => {
      if (formData.imagePreview && formData.imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      // clear
      if (formData.imagePreview && formData.imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(formData.imagePreview);
      }
      setFormData((prev) => ({ ...prev, imageFile: null, imagePreview: "" }));
      return;
    }
    // create preview URL
    const previewUrl = URL.createObjectURL(file);
    // revoke old preview if any
    if (formData.imagePreview && formData.imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(formData.imagePreview);
    }
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewUrl,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id ? "Updating article..." : "Creating new article...");
    // Include a lightweight representation of the image for now
    const payload = {
      ...formData,
      imageFile: formData.imageFile
        ? { name: formData.imageFile.name, size: formData.imageFile.size, type: formData.imageFile.type }
        : null,
    };
    console.log(payload);
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
            {id ? "یہاں مضمون میں ترمیم کریں" : "یہاں نیا مضمون شامل کریں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/articles")}
          className="cursor-pointer flex items-center text-slate-600 hover:text-slate-800 transition-colors"
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

        {/* Image Upload (added) */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              Feature Image
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              نمایاں تصویر
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
          {formData.imagePreview ? (
            <div className="mt-2">
              <img
                src={formData.imagePreview}
                alt="Selected preview"
                className="h-28 w-auto rounded-lg border border-slate-200"
              />
            </div>
          ) : null}
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
            className="cursor-pointer bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
          >
            Save Article
          </button>
        </div>
      </form>
    </div>
  );
}
