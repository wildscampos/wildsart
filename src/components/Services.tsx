import { 
  Instagram, 
  Palette, 
  FileText, 
  Shapes, 
  Scissors, 
  Package,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const services = [
  {
    icon: Instagram,
    title: 'Artes para redes sociais',
    description: 'Posts, stories, carrosséis e motion curto; pauta, copy e direção de arte com foco em conversão.',
  },
  {
    icon: Palette,
    title: 'Identidade visual',
    description: 'Logo, paleta, tipografia e aplicações que posicionam sua marca.',
  },
  {
    icon: FileText,
    title: 'Manual de marca',
    description: 'Regras de uso, grids, cores, tipografia, tom de voz e exemplos de aplicação.',
  },
  {
    icon: Shapes,
    title: 'Vetorização',
    description: 'Logos, ilustrações e produtos com traços limpos e fiéis.',
  },
  {
    icon: Scissors,
    title: 'Vetores para corte e gravação',
    description: 'Arquivos otimizados para laser/router (MDF, acrílico, metal), com tolerâncias e encaixes definidos conforme o projeto.',
  },
  {
    icon: Package,
    title: 'Rótulos e embalagens',
    description: 'Criação de arte para rótulos e embalagens, com design funcional e pronto para impressão.',
  },
];

export const Services = () => {
  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Serviços</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluções completas de design para elevar sua marca e negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border"
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-6">
                    {service.description}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    asChild
                  >
                    <a 
                      href="https://wa.me/5512981823416?text=Olá,%20vim%20pelo%20site%20da%20Wilds%20Art's%20e%20quero%20um%20orçamento."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Pedir orçamento
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};