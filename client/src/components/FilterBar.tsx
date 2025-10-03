import { Calendar, MapPin, DollarSign, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FilterBarProps {
  onCategoryChange?: (category: string) => void;
  onLocationChange?: (location: string) => void;
  onDateChange?: (date: string) => void;
}

export function FilterBar({ onCategoryChange, onLocationChange, onDateChange }: FilterBarProps) {
  return (
    <div className="bg-card border-y py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4" />
            <span>Filtros:</span>
          </div>

          <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[180px]" data-testid="select-category">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="concierto">Conciertos</SelectItem>
              <SelectItem value="festival">Festivales</SelectItem>
              <SelectItem value="teatro">Teatro</SelectItem>
              <SelectItem value="deportes">Deportes</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-[250px]">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ubicación"
              onChange={(e) => onLocationChange?.(e.target.value)}
              data-testid="input-location"
            />
          </div>

          <div className="flex items-center gap-2 min-w-[200px] max-w-[250px]">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              onChange={(e) => onDateChange?.(e.target.value)}
              data-testid="input-date"
            />
          </div>

          <Button variant="outline" className="ml-auto" data-testid="button-clear-filters">
            Limpiar
          </Button>
        </div>
      </div>
    </div>
  );
}
