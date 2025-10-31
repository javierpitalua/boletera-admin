import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";
import CustomerHome from "@/pages/CustomerHome";
import EventDetails from "@/pages/EventDetails";
import MyTickets from "@/pages/MyTickets";
import SeatSelection from "@/pages/SeatSelection";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminCreateEvent from "@/pages/AdminCreateEvent";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CustomerHome} />
      <Route path="/event/:id" component={EventDetails} />
      <Route path="/event/:eventId/seats/:performanceId" component={SeatSelection} />
      <Route path="/my-tickets" component={MyTickets} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/confirmation" component={OrderConfirmation} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/events/create" component={AdminCreateEvent} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
