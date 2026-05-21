import { supabase } from "@/lib/supabase"
import Renderer from "@/app/components/builder/Renderer"

export default async function PublicPage({ params }: any) {
  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", params.slug)
    .single()

  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", page.id)
    .order("position")

  return (
    <div>
      <Renderer sections={sections} />
    </div>
  )
}

