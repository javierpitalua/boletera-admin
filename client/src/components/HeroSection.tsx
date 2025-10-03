import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Concert_crowd_hero_image_7c247a60.png";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Live concert atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif" data-testid="text-hero-title">
          Vive la Experiencia
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
          Encuentra y compra boletos para los mejores eventos, conciertos y festivales
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 bg-white/10 backdrop-blur-md p-2 rounded-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
              <Input
                placeholder="Buscar eventos, artistas, lugares..."
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearch?.(e.currentTarget.value);
                  }
                }}
                data-testid="input-hero-search"
              />
            </div>
            <Button variant="outline" className="bg-white/90 hover:bg-white text-black border-transparent" data-testid="button-hero-search">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
