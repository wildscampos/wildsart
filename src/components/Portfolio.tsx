import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from './ui/card';

// Import portfolio images
import portfolioSocial1 from '@/assets/portfolio-social-1.jpg';
import portfolioIdentity1 from '@/assets/portfolio-identity-1.jpg';
import portfolioVector1 from '@/assets/portfolio-vector-1.jpg';
import portfolioPackaging1 from '@/assets/portfolio-packaging-1.jpg';
import portfolioManual1 from '@/assets/portfolio-manual-1.jpg';
import portfolioMotion1 from '@/assets/portfolio-motion-1.jpg';

const portfolioItems = [
  { image: portfolioSocial1, key: 'social' },
  { image: portfolioIdentity1, key: 'identity' },
  { image: '/lovable-uploads/e0e67c25-bbc1-446e-8c9d-0a5c5bed48bc.png', key: 'vector' }, // Cantina das Marias
  { image: portfolioPackaging1, key: 'packaging' },
  { image: portfolioManual1, key: 'manual' },
  { image: '/lovable-uploads/596bfd17-db0d-4361-a58b-ecdd75436b43.png', key: 'landingpage' }, // Transkav Express
];

export const Portfolio = () => {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="py-20 bg-muted/30" aria-labelledby="portfolio-heading">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h2 id="portfolio-heading" className="text-3xl md:text-4xl font-bold mb-4">{t('portfolio.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" role="list">
          {portfolioItems.map((item, index) => (
            <article
              key={index}
              role="listitem"
            >
              <Card 
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={`Projeto de ${t(`portfolio.projects.${item.key}`)} - Design gráfico profissional da Wilds Art`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">{t(`portfolio.projects.${item.key}`)}</h3>
                </div>
              </Card>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};