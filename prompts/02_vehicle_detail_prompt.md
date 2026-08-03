# PHASE 2 — BUILD THE VEHICLE PRODUCT / DETAIL PAGE

Continue working in:
C:\Users\Renan\Desktop\_Projetos\PROJETOS\ArmandoVeiculos

This phase assumes the homepage and shared design system from Phase 1 already exist.


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

Create a complete vehicle detail page for the route:

/estoque/[slug]

This page must sell the vehicle through information, trust and lead generation. It must feel appropriate for vehicles that can cost tens or hundreds of thousands of reais, not like a generic e-commerce product page.

Reuse the exact same design system, header, footer, buttons, typography, spacing and Vehicle data model created in Phase 1.

PAGE STRUCTURE

1. BREADCRUMBS
Example:
Início / Estoque / Carros / Chevrolet S10 LTZ

2. MAIN PRODUCT AREA
Desktop:
- large image gallery on the left
- vehicle summary / commercial panel on the right

Mobile:
- gallery first
- summary immediately below

3. IMAGE GALLERY
Build a high-quality vehicle gallery:
- large primary image
- thumbnail strip
- previous/next controls
- image counter
- click to open fullscreen/lightbox
- swipe-friendly on mobile
- preserve aspect ratio
- use next/image
- visually highlight the selected thumbnail
- support 1 image gracefully
- support 20+ images without breaking the layout

Do not crop vehicle photos aggressively.

4. VEHICLE SUMMARY
Display:
- full vehicle title
- category
- year/model year
- price formatted in BRL
- status if available
- key specifications in a compact grid

For Cars, support:
- mileage
- transmission
- fuel
- engine
- color
- year
- optional body type

For Motorcycles, support category-appropriate fields such as:
- mileage
- engine displacement
- year
- fuel
- color

For Nautical inventory, allow:
- year
- engine
- engine hours
- category-specific specifications

Do not show empty labels.

5. PRIMARY CONVERSION CTA
Main button:
"Tenho interesse"

It should open WhatsApp with a prefilled message containing the exact vehicle title and page URL.

Example structure:
"Olá, tenho interesse no Chevrolet S10 LTZ 2025/2026 anunciado no site. Gostaria de mais informações: [URL]"

Use the configured business WhatsApp number rather than hardcoding it across multiple files.

Secondary CTA:
"Simular financiamento"

Optional tertiary CTA:
"Tenho veículo na troca"

Make the main action highly visible without using an aggressive or cheap visual style.

6. FINANCING LEAD MODULE
Create a polished financing section or modal.

Fields:
- Nome
- WhatsApp
- Entrada desejada (optional)
- Prazo pretendido (optional)
- Message / notes (optional)

Important:
- Do not calculate or promise a financing rate unless a real financing API/rule exists.
- The purpose is lead qualification.
- Submission can open a prefilled WhatsApp conversation with Bruna / financing contact.
- Use the verified financing contact from the current business information: (18) 99117-6409.
- Make this configurable in one central business config file.

7. VEHICLE DESCRIPTION
Section:
"Sobre este veículo"

Render the real description from data.
Support paragraphs and simple lists safely.
Do not invent text when the description is absent; provide an admin-friendly empty state only in development/admin contexts.

8. EQUIPMENT / FEATURES
Section:
"Itens e detalhes"

Render the vehicle's features as a clean grid or list.
Examples are only labels supported by actual vehicle data.

Do not populate fake equipment.

9. TECHNICAL SPECIFICATIONS
Create a reusable spec table/grid driven by the vehicle data.
Hide null/empty values automatically.

10. TRADE-IN SECTION
Headline:
"Tem um veículo na troca?"

Fields:
- Nome
- WhatsApp
- Marca
- Modelo
- Ano
- Quilometragem
- Message

CTA:
"Solicitar avaliação"

If there is no backend yet, generate a prefilled WhatsApp message containing both the trade-in vehicle and the vehicle currently being viewed.

11. STORE / TRUST BLOCK
Show:
- Armando Veículos
- Avenida São Paulo, 233, Centro, Mirandópolis - SP
- Main phone: (18) 3701-5015
- financing contact when relevant
- map/location CTA
- no invented hours or guarantees

12. RELATED INVENTORY
Section:
"Você também pode gostar"

Show 3–4 related vehicles from the same category or similar price range.
Use the shared VehicleCard component from Phase 1.
Do not show the current vehicle itself.

13. STICKY MOBILE CTA
On mobile, add a compact sticky bottom conversion bar containing:
- price
- "Tenho interesse" button

Make sure it does not cover page content or browser safe areas.

DATA + ROUTING REQUIREMENTS

- Use dynamic Next.js route /estoque/[slug].
- Reuse the Phase 1 vehicle data abstraction.
- Add notFound() behavior for invalid slugs.
- Add loading state if inventory is asynchronous.
- Generate dynamic metadata:
  title
  description
  Open Graph
- Use a meaningful SEO title such as:
  "Chevrolet S10 LTZ 2025/2026 | Armando Veículos"
- Add structured data when practical (Product/Offer or appropriate vehicle schema) using only real data.
- Make social sharing previews use the cover image.
- Currency: pt-BR / BRL.
- All WhatsApp URLs and business numbers must come from centralized config.
- Do not duplicate business information across components.

VISUAL QUALITY

The page should feel significantly more professional than the current catalog:
- strong image hierarchy
- premium black/graphite/white/red system
- readable price and specs
- minimal visual noise
- no blue buttons
- no generic marketplace appearance
- no giant unused white areas
- no random animations

DELIVERABLE

Implement the complete vehicle detail route and connect it to the homepage inventory cards.

Run the project and fix all build, TypeScript and lint errors.

At the end, summarize:
- route/files created
- reusable components added
- how WhatsApp lead flows work
- how product data is loaded
- what Phase 3 needs to connect the inventory to the admin/backend
