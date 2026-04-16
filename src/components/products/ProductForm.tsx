import { IProductForm } from "@/types/product";
import React from "react";

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
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto  grid grid-cols-2 gap-4 rounded-lg border border-gray-300 p-6"
    >
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
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
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="number"
          placeholder="Available quantity"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <input
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="text"
          placeholder="e.g. Electronics"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Discount</label>
        <input
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="text"
          placeholder="e.g. 10%"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          rows={3}
          placeholder="Write a short description about the product..."
        ></textarea>
      </div>

      <button
        disabled={loading}
        className={`
          col-span-2 cursor-pointer bg-indigo-600 py-3 text-white rounded-lg hover:bg-indigo-700
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
