import { useState } from "react";
import { ProductCard } from "../ProductCard";

export default function ProductCardExample() {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="p-4 max-w-sm">
      <ProductCard
        id="1"
        name="Combo Palomitas + Refresco"
        description="Palomitas grandes + refresco de 32oz a elegir"
        price={150}
        category="food"
        quantity={quantity}
        onQuantityChange={(id, qty) => {
          setQuantity(qty);
          console.log("Product quantity:", id, qty);
        }}
      />
    </div>
  );
}
