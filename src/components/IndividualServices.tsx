import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export const IndividualServices = () => {
  const { t } = useLanguage();

  const services = [
    {
      nameKey: 'individual.social.name',
      descriptionKey: 'individual.social.description',
      price: '80',
      unit: 'individual.social.unit'
    },
    {
      nameKey: 'individual.identity.name',
      descriptionKey: 'individual.identity.description',
      price: '1.050',
      unit: 'individual.identity.unit'
    },
    {
      nameKey: 'individual.manual.name',
      descriptionKey: 'individual.manual.description',
      price: '1.400',
      unit: 'individual.manual.unit'
    },
    {
      nameKey: 'individual.vectorization.name',
      descriptionKey: 'individual.vectorization.description',
      price: '100',
      unit: 'individual.vectorization.unit'
    },
    {
      nameKey: 'individual.cutting.name',
      descriptionKey: 'individual.cutting.description',
      price: '140',
      unit: 'individual.cutting.unit'
    },
    {
      nameKey: 'individual.packaging.name',
      descriptionKey: 'individual.packaging.description',
      price: '325',
      unit: 'individual.packaging.unit'
    },
    {
      nameKey: 'individual.silkscreen.name',
      descriptionKey: 'individual.silkscreen.description',
      price: '165',
      unit: 'individual.silkscreen.unit'
    },
    {
      nameKey: 'individual.landingpage.name',
      descriptionKey: 'individual.landingpage.description',
      price: '900',
      unit: 'individual.landingpage.unit'
    }
  ];

  return (
    <section id="servicos-individuais" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('individual.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('individual.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border h-full flex flex-col"
            >
              <CardHeader className="pb-4 flex-grow">
                <CardTitle className="text-lg leading-tight">{t(service.nameKey)}</CardTitle>
                <div className="flex items-baseline space-x-1 my-2">
                  <span className="text-2xl font-bold text-primary">R$ {service.price}</span>
                </div>
                <CardDescription className="text-sm leading-relaxed flex-grow">
                  {t(service.descriptionKey)}
                </CardDescription>
                <p className="text-xs text-muted-foreground font-medium">
                  {t(service.unit)}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
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
                    {t('individual.quote')}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};