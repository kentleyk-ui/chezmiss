
import { supabase } from "@/lib/supabase"

export default async function ProductsAdmin() {
  const { data: products } = await supabase.from("products").select("*")

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl mb-6">Produits</h1>

      <ul className="space-y-4">
        {products?.map((p) => (
          <li key={p.id} className="p-4 bg-white/10 rounded">
            {p.name} — {p.price}$
          </li>
        ))}
      </ul>
    </div>
  )
}
