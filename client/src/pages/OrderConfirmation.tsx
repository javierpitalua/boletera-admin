import { useLocation } from "wouter";
import { CheckCircle, Download, Home, Mail, Ticket, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ConfirmationItem {
  id: string;
  eventName: string;
  zoneName: string;
  price: number;
  quantity: number;
  type?: 'ticket' | 'item';
  itemName?: string;
}

export default function OrderConfirmation() {
  const [, setLocation] = useLocation();

  // Datos mock de la compra (en producción vendrían del estado global)
  const mockItems: ConfirmationItem[] = [
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

  const orderNumber = "ORD-" + Date.now().toString().slice(-8);
  const purchaseDate = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const tickets = mockItems.filter(item => item.type !== 'item');
  const additionalItems = mockItems.filter(item => item.type === 'item');
  
  const totalTickets = tickets.reduce((sum, item) => sum + item.quantity, 0);
  const ticketsSubtotal = tickets.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemsSubtotal = additionalItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = ticketsSubtotal + itemsSubtotal;
  
  const discount = subtotal * 0.15;
  const subtotalAfterDiscount = subtotal - discount;
  const serviceFee = subtotalAfterDiscount * 0.1;
  const total = subtotalAfterDiscount + serviceFee;

  const handleDownloadTickets = () => {
    console.log("Downloading tickets as PDF...");
    alert("Descarga de boletos iniciada (funcionalidad simulada)");
  };

  const handleGoHome = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Mensaje de Éxito */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-chart-2/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-chart-2" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-success-title">
                ¡Compra Exitosa!
              </h1>
              <p className="text-lg text-muted-foreground">
                Gracias por tu compra. Tu pedido ha sido confirmado.
              </p>
            </div>

            <Badge variant="outline" className="text-sm px-4 py-2">
              <span className="text-muted-foreground">Número de Orden:</span>
              <span className="font-mono ml-2" data-testid="text-order-number">{orderNumber}</span>
            </Badge>
          </div>

          {/* Confirmación de Email */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">
                    Confirmación Enviada
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Hemos enviado un correo electrónico de confirmación con tus boletos adjuntos en formato PDF. 
                    Revisa tu bandeja de entrada y carpeta de spam.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalles de la Compra */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles de tu Compra</CardTitle>
              <p className="text-sm text-muted-foreground" data-testid="text-purchase-date">
                {purchaseDate}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Boletos Adquiridos */}
              {tickets.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    Boletos Adquiridos ({totalTickets})
                  </h3>
                  <div className="space-y-2">
                    {tickets.map((item) => (
                      <Card key={item.id} className="bg-muted/30">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-semibold" data-testid={`confirmation-ticket-${item.id}`}>
                                {item.eventName}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.zoneName}
                              </p>
                              <Badge variant="outline" className="mt-2">
                                Cantidad: {item.quantity}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ${(item.price * item.quantity).toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ${item.price.toLocaleString()} c/u
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Artículos Adicionales */}
              {additionalItems.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Artículos Adicionales
                    </h3>
                    <div className="space-y-2">
                      {additionalItems.map((item) => (
                        <div key={item.id} className="flex justify-between p-3 bg-muted/30 rounded-lg" data-testid={`confirmation-item-${item.id}`}>
                          <div className="flex-1">
                            <p className="font-medium">{item.itemName || item.zoneName}</p>
                            <p className="text-sm text-muted-foreground">
                              Cantidad: {item.quantity}
                            </p>
                          </div>
                          <span className="font-semibold">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Resumen de Pago */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-confirmation-subtotal">${subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-chart-2">
                  <span>Descuento (15%)</span>
                  <span data-testid="text-confirmation-discount">-${discount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Cargo por servicio (10%)</span>
                  <span data-testid="text-confirmation-fee">${serviceFee.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total Pagado</span>
                  <span className="text-primary" data-testid="text-confirmation-total">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Button
              size="lg"
              onClick={handleDownloadTickets}
              className="w-full"
              data-testid="button-download-tickets"
            >
              <Download className="h-5 w-5 mr-2" />
              Descargar Boletos (PDF)
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleGoHome}
              className="w-full"
              data-testid="button-go-home"
            >
              <Home className="h-5 w-5 mr-2" />
              Volver al Inicio
            </Button>
          </div>

          {/* Información Adicional */}
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="text-sm text-center space-y-2">
                <p className="font-medium">
                  ¿Necesitas ayuda?
                </p>
                <p className="text-muted-foreground">
                  Si tienes alguna pregunta sobre tu compra, contáctanos en{" "}
                  <a href="mailto:soporte@ticketmaster.com" className="text-primary hover:underline">
                    soporte@ticketmaster.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
