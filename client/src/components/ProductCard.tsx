import { Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: "food" | "beverage" | "merchandise";
  quantity?: number;
  onQuantityChange?: (id: string, quantity: number) => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  category,
  quantity = 0,
  onQuantityChange,
}: ProductCardProps) {
  const categoryLabels = {
    food: "Comida",
    beverage: "Bebida",
    merchandise: "Mercancía",
  };

  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2" data-testid={`card-product-${id}`}>
      {image && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold line-clamp-1" data-testid={`text-product-name-${id}`}>
              {name}
            </h3>
            <Badge variant="secondary" data-testid={`badge-product-category-${id}`}>
              {categoryLabels[category]}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-product-description-${id}`}>
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold" data-testid={`text-product-price-${id}`}>
            ${price.toLocaleString()}
          </span>

          {quantity > 0 ? (
            <div className="flex items-center gap-1 border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onQuantityChange?.(id, Math.max(0, quantity - 1))}
                data-testid={`button-product-decrease-${id}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-3 font-medium" data-testid={`text-product-quantity-${id}`}>
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onQuantityChange?.(id, quantity + 1)}
                data-testid={`button-product-increase-${id}`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => onQuantityChange?.(id, 1)}
              data-testid={`button-add-product-${id}`}
            >
              Agregar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
