import { AppSidebar } from "@/components";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/ui/header/SiteHeader"


import { cookies } from "next/headers"

export default async function DashboardLayout( { children }: {
  children: React.ReactNode;
}) {

   const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  
  return (
    
  <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
         <SidebarInset>
           <main>
             <SiteHeader />
             {children}
           </main>
         </SidebarInset>
    </SidebarProvider>
  );
}
