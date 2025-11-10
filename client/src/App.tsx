import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import CoordinatorDashboard from "@/pages/CoordinatorDashboard";
import EventPreview from "@/pages/EventPreview";

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => <Redirect to="/coordinator" />}
      </Route>
      <Route path="/coordinator" component={CoordinatorDashboard} />
      <Route path="/preview/:id" component={EventPreview} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
