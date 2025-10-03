import { EventPerformanceList } from "../EventPerformanceList";

const mockPerformances = [
  {
    id: "1",
    date: "2024-11-15",
    time: "8:00 PM",
    city: "Ciudad de México",
    state: "CDMX",
    venue: "Estadio Nacional",
  },
  {
    id: "2",
    date: "2024-11-22",
    time: "7:30 PM",
    city: "Guadalajara",
    state: "Jalisco",
    venue: "Arena VFG",
  },
  {
    id: "3",
    date: "2024-11-29",
    time: "9:00 PM",
    city: "Monterrey",
    state: "Nuevo León",
    venue: "Arena Monterrey",
  },
];

export default function EventPerformanceListExample() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <EventPerformanceList
        performances={mockPerformances}
        onFindTickets={(id) => console.log("Find tickets for:", id)}
      />
    </div>
  );
}
