import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'pt-BR', flag: '🇧🇷', name: 'Português (Brasil)' },
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as Language)}
          className={`text-2xl transition-all duration-200 hover:scale-110 ${
            language === lang.code ? 'opacity-100 scale-110' : 'opacity-60 hover:opacity-80'
          }`}
          title={lang.name}
          aria-label={`Alterar idioma para ${lang.name}`}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;