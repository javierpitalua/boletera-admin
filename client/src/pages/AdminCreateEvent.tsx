import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/AdminSidebar";
import { EventForm } from "@/components/EventForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminCreateEvent() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar currentPage="events" onNavigate={(page) => console.log("Navigate:", page)} />

      <div className="flex-1 overflow-auto">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold font-serif">Crear Evento</h1>
                <p className="text-sm text-muted-foreground">
                  Completa la información del nuevo evento
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="p-6 max-w-6xl mx-auto">
          <EventForm onSubmit={(data) => console.log("Event created:", data)} />
        </main>
      </div>
    </div>
  );
}
