import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fale com a Wilds Art's — contato direto e rápido
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entre em contato conosco para solicitar seu orçamento personalizado
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <Button 
            size="lg" 
            className="w-full text-lg py-6"
            asChild
          >
            <a 
              href="https://wa.me/5512981823416?text=Olá,%20vim%20pelo%20site%20da%20Wilds%20Art's%20e%20quero%20um%20orçamento."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};