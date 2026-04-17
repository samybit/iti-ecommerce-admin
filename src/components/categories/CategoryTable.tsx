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

export default function CategoryTable({
  categories,
  onDelete,
  loading,
}: ICategoryTableProps) {
  if (loading) {
    return (
      <p className="text-center mt-10 text-sm text-gray-400 animate-pulse">
        Loading categories...
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400 pl-2 mt-4">
          {categories.length}{" "}
          {categories.length === 1 ? "category" : "categories"}
        </p>

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
        <table className="w-full">
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
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="py-14 text-center text-sm text-gray-300"
                >
                  No categories yet
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

                  <td className="px-6 py-4 flex items-center justify-end gap-4">
                    <Link
                      href={`/categories/edit/${cat._id}`}
                      className="text-sm font-medium text-blue-600 hover:underline transition duration-150"
                    >
                      Edit
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger className="text-sm font-medium text-red-600 cursor-pointer hover:underline bg-transparent border-none p-0">
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
