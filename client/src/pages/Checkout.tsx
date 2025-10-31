import { useState } from "react";
import { useLocation } from "wouter";
import { CreditCard, Lock, ArrowLeft, Calendar, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CheckoutItem {
  id: string;
  eventName: string;
  zoneName: string;
  price: number;
  quantity: number;
  type?: 'ticket' | 'item';
  itemName?: string;
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  // Datos mock del carrito (en producción vendrían del estado global)
  const mockItems: CheckoutItem[] = [
    {
      id: "1",
      eventName: "Festival de Rock en Vivo 2024",
      zoneName: "Zona VIP",
      price: 2500,
      quantity: 2,
      type: 'ticket',
    },
    {
      id: "2",
      eventName: "Festival de Rock en Vivo 2024",
      zoneName: "General Centro",
      price: 850,
      quantity: 3,
      type: 'ticket',
    },
    {
      id: "item-1",
      eventName: "Festival de Rock en Vivo 2024",
      zoneName: "Combo Familiar",
      itemName: "Combo Familiar",
      price: 350,
      quantity: 1,
      type: 'item',
    },
  ];

  const appliedDiscount = { code: "DESCUENTO15", amount: 0.15, type: 'percentage' as const };

  const tickets = mockItems.filter(item => item.type !== 'item');
  const additionalItems = mockItems.filter(item => item.type === 'item');
  
  const totalTickets = tickets.reduce((sum, item) => sum + item.quantity, 0);
  const ticketsSubtotal = tickets.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemsSubtotal = additionalItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = ticketsSubtotal + itemsSubtotal;
  
  const discount = appliedDiscount 
    ? appliedDiscount.type === 'percentage' 
      ? subtotal * appliedDiscount.amount 
      : appliedDiscount.amount
    : 0;
  
  const subtotalAfterDiscount = subtotal - discount;
  const serviceFee = subtotalAfterDiscount * 0.1;
  const total = subtotalAfterDiscount + serviceFee;

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted.slice(0, 19));
  };

  const handleExpiryChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      setExpiryDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setExpiryDate(cleaned);
    }
  };

  const handleCvcChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setCvc(cleaned.slice(0, 4));
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simular proceso de pago
    setTimeout(() => {
      setIsProcessing(false);
      setLocation('/confirmation');
    }, 2500);
  };

  const isFormValid = cardName.trim() && cardNumber.length >= 15 && expiryDate.length === 5 && cvc.length >= 3;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation('/')}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Finalizar Compra</h1>
              <p className="text-sm text-muted-foreground">
                Completa tu pago de forma segura
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resumen del Pedido */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Resumen del Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Boletos */}
                {tickets.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                      Boletos ({totalTickets})
                    </h3>
                    {tickets.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm" data-testid={`order-ticket-${item.id}`}>
                        <div className="flex-1">
                          <p className="font-medium">{item.zoneName}</p>
                          <p className="text-xs text-muted-foreground">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Artículos Adicionales */}
                {additionalItems.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                        Artículos Adicionales
                      </h3>
                      {additionalItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm" data-testid={`order-item-${item.id}`}>
                          <div className="flex-1">
                            <p className="font-medium">{item.itemName || item.zoneName}</p>
                            <p className="text-xs text-muted-foreground">
                              Cantidad: {item.quantity}
                            </p>
                          </div>
                          <span className="font-semibold">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <Separator />

                {/* Totales */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span data-testid="text-checkout-subtotal">${subtotal.toLocaleString()}</span>
                  </div>

                  {appliedDiscount && (
                    <div className="flex justify-between items-center text-chart-2">
                      <span className="flex items-center gap-2">
                        Descuento
                        <Badge variant="outline" className="text-xs">
                          {appliedDiscount.code}
                        </Badge>
                      </span>
                      <span data-testid="text-checkout-discount">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted-foreground">
                    <span>Cargo por servicio (10%)</span>
                    <span data-testid="text-checkout-fee">${serviceFee.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>Total a Pagar</span>
                    <span className="text-primary" data-testid="text-checkout-total">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seguridad */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Pago 100% Seguro</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tus datos están protegidos con encriptación SSL de nivel bancario
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulario de Pago */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Información de Pago
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Nombre del Titular */}
                <div className="space-y-2">
                  <Label htmlFor="card-name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nombre del Titular
                  </Label>
                  <Input
                    id="card-name"
                    placeholder="Como aparece en la tarjeta"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    disabled={isProcessing}
                    data-testid="input-card-name"
                  />
                </div>

                {/* Número de Tarjeta */}
                <div className="space-y-2">
                  <Label htmlFor="card-number" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Número de Tarjeta
                  </Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    disabled={isProcessing}
                    data-testid="input-card-number"
                  />
                </div>

                {/* Fecha de Vencimiento y CVC */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Fecha de Vencimiento
                    </Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                      value={expiryDate}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      disabled={isProcessing}
                      data-testid="input-expiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvc" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Código CVC
                    </Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => handleCvcChange(e.target.value)}
                      disabled={isProcessing}
                      data-testid="input-cvc"
                    />
                  </div>
                </div>

                <Separator />

                {/* Botón de Pago */}
                <div className="space-y-4">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePayment}
                    disabled={!isFormValid || isProcessing}
                    data-testid="button-pay"
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Procesando Pago...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Pagar Ahora - ${total.toFixed(2)}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Al completar tu compra, aceptas nuestros términos y condiciones
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
