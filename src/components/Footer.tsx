import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import logoLight from '@/assets/logo-light.jpg';
import logoDark from '@/assets/logo-dark.jpg';

export const Footer = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div>
            <img 
              src={theme === 'dark' ? logoDark : logoLight}
              alt="Wilds Art - logotipo" 
              className="h-8 w-auto mx-auto"
            />
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('footer.description')}
          </p>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </a>
            <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.services')}
            </a>
            <a href="#planos" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.plans')}
            </a>
            <a href="#depoimentos" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.testimonials')}
            </a>
            <a href="#contato" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.contact')}
            </a>
          </nav>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Wilds Art. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};