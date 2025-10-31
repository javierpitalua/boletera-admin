import { useState } from "react";
import { Plus, Edit, Trash2, Tag, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  activityId: string;
  status: "active" | "inactive";
}

interface CouponsTabProps {
  activities: Activity[];
  coupons: Coupon[];
  onUpdate: (coupons: Coupon[]) => void;
}

export function CouponsTab({ activities, coupons, onUpdate }: CouponsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState<{
    code: string;
    type: "percentage" | "fixed";
    value: number;
    expiryDate: string;
    usageLimit: number;
    activityId: string;
  }>({
    code: "",
    type: "percentage",
    value: 0,
    expiryDate: "",
    usageLimit: 100,
    activityId: "",
  });

  const handleOpenDialog = (coupon?: Coupon) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        expiryDate: coupon.expiryDate,
        usageLimit: coupon.usageLimit,
        activityId: coupon.activityId,
      });
    } else {
      setEditingCoupon(null);
      setFormData({
        code: "",
        type: "percentage",
        value: 0,
        expiryDate: "",
        usageLimit: 100,
        activityId: activities[0]?.id || "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingCoupon) {
      onUpdate(
        coupons.map((c) =>
          c.id === editingCoupon.id
            ? { ...c, ...formData, status: c.usageCount >= formData.usageLimit ? 'inactive' : 'active' }
            : c
        )
      );
    } else {
      onUpdate([
        ...coupons,
        {
          id: `coupon-${Date.now()}`,
          ...formData,
          usageCount: 0,
          status: "active",
        },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar este cupón?")) {
      onUpdate(coupons.filter((c) => c.id !== id));
    }
  };

  const getActivityName = (id: string) => {
    return activities.find((a) => a.id === id)?.name || "Todas las actividades";
  };

  const activeCoupons = coupons.filter((c) => c.status === "active");
  const inactiveCoupons = coupons.filter((c) => c.status === "inactive");

  if (activities.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Necesitas al menos una actividad para crear cupones
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Cupones de Descuento</h3>
          <p className="text-sm text-muted-foreground">
            Gestiona códigos promocionales para tu evento
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} data-testid="button-add-coupon">
          <Plus className="h-4 w-4 mr-2" />
          Crear Cupón
        </Button>
      </div>

      {coupons.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Tag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No hay cupones creados
            </p>
            <Button
              variant="outline"
              onClick={() => handleOpenDialog()}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Cupón
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Cupones Activos */}
          {activeCoupons.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                Cupones Activos
                <Badge variant="default">{activeCoupons.length}</Badge>
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {activeCoupons.map((coupon) => (
                  <Card key={coupon.id} data-testid={`card-coupon-${coupon.id}`}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Tag className="h-4 w-4 text-primary" />
                              <code className="font-mono font-bold text-lg">
                                {coupon.code}
                              </code>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {getActivityName(coupon.activityId)}
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                            Activo
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary">
                              {coupon.type === "percentage"
                                ? `${coupon.value}%`
                                : `$${coupon.value}`}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              de descuento
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Usos: {coupon.usageCount} / {coupon.usageLimit}</span>
                              <span>{Math.round((coupon.usageCount / coupon.usageLimit) * 100)}%</span>
                            </div>
                            <Progress
                              value={(coupon.usageCount / coupon.usageLimit) * 100}
                              className="h-2"
                            />
                          </div>

                          <div className="text-xs text-muted-foreground">
                            Vence: {new Date(coupon.expiryDate).toLocaleDateString('es-MX')}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(coupon)}
                            className="flex-1"
                            data-testid={`button-edit-coupon-${coupon.id}`}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(coupon.id)}
                            className="flex-1 text-destructive"
                            data-testid={`button-delete-coupon-${coupon.id}`}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Cupones Inactivos */}
          {inactiveCoupons.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                Cupones Inactivos
                <Badge variant="outline">{inactiveCoupons.length}</Badge>
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {inactiveCoupons.map((coupon) => (
                  <Card key={coupon.id} className="opacity-60" data-testid={`card-coupon-${coupon.id}`}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Tag className="h-4 w-4" />
                              <code className="font-mono font-bold text-lg">
                                {coupon.code}
                              </code>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {getActivityName(coupon.activityId)}
                            </p>
                          </div>
                          <Badge variant="outline">
                            Inactivo
                          </Badge>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Límite alcanzado: {coupon.usageCount} / {coupon.usageLimit}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(coupon.id)}
                          className="w-full text-destructive"
                          data-testid={`button-delete-coupon-${coupon.id}`}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dialog para agregar/editar cupón */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent data-testid="dialog-coupon">
          <DialogHeader>
            <DialogTitle>
              {editingCoupon ? "Editar Cupón" : "Crear Nuevo Cupón"}
            </DialogTitle>
            <DialogDescription>
              {editingCoupon
                ? "Modifica la configuración del cupón"
                : "Configura un nuevo código promocional"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coupon-code">Código del Cupón *</Label>
              <Input
                id="coupon-code"
                placeholder="DESCUENTO20"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                data-testid="input-coupon-code"
              />
              <p className="text-xs text-muted-foreground">
                El código debe ser único y fácil de recordar
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coupon-type">Tipo de Descuento *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger id="coupon-type" data-testid="select-coupon-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                    <SelectItem value="fixed">Monto Fijo ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coupon-value">
                  Valor {formData.type === "percentage" ? "(%)" : "(MXN)"} *
                </Label>
                <Input
                  id="coupon-value"
                  type="number"
                  min="0"
                  max={formData.type === "percentage" ? "100" : undefined}
                  step={formData.type === "percentage" ? "1" : "0.01"}
                  placeholder="0"
                  value={formData.value || ""}
                  onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                  data-testid="input-coupon-value"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coupon-activity">Actividad Relacionada *</Label>
              <Select
                value={formData.activityId}
                onValueChange={(value) => setFormData({ ...formData, activityId: value })}
              >
                <SelectTrigger id="coupon-activity" data-testid="select-coupon-activity">
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

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coupon-expiry">Fecha de Caducidad *</Label>
                <Input
                  id="coupon-expiry"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  data-testid="input-coupon-expiry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coupon-limit">Límite de Usos *</Label>
                <Input
                  id="coupon-limit"
                  type="number"
                  min="1"
                  placeholder="100"
                  value={formData.usageLimit || ""}
                  onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) || 0 })}
                  data-testid="input-coupon-limit"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                data-testid="button-cancel-coupon"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={
                  !formData.code ||
                  !formData.activityId ||
                  !formData.expiryDate ||
                  formData.value <= 0 ||
                  formData.usageLimit <= 0
                }
                data-testid="button-save-coupon"
              >
                {editingCoupon ? "Guardar Cambios" : "Crear Cupón"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
