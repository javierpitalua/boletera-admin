import { useState } from "react";
import { X, ShoppingBag, Tag, Ticket, Trash2, AlertCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./CartItem";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

interface CartItemData {
  id: string;
  eventName: string;
  zoneName: string;
  price: number;
  quantity: number;
  image?: string;
  type?: 'ticket' | 'item';
  itemName?: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  items: CartItemData[];
  onClose: () => void;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
  onClearCart?: () => void;
  onLoginClick?: () => void;
}

export function CartSidebar({
  isOpen,
  items,
  onClose,
  onQuantityChange,
  onRemove,
  onCheckout,
  onClearCart,
  onLoginClick,
}: CartSidebarProps) {
  const { isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  // Cupones simulados para testing
  const MOCK_COUPONS = {
    'DESCUENTO15': { discount: 0.15, type: 'percentage' as const },
    'VERANO2024': { discount: 0.20, type: 'percentage' as const },
    'PRIMERACOMPRA': { discount: 0.25, type: 'percentage' as const },
    'AHORRA100': { discount: 100, type: 'fixed' as const },
    'VIP50': { discount: 50, type: 'fixed' as const },
  };

  const MAX_TICKETS = 8;

  // Separar boletos de artículos adicionales
  const tickets = items.filter(item => item.type !== 'item');
  const additionalItems = items.filter(item => item.type === 'item');
  
  const totalTickets = tickets.reduce((sum, item) => sum + item.quantity, 0);
  const ticketsSubtotal = tickets.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemsSubtotal = additionalItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = ticketsSubtotal + itemsSubtotal;
  
  const discount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? subtotal * appliedCoupon.discount 
      : appliedCoupon.discount
    : 0;
  const subtotalAfterDiscount = subtotal - discount;
  const serviceFee = subtotalAfterDiscount * 0.1;
  const total = subtotalAfterDiscount + serviceFee;

  const handleApplyCoupon = () => {
    setCouponError("");
    const upperCode = couponCode.trim().toUpperCase();
    
    if (!upperCode) {
      setCouponError("Ingresa un código de cupón");
      return;
    }

    // Simular validación de cupón
    const coupon = MOCK_COUPONS[upperCode as keyof typeof MOCK_COUPONS];
    
    if (coupon) {
      setAppliedCoupon({
        code: upperCode,
        discount: coupon.discount,
        type: coupon.type,
      });
      setCouponCode("");
    } else {
      setCouponError("Cupón inválido o expirado");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const handleClearCart = () => {
    if (onClearCart) {
      onClearCart();
      setAppliedCoupon(null);
      setCouponCode("");
      setCouponError("");
    }
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
          <div className="p-4 border-b space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-semibold" data-testid="text-cart-title">
                  Carrito de Compras
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-cart">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {items.length > 0 && (
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="gap-1">
                  <Ticket className="h-3 w-3" />
                  <span data-testid="text-ticket-count">
                    {totalTickets} / {MAX_TICKETS} boletos
                  </span>
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-destructive hover:text-destructive gap-1"
                  data-testid="button-clear-cart"
                >
                  <Trash2 className="h-4 w-4" />
                  Vaciar carrito
                </Button>
              </div>
            )}
          </div>

          {!isAuthenticated ? (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div className="max-w-xs space-y-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                  <LogIn className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Inicia sesión para continuar</h3>
                  <p className="text-sm text-muted-foreground" data-testid="text-login-required">
                    Inicia sesión para agregar boletos o artículos a tu carrito
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    onClose();
                    onLoginClick?.();
                  }}
                  className="w-full"
                  data-testid="button-cart-login"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </div>
            </div>
          ) : items.length === 0 ? (
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
                  {/* Boletos */}
                  {tickets.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                        Boletos
                      </h3>
                      {tickets.map((item) => (
                        <CartItem
                          key={item.id}
                          {...item}
                          onQuantityChange={onQuantityChange}
                          onRemove={onRemove}
                        />
                      ))}
                    </div>
                  )}

                  {/* Artículos Adicionales */}
                  {additionalItems.length > 0 && (
                    <>
                      {tickets.length > 0 && <Separator />}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                          Artículos Adicionales
                        </h3>
                        {additionalItems.map((item) => (
                          <CartItem
                            key={item.id}
                            {...item}
                            onQuantityChange={onQuantityChange}
                            onRemove={onRemove}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  <Separator />

                  {/* Cupón de Descuento */}
                  <div className="space-y-2">
                    <Label htmlFor="coupon-code" className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Cupón de Descuento
                    </Label>
                    {appliedCoupon ? (
                      <div className="flex items-center gap-2 p-3 bg-chart-2/10 border border-chart-2/20 rounded-lg">
                        <Tag className="h-4 w-4 text-chart-2" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-chart-2">
                            {appliedCoupon.code}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {appliedCoupon.type === 'percentage' 
                              ? `${(appliedCoupon.discount * 100).toFixed(0)}% de descuento`
                              : `$${appliedCoupon.discount.toLocaleString()} de descuento`
                            }
                          </p>
                        </div>
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
                      <>
                        <div className="flex gap-2">
                          <Input
                            id="coupon-code"
                            placeholder="Ingresa código"
                            value={couponCode}
                            onChange={(e) => {
                              setCouponCode(e.target.value);
                              setCouponError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleApplyCoupon();
                              }
                            }}
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
                        {couponError && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription data-testid="text-coupon-error">
                              {couponError}
                            </AlertDescription>
                          </Alert>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Prueba: DESCUENTO15, VERANO2024, AHORRA100
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </ScrollArea>

              <div className="border-t p-4 space-y-3">
                <div className="space-y-2 text-sm">
                  {/* Desglose por tipo */}
                  {tickets.length > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Boletos ({totalTickets})</span>
                      <span data-testid="text-tickets-subtotal">
                        ${ticketsSubtotal.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  {additionalItems.length > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Artículos adicionales</span>
                      <span data-testid="text-items-subtotal">
                        ${itemsSubtotal.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span data-testid="text-subtotal">${subtotal.toLocaleString()}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-chart-2">
                      <span>
                        Descuento {appliedCoupon.type === 'percentage' 
                          ? `(${(appliedCoupon.discount * 100).toFixed(0)}%)`
                          : ''
                        }
                      </span>
                      <span data-testid="text-discount">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted-foreground">
                    <span>Cargo por servicio (10%)</span>
                    <span data-testid="text-service-fee">${serviceFee.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold pt-1">
                    <span>Total a Pagar</span>
                    <span className="text-primary" data-testid="text-total">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={onCheckout} 
                  data-testid="button-checkout"
                >
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
