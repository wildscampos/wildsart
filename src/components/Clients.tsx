const clients = [
  {
    name: "STAMP|CIA",
    subtitle: "Estamparia Digital",
    logo: "/lovable-uploads/9167cb4f-9fbd-4278-b3f4-acd8be268bbd.png",
    website: "https://www.stampcia.com.br/"
  },
  {
    name: "TransKav Express",
    subtitle: "Transporte e Logística",
    logo: "/lovable-uploads/22617fdc-dc3c-4326-b1ed-122bbac3af35.png",
    website: "https://transkav.lovable.app/"
  },
  {
    name: "Cia da Fé",
    subtitle: "Camisetas Católicas",
    logo: "/lovable-uploads/d8072c32-8f0c-414d-a7ad-d49b91a9138e.png",
    website: "https://ciadafe.com.br/"
  }
];

export const Clients = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {clients.map((client, index) => (
            <a
              key={index}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-8 bg-background rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-32 h-32 mb-4 flex items-center justify-center bg-white rounded-lg p-3 shadow-sm">
                <img
                  src={client.logo}
                  alt={`Logo ${client.name}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                  {client.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {client.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};