import { DollarSign } from "lucide-react";
import { StatsCard } from "../StatsCard";

export default function StatsCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <StatsCard
        title="Ingresos Totales"
        value="$125,430"
        icon={DollarSign}
        trend={{ value: 12.5, isPositive: true }}
      />
    </div>
  );
}
