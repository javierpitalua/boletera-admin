import { useState } from "react";
import { ZoneSelector } from "../ZoneSelector";

const mockZones = [
  { id: "vip", name: "VIP", price: 2500, capacity: 100, available: 85, hasSeats: true },
  { id: "preferente", name: "Preferente", price: 1800, capacity: 200, available: 45, hasSeats: true },
  { id: "general", name: "General", price: 850, capacity: 500, available: 320, hasSeats: false },
  { id: "palco", name: "Palco", price: 3500, capacity: 50, available: 5, hasSeats: true },
];

export default function ZoneSelectorExample() {
  const [selected, setSelected] = useState<string>();

  return (
    <div className="p-4">
      <ZoneSelector
        zones={mockZones}
        selectedZone={selected}
        onZoneSelect={(id) => {
          setSelected(id);
          console.log("Zone selected:", id);
        }}
      />
    </div>
  );
}
