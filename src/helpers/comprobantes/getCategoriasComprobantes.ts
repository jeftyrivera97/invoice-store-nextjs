export default async function getCategoriasComprobantes() {
  const response = await fetch("/api/categorias-comprobantes");
  const { data } = await response.json();

  return data;
}
