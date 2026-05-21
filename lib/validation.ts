import { z } from "zod"

const SectionSchema = z.object({
  page_id: z.string().min(1, "page_id required"),
  type: z.enum([
    "hero",
    "texte",
    "image",
    "cta",
    "gallery",
    "product-grid",
    "video",
  ]),
  position: z.number().int().nonnegative().optional(),
  data: z.record(z.any()).optional(),
})

const SectionUpdateSchema = z.object({
  data: z.record(z.any()).optional(),
})

export function validateSection(body: unknown) {
  return SectionSchema.safeParse(body)
}

export function validateSectionUpdate(body: unknown) {
  return SectionUpdateSchema.safeParse(body)
}
