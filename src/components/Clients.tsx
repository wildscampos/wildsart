import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const clients = [
  {
    name: "STAMP|CIA",
    subtitle: "Estamparia Digital",
    logo: "/lovable-uploads/db1fc48f-67f3-472a-b6f2-7f21d2d989d4.png",
    website: "https://www.stampcia.com.br/"
  },
  {
    name: "TransKav Express",
    subtitle: "Transporte e Logística",
    logo: "/lovable-uploads/540213af-8d15-483d-85fe-2cf8f214bd97.png",
    website: "https://transkav.lovable.app/"
  },
  {
    name: "Cia da Fé",
    subtitle: "Camisetas Católicas",
    logo: "/lovable-uploads/284477c0-3c6e-4a63-a4c9-2d319d510d74.png",
    website: "https://ciadafe.com.br/"
  },
  {
    name: "Luminabox",
    subtitle: "Anúncios Online",
    logo: "/lovable-uploads/cd7a7768-c2ef-4c99-8309-ed4175b2b2d8.png",
    website: "https://luminabox.com.br/"
  },
  {
    name: "Cantina das Marias",
    subtitle: "Comida Caseira",
    logo: "/lovable-uploads/263c2bb0-e232-4bd9-9829-f1f5a623afe3.png"
  },
  {
    name: "Mimos da Drika",
    subtitle: "Presentes e Decoração",
    logo: "/lovable-uploads/3878e6a3-3c75-4899-8748-81ead810c47b.png"
  }
];

export const Clients = () => {
  const renderClientCard = (client: typeof clients[0], index: number) => {
    const cardContent = (
      <>
        <div className="w-32 h-32 mb-4 flex items-center justify-center bg-white rounded-lg p-3 shadow-sm">
          <img
            src={client.logo}
            alt={`Logo ${client.name}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="text-center">
          <h3 className={`font-bold mb-1 ${client.website ? 'group-hover:text-primary transition-colors' : ''}`}>
            {client.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {client.subtitle}
          </p>
        </div>
      </>
    );

    if (client.website) {
      return (
        <a
          key={index}
          href={client.website}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center p-8 bg-background rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          {cardContent}
        </a>
      );
    }

    return (
      <div
        key={index}
        className="flex flex-col items-center p-8 bg-background rounded-xl shadow-sm"
      >
        {cardContent}
      </div>
    );
  };

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Empresas que confiam em nosso trabalho
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça algumas das empresas que já transformaram sua identidade visual conosco
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
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
              {clients.map((client, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/3">
                  {renderClientCard(client, index)}
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