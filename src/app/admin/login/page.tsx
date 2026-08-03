import Image from "next/image";
import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/LoginForm";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Painel administrativo",
};

export default function AdminLoginPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="bg-ink flex min-h-dvh items-center justify-center px-4"
    >
      <div className="border-border bg-surface w-full max-w-sm rounded-md border p-8">
        <div className="flex justify-center">
          <Image
            src="/logo-dark.png"
            alt={business.name}
            width={200}
            height={76}
            priority
            className="h-12 w-auto"
          />
        </div>
        <h1 className="mt-6 text-center text-2xl">Painel administrativo</h1>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
