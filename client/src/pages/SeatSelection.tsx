import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { ChevronLeft, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerHeader } from "@/components/CustomerHeader";
import { AuthDialog } from "@/components/AuthDialog";
import { VenueZoneMap } from "@/components/VenueZoneMap";
import { ZonePriceList } from "@/components/ZonePriceList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// todo: remove mock functionality
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
    id: "general-izq",
    name: "General Izq",
    price: 850,
    color: "#27ae60",
    available: 200,
    capacity: 250,
    coordinates: { x: 50, y: 410, width: 180, height: 140 },
  },
  {
    id: "general-centro",
    name: "General Centro",
    price: 850,
    color: "#27ae60",
    available: 180,
    capacity: 300,
    coordinates: { x: 250, y: 410, width: 300, height: 140 },
  },
  {
    id: "general-der",
    name: "General Der",
    price: 850,
    color: "#27ae60",
    available: 150,
    capacity: 250,
    coordinates: { x: 570, y: 410, width: 180, height: 140 },
  },
  {
    id: "palco-1",
    name: "Palco 1",
    price: 3500,
    color: "#e74c3c",
    available: 5,
    capacity: 20,
    coordinates: { x: 50, y: 270, width: 80, height: 80 },
  },
  {
    id: "palco-2",
    name: "Palco 2",
    price: 3500,
    color: "#e74c3c",
    available: 0,
    capacity: 20,
    coordinates: { x: 670, y: 270, width: 80, height: 80 },
  },
];

export default function SeatSelection() {
  const { eventId } = useParams();
  const [, setLocation] = useLocation();
  const [selectedZone, setSelectedZone] = useState<string>();
  const [authOpen, setAuthOpen] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const selectedZoneData = mockZones.find((z) => z.id === selectedZone);

  const handleBack = () => {
    setLocation(`/event/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader
        cartItemCount={0}
        onUserClick={() => setAuthOpen(true)}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} data-testid="button-back" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver al evento
          </Button>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-serif" data-testid="text-event-title">
              Festival de Rock en Vivo 2024
            </h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>15 Nov 2024, 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Estadio Nacional, Ciudad de México</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-3">Mapa del Recinto</h2>
              <VenueZoneMap
                zones={mockZones}
                selectedZone={selectedZone}
                onZoneSelect={setSelectedZone}
              />
            </div>

            {selectedZoneData && (
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold">Resumen de Selección</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Cantidad de Boletos</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max={selectedZoneData.available}
                      value={ticketQuantity}
                      onChange={(e) => setTicketQuantity(parseInt(e.target.value) || 1)}
                      data-testid="input-ticket-quantity"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                    <p className="text-2xl font-bold text-primary">
                      ${(selectedZoneData.price * ticketQuantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                <Button className="w-full" size="lg" data-testid="button-add-to-cart">
                  Agregar al Carrito
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <ZonePriceList
              zones={mockZones}
              selectedZone={selectedZone}
              onZoneSelect={setSelectedZone}
            />
          </div>
        </div>
      </div>

      <AuthDialog isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
