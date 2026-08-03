# Product

## Register

brand

`/admin/**` é exceção: register `product` (ferramenta de trabalho do dono/equipe, não
vitrine — ver Users). O resto do site segue `brand`.

## Users

**Visitantes públicos** (register `brand`): pessoas da região de Mirandópolis-SP
pesquisando carros, motos ou veículos náuticos. Chegam comparando com o catálogo atual
(mais simples) e concorrentes. Job to be done: achar um veículo específico rápido,
confiar no anúncio, converter em contato — não há checkout, a conversão é sempre um
lead de WhatsApp.

**Dono/equipe da loja** (via `/admin`, register `product`): quem cadastra e mantém o
estoque sem depender de desenvolvedor. Contexto: uso rápido e repetitivo — cadastrar
veículo, subir fotos, marcar vendido/reservado. É bastidor, não vitrine: prioriza
densidade e velocidade sobre qualquer polimento visual.

## Product Purpose

Demonstrar como um site automotivo próprio apresenta a Armando Veículos e seu estoque
com mais qualidade, confiança e clareza do que o catálogo atual. O sucesso da demo
depende de primeira impressão profissional, estoque funcional com filtro real, páginas
de veículo convincentes, e um painel administrativo simples que realmente funciona —
cadastro, fotos e mudança de status sem tocar em código.

A conversão do site inteiro é sempre a mesma: um lead de WhatsApp (venda, consignação,
financiamento ou troca). Não existe carrinho, checkout ou pagamento — todo caminho do
site público termina em uma mensagem pré-preenchida pro WhatsApp certo.

**Estado atual: demo de vendas**, não produção. O sucesso desta fase é o dono aprovar o
projeto; decisões de segurança propositalmente simplificadas (login único `admin`/
`admin`, sem 2FA, sem múltiplos papéis, sem audit log) são escopo, não descuido.

## Brand Personality

Direta, confiável e dinâmica. A marca transmite segurança comercial e energia
automotiva sem recorrer a promessas não verificadas, exagero publicitário ou efeito
visual genérico.

## Anti-references

- Sites automotivos com aparência de template genérico.
- Gradientes roxos ou azuis, glassmorphism, CTAs azuis, neon e blur pesado.
- Animação de entrada repetida em todas as seções.
- Métricas, avaliações, garantias, taxas, parcelas ou histórico inventados.
- Campos e especificações de carros aplicados a motos ou náutica.
- Bandeira quadriculada fora do logo oficial.
- "COMPRAR" como texto de CTA — o padrão do produto é sempre "Ver detalhes".

## Design Principles

1. **Estoque é a ação principal.** Toda seção da home e todo caminho secundário volta
   pra descoberta de veículo — a home vende a busca, não substitui ela.
2. **Confiança por dado real, nunca por invenção.** Informação verificável e hierarquia
   clara; campo sem dado desaparece da UI em vez de virar texto genérico.
3. **Um único canal de lead, sempre centralizado.** Toda conversão do site é uma
   mensagem de WhatsApp — nunca montada componente a componente, sempre pelo mesmo
   ponto único de construção de mensagem, pro número certo por contexto (venda,
   financiamento, troca).
4. **Admin é ferramenta de trabalho, não vitrine.** Register `product` dentro de
   `/admin/**`: velocidade e clareza acima de qualquer polimento visual.
5. **Cada categoria mostra só o que é dela.** Carro, moto e náutica têm campos próprios;
   nenhum é forçado no outro.
6. **Demo antes de produção.** Simplicidade deliberada de segurança e escopo enquanto o
   dono não aprova — não adicionar complexidade que só faria sentido pós-aprovação.

## Accessibility & Inclusion

Usar WCAG 2.2 AA como referência para contraste, foco, semântica, formulários e
navegação por teclado. Respeitar redução de movimento, manter alvos de toque adequados
e garantir ausência de overflow horizontal entre 360px e 1920px.
