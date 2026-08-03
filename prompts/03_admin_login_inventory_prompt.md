# PHASE 3 — BUILD THE ADMIN LOGIN + VEHICLE INVENTORY MANAGEMENT

Continue working in:
C:\Users\Renan\Desktop\_Projetos\PROJETOS\ArmandoVeiculos

This phase assumes the public homepage and vehicle detail page already exist.


PROJECT CONTEXT

Project root:
C:\Users\Renan\Desktop\_Projetos\PROJETOS\ArmandoVeiculos

Brand:
Armando Veículos

Current public positioning:
- Vehicle sales
- Consignment
- Vehicle financing
- Inventory categories: Cars, Motorcycles, Nautical
- Address shown on the current website: Avenida São Paulo, 233, Centro, Mirandópolis - SP, 16800-025
- Main phone shown on the current website: (18) 3701-5015
- Financing contact shown on the current website: Bruna — (18) 99117-6409
- CNPJ shown on the current website: 34.942.422/0001-26

IMPORTANT BRAND/DESIGN RULES

1. Inspect the logo file available inside the project root and use it as the main visual reference. Do not redraw or modify the logo.
2. Build a coherent design system inspired by the logo:
   - Primary background: near-black / black
   - Main text: white
   - Brand accent: vivid racing red close to #E81F26 (adjust to the actual logo after inspecting it)
   - Secondary surfaces: charcoal / graphite
   - Neutral light sections may be used when they improve readability
   - Avoid blue CTAs, purple gradients, glassmorphism, neon effects, or generic "AI website" aesthetics
3. Typography should feel automotive, bold, condensed and modern:
   - Headings: use a strong condensed sans-serif such as Barlow Condensed, Saira Condensed, or the closest high-quality web font that visually matches the logo
   - Body/UI: Inter, Manrope, or a similarly clean sans-serif
   - Do not try to imitate the logo lettering for paragraph text
4. The visual direction should feel like a modern premium automotive inventory website: clean, fast, confident, image-led, and conversion-oriented.
5. Use subtle racing-inspired details only when tasteful: thin red lines, small angular separators, or restrained checkered-flag references. Do not turn the interface into a racing-game UI.
6. Use generous spacing, strong hierarchy, large vehicle photography, consistent card ratios, and excellent mobile responsiveness.
7. Accessibility: semantic HTML, keyboard-friendly interactions, proper contrast, alt text, visible focus states.
8. Performance: optimize images, use lazy loading where appropriate, avoid unnecessary heavy animation.
9. Do not invent business claims, awards, years in business, financing rates, customer reviews, guarantees, or vehicle specifications. If a fact is unknown, use a clearly labeled placeholder/config value instead of fabricating it.
10. Preserve the current project stack if one already exists. If the folder is empty or there is no established stack, use:
    - Next.js App Router
    - TypeScript
    - Tailwind CSS
    - Lucide icons
    - next/image
    - clean reusable component architecture
11. Keep all shared colors, radii, spacing, typography and components centralized so all future pages use the same design system.


GOAL

Build a secure, practical admin area for the owner/staff of Armando Veículos to log in and manage the public inventory without editing code.

The admin must support:
- secure login
- create vehicle
- edit vehicle
- upload/reorder/delete photos
- publish/unpublish
- mark as reserved or sold
- delete/archive
- search/filter inventory
- preview the public listing

Do not build a fake frontend-only login. Authentication and data persistence must be real.

RECOMMENDED BACKEND

If no backend has already been established, use Supabase:
- Supabase Auth for email/password admin authentication
- Supabase Postgres for vehicle data
- Supabase Storage for vehicle images
- Row Level Security (RLS)

If the project already has a real backend/auth/database, preserve and extend it instead of adding a second system.

ROUTES

Public:
- /
- /estoque/[slug]

Admin:
- /admin/login
- /admin
- /admin/veiculos
- /admin/veiculos/novo
- /admin/veiculos/[id]/editar

Protect every /admin route except /admin/login.

LOGIN PAGE

Create a clean admin login screen consistent with the Armando Veículos brand but more restrained than the public site.

Include:
- Armando Veículos logo
- title: "Painel administrativo"
- email
- password
- show/hide password
- submit button: "Entrar"
- loading state
- clear invalid-credentials error
- forgot-password flow only if correctly configured; otherwise do not add a fake link

Security:
- no credentials hardcoded in source code
- no secret keys exposed client-side
- authenticated users only
- redirect authenticated users away from /admin/login
- redirect unauthenticated users to /admin/login
- use server-side protection/middleware where appropriate

ADMIN DASHBOARD

Create a useful overview:
- total active vehicles
- cars
- motorcycles
- nautical
- reserved
- sold
- drafts
- recently added vehicles

Quick actions:
- "Cadastrar veículo"
- "Ver estoque público"

Do not create fake revenue/sales analytics unless real sales data exists.

VEHICLE LIST PAGE

Create a professional management table/grid with:
- cover thumbnail
- title
- category
- year
- price
- status
- featured
- created/updated date
- actions

Filters:
- search by make/model/version
- category
- status
- featured
- sort by newest/oldest/price

Actions:
- Edit
- Preview
- Duplicate (optional but useful)
- Mark as reserved
- Mark as sold
- Publish/unpublish
- Delete/archive

Require confirmation for destructive actions.

VEHICLE CREATE/EDIT FORM

Build one reusable form for both create and edit.

CORE FIELDS

Identification:
- Category: Car / Motorcycle / Nautical
- Make
- Model
- Version
- Display title
- Slug (auto-generated but editable)
- Status: Draft / Active / Reserved / Sold
- Featured: boolean

Commercial:
- Price
- Optional previous price
- Optional financing note
- Optional internal admin notes that NEVER appear publicly

General:
- Manufacture year
- Model year
- Color
- Condition
- Description
- Features/equipment list

CAR-SPECIFIC:
- Mileage
- Transmission
- Fuel
- Engine
- Body type
- Doors (optional)

MOTORCYCLE-SPECIFIC:
- Mileage
- Engine displacement / cc
- Fuel
- Engine
- optional motorcycle-specific fields

NAUTICAL-SPECIFIC:
- Engine
- Engine hours
- Year
- optional nautical-specific fields

Only show category-specific fields when relevant.
Do not force irrelevant car fields onto motorcycles or nautical inventory.

PHOTO MANAGEMENT

This is critical.

Implement:
- drag-and-drop multi-image upload
- image preview before upload where practical
- upload progress
- set cover image
- drag to reorder
- delete individual image
- confirm deletion if already persisted
- accepted image types validation
- reasonable file-size validation
- image optimization/compression strategy
- store public image URLs/paths correctly
- do not save base64 blobs in the database

Use Supabase Storage if Supabase is chosen.

The first/selected cover photo must feed:
- homepage vehicle card
- product page hero
- Open Graph image

DATABASE DESIGN

Create a clean schema/migration.

Suggested tables:

vehicles
- id uuid primary key
- slug unique
- category
- make
- model
- version
- title
- year_manufacture
- year_model
- price
- previous_price nullable
- mileage nullable
- engine_hours nullable
- transmission nullable
- fuel nullable
- engine nullable
- engine_displacement nullable
- color nullable
- body_type nullable
- condition nullable
- description nullable
- features jsonb or normalized equivalent
- status
- featured boolean
- cover_image nullable
- internal_notes nullable
- created_at
- updated_at

vehicle_images
- id uuid primary key
- vehicle_id foreign key
- storage_path / public_url strategy
- sort_order
- alt_text nullable
- created_at

You may improve the schema if there is a better normalized design, but keep it understandable and maintainable.

AUTHORIZATION / RLS

Implement RLS so:
- public/anonymous users can read ONLY publicly active vehicles and their public images
- authenticated authorized admin users can create/update/delete
- drafts/internal notes are never exposed to public queries
- service-role secrets are never exposed to browser code

If multiple authenticated users could exist, create a small admin profile/role mechanism rather than assuming every Supabase account is automatically an admin.

PUBLIC SITE INTEGRATION

Replace the Phase 1/2 mock inventory source with the real database.

Requirements:
- homepage loads active vehicles
- featured section uses featured=true
- product pages load active vehicles by slug
- sold/unpublished items do not appear in normal public inventory
- admin can preview drafts through a protected preview flow if practical
- public site keeps sensible loading/error/empty states
- no major public UI redesign in this phase

ADMIN UX

The admin is a work tool, so prioritize speed and clarity:
- dark/graphite visual system with red accent
- no decorative hero sections
- compact sidebar/top navigation
- readable tables
- clear form grouping
- sticky save actions on long forms when useful
- unsaved-changes warning
- success/error toasts
- mobile usable, but desktop-first is acceptable

SAVE BEHAVIOR

Buttons:
- "Salvar rascunho"
- "Publicar" or "Salvar alterações"

Validate required fields before publication.
Drafts may be incomplete.

Recommended minimum fields to publish:
- category
- make
- model/title
- year
- price
- at least one image
- unique slug

ENVIRONMENT / SETUP

- Create/update .env.example with every required public variable name, never real secrets.
- Document exactly what must be created in Supabase.
- Include migration SQL/schema files in the repository.
- If a storage bucket is needed, document its name and policies.
- Do not put real credentials in README or source code.

QUALITY + SECURITY CHECK

Before finishing:
- verify protected routes
- test invalid login
- test create/edit/delete
- test image upload
- test publish/unpublish
- test public pages after inventory changes
- ensure internal_notes never appear publicly
- ensure TypeScript/build/lint passes
- remove debugging logs and temporary credentials

DELIVERABLE

Leave a working admin login and inventory-management system connected to the public website.

At the end, provide:
1. files/routes created
2. database tables/migrations created
3. Supabase setup steps still required from the owner
4. required environment variables
5. how to create the first admin user
6. how the public site now reads inventory
7. any security assumptions or remaining TODOs
