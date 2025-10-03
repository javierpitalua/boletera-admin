import { DollarSign, Ticket, Calendar, TrendingUp } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { StatsCard } from "@/components/StatsCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// todo: remove mock functionality
const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: "María García",
    event: "Festival de Rock 2024",
    amount: 5850,
    status: "completed",
  },
  {
    id: "ORD-2024-002",
    customer: "Carlos Rodríguez",
    event: "Noche de Teatro Musical",
    amount: 1300,
    status: "pending",
  },
  {
    id: "ORD-2024-003",
    customer: "Ana López",
    event: "Jazz Night",
    amount: 1000,
    status: "completed",
  },
];

export default function AdminDashboard() {
  const stats = [
    {
      title: "Ingresos Totales",
      value: "$125,430",
      icon: DollarSign,
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: "Boletos Vendidos",
      value: "1,248",
      icon: Ticket,
      trend: { value: 8.2, isPositive: true },
    },
    {
      title: "Eventos Activos",
      value: "24",
      icon: Calendar,
      trend: { value: 4, isPositive: true },
    },
    {
      title: "Tasa de Conversión",
      value: "68%",
      icon: TrendingUp,
      trend: { value: 3.1, isPositive: true },
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar currentPage="dashboard" onNavigate={(page) => console.log("Navigate:", page)} />

      <div className="flex-1 overflow-auto">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div>
              <h1 className="text-2xl font-bold font-serif">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Vista general de tu plataforma
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Órdenes Recientes</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Orden</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} data-testid={`row-order-${order.id}`}>
                    <TableCell className="font-mono text-sm" data-testid={`text-order-id-${order.id}`}>
                      {order.id}
                    </TableCell>
                    <TableCell data-testid={`text-customer-${order.id}`}>{order.customer}</TableCell>
                    <TableCell data-testid={`text-event-${order.id}`}>{order.event}</TableCell>
                    <TableCell data-testid={`text-amount-${order.id}`}>${order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={order.status === "completed" ? "default" : "secondary"}
                        data-testid={`badge-status-${order.id}`}
                      >
                        {order.status === "completed" ? "Completado" : "Pendiente"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
