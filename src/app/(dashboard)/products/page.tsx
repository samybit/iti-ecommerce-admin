"use client";
import ProductsTable from "@/components/products/ProductsTable";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

function ProductsPage() {
  const { products, loading, deleteProduct } = useProducts();

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/products/add"
          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800 transition"
        >
          + Add Product
        </Link>
      </div>

      <>
        <ProductsTable products={products} onDelete={deleteProduct} />
      </>
    </div>
  );
}

export default ProductsPage;
