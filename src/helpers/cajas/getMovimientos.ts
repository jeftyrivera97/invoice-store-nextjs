

export default async function getMovimientos() {
  const response = await fetch("/api/cajas/movimientos");
  const { data } = await response.json();

  return data;
}