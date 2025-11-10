import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import CoordinatorDashboard from "@/pages/CoordinatorDashboard";
import EventPreview from "@/pages/EventPreview";

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => <Redirect to="/login" />}
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/coordinator">
        {() => (
          <ProtectedRoute>
            <CoordinatorDashboard />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/preview/:id">
        {() => (
          <ProtectedRoute>
            <EventPreview />
          </ProtectedRoute>
        )}
      </Route>
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
