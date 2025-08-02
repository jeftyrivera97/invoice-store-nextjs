"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { onLogin } from "@/store/auth/authSlice";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const { email, password } = data;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      // obtener sesión desde next-auth (cliente)
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      console.log("session:", session);

      // ahora puedes hacer dispatch con los datos del usuario
      dispatch(onLogin(session?.user));
      router.push("/");
    } else {
      setError("Credenciales incorrectas");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido</CardTitle>
          <CardDescription>Ingresa con tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Cuenta</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="***@host.site"
                    {...form.register("email")} // Registra el campo con react-hook-form
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("password")} // Registra el campo con react-hook-form
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Acceder
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Al hacer clic en continuar, aceptas nuestros <a href="#">Términos de Servicio</a>{" "}
        y <a href="#">Política de Privacidad</a>.
      </div>
    </div>
  );
}
