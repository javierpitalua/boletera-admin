import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  ayuda: [
    { label: "Centro de ayuda", href: "#" },
    { label: "Preguntas frecuentes", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Accesibilidad", href: "#" },
    { label: "Devoluciones y cambios", href: "#" },
  ],
  nuestraRed: [
    { label: "Encuentra eventos", href: "#" },
    { label: "Vende boletos", href: "#" },
    { label: "Gift cards", href: "#" },
    { label: "Aplicación móvil", href: "#" },
    { label: "Newsletter", href: "#" },
  ],
  estamosParaAyudarte: [
    { label: "Para organizadores", href: "#" },
    { label: "Para promotores", href: "#" },
    { label: "Para venues", href: "#" },
    { label: "Herramientas de gestión", href: "#" },
    { label: "Recursos", href: "#" },
  ],
  unete: [
    { label: "Programa de afiliados", href: "#" },
    { label: "Conviértete en socio", href: "#" },
    { label: "Trabaja con nosotros", href: "#" },
    { label: "Desarrolladores", href: "#" },
    { label: "API", href: "#" },
  ],
  empresa: [
    { label: "Acerca de nosotros", href: "#" },
    { label: "Prensa", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Inversionistas", href: "#" },
    { label: "Responsabilidad social", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const legalLinks = [
  { label: "Términos de uso", href: "#" },
  { label: "Política de privacidad", href: "#" },
  { label: "Política de cookies", href: "#" },
  { label: "Aviso legal", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Logo y Redes Sociales */}
          <div className="lg:col-span-1 space-y-4">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Helius
              </h2>
              <p className="text-sm text-gray-400">
                Tu plataforma de confianza para eventos en vivo
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Síguenos</h3>
              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover-elevate bg-white/5 hover:bg-white/10 border-0"
                    asChild
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Ayuda */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Ayuda</h3>
            <ul className="space-y-2">
              {footerLinks.ayuda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                    data-testid={`link-help-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nuestra red */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Nuestra red</h3>
            <ul className="space-y-2">
              {footerLinks.nuestraRed.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                    data-testid={`link-network-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Estamos para ayudarte */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Estamos para ayudarte</h3>
            <ul className="space-y-2">
              {footerLinks.estamosParaAyudarte.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                    data-testid={`link-support-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Únete */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Únete</h3>
            <ul className="space-y-2">
              {footerLinks.unete.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                    data-testid={`link-join-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                    data-testid={`link-company-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-6" />

        {/* Legal y Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs">
            {legalLinks.map((link, index) => (
              <span key={link.label} className="flex items-center gap-4">
                <a
                  href={link.href}
                  className="hover:text-white transition-colors"
                  data-testid={`link-legal-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </a>
                {index < legalLinks.length - 1 && (
                  <span className="text-gray-600">|</span>
                )}
              </span>
            ))}
          </div>
          
          <p className="text-xs text-gray-400" data-testid="text-copyright">
            © 2025 Helius Consulting. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
