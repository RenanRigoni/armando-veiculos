import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  // Painel admin não foi desenhado pro tema claro; trava escuro mesmo se o
  // visitante tiver ativado o tema claro no site público.
  return (
    <div data-theme="dark" className="contents">
      {children}
    </div>
  );
}
