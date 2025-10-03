import { useState } from "react";
import { Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = "login" | "register" | "forgot";

export function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [view, setView] = useState<AuthView>("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Auth submit:", view, formData);
    onClose();
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
          <DialogTitle className="text-2xl font-serif text-center">
            {view === "login" && "Iniciar Sesión"}
            {view === "register" && "Crear Cuenta"}
            {view === "forgot" && "Recuperar Contraseña"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {view === "login" && (
            <>
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
                Iniciar Sesión
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
