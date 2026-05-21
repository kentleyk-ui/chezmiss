import { supabase } from "@/lib/supabase"

export default async function EditPage({ params }: any) {
  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("id", params.id)
    .single()

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Modifier : {page.title}</h1>

      <a
        href={`/admin/pages/${params.id}/sections`}
        className="px-4 py-2 bg-purple-600 rounded-lg"
      >
        Gérer les sections
      </a>
    </div>
  )
}
