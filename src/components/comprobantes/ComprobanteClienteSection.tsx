"use client";

import { Label } from "@/components/ui/label";
import { useClienteStore } from "@/hooks";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInvoiceStore } from "@/hooks/store/useInvoiceStore";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export const ComprobanteClienteSection = () => {
  const { clienteSelected, cliente } = useInvoiceStore();
  const { startLoading: startClienteLoading, data: clientes } =
    useClienteStore();

  useEffect(() => {
    startClienteLoading();
  }, []);

  // Seleccionar cliente con id="1" por defecto cuando se carguen los clientes
  useEffect(() => {
    if (clientes.length > 0 && !cliente?.id) {
      const clienteDefault = clientes.find((c) => c.id === "1");
      if (clienteDefault) {
        clienteSelected(clienteDefault);
      }
    }
  }, [clientes, cliente, clienteSelected]);

  // Función para manejar el cambio de cliente
  const handleClienteChange = (clienteId: string) => {
    const cliente = clientes.find((c) => c.id === clienteId);
    if (cliente) {
      clienteSelected(cliente);
    }
  };

  // Función para recargar clientes (llama directamente a startClienteLoading)
  const handleRefreshClientes = () => {
    startClienteLoading(); // Llama directamente la función
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="cliente">*Cliente</Label>
       {/* <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleRefreshClientes}
        >
          <RefreshCcw />
        </Button> */}
      </div>
      <Select
        value={cliente?.id || ""}
        onValueChange={handleClienteChange}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccione un cliente" className="truncate" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Clientes</SelectLabel>
            {clientes.map((cliente) => (
              <SelectItem 
                key={cliente.id} 
                value={cliente.id}
                className="truncate"
              >
                <span className="truncate block">
                  {cliente.razon_social} - {cliente.codigo_cliente}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
