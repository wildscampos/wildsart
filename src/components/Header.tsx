import { useState, useEffect, useRef } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ui/theme-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { OptimizedImage } from '@/components/ui/optimized-image';
import logoLight from '@/assets/logo-light.jpg';
import logoDark from '@/assets/logo-dark.jpg';
import instagramIcon from '@/assets/instagram-icon.svg';
import linkedinIcon from '@/assets/linkedin-icon.svg';
import tiktokIcon from '@/assets/tiktok-icon.svg';
import youtubeIcon from '@/assets/youtube-icon.svg';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: t('nav.home'), href: '#inicio' },
    { label: t('nav.services'), href: '#servicos' },
    { label: t('nav.testimonials'), href: '#depoimentos' },
    { label: t('nav.contact'), href: '#contato' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border" role="banner">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo - Left side */}
        <div className="flex items-center flex-shrink-0">
          <OptimizedImage 
            src={theme === 'dark' ? logoDark : logoLight}
            alt="Wilds Art - logotipo" 
            className="h-8 w-auto"
            eager
            width={120}
            height={32}
          />
        </div>

        {/* Desktop Navigation - Center */}
        <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center" role="navigation" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side - Controls */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Social Media Icons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="https://instagram.com/wildsart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="Instagram"
            >
              <OptimizedImage src={instagramIcon} alt="Instagram" className="h-5 w-5" eager width={20} height={20} />
            </a>
            <a 
              href="https://linkedin.com/in/wildscampos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="LinkedIn"
            >
              <OptimizedImage src={linkedinIcon} alt="LinkedIn" className="h-5 w-5" eager width={20} height={20} />
            </a>
            <a 
              href="https://tiktok.com/@wildsart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="TikTok"
            >
              <OptimizedImage src={tiktokIcon} alt="TikTok" className="h-5 w-5" eager width={20} height={20} />
            </a>
            <a 
              href="https://youtube.com/@wildsart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="YouTube"
            >
              <OptimizedImage src={youtubeIcon} alt="YouTube" className="h-5 w-5" eager width={20} height={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div ref={menuButtonRef} className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav ref={mobileMenuRef} id="mobile-menu" className="lg:hidden border-t border-border bg-background" role="navigation" aria-label="Menu mobile">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            {/* Social Media Icons - Mobile */}
            <div className="pt-4 pb-2 flex justify-center gap-6">
              <a 
                href="https://instagram.com/wildsart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:rotate-6"
                aria-label="Instagram"
              >
                <OptimizedImage src={instagramIcon} alt="Instagram" className="h-6 w-6" eager width={24} height={24} />
              </a>
              <a 
                href="https://linkedin.com/in/wildscampos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:rotate-6"
                aria-label="LinkedIn"
              >
                <OptimizedImage src={linkedinIcon} alt="LinkedIn" className="h-6 w-6" eager width={24} height={24} />
              </a>
              <a 
                href="https://tiktok.com/@wildsart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:rotate-6"
                aria-label="TikTok"
              >
                <OptimizedImage src={tiktokIcon} alt="TikTok" className="h-6 w-6" eager width={24} height={24} />
              </a>
              <a 
                href="https://youtube.com/@wildsart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:rotate-6"
                aria-label="YouTube"
              >
                <OptimizedImage src={youtubeIcon} alt="YouTube" className="h-6 w-6" eager width={24} height={24} />
              </a>
            </div>
            
            <div className="pt-2 space-y-3">
              <Button 
                variant="default" 
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
                  {t('contact.whatsapp')}
                </a>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};