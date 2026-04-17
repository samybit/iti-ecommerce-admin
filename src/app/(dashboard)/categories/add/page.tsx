"use client";

import CategoryForm from "@/components/categories/CategoryForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    router.push("/categories");
    router.refresh();
  };

  return (
    <CategoryForm
      form={form}
      setForm={setForm}
      onSubmit={handleSubmit}
    />
  );
}