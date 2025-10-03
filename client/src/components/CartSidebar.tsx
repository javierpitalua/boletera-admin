import { useState } from "react";
import { X, ShoppingBag, Tag, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./CartItem";
import { Label } from "@/components/ui/label";

interface CartItemData {
  id: string;
  eventName: string;
  zoneName: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  items: CartItemData[];
  onClose: () => void;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
}

export function CartSidebar({
  isOpen,
  items,
  onClose,
  onQuantityChange,
  onRemove,
  onCheckout,
}: CartSidebarProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [reservationCode, setReservationCode] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const subtotalAfterDiscount = subtotal - discount;
  const serviceFee = subtotalAfterDiscount * 0.1;
  const total = subtotalAfterDiscount + serviceFee;

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // todo: remove mock functionality
      setAppliedCoupon({
        code: couponCode,
        discount: 0.15, // 15% descuento de ejemplo
      });
      console.log("Coupon applied:", couponCode);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
        data-testid="overlay-cart"
      />

      <div
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 shadow-xl transition-transform"
        data-testid="sidebar-cart"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-semibold" data-testid="text-cart-title">
                Carrito ({items.length})
              </h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-cart">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground" data-testid="text-empty-cart">
                  Tu carrito está vacío
                </p>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        {...item}
                        onQuantityChange={onQuantityChange}
                        onRemove={onRemove}
                      />
                    ))}
                  </div>

                  <div className="pt-4 border-t space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="coupon-code" className="text-sm font-medium flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Cupón de Descuento
                      </Label>
                      {appliedCoupon ? (
                        <div className="flex items-center gap-2 p-3 bg-chart-2/10 border border-chart-2/20 rounded-lg">
                          <Tag className="h-4 w-4 text-chart-2" />
                          <span className="flex-1 text-sm font-medium text-chart-2">
                            {appliedCoupon.code} aplicado
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveCoupon}
                            data-testid="button-remove-coupon"
                          >
                            Quitar
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            id="coupon-code"
                            placeholder="Ingresa tu cupón"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            data-testid="input-coupon"
                          />
                          <Button
                            onClick={handleApplyCoupon}
                            disabled={!couponCode.trim()}
                            data-testid="button-apply-coupon"
                          >
                            Aplicar
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reservation-code" className="text-sm font-medium flex items-center gap-2">
                        <Ticket className="h-4 w-4" />
                        Clave de Apartado (Opcional)
                      </Label>
                      <Input
                        id="reservation-code"
                        placeholder="Ingresa clave de reserva"
                        value={reservationCode}
                        onChange={(e) => setReservationCode(e.target.value)}
                        data-testid="input-reservation"
                      />
                      <p className="text-xs text-muted-foreground">
                        Si realizaste un anticipo, ingresa tu clave aquí
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="border-t p-4 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span data-testid="text-subtotal">${subtotal.toLocaleString()}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-chart-2">
                      <span>Descuento ({(appliedCoupon.discount * 100).toFixed(0)}%)</span>
                      <span data-testid="text-discount">-${discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cargo por servicio</span>
                    <span data-testid="text-service-fee">${serviceFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-base font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span data-testid="text-total">${total.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={onCheckout} data-testid="button-checkout">
                  Proceder al Pago
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
