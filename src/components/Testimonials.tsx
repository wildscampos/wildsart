import { Card, CardContent } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    text: "Trabalho impecável! As peças chegaram prontas para produção, sem necessidade de ajustes. A qualidade técnica é excelente.",
    author: "Waldir",
    company: "Cia da Fé"
  },
  {
    text: "Entrega sempre no prazo e comunicação clara. Os arquivos são perfeitos para estamparia digital, facilitam muito nosso processo.",
    author: "Neiva",
    company: "Stamp|Cia"
  },
  {
    text: "Profissionalismo de primeira! O design da nossa marca ficou moderno e impactante. Recomendo sem dúvidas.",
    author: "Leandro",
    company: "LuminaBox"
  },
  {
    text: "Criatividade e atenção aos detalhes que fazem a diferença. Cada peça é pensada com carinho e técnica.",
    author: "Sandra",
    company: "Mimos da Drika"
  },
  {
    text: "Identidade visual forte e marcante! O resultado superou nossas expectativas e fortaleceu nossa presença no mercado.",
    author: "Kleber",
    company: "TransKav"
  },
  {
    text: "Design acolhedor que traduz perfeitamente o conceito da nossa cantina. Ficamos muito satisfeitas com o resultado!",
    author: "Izilda",
    company: "Cantina das Marias"
  }
];

export const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section id="depoimentos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/3">
                  <Card className="border-border h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <blockquote className="text-lg leading-relaxed mb-4 flex-1">
                        "{testimonial.text}"
                      </blockquote>
                      <cite className="text-muted-foreground not-italic font-medium">
                        — {testimonial.author}, {testimonial.company}
                      </cite>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};