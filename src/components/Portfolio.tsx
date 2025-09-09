import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

// Import portfolio images
import portfolioSocial1 from '@/assets/portfolio-social-1.jpg';
import portfolioIdentity1 from '@/assets/portfolio-identity-1.jpg';
import portfolioVector1 from '@/assets/portfolio-vector-1.jpg';
import portfolioPackaging1 from '@/assets/portfolio-packaging-1.jpg';
import portfolioManual1 from '@/assets/portfolio-manual-1.jpg';
import portfolioMotion1 from '@/assets/portfolio-motion-1.jpg';

const portfolioItems = [
  { image: portfolioSocial1, alt: 'Projeto Wilds Art\'s - artes para redes sociais' },
  { image: portfolioIdentity1, alt: 'Projeto Wilds Art\'s - identidade visual' },
  { image: portfolioVector1, alt: 'Projeto Wilds Art\'s - vetorização' },
  { image: portfolioPackaging1, alt: 'Projeto Wilds Art\'s - rótulos e embalagens' },
  { image: portfolioManual1, alt: 'Projeto Wilds Art\'s - manual de marca' },
  { image: portfolioMotion1, alt: 'Projeto Wilds Art\'s - motion graphics' },
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
            <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">{item.alt}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="px-8 py-6"
            asChild
          >
            <a 
              href="https://wa.me/5512981823416?text=Olá,%20vim%20pelo%20site%20da%20Wilds%20Art's%20e%20quero%20um%20orçamento."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <MessageCircle className="h-5 w-5" />
              {t('portfolio.cta')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};