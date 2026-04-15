import { IProduct, IProductForm } from "@/types/product";
import { useState, useEffect, useCallback } from "react";

const API_URL = "/api/products";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch(API_URL);
    const result = await res.json();
    if (result.success) setProducts(result.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const addProduct = async (form: IProductForm) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  const updateProduct = async (id: string, form: IProductForm) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  const deleteProduct = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) getProducts();
  };

  return {
    products,
    loading,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
