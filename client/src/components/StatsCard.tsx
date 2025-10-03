import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className="p-6" data-testid={`card-stats-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground" data-testid="text-stats-title">
            {title}
          </p>
          <p className="text-3xl font-bold" data-testid="text-stats-value">
            {value}
          </p>
          {trend && (
            <p
              className={`text-sm ${
                trend.isPositive ? "text-chart-2" : "text-destructive"
              }`}
              data-testid="text-stats-trend"
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}% vs mes anterior
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
