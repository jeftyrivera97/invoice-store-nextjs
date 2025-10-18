"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { editProveedor } from "@/app/actions/proveedores";
import { ProveedorData } from "@/types/Proveedores";

interface ProveedorFormProps {
  usuario: {
    id: string;
  };
  proveedor: ProveedorData;
}

export const EditProveedorForm = ({
  usuario,
  proveedor,
}: ProveedorFormProps) => {
  const [formData, setFormData] = useState({
    codigo_proveedor: proveedor.codigo_proveedor,
    descripcion: proveedor.descripcion,
    categoria: proveedor.categoria,
    contacto: proveedor.contacto,
    telefono: proveedor.telefono,
    correo: proveedor.correo,
    usuario: usuario.id || 1,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={editProveedor}>
      {/* Hidden inputs para mantener los valores de los selects y el ID */}
      <input type="hidden" name="id" value={proveedor.id.toString()} />
      <input type="hidden" name="usuario" value={formData.usuario} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="grid gap-2">
          <Label htmlFor="codigo_proveedor">Codigo Proveedor</Label>
          <Input
            id="codigo_proveedor"
            name="codigo_proveedor"
            type="text"
            placeholder="Código del proveedor"
            value={formData.codigo_proveedor}
            onChange={(e) => handleInputChange("codigo_proveedor", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="descripcion">Descripción</Label>
          <Input
            id="descripcion"
            name="descripcion"
            type="text"
            placeholder="Descripción del proveedor"
            value={formData.descripcion}
            onChange={(e) => handleInputChange("descripcion", e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="categoria">Categoria</Label>
          <Input
            id="categoria"
            name="categoria"
            type="text"
            placeholder="Categoria del proveedor"
            value={formData.categoria}
            onChange={(e) => handleInputChange("categoria", e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contacto">Contacto</Label>
          <Input
            id="contacto"
            name="contacto"
            type="text"
            placeholder="Contacto del proveedor"
            value={formData.contacto}
            onChange={(e) => handleInputChange("contacto", e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="telefono">Telefono</Label>
          <Input
            id="telefono"
            name="telefono"
            type="text"
            placeholder="Telefono del proveedor"
            value={formData.telefono}
            onChange={(e) => handleInputChange("telefono", e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="correo">Correo</Label>
          <Input
            id="correo"
            name="correo"
            type="text"
            placeholder="Correo del proveedor"
            value={formData.correo}
            onChange={(e) => handleInputChange("correo", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Button type="submit" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Actualizar Proveedor
        </Button>
      </div>
    </form>
  );
};
