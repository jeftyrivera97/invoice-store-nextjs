import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ComprobanteClienteSection } from "./ComprobanteClienteSection";
import { ComprobanteFormSubmitSection } from "./ComprobanteFormSubmitSection";
import { ComprobantePagoSection } from "./ComprobantePagoSection";

export const ComprobanteCardPagosComponent = () => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Datos de Pago</CardTitle>
        <CardDescription>Informacion</CardDescription>
        <CardAction>
          {/* Boton Submit */}
          <ComprobanteFormSubmitSection />
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-1 gap-2">
            {/* Columna 1 */}

            <div className="grid grid-cols-3 items-center gap-2">
              {/* Total a Pagar */}
            
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              {/* Selección de Cliente */}
              <ComprobanteClienteSection />
            </div>

            {/* Secciones de Pago */}
            <ComprobantePagoSection />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
