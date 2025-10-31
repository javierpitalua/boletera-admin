import { useState } from "react";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Activity {
  id: string;
  name: string;
}

interface Zone {
  id: string;
  name: string;
  color: string;
}

interface Price {
  id: string;
  activityId: string;
  zoneId: string;
  price: number;
}

interface PricingTabProps {
  activities: Activity[];
  zones: Zone[];
  pricing: Price[];
  onUpdate: (pricing: Price[]) => void;
}

export function PricingTab({ activities, zones, pricing, onUpdate }: PricingTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<Price | null>(null);
  const [formData, setFormData] = useState({
    activityId: "",
    zoneId: "",
    price: 0,
  });

  const handleOpenDialog = (price?: Price) => {
    if (price) {
      setEditingPrice(price);
      setFormData({
        activityId: price.activityId,
        zoneId: price.zoneId,
        price: price.price,
      });
    } else {
      setEditingPrice(null);
      setFormData({
        activityId: activities[0]?.id || "",
        zoneId: zones[0]?.id || "",
        price: 0,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingPrice) {
      onUpdate(
        pricing.map((p) =>
          p.id === editingPrice.id ? { ...p, ...formData } : p
        )
      );
    } else {
      onUpdate([
        ...pricing,
        {
          id: `price-${Date.now()}`,
          ...formData,
        },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar esta configuración de precio?")) {
      onUpdate(pricing.filter((p) => p.id !== id));
    }
  };

  const getActivityName = (id: string) => {
    return activities.find((a) => a.id === id)?.name || "Desconocida";
  };

  const getZone = (id: string) => {
    return zones.find((z) => z.id === id);
  };

  if (activities.length === 0 || zones.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center mb-2">
            Para configurar precios necesitas:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside">
            {activities.length === 0 && <li>Al menos una actividad</li>}
            {zones.length === 0 && <li>Al menos una zona</li>}
          </ul>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Configuración de Precios</h3>
          <p className="text-sm text-muted-foreground">
            Asigna precios por actividad y zona
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} data-testid="button-add-price">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Precio
        </Button>
      </div>

      {pricing.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No hay precios configurados
            </p>
            <Button
              variant="outline"
              onClick={() => handleOpenDialog()}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Configurar Primer Precio
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pricing.map((price) => {
            const zone = getZone(price.zoneId);
            return (
              <Card key={price.id} data-testid={`card-price-${price.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      {zone && (
                        <div
                          className="h-10 w-10 rounded-lg flex-shrink-0"
                          style={{ backgroundColor: zone.color }}
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">
                            {getActivityName(price.activityId)}
                          </h4>
                          {zone && (
                            <Badge variant="outline">{zone.name}</Badge>
                          )}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-primary">
                            ${price.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            MXN por boleto
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(price)}
                        data-testid={`button-edit-price-${price.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(price.id)}
                        className="text-destructive"
                        data-testid={`button-delete-price-${price.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Dialog para agregar/editar precio */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent data-testid="dialog-price">
          <DialogHeader>
            <DialogTitle>
              {editingPrice ? "Editar Precio" : "Nuevo Precio"}
            </DialogTitle>
            <DialogDescription>
              {editingPrice
                ? "Modifica el precio asignado"
                : "Configura un nuevo precio para una actividad y zona"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price-activity">Actividad *</Label>
              <Select
                value={formData.activityId}
                onValueChange={(value) => setFormData({ ...formData, activityId: value })}
              >
                <SelectTrigger id="price-activity" data-testid="select-price-activity">
                  <SelectValue placeholder="Selecciona una actividad" />
                </SelectTrigger>
                <SelectContent>
                  {activities.map((activity) => (
                    <SelectItem key={activity.id} value={activity.id}>
                      {activity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price-zone">Zona *</Label>
              <Select
                value={formData.zoneId}
                onValueChange={(value) => setFormData({ ...formData, zoneId: value })}
              >
                <SelectTrigger id="price-zone" data-testid="select-price-zone">
                  <SelectValue placeholder="Selecciona una zona" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded"
                          style={{ backgroundColor: zone.color }}
                        />
                        {zone.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price-amount">Precio (MXN) *</Label>
              <Input
                id="price-amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                data-testid="input-price-amount"
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                data-testid="button-cancel-price"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.activityId || !formData.zoneId || formData.price <= 0}
                data-testid="button-save-price"
              >
                {editingPrice ? "Guardar Cambios" : "Agregar Precio"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
