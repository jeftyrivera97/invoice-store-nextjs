"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { CurrencyData } from '../../types/Currency';


export const ComprobanteCurrencySection = () => {
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch("/api/currency");
        const result = await response.json();
        setCurrencyData(result.data);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencyData();
  }, []);

  return (
    <>

      {currencyData && (
        <div className="grid gap-2">
          <Label htmlFor="currency">Tipo de Cambio</Label>
          <Input
            type="text"
            id="currency"
            readOnly
          />
        </div>
      )}
    </>
  );
};
