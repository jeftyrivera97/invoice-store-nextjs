'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data)
    // Lógica real: call API, NextAuth, etc.
  }

  return (
    <Form {...form}>
        <h2 className="text-2xl font-bold text-center mb-6">Ingresar al Sistema</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField name="email" render={({ field }) => (
          <FormItem>
            <Label>ID </Label>
            <FormControl>
              <Input placeholder="***@host.site" {...field} />
            </FormControl>
          </FormItem>
        )}/>
        <FormField name="password" render={({ field }) => (
          <FormItem>
            <Label>Contraseña</Label>
            <FormControl>
              <Input type="password" placeholder="••••••••" {...field} />
            </FormControl>
          </FormItem>
        )}/>
        <Button type="submit" className="w-full">Acceder</Button>
      </form>
    </Form>
  )
}
