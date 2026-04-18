import { IProduct, IProductForm } from "@/types/product";
import { useState, useEffect, useCallback } from "react";

const API_URL = "/api/products";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      setProducts(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const addProduct = async (form: IProductForm) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) getProducts();
  };

  const updateProduct = async (id: string, form: IProductForm) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) getProducts();
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));

    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!res.ok) getProducts();
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
