import { Check, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Zone {
  id: string;
  name: string;
  price: number;
  capacity: number;
  available: number;
  hasSeats: boolean;
}

interface ZoneSelectorProps {
  zones: Zone[];
  selectedZone?: string;
  onZoneSelect?: (zoneId: string) => void;
}

export function ZoneSelector({ zones, selectedZone, onZoneSelect }: ZoneSelectorProps) {
  const getAvailabilityColor = (available: number, capacity: number) => {
    const percentage = (available / capacity) * 100;
    if (percentage > 50) return "text-chart-2";
    if (percentage > 20) return "text-chart-3";
    return "text-destructive";
  };

  const getAvailabilityText = (available: number, capacity: number) => {
    const percentage = (available / capacity) * 100;
    if (percentage > 50) return "Disponible";
    if (percentage > 20) return "Pocas disponibles";
    if (available > 0) return "Últimas disponibles";
    return "Agotado";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {zones.map((zone) => {
        const isSelected = selectedZone === zone.id;
        const isAvailable = zone.available > 0;
        const availabilityColor = getAvailabilityColor(zone.available, zone.capacity);

        return (
          <Card
            key={zone.id}
            className={`p-4 cursor-pointer transition-all ${
              isSelected ? "ring-2 ring-primary" : ""
            } ${!isAvailable ? "opacity-60" : "hover-elevate active-elevate-2"}`}
            onClick={() => isAvailable && onZoneSelect?.(zone.id)}
            data-testid={`card-zone-${zone.id}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold" data-testid={`text-zone-name-${zone.id}`}>
                    {zone.name}
                  </h3>
                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span data-testid={`text-zone-availability-${zone.id}`}>
                    {zone.available} de {zone.capacity} disponibles
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={zone.hasSeats ? "default" : "secondary"} data-testid={`badge-seat-type-${zone.id}`}>
                    {zone.hasSeats ? "Con asiento" : "General"}
                  </Badge>
                  <Badge variant="outline" className={availabilityColor} data-testid={`badge-availability-${zone.id}`}>
                    {getAvailabilityText(zone.available, zone.capacity)}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-primary" data-testid={`text-zone-price-${zone.id}`}>
                  ${zone.price.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">por boleto</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
