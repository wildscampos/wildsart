import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt-BR' | 'pt-PT' | 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  'pt-BR': {
    // Navigation
    'nav.home': 'Início',
    'nav.services': 'Serviços',
    'nav.portfolio': 'Portfólio',
    'nav.testimonials': 'Depoimentos',
    'nav.plans': 'Planos',
    'nav.contact': 'Contato',
    
    // Hero Section
    'hero.title': 'Wilds Art\'s',
    'hero.subtitle': 'Onde sua visão vira design',
    'hero.description': 'Artes para redes sociais, identidade visual, manual de marca, vetorização, vetores para corte e gravação, rótulos e embalagens. Peças prontas para produzir e vender.',
    'hero.cta.quote': 'Solicitar orçamento',
    'hero.cta.portfolio': 'Ver portfólio',
    'hero.trust.experience': '23 anos de experiência',
    'hero.trust.ready': 'Arquivos prontos para produção',
    'hero.trust.fast': 'Atendimento ágil',
    
    // Contact
    'contact.title': 'Fale com a Wilds Art\'s — contato direto e rápido',
    'contact.subtitle': 'Entre em contato conosco para solicitar seu orçamento personalizado',
    'contact.whatsapp': 'WhatsApp',
    
    // WhatsApp
    'whatsapp.greeting': 'Olá! 👋 Como posso ajudar você hoje?',
    'whatsapp.cta': 'Clique no botão abaixo para conversar pelo WhatsApp!',
    'whatsapp.button': 'Conversar no WhatsApp',
    'whatsapp.online': 'Online agora',
    'whatsapp.aria': 'Abrir chat do WhatsApp',
    'whatsapp.message': 'Olá! Gostaria de saber mais sobre os serviços da Wilds Art\'s.',
  },
  
  'pt-PT': {
    // Navigation
    'nav.home': 'Início',
    'nav.services': 'Serviços',
    'nav.portfolio': 'Portfólio',
    'nav.testimonials': 'Testemunhos',
    'nav.plans': 'Planos',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.title': 'Wilds Art\'s',
    'hero.subtitle': 'Onde a sua visão se torna design',
    'hero.description': 'Artes para redes sociais, identidade visual, manual de marca, vectorização, vectores para corte e gravação, rótulos e embalagens. Peças prontas para produzir e vender.',
    'hero.cta.quote': 'Solicitar orçamento',
    'hero.cta.portfolio': 'Ver portfólio',
    'hero.trust.experience': '23 anos de experiência',
    'hero.trust.ready': 'Ficheiros prontos para produção',
    'hero.trust.fast': 'Atendimento rápido',
    
    // Contact
    'contact.title': 'Fale com a Wilds Art\'s — contacto directo e rápido',
    'contact.subtitle': 'Entre em contacto connosco para solicitar o seu orçamento personalizado',
    'contact.whatsapp': 'WhatsApp',
    
    // WhatsApp
    'whatsapp.greeting': 'Olá! 👋 Como posso ajudá-lo hoje?',
    'whatsapp.cta': 'Clique no botão abaixo para conversar pelo WhatsApp!',
    'whatsapp.button': 'Conversar no WhatsApp',
    'whatsapp.online': 'Online agora',
    'whatsapp.aria': 'Abrir chat do WhatsApp',
    'whatsapp.message': 'Olá! Gostaria de saber mais sobre os serviços da Wilds Art\'s.',
  },
  
  'en': {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.testimonials': 'Testimonials',
    'nav.plans': 'Plans',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Wilds Art\'s',
    'hero.subtitle': 'Where your vision becomes design',
    'hero.description': 'Social media arts, visual identity, brand manual, vectorization, cutting and engraving vectors, labels and packaging. Ready-to-produce pieces for sale.',
    'hero.cta.quote': 'Request quote',
    'hero.cta.portfolio': 'View portfolio',
    'hero.trust.experience': '23 years of experience',
    'hero.trust.ready': 'Production-ready files',
    'hero.trust.fast': 'Fast service',
    
    // Contact
    'contact.title': 'Contact Wilds Art\'s — direct and fast contact',
    'contact.subtitle': 'Get in touch with us to request your personalized quote',
    'contact.whatsapp': 'WhatsApp',
    
    // WhatsApp
    'whatsapp.greeting': 'Hello! 👋 How can I help you today?',
    'whatsapp.cta': 'Click the button below to chat on WhatsApp!',
    'whatsapp.button': 'Chat on WhatsApp',
    'whatsapp.online': 'Online now',
    'whatsapp.aria': 'Open WhatsApp chat',
    'whatsapp.message': 'Hello! I would like to know more about Wilds Art\'s services.',
  },
  
  'es': {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.portfolio': 'Portafolio',
    'nav.testimonials': 'Testimonios',
    'nav.plans': 'Planes',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.title': 'Wilds Art\'s',
    'hero.subtitle': 'Donde tu visión se convierte en diseño',
    'hero.description': 'Artes para redes sociales, identidad visual, manual de marca, vectorización, vectores para corte y grabado, etiquetas y empaques. Piezas listas para producir y vender.',
    'hero.cta.quote': 'Solicitar cotización',
    'hero.cta.portfolio': 'Ver portafolio',
    'hero.trust.experience': '23 años de experiencia',
    'hero.trust.ready': 'Archivos listos para producción',
    'hero.trust.fast': 'Atención rápida',
    
    // Contact
    'contact.title': 'Contacta con Wilds Art\'s — contacto directo y rápido',
    'contact.subtitle': 'Ponte en contacto con nosotros para solicitar tu cotización personalizada',
    'contact.whatsapp': 'WhatsApp',
    
    // WhatsApp
    'whatsapp.greeting': '¡Hola! 👋 ¿Cómo puedo ayudarte hoy?',
    'whatsapp.cta': '¡Haz clic en el botón de abajo para chatear por WhatsApp!',
    'whatsapp.button': 'Chatear en WhatsApp',
    'whatsapp.online': 'En línea ahora',
    'whatsapp.aria': 'Abrir chat de WhatsApp',
    'whatsapp.message': '¡Hola! Me gustaría saber más sobre los servicios de Wilds Art\'s.',
  },
  
  'fr': {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.testimonials': 'Témoignages',
    'nav.plans': 'Plans',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Wilds Art\'s',
    'hero.subtitle': 'Où votre vision devient design',
    'hero.description': 'Arts pour réseaux sociaux, identité visuelle, manuel de marque, vectorisation, vecteurs pour découpe et gravure, étiquettes et emballages. Pièces prêtes à produire et vendre.',
    'hero.cta.quote': 'Demander un devis',
    'hero.cta.portfolio': 'Voir le portfolio',
    'hero.trust.experience': '23 ans d\'expérience',
    'hero.trust.ready': 'Fichiers prêts pour la production',
    'hero.trust.fast': 'Service rapide',
    
    // Contact
    'contact.title': 'Contactez Wilds Art\'s — contact direct et rapide',
    'contact.subtitle': 'Contactez-nous pour demander votre devis personnalisé',
    'contact.whatsapp': 'WhatsApp',
    
    // WhatsApp
    'whatsapp.greeting': 'Bonjour ! 👋 Comment puis-je vous aider aujourd\'hui ?',
    'whatsapp.cta': 'Cliquez sur le bouton ci-dessous pour discuter sur WhatsApp !',
    'whatsapp.button': 'Discuter sur WhatsApp',
    'whatsapp.online': 'En ligne maintenant',
    'whatsapp.aria': 'Ouvrir le chat WhatsApp',
    'whatsapp.message': 'Bonjour ! J\'aimerais en savoir plus sur les services de Wilds Art\'s.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page title based on language
    const titles = {
      'pt-BR': 'Wilds Art\'s | Artes para redes sociais, identidade visual e vetorização',
      'pt-PT': 'Wilds Art\'s | Artes para redes sociais, identidade visual e vectorização',
      'en': 'Wilds Art\'s | Social media arts, visual identity and vectorization',
      'es': 'Wilds Art\'s | Artes para redes sociales, identidad visual y vectorización',
      'fr': 'Wilds Art\'s | Arts pour réseaux sociaux, identité visuelle et vectorisation',
    };
    document.title = titles[lang];
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};