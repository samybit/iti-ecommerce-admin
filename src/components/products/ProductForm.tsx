import { IProductForm } from "@/types/product";
import React from "react";

interface IProductFormProps {
  form: IProductForm;
  setForm: React.Dispatch<React.SetStateAction<IProductForm>>;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

const ProductForm = ({
  form,
  setForm,
  onSubmit,
  isEditing,
}: IProductFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-2xl grid grid-cols-2 gap-4 rounded-lg border border-gray-300 bg-gray-100 p-6"
    >
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="text"
          required
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
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Stock</label>
        <input
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <input
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Discount</label>
        <input
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          type="text"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 w-full rounded border p-2"
          rows={2}
        ></textarea>
      </div>

      <button
        className="col-span-2 bg-indigo-600 py-3 text-white rounded-lg hover:bg-indigo-700"
        type="submit"
      >
        {isEditing ? "Update Product" : "Save Product"}
      </button>
    </form>
  );
};
export default ProductForm;
