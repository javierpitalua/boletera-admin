import { EventCard } from "../EventCard";
import concertImage from "@assets/generated_images/Concert_crowd_hero_image_7c247a60.png";

export default function EventCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <EventCard
        id="1"
        image={concertImage}
        title="Festival de Rock en Vivo 2024"
        date="15 Nov 2024, 8:00 PM"
        venue="Estadio Nacional"
        location="Ciudad de México"
        priceFrom={850}
        category="Concierto"
        onViewDetails={(id) => console.log("View details:", id)}
      />
    </div>
  );
}
