import { 
  Instagram, 
  Palette, 
  FileText, 
  Shapes, 
  Scissors, 
  Package,
  Paintbrush,
  MonitorPlay
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Instagram,
      titleKey: 'services.social.title',
      descriptionKey: 'services.social.description',
    },
    {
      icon: Palette,
      titleKey: 'services.identity.title',
      descriptionKey: 'services.identity.description',
    },
    {
      icon: FileText,
      titleKey: 'services.manual.title',
      descriptionKey: 'services.manual.description',
    },
    {
      icon: Shapes,
      titleKey: 'services.vectorization.title',
      descriptionKey: 'services.vectorization.description',
    },
    {
      icon: Scissors,
      titleKey: 'services.cutting.title',
      descriptionKey: 'services.cutting.description',
    },
    {
      icon: Package,
      titleKey: 'services.packaging.title',
      descriptionKey: 'services.packaging.description',
    },
    {
      icon: Paintbrush,
      titleKey: 'services.silkscreen.title',
      descriptionKey: 'services.silkscreen.description',
    },
    {
      icon: MonitorPlay,
      titleKey: 'services.landingpage.title',
      descriptionKey: 'services.landingpage.description',
    },
  ];

  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
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
                  <CardTitle className="text-xl">{t(service.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t(service.descriptionKey)}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};