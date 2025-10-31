import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Calendar, Ticket, MapPin, Tag, LogOut, List, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventForm } from "@/components/coordinator/EventForm";
import { Badge } from "@/components/ui/badge";

export default function CoordinatorDashboard() {
  const [, setLocation] = useLocation();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  
  // Datos mock de eventos
  const [events, setEvents] = useState([
    {
      id: "1",
      name: "Festival de Rock en Vivo 2024",
      description: "El festival de rock más esperado del año",
      startDate: "2024-11-15",
      endDate: "2024-11-17",
      status: "active" as const,
      activitiesCount: 5,
      zonesCount: 4,
      couponsCount: 3,
    },
    {
      id: "2",
      name: "Conferencia Tech Summit",
      description: "Conferencia anual de tecnología e innovación",
      startDate: "2024-12-01",
      endDate: "2024-12-03",
      status: "draft" as const,
      activitiesCount: 8,
      zonesCount: 3,
      couponsCount: 1,
    },
  ]);

  const handleLogout = () => {
    setLocation('/');
  };

  const handleCreateEvent = () => {
    setIsCreatingEvent(true);
    setSelectedEventId(null);
  };

  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsCreatingEvent(false);
  };

  const handleCloseForm = () => {
    setIsCreatingEvent(false);
    setSelectedEventId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold" data-testid="text-coordinator-title">
                  Panel de Coordinador
                </h1>
                <p className="text-sm text-muted-foreground">
                  Gestión de Eventos
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Lista de Eventos */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mis Eventos</CardTitle>
                <CardDescription>
                  {events.length} evento{events.length !== 1 ? 's' : ''} registrado{events.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full"
                  onClick={handleCreateEvent}
                  data-testid="button-create-event"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Evento
                </Button>

                <div className="space-y-2 mt-4">
                  {events.map((event) => (
                    <Card
                      key={event.id}
                      className={`cursor-pointer transition-colors ${
                        selectedEventId === event.id
                          ? 'border-primary bg-primary/5'
                          : 'hover-elevate'
                      }`}
                      onClick={() => handleSelectEvent(event.id)}
                      data-testid={`card-event-${event.id}`}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-sm line-clamp-2">
                              {event.name}
                            </h3>
                            <Badge
                              variant={event.status === 'active' ? 'default' : 'outline'}
                              className="text-xs flex-shrink-0"
                            >
                              {event.status === 'active' ? 'Activo' : 'Borrador'}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <List className="h-3 w-3" />
                              <span>{event.activitiesCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{event.zonesCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              <span>{event.couponsCount}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Actividades</span>
                  <span className="font-semibold">13</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Zonas</span>
                  <span className="font-semibold">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cupones Activos</span>
                  <span className="font-semibold text-chart-2">4</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Área Principal */}
          <div className="lg:col-span-3">
            {!isCreatingEvent && !selectedEventId ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    Bienvenido al Panel de Coordinador
                  </h2>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Selecciona un evento de la lista o crea uno nuevo para comenzar a gestionar actividades, zonas y cupones
                  </p>
                  <Button onClick={handleCreateEvent}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primer Evento
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <EventForm
                eventId={selectedEventId}
                onClose={handleCloseForm}
                onSave={(eventData: any) => {
                  console.log("Saving event:", eventData);
                  handleCloseForm();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
