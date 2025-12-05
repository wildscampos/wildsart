import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ 
  phoneNumber, 
  message 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  
  const defaultMessage = message || t('whatsapp.message');

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
    setIsOpen(false);
  };

  return (
    <>
      {/* Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
          aria-label={isOpen ? "Fechar chat do WhatsApp" : "Abrir chat do WhatsApp"}
          aria-expanded={isOpen}
          aria-controls="whatsapp-chat"
        >
          {isOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <MessageCircle className="w-6 h-6" aria-hidden="true" />
          )}
        </button>

        {/* Chat Bubble */}
        {isOpen && (
          <div 
            id="whatsapp-chat"
            role="dialog"
            aria-labelledby="whatsapp-title"
            className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-80 max-w-[calc(100vw-3rem)] border border-gray-200 dark:border-gray-700 animate-in slide-in-from-bottom-2 duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center" aria-hidden="true">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 id="whatsapp-title" className="font-semibold text-gray-900 dark:text-white">
                  Wilds Art
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('whatsapp.online')}
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300">
                {t('whatsapp.greeting')}
                <br />
                {t('whatsapp.cta')}
              </div>
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              {t('whatsapp.button')}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WhatsAppWidget;