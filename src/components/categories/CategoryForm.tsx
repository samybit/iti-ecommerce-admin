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

  const [localForm, setLocalForm] = useState({
    name: initialData?.name || "",
  });

  const value = form?.name ?? localForm.name;

  const handleChange = (name: string) => {
    if (setForm) {
      setForm({ name });
    } else {
      setLocalForm({ name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    await onSubmit?.(e);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-10 space-y-7 shadow-md border border-gray-100"
      >
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Edit Category" : "Add Category"}
          </h2>
          <p className="text-sm text-gray-500">
            {isEditing
              ? "Update the category name below."
              : "Create a new category for your products."}
          </p>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Category Name
          </label>

          <input
            className="w-full rounded-xl px-4 py-3 text-sm text-gray-900
                       placeholder:text-gray-300 bg-gray-50
                       border border-gray-200
                       focus:outline-none focus:ring-2 focus:ring-green-100
                       focus:border-green-500 transition"
            placeholder="e.g. Electronics, Clothing..."
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition
            ${
              loading
                ? "bg-green-300 text-white cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white shadow-sm"
            }`}
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update Category"
            : "Add Category"}
        </button>
      </form>
    </div>
  );
}