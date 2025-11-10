import { useLocation } from "wouter";
import { ArrowLeft, Calendar, MapPin, DollarSign, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import concertImage from "@assets/generated_images/Concert_crowd_hero_image_7c247a60.png";

export default function EventPreview() {
  const [, setLocation] = useLocation();

  const mockEvent = {
    id: "preview",
    name: "Festival de Rock en Vivo 2024",
    description: "El festival de rock más esperado del año con las mejores bandas nacionales e internacionales. Disfruta de tres días inolvidables llenos de música, entretenimiento y las mejores experiencias.",
    startDate: "2024-11-15",
    endDate: "2024-11-17",
    venue: "Estadio Nacional",
    city: "Ciudad de México",
    capacity: 50000,
    image: concertImage,
    category: "Festival",
    priceFrom: 850,
    activities: [
      {
        id: "act-1",
        name: "Concierto Apertura",
        location: "Escenario Principal",
        date: "2024-11-15",
        startTime: "20:00",
      },
      {
        id: "act-2",
        name: "Banda Headliner",
        location: "Escenario Principal",
        date: "2024-11-16",
        startTime: "22:00",
      },
    ],
    zones: [
      {
        id: "zone-1",
        name: "VIP",
        description: "Zona exclusiva con acceso a barras premium",
        capacity: 200,
        price: 2500,
      },
      {
        id: "zone-2",
        name: "Preferente A",
        description: "Vista frontal al escenario",
        capacity: 500,
        price: 1800,
      },
      {
        id: "zone-3",
        name: "General",
        description: "Acceso general al evento",
        capacity: 2000,
        price: 850,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header con botón de regreso */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setLocation('/coordinator')}
              data-testid="button-back-to-coordinator"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Vista Previa del Evento</h1>
              <p className="text-sm text-muted-foreground">
                Así verán los usuarios tu evento
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mockEvent.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
          <div className="max-w-3xl">
            <Badge className="mb-4" data-testid="badge-category">
              {mockEvent.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-event-name">
              {mockEvent.name}
            </h1>
            <p className="text-lg text-white/90 mb-6" data-testid="text-event-description">
              {mockEvent.description}
            </p>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{mockEvent.startDate} - {mockEvent.endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{mockEvent.venue}, {mockEvent.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Capacidad: {mockEvent.capacity.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activities Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Actividades del Evento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockEvent.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 border rounded-lg hover-elevate"
                    data-testid={`activity-${activity.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {activity.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {activity.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {activity.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {activity.startTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Zones Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Zonas Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {mockEvent.zones.map((zone) => (
                  <Card
                    key={zone.id}
                    className="hover-elevate"
                    data-testid={`zone-${zone.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-lg">{zone.name}</h3>
                          <Badge variant="outline" className="flex-shrink-0">
                            {zone.capacity} lugares
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {zone.description}
                        </p>
                        <div className="pt-2 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Precio</span>
                            <span className="text-xl font-bold text-primary">
                              ${zone.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Pricing Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Información de Precios
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Precio desde:</span>
                      <span className="text-2xl font-bold text-primary">
                        ${mockEvent.priceFrom.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Los precios varían según la zona seleccionada
                    </p>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button className="w-full" disabled data-testid="button-select-tickets">
                      Seleccionar Boletos
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Vista previa - Los botones están deshabilitados
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Información del Recinto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium mb-1">Ubicación</div>
                    <div className="text-muted-foreground">
                      {mockEvent.venue}
                      <br />
                      {mockEvent.city}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Capacidad Total</div>
                    <div className="text-muted-foreground">
                      {mockEvent.capacity.toLocaleString()} personas
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
