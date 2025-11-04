import { useState } from "react";
import { Search, X, Download, Ticket, User, Mail, Phone, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Datos mock
const MOCK_EVENTS = [
  {
    id: "1",
    name: "Festival de Rock en Vivo 2024",
    activities: [
      { id: "act-1", name: "Concierto Apertura", date: "2024-11-15" },
      { id: "act-2", name: "Banda Headliner", date: "2024-11-16" },
    ],
    zones: [
      { id: "zone-1", name: "VIP", price: 2500, capacity: 200 },
      { id: "zone-2", name: "Preferente A", price: 1800, capacity: 500 },
      { id: "zone-3", name: "General", price: 800, capacity: 1000 },
    ],
  },
  {
    id: "2",
    name: "Conferencia Tech Summit",
    activities: [
      { id: "act-3", name: "Keynote Principal", date: "2024-12-01" },
      { id: "act-4", name: "Talleres Técnicos", date: "2024-12-02" },
    ],
    zones: [
      { id: "zone-4", name: "Platino", price: 3500, capacity: 100 },
      { id: "zone-5", name: "Premium", price: 2000, capacity: 300 },
    ],
  },
];

export function ReserveTickets() {
  const [filters, setFilters] = useState({
    eventId: "",
    activityId: "",
    zoneId: "",
    quantity: "1",
  });

  const [searchResults, setSearchResults] = useState<any>(null);
  const [recipientData, setRecipientData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [reservationCode, setReservationCode] = useState<string | null>(null);

  const selectedEvent = MOCK_EVENTS.find((e) => e.id === filters.eventId);
  const selectedActivity = selectedEvent?.activities.find((a) => a.id === filters.activityId);
  const selectedZone = selectedEvent?.zones.find((z) => z.id === filters.zoneId);

  const handleSearch = () => {
    if (filters.eventId && filters.activityId && filters.zoneId) {
      const zone = selectedEvent?.zones.find((z) => z.id === filters.zoneId);
      setSearchResults({
        event: selectedEvent,
        activity: selectedActivity,
        zone: zone,
        quantity: parseInt(filters.quantity),
        total: (zone?.price || 0) * parseInt(filters.quantity),
      });
    }
  };

  const handleClear = () => {
    setFilters({
      eventId: "",
      activityId: "",
      zoneId: "",
      quantity: "1",
    });
    setSearchResults(null);
    setReservationCode(null);
    setRecipientData({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleGenerateReservation = () => {
    const code = `APT-${Date.now().toString().slice(-6)}`;
    setReservationCode(code);
  };

  const handleDownloadPDF = () => {
    alert(`Descargando PDF del apartado: ${reservationCode}`);
  };

  const isSearchEnabled = filters.eventId && filters.activityId && filters.zoneId;
  const isGenerateEnabled = searchResults && recipientData.name && recipientData.email && recipientData.phone;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Apartar Boletos</h2>
        <p className="text-muted-foreground">
          Reserva boletos para tus invitados y genera códigos de apartado
        </p>
      </div>

      {/* Filtros Compactos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Buscar Disponibilidad</CardTitle>
          <CardDescription>
            Selecciona el evento, actividad y zona para apartar boletos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filter-event">Evento</Label>
                <Select
                  value={filters.eventId}
                  onValueChange={(value) => {
                    setFilters({ ...filters, eventId: value, activityId: "", zoneId: "" });
                    setSearchResults(null);
                  }}
                >
                  <SelectTrigger id="filter-event" data-testid="select-reserve-event">
                    <SelectValue placeholder="Selecciona evento" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_EVENTS.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filter-activity">Actividad</Label>
                <Select
                  value={filters.activityId}
                  onValueChange={(value) => {
                    setFilters({ ...filters, activityId: value });
                    setSearchResults(null);
                  }}
                  disabled={!filters.eventId}
                >
                  <SelectTrigger id="filter-activity" data-testid="select-reserve-activity">
                    <SelectValue placeholder="Selecciona actividad" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedEvent?.activities.map((activity) => (
                      <SelectItem key={activity.id} value={activity.id}>
                        {activity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filter-zone">Zona</Label>
                <Select
                  value={filters.zoneId}
                  onValueChange={(value) => {
                    setFilters({ ...filters, zoneId: value });
                    setSearchResults(null);
                  }}
                  disabled={!filters.activityId}
                >
                  <SelectTrigger id="filter-zone" data-testid="select-reserve-zone">
                    <SelectValue placeholder="Selecciona zona" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedEvent?.zones.map((zone) => (
                      <SelectItem key={zone.id} value={zone.id}>
                        {zone.name} - ${zone.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filter-quantity">Cantidad</Label>
                <Select
                  value={filters.quantity}
                  onValueChange={(value) => {
                    setFilters({ ...filters, quantity: value });
                    setSearchResults(null);
                  }}
                >
                  <SelectTrigger id="filter-quantity" data-testid="select-reserve-quantity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "boleto" : "boletos"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botones Buscar y Limpiar - Compactos */}
            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                disabled={!isSearchEnabled}
                data-testid="button-search-availability"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              <Button
                variant="outline"
                onClick={handleClear}
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4 mr-2" />
                Limpiar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados de Búsqueda */}
      {searchResults && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Disponibilidad Confirmada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Evento</p>
                  <p className="font-semibold">{searchResults.event.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Actividad</p>
                  <p className="font-semibold">{searchResults.activity.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(searchResults.activity.date).toLocaleDateString('es-MX')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Zona</p>
                  <Badge variant="outline">{searchResults.zone.name}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cantidad</p>
                  <p className="font-semibold">{searchResults.quantity} boleto(s)</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="text-3xl font-bold text-primary">
                  ${searchResults.total.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">MXN</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formulario de Destinatario */}
      {searchResults && !reservationCode && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datos del Destinatario</CardTitle>
            <CardDescription>
              Ingresa la información de la persona que recibirá los boletos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient-name">Nombre Completo *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="recipient-name"
                    placeholder="Juan Pérez García"
                    className="pl-10"
                    value={recipientData.name}
                    onChange={(e) => setRecipientData({ ...recipientData, name: e.target.value })}
                    data-testid="input-recipient-name"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient-email">Correo Electrónico *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="recipient-email"
                      type="email"
                      placeholder="juan@email.com"
                      className="pl-10"
                      value={recipientData.email}
                      onChange={(e) => setRecipientData({ ...recipientData, email: e.target.value })}
                      data-testid="input-recipient-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient-phone">Teléfono *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="recipient-phone"
                      type="tel"
                      placeholder="+52 123 456 7890"
                      className="pl-10"
                      value={recipientData.phone}
                      onChange={(e) => setRecipientData({ ...recipientData, phone: e.target.value })}
                      data-testid="input-recipient-phone"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerateReservation}
                disabled={!isGenerateEnabled}
                className="w-full"
                data-testid="button-generate-reservation"
              >
                <Hash className="h-4 w-4 mr-2" />
                Generar Código de Apartado
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirmación de Apartado */}
      {reservationCode && (
        <Card className="border-chart-2 bg-chart-2/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-chart-2">
              <Ticket className="h-5 w-5" />
              ¡Apartado Generado Exitosamente!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Código de Apartado</p>
                <div className="flex items-center gap-2">
                  <Hash className="h-6 w-6 text-primary" />
                  <code className="text-4xl font-bold font-mono text-primary">
                    {reservationCode}
                  </code>
                </div>
              </div>

              <div className="space-y-3">
                <Separator />
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Destinatario</p>
                    <p className="font-semibold">{recipientData.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Correo</p>
                    <p className="font-semibold">{recipientData.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Teléfono</p>
                    <p className="font-semibold">{recipientData.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cantidad</p>
                    <p className="font-semibold">{searchResults.quantity} boleto(s)</p>
                  </div>
                </div>
                <Separator />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleDownloadPDF}
                  className="flex-1"
                  data-testid="button-download-pdf"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  className="flex-1"
                  data-testid="button-new-reservation"
                >
                  Nuevo Apartado
                </Button>
              </div>

              <div className="p-3 bg-background/50 rounded-lg border border-chart-2/20">
                <p className="text-xs text-muted-foreground">
                  <strong>Nota:</strong> El PDF incluirá el código QR del apartado, información del evento, 
                  zona asignada y datos del destinatario. El código será válido para canjear los boletos en taquilla.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
