import { QRCodeSVG } from "qrcode.react";
import { Download, Share2, Calendar, MapPin, Ticket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QRTicketProps {
  ticketId: string;
  eventName: string;
  eventDate: string;
  venue: string;
  zoneName: string;
  seatNumber?: string;
  holderName: string;
  onDownload?: () => void;
  onShare?: () => void;
}

export function QRTicket({
  ticketId,
  eventName,
  eventDate,
  venue,
  zoneName,
  seatNumber,
  holderName,
  onDownload,
  onShare,
}: QRTicketProps) {
  return (
    <Card className="max-w-md mx-auto overflow-hidden" data-testid="card-qr-ticket">
      <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold mb-1" data-testid="text-ticket-event">
              {eventName}
            </h2>
            <Badge variant="secondary" className="bg-white/20 text-white" data-testid="badge-ticket-zone">
              {zoneName} {seatNumber && `- Asiento ${seatNumber}`}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span data-testid="text-ticket-date">{eventDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span data-testid="text-ticket-venue">{venue}</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-card">
        <div className="bg-white p-4 rounded-lg mx-auto w-fit">
          <QRCodeSVG
            value={ticketId}
            size={200}
            level="H"
            includeMargin
          />
        </div>

        <div className="mt-4 text-center space-y-1">
          <p className="text-sm text-muted-foreground">ID de Boleto</p>
          <p className="font-mono text-sm font-semibold" data-testid="text-ticket-id">
            {ticketId}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Ticket className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Titular:</span>
            <span className="font-medium" data-testid="text-ticket-holder">
              {holderName}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onDownload}
              data-testid="button-download-ticket"
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onShare}
              data-testid="button-share-ticket"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
