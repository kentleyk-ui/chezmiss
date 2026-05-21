import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Create pages table
    const pagesTable = await supabase.rpc("execute_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS public.pages (
          id BIGSERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `
    })

    // Create sections table
    const sectionsTable = await supabase.rpc("execute_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS public.sections (
          id BIGSERIAL PRIMARY KEY,
          page_id BIGINT NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
          type TEXT NOT NULL,
          position INTEGER NOT NULL,
          data JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `
    })

    return NextResponse.json({ success: true, message: "Tables initialized" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
