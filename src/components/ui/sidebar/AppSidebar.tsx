import { Calendar, Home, Inbox, Search, LucideDollarSign, Info, DollarSign, ShoppingBag, Book } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Productos",
    url: "productos",
    icon: ShoppingBag,
  },
  {
    title: "Facturacion",
    url: "facturacion",
    icon: DollarSign,
  },
  {
    title: "Comprobantes",
    url: "comprobantes",
    icon: Book,
  },
  {
    title: "Caja",
    url: "caja",
    icon: Info,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}