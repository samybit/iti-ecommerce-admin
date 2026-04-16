import CategoryTable from "@/components/categories/CategoryTable";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Categories
        </h1>

       
      </div>

      <CategoryTable />
    </div>
  );
}