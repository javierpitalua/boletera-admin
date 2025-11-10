import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function CoordinatorFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">EventosPro</h3>
            <p className="text-sm text-muted-foreground">
              Plataforma profesional de gestión de eventos y venta de boletos
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-about">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-help">
                  Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2" data-testid="contact-email">
                <Mail className="h-4 w-4" />
                <span>soporte@eventospro.com</span>
              </li>
              <li className="flex items-center gap-2" data-testid="contact-phone">
                <Phone className="h-4 w-4" />
                <span>+52 55 1234 5678</span>
              </li>
              <li className="flex items-center gap-2" data-testid="contact-location">
                <MapPin className="h-4 w-4" />
                <span>Ciudad de México, MX</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-cookies">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-refund">
                  Política de Reembolso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="link-faq">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>© {currentYear} EventosPro. Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Hecho con</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>para coordinadores de eventos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
