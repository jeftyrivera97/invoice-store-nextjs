import { AppSidebar } from "@/components";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/ui/header/SiteHeader";
import { cookies } from "next/headers";
import AuthStatus from "@/components/auth/AuthStatus";
import SessionWrapper from "@/components/providers/SessionWrapper"; 

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SessionWrapper> {/* 👈 agrega este wrapper aquí */}
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AuthStatus />
        <AppSidebar variant="inset" />
        <SidebarInset>
          <main>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-4">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </SessionWrapper>
  );
}
