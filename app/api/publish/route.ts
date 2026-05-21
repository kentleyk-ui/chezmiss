import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST() {
  const { data: pages } = await supabase.from("pages").select("*")

  return NextResponse.json({
    status: "published",
    pages,
  })
}
