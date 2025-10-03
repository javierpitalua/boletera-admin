import { Check, Users, Ticket } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Zone {
  id: string;
  name: string;
  price: number;
  available: number;
  capacity: number;
  color: string;
}

interface ZonePriceListProps {
  zones: Zone[];
  selectedZone?: string;
  onZoneSelect: (zoneId: string) => void;
}

export function ZonePriceList({
  zones,
  selectedZone,
  onZoneSelect,
}: ZonePriceListProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">Zonas Disponibles</h3>
        <p className="text-sm text-muted-foreground">
          Selecciona tu zona preferida
        </p>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-3">
          {zones.map((zone) => {
            const isSelected = selectedZone === zone.id;
            const isAvailable = zone.available > 0;
            const availabilityPercent = (zone.available / zone.capacity) * 100;

            return (
              <button
                key={zone.id}
                onClick={() => isAvailable && onZoneSelect(zone.id)}
                disabled={!isAvailable}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover-elevate active-elevate-2"
                } ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                data-testid={`zone-card-${zone.id}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: zone.color }}
                      />
                      <h4 className="font-semibold">{zone.name}</h4>
                      {isSelected && (
                        <div className="ml-auto">
                          <Badge variant="default" className="gap-1">
                            <Check className="h-3 w-3" />
                            Seleccionada
                          </Badge>
                        </div>
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

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Ticket className="h-4 w-4" />
                        <span>
                          {zone.available} disponibles
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>
                          {zone.capacity} capacidad
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-chart-2 transition-all"
                          style={{ width: `${availabilityPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {availabilityPercent.toFixed(0)}% disponible
                      </p>
                    </div>

                    {!isAvailable && (
                      <Badge variant="secondary">Agotado</Badge>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
