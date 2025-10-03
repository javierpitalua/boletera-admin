import { EventForm } from "../EventForm";

export default function EventFormExample() {
  return (
    <div className="p-4 max-w-4xl">
      <EventForm onSubmit={(data) => console.log("Form submitted:", data)} />
    </div>
  );
}
