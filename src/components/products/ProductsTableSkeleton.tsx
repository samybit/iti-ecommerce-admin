import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsTableSkeleton() {
  const skeletonRows = Array.from({ length: 5 });

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
          {skeletonRows.map((_, index) => (
            <tr key={index} className="border-b">
              {/* name */}
              <td className="p-3">
                <Skeleton className="h-4 w-30 mx-auto" />
              </td>
              {/* price */}
              <td className="p-3">
                <Skeleton className="h-4 w-15 mx-auto" />
              </td>
              {/* stock */}
              <td className="p-3">
                <Skeleton className="h-4 w-10 mx-auto" />
              </td>
              {/* description */}
              <td className="p-3">
                <Skeleton className="h-4 w-50 mx-auto" />
              </td>
              {/* discount */}
              <td className="p-3">
                <Skeleton className="h-4 w-10 mx-auto" />
              </td>
              {/* category */}
              <td className="p-3">
                <Skeleton className="h-4 w-20 mx-auto" />
              </td>
              {/* Actions */}
              <td className="p-3">
                <div className="flex gap-3 justify-center">
                  <Skeleton className="h-4 w-10" />
                  <Skeleton className="h-4 w-12.5" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
