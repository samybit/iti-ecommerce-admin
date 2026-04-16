import { ICategory, ICategoryForm } from "@/types/category";
import { useState, useEffect, useCallback } from "react";

const API_URL = "/api/categories";

export function useCategories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = useCallback(async () => {
    setLoading(true);

    const res = await fetch(API_URL);

    const result = await res.json();

    if (result.success) setCategories(result.data);

    setLoading(false);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const addCategory = async (form: ICategoryForm) => {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  const updateCategory = async (
    id: string,
    form: ICategoryForm
  ) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  const deleteCategory = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) getCategories();
  };

  return {
    categories,
    loading,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}