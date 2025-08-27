import {
  Home,
  Inbox,
  Search,
  LucideDollarSign,
  Info,
  DollarSign,
  ShoppingBag,
  Book,
  LogOut,
  ChevronUp,
  User2,

} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
const items = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Productos",
      url: "#",
      icon: ShoppingBag,
      isActive: true,
      items: [
        {
          title: "Administrar Productos",
          url: "/productos",
        },
  
      ],
    },
    {
      title: "Facturas",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [

        {
          title: "Nueva Factura",
          url: "/facturas/new",
        },
        
      ],
    },
    
    {
      title: "Cajas",
      url: "#",
      icon: Settings2,
       isActive: true,
      items: [
        {
          title: "Administrar Cajas",
          url: "/cajas",
        },
        {
          title: "Administrar Sesiones",
          url: "/cajas/sesiones",
        },
        
      ],
    },
     {
      title: "Folios",
      url: "#",
      icon: Settings2,
       isActive: true,
      items: [
        {
          title: "Administrar Folios",
          url: "/folios",
        },
      ],
    },
  ],
};

import { ChevronRight, type LucideIcon } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <Header />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Modulos</SidebarGroupLabel>
          <SidebarMenu>
            {items.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Footer />
    </Sidebar>
  );
}
