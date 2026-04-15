"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { IProductForm } from "@/types/product";

const initialForm: IProductForm = {
  name: "",
  price: "",
  stock: "0",
  category: "",
  discount: "",
  description: "",
};

export default function EditProductPage() {
  const [form, setForm] = useState<IProductForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const { updateProduct } = useProducts();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const result = await res.json();
      if (result.success) {
        const p = result.data;
        setForm({
          name: p.name,
          price: String(p.price),
          stock: String(p.stock),
          category: p.category,
          discount: p.discount,
          description: p.description,
        });
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(id, form);
    router.push("/products");
  };

  if (loading) return <p className="p-6 text-gray-400">Loading product...</p>;

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
}
