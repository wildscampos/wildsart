import { useLanguage } from '@/contexts/LanguageContext';

export const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('about.title')}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('about.description')}
          </p>
        </div>
      </div>
    </section>
  );
};