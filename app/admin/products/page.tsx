
import { supabase } from "@/lib/supabase"

export default async function ProductsAdmin() {
  const { data: products, error } = await supabase.from("products").select("*")

  if (error) {
    return (
      <div className="p-10 text-white">
        <h1 className="text-3xl mb-6">Produits</h1>
        <p className="text-red-400">Table &quot;products&quot; introuvable. Créez-la dans Supabase pour commencer.</p>
      </div>
    )
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl mb-6">Produits</h1>

      {!products?.length ? (
        <p className="text-white/50">Aucun produit pour l&apos;instant.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((p) => (
            <li key={p.id} className="p-4 bg-white/10 rounded">
              {p.name} — {p.price}$
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
