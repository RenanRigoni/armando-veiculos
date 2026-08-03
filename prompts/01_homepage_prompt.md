# PHASE 1 — BUILD THE ARMANDO VEÍCULOS HOMEPAGE

You are working inside:
C:\Users\Renan\Desktop\_Projetos\PROJETOS\ArmandoVeiculos


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

Create a complete, production-quality homepage for Armando Veículos. The existing website behaves mostly like a basic catalog. The new homepage must reposition the business as a professional vehicle store while still making inventory discovery the main action.

Do not create a generic dealership template. The page must clearly feel designed for Armando Veículos.

PAGE STRUCTURE

1. STICKY HEADER
- Use the real logo from the project folder.
- Desktop navigation:
  - Início
  - Estoque
  - Carros
  - Motos
  - Náutica
  - Venda seu veículo
  - Consignação
  - Financiamento
  - Sobre
  - Contato
- Add a prominent WhatsApp/contact CTA on the right.
- Mobile: compact header + accessible menu.
- When scrolling, keep the header readable without using excessive blur/glass effects.

2. HERO
Create a strong automotive hero, not a giant empty banner.
Use either:
- a real high-quality inventory image already present in the project, or
- a neutral placeholder component prepared for a future real image.

Suggested copy direction:
Headline:
"Seu próximo veículo começa aqui."

Supporting copy:
"Carros, motos e náutica selecionados. Compra, venda, consignação e financiamento em um só lugar."

Primary CTA:
"Ver estoque"

Secondary CTA:
"Vender meu veículo"

Add small trust/service highlights beneath the CTAs:
- Compra e venda
- Consignação
- Financiamento

Do not invent claims such as "best prices", "20 years in business", etc.

3. SMART INVENTORY SEARCH
Immediately after or partially overlapping the hero, create a polished vehicle-search module.

Filters:
- Categoria: Todos / Carros / Motos / Náutica
- Marca
- Modelo
- Ano
- Faixa de preço
- Optional: Quilometragem when category is Cars
- Search button: "Buscar veículos"

On mobile, filters may collapse into a clean filter drawer.

Build this as reusable components and make the data model ready for real inventory.

4. CATEGORY SECTION
Create three large visual category cards:
- Carros
- Motos
- Náutica

Each card should use an actual project image if available.
Avoid tiny circular thumbnails like the current website.
Each card should have:
- category name
- short neutral descriptor
- CTA: "Ver estoque"

5. FEATURED INVENTORY
Section title:
"Veículos em destaque"

Create a responsive vehicle-card component.

Each vehicle card must be ready to display:
- cover image
- make + model + version
- year/model year
- price
- mileage when applicable
- transmission when applicable
- fuel when applicable
- category
- optional status badge: Novo / Seminovo / Reservado
- CTA: "Ver detalhes"

Do NOT use "COMPRAR" as the main CTA.

Cards should be image-first, consistent, visually premium, and easy to scan.
Use realistic typed sample data only if no inventory data source exists yet. Clearly isolate mock data in a data file so it can later be replaced by the admin/backend.

6. COMMERCIAL SERVICES
Create three strong service blocks:
- Compra e venda
- Consignação
- Financiamento

Each block should explain the service in one or two concise sentences and provide a CTA.

Suggested CTAs:
- "Quero vender meu veículo"
- "Quero consignar"
- "Simular financiamento"

The buttons can open a WhatsApp flow or placeholder modal/form prepared for integration.

7. TRADE-IN / SELL YOUR VEHICLE LEAD SECTION
Create a high-conversion section:
Headline:
"Quer vender ou trocar seu veículo?"

Short copy inviting the visitor to request an evaluation.

Fields:
- Nome
- WhatsApp
- Marca
- Modelo
- Ano
- Optional message

CTA:
"Solicitar avaliação"

If there is no backend yet, build the form UI and validation and route the submitted information into a prefilled WhatsApp message. Do not silently discard the submission.

8. ABOUT / TRUST SECTION
Create a real "Sobre a Armando Veículos" section instead of an empty institutional page.

Use only verified information:
- Armando Veículos
- Sales, consignment and financing
- Mirandópolis - SP

Include a store image if one exists in the project; otherwise create an image placeholder with correct dimensions and a clear TODO comment.

Do not invent company history.

CTA:
"Conhecer a Armando Veículos"

9. LOCATION + CONTACT
Create a strong contact section with:
- Avenida São Paulo, 233, Centro, Mirandópolis - SP, 16800-025
- Phone: (18) 3701-5015
- Financing: Bruna — (18) 99117-6409
- WhatsApp CTA
- Google Maps embed placeholder/config prepared for the exact map URL
- business hours only if verified in existing project data; otherwise do not invent them

10. FINAL CTA
"Não encontrou o veículo que procura?"
Invite the visitor to contact the team with the desired model.

CTA:
"Falar com um consultor"

11. FOOTER
Include:
- real logo
- navigation
- categories
- contact
- address
- CNPJ 34.942.422/0001-26
- privacy/terms links
- social links only if actual URLs exist in the project/config
- no "Meloja" branding

FUNCTIONAL REQUIREMENTS

- Create reusable components.
- Create a central Vehicle TypeScript type that can later be used by the product page and admin panel.
- Suggested vehicle fields:
  id, slug, category, make, model, version, title, yearManufacture, yearModel,
  price, mileage, transmission, fuel, color, engine, description,
  features, images, coverImage, status, featured, createdAt.
- For Nautical items, support engine hours or category-specific fields without forcing car-only fields.
- Provide a simple data abstraction layer so mock inventory can later be replaced by Supabase/API without rewriting the UI.
- All inventory cards must link to /estoque/[slug].
- Add polished empty states and loading/skeleton states where useful.
- Add SEO metadata for the homepage.
- Add responsive behavior for 360px mobile through large desktop screens.
- Avoid horizontal overflow.
- Use real Brazilian currency formatting: pt-BR / BRL.

DELIVERABLE

Implement the homepage fully in the project. Run the project, fix TypeScript/build/lint errors, and leave it in a working state.

At the end, provide a concise summary of:
- files created/changed
- design system decisions
- how inventory data is currently sourced
- what is ready for Phase 2
