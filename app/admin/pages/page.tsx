import { supabase } from "@/lib/supabase"

export default async function PagesList() {
  const { data: pages } = await supabase.from("pages").select("*")

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Pages</h1>

      <a
        href="/admin/pages/new"
        className="px-4 py-2 bg-purple-600 rounded-lg text-white"
      >
        + Nouvelle page
      </a>

      <ul className="space-y-4 mt-6">
        {pages?.map((p) => (
          <li key={p.id} className="p-4 bg-white/10 rounded-lg flex justify-between">
            <span>{p.title}</span>
            <a href={`/admin/pages/${p.id}`} className="text-purple-300 underline">
              Modifier
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
