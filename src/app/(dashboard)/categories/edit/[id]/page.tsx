"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CategoryForm from "@/components/categories/CategoryForm";

interface ICategory {
  _id: string;
  name: string;
}

export default function EditCategoryPage() {
  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/categories/${id}`);
        const result = await res.json();

        if (result.success) {
          setForm({
            name: result.category.name,
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      router.push("/categories");
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading)
    return <p className="p-6 text-gray-400">Loading category...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>

      <CategoryForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
}