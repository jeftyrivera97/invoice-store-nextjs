export default async function getPagosCategorias() {
  const response = await fetch("/api/metodos-pagos");
  const { data } = await response.json();

  return data;
}
