"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
//import { ComprobanteCurrencySection } from "./ComprobanteCurrencySection";

export const ComprobanteTotalesSection = () => {
  const { total, totalEUR, totalUSD } = useSelector(
    (state: RootState) => state.invoice
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Totales del Comprobante</CardTitle>
        <CardDescription>Resumen de totales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {/* Columna 1 1 */}

          <div className="grid gap-2">
            <Label htmlFor="total" className="font-bold">
              TOTAL (L.)
            </Label>
            <Input
              type="number"
              id="total"
              value={total.toFixed(2)}
              readOnly
              className="font-bold text-lg"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="total" className="font-bold">
              TOTAL USD ($)
            </Label>
            <Input
              type="number"
              id="total"
              value={totalUSD.toFixed(2)}
              readOnly
              className="font-bold text-lg"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="total" className="font-bold">
              TOTAL EUR (€)
            </Label>
            <Input
              type="number"
              id="total"
              value={totalEUR.toFixed(2)}
              readOnly
              className="font-bold text-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
