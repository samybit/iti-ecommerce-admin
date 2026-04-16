"use client";

import { useState } from "react";

type Props = {
  initialData?: { _id?: string; name: string };
  form?: { name: string };
  setForm?: (val: any) => void;
  onSubmit?: (e: React.FormEvent) => void;
  isEditing?: boolean;
};

export default function CategoryForm({
  initialData,
  form,
  setForm,
  onSubmit,
  isEditing,
}: Props) {
  const [loading, setLoading] = useState(false);

  // 
  const value = form?.name ?? initialData?.name ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    await onSubmit?.(e);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 shadow-sm"
      >
        <h2 className="text-base font-medium text-gray-900">
          {isEditing ? "Edit Category" : "Add Category"}
        </h2>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-500">
            Category Name
          </label>

          {/* SAME UI 100% */}
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                       text-gray-900 placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-green-100
                       focus:border-green-600 transition"
            placeholder="Category name"
            value={value}
            onChange={(e) =>
              setForm?.({ name: e.target.value })
            }
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
          {loading ? "Saving..." : isEditing ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}