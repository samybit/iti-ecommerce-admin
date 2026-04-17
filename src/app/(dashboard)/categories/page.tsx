"use client";
import CategoryTable from "@/components/categories/CategoryTable";
import { useCategories } from "@/hooks/useCategories";

export default function Page() {
  const { categories, loading, deleteCategory } = useCategories();

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      <CategoryTable
        categories={categories}
        onDelete={deleteCategory}
        loading={loading}
      />
    </div>
  );
}
