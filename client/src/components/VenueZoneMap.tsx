import { Check } from "lucide-react";

interface Zone {
  id: string;
  name: string;
  price: number;
  color: string;
  available: number;
  capacity: number;
  coordinates: { x: number; y: number; width: number; height: number };
}

interface VenueZoneMapProps {
  zones: Zone[];
  selectedZone?: string;
  onZoneSelect: (zoneId: string) => void;
}

export function VenueZoneMap({
  zones,
  selectedZone,
  onZoneSelect,
}: VenueZoneMapProps) {
  return (
    <div className="relative w-full aspect-[4/3] bg-card border rounded-lg overflow-hidden">
      <div className="absolute inset-0 p-8">
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center mb-4">
            <div className="inline-block px-4 py-2 bg-muted rounded-lg">
              <span className="text-sm font-semibold">ESCENARIO</span>
            </div>
          </div>

          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {zones.map((zone) => {
              const isSelected = selectedZone === zone.id;
              const isAvailable = zone.available > 0;

              return (
                <g
                  key={zone.id}
                  onClick={() => isAvailable && onZoneSelect(zone.id)}
                  className={isAvailable ? "cursor-pointer" : "cursor-not-allowed"}
                  data-testid={`zone-${zone.id}`}
                >
                  <rect
                    x={zone.coordinates.x}
                    y={zone.coordinates.y}
                    width={zone.coordinates.width}
                    height={zone.coordinates.height}
                    fill={zone.color}
                    opacity={isAvailable ? (isSelected ? 0.9 : 0.7) : 0.3}
                    stroke={isSelected ? "currentColor" : zone.color}
                    strokeWidth={isSelected ? 4 : 2}
                    className={
                      isAvailable
                        ? "transition-all hover:opacity-90"
                        : "opacity-30"
                    }
                  />
                  <text
                    x={zone.coordinates.x + zone.coordinates.width / 2}
                    y={zone.coordinates.y + zone.coordinates.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-semibold text-sm fill-white pointer-events-none"
                  >
                    {zone.name}
                  </text>
                  <text
                    x={zone.coordinates.x + zone.coordinates.width / 2}
                    y={zone.coordinates.y + zone.coordinates.height / 2 + 20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-white pointer-events-none"
                  >
                    ${zone.price.toLocaleString()}
                  </text>
                  {isSelected && (
                    <circle
                      cx={zone.coordinates.x + zone.coordinates.width - 15}
                      cy={zone.coordinates.y + 15}
                      r="12"
                      fill="hsl(var(--chart-2))"
                      className="pointer-events-none"
                    />
                  )}
                  {isSelected && (
                    <text
                      x={zone.coordinates.x + zone.coordinates.width - 15}
                      y={zone.coordinates.y + 15}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs fill-white pointer-events-none"
                    >
                      ✓
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
