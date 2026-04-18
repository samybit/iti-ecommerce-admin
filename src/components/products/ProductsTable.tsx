import { IProduct } from "@/types/product";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface IProductTableProps {
  products: IProduct[];
  onDelete: (id: string) => void;
  isLoading: boolean;
}

function SkeletonRow() {
  return (
    <tr className="border-b">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="p-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function ProductsTable({
  products,
  onDelete,
  isLoading,
}: IProductTableProps) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border text-center text-sm table-fixed">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="p-3 w-[15%]">Name</th>
            <th className="p-3 w-[10%]">Price</th>
            <th className="p-3 w-[8%]">Stock</th>
            <th className="p-3 w-[25%]">Description</th>
            <th className="p-3 w-[10%]">Discount</th>
            <th className="p-3 w-[15%]">Category</th>
            <th className="p-3 w-[17%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-6 text-gray-400">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((p: IProduct) => (
              <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 max-w-xs truncate">{p.description}</td>
                <td className="p-3">{p.discount ? `${p.discount}%` : ""}</td>
                <td className="p-3">
                  {typeof p.category === "string"
                    ? p.category
                    : p.category?.name}
                </td>
                <td className="p-3">
                  <div className="flex gap-3 justify-center">
                    <Link
                      href={`/products/edit/${p._id}`}
                      className="text-xs text-blue-600 font-medium hover:underline"
                    >
                      Edit
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger className="cursor-pointer text-red-600 font-medium hover:underline bg-transparent border-none p-0">
                        Delete
                      </AlertDialogTrigger>

                      <AlertDialogContent className="max-w-md">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete <strong>{p.name}</strong> from the database.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(p._id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
