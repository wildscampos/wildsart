import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ui/theme-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSelector from './LanguageSelector';
import logoLight from '@/assets/logo-light.jpg';
import logoDark from '@/assets/logo-dark.jpg';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();

  const navItems = [
    { label: t('nav.home'), href: '#inicio' },
    { label: t('nav.services'), href: '#servicos' },
    { label: t('nav.testimonials'), href: '#depoimentos' },
    { label: t('nav.contact'), href: '#contato' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo - Left side */}
        <div className="flex items-center flex-shrink-0">
          <img 
            src={theme === 'dark' ? logoDark : logoLight}
            alt="Wilds Art - logotipo" 
            className="h-8 w-auto"
          />
        </div>

        {/* Desktop Navigation - Center */}
        <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side - Controls */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
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
            
            <div className="pt-4 space-y-3">
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
        </div>
      )}
    </header>
  );
};