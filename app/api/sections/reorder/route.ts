import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sections } = await req.json();

    if (!sections || !Array.isArray(sections)) {
      return NextResponse.json(
        { error: "Invalid sections array" },
        { status: 400 }
      );
    }

    // Update position for each section
    const updates = sections.map((section: any, index: number) =>
      supabase
        .from("sections")
        .update({ position: index })
        .eq("id", section.id)
    );

    const results = await Promise.all(updates);

    // Check for errors
    const errors = results.filter((r) => r.error);
    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Failed to reorder sections", details: errors[0].error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, updated: sections.length });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
