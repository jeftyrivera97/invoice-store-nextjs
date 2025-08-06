export default async function getPagosCategorias() {
  const response = await fetch("/api/pagos-categorias");
  const { data } = await response.json();

  return data;
}
