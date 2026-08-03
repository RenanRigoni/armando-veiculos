<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Armando Veículos — regras do projeto

Site de estoque + painel administrativo para a Armando Veículos (Mirandópolis-SP).
Blueprint completo da estrutura: `docs/BLUEPRINT.md`. Prompts originais das fases: `prompts/`.

## Estado: DEMO

Esta entrega é uma **demonstração de vendas** para o dono avaliar o site. Não é produção.

O login é `admin` / `admin` **de propósito**. Não adicionar recuperação de senha, 2FA,
rate limit, papéis de admin, audit log, RLS avançada, storage privado, analytics ou
e-mail transacional. Se algo assim parecer necessário, **anotar e seguir** — entra só
depois que o dono aprovar o projeto.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 (`@theme` em
`src/app/globals.css`, sem `tailwind.config.js`) · Supabase (banco, auth, storage) ·
lucide-react · react-hook-form + zod · @dnd-kit · sonner · pnpm.

Não instalar: framer-motion, shadcn/ui, react-query, zustand, vitest, playwright.

## Fatos verificados do negócio

Todos vivem em `src/config/business.ts`. **Nunca escrever contato direto em componente.**

- Endereço: Avenida São Paulo, 233, Centro, Mirandópolis - SP, 16800-025
- Telefone: (18) 3701-5015
- Financiamento: Bruna — (18) 99117-6409
- CNPJ: 34.942.422/0001-26

### Proibido inventar

Anos de mercado, número de clientes, avaliações, prêmios, taxas ou parcelas de
financiamento, garantias, horário de funcionamento, redes sociais e especificações de
veículo que não estejam nos dados. Dado desconhecido vira `null` no config e a UI
**omite a seção**, não preenche com invenção.

Pendências do dono ainda em aberto: WhatsApp comercial de vendas e URL do Google Maps.
Enquanto não chegarem, `salesWhatsapp()` cai no contato de financiamento.

## Design system

Cores amostradas do logo oficial. Tokens em `globals.css`, nunca hex solto em componente.

| Token | Hex |
|---|---|
| `--color-ink` | `#050506` |
| `--color-surface` | `#0E0F11` |
| `--color-surface-2` | `#17191C` |
| `--color-border` | `#26292E` |
| `--color-brand` | `#E11E25` |
| `--color-brand-bright` | `#ED1C24` |
| `--color-brand-dark` | `#B3141A` |
| `--color-fg-muted` | `#A1A6AD` |

Fontes: Barlow Condensed (títulos, uppercase) + Inter (corpo). Logo: `public/logo-dark.png`
no fundo escuro, `logo-light.png` no claro. Não redesenhar nem recolorir o logo.

**Proibido** — deixa o site com cara de template genérico: gradiente roxo/azul,
glassmorphism, CTA azul, neon, blur pesado no header, animação de entrada em toda seção.

Detalhe de marca permitido: linha vermelha fina como separador (classe `.brand-rule`) e
underline de nav ativo. Bandeira quadriculada só dentro do logo.

## Regras de código

- **Nenhum componente fala com o Supabase direto.** Leitura pública passa por
  `src/data/vehicles.ts`; mutações do admin por `src/data/vehicles.admin.ts`.
- **Query pública usa lista de colunas, nunca `select("*")`** — é o que mantém
  `internal_notes` fora do payload do navegador. A constante já existe:
  `PUBLIC_VEHICLE_COLUMNS`.
- Todo lead sai por `src/lib/whatsapp.ts`. Nenhum `wa.me` montado à mão.
- Estado de filtro mora na URL (`searchParams`), não em client state.
- Server Component é o padrão; `"use client"` só quando há estado, efeito ou evento.
- Spec vazia não renderiza rótulo — o `SpecGrid` filtra `null`/`undefined`/`""`.
- Campo por categoria: carros (km, câmbio, combustível, motor, carroceria, portas),
  motos (km, cilindrada, combustível, motor), náutica (horas de motor, motor, ano).
  Nunca forçar campo de carro em barco.
- CTA do card é **"Ver detalhes"**, nunca "COMPRAR".
- Sem overflow horizontal de 360px a 1920px.
- Arquivo acima de 400 linhas: dividir.
- Moeda sempre `formatBRL` (pt-BR/BRL, sem centavos).

## Comandos

```bash
pnpm dev                  # servidor local
pnpm build                # gate de cada fase
pnpm lint
pnpm exec tsc --noEmit
```

## Supabase

Projeto `armando-veiculos` (`ligvbumkikhugttxihbo`, sa-east-1) — **exclusivo deste site**.
Migrations versionadas em `supabase/migrations/`. Bucket público: `vehicle-images`.

⚠️ Existe outro projeto Supabase na mesma conta com dados clínicos de pacientes.
Nunca apontar este site para ele.
