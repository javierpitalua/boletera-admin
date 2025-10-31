import { useState } from "react";
import { Plus, Edit, Trash2, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Zone {
  id: string;
  name: string;
  description: string;
  type: "seated" | "tables" | "general";
  capacity: number;
  color: string;
}

interface VenueTabProps {
  zones: Zone[];
  onUpdate: (zones: Zone[]) => void;
}

const ZONE_COLORS = [
  "#9333ea", // purple
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#ec4899", // pink
];

export function VenueTab({ zones, onUpdate }: VenueTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    type: "seated" | "tables" | "general";
    capacity: number;
    color: string;
  }>({
    name: "",
    description: "",
    type: "seated",
    capacity: 0,
    color: ZONE_COLORS[0],
  });

  const handleOpenDialog = (zone?: Zone) => {
    if (zone) {
      setEditingZone(zone);
      setFormData({
        name: zone.name,
        description: zone.description,
        type: zone.type,
        capacity: zone.capacity,
        color: zone.color,
      });
    } else {
      setEditingZone(null);
      setFormData({
        name: "",
        description: "",
        type: "seated",
        capacity: 0,
        color: ZONE_COLORS[zones.length % ZONE_COLORS.length],
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingZone) {
      onUpdate(
        zones.map((z) =>
          z.id === editingZone.id ? { ...z, ...formData } : z
        )
      );
    } else {
      onUpdate([
        ...zones,
        {
          id: `zone-${Date.now()}`,
          ...formData,
        },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar esta zona?")) {
      onUpdate(zones.filter((z) => z.id !== id));
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "seated": return "Asientos";
      case "tables": return "Mesas";
      case "general": return "General";
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Estructura del Recinto</h3>
          <p className="text-sm text-muted-foreground">
            Define las zonas y su distribución en el recinto
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} data-testid="button-add-zone">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Zona
        </Button>
      </div>

      {/* Visualización del Recinto */}
      {zones.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Distribución Visual</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="aspect-square rounded-lg p-4 flex flex-col items-center justify-center text-center border-2 transition-all hover-elevate"
                  style={{
                    backgroundColor: zone.color + "20",
                    borderColor: zone.color,
                  }}
                  data-testid={`zone-visual-${zone.id}`}
                >
                  <div
                    className="h-3 w-3 rounded-full mb-2"
                    style={{ backgroundColor: zone.color }}
                  />
                  <p className="font-semibold text-sm mb-1">{zone.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {getTypeLabel(zone.type)}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    <Users className="h-3 w-3 inline mr-1" />
                    {zone.capacity}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Zonas */}
      {zones.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No hay zonas configuradas
            </p>
            <Button
              variant="outline"
              onClick={() => handleOpenDialog()}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Primera Zona
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <h4 className="font-semibold">Zonas Configuradas</h4>
          {zones.map((zone) => (
            <Card key={zone.id} data-testid={`card-zone-${zone.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className="h-10 w-10 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: zone.color }}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{zone.name}</h4>
                        <Badge variant="outline">
                          {getTypeLabel(zone.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {zone.description}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Capacidad: {zone.capacity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(zone)}
                      data-testid={`button-edit-zone-${zone.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(zone.id)}
                      className="text-destructive"
                      data-testid={`button-delete-zone-${zone.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog para agregar/editar zona */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent data-testid="dialog-zone">
          <DialogHeader>
            <DialogTitle>
              {editingZone ? "Editar Zona" : "Nueva Zona"}
            </DialogTitle>
            <DialogDescription>
              {editingZone
                ? "Modifica la configuración de la zona"
                : "Configura una nueva zona del recinto"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zone-name">Nombre de la Zona *</Label>
              <Input
                id="zone-name"
                placeholder="Ej: VIP, Preferente A, General"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                data-testid="input-zone-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zone-description">Descripción</Label>
              <Textarea
                id="zone-description"
                placeholder="Describe las características de esta zona"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                data-testid="input-zone-description"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zone-type">Tipo de Zona *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger id="zone-type" data-testid="select-zone-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seated">Asientos</SelectItem>
                    <SelectItem value="tables">Mesas</SelectItem>
                    <SelectItem value="general">Espacio General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zone-capacity">Capacidad *</Label>
                <Input
                  id="zone-capacity"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.capacity || ""}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                  data-testid="input-zone-capacity"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color Identificador</Label>
              <div className="flex gap-2">
                {ZONE_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`h-10 w-10 rounded-lg border-2 transition-all ${
                      formData.color === color ? "border-foreground scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData({ ...formData, color })}
                    data-testid={`button-color-${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                data-testid="button-cancel-zone"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.name || formData.capacity <= 0}
                data-testid="button-save-zone"
              >
                {editingZone ? "Guardar Cambios" : "Agregar Zona"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
