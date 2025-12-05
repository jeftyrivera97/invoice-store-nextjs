"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Shuffle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProducto } from "@/app/actions/productos";

interface ProductoFormProps {
  categorias: any[];
  impuestos: any[];
  proveedores: any[];
  usuario: {
    id: string;
  };
}

export const ProductoForm = ({ categorias, impuestos, proveedores, usuario }: ProductoFormProps) => {
  const [formData, setFormData] = useState({
    descripcion: "",
    id_categoria: "",
    marca: "",
    id_proveedor: "",
    size: "",
    id_impuesto: "",
    peso: "",
    stock: "",
    precio_compra: "",
    precio_venta: "",
    codigo_producto: "",
    usuario: typeof usuario.id === 'string' ? parseInt(usuario.id, 10) : usuario.id || 1,
  });


  const generateProductCode = () => {
    const getInitials = (text: string) => {
      if (!text) return "";
      // Remover espacios y tomar solo las primeras 2 letras
      return text.replace(/\s/g, '').substring(0, 2).toUpperCase();
    };

    // Obtener iniciales de descripción
    const descripcionInitials = getInitials(formData.descripcion);

    // Obtener iniciales de categoría (buscar el texto de la categoría seleccionada)
    const selectedCategoria = categorias.find(cat => cat.id.toString() === formData.id_categoria);
    const categoriaInitials = getInitials(selectedCategoria?.descripcion || "");

    // Obtener iniciales de marca
    const marcaInitials = getInitials(formData.marca);

    // Obtener iniciales de proveedor (buscar el texto del proveedor seleccionado)
    const selectedProveedor = proveedores.find(prov => prov.id.toString() === formData.id_proveedor);
    const proveedorInitials = getInitials(selectedProveedor?.descripcion || "");

    // Generar números aleatorios entre 100 y 9999
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);

    // Crear el código final
    const codigo = `${descripcionInitials}${categoriaInitials}${marcaInitials}${randomNumbers}`;

    setFormData(prev => ({
      ...prev,
      codigo_producto: codigo
    }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form action={createProducto}>
      {/* Hidden inputs para mantener los valores de los selects */}
      <input type="hidden" name="id_categoria" value={formData.id_categoria} />
      <input type="hidden" name="id_proveedor" value={formData.id_proveedor} />
      <input type="hidden" name="id_impuesto" value={formData.id_impuesto} />
      <input type="hidden" name="usuario" value={formData.usuario} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="descripcion">Descripción</Label>
          <Input
            id="descripcion"
            name="descripcion"
            type="text"
            placeholder="Descripción del producto"
            value={formData.descripcion}
            onChange={(e) => handleInputChange("descripcion", e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="categoria">*Categoria</Label>
          <Select 
            name="id_categoria" 
            value={formData.id_categoria}
            onValueChange={(value) => handleInputChange("id_categoria", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorías</SelectLabel>
                {categorias.map((categoria: any) => (
                  <SelectItem
                    key={categoria.id.toString()}
                    value={categoria.id.toString()}
                  >
                    {categoria.descripcion}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="marca">Marca</Label>
          <Input
            id="marca"
            name="marca"
            type="text"
            placeholder="Marca del producto"
            value={formData.marca}
            onChange={(e) => handleInputChange("marca", e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="id_proveedor">*Proveedor</Label>
          <Select 
            name="id_proveedor" 
            value={formData.id_proveedor}
            onValueChange={(value) => handleInputChange("id_proveedor", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un proveedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Proveedores</SelectLabel>
                {proveedores.map((proveedor: any) => (
                  <SelectItem
                    key={proveedor.id.toString()}
                    value={proveedor.id.toString()}
                  >
                  {proveedor.descripcion}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="size">Tamaño</Label>
          <Input
            id="size"
            name="size"
            type="text"
            placeholder="Tamaño del producto"
            value={formData.size}
            onChange={(e) => handleInputChange("size", e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="id_impuesto">*Impuesto</Label>
          <Select 
            name="id_impuesto" 
            value={formData.id_impuesto}
            onValueChange={(value) => handleInputChange("id_impuesto", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un impuesto" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Impuestos</SelectLabel>
                {impuestos.map((impuesto: any) => (
                  <SelectItem
                    key={impuesto.id.toString()}
                    value={impuesto.id.toString()}
                  >
                    {impuesto.descripcion}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="peso">Peso</Label>
          <Input
            id="peso"
            name="peso"
            type="number"
            placeholder="Peso del producto"
            value={formData.peso}
            onChange={(e) => handleInputChange("peso", e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            placeholder="Stock del producto"
            value={formData.stock}
            onChange={(e) => handleInputChange("stock", e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="precio_compra">Precio de Compra</Label>
          <Input
            id="precio_compra"
            name="precio_compra"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.precio_compra}
            onChange={(e) => handleInputChange("precio_compra", e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="precio_venta">Precio de Venta</Label>
          <Input
            id="precio_venta"
            name="precio_venta"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.precio_venta}
            onChange={(e) => handleInputChange("precio_venta", e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="codigo_producto">Código Producto</Label>
          <div className="flex gap-2">
            <Input
              id="codigo_producto"
              name="codigo_producto"
              type="text"
              placeholder="Código generado automáticamente"
              value={formData.codigo_producto}
              onChange={(e) => handleInputChange("codigo_producto", e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              onClick={generateProductCode}
              className="px-3"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-6">
        <Button type="submit" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Guardar Producto
        </Button>
      </div>
    </form>
  );
};
