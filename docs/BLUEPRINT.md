# Armando Veículos — Blueprint de Estrutura e Stack (MODO DEMO)

## Context

Pasta `ArmandoVeiculos` tem só 3 prompts de fase (`01_homepage`, `02_vehicle_detail`, `03_admin_login_inventory`) e `Logo/` com 2 PNGs. Zero código, zero git.

**Objetivo desta entrega: demo de vendas.** Mostrar ao dono da Armando Veículos a diferença entre o catálogo Meloja atual e um site automotivo profissional. Usuários: só o desenvolvedor e o dono.

Esforço vai para **qualidade visível**: visual, estoque funcionando, página de veículo excelente, admin simples que funciona, responsivo, deploy rápido na Vercel.

**Este documento é o contrato de execução.** Estrutura definida por Opus; implementação por Sonnet. Stack, nomenclatura, schema e ordem de build estão travados aqui — Sonnet executa, não re-decide.

### Decisões travadas
- Supabase desde a Fase 1 (banco + auth + imagens), sem etapa mock
- Admin único, credencial de demo `admin` / `admin`
- Projeto Supabase **novo e exclusivo**
- Deploy Vercel
- **Não over-engineer.** Lista explícita do que não fazer em §10

### Achado crítico
O único projeto Supabase da conta (`fvgbbixxcapltudonxqx`, "RenanRigoni's Project") é o **Alicerce**: contém `pacientes`, `evolucoes`, `responsaveis_detalhes` — dados de saúde. **Proibido reusar.** Criar projeto novo `armando-veiculos` em `sa-east-1`.

---

## 1. Stack (versões verificadas em 03/08/2026)

| Camada | Escolha | Versão |
|---|---|---|
| Framework | Next.js App Router | 16.2.12 |
| Runtime | React | 19.2.8 |
| Linguagem | TypeScript strict | 5.x |
| Estilo | Tailwind CSS v4 (`@theme` em CSS, sem `tailwind.config.js`) | 4.3.3 |
| Ícones | lucide-react | 1.28.0 |
| Banco/Auth/Storage | Supabase | js 2.112.0 · ssr 0.12.4 |
| Forms | react-hook-form + @hookform/resolvers | 7.84.0 |
| Validação | zod | 4.4.3 |
| Reordenar fotos | @dnd-kit/core + @dnd-kit/sortable | 6.3.1 |
| Toasts | sonner | 2.0.7 |
| Package manager | pnpm | 11.20 |
| Node | 24.14.1 | — |

**Não instalar:** framer-motion, shadcn/ui, react-query, zustand, vitest, playwright. Server Components + `searchParams` cobrem estado; animação fica em CSS transitions; verificação é manual (§9).

### Scaffold
```bash
pnpm create next-app@latest . --ts --app --tailwind --eslint --src-dir --import-alias "@/*" --use-pnpm
```

---

## 2. Design system (extraído do logo)

Amostragem de pixels de `Logo/thumb (1).png` (299×300):

| Token | Hex | Uso |
|---|---|---|
| `--color-ink` | `#050506` | fundo principal (logo usa `#010203`) |
| `--color-surface` | `#0E0F11` | cards, header |
| `--color-surface-2` | `#17191C` | elevado, inputs |
| `--color-border` | `#26292E` | divisórias |
| `--color-brand` | `#E11E25` | accent (cor dominante de "VEÍCULOS") |
| `--color-brand-bright` | `#ED1C24` | hover/foco |
| `--color-brand-dark` | `#B3141A` | active/pressed |
| `--color-fg` | `#FFFFFF` | texto principal |
| `--color-fg-muted` | `#A1A6AD` | texto secundário |
| `--color-success` | `#22A06B` | status ativo |
| `--color-warning` | `#D98A0B` | reservado |

Tipografia via `next/font/google` em `app/layout.tsx`:
- **Display/headings:** Barlow Condensed (600/700), var `--font-display`, `uppercase` + `tracking-tight` — casa com o lettering do logo
- **Body/UI:** Inter (400/500/600), var `--font-sans`

Raios: `--radius-sm: 4px`, `--radius-md: 8px`, `--radius-lg: 12px`. Nada de pill em cards.

Detalhe de marca: linha vermelha de 2-3px como separador de seção e underline de nav ativo. Bandeira quadriculada **só** dentro do logo.

**Proibido** (vira site genérico): gradiente roxo/azul, glassmorphism, CTA azul, neon, blur pesado no header, animação de entrada em cada seção.

### Logo
- `Logo/thumb (1).png` (fundo preto, "ARMANDO" branco) → `public/logo-dark.png` — **padrão**, header e footer
- `Logo/thumb.png` (fundo claro) → `public/logo-light.png` — seções claras, favicon
- Não redesenhar, não recolorir, não distorcer proporção

---

## 3. Rotas

**Públicas** (Server Components, anon key):
- `/` — homepage
- `/estoque` — listagem com filtros por `searchParams` (`?categoria=&marca=&modelo=&anoMin=&precoMax=&q=&page=`)
- `/estoque/[slug]` — detalhe

**Admin** (middleware redireciona sem sessão → `/admin/login`):
- `/admin/login` · `/admin` · `/admin/veiculos` · `/admin/veiculos/novo` · `/admin/veiculos/[id]/editar`

Nav (`Carros`, `Motos`, `Náutica`) aponta para `/estoque?categoria=carros|motos|nautica` — não são rotas separadas.

Estado de filtro **mora na URL**, não em client state.

---

## 4. Árvore de arquivos

```
ArmandoVeiculos/
├─ CLAUDE.md                  ← guardrails de execução (§8)
├─ .env.example · .env.local (gitignored)
├─ next.config.ts             ← remotePatterns p/ *.supabase.co
├─ prompts/                   ← mover os 3 .md originais pra cá
├─ supabase/migrations/
│  ├─ 0001_schema.sql
│  ├─ 0002_rls.sql
│  ├─ 0003_storage.sql
│  └─ 0004_seed.sql           ← 8 veículos de exemplo p/ Fases 1-2
├─ public/
│  ├─ logo-dark.png · logo-light.png
│  └─ placeholder-vehicle.svg
└─ src/
   ├─ proxy.ts                            ← refresh de sessão + guarda /admin (Next 16: proxy, ex-middleware)
   ├─ app/
   │  ├─ layout.tsx · globals.css · not-found.tsx
   │  ├─ page.tsx
   │  ├─ estoque/page.tsx · loading.tsx
   │  ├─ estoque/[slug]/page.tsx · loading.tsx
   │  └─ admin/…  (login/, page.tsx, veiculos/, veiculos/novo/, veiculos/[id]/editar/)
   ├─ components/
   │  ├─ layout/     Header · MobileNav · Footer · WhatsAppFab
   │  ├─ home/       Hero · CategoryCards · FeaturedInventory · ServicesGrid ·
   │  │              TradeInSection · AboutSection · ContactSection · FinalCta
   │  ├─ inventory/  VehicleCard · VehicleGrid · SearchFilters · FilterDrawer ·
   │  │              VehicleCardSkeleton · EmptyState
   │  ├─ vehicle/    Gallery · Lightbox · SummaryPanel · SpecGrid · FeatureList ·
   │  │              RelatedVehicles · StickyMobileCta
   │  ├─ forms/      LeadForm · FinancingForm · TradeInForm · fields/
   │  ├─ admin/      AdminShell · StatCard · VehicleTable · VehicleForm ·
   │  │              ImageManager · StatusBadge · ConfirmDialog
   │  └─ ui/         Button · Input · Select · Textarea · Badge · Card · Modal · Skeleton
   ├─ config/        business.ts · navigation.ts
   ├─ lib/
   │  ├─ supabase/   client.ts · server.ts · middleware.ts
   │  ├─ auth.ts     ← mapeia username → e-mail interno
   │  └─ format.ts · slug.ts · whatsapp.ts · images.ts · utils.ts
   ├─ data/          vehicles.ts (leitura) · vehicles.admin.ts (server actions)
   ├─ schemas/       vehicle.ts (draft + publish) · leads.ts
   └─ types/         vehicle.ts · database.ts (gerado)
```

**Regra de tamanho:** nenhum arquivo passa de 400 linhas. `page.tsx` compõe seções, não implementa UI.

---

## 5. Modelo de dados

### `src/config/business.ts` — fonte única de verdade
Nenhum telefone, endereço ou CNPJ hardcoded em componente. Só dados verificados dos prompts:
```
name: "Armando Veículos"
address: { street: "Avenida São Paulo, 233", district: "Centro",
           city: "Mirandópolis", state: "SP", zip: "16800-025" }
phone: "(18) 3701-5015"                    // tel: +551837015015
whatsappSales: "5518XXXXXXXXX"             // ⚠ TODO — não informado nos prompts
financing: { name: "Bruna", phone: "(18) 99117-6409", whatsapp: "5518991176409" }
cnpj: "34.942.422/0001-26"
mapsEmbedUrl: ""                           // ⚠ TODO — dono fornece
hours: null                                // não inventar
socials: {}                                // só se URL real existir
```
> **Pendência do dono:** WhatsApp comercial e URL do Maps não constam nos prompts. Até chegarem, o CTA de vendas cai no WhatsApp da Bruna com `TODO` explícito. Nunca inventar número.

### Schema Postgres — `0001_schema.sql`
Tabela única com colunas nulas por categoria. `internal_notes` fica na própria tabela — sem tabela extra.

```sql
create type vehicle_category as enum ('carros','motos','nautica');
create type vehicle_status  as enum ('rascunho','ativo','reservado','vendido');

create table public.vehicles (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  category            vehicle_category not null,
  make                text not null,
  model               text not null,
  version             text,
  title               text not null,
  year_manufacture    int  not null,
  year_model          int  not null,
  price               numeric(12,2) not null,
  previous_price      numeric(12,2),
  mileage             int,             -- carros, motos
  engine_hours        int,             -- náutica
  transmission        text,            -- carros
  fuel                text,
  engine              text,
  engine_displacement int,             -- motos (cc)
  body_type           text,            -- carros
  doors               int,             -- carros
  color               text,
  condition           text,
  description         text,
  features            jsonb not null default '[]'::jsonb,
  status              vehicle_status not null default 'rascunho',
  featured            boolean not null default false,
  cover_image         text,
  internal_notes      text,
  financing_note      text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table public.vehicle_images (
  id           uuid primary key default gen_random_uuid(),
  vehicle_id   uuid not null references public.vehicles(id) on delete cascade,
  storage_path text not null,
  sort_order   int  not null default 0,
  alt_text     text,
  created_at   timestamptz not null default now()
);

create index vehicles_public_idx on public.vehicles (status, category, created_at desc);
create index vehicle_images_order_idx on public.vehicle_images (vehicle_id, sort_order);
-- trigger updated_at em vehicles
```

### RLS — `0002_rls.sql` (mínima, sem roles)
Duas regras por tabela. Sem função `is_admin()`, sem tabela de perfis — só existe um usuário autenticado.

```sql
alter table public.vehicles       enable row level security;
alter table public.vehicle_images enable row level security;

create policy vehicles_public_read on public.vehicles
  for select to anon using (status in ('ativo','reservado'));
create policy vehicles_admin_all on public.vehicles
  for all to authenticated using (true) with check (true);

create policy vehicle_images_public_read on public.vehicle_images
  for select to anon using (exists (
    select 1 from public.vehicles v
    where v.id = vehicle_id and v.status in ('ativo','reservado')));
create policy vehicle_images_admin_all on public.vehicle_images
  for all to authenticated using (true) with check (true);
```

`data/vehicles.ts` usa lista explícita de colunas (`PUBLIC_VEHICLE_COLUMNS`) em vez de `select('*')` — custo zero e mantém `internal_notes` fora do payload público.

### Storage — `0003_storage.sql`
Bucket **público** `vehicle-images`. Leitura para todos, escrita/delete para `authenticated`. Caminho: `{vehicle_id}/{uuid}.webp`. Fotos de veículo são ativos públicos — sem arquitetura de storage privado.

### Autenticação — admin único (demo)
Supabase Auth real, sem login falso.

| | |
|---|---|
| O dono digita | usuário `admin` · senha `admin` |
| Bastidor | `admin` → `admin@armandoveiculos.local` (constante em `lib/auth.ts`) |
| Onde a senha vive | só no Supabase Auth, criada no setup — nenhuma senha em código ou `.env` |

Campo rotulado "Usuário", não "E-mail". Sem "esqueci a senha", sem 2FA, sem roles.

**Proteção:** `src/proxy.ts` (convenção do Next 16, antigo `middleware.ts`) faz refresh de sessão e redireciona `/admin/*` sem sessão para `/admin/login`; com sessão em `/admin/login`, redireciona para `/admin`. Só isso.

---

## 6. Contratos de código

### `src/types/vehicle.ts`
`database.ts` gerado por `supabase gen types`; `Vehicle` é o tipo de domínio derivado, com `images: VehicleImage[]` já resolvidas em URL pública. `internal_notes` só em `AdminVehicle`.

### `src/data/vehicles.ts` — única porta de leitura
Nenhum componente chama Supabase direto.
```
getVehicles(filters, pagination) → { items, total }
getVehicleBySlug(slug)           → Vehicle | null
getFeaturedVehicles(limit)       → Vehicle[]
getRelatedVehicles(vehicle, n)   → Vehicle[]   // mesma categoria, faixa de preço
getInventoryFacets()             → { makes, models, years, priceRange }
getInventoryStats()              → contagens do dashboard
```
Leitura sem cache agressivo — mudança no admin aparece no site na hora. Usar `revalidatePath('/')` e `revalidatePath('/estoque')` nas server actions.

### `src/lib/whatsapp.ts` — todo lead passa aqui
```
buildWhatsAppUrl(phone, message)
messages.vehicleInterest(vehicle, url)
messages.financing(form, vehicle?)
messages.tradeIn(form, vehicle?)
messages.generalContact(form)
```
Nenhum `wa.me` escrito à mão em componente.

### `src/lib/format.ts`
`formatBRL` (Intl pt-BR/BRL, sem centavos), `formatMileage` (`12.500 km`), `formatYearPair` (`2025/2026`), `formatEngineHours`.

### `src/schemas/vehicle.ts`
- `vehicleDraftSchema` — quase tudo opcional, só `category` obrigatório
- `vehiclePublishSchema` — exige `category, make, model, title, year_manufacture, year_model, price, slug único, ≥1 imagem`

"Salvar rascunho" valida o primeiro; "Publicar" o segundo.

### Comportamento de UI não-negociável
- `SpecGrid` filtra null/undefined/'' — spec vazia **não renderiza label**
- Campos por categoria: carros (km, câmbio, combustível, motor, carroceria, portas) · motos (km, cilindrada, combustível, motor) · náutica (horas de motor, motor, ano). Nunca forçar campo de carro em barco
- CTA do card é **"Ver detalhes"**, nunca "COMPRAR"
- Sem `overflow-x` de 360px a 1920px

---

## 7. Ordem de build

### Fase 0 — Fundação
1. `git init` + `.gitignore` (`.env*.local`, `.next`, `node_modules`)
2. `create-next-app` com as flags do §1, instalar deps
3. Criar projeto Supabase novo `armando-veiculos` (sa-east-1). **Não tocar em `fvgbbixxcapltudonxqx`**
4. Rodar as 4 migrations; gerar `types/database.ts`
5. Criar o usuário admin no Supabase Auth (`admin@armandoveiculos.local` / `admin`, e-mail já confirmado)
6. `globals.css` com `@theme` (§2), fontes no layout, `config/business.ts`, `lib/` inteiro, `components/ui/`
7. `.env.example` + README de setup

**Gate:** `pnpm build` verde, página em branco renderiza com header/footer da marca.

### Fase 1 — Homepage + Estoque (prompt 01)
Header/Footer → VehicleCard → SearchFilters (URL params) → `/estoque` → seções da home na ordem do prompt. Dados do seed real.
**Gate:** home + `/estoque` filtram de verdade, cards linkam para slug existente, mobile 360px sem overflow.

### Fase 2 — Detalhe do veículo (prompt 02)
Gallery + Lightbox → SummaryPanel → SpecGrid → módulos de lead (WhatsApp) → RelatedVehicles → StickyMobileCta → `generateMetadata` + JSON-LD só com dados reais.
**Gate:** slug inválido → `notFound()`; OG image = cover; mensagem de WhatsApp com título e URL corretos.

### Fase 3 — Admin (prompt 03)
Ordem de implementação = ordem de prioridade:
`proxy.ts` (já feito na Fase 0) → `/admin/login` → dashboard → `VehicleTable` → `VehicleForm` (draft/publish) → `ImageManager` (upload múltiplo, dnd-kit para reordenar, definir capa, deletar) → ações de status (publicar/despublicar, reservado, vendido, deletar com confirmação) → botão "Ver no site".
Compressão para WebP no cliente antes do upload.
**Gate:** §9.

### Fase 4 — Deploy demo
Vercel via MCP, env vars, URL para mandar ao dono.

---

## 8. `CLAUDE.md` do projeto (criar na Fase 0)

Guardrails que o executor lê a cada sessão:
- Fatos verificados do negócio (endereço, telefones, CNPJ) + o que é **proibido inventar**: anos de mercado, avaliações, taxas de financiamento, garantias, horário de funcionamento, specs de veículo
- Paleta e fontes travadas; proibições visuais do §2
- Todo dado de contato sai de `config/business.ts`
- Query pública usa lista de colunas, não `select('*')`
- Arquivo > 400 linhas → dividir
- **Projeto é demo.** `admin`/`admin` é intencional. Não adicionar recuperação de senha, 2FA, rate limit, roles ou audit log — ver §10

---

## 9. Verificação

**Automático, em cada gate:** `pnpm lint` · `pnpm exec tsc --noEmit` · `pnpm build`

**Manual, via Playwright MCP** (screenshots em 360 / 768 / 1440):
1. Home carrega; filtro por categoria muda resultados
2. Card → detalhe correto; slug inválido → 404
3. `/admin` sem sessão → `/admin/login`
4. `admin`/`admin` entra no dashboard
5. Criar veículo → subir 3 fotos → reordenar → definir capa → publicar → aparece em `/estoque`
6. Marcar como vendido → some da listagem pública
7. Sem overflow horizontal e contraste legível nas 3 páginas públicas

Sem suíte de testes automatizada nesta fase — é demo, e o custo de manutenção não se paga antes da aprovação do dono.

---

## 10. Não implementar agora

Fora de escopo até o dono aprovar o projeto:

RLS avançada · múltiplos papéis de admin · 2FA · rate limiting · recuperação de senha · storage privado · audit logs · testes de segurança · monitoring · analytics · e-mail transacional · permissões complexas.

Se algum desses parecer necessário durante a execução: **não implementar, anotar e seguir.**

---

## 11. Pendências do dono (bloqueiam publicação, não a demo)

1. **WhatsApp comercial** de vendas
2. **URL do Google Maps** da loja
3. Fotos reais do estoque e da fachada (seed usa placeholder)
4. Horário de funcionamento (omitido enquanto não vier)
5. Redes sociais reais (seção some se não houver)
6. Se aprovar o projeto: trocar a senha do admin antes de virar site oficial
