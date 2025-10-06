import React, { useState } from "react";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialArticles = [
  {
    id: 1,
    title: "Understanding Islamic Jurisprudence",
    category: "Fiqh",
    topic: "Sharia Law",
    published: true,
  },
  {
    id: 2,
    title: "The Concept of Knowledge in Islam",
    category: "Education",
    topic: "Epistemology",
    published: false,
  },
  {
    id: 3,
    title: "History of Madrasah System",
    category: "History",
    topic: "Islamic Education",
    published: true,
  },
];

export default function ListingArticle() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(initialArticles);

  const handleAdd = () => navigate("/articles/new");
  const handleEdit = (id) => navigate(`/articles/edit/${id}`);
  const handleDelete = (id) => setArticles((prev) => prev.filter((a) => a.id !== id));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          Articles
        </h3>

        <button
           onClick={() => navigate("/addarticle")}
          className="mt-3 sm:mt-0 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Article
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Topic
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Published
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-slate-100">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {article.title}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {article.category}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {article.topic}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      article.published
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {article.published ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(article.id)}
                    className="p-2 rounded-full hover:bg-slate-100"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-green-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-2 rounded-full hover:bg-slate-100"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="text-center text-slate-500 py-10">
            No articles found. Click “Add New Article” to create one.
          </div>
        )}
      </div>
    </div>
  );
}
