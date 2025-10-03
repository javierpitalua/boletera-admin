import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartSidebar } from "../CartSidebar";
import concertImage from "@assets/generated_images/Concert_crowd_hero_image_7c247a60.png";

const mockItems = [
  {
    id: "1",
    eventName: "Festival de Rock en Vivo 2024",
    zoneName: "Zona VIP",
    price: 2500,
    quantity: 2,
    image: concertImage,
  },
  {
    id: "2",
    eventName: "Festival de Rock en Vivo 2024",
    zoneName: "Zona General",
    price: 850,
    quantity: 1,
    image: concertImage,
  },
];

export default function CartSidebarExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>Abrir Carrito</Button>
      <CartSidebar
        isOpen={isOpen}
        items={mockItems}
        onClose={() => setIsOpen(false)}
        onQuantityChange={(id, qty) => console.log("Quantity:", id, qty)}
        onRemove={(id) => console.log("Remove:", id)}
        onCheckout={() => console.log("Checkout")}
      />
    </div>
  );
}
