import { CartItem } from "../CartItem";
import concertImage from "@assets/generated_images/Concert_crowd_hero_image_7c247a60.png";

export default function CartItemExample() {
  return (
    <div className="p-4 max-w-md">
      <CartItem
        id="1"
        eventName="Festival de Rock en Vivo 2024"
        zoneName="Zona VIP"
        price={2500}
        quantity={2}
        image={concertImage}
        onQuantityChange={(id, qty) => console.log("Quantity changed:", id, qty)}
        onRemove={(id) => console.log("Remove:", id)}
      />
    </div>
  );
}
