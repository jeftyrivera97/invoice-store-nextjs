import Link from 'next/link'
 
export default function NotFound() {
  return (

     <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
      <p className="mt-4 text-lg text-muted-foreground">La ruta ingresada no existe.</p>
      <Link href="/">Regresar a Inicio</Link>
    </div>
    
  )
}