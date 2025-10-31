import { useState } from "react";
import { Plus, Edit, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  isFree: boolean;
}

interface AddonsTabProps {
  addons: Addon[];
  onUpdate: (addons: Addon[]) => void;
}

export function AddonsTab({ addons, onUpdate }: AddonsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddon, setEditingAddon] = useState<Addon | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    isFree: false,
  });

  const handleOpenDialog = (addon?: Addon) => {
    if (addon) {
      setEditingAddon(addon);
      setFormData({
        name: addon.name,
        description: addon.description,
        price: addon.price,
        isFree: addon.isFree,
      });
    } else {
      setEditingAddon(null);
      setFormData({
        name: "",
        description: "",
        price: 0,
        isFree: false,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingAddon) {
      onUpdate(
        addons.map((a) =>
          a.id === editingAddon.id ? { ...a, ...formData } : a
        )
      );
    } else {
      onUpdate([
        ...addons,
        {
          id: `addon-${Date.now()}`,
          ...formData,
        },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar este artículo adicional?")) {
      onUpdate(addons.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Artículos Adicionales</h3>
          <p className="text-sm text-muted-foreground">
            Configura productos y servicios extra para tu evento
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} data-testid="button-add-addon">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Artículo
        </Button>
      </div>

      {addons.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No hay artículos adicionales
            </p>
            <Button
              variant="outline"
              onClick={() => handleOpenDialog()}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Primer Artículo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addons.map((addon) => (
            <Card key={addon.id} data-testid={`card-addon-${addon.id}`}>
              <CardContent className="p-4">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{addon.name}</h4>
                        {addon.isFree && (
                          <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                            Gratis
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {addon.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t">
                    <div>
                      <span className="text-xl font-bold">
                        {addon.isFree ? (
                          <span className="text-chart-2">Incluido</span>
                        ) : (
                          <span>${addon.price.toLocaleString()}</span>
                        )}
                      </span>
                      {!addon.isFree && (
                        <span className="text-xs text-muted-foreground ml-1">MXN</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(addon)}
                        data-testid={`button-edit-addon-${addon.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(addon.id)}
                        className="text-destructive"
                        data-testid={`button-delete-addon-${addon.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog para agregar/editar artículo */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent data-testid="dialog-addon">
          <DialogHeader>
            <DialogTitle>
              {editingAddon ? "Editar Artículo" : "Nuevo Artículo Adicional"}
            </DialogTitle>
            <DialogDescription>
              {editingAddon
                ? "Modifica la información del artículo"
                : "Agrega un producto o servicio extra"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="addon-name">Nombre del Artículo *</Label>
              <Input
                id="addon-name"
                placeholder="Ej: Combo Familiar, Estacionamiento"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                data-testid="input-addon-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addon-description">Descripción</Label>
              <Textarea
                id="addon-description"
                placeholder="Describe el artículo..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                data-testid="input-addon-description"
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="addon-free">Artículo Gratuito</Label>
                <p className="text-sm text-muted-foreground">
                  Este artículo está incluido sin costo
                </p>
              </div>
              <Switch
                id="addon-free"
                checked={formData.isFree}
                onCheckedChange={(checked) => setFormData({ ...formData, isFree: checked })}
                data-testid="switch-addon-free"
              />
            </div>

            {!formData.isFree && (
              <div className="space-y-2">
                <Label htmlFor="addon-price">Precio (MXN) *</Label>
                <Input
                  id="addon-price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  data-testid="input-addon-price"
                />
              </div>
            )}

            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                data-testid="button-cancel-addon"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.name || (!formData.isFree && formData.price <= 0)}
                data-testid="button-save-addon"
              >
                {editingAddon ? "Guardar Cambios" : "Agregar Artículo"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
