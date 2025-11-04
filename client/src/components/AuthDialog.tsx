import { useState } from "react";
import { useLocation } from "wouter";
import { Mail, Lock, User, Phone, ArrowLeft, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = "login" | "register" | "forgot";

export function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();
  const { toast } = useToast();
  const [view, setView] = useState<AuthView>("login");
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (view === "login") {
      if (!formData.email || !formData.password) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos",
          variant: "destructive",
        });
        return;
      }
      
      const role = isCoordinator ? "coordinator" : "customer";
      login(formData.email, formData.password, role);
      
      toast({
        title: "¡Bienvenido!",
        description: `Has iniciado sesión como ${isCoordinator ? 'coordinador' : 'cliente'}`,
      });
      
      if (isCoordinator) {
        setLocation('/coordinator');
      }
      onClose();
    } else if (view === "register") {
      if (!formData.email || !formData.password || !formData.fullName) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos obligatorios",
          variant: "destructive",
        });
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Las contraseñas no coinciden",
          variant: "destructive",
        });
        return;
      }
      
      register(formData.email, formData.password, formData.fullName);
      
      toast({
        title: "¡Cuenta creada!",
        description: "Tu cuenta ha sido creada exitosamente",
      });
      
      onClose();
    } else if (view === "forgot") {
      toast({
        title: "Correo enviado",
        description: "Revisa tu bandeja de entrada para recuperar tu contraseña",
      });
      handleViewChange("login");
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phone: "",
    });
  };

  const handleViewChange = (newView: AuthView) => {
    resetForm();
    setView(newView);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-auth">
        {view !== "login" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewChange("login")}
            className="absolute left-4 top-4"
            data-testid="button-back-to-login"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        )}

        <DialogHeader className="pt-8">
          <DialogTitle className="text-2xl text-center">
            {view === "login" && "Iniciar Sesión"}
            {view === "register" && "Crear Cuenta"}
            {view === "forgot" && "Recuperar Contraseña"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {view === "login" && (
            <>
              {/* Selector de tipo de usuario */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                <button
                  type="button"
                  onClick={() => setIsCoordinator(false)}
                  className={`py-2 px-4 rounded-md font-medium transition-colors ${
                    !isCoordinator
                      ? "bg-background shadow-sm"
                      : "hover:bg-background/50"
                  }`}
                  data-testid="button-user-type-customer"
                >
                  Cliente
                </button>
                <button
                  type="button"
                  onClick={() => setIsCoordinator(true)}
                  className={`py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
                    isCoordinator
                      ? "bg-background shadow-sm"
                      : "hover:bg-background/50"
                  }`}
                  data-testid="button-user-type-coordinator"
                >
                  <Shield className="h-4 w-4" />
                  Coordinador
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    data-testid="input-login-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    data-testid="input-login-password"
                  />
                </div>
              </div>

              {isCoordinator && (
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Estás iniciando sesión como coordinador de eventos. Tendrás acceso al panel de gestión y creación de eventos.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleViewChange("forgot")}
                  className="text-sm text-primary hover:underline"
                  data-testid="link-forgot-password"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <Button type="submit" className="w-full" data-testid="button-login">
                {isCoordinator ? "Acceder al Panel" : "Iniciar Sesión"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                ¿Eres nuevo?{" "}
                <button
                  type="button"
                  onClick={() => handleViewChange("register")}
                  className="text-primary hover:underline font-medium"
                  data-testid="link-register"
                >
                  Regístrate
                </button>
              </div>
            </>
          )}

          {view === "register" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="register-name">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Juan Pérez"
                    className="pl-10"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    data-testid="input-register-name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    data-testid="input-register-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="+52 123 456 7890"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    data-testid="input-register-phone"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    data-testid="input-register-password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirmar Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    data-testid="input-register-confirm-password"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" data-testid="button-register">
                Registrarse
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => handleViewChange("login")}
                  className="text-primary hover:underline font-medium"
                  data-testid="link-login"
                >
                  Inicia sesión
                </button>
              </div>
            </>
          )}

          {view === "forgot" && (
            <>
              <p className="text-sm text-muted-foreground text-center">
                Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña.
              </p>

              <div className="space-y-2">
                <Label htmlFor="forgot-email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    data-testid="input-forgot-email"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" data-testid="button-send-recovery">
                Enviar Enlace de Recuperación
              </Button>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
