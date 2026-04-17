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
      <p className="text-center mt-10 text-sm text-gray-400 animate-pulse">
        Loading categories...
      </p>
    );
  }

  return (
    <div className="space-y-5">

      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
            Categories
          </h2>
          <p className="text-sm text-gray-400">
            {categories.length} {categories.length === 1 ? "category" : "categories"}
          </p>
        </div>

        <Link
          href="/categories/add"
          className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700
                     text-white text-sm font-semibold px-4 py-2.5 rounded-xl
                     shadow-sm shadow-green-200 transition duration-150 active:scale-[0.98]"
        >
          <span className="text-lg leading-none">+</span>
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md shadow-gray-100 overflow-hidden">
        <table className="w-full">

          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                Name
              </th>
              <th className="text-right px-6 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-14 text-center text-sm text-gray-300">
                  No categories yet
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-t border-gray-50 hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {cat.name}
                  </td>

                  <td className="px-6 py-4 text-right space-x-4">
                    <Link
                      href={`/categories/edit/${cat._id}`}
                      className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition duration-150"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteCategory(cat._id)}
                      disabled={deletingId === cat._id}
                      className="text-xs font-semibold text-red-500 hover:text-red-600
                                 disabled:opacity-40 disabled:cursor-not-allowed transition duration-150"
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