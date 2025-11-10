import { useState } from "react";
import { useLocation } from "wouter";
import { Save, X, Calendar, MapPin, List, DollarSign, Tag, Plus, Eye, Send, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ActivitiesTab } from "./ActivitiesTab";
import { VenueTab } from "./VenueTab";
import { PricingTab } from "./PricingTab";
import { AddonsTab } from "./AddonsTab";
import { CouponsTab } from "./CouponsTab";

interface EventFormProps {
  eventId: string | null;
  onClose: () => void;
  onSave: (eventData: any) => void;
}

export function EventForm({ eventId, onClose, onSave }: EventFormProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [eventStatus, setEventStatus] = useState<"draft" | "review" | "published">(eventId ? "draft" : "draft");
  
  // Estado del evento
  const [eventData, setEventData] = useState({
    name: eventId ? "Festival de Rock en Vivo 2024" : "",
    description: eventId ? "El festival de rock más esperado del año con las mejores bandas nacionales e internacionales" : "",
    startDate: eventId ? "2024-11-15" : "",
    endDate: eventId ? "2024-11-17" : "",
  });

  // Actividades mock
  const [activities, setActivities] = useState(eventId ? [
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
  ] : []);

  // Zonas mock
  const [zones, setZones] = useState(eventId ? [
    {
      id: "zone-1",
      name: "VIP",
      description: "Zona exclusiva con acceso a barras premium",
      type: "seated" as const,
      capacity: 200,
      color: "#9333ea",
    },
    {
      id: "zone-2",
      name: "Preferente A",
      description: "Vista frontal al escenario",
      type: "seated" as const,
      capacity: 500,
      color: "#3b82f6",
    },
  ] : []);

  // Precios mock
  const [pricing, setPricing] = useState(eventId ? [
    {
      id: "price-1",
      activityId: "act-1",
      zoneId: "zone-1",
      price: 2500,
    },
    {
      id: "price-2",
      activityId: "act-2",
      zoneId: "zone-1",
      price: 3000,
    },
  ] : []);

  // Artículos adicionales mock
  const [addons, setAddons] = useState(eventId ? [
    {
      id: "addon-1",
      name: "Combo Familiar",
      description: "2 hot dogs + 2 refrescos + papas",
      price: 350,
      isFree: false,
    },
    {
      id: "addon-2",
      name: "Estacionamiento",
      description: "Acceso a estacionamiento",
      price: 0,
      isFree: true,
    },
  ] : []);

  // Cupones mock
  const [coupons, setCoupons] = useState(eventId ? [
    {
      id: "coupon-1",
      code: "DESCUENTO15",
      type: "percentage" as const,
      value: 15,
      expiryDate: "2024-11-10",
      usageLimit: 100,
      usageCount: 45,
      activityId: "act-1",
      status: "active" as const,
    },
    {
      id: "coupon-2",
      code: "VERANO100",
      type: "fixed" as const,
      value: 100,
      expiryDate: "2024-11-15",
      usageLimit: 50,
      usageCount: 50,
      activityId: "act-2",
      status: "inactive" as const,
    },
  ] : []);

  const handleSave = () => {
    const fullEventData = {
      ...eventData,
      activities,
      zones,
      pricing,
      addons,
      coupons,
      status: eventStatus,
    };
    onSave(fullEventData);
  };

  const handleVisualize = () => {
    if (!isFormValid) {
      toast({
        title: "Error",
        description: "Completa la información básica antes de visualizar",
        variant: "destructive",
      });
      return;
    }
    setLocation(`/preview/${eventId || 'new'}`);
  };

  const handlePublish = () => {
    if (!isFormValid) {
      toast({
        title: "Error",
        description: "Completa la información básica antes de publicar",
        variant: "destructive",
      });
      return;
    }
    setEventStatus("published");
    toast({
      title: "Evento Publicado",
      description: "El evento ha sido publicado correctamente",
    });
  };

  const handleSendToReview = () => {
    if (!isFormValid) {
      toast({
        title: "Error",
        description: "Completa la información básica antes de enviar a revisión",
        variant: "destructive",
      });
      return;
    }
    setEventStatus("review");
    toast({
      title: "Enviado a Revisión",
      description: "El evento ha sido enviado a revisión",
    });
  };

  const isFormValid = eventData.name && eventData.startDate && eventData.endDate;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">
                {eventId ? "Editar Evento" : "Nuevo Evento"}
              </CardTitle>
              {eventStatus !== "draft" && (
                <Badge variant={eventStatus === "published" ? "default" : "outline"}>
                  {eventStatus === "published" ? "Publicado" : "En Revisión"}
                </Badge>
              )}
            </div>
            <CardDescription>
              {eventId ? "Modifica la información del evento" : "Completa la información del nuevo evento"}
            </CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <Button variant="outline" onClick={onClose} data-testid="button-cancel-event">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button 
              variant="outline" 
              onClick={handleVisualize} 
              disabled={!isFormValid}
              data-testid="button-visualize-event"
            >
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSendToReview}
              disabled={!isFormValid || eventStatus === "review" || eventStatus === "published"}
              data-testid="button-send-review-event"
            >
              <FileCheck className="h-4 w-4 mr-2" />
              A Revisión
            </Button>
            <Button 
              variant="default" 
              onClick={handlePublish}
              disabled={!isFormValid || eventStatus === "published"}
              data-testid="button-publish-event"
            >
              <Send className="h-4 w-4 mr-2" />
              Publicar
            </Button>
            <Button onClick={handleSave} disabled={!isFormValid} data-testid="button-save-event">
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic" className="gap-2" data-testid="tab-basic">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Básico</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-2" data-testid="tab-activities">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Actividades</span>
              <Badge variant="outline" className="ml-1">
                {activities.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="venue" className="gap-2" data-testid="tab-venue">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Recinto</span>
              <Badge variant="outline" className="ml-1">
                {zones.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="gap-2" data-testid="tab-pricing">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Precios</span>
            </TabsTrigger>
            <TabsTrigger value="addons" className="gap-2" data-testid="tab-addons">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Adicionales</span>
              <Badge variant="outline" className="ml-1">
                {addons.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="coupons" className="gap-2" data-testid="tab-coupons">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Cupones</span>
              <Badge variant="outline" className="ml-1">
                {coupons.filter(c => c.status === 'active').length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Información Básica */}
          <TabsContent value="basic" className="space-y-6 pt-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="event-name">Nombre del Evento *</Label>
                <Input
                  id="event-name"
                  placeholder="Ej: Festival de Rock 2024"
                  value={eventData.name}
                  onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                  data-testid="input-event-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-description">Descripción</Label>
                <Textarea
                  id="event-description"
                  placeholder="Describe tu evento..."
                  rows={4}
                  value={eventData.description}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                  data-testid="input-event-description"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Fecha de Inicio *</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={eventData.startDate}
                    onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
                    data-testid="input-start-date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">Fecha de Fin *</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={eventData.endDate}
                    onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                    data-testid="input-end-date"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Actividades */}
          <TabsContent value="activities" className="pt-6">
            <ActivitiesTab
              activities={activities}
              onUpdate={setActivities}
            />
          </TabsContent>

          {/* Tab: Recinto/Zonas */}
          <TabsContent value="venue" className="pt-6">
            <VenueTab
              zones={zones}
              onUpdate={setZones}
            />
          </TabsContent>

          {/* Tab: Precios */}
          <TabsContent value="pricing" className="pt-6">
            <PricingTab
              activities={activities}
              zones={zones}
              pricing={pricing}
              onUpdate={setPricing}
            />
          </TabsContent>

          {/* Tab: Artículos Adicionales */}
          <TabsContent value="addons" className="pt-6">
            <AddonsTab
              addons={addons}
              onUpdate={setAddons}
            />
          </TabsContent>

          {/* Tab: Cupones */}
          <TabsContent value="coupons" className="pt-6">
            <CouponsTab
              activities={activities}
              coupons={coupons}
              onUpdate={setCoupons}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
