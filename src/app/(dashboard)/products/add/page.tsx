"use client";
import { useState } from "react";
import ProductForm from "@/components/products/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { IProductForm } from "@/types/product";
import { toast } from "sonner";

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
  const [isLoading, setIsLoading] = useState(false);
  const { addProduct } = useProducts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addProduct(form);
      toast.success("Product added successfully!");
      setForm(initialForm);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <ProductForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        isEditing={false}
        loading={isLoading}
      />
    </div>
  );
}
