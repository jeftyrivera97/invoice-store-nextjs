"use client";

import { usePathname } from "next/navigation";

export const SiteHeaderTitle = () => {
  const pathname = usePathname();

  // Determinar el título basado en el pathname
  let headerTitle = "Inicio";
  if (pathname.includes("/productos")) {
    headerTitle = "Productos";
  } else if (pathname.includes("/facturas")) {
    headerTitle = "Facturas";
  } else if (pathname.includes("/cajas")) {
    headerTitle = "Cajas";
  }
  else if (pathname.includes("/folios")) {
    headerTitle = "Folios de Facturacion";
  }
  return <h1 className="text-base font-medium">{headerTitle}</h1>;
};
