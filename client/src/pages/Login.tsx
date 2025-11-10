import { useState } from "react";
import { useLocation } from "wouter";
import { Mail, Lock, Key, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import concertImage from "@assets/generated_images/Concert_crowd_hero_image_7c247a60.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [showRegister, setShowRegister] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    token: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
  });

  const [recoveryEmail, setRecoveryEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.token) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }
    
    try {
      login(formData.email, formData.password, formData.token);
      
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión como coordinador",
      });
      
      setLocation('/coordinator');
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: error instanceof Error ? error.message : "Token inválido",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (registerData.password.length < 8) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 8 caracteres",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Solicitud enviada",
      description: "Tu solicitud de registro ha sido enviada. Te contactaremos pronto con tu token de acceso.",
    });

    setRegisterData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      organization: "",
    });
    setShowRegister(false);
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recoveryEmail) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu correo electrónico",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Correo enviado",
      description: "Si el correo existe en nuestro sistema, recibirás instrucciones para recuperar tu contraseña.",
    });

    setRecoveryEmail("");
    setShowRecovery(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${concertImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Panel de Coordinador
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Gestiona tus eventos, ventas y experiencias desde un solo lugar
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Acceso Seguro</p>
                <p className="text-sm text-gray-300">Autenticación con token</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Gestión Completa</p>
                <p className="text-sm text-gray-300">Controla todos tus eventos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Login Form */}
          {!showRegister && !showRecovery && (
            <Card data-testid="card-login">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
                <CardDescription className="text-center">
                  Ingresa tus credenciales para acceder al panel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="coordinador@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        data-testid="input-password"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="token">Token de Acceso</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="token"
                        type="text"
                        placeholder="Ingresa tu token"
                        className="pl-10"
                        value={formData.token}
                        onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                        data-testid="input-token"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        Acceso exclusivo para coordinadores de eventos. Asegúrate de tener un token válido.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" data-testid="button-login">
                    Iniciar Sesión
                  </Button>

                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowRegister(true)}
                      data-testid="button-show-register"
                    >
                      Registrarse
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => setShowRecovery(true)}
                      data-testid="button-show-recovery"
                    >
                      Recuperar Contraseña
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Register Form */}
          {showRegister && (
            <Card data-testid="card-register">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Solicitar Registro</CardTitle>
                <CardDescription className="text-center">
                  Completa el formulario para solicitar tu acceso como coordinador
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nombre Completo *</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Juan Pérez"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      data-testid="input-register-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Correo Electrónico *</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="coordinador@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      data-testid="input-register-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-organization">Organización</Label>
                    <Input
                      id="register-organization"
                      type="text"
                      placeholder="Nombre de tu empresa u organización"
                      value={registerData.organization}
                      onChange={(e) => setRegisterData({ ...registerData, organization: e.target.value })}
                      data-testid="input-register-organization"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña *</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Mínimo 8 caracteres"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      data-testid="input-register-password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirmar Contraseña *</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="Repite tu contraseña"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      data-testid="input-register-confirm"
                    />
                  </div>

                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      Tu solicitud será revisada y recibirás un token de acceso por correo electrónico una vez aprobada.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button type="submit" className="w-full" data-testid="button-register">
                      Enviar Solicitud
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowRegister(false)}
                      data-testid="button-back-login"
                    >
                      Volver al Inicio de Sesión
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Recovery Form */}
          {showRecovery && (
            <Card data-testid="card-recovery">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Recuperar Contraseña</CardTitle>
                <CardDescription className="text-center">
                  Ingresa tu correo para recibir instrucciones de recuperación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRecovery} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recovery-email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="recovery-email"
                        type="email"
                        placeholder="coordinador@email.com"
                        className="pl-10"
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        data-testid="input-recovery-email"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      Te enviaremos un correo con instrucciones para restablecer tu contraseña y token de acceso.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button type="submit" className="w-full" data-testid="button-recovery">
                      Enviar Instrucciones
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowRecovery(false)}
                      data-testid="button-back-from-recovery"
                    >
                      Volver al Inicio de Sesión
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
