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

export const ComprobantePopOverClienteSection = () => {
  const { clienteSelected, cliente } = useInvoiceStore(); // Asumiendo que tienes selectedClienteId en el store
  
  const { startLoading: startClienteLoading, data: clientes } = useClienteStore();

  useEffect(() => {
    startClienteLoading();
  }, []);

  // Función para manejar el cambio de cliente
  const handleClienteChange = (clienteId: string) => {
    // Encontrar el cliente completo basado en el ID
    const cliente = clientes.find(c => c.id === clienteId);
    if (cliente) {
      clienteSelected(cliente); // O pasa el objeto completo si tu store lo necesita
    }
  };

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <Label htmlFor="cliente">*Cliente</Label>
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
    </div>
  );
};
