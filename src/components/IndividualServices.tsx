import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-lg leading-tight">{t(service.nameKey)}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {t(service.descriptionKey)}
                </CardDescription>
                <p className="text-xs text-muted-foreground font-medium mt-2">
                  {t(service.unit)}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};