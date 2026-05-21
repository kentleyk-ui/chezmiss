import { supabase } from "@/lib/supabase"
import PublicRenderer from "@/app/components/builder/PublicRenderer"
import { notFound } from "next/navigation"

export default async function PublicPage({ params }: any) {
  const { slug } = await params

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!page) notFound()

  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", page.id)
    .order("position")

  return (
    <div>
      <PublicRenderer sections={sections || []} />
    </div>
  )
}


