import { TrendingUp, DollarSign, Ticket, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

function StatCard({ title, value, subtitle, icon, trend }: StatCardProps) {
  return (
    <Card data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold" data-testid={`stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp
              className={`h-3 w-3 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}
            />
            <span
              className={`text-xs font-medium ${
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {trend.value}
            </span>
            <span className="text-xs text-muted-foreground">vs mes anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const mockStats = {
    totalTicketsSold: 1847,
    totalRevenue: 4235800,
    availableTickets: 1153,
    activeEvents: 3,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Boletos Vendidos"
        value={mockStats.totalTicketsSold.toLocaleString()}
        subtitle="Total de tickets procesados"
        icon={<Ticket className="h-4 w-4 text-primary" />}
        trend={{ value: "+12.5%", isPositive: true }}
      />
      <StatCard
        title="Ingresos Totales"
        value={formatCurrency(mockStats.totalRevenue)}
        subtitle="Ventas acumuladas"
        icon={<DollarSign className="h-4 w-4 text-primary" />}
        trend={{ value: "+18.2%", isPositive: true }}
      />
      <StatCard
        title="Boletos Disponibles"
        value={mockStats.availableTickets.toLocaleString()}
        subtitle="Inventario restante"
        icon={<Users className="h-4 w-4 text-primary" />}
      />
      <StatCard
        title="Eventos Activos"
        value={mockStats.activeEvents}
        subtitle="Eventos en curso"
        icon={<TrendingUp className="h-4 w-4 text-primary" />}
      />
    </div>
  );
}
