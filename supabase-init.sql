-- Create pages table
CREATE TABLE IF NOT EXISTS public.pages (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sections table
CREATE TABLE IF NOT EXISTS public.sections (
  id BIGSERIAL PRIMARY KEY,
  page_id BIGINT NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  position INTEGER NOT NULL,
  data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_sections_page_id ON public.sections(page_id);
CREATE INDEX idx_pages_slug ON public.pages(slug);

-- Enable Row Level Security (optional - disable for now since no auth)
ALTER TABLE public.pages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections DISABLE ROW LEVEL SECURITY;
