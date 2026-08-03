/**
 * Autenticação do painel — modo demo.
 *
 * Existe um único administrador. O dono digita apenas "admin" no campo de
 * usuário; o e-mail interno abaixo é detalhe de implementação do Supabase Auth.
 * A senha vive somente no Supabase, nunca neste repositório.
 */

const ADMIN_EMAIL_DOMAIN = "armandoveiculos.local";

/** "admin" -> "admin@armandoveiculos.local". Já aceita e-mail completo digitado. */
export function usernameToEmail(username: string): string {
  const trimmed = username.trim().toLowerCase();
  return trimmed.includes("@") ? trimmed : `${trimmed}@${ADMIN_EMAIL_DOMAIN}`;
}
