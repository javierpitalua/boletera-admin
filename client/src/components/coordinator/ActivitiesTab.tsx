import { useState } from "react";
import { Plus, Edit, Trash2, Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  location: string;
  date: string;
  startTime: string;
}

interface ActivitiesTabProps {
  activities: Activity[];
  onUpdate: (activities: Activity[]) => void;
}

export function ActivitiesTab({ activities, onUpdate }: ActivitiesTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    startTime: "",
  });

  const handleOpenDialog = (activity?: Activity) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        name: activity.name,
        location: activity.location,
        date: activity.date,
        startTime: activity.startTime,
      });
    } else {
      setEditingActivity(null);
      setFormData({ name: "", location: "", date: "", startTime: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingActivity) {
      onUpdate(
        activities.map((a) =>
          a.id === editingActivity.id ? { ...a, ...formData } : a
        )
      );
    } else {
      onUpdate([
        ...activities,
        {
          id: `act-${Date.now()}`,
          ...formData,
        },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar esta actividad?")) {
      onUpdate(activities.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Actividades del Evento</h3>
          <p className="text-sm text-muted-foreground">
            Configura las actividades que formarán parte de tu evento
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} data-testid="button-add-activity">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Actividad
        </Button>
      </div>

      {activities.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No hay actividades registradas
            </p>
            <Button
              variant="outline"
              onClick={() => handleOpenDialog()}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Primera Actividad
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {activities.map((activity) => (
            <Card key={activity.id} data-testid={`card-activity-${activity.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-lg">{activity.name}</h4>
                    
                    <div className="grid sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(activity.date).toLocaleDateString('es-MX')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{activity.startTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(activity)}
                      data-testid={`button-edit-activity-${activity.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(activity.id)}
                      className="text-destructive"
                      data-testid={`button-delete-activity-${activity.id}`}
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

      {/* Dialog para agregar/editar actividad */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent data-testid="dialog-activity">
          <DialogHeader>
            <DialogTitle>
              {editingActivity ? "Editar Actividad" : "Nueva Actividad"}
            </DialogTitle>
            <DialogDescription>
              {editingActivity
                ? "Modifica la información de la actividad"
                : "Completa los datos de la nueva actividad"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="activity-name">Nombre de la Actividad *</Label>
              <Input
                id="activity-name"
                placeholder="Ej: Concierto Apertura"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                data-testid="input-activity-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity-location">Ubicación *</Label>
              <Input
                id="activity-location"
                placeholder="Ej: Escenario Principal"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                data-testid="input-activity-location"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="activity-date">Fecha *</Label>
                <Input
                  id="activity-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  data-testid="input-activity-date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity-time">Hora de Inicio *</Label>
                <Input
                  id="activity-time"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  data-testid="input-activity-time"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                data-testid="button-cancel-activity"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.name || !formData.location || !formData.date || !formData.startTime}
                data-testid="button-save-activity"
              >
                {editingActivity ? "Guardar Cambios" : "Agregar Actividad"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
