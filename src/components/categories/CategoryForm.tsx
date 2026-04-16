"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryForm({
  initialData,
}: {
  initialData?: { _id?: string; name: string };
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const isEdit = !!initialData?._id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEdit
        ? `/api/categories/${initialData?._id}`
        : "/api/categories";
      await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      router.push("/categories");
      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 shadow-sm"
      >
        <h2 className="text-base font-medium text-gray-900">
          {isEdit ? "Edit Category" : "Add Category"}
        </h2>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-500 p-5">
            Category Name
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                       text-gray-900 placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-green-100
                       focus:border-green-600 transition"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          className={`w-full py-2.5 rounded-lg text-sm font-medium text-green-50 transition
            ${loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800 active:scale-[0.98]"
            }`}
        >
          {loading ? "Saving..." : isEdit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}