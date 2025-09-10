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
  const { startLoading: startClienteLoading, data: clientes } = useClienteStore();

  useEffect(() => {
    startClienteLoading();
  }, []);

  // Función para manejar el cambio de cliente
  const handleClienteChange = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
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
        <Button 
          type="button" 
          variant="outline" 
          size="icon"
          onClick={handleRefreshClientes}
        >
          <RefreshCcw />
        </Button>
      </div>
      <Select 
        value={cliente?.id || ""} 
        onValueChange={handleClienteChange}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccione un cliente" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Clientes</SelectLabel>
            {clientes.map((cliente) => (
              <SelectItem key={cliente.id} value={cliente.id}>
                {cliente.descripcion} - {cliente.codigo_cliente}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
