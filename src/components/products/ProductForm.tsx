"use client";

import { ICategory } from "@/types/category";
import { IProductForm } from "@/types/product";
import React, { useEffect, useState } from "react";

interface IProductFormProps {
  form: IProductForm;
  setForm: React.Dispatch<React.SetStateAction<IProductForm>>;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
  loading?: boolean;
}

const ProductForm = ({
  form,
  setForm,
  onSubmit,
  isEditing,
  loading,
}: IProductFormProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className={`relative mx-auto grid grid-cols-2 gap-4 rounded-lg border border-gray-300 p-6 transition-opacity ${
        loading ? "opacity-60 pointer-events-none" : "opacity-100"
      }`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
          <p className="text-sm font-semibold text-gray-500">Loading data...</p>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          disabled={loading}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="text"
          required
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          disabled={loading}
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="number"
          required
          placeholder="e.g. 99.99"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Stock</label>
        <input
          disabled={loading}
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="number"
          placeholder="Available quantity"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>

        <select
          disabled={loading}
          value={
            typeof form.category === "string"
              ? form.category
              : form.category?._id
          }
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          required
        >
          <option value="">Select category</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Discount</label>
        <input
          disabled={loading}
          value={form.discount ?? ""}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="number"
          placeholder="e.g. 10"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          disabled={loading}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          rows={3}
          placeholder="Write a short description about the product..."
        ></textarea>
      </div>

      <button
        disabled={loading}
        className={`col-span-2 cursor-pointer bg-green-700 transition-all py-3 text-white rounded-lg hover:bg-green-800
          ${loading ? "opacity-50" : ""}`}
        type="submit"
      >
        {loading
          ? isEditing
            ? "Updating..."
            : "Saving..."
          : isEditing
            ? "Update Product"
            : "Save Product"}
      </button>
    </form>
  );
};

export default ProductForm;
