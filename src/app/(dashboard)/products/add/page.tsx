"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function AddProductPage() {
  const [form, setForm] = useState<IProductForm>(initialForm);
  const { addProduct } = useProducts();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct(form);
    router.push("/products");
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <ProductForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        isEditing={false}
      />
    </div>
  );
}
