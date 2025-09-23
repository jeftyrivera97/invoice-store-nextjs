import { ShowSesionComponent } from "@/components";

interface ShowComprobanteProps {
  params: Promise<{ id: string }>;
}
export default async function ShowSesionPage({ params }: ShowComprobanteProps) {
  const resolvedParams = await params;
  return (
    <>
      <ShowSesionComponent params={resolvedParams} />
    </>
  );
}
