import { QRTicket } from "../QRTicket";

export default function QRTicketExample() {
  return (
    <div className="p-4">
      <QRTicket
        ticketId="TKT-2024-ABC123XYZ"
        eventName="Festival de Rock en Vivo 2024"
        eventDate="15 Nov 2024, 8:00 PM"
        venue="Estadio Nacional, Ciudad de México"
        zoneName="VIP"
        seatNumber="A15"
        holderName="Juan Pérez"
        onDownload={() => console.log("Download ticket")}
        onShare={() => console.log("Share ticket")}
      />
    </div>
  );
}
