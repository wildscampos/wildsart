import { MessageCircle, Mail, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

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

        <div className="max-w-md mx-auto space-y-4 mb-12">
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
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full text-lg py-6"
            asChild
          >
            <a 
              href="mailto:wildsarts@gmail.com?subject=Contato%20via%20site&body=Olá,%20quero%20um%20orçamento."
              className="flex items-center justify-center gap-3"
            >
              <Mail className="h-5 w-5" />
              E-mail
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                className="flex items-center justify-center w-12 h-12 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
                aria-label={social.label}
              >
                <IconComponent className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};