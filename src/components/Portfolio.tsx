import { GlowCard } from './ui/spotlight-card';
import { useLanguage } from '@/contexts/LanguageContext';

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
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('portfolio.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {portfolioItems.map((item, index) => (
            <GlowCard 
              key={index} 
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 w-full" 
              customSize={true}
              glowColor="purple"
            >
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={t(`portfolio.projects.${item.key}`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <p className="text-sm text-muted-foreground">{t(`portfolio.projects.${item.key}`)}</p>
              </div>
            </GlowCard>
          ))}
        </div>

      </div>
    </section>
  );
};