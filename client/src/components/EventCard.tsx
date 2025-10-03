import { Calendar, MapPin, Ticket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  id: string;
  image: string;
  title: string;
  date: string;
  venue: string;
  location: string;
  priceFrom: number;
  category?: string;
  onViewDetails?: (id: string) => void;
}

export function EventCard({
  id,
  image,
  title,
  date,
  venue,
  location,
  priceFrom,
  category,
  onViewDetails,
}: EventCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-transform cursor-pointer group" onClick={() => onViewDetails?.(id)} data-testid={`card-event-${id}`}>
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {category && (
          <Badge className="absolute top-3 left-3" data-testid={`badge-category-${id}`}>
            {category}
          </Badge>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-serif font-semibold text-white line-clamp-2 mb-1" data-testid={`text-title-${id}`}>
            {title}
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span data-testid={`text-date-${id}`}>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1" data-testid={`text-venue-${id}`}>
              {venue} · {location}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t gap-2">
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-primary" />
            <span className="font-semibold" data-testid={`text-price-${id}`}>
              Desde ${priceFrom.toLocaleString()}
            </span>
          </div>
          <Button size="sm" data-testid={`button-tickets-${id}`}>
            Ver Boletos
          </Button>
        </div>
      </div>
    </Card>
  );
}
