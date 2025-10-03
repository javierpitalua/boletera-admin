import { useState } from "react";
import { VenueZoneMap } from "../VenueZoneMap";

const mockZones = [
  {
    id: "vip",
    name: "VIP",
    price: 2500,
    color: "#9b59b6",
    available: 85,
    capacity: 100,
    coordinates: { x: 250, y: 150, width: 300, height: 100 },
  },
  {
    id: "preferente-a",
    name: "Preferente A",
    price: 1800,
    color: "#3498db",
    available: 120,
    capacity: 150,
    coordinates: { x: 150, y: 270, width: 200, height: 120 },
  },
  {
    id: "preferente-b",
    name: "Preferente B",
    price: 1800,
    color: "#3498db",
    available: 95,
    capacity: 150,
    coordinates: { x: 450, y: 270, width: 200, height: 120 },
  },
  {
    id: "general",
    name: "General",
    price: 850,
    color: "#27ae60",
    available: 200,
    capacity: 300,
    coordinates: { x: 250, y: 410, width: 300, height: 140 },
  },
];

export default function VenueZoneMapExample() {
  const [selectedZone, setSelectedZone] = useState<string>();

  return (
    <div className="p-6">
      <VenueZoneMap
        zones={mockZones}
        selectedZone={selectedZone}
        onZoneSelect={setSelectedZone}
      />
    </div>
  );
}
