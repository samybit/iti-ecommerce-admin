"use client"
import { useEffect, useState } from "react"

function Page() {
  const [products, setproducts] = useState([])
  const [form, setform] = useState({ 
    name: "", price: "", stock: "0", category: "", discount: "", description: "" 
  })
  const [Editid, setEditid] = useState(null)

  const getProducts = async () => {
    const res = await fetch("/api/products")
    const result = await res.json()
    if (result.success) setproducts(result.data)
  }

  useEffect(() => { getProducts() }, [])

  const addProduct = async (e) => {
    e.preventDefault()
    await fetch(`/api/products`, {
      method: "POST",
      body: JSON.stringify(form)
    })
    setform({ name: "", price: "", stock: "0", category: "", discount: "", description: "" })
    getProducts()
  }

  const updateProduct = async (e) => {
    e.preventDefault()
    await fetch(`/api/products/${Editid}`, {
      method: "PUT",
      body: JSON.stringify(form)
    })
    setform({ name: "", price: "", stock: "0", category: "", discount: "", description: "" })
    setEditid(null)
    getProducts()
  }

  // دالة واحدة كفاية عشان نملأ الفورم
  const startEdit = (p) => {
    setEditid(p._id)
    setform(p)
  }

  const deleletProduct = async (id) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
    if (res.ok) getProducts()
  }

  return (
    <div className="p-5">
      {/* عرض العنوان حسب الحالة */}
      <h2 className="text-xl font-bold mb-4 text-center">
        {Editid ? "Edit Product" : "Add New Product"}
      </h2>
      
      <form onSubmit={Editid ? updateProduct : addProduct} className="mx-auto max-w-2xl grid grid-cols-2 gap-4 rounded-lg border border-gray-300 bg-gray-100 p-6">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={form.name} onChange={(e) => setform({ ...form, name: e.target.value })} className="mt-1 w-full rounded border p-2" type="text" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input value={form.price} onChange={(e) => setform({ ...form, price: e.target.value })} className="mt-1 w-full rounded border p-2" type="number" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input value={form.stock} onChange={(e) => setform({ ...form, stock: e.target.value })} className="mt-1 w-full rounded border p-2" type="number" />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input value={form.category} onChange={(e) => setform({ ...form, category: e.target.value })} className="mt-1 w-full rounded border p-2" type="text" />
        </div>

        <div>
          <label className="block text-sm font-medium">Discount</label>
          <input value={form.discount} onChange={(e) => setform({ ...form, discount: e.target.value })} className="mt-1 w-full rounded border p-2" type="text" />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea value={form.description} onChange={(e) => setform({ ...form, description: e.target.value })} className="mt-1 w-full rounded border p-2" rows="2"></textarea>
        </div>

        <button className="col-span-2 bg-indigo-600 py-3 text-white rounded-lg hover:bg-indigo-700" type="submit">
          {Editid ? "Update Product" : "Save Product"} 
        </button>
      </form>

      <div className="overflow-x-auto mt-10">
        <table className="min-w-full border text-center">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th><th>Price</th><th>Stock</th>
              <th>Descrption</th> <th>discount</th>
              <th>Catogery</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b">
                <td className="p-2">{p.name}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.stock}</td>
                     <td className="p-2">{p.description}</td>
                          <td className="p-2">{p.discount}</td>
                                        <td className="p-2">{p.category}</td>
                          
                <td className="p-2 flex gap-2 justify-center">
                  <button onClick={() => deleletProduct(p._id)} className="text-red-600 font-bold">Delete</button>
                  {/* تصحيح: الزرار بينادي startEdit */}
                  <button onClick={() => startEdit(p)} className="text-blue-600 font-bold">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page