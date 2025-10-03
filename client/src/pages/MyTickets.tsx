import { useState } from "react";
import { CustomerHeader } from "@/components/CustomerHeader";
import { QRTicket } from "@/components/QRTicket";
import { AuthDialog } from "@/components/AuthDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyTickets() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader
        cartItemCount={0}
        onUserClick={() => setAuthOpen(true)}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mis Boletos</h1>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">
              Próximos
            </TabsTrigger>
            <TabsTrigger value="past" data-testid="tab-past">
              Pasados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <QRTicket
              ticketId="TKT-2024-ABC123XYZ"
              eventName="Festival de Rock en Vivo 2024"
              eventDate="15 Nov 2024, 8:00 PM"
              venue="Estadio Nacional, Ciudad de México"
              zoneName="VIP"
              seatNumber="A15"
              holderName="Juan Pérez"
              onDownload={() => console.log("Download")}
              onShare={() => console.log("Share")}
            />
          </TabsContent>

          <TabsContent value="past">
            <p className="text-center text-muted-foreground py-8">
              No tienes boletos de eventos pasados
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <AuthDialog isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
