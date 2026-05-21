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

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: Request, { params }: any) {
  try {
    const { error } = await supabase
      .from("sections")
      .delete()
      .eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete section" },
      { status: 500 }
    )
  }
}

