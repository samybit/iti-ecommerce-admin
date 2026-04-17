"use client";

import CategoryForm from "@/components/categories/CategoryForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddCategoryPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
     toast.success("Category added successfully");

      router.push("/categories");
      router.refresh();
    } else {
      toast.error("This didn't work.")
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <CategoryForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}