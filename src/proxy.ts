import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

/**
 * Convenção `proxy` do Next 16 (antigo `middleware`).
 * Renova a sessão do Supabase e protege as rotas do painel.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
