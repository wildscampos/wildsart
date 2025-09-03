import { MessageCircle, Eye } from 'lucide-react';
import { Button } from './ui/button';

export const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 hero-glow opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Logo - Will use the uploaded logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/e0e67c25-bbc1-446e-8c9d-0a5c5bed48bc.png" 
            alt="Wilds Art's - logotipo oficial" 
            className="mx-auto h-24 w-auto mb-6"
          />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Wilds Art's<br />
            <span className="text-primary">Onde sua visão vira design</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-balance max-w-3xl mx-auto">
            Artes para redes sociais, identidade visual, manual de marca, vetorização, vetores para corte e gravação, rótulos e embalagens. Peças prontas para produzir e vender.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-6"
              asChild
            >
              <a 
                href="https://wa.me/5512981823416?text=Olá,%20vim%20pelo%20site%20da%20Wilds%20Art's%20e%20quero%20um%20orçamento."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <MessageCircle className="h-5 w-5" />
                Solicitar orçamento
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6"
              asChild
            >
              <a href="#portfolio" className="flex items-center gap-3">
                <Eye className="h-5 w-5" />
                Ver portfólio
              </a>
            </Button>
          </div>

          {/* Trust Bullets */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium">23 anos de experiência</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium">Arquivos prontos para produção</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium">Atendimento ágil</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};