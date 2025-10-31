import { Check, Minus, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Zone {
  id: string;
  name: string;
  price: number;
  available: number;
  capacity: number;
  color: string;
  hasSeats?: boolean;
}

interface ZoneTickets {
  [zoneId: string]: number;
}

interface ZonePriceListProps {
  zones: Zone[];
  zoneTickets: ZoneTickets;
  onTicketChange: (zoneId: string, quantity: number) => void;
  maxTickets: number;
  totalTickets: number;
}

export function ZonePriceList({
  zones,
  zoneTickets,
  onTicketChange,
  maxTickets,
  totalTickets,
}: ZonePriceListProps) {
  const getAvailabilityLevel = (available: number, capacity: number) => {
    const percent = (available / capacity) * 100;
    if (percent >= 60) return { label: "Alta", variant: "default" as const, color: "bg-chart-2" };
    if (percent >= 30) return { label: "Media", variant: "secondary" as const, color: "bg-chart-4" };
    return { label: "Baja", variant: "destructive" as const, color: "bg-chart-1" };
  };

  const canAddMore = (zoneId: string) => {
    const currentZoneTickets = zoneTickets[zoneId] || 0;
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return false;
    return totalTickets < maxTickets && currentZoneTickets < zone.available;
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">Zonas Disponibles</h3>
        <p className="text-sm text-muted-foreground">
          Selecciona tus boletos (máximo {maxTickets})
        </p>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-3">
          {zones.map((zone) => {
            const isAvailable = zone.available > 0;
            const availability = getAvailabilityLevel(zone.available, zone.capacity);
            const ticketCount = zoneTickets[zone.id] || 0;
            const hasTickets = ticketCount > 0;

            return (
              <div
                key={zone.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  hasTickets
                    ? "border-primary bg-primary/5"
                    : "border-border"
                } ${!isAvailable ? "opacity-50" : ""}`}
                data-testid={`zone-card-${zone.id}`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: zone.color }}
                      />
                      <h4 className="font-semibold">{zone.name}</h4>
                      {zone.hasSeats && (
                        <Badge variant="outline" className="text-xs">
                          Numerado
                        </Badge>
                      )}
                    </div>
                    {hasTickets && (
                      <Badge variant="default" className="gap-1">
                        <Check className="h-3 w-3" />
                        {ticketCount}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">
                      ${zone.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      por boleto
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant={availability.variant} data-testid={`badge-availability-${zone.id}`}>
                      Disponibilidad: {availability.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {zone.available} disponibles
                    </span>
                  </div>

                  {isAvailable ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onTicketChange(zone.id, Math.max(0, ticketCount - 1))}
                        disabled={ticketCount === 0}
                        data-testid={`button-decrease-${zone.id}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center">
                        <span className="text-lg font-semibold" data-testid={`text-quantity-${zone.id}`}>
                          {ticketCount}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onTicketChange(zone.id, ticketCount + 1)}
                        disabled={!canAddMore(zone.id)}
                        data-testid={`button-increase-${zone.id}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Badge variant="secondary" className="w-full justify-center">
                      Agotado
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
