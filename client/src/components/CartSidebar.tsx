import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./CartItem";

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
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

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
              </ScrollArea>

              <div className="border-t p-4 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span data-testid="text-subtotal">${subtotal.toLocaleString()}</span>
                  </div>
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
