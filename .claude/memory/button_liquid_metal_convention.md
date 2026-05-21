---
name: Liquid Metal Button Convention
description: All buttons across the site must use LiquidMetalButton component for consistent styling
type: feedback
---

**Rule:** All new buttons must use the `LiquidMetalButton` component from `@/ui-lib/components/liquid-metal-button`.

**Why:** The LiquidMetalButton provides a consistent, premium liquid metal effect with shader animations that matches the brand aesthetic. It's used throughout navigation, forms, and CTAs for visual cohesion.

**How to apply:** 
- Import: `import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button"`
- Usage: `<LiquidMetalButton label="Button Text" onClick={handleClick} />`
- For icons: Use `viewMode="icon"` parameter
- Don't use plain HTML buttons or other button components

**Examples:**
- Navigation items (✅ Already implemented in app/page.tsx)
- Authentication buttons: Sign In, Create Account (✅ Implemented in signin/page.tsx and signup/page.tsx)
- Form submissions
- Modal actions
- Call-to-action sections

**Exceptions:** Only use plain `<button>` tags for utility buttons (search, cart, mobile menu toggle) that need simple icon buttons with 44px+ touch targets.
