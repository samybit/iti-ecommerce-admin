import { ICategory, ICategoryForm } from "@/types/category";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const API_URL = "/api/categories";

export function useCategories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(Array.isArray(data.categories) ? data.categories : []);
    } catch (err) {
      console.log(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
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

  const updateCategory = async (id: string, form: ICategoryForm) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Delete failed");
        return;
      }

      toast.success("Category deleted successfully");
      getCategories();
    } catch (error) {
      toast.error("Something went wrong");
    }
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
