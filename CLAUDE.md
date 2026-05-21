# CHEZ MISS - Development Guide

## Project Overview

CHEZ MISS is a luxury beauty e-commerce website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. The site features a sophisticated page builder (Chezmissificator), dynamic gold theming, QR code generation, and multi-language support.

**Status**: Production-ready UI/UX with ~50% feature completeness. Critical backend features (auth, payments) not yet implemented.

---

## Architecture

### Tech Stack
- **Framework**: Next.js 16.2.6 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with CSS variables
- **State Management**: React Context (useGoldTheme)
- **Database**: Supabase PostgreSQL
- **Animations**: Framer Motion
- **Drag-Drop**: dnd-kit
- **Special Effects**: @paper-design/shaders (Liquid Metal)

### File Structure
```
/app                  # Next.js app router pages
  /admin              # Admin dashboard & builder
  /api                # API endpoints
/components           # React components
  /builder            # Page builder components
  /sections           # Section templates
/hooks                # Custom hooks
/lib                  # Utilities and helpers
/ui-lib               # Reusable UI components
/types.ts             # Global TypeScript definitions
```

---

## TypeScript Conventions

### 1. Enums & Constants
**Pattern**: Use typed constants instead of string literals.

```typescript
// ✅ Good - constants.ts
export const SECTION_TYPES = {
  HERO: "hero",
  TEXT: "texte",
  GALLERY: "gallery",
} as const;

export type SectionType = (typeof SECTION_TYPES)[keyof typeof SECTION_TYPES];

// ✅ Usage in components
import { SECTION_TYPES } from "@/lib/constants";

const COMPONENTS: Record<SectionType, ComponentType> = {
  [SECTION_TYPES.HERO]: HeroComponent,
  [SECTION_TYPES.TEXT]: TextComponent,
};
```

**Benefits**: 
- Prevents string typos
- Auto-completion in IDE
- Type narrowing in switch statements
- Single source of truth

### 2. Section Data Types
**Pattern**: Use specific types per section, extending base SectionData.

```typescript
// ✅ Good - types.ts
export interface HeroData extends SectionData {
  title?: string;
  subtitle?: string;
  image?: string;
}

// Component accepts union type
interface SectionComponentProps {
  data: SectionData;  // Flexible for runtime
}

// Validation uses specific types
function validateHeroData(data: HeroData): ValidationResult {
  if (!data.title) return { isValid: false, error: "Title required" };
  return { isValid: true };
}
```

### 3. Never Use `any`
**Pattern**: Replace `any` with proper types.

```typescript
// ❌ Bad
function renderSection(data: any): React.ReactElement {
  return <div>{data.content}</div>;
}

// ✅ Good
function renderSection(data: SectionData): React.ReactElement {
  return <div>{data.content}</div>;
}

// ✅ Better - Use discriminated union
interface HeroSection { type: "hero"; data: HeroData }
interface TextSection { type: "texte"; data: TextData }

type Section = HeroSection | TextSection;

function renderSection(section: Section): React.ReactElement {
  switch (section.type) {
    case "hero":
      return <Hero data={section.data} />;  // data typed as HeroData
    case "texte":
      return <Text data={section.data} />;  // data typed as TextData
  }
}
```

### 4. Generics for API Responses
**Pattern**: Use generic types for API handling.

```typescript
// ✅ Good - types.ts
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  statusCode: number;
}

// Usage
async function fetchSections(pageId: string): Promise<ApiResponse<Section[]>> {
  const response = await fetch(`/api/sections?page_id=${pageId}`);
  return response.json();
}
```

### 5. Function Parameter Types
**Pattern**: Always type function parameters and return types.

```typescript
// ✅ Good
function updateSection(
  sectionId: number | string,
  data: Partial<SectionData>
): Promise<Section> {
  return fetch(`/api/sections/${sectionId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }).then(r => r.json());
}

// ✅ Interface for complex parameters
interface UpdateSectionParams {
  sectionId: string | number;
  data: Partial<SectionData>;
  notifyUser?: boolean;
}

function updateSection(params: UpdateSectionParams): Promise<Section> {
  // Implementation
}
```

### 6. React Component Types
**Pattern**: Always type props and return type.

```typescript
// ✅ Good
interface PropertiesPanelProps {
  selected: Section | null;
  onChange: (section: Section) => void;
}

export default function PropertiesPanel({
  selected,
  onChange,
}: PropertiesPanelProps): React.ReactElement {
  // Implementation
  return <div>...</div>;
}

// ✅ With memo optimization
export default React.memo(PropertiesPanel);

// ✅ For children prop
interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  return <div>{children}</div>;
}
```

---

## Code Quality Standards

### Validation Pattern
Use the `useValidation` hook for all user inputs:

```typescript
import { useValidation, type ValidationResult } from "@/hooks/useValidation";

function MyForm() {
  const { validateUrl, validateText, sanitizeText } = useValidation();
  const [error, setError] = useState<string>();

  const handleChange = (value: string) => {
    const validation = validateUrl(value);
    if (!validation.isValid) {
      setError(validation.error);
    } else {
      setError(undefined);
      const sanitized = sanitizeText(value);
      // Use sanitized value
    }
  };

  return (
    <>
      <input onChange={(e) => handleChange(e.target.value)} />
      {error && <span className="text-red-500">{error}</span>}
    </>
  );
}
```

### Error Handling Pattern
Wrap components in ErrorBoundary:

```typescript
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function AdminPage() {
  return (
    <ErrorBoundary onError={(error) => console.error(error)}>
      <BuilderContent />
    </ErrorBoundary>
  );
}
```

### API Route Pattern
Type-safe API routes with proper error handling:

```typescript
// app/api/sections/route.ts
import { type NextRequest, NextResponse } from "next/server";
import type { ApiResponse, Section } from "@/types";

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Section[]>>> {
  try {
    const pageId = request.nextUrl.searchParams.get("page_id");
    if (!pageId) {
      return NextResponse.json(
        { error: "Missing page_id", statusCode: 400 },
        { status: 400 }
      );
    }

    // Fetch from database
    const sections = await fetchSections(pageId);
    
    return NextResponse.json({
      data: sections,
      statusCode: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", statusCode: 500 },
      { status: 500 }
    );
  }
}
```

---

## Constants & Configuration

All magic strings should be in `/lib/constants.ts`:

```typescript
// Good locations for constants:
export const SECTION_TYPES = { ... }      // Component types
export const TEXT_ALIGNMENTS = { ... }    // Option lists
export const TEXT_SIZES = { ... }         // Option lists
export const GOLD_COLORS = { ... }        // Color palette
export const UI_CONSTANTS = { ... }       // Timing, timeouts
export const VALIDATION = { ... }         // Validation rules
export const ERROR_MESSAGES = { ... }     // User-facing errors
export const SUCCESS_MESSAGES = { ... }   // User feedback
```

**Why**: Single source of truth, easy to update, prevents duplication.

---

## Performance Optimization Patterns

### 1. Image Optimization
**Pattern**: Use OptimizedImage wrapper for all images.

```typescript
import { OptimizedImage, HeroImage, ProductImage } from "@/components/OptimizedImage";

// For hero images (priority loading)
<HeroImage src="/hero.jpg" alt="Hero" />

// For product images
<ProductImage src="/product.jpg" alt="Product" width={400} height={400} />

// For gallery images
<GalleryImage src="/gallery.jpg" alt="Gallery item" width={300} height={300} />
```

**Benefits**:
- Automatic WebP/AVIF conversion
- Responsive sizing
- Lazy loading by default
- Error fallbacks

### 2. Component Memoization
**Pattern**: Memoize expensive components with custom equality checks.

```typescript
import { RendererMemo, PropertiesPanelMemo } from "@/lib/memoization";

// Use memoized versions for expensive renders
<RendererMemo sections={sections} onSelect={setSelected} />
<PropertiesPanelMemo selected={selected} onChange={onChange} />

// Or create custom memo
export const MemoSection = React.memo(
  SectionComponent,
  (prev, next) => {
    // Custom equality check - return true if equal (no re-render)
    return prev.id === next.id && prev.isSelected === next.isSelected;
  }
);
```

### 3. Dynamic Imports
**Pattern**: Defer heavy components using dynamic imports.

```typescript
import dynamic from "next/dynamic";

const BuilderContent = dynamic(
  () => import("@/components/BuilderContent"),
  { 
    ssr: false,
    loading: () => <BuilderSkeleton /> 
  }
);

// Usage in routes
export default function AdminPage() {
  return <BuilderContent />;
}
```

### 4. CSS Variables & Performance
**Pattern**: Use CSS variables for dynamic values (no JS overhead).

```css
:root {
  --color-gold-primary: #B79A5B;
  --transition-base: 300ms ease-out;
}

.button {
  background: var(--color-gold-primary);
  transition: all var(--transition-base);
  will-change: transform; /* GPU acceleration */
}
```

### 5. Lazy Loading Components
**Pattern**: Lazy load components below the fold using Intersection Observer.

```typescript
import { useLazyLoad } from "@/lib/performance";

export function GallerySection() {
  const galleryRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useLazyLoad(galleryRef, () => setIsLoaded(true));

  return (
    <div ref={galleryRef}>
      {isLoaded && <Gallery images={images} />}
    </div>
  );
}
```

### 6. Performance Monitoring
**Pattern**: Track performance metrics for debugging.

```typescript
import { performanceMonitor } from "@/lib/performance";

// In critical operations
performanceMonitor.markStart("builder-render");
// ... render logic
performanceMonitor.markEnd("builder-render");

// Log Web Vitals
performanceMonitor.logWebVitals();
```

---

## Bundle Optimization

### Removed Dependencies
- ✅ `jspdf` (185KB) - unused PDF generation
- ✅ `html-to-image` (120KB) - unused image conversion

**Savings**: ~305KB total (~60KB gzipped)

### Deferred Modules
- Builder components: 200KB → deferred
- QR/Barcode generator: 150KB → deferred
- Chat component: 50KB → deferred

**Impact**: ~400KB less on initial page load

### Tree-Shaking
- All unused exports removed
- Side-effect-free modules marked
- Lodash functions tree-shaken individually

---


```typescript
// For expensive components
export default React.memo(SectionItem, (prev, next) => {
  return (
    prev.section.id === next.section.id &&
    prev.isSelected === next.isSelected
  );
});
```

### 2. Dynamic Imports for Heavy Components
```typescript
const HeavyBuilder = dynamic(
  () => import("@/components/BuilderContent"),
  { ssr: false, loading: () => <Skeleton /> }
);
```

### 3. Image Optimization
```typescript
// ✅ Use Next.js Image component
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  placeholder="blur"
/>
```

---

## Git Conventions

**Branch naming**: 
- `feature/` for new features
- `fix/` for bug fixes
- `refactor/` for code improvements

**Commit messages**:
```
feat: add section duplication to builder
fix: resolve theme color not updating on all elements
refactor: improve type safety in PropertiesPanel
```

---

## Common Patterns

### Undo/Redo
```typescript
import { useUndoRedo } from "@/hooks/useUndoRedo";

const { push, undo, redo, canUndo, canRedo } = useUndoRedo();

// Push state when data changes
push(newSections);

// Undo/redo
const prevState = undo();  // Returns null if can't undo
```

### Theme Switching
```typescript
import { useGoldTheme } from "@/hooks/useGoldTheme";

const { theme, setTheme } = useGoldTheme();

// Get current color
const color = GOLD_COLORS[theme];  // #B79A5B or variant
```

### Language Support
```typescript
import { useLanguage } from "@/hooks/useLanguage";

const { lang, setLang, t } = useLanguage();

// Translate keys
<h1>{t("section.title")}</h1>
```

---

## Known Issues & TODOs

### Critical (Security)
- [ ] Implement Supabase RLS (Row Level Security)
- [ ] Add session authentication
- [ ] Remove public database access

### High Priority
- [ ] Implement payment processing (Stripe)
- [ ] Add order management
- [ ] Implement email notifications

### Medium Priority
- [ ] Optimize bundle size (remove unused dependencies)
- [ ] Add analytics tracking
- [ ] Create SEO sitemap
- [ ] Implement image CDN

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **dnd-kit**: https://docs.dnd-kit.com/
- **Framer Motion**: https://www.framer.com/motion/

---

## Contact & Questions

For architectural questions or refactoring suggestions, refer to this guide first. Most patterns are established and documented here.

**Last Updated**: 2026-05-21
**Maintained By**: Development Team
