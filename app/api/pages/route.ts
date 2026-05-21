import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  const { data, error } = await supabase.from("pages").select("*").order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { title, slug } = body

  const { data, error } = await supabase
    .from("pages")
    .insert([{ title, slug }])
    .select()
    .single()

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}
