---
name: Armando Veículos
description: Loja automotiva (carros, motos, náutica) — estoque, venda, consignação e financiamento
colors:
  ink: "#050506"
  surface: "#0E0F11"
  surface-2: "#17191C"
  border: "#26292E"
  brand: "#E11E25"
  brand-bright: "#ED1C24"
  brand-dark: "#B3141A"
  fg: "#FFFFFF"
  fg-muted: "#A1A6AD"
  success: "#22A06B"
  warning: "#D98A0B"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontWeight: 400
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  section-y: "4rem"
  section-y-lg: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.fg}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.brand-bright}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
  input:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.fg}"
    rounded: "{rounded.sm}"
    height: "2.75rem"
    padding: "0 0.75rem"
---

# Design System: Armando Veículos

## 1. Overview

**Creative North Star: "A Concessionária de Garagem Fechada à Noite"**

Preto quase absoluto, uma única linha vermelha de pista cortando o silêncio — como o
letreiro de uma loja de carros vista de longe, à noite, com o logo iluminado e o resto do
prédio apagado. O sistema é restrito de propósito: uma cor de acento, dois pesos
tipográficos, superfícies que se diferenciam por camadas de cinza-quase-preto, não por
sombra. Vermelho aparece pouco e sempre com intenção — CTA principal, separador de
seção, estado ativo — nunca decoração de fundo.

O sistema rejeita explicitamente qualquer coisa que pareça "gerada": gradiente
roxo/azul, glassmorphism, neon, blur pesado em header, animação de entrada em toda
seção. Rejeita também o clichê automotivo oposto — bandeira quadriculada espalhada pela
UI (ela mora só dentro do logo) e CTA "COMPRAR" gritado em botão chamativo.

**Key Characteristics:**
- Fundo quase preto (`#050506`) com duas camadas de superfície acima dele, nunca sombra
- Um único acento vermelho (`#E11E25`), usado com moderação deliberada
- Títulos em Barlow Condensed maiúsculo — peso de painel de carro, não de blog
- Corpo de texto em Inter, neutro, legível, sem personalidade própria
- Bordas finas (`1px`, `#26292E`) fazem o trabalho que sombra faria em outro sistema

## 2. Colors

Paleta restrita: um preto de base, duas superfícies elevadas por tom (não por sombra), um
vermelho de acento com três variações de estado, e dois semânticos (sucesso/atenção).

### Primary
- **Vermelho de Pista** (`#E11E25`): CTA primário, separador de seção (`.brand-rule`),
  underline de navegação ativa, ícones de destaque. Nunca em área grande de fundo.
- **Vermelho Aceso** (`#ED1C24`): hover/foco do vermelho de pista.
- **Vermelho Escuro** (`#B3141A`): estado pressed/active.

### Neutral
- **Preto Quase Absoluto** (`#050506`): fundo principal (`ink`) — hero, seções de
  destaque, rodapé de página.
- **Grafite de Superfície** (`#0E0F11`): cards, header, seções alternadas (`surface`).
- **Grafite Elevado** (`#17191C`): inputs, superfícies acima de `surface` (`surface-2`).
- **Linha Divisória** (`#26292E`): toda borda de card, input, separador de tabela —
  é o que substitui sombra neste sistema.
- **Branco** (`#FFFFFF`): texto principal.
- **Cinza-Azulado Apagado** (`#A1A6AD`): texto secundário, legendas, labels.

### Named Rules
**The One Red Rule.** O vermelho de acento nunca cobre mais do que um elemento pequeno
por vez — botão, ícone, linha de 3px, badge. Se parece que "a tela é vermelha", errou.

## 3. Typography

**Display Font:** Barlow Condensed (com fallback `Arial Narrow, sans-serif`)
**Body Font:** Inter (com fallback `system-ui, sans-serif`)

**Character:** Condensada e maiúscula nos títulos — cadência de painel automotivo, ecoa
o lettering do logo sem imitá-lo. Inter no corpo garante que a leitura de specs, preço e
descrição fique neutra e não compita com o título.

### Hierarchy
- **Display / Headings** (700, `text-3xl` a `text-7xl` conforme o elemento, `leading-none`
  a `leading-[0.95]`, `uppercase`, `tracking-tight`): H1 do hero, títulos de seção,
  título do veículo.
- **Body** (400–600, `text-sm` a `text-lg`, `leading-normal`): parágrafos, specs, labels
  de formulário. Sem `uppercase`.
- **Label / Badge** (`text-xs`, `tracking-wider`, `uppercase`): badges de status,
  categoria, breadcrumb final.

### Named Rules
**The No-Imitation Rule.** Barlow Condensed uppercase é só pra título e navegação — texto
corrido nunca usa a fonte de display, mesmo quando curto.

## 4. Elevation

Sistema **flat com camadas tonais**, sem `box-shadow` em lugar nenhum do código. Depth
vem da progressão `ink` → `surface` → `surface-2` (cada camada um tom mais claro de
cinza-quase-preto) combinada com bordas de 1px em `#26292E`. Não existe sombra de
elevação, glow ou blur decorativo.

### Named Rules
**The Border-Over-Shadow Rule.** Se um elemento precisa se separar do fundo, ganha
`border border-border`, não `box-shadow`. Nenhuma exceção nas seções construídas até
aqui.

## 5. Components

### Buttons
- **Shape:** `rounded-sm` (4px) em tamanho `sm`, `rounded-md` (8px) em `md`/`lg`.
- **Primary:** fundo `brand` (#E11E25), texto branco, fonte display uppercase,
  `tracking-wide`. Alturas por tamanho: 36px (`sm`), 44px (`md`), 52px (`lg`).
- **Hover / Active:** `brand` → `brand-bright` no hover, → `brand-dark` no active/pressed.
  Transição de 150ms.
- **Secondary:** borda `border-border`, fundo transparente, texto branco; hover troca
  borda e texto pra `brand`.
- **Ghost:** sem borda, texto `fg-muted`, hover vai pra `fg`.
- **Danger:** borda `brand/50`, texto `brand`; hover preenche com `brand` e texto branco.

### Badges
- **Style:** `rounded-sm`, borda 1px, texto uppercase `text-xs tracking-wider`.
- **Tones:** `neutral` (border/surface-2), `brand` (fundo vermelho sólido), `success`
  (verde translúcido 15%), `warning` (âmbar translúcido 15%), `muted` (sem fundo).

### Cards / Containers
- **Corner Style:** `rounded-md` (8px).
- **Background:** `surface` sobre fundo `ink`, ou `ink` sobre fundo `surface` — sempre
  alternando um tom em relação ao pai.
- **Shadow Strategy:** nenhuma — ver Elevation.
- **Border:** `1px solid border-border` sempre presente nos cards de veículo e formulário.

### Inputs / Fields
- **Style:** fundo `surface-2`, borda `border-border`, `rounded-sm`, altura 44px.
- **Focus:** borda muda pra `brand`, sem glow ou ring.
- **Label:** `text-fg-muted`, `text-sm`, acima do campo.

### Navigation
- **Style:** header `sticky`, fundo `ink/95` (quase opaco, sem blur pesado), borda
  inferior 1px. Links em fonte display uppercase; nav ativo ganha underline vermelho
  (`.brand-rule` invertido) em vez de mudar de cor sozinho.
- **Mobile:** menu fullscreen `ink` sólido, sem transparência, itens em `text-2xl`
  uppercase.

### Brand Rule (assinatura visual)
Linha vermelha curta (`2.5rem × 3px`) acima de todo título de seção — implementada como
`::before` da classe `.brand-rule`. É a única assinatura decorativa permitida no sistema;
substitui qualquer ícone ou ilustração de abertura de seção.

## 6. Do's and Don'ts

### Do:
- **Do** usar `border border-border` pra separar qualquer superfície — é o substituto
  oficial de sombra neste sistema.
- **Do** manter o vermelho de acento (`#E11E25`) restrito a CTA, separador de 3px,
  underline ativo e badge — nunca fundo de seção inteira.
- **Do** manter títulos em Barlow Condensed uppercase e corpo em Inter normal — nunca
  trocar os dois papéis.
- **Do** usar bandeira quadriculada exclusivamente dentro do logo oficial.
- **Do** omitir o rótulo de qualquer spec vazia — nunca renderizar "Câmbio: —".

### Don't:
- **Don't** usar gradiente roxo ou azul, glassmorphism, CTA azul ou neon — proibido pelo
  PRODUCT.md e reforçado aqui.
- **Don't** aplicar blur pesado no header — o header usa `ink/95` sólido, não
  `backdrop-blur`.
- **Don't** animar entrada de seção em scroll — motion aqui é só transição de estado
  (hover, foco), nunca coreografia.
- **Don't** usar "COMPRAR" como texto de CTA — o padrão do projeto é "Ver detalhes".
- **Don't** forçar campo de carro (portas, carroceria) em moto ou embarcação — cada
  categoria só mostra suas specs.
