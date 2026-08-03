"use client";

import { useEffect } from "react";

import { Button, ButtonLink } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="bg-ink flex min-h-dvh items-center px-4 py-16"
    >
      <div className="mx-auto w-full max-w-xl text-center">
        <p className="text-brand-text font-display text-sm tracking-widest uppercase">
          Não foi possível carregar
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Algo deu errado</h1>
        <p className="text-fg-muted mt-4">
          Tente novamente. Se o problema continuar, volte ao início e fale com a nossa equipe.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={unstable_retry}>
            Tentar novamente
          </Button>
          <ButtonLink href="/" variant="secondary">
            Voltar ao início
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
