"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Shuffle } from "lucide-react";
import { createProveedor } from "@/app/actions/proveedores";

interface ProveedorFormProps {
  usuario: {
    id: string;
  };
}

export const ProveedorForm = ({ usuario }: ProveedorFormProps) => {
  const [formData, setFormData] = useState({
    codigo_proveedor: "",
    descripcion: "",
    categoria: "",
    contacto: "",
    telefono: "",
    correo: "",
    usuario:
      typeof usuario.id === "string"
        ? parseInt(usuario.id, 10)
        : usuario.id || 1,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={createProveedor}>
      {/* Hidden inputs para mantener los valores de los selects */}
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
            placeholder="Descripción de la categoría"
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
            placeholder="Nombre del contacto"
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
            placeholder="Número de teléfono"
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
            placeholder="Ingrese el correo electrónico"
            value={formData.correo}
            onChange={(e) => handleInputChange("correo", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Button type="submit" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Guardar Proveedor
        </Button>
      </div>
    </form>
  );
};
