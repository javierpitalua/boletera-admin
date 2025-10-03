import { Calendar, LayoutDashboard, MapPin, Package, ShoppingCart, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AdminSidebarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function AdminSidebar({ currentPage = "dashboard", onNavigate }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "events", icon: Calendar, label: "Eventos" },
    { id: "venues", icon: MapPin, label: "Venues" },
    { id: "products", icon: Package, label: "Productos" },
    { id: "orders", icon: ShoppingCart, label: "Órdenes" },
    { id: "settings", icon: Settings, label: "Configuración" },
  ];

  return (
    <aside
      className={`bg-sidebar border-r transition-all ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      data-testid="sidebar-admin"
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h1 className="text-lg font-bold font-serif text-sidebar-primary" data-testid="text-admin-logo">
            EventTicket Admin
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          data-testid="button-toggle-sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${isCollapsed ? "px-2" : ""}`}
              onClick={() => onNavigate?.(item.id)}
              data-testid={`button-nav-${item.id}`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
