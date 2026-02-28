# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Development server (http://localhost:3000)
npm run build     # Production build
npm run lint      # ESLint check
npm start         # Serve production build
```

There is no test suite configured.

## Architecture

**Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Ant Design 5, Recharts

**No backend** — all data is static mock data in `src/data/`.

### Server vs. Client Components

Pages default to server components. Client components are marked with `'use client'` and handle interactivity:
- `ProductsFilter.tsx` wraps `useSearchParams()` — must stay inside a `<Suspense>` boundary
- `ProductDetail.tsx` handles cart actions, size/quantity UI
- Dynamic route `app/products/[id]/page.tsx` is a server component that passes data to `ProductDetail` (client)
- `await params` is required in server components (Next.js 15 behavior)

### State Management

- **Cart**: React Context in `src/context/CartContext.tsx`, provided in root layout
- **Search**: URL query param (`?q=`), synced to Navbar's local state
- **Admin navigation**: `activeTab` state in `app/admin/page.tsx` controls which admin component renders

### Routing

| Route | Component | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Hero + featured products |
| `/products` | `app/products/page.tsx` | Grid with `ProductsFilter` |
| `/products/[id]` | `app/products/[id]/page.tsx` | Server component, renders `ProductDetail` |
| `/admin` | `app/admin/page.tsx` | Dashboard with sidebar nav |
| `/cart` | `app/cart/page.tsx` | Cart contents |

### Design System

Custom Tailwind config (`tailwind.config.ts`):
- Colors: `cream` (#F8F5F0), `stone.dark` (#1A1A1A), `stone.accent` (#8B7355)
- Fonts: `font-display` (Playfair Display), `font-body` (DM Sans) — loaded via Google Fonts in `globals.css`

Ant Design themed via `ConfigProvider` in `app/layout.tsx` with `#8B7355` as primary color. Admin uses blue accent `#4563FF` with `lucide-react` icons.

### Icon Libraries

Two icon libraries in use — do not mix contexts:
- `@ant-design/icons` — used in main UI (Navbar, ProductCard, etc.). Use `ShoppingOutlined`, not `ShoppingBagOutlined`
- `lucide-react` — used exclusively in admin sidebar (`AdminSidebar.tsx`)

### Image Configuration

External images require `next.config.ts` `remotePatterns`. Currently only `placehold.co` is allowed.

### ESLint Rules

- Unescaped entities in JSX are disallowed — use `&apos;` / `&quot;` or reword (e.g. "does not" instead of "doesn't")

### Path Alias

`@/*` maps to `./src/*` — use for all imports.
