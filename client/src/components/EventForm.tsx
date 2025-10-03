import { Upload, Plus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface Zone {
  id: string;
  name: string;
  price: number;
  capacity: number;
  hasSeats: boolean;
}

interface EventFormProps {
  onSubmit?: (data: any) => void;
}

export function EventForm({ onSubmit }: EventFormProps) {
  const [zones, setZones] = useState<Zone[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const addZone = () => {
    setZones([
      ...zones,
      {
        id: `zone-${Date.now()}`,
        name: "",
        price: 0,
        capacity: 0,
        hasSeats: false,
      },
    ]);
  };

  const removeZone = (id: string) => {
    setZones(zones.filter((z) => z.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit?.({}); }} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Información Básica</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="event-name">Nombre del Evento</Label>
            <Input id="event-name" placeholder="Ej: Festival de Rock 2024" data-testid="input-event-name" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="event-date">Fecha</Label>
              <Input id="event-date" type="datetime-local" data-testid="input-event-date" />
            </div>
            <div>
              <Label htmlFor="event-category">Categoría</Label>
              <Select>
                <SelectTrigger id="event-category" data-testid="select-event-category">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concierto">Concierto</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="teatro">Teatro</SelectItem>
                  <SelectItem value="deportes">Deportes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="event-description">Descripción</Label>
            <Textarea
              id="event-description"
              placeholder="Describe el evento..."
              rows={4}
              data-testid="textarea-event-description"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Venue e Información</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="venue-name">Nombre del Venue</Label>
            <Input id="venue-name" placeholder="Ej: Estadio Nacional" data-testid="input-venue-name" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="venue-city">Ciudad</Label>
              <Input id="venue-city" placeholder="Ciudad de México" data-testid="input-venue-city" />
            </div>
            <div>
              <Label htmlFor="venue-capacity">Capacidad Total</Label>
              <Input id="venue-capacity" type="number" placeholder="5000" data-testid="input-venue-capacity" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Zonas</h3>
          <Button type="button" onClick={addZone} size="sm" data-testid="button-add-zone">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Zona
          </Button>
        </div>

        <div className="space-y-3">
          {zones.map((zone, index) => (
            <Card key={zone.id} className="p-4 bg-muted/50" data-testid={`card-zone-form-${index}`}>
              <div className="flex items-start gap-3">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Input placeholder="Nombre zona" data-testid={`input-zone-name-${index}`} />
                  <Input type="number" placeholder="Precio" data-testid={`input-zone-price-${index}`} />
                  <Input type="number" placeholder="Capacidad" data-testid={`input-zone-capacity-${index}`} />
                  <Select>
                    <SelectTrigger data-testid={`select-zone-type-${index}`}>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seated">Con asiento</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeZone(zone.id)}
                  data-testid={`button-remove-zone-${index}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}

          {zones.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay zonas agregadas. Haz clic en "Agregar Zona" para comenzar.
            </p>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Imágenes del Evento</h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate">
            <input
              type="file"
              id="event-images"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="event-images" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Haz clic para subir imágenes o arrastra aquí
              </p>
            </label>
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden" data-testid={`img-preview-${index}`}>
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => setImagePreviews(imagePreviews.filter((_, i) => i !== index))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" data-testid="button-cancel-event">
          Cancelar
        </Button>
        <Button type="submit" data-testid="button-save-event">
          Guardar Evento
        </Button>
      </div>
    </form>
  );
}
