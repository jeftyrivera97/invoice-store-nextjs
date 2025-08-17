import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export const NoSesionComponent = () => {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>No se puede crear una nueva factura.</AlertTitle>
        <AlertDescription>
          <p>Porfavor verifique las sesiones abiertas con este usuario.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Debe abrir una sesion con este usuario</li>
            <li>Dirigase a Cajas-Sesiones para administrar una nueva sesion</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
