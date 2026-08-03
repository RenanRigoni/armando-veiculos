export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Estoque", href: "/estoque" },
  { label: "Carros", href: "/estoque?categoria=carros" },
  { label: "Motos", href: "/estoque?categoria=motos" },
  { label: "Náutica", href: "/estoque?categoria=nautica" },
  { label: "Venda seu veículo", href: "/#vender" },
  { label: "Consignação", href: "/#servicos" },
  { label: "Financiamento", href: "/#servicos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export const categoryNav: NavLink[] = [
  { label: "Carros", href: "/estoque?categoria=carros" },
  { label: "Motos", href: "/estoque?categoria=motos" },
  { label: "Náutica", href: "/estoque?categoria=nautica" },
];

export const adminNav: NavLink[] = [
  { label: "Painel", href: "/admin" },
  { label: "Veículos", href: "/admin/veiculos" },
];
