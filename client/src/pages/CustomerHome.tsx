import { useState } from "react";
import { useLocation } from "wouter";
import { CustomerHeader } from "@/components/CustomerHeader";
import { HeroSection } from "@/components/HeroSection";
import { FilterBar } from "@/components/FilterBar";
import { EventCard } from "@/components/EventCard";
import { CartSidebar } from "@/components/CartSidebar";
import { AuthDialog } from "@/components/AuthDialog";
import concertImage from "@assets/generated_images/Concert_crowd_hero_image_7c247a60.png";
import theaterImage from "@assets/generated_images/Theater_venue_interior_9daf57bf.png";
import festivalImage from "@assets/generated_images/Festival_outdoor_event_02b067fb.png";
import jazzImage from "@assets/generated_images/Jazz_club_performance_717cc7eb.png";
import djImage from "@assets/generated_images/Electronic_DJ_nightclub_event_963ba7a0.png";
import stadiumImage from "@assets/generated_images/Stadium_concert_event_1c255895.png";

// todo: remove mock functionality
const mockEvents = [
  {
    id: "1",
    image: concertImage,
    title: "Festival de Rock en Vivo 2024",
    date: "15 Nov 2024, 8:00 PM",
    venue: "Estadio Nacional",
    location: "Ciudad de México",
    priceFrom: 850,
    category: "Concierto",
  },
  {
    id: "2",
    image: theaterImage,
    title: "Noche de Teatro Musical",
    date: "20 Nov 2024, 7:00 PM",
    venue: "Teatro Principal",
    location: "Guadalajara",
    priceFrom: 650,
    category: "Teatro",
  },
  {
    id: "3",
    image: festivalImage,
    title: "Festival EDM Summer",
    date: "25 Nov 2024, 4:00 PM",
    venue: "Parque Central",
    location: "Monterrey",
    priceFrom: 1200,
    category: "Festival",
  },
  {
    id: "4",
    image: jazzImage,
    title: "Jazz Night - Edición Especial",
    date: "28 Nov 2024, 9:00 PM",
    venue: "Club de Jazz",
    location: "Ciudad de México",
    priceFrom: 500,
    category: "Concierto",
  },
  {
    id: "5",
    image: djImage,
    title: "Electronic Music Festival",
    date: "2 Dic 2024, 10:00 PM",
    venue: "Warehouse District",
    location: "Tijuana",
    priceFrom: 900,
    category: "Festival",
  },
  {
    id: "6",
    image: stadiumImage,
    title: "Concierto Masivo 2024",
    date: "5 Dic 2024, 7:00 PM",
    venue: "Estadio Grande",
    location: "Puebla",
    priceFrom: 750,
    category: "Concierto",
  },
];

// todo: remove mock functionality
const mockCartItems = [
  {
    id: "1",
    eventName: "Festival de Rock en Vivo 2024",
    zoneName: "Zona VIP",
    price: 2500,
    quantity: 2,
    image: concertImage,
  },
];

export default function CustomerHome() {
  const [, setLocation] = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [cartItems, setCartItems] = useState(mockCartItems);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleViewEvent = (eventId: string) => {
    setLocation(`/event/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader
        cartItemCount={cartItems.length}
        onSearchChange={(value) => console.log("Search:", value)}
        onCartClick={() => setCartOpen(true)}
        onUserClick={() => setAuthOpen(true)}
      />

      <HeroSection onSearch={(query) => console.log("Hero search:", query)} />

      <FilterBar
        onCategoryChange={(cat) => console.log("Category:", cat)}
        onLocationChange={(loc) => console.log("Location:", loc)}
        onDateChange={(date) => console.log("Date:", date)}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Próximos Eventos
          </h2>
          <p className="text-muted-foreground">
            Descubre los mejores eventos cerca de ti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onViewDetails={handleViewEvent}
            />
          ))}
        </div>
      </main>

      <CartSidebar
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onCheckout={() => console.log("Checkout")}
      />

      <AuthDialog isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
