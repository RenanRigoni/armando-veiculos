# Armando Veículos

Site de estoque e painel administrativo para a Armando Veículos — Mirandópolis/SP.
Carros, motos e náutica, com compra, venda, consignação e financiamento.

> **Esta é uma versão de demonstração**, feita para o dono avaliar o site antes de
> substituir o catálogo atual. Ver a seção "Antes de publicar".

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Supabase
(banco, autenticação e imagens) · Vercel.

## Rodando localmente

```bash
pnpm install
cp .env.example .env.local   # preencher com os dados do projeto Supabase
pnpm dev
```

Abre em http://localhost:3000.

### Variáveis de ambiente

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave publicável (anon) do Supabase |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site, usada nos links de WhatsApp e no Open Graph |

Nenhuma senha ou chave secreta fica no repositório.

## Painel administrativo

Acesso em `/admin/login`.

| Campo | Valor |
|---|---|
| Usuário | `admin` |
| Senha | `admin` |

O usuário digita apenas `admin`; internamente isso vira `admin@armandoveiculos.local`
no Supabase Auth. A senha existe só no Supabase.

## Banco de dados

Migrations versionadas em `supabase/migrations/`, aplicadas em ordem:

| Arquivo | Conteúdo |
|---|---|
| `0001_schema.sql` | tabelas `vehicles` e `vehicle_images`, índices e trigger de `updated_at` |
| `0002_rls.sql` | RLS: anônimo lê ativos/reservados, autenticado gerencia tudo |
| `0003_storage.sql` | bucket público `vehicle-images` e políticas |
| `0004_seed.sql` | 8 veículos de demonstração (marcados em `internal_notes`) |

Para regerar os tipos TypeScript do banco:

```bash
supabase gen types typescript --project-id <PROJECT_ID> > src/types/database.ts
```

## Estrutura

```
src/
  app/          rotas (público + /admin)
  components/   layout · home · inventory · vehicle · forms · admin · ui
  config/       business.ts (dados do negócio) · navigation.ts
  data/         acesso ao estoque — nenhum componente fala com o Supabase direto
  lib/          supabase/ · format · slug · whatsapp · images · auth · utils
  schemas/      validação zod dos formulários
  types/        tipos de domínio e do banco
```

Detalhes de arquitetura, decisões e ordem de build: [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md).
Regras para quem for programar (humano ou agente): [`AGENTS.md`](AGENTS.md).

## Dados do negócio

Endereço, telefones e CNPJ ficam **só** em `src/config/business.ts`. Nada de contato
escrito direto em componente.

Pendências que dependem do dono:

- [ ] WhatsApp comercial de vendas (hoje os CTAs caem no contato de financiamento)
- [ ] URL de embed do Google Maps da loja
- [ ] Fotos reais do estoque e da fachada
- [ ] Horário de funcionamento
- [ ] Redes sociais

Enquanto não chegam, essas informações ficam `null` no config e as seções
correspondentes simplesmente não são exibidas. Nenhum dado é inventado.

## Antes de publicar como site oficial

- [ ] Trocar a senha do admin por uma forte (só isso já resolve o ponto principal)
- [ ] Migrar o admin para um e-mail real e habilitar recuperação de senha
- [ ] Substituir o estoque de demonstração pelo estoque real
- [ ] Preencher as pendências da seção acima
