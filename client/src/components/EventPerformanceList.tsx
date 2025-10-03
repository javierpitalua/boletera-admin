import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Performance {
  id: string;
  date: string;
  time: string;
  city: string;
  state: string;
  venue: string;
}

interface EventPerformanceListProps {
  performances: Performance[];
  onFindTickets: (performanceId: string) => void;
}

export function EventPerformanceList({
  performances,
  onFindTickets,
}: EventPerformanceListProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString("es-MX", { month: "short" });
    return { day, month: month.charAt(0).toUpperCase() + month.slice(1) };
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Fechas y Lugares</h2>
        <p className="text-muted-foreground">
          Selecciona la fecha y lugar de tu preferencia
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Fecha</TableHead>
              <TableHead className="w-28">Hora</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Recinto</TableHead>
              <TableHead className="w-40"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performances.map((performance) => {
              const { day, month } = formatDate(performance.date);
              return (
                <TableRow
                  key={performance.id}
                  data-testid={`row-performance-${performance.id}`}
                  className="hover-elevate"
                >
                  <TableCell>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold">{day}</span>
                      <span className="text-xs text-muted-foreground uppercase">
                        {month}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{performance.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{performance.city}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{performance.state}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{performance.venue}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onFindTickets(performance.id)}
                      data-testid={`button-find-tickets-${performance.id}`}
                    >
                      Buscar Boletos
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
