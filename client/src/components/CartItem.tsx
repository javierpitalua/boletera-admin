import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CartItemProps {
  id: string;
  eventName: string;
  zoneName: string;
  price: number;
  quantity: number;
  image?: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export function CartItem({
  id,
  eventName,
  zoneName,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  return (
    <Card className="p-3" data-testid={`card-cart-item-${id}`}>
      <div className="flex gap-3">
        {image && (
          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
            <img src={image} alt={eventName} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h4 className="font-medium line-clamp-1 text-sm" data-testid={`text-item-event-${id}`}>
            {eventName}
          </h4>
          <p className="text-xs text-muted-foreground" data-testid={`text-item-zone-${id}`}>
            {zoneName}
          </p>

          <div className="flex items-center justify-between mt-2 gap-2">
            <div className="flex items-center gap-1 border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onQuantityChange?.(id, Math.max(1, quantity - 1))}
                data-testid={`button-decrease-${id}`}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="px-2 text-sm font-medium min-w-[2ch] text-center" data-testid={`text-quantity-${id}`}>
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onQuantityChange?.(id, quantity + 1)}
                data-testid={`button-increase-${id}`}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm" data-testid={`text-item-price-${id}`}>
                ${(price * quantity).toLocaleString()}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive"
                onClick={() => onRemove?.(id)}
                data-testid={`button-remove-${id}`}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
