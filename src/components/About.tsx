import { useLanguage } from '@/contexts/LanguageContext';

export const About = () => {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="py-20 bg-muted/30" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto text-center">
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-8">{t('about.title')}</h2>
          <ul className="text-xl text-muted-foreground leading-relaxed list-none">
            {(Array.isArray(t('about.description')) ? t('about.description') : []).map((item: string, index: number) => (
              <li key={index} className="flex items-center justify-center mb-3">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" aria-hidden="true"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};