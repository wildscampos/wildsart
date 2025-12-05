import { useLanguage } from '@/contexts/LanguageContext';
import { OptimizedImage } from '@/components/ui/optimized-image';

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
    logo: "/lovable-uploads/540213af-8d15-483d-85fe-2cf8f214bd97.png"
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

const ClientCard = ({ client }: { client: typeof clients[0] }) => {
  const cardContent = (
    <>
      <div className="w-32 h-32 mb-4 flex items-center justify-center bg-white rounded-lg p-3 shadow-sm">
        <OptimizedImage
          src={client.logo}
          alt={`Logo da empresa ${client.name} - ${client.subtitle}`}
          className="max-w-full max-h-full"
          width={128}
          height={128}
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
        href={client.website}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center p-8 bg-background rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer shrink-0 w-[280px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={`Visitar site de ${client.name}`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 bg-background rounded-xl shadow-sm shrink-0 w-[280px]">
      {cardContent}
    </div>
  );
};

export const Clients = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-muted/50 overflow-hidden" aria-labelledby="clients-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="clients-heading" className="text-3xl md:text-4xl font-bold mb-6">
            {t('clients.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('clients.subtitle')}
          </p>
        </div>

        <div 
          className="relative flex gap-6"
          style={{
            '--duration': '40s',
            '--gap': '1.5rem',
          } as React.CSSProperties}
        >
          <div className="flex gap-6 animate-marquee">
            {clients.map((client, index) => (
              <ClientCard key={index} client={client} />
            ))}
          </div>
          <div className="flex gap-6 animate-marquee" aria-hidden="true">
            {clients.map((client, index) => (
              <ClientCard key={`duplicate-${index}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};