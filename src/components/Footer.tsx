import { useLanguage } from '@/contexts/LanguageContext';
import { OptimizedImage } from '@/components/ui/optimized-image';
import logoVideo from '@/assets/logo-video.mp4';
import instagramIcon from '@/assets/instagram-icon.svg';
import linkedinIcon from '@/assets/linkedin-icon.svg';
import tiktokIcon from '@/assets/tiktok-icon.svg';
import youtubeIcon from '@/assets/youtube-icon.svg';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div>
            <video 
              src={logoVideo}
              autoPlay
              loop
              muted
              playsInline
              className="h-32 w-auto mx-auto"
              aria-label="Wilds Art - logotipo animado"
            />
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('footer.description')}
          </p>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm" role="navigation" aria-label="Links do rodapé">
            <a href="/#inicio" className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
              {t('nav.home')}
            </a>
            <a href="/#servicos" className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
              {t('nav.services')}
            </a>
            <a href="/#depoimentos" className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
              {t('nav.testimonials')}
            </a>
            <a href="/#contato" className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
              {t('nav.contact')}
            </a>
          </nav>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6">
            <a 
              href="https://instagram.com/wildsart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="Instagram"
            >
              <OptimizedImage src={instagramIcon} alt="Instagram" className="h-6 w-6" width={24} height={24} />
            </a>
            <a 
              href="https://linkedin.com/in/wildscampos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="LinkedIn"
            >
              <OptimizedImage src={linkedinIcon} alt="LinkedIn" className="h-6 w-6" width={24} height={24} />
            </a>
            <a 
              href="https://tiktok.com/@wildsart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="TikTok"
            >
              <OptimizedImage src={tiktokIcon} alt="TikTok" className="h-6 w-6" width={24} height={24} />
            </a>
            <a 
              href="https://youtube.com/@wildsart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="YouTube"
            >
              <OptimizedImage src={youtubeIcon} alt="YouTube" className="h-6 w-6" width={24} height={24} />
            </a>
          </div>

          {/* Legal Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground/80" aria-label="Links legais">
            <a href="/politica-privacidade" className="hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
              {t('footer.privacy')}
            </a>
            <a href="/termos-servico" className="hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
              {t('footer.terms')}
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