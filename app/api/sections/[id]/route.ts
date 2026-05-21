import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: any) {
  const body = await req.json()

  const { data, error } = await supabase
    .from("sections")
    .update({
      data: body.data,
    })
    .eq("id", params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error }, { status: 500 })return NextResponse.json(data)
}

