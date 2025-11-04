import { useLanguage } from '@/contexts/LanguageContext';
import logoVideo from '@/assets/logo-video.mp4';
import instagramIcon from '@/assets/instagram-icon.svg';
import linkedinIcon from '@/assets/linkedin-icon.svg';
import tiktokIcon from '@/assets/tiktok-icon.svg';
import youtubeIcon from '@/assets/youtube-icon.svg';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border py-12">
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
              className="h-16 w-auto mx-auto"
            />
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('footer.description')}
          </p>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/#inicio" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </a>
            <a href="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.services')}
            </a>
            <a href="/#depoimentos" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.testimonials')}
            </a>
            <a href="/#contato" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.contact')}
            </a>
          </nav>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6">
            <a 
              href="https://instagram.com/wildsart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <img src={instagramIcon} alt="Instagram" className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com/in/wildscampos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="h-6 w-6" />
            </a>
            <a 
              href="https://tiktok.com/@wildsart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="TikTok"
            >
              <img src={tiktokIcon} alt="TikTok" className="h-6 w-6" />
            </a>
            <a 
              href="https://youtube.com/@wildsart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="YouTube"
            >
              <img src={youtubeIcon} alt="YouTube" className="h-6 w-6" />
            </a>
          </div>

          {/* Legal Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground/80">
            <a href="/politica-privacidade" className="hover:text-primary transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="/termos-servico" className="hover:text-primary transition-colors">
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