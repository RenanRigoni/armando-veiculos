"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { FieldError, Input, Label } from "@/components/ui/Field";
import { signIn, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div>
        <Label htmlFor="username">Usuário</Label>
        <Input
          id="username"
          name="username"
          autoComplete="username"
          required
          aria-invalid={Boolean(state.error)}
          aria-describedby={state.error ? "login-error" : undefined}
        />
      </div>

      <div>
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className="pr-11"
            aria-invalid={Boolean(state.error)}
            aria-describedby={state.error ? "login-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="text-fg-muted hover:text-brand-text absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <FieldError id="login-error">{state.error}</FieldError>

      <Button type="submit" disabled={isPending} className="mt-2">
        {isPending ? <LoaderCircle size={18} className="animate-spin" aria-hidden /> : null}
        Entrar
      </Button>
    </form>
  );
}
