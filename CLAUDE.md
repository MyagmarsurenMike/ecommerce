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

**Status**: Phase 1 ✅ (shop pages built), Phase 2 🚀 (in progress — Supabase + auth + admin CRUD)

---

## PHASE 2 EXECUTION PLAN

**Goal**: Make admin fully functional with real data.

### Task Sequence (do in order)

1. **Supabase Setup** — Replace mock data with real database
   - Install packages: `@supabase/supabase-js`, `@supabase/auth-helpers-nextjs`
   - Add `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - Create `lib/supabase.ts` (client) and `lib/supabase-server.ts` (server/API)
   - Run SQL schema in Supabase Dashboard (categories, products, profiles, orders, order_items, order_status_logs, qpay_invoices)
   - Create `products` Storage bucket (public)
   - Replace mock data imports on: homepage, product listing, product detail, admin dashboard, admin products, admin orders

2. **Authentication** — Login/register + protect routes
   - Create `app/(auth)/login/page.tsx` and `app/(auth)/register/page.tsx`
   - Create `middleware.ts` to protect `/admin`, `/account`, `/checkout` routes
   - Add role check: users with `profiles.role = 'admin'` can access `/admin`
   - Add logout button to admin sidebar
   - Add login/logout to Navbar (show user avatar + dropdown if logged in)
   - Manually set your account to `role = 'admin'` in Supabase dashboard

3. **Product CRUD** — Admin can create/edit/delete products
   - Update `app/admin/products/page.tsx` to fetch real products from Supabase
   - Create `components/admin/ProductForm.tsx` (reusable for new/edit)
   - Create `app/admin/products/new/page.tsx` (create product form)
   - Create `app/admin/products/[id]/edit/page.tsx` (edit product form)
   - Implement image upload → Supabase Storage
   - Add edit/delete/toggle-active buttons to product table
   - Auto-generate slug from product name

4. **Order Tracking** — Admin manages orders, customers track them
   - Connect `app/admin/orders/page.tsx` to real orders from Supabase
   - Create `app/admin/orders/[id]/page.tsx` with status update form
   - Status changes create entries in `order_status_logs` table (powers customer timeline)
   - Create `app/account/orders/page.tsx` (customer order history)
   - Create `app/account/orders/[id]/page.tsx` (customer order tracking timeline with Ant Design `Steps`)

### Checklist

- [ ] Task 1: Supabase packages, env vars, client files, schema, storage, mock data replaced
- [ ] Task 2: Login/register working, middleware protecting routes, admin role set, logout/navbar updated
- [ ] Task 3: Product list + CRUD forms working, image upload, slug auto-gen, table actions
- [ ] Task 4: Admin orders + status updates, customer order history + timeline

### After Phase 2

Phase 3 will add:
- Checkout page → order creation from cart
- QPay payment flow (QR + deeplinks + webhook)
- Email notifications (Resend)
- Full-text search (database-powered)
- Real analytics

---

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
