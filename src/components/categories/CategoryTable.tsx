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
import { ICategory } from "@/types/category";

interface ICategoryTableProps {
  categories: ICategory[];
  onDelete: (id: string) => void;
  loading: boolean;
}

function SkeletonRow() {
  return (
    <tr className="border-t border-gray-50 h-15.25">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-8" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
        </div>
      </td>
    </tr>
  );
}

export default function CategoryTable({
  categories,
  onDelete,
  loading,
}: ICategoryTableProps) {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div className=" pl-2 mt-4">
          {loading ? (
            <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
          ) : (
            <p className="text-sm text-gray-400">
              {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"}
            </p>
          )}
        </div>

        <Link
          href="/categories/add"
          className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700
                    text-white text-sm font-semibold px-4 py-2.5 rounded-xl
                    shadow-sm shadow-green-200 transition duration-150 active:scale-[0.98]"
        >
          <span className="text-lg leading-none">+</span>
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md shadow-gray-100 overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-3.5 text-xs font-medium  uppercase tracking-wide">
                Name
              </th>
              <th className="text-right px-6 py-3.5 text-xs uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : categories.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="py-14 text-center text-sm text-gray-300"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-t border-gray-50 hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {cat.name}
                  </td>

                  <td className="px-6 py-4 text-right space-x-4">
                    <Link
                      href={`/categories/edit/${cat._id}`}
                      className="text-xs font-semibold hover:underline text-blue-500 hover:text-blue-600 transition duration-150"
                    >
                      Edit
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger className="cursor-pointer text-xs text-red-600 font-medium hover:underline bg-transparent border-none p-0">
                        Delete
                      </AlertDialogTrigger>

                      <AlertDialogContent className="max-w-md">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete <strong>{cat.name}</strong> from the
                            database.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(cat._id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
