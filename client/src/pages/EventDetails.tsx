import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { ChevronLeft, Calendar, MapPin, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerHeader } from "@/components/CustomerHeader";
import { ZoneSelector } from "@/components/ZoneSelector";
import { ProductCard } from "@/components/ProductCard";
import { CartSidebar } from "@/components/CartSidebar";
import { AuthDialog } from "@/components/AuthDialog";
import { EventPerformanceList } from "@/components/EventPerformanceList";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import concertImage from "@assets/generated_images/Concert_crowd_hero_image_7c247a60.png";

// todo: remove mock functionality
const mockZones = [
  { id: "vip", name: "VIP", price: 2500, capacity: 100, available: 85, hasSeats: true },
  { id: "preferente", name: "Preferente", price: 1800, capacity: 200, available: 45, hasSeats: true },
  { id: "general", name: "General", price: 850, capacity: 500, available: 320, hasSeats: false },
  { id: "palco", name: "Palco", price: 3500, capacity: 50, available: 5, hasSeats: true },
];

// todo: remove mock functionality
const mockProducts = [
  {
    id: "1",
    name: "Combo Palomitas + Refresco",
    description: "Palomitas grandes + refresco de 32oz",
    price: 150,
    category: "food" as const,
  },
  {
    id: "2",
    name: "Cerveza Premium",
    description: "Cerveza artesanal en lata",
    price: 80,
    category: "beverage" as const,
  },
  {
    id: "3",
    name: "Playera del Evento",
    description: "Playera oficial del festival",
    price: 450,
    category: "merchandise" as const,
  },
];

// todo: remove mock functionality
const mockPerformances = [
  {
    id: "1",
    date: "2024-11-15",
    time: "8:00 PM",
    city: "Ciudad de México",
    state: "CDMX",
    venue: "Estadio Nacional",
  },
  {
    id: "2",
    date: "2024-11-22",
    time: "7:30 PM",
    city: "Guadalajara",
    state: "Jalisco",
    venue: "Arena VFG",
  },
  {
    id: "3",
    date: "2024-11-29",
    time: "9:00 PM",
    city: "Monterrey",
    state: "Nuevo León",
    venue: "Arena Monterrey",
  },
  {
    id: "4",
    date: "2024-12-06",
    time: "8:30 PM",
    city: "Puebla",
    state: "Puebla",
    venue: "Estadio Cuauhtémoc",
  },
  {
    id: "5",
    date: "2024-12-13",
    time: "8:00 PM",
    city: "Tijuana",
    state: "Baja California",
    venue: "Auditorio Municipal",
  },
];

export default function EventDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { addItem, itemCount } = useCart();
  const { toast } = useToast();
  const [selectedZone, setSelectedZone] = useState<string>();
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  const handleFindTickets = (performanceId: string) => {
    setLocation(`/event/${id}/seats/${performanceId}`);
  };

  const handleBack = () => {
    setLocation("/");
  };

  const handleProductQuantityChange = (productId: string, quantity: number) => {
    if (!isAuthenticated && quantity > 0) {
      setShowLoginWarning(true);
      setAuthOpen(true);
      return;
    }
    
    const previousQuantity = productQuantities[productId] || 0;
    setProductQuantities({ ...productQuantities, [productId]: quantity });
    
    if (quantity > previousQuantity && quantity > 0) {
      const product = mockProducts.find(p => p.id === productId);
      if (product) {
        addItem({
          id: `item-${productId}-${Date.now()}`,
          eventName: "Festival de Rock en Vivo 2024",
          zoneName: product.name,
          itemName: product.name,
          price: product.price,
          quantity: quantity - previousQuantity,
          type: 'item',
        });
        
        toast({
          title: "Agregado al carrito",
          description: `${product.name} agregado exitosamente`,
        });
      }
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginWarning(true);
      setAuthOpen(true);
      return;
    }
    
    if (selectedZone) {
      const zone = mockZones.find(z => z.id === selectedZone);
      if (zone) {
        addItem({
          id: `ticket-${selectedZone}-${Date.now()}`,
          eventName: "Festival de Rock en Vivo 2024",
          zoneName: zone.name,
          price: zone.price,
          quantity: 1,
          type: 'ticket',
        });
        
        toast({
          title: "Agregado al carrito",
          description: `Boleto ${zone.name} agregado exitosamente`,
        });
        
        setSelectedZone(undefined);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader
        cartItemCount={itemCount}
        onCartClick={() => setCartOpen(true)}
        onUserClick={() => setAuthOpen(true)}
      />

      <div className="relative h-80 overflow-hidden">
        <img
          src={concertImage}
          alt="Event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <Button
              variant="ghost"
              className="mb-4 text-white hover:bg-white/20"
              onClick={handleBack}
              data-testid="button-back"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-4xl font-bold text-white mb-2" data-testid="text-event-title">
              Festival de Rock en Vivo 2024
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>15 Nov 2024, 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Estadio Nacional, Ciudad de México</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>5,000 capacidad</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mensaje de advertencia cuando no está logueado */}
        {!isAuthenticated && showLoginWarning && (
          <Alert className="mb-6" data-testid="alert-login-required">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Debes iniciar sesión para continuar con la compra
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="performances" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performances" data-testid="tab-performances">
              Fechas y Lugares
            </TabsTrigger>
            <TabsTrigger value="overview" data-testid="tab-overview">
              Descripción
            </TabsTrigger>
            <TabsTrigger value="zones" data-testid="tab-zones">
              Zonas y Boletos
            </TabsTrigger>
            <TabsTrigger value="addons" data-testid="tab-addons">
              Productos Adicionales
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performances" className="space-y-6">
            <EventPerformanceList
              performances={mockPerformances}
              onFindTickets={handleFindTickets}
            />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Sobre el Evento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Prepárate para vivir una experiencia inolvidable en el Festival de Rock en Vivo 2024.
                Este evento reunirá a las mejores bandas de rock nacional e internacional en un
                espectáculo que promete ser épico. Con más de 8 horas de música continua, efectos
                visuales impresionantes y una atmósfera única, este festival es imperdible para
                todos los amantes del rock.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="zones" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Selecciona tu Zona</h2>
              <ZoneSelector
                zones={mockZones}
                selectedZone={selectedZone}
                onZoneSelect={setSelectedZone}
              />
            </div>
          </TabsContent>

          <TabsContent value="addons" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Mejora tu Experiencia</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    quantity={productQuantities[product.id] || 0}
                    onQuantityChange={handleProductQuantityChange}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-4 mt-8">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Zona seleccionada</p>
              <p className="font-semibold">
                {selectedZone
                  ? mockZones.find((z) => z.id === selectedZone)?.name
                  : "Ninguna"}
              </p>
            </div>
            <Button 
              size="lg" 
              disabled={!selectedZone} 
              onClick={handleAddToCart}
              data-testid="button-add-to-cart"
            >
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </div>

      <CartSidebar
        isOpen={cartOpen}
        items={isAuthenticated ? [] : []}
        onClose={() => setCartOpen(false)}
        onCheckout={() => setLocation('/checkout')}
        onLoginClick={() => setAuthOpen(true)}
      />

      <AuthDialog isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      
      <Footer />
    </div>
  );
}
