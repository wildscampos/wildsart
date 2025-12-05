import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'organization' | 'faqPage';
  data?: any;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  useEffect(() => {
    let schema = {};

    if (type === 'organization') {
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Wilds Art",
        "description": "Estúdio de design focado em artes para redes sociais, identidade visual, manual de marca, vetorização, vetores para corte/gravação, rótulos/embalagens e artes vetoriais para silk-screen e DTF.",
        "url": "https://wildsarts.com",
        "logo": "https://wildsarts.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-12-981823416",
          "contactType": "customer service",
          "availableLanguage": "Portuguese"
        },
        "sameAs": [
          "https://instagram.com/wildsart",
          "https://youtube.com/@wildsart",
          "https://linkedin.com/in/wildscampos",
          "https://tiktok.com/@wildsart"
        ],
        "areaServed": {
          "@type": "Country",
          "name": "Brasil"
        },
        "priceRange": "$$"
      };
    } else if (type === 'faqPage' && data) {
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [type, data]);

  return null;
};