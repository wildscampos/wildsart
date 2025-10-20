import { Eye } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import logoVideo from '@/assets/logo-video.mp4';

export const Hero = () => {
  const { t } = useLanguage();
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 hero-glow opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Logo Video */}
        <div className="mb-8">
          <video 
            src={logoVideo}
            autoPlay
            loop
            muted
            playsInline
            className="mx-auto h-24 w-auto mb-6"
            aria-label="Wilds Art - logotipo oficial"
          />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            {t('hero.title')}<br />
            <span className="text-primary">{t('hero.subtitle')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-balance max-w-3xl mx-auto">
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6"
              asChild
            >
              <a href="#portfolio" className="flex items-center gap-3">
                <Eye className="h-5 w-5" />
                {t('hero.cta.portfolio')}
              </a>
            </Button>
          </div>

          {/* Trust Bullets */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium">{t('hero.trust.experience')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium">{t('hero.trust.ready')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium">{t('hero.trust.fast')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};