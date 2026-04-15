import { IProduct } from "@/types/product";
import Link from "next/link";

interface Props {
  products: IProduct[];
  onDelete: (id: string) => void;
}

export default function ProductsTable({ products, onDelete }: Props) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border text-center text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Description</th>
            <th className="p-3">Discount</th>
            <th className="p-3">Category</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-gray-400">
                No products found.
              </td>
            </tr>
          )}
          {products.map((p: IProduct) => (
            <tr key={p._id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3">{p.name}</td>
              <td className="p-3">${p.price}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3 max-w-xs truncate">{p.description}</td>
              <td className="p-3">{p.discount}%</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">
                <div className="flex gap-3 justify-center">
                  <Link
                    href={`/products/edit/${p._id}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="cursor-pointer text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
