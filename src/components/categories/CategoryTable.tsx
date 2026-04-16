"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
}

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data.categories) ? data.categories : []);
    } catch (err) {
      console.log(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id: string) => {
    const oldData = categories;
    setCategories((prev) => prev.filter((c) => c._id !== id));
    setDeletingId(id);

    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
    } catch (err) {
      console.log(err);
      setCategories(oldData);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-sm text-gray-400">Loading...</p>
    );
  }

  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-medium text-gray-900">Categories</h2>
          <p className="text-xs text-gray-400">{categories.length} categories</p>
        </div>

        {/* FIXED LINK */}
        <Link
          href="/categories/add"
          className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800
                     text-green-50 text-sm font-medium px-4 py-2 rounded-lg transition
                     active:scale-[0.98]"
        >
          <span className="text-base leading-none">+</span>
          Add Category
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">

          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500">
                Name
              </th>
              <th className="text-right px-4 py-2.5 text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-10 text-center text-sm text-gray-400">
                  No categories yet
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat._id} className="border-t border-gray-100 hover:bg-gray-50 transition">

                  <td className="px-4 py-3 text-sm text-gray-800">
                    {cat.name}
                  </td>

                  <td className="px-4 py-3 text-right space-x-4">

                    {/* FIXED EDIT LINK */}
                    <Link
                      href={`/categories/edit/${cat._id}`}
                      className="text-xs cursor-pointer font-medium text-blue-600 hover:text-blue-700 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteCategory(cat._id)}
                      disabled={deletingId === cat._id}
                      className="text-xs cursor-pointer font-medium text-red-600 hover:text-red-700
                                 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      {deletingId === cat._id ? "Deleting..." : "Delete"}
                    </button>

                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}