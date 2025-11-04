import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { ChevronLeft, Calendar, MapPin, ShoppingCart, Minus, Plus, Ticket, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerHeader } from "@/components/CustomerHeader";
import { AuthDialog } from "@/components/AuthDialog";
import { Footer } from "@/components/Footer";
import { VenueZoneMap } from "@/components/VenueZoneMap";
import { ZonePriceList } from "@/components/ZonePriceList";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

// todo: remove mock functionality
const mockZones = [
  {
    id: "vip",
    name: "VIP",
    price: 2500,
    color: "#9b59b6",
    available: 85,
    capacity: 100,
    hasSeats: true,
    coordinates: { x: 250, y: 150, width: 300, height: 100 },
  },
  {
    id: "preferente-a",
    name: "Preferente A",
    price: 1800,
    color: "#3498db",
    available: 120,
    capacity: 150,
    hasSeats: true,
    coordinates: { x: 150, y: 270, width: 200, height: 120 },
  },
  {
    id: "preferente-b",
    name: "Preferente B",
    price: 1800,
    color: "#3498db",
    available: 95,
    capacity: 150,
    hasSeats: true,
    coordinates: { x: 450, y: 270, width: 200, height: 120 },
  },
  {
    id: "general-izq",
    name: "General Izq",
    price: 850,
    color: "#27ae60",
    available: 200,
    capacity: 250,
    hasSeats: false,
    coordinates: { x: 50, y: 410, width: 180, height: 140 },
  },
  {
    id: "general-centro",
    name: "General Centro",
    price: 850,
    color: "#27ae60",
    available: 180,
    capacity: 300,
    hasSeats: false,
    coordinates: { x: 250, y: 410, width: 300, height: 140 },
  },
  {
    id: "general-der",
    name: "General Der",
    price: 850,
    color: "#27ae60",
    available: 150,
    capacity: 250,
    hasSeats: false,
    coordinates: { x: 570, y: 410, width: 180, height: 140 },
  },
  {
    id: "palco-1",
    name: "Palco 1",
    price: 3500,
    color: "#e74c3c",
    available: 5,
    capacity: 20,
    hasSeats: true,
    coordinates: { x: 50, y: 270, width: 80, height: 80 },
  },
  {
    id: "palco-2",
    name: "Palco 2",
    price: 3500,
    color: "#e74c3c",
    available: 0,
    capacity: 20,
    hasSeats: true,
    coordinates: { x: 670, y: 270, width: 80, height: 80 },
  },
];

const mockAdditionalItems = [
  {
    id: "combo-food",
    name: "Combo Familiar",
    category: "Comida",
    price: 350,
    description: "Palomitas grandes + 2 refrescos + nachos",
  },
  {
    id: "beer",
    name: "Cerveza Premium",
    category: "Bebidas",
    price: 85,
    description: "Cerveza artesanal 355ml",
  },
  {
    id: "soda",
    name: "Refresco Grande",
    category: "Bebidas",
    price: 45,
    description: "600ml",
  },
  {
    id: "tshirt",
    name: "Playera del Evento",
    category: "Mercancía",
    price: 450,
    description: "Talla M, L, XL disponibles",
  },
  {
    id: "poster",
    name: "Póster Oficial",
    category: "Mercancía",
    price: 200,
    description: "45x60cm impresión premium",
  },
];

export default function SeatSelection() {
  const { eventId } = useParams();
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [zoneTickets, setZoneTickets] = useState<{ [key: string]: number }>({});
  const [additionalItems, setAdditionalItems] = useState<{ [key: string]: number }>({});
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  
  const MAX_TICKETS = 8;

  const totalTickets = Object.values(zoneTickets).reduce((sum, count) => sum + count, 0);

  const handleTicketChange = (zoneId: string, quantity: number) => {
    if (!isAuthenticated && quantity > 0) {
      setShowLoginWarning(true);
      setAuthOpen(true);
      return;
    }
    
    setZoneTickets(prev => {
      const newTickets = { ...prev };
      if (quantity === 0) {
        delete newTickets[zoneId];
      } else {
        newTickets[zoneId] = quantity;
      }
      return newTickets;
    });
  };

  const handleItemChange = (itemId: string, change: number) => {
    if (!isAuthenticated && change > 0) {
      setShowLoginWarning(true);
      setAuthOpen(true);
      return;
    }
    
    setAdditionalItems(prev => {
      const current = prev[itemId] || 0;
      const newValue = Math.max(0, current + change);
      const newItems = { ...prev };
      if (newValue === 0) {
        delete newItems[itemId];
      } else {
        newItems[itemId] = newValue;
      }
      return newItems;
    });
  };

  const calculateTotal = () => {
    const ticketsTotal = Object.entries(zoneTickets).reduce((sum, [zoneId, count]) => {
      const zone = mockZones.find(z => z.id === zoneId);
      return sum + (zone ? zone.price * count : 0);
    }, 0);

    const itemsTotal = Object.entries(additionalItems).reduce((sum, [itemId, count]) => {
      const item = mockAdditionalItems.find(i => i.id === itemId);
      return sum + (item ? item.price * count : 0);
    }, 0);

    return ticketsTotal + itemsTotal;
  };

  const handleBack = () => {
    setLocation(`/event/${eventId}`);
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", { zoneTickets, additionalItems });
    // TODO: Add to cart logic
  };

  const groupedItems = mockAdditionalItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as { [key: string]: typeof mockAdditionalItems });

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
            <h1 className="text-3xl font-bold" data-testid="text-event-title">
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

        {/* Mensaje de advertencia cuando no está logueado */}
        {!isAuthenticated && showLoginWarning && (
          <Alert className="mb-6" data-testid="alert-login-required">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Debes iniciar sesión para continuar con la compra
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-1">Mapa del Recinto</h2>
                <p className="text-sm text-muted-foreground">
                  Visualiza las zonas disponibles en el mapa
                </p>
              </div>
              <VenueZoneMap
                zones={mockZones}
                selectedZone={undefined}
                onZoneSelect={() => {}}
              />
            </Card>

            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-1">Artículos Adicionales</h2>
                <p className="text-sm text-muted-foreground">
                  Mejora tu experiencia con comida, bebidas y mercancía oficial
                </p>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">
                      {category}
                    </h3>
                    <div className="space-y-3">
                      {items.map((item) => {
                        const quantity = additionalItems[item.id] || 0;
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between p-4 rounded-lg border ${
                              quantity > 0 ? "border-primary bg-primary/5" : "border-border"
                            }`}
                            data-testid={`item-card-${item.id}`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                {quantity > 0 && (
                                  <Badge variant="default" className="text-xs">
                                    {quantity}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {item.description}
                              </p>
                              <p className="text-lg font-bold text-primary">
                                ${item.price.toLocaleString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleItemChange(item.id, -1)}
                                disabled={quantity === 0}
                                data-testid={`button-decrease-item-${item.id}`}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="w-12 text-center">
                                <span className="text-lg font-semibold" data-testid={`text-quantity-item-${item.id}`}>
                                  {quantity}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleItemChange(item.id, 1)}
                                data-testid={`button-increase-item-${item.id}`}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <ZonePriceList
              zones={mockZones}
              zoneTickets={zoneTickets}
              onTicketChange={handleTicketChange}
              maxTickets={MAX_TICKETS}
              totalTickets={totalTickets}
            />

            <Card className="p-6 sticky top-20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Resumen</h3>
                  <Badge variant="outline" className="gap-1">
                    <Ticket className="h-3 w-3" />
                    {totalTickets} / {MAX_TICKETS}
                  </Badge>
                </div>

                <Separator />

                {totalTickets > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Boletos</p>
                    {Object.entries(zoneTickets).map(([zoneId, count]) => {
                      const zone = mockZones.find(z => z.id === zoneId);
                      if (!zone) return null;
                      return (
                        <div key={zoneId} className="flex justify-between text-sm">
                          <span>{zone.name} × {count}</span>
                          <span className="font-semibold">
                            ${(zone.price * count).toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {Object.keys(additionalItems).length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground">Artículos Adicionales</p>
                      {Object.entries(additionalItems).map(([itemId, count]) => {
                        const item = mockAdditionalItems.find(i => i.id === itemId);
                        if (!item) return null;
                        return (
                          <div key={itemId} className="flex justify-between text-sm">
                            <span>{item.name} × {count}</span>
                            <span className="font-semibold">
                              ${(item.price * count).toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                <Separator />

                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>

                <Button
                  className="w-full gap-2"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={totalTickets === 0}
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Agregar al Carrito
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <AuthDialog isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      
      <Footer />
    </div>
  );
}
