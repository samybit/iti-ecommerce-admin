import CategoryForm from "@/components/categories/CategoryForm";

async function getCategory(id: string) {

  const res = await fetch(
    `http://localhost:3000/api/categories/${id}`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {

  const data = await getCategory(params.id);

  return (

    <div className="p-6">

      <CategoryForm initialData={data.category} />

    </div>

  );
}