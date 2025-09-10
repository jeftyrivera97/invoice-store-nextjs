import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { 
  FileText, 
  Package, 
  Users, 
  Plus, 
  Calendar
} from "lucide-react";
import Link from "next/link";






export const HomePageComponent = async () => {

     const comprobantes = await prisma.comprobantes.findMany({
        where: {
            fecha: {
                gte: new Date(new Date().setHours(0, 0, 0, 0)), // Desde el inicio del día
                lte: new Date(new Date().setHours(23, 59, 59, 999)) // Hasta el final del día
            }
        }
     });

     const productos = await prisma.productos.count();
     const clientes = await prisma.clientes.count();

  return (
     <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido al sistema de facturación
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/comprobantes/new">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Comprobante
            </Link>
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
     
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Comprobantes Emitidos
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{comprobantes.length}</div>
           
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Productos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productos}</div>
           
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes Activos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientes}</div>
            
          </CardContent>
        </Card>
      </div>

      {/* Accesos rápidos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/comprobantes/new">
                <Plus className="h-4 w-4 mr-2" />
                Crear Nuevo Comprobante
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/productos/new">
                <Package className="h-4 w-4 mr-2" />
                Agregar Producto
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/clientes">
                <Users className="h-4 w-4 mr-2" />
                Gestionar Clientes
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/comprobantes">
                <FileText className="h-4 w-4 mr-2" />
                Ver Todos los comprobantes
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
