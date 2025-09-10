import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt-BR' | 'pt-PT' | 'en' | 'es' | 'fr';

// Função para detectar localização e moeda
const detectCurrencyAndPrices = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = navigator.language;
  
  // Países europeus que usam Euro
  const euroCountries = [
    'Europe/Amsterdam', 'Europe/Andorra', 'Europe/Athens', 'Europe/Berlin',
    'Europe/Brussels', 'Europe/Madrid', 'Europe/Paris', 'Europe/Rome',
    'Europe/Vienna', 'Europe/Luxembourg', 'Europe/Dublin', 'Europe/Helsinki',
    'Europe/Lisbon', 'Europe/Malta', 'Europe/Riga', 'Europe/Tallinn',
    'Europe/Vilnius', 'Europe/Ljubljana', 'Europe/Bratislava', 'Europe/Zagreb'
  ];
  
  // Estados Unidos
  const usTimezones = [
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'America/Phoenix', 'America/Anchorage', 'Pacific/Honolulu', 'America/Detroit',
    'America/Indiana/Indianapolis'
  ];
  
  if (euroCountries.some(tz => timeZone.includes(tz.split('/')[1])) || locale.startsWith('de') || locale.startsWith('fr') || locale.startsWith('es') || locale.startsWith('it')) {
    return {
      currency: '€',
      prices: ['100', '200', '300', '400']
    };
  } else if (usTimezones.some(tz => timeZone.includes(tz)) || locale.includes('en-US')) {
    return {
      currency: '$',
      prices: ['125', '250', '375', '500']
    };
  } else {
    return {
      currency: 'R$',
      prices: ['250', '500', '750', '1.000']
    };
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  currency: string;
  prices: string[];
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
    
    // About
    'about.title': 'Quem Somos',
    'about.description': 'A Wilds Art\'s nasce com 23 anos de experiência em design, adquirida em empresas de comunicação visual, corte à laser, estamparia e confecção. Unimos precisão técnica e linguagem orientada a resultado, do post ao arquivo de produção.',
    
    // Services
    'services.title': 'Serviços',
    'services.subtitle': 'Soluções completas de design para elevar sua marca e negócio',
    'services.social.title': 'Artes para redes sociais',
    'services.social.description': 'Posts, stories, carrosséis e motion curto; pauta, copy e direção de arte com foco em conversão.',
    'services.identity.title': 'Identidade visual',
    'services.identity.description': 'Logo, paleta, tipografia e aplicações que posicionam sua marca.',
    'services.manual.title': 'Manual de marca',
    'services.manual.description': 'Regras de uso, grids, cores, tipografia, tom de voz e exemplos de aplicação.',
    'services.vectorization.title': 'Vetorização',
    'services.vectorization.description': 'Logos, ilustrações e produtos com traços limpos e fiéis.',
    'services.cutting.title': 'Vetores para corte e gravação',
    'services.cutting.description': 'Arquivos otimizados para laser/router (MDF, acrílico, metal), com tolerâncias e encaixes definidos conforme o projeto.',
    'services.packaging.title': 'Rótulos e embalagens',
    'services.packaging.description': 'Criação de arte para rótulos e embalagens, com design funcional e pronto para impressão.',
    'services.quote': 'Pedir orçamento',
    
    // Portfolio
    'portfolio.title': 'Portfólio',
    'portfolio.subtitle': 'Conheça alguns dos nossos trabalhos e projetos realizados',
    'portfolio.cta': 'Quero algo assim',
    'portfolio.projects.social': 'Projeto Wilds Art\'s - artes para redes sociais',
    'portfolio.projects.identity': 'Projeto Wilds Art\'s - identidade visual', 
    'portfolio.projects.vector': 'Projeto Wilds Art\'s - vetorização',
    'portfolio.projects.packaging': 'Projeto Wilds Art\'s - rótulos e embalagens',
    'portfolio.projects.manual': 'Projeto Wilds Art\'s - manual de marca',
    'portfolio.projects.motion': 'Projeto Wilds Art\'s - motion graphics',
    
    // Testimonials
    'testimonials.title': 'Depoimentos',
    'testimonials.subtitle': 'O que nossos clientes dizem sobre nosso trabalho',
    'testimonials.items': [
      {
        text: "Trabalho impecável! As peças chegaram prontas para produção, sem necessidade de ajustes. A qualidade técnica é excelente.",
        author: "Waldir",
        company: "Cia da Fé"
      },
      {
        text: "Entrega sempre no prazo e comunicação clara. Os arquivos são perfeitos para estamparia digital, facilitam muito nosso processo.",
        author: "Neiva",
        company: "Stamp|Cia"
      },
      {
        text: "Profissionalismo de primeira! O design da nossa marca ficou moderno e impactante. Recomendo sem dúvidas.",
        author: "Leandro",
        company: "LuminaBox"
      },
      {
        text: "Criatividade e atenção aos detalhes que fazem a diferença. Cada peça é pensada com carinho e técnica.",
        author: "Sandra",
        company: "Mimos da Drika"
      },
      {
        text: "Identidade visual forte e marcante! O resultado superou nossas expectativas e fortaleceu nossa presença no mercado.",
        author: "Kleber",
        company: "TransKav"
      },
      {
        text: "Design acolhedor que traduz perfeitamente o conceito da nossa cantina. Ficamos muito satisfeitas com o resultado!",
        author: "Izilda",
        company: "Cantina das Marias"
      }
    ],
    
    // Plans
    'plans.title': 'Design para Redes Sociais',
    'plans.subtitle': 'Conteúdo visual profissional e constante para suas redes sociais.',
    'plans.recommended': 'Recomendado',
    'plans.hire': 'Contratar via WhatsApp',
    'plans.comparison': 'Comparativo de Planos',
    'plans.features': 'Recursos',
    'plans.period': '/mês',
    'plans.start.description': '4 posts + 4 stories • 1 revisão/peça • prazo até 5 dias úteis',
    'plans.start.features': '4 posts por mês|4 stories por mês|1 revisão por peça|Prazo de 5 dias úteis',
    'plans.essencial.description': '8 posts + 8 stories • 1 carrossel (até 7 págs) • 2 revisões/peça • prazo 3 dias úteis',
    'plans.essencial.features': '8 posts por mês|8 stories por mês|1 carrossel (até 7 págs)|2 revisões por peça|Prazo de 3 dias úteis',
    'plans.pro.description': '12 posts + 12 stories • 2 carrosséis • 1 motion até 10s • 2 revisões/peça • prazo 48h',
    'plans.pro.features': '12 posts por mês|12 stories por mês|2 carrosséis|1 motion até 10s|2 revisões por peça|Prazo de 48h',
    'plans.elite.description': '16 posts + 16 stories • 3 carrosséis • 2 motions até 10s • 3 revisões/peça • prioridade 24–48h',
    'plans.elite.features': '16 posts por mês|16 stories por mês|3 carrosséis|2 motions até 10s|3 revisões por peça|Prioridade 24-48h',
    'plans.table.posts': 'Posts/mês',
    'plans.table.stories': 'Stories/mês',
    'plans.table.carousels': 'Carrosséis',
    'plans.table.motion': 'Motion',
    'plans.table.revisions': 'Revisões/peça',
    'plans.table.deadline': 'Prazo',
    'plans.table.deadline_5days': '5 dias',
    'plans.table.deadline_3days': '3 dias',
    'plans.table.deadline_48h': '48h',
    'plans.table.deadline_24_48h': '24-48h',
    'plans.faq.title': 'Perguntas Frequentes',
    'plans.faq.revisions.question': 'Como funcionam as revisões?',
    'plans.faq.revisions.answer': 'Incluídas por peça conforme plano. Mudança de conceito gera nova peça.',
    'plans.faq.formats.question': 'Quais formatos de entrega?',
    'plans.faq.formats.answer': 'PNG, JPG, PDF para posts. MP4 para stories e motions.',
    'plans.faq.dates.question': 'Posso escolher as datas de postagem?',
    'plans.faq.dates.answer': 'Sim, você define as datas e nós criamos o conteúdo seguindo seu cronograma.',
    'plans.faq.deadlines.question': 'Prazos de entrega?',
    'plans.faq.deadlines.answer': 'START 5 dias úteis; ESSENCIAL 3 dias úteis; PRO 48h; ELITE 24–48h (prioridade).',
    'plans.terms.title': 'Termos Resumidos',
    'plans.terms.content': 'Vigência mensal; pagamento antecipado; janela de revisões até 7 dias após entrega; cancelamento com 15 dias (sem reembolso do mês corrente); uso comercial liberado; banco de imagens premium pode ter custo adicional.',
    'plans.subscribe': 'Assinar agora',
    
    // Clients
    'clients.title': 'Empresas que confiam em nosso trabalho',
    'clients.subtitle': 'Conheça algumas das empresas que já transformaram sua identidade visual conosco',
    
    // Footer
    'footer.description': 'Wilds Art\'s — artes para redes sociais, identidade visual e manual de marca. Também vetorização, vetores para corte e gravação (MDF, acrílico, metal) e rótulos/embalagens.',
    'footer.rights': 'Todos os direitos reservados.',
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
    
    // About
    'about.title': 'Quem Somos',
    'about.description': 'A Wilds Art\'s nasce com 23 anos de experiência em design, adquirida em empresas de comunicação visual, corte laser, estamparia e confecção. Unimos precisão técnica e linguagem orientada a resultado, do post ao ficheiro de produção.',
    
    // Services
    'services.title': 'Serviços',
    'services.subtitle': 'Soluções completas de design para elevar a sua marca e negócio',
    'services.social.title': 'Artes para redes sociais',
    'services.social.description': 'Posts, stories, carrosséis e motion curto; pauta, copy e direcção de arte com foco em conversão.',
    'services.identity.title': 'Identidade visual',
    'services.identity.description': 'Logo, paleta, tipografia e aplicações que posicionam a sua marca.',
    'services.manual.title': 'Manual de marca',
    'services.manual.description': 'Regras de uso, grids, cores, tipografia, tom de voz e exemplos de aplicação.',
    'services.vectorization.title': 'Vectorização',
    'services.vectorization.description': 'Logos, ilustrações e produtos com traços limpos e fiéis.',
    'services.cutting.title': 'Vectores para corte e gravação',
    'services.cutting.description': 'Ficheiros optimizados para laser/router (MDF, acrílico, metal), com tolerâncias e encaixes definidos conforme o projecto.',
    'services.packaging.title': 'Rótulos e embalagens',
    'services.packaging.description': 'Criação de arte para rótulos e embalagens, com design funcional e pronto para impressão.',
    'services.quote': 'Pedir orçamento',
    
    // Portfolio
    'portfolio.title': 'Portfólio',
    'portfolio.subtitle': 'Conheça alguns dos nossos trabalhos e projectos realizados',
    'portfolio.cta': 'Quero algo assim',
    'portfolio.projects.social': 'Projeto Wilds Art\'s - artes para redes sociais',
    'portfolio.projects.identity': 'Projeto Wilds Art\'s - identidade visual',
    'portfolio.projects.vector': 'Projeto Wilds Art\'s - vetorização',
    'portfolio.projects.packaging': 'Projeto Wilds Art\'s - rótulos e embalagens', 
    'portfolio.projects.manual': 'Projeto Wilds Art\'s - manual de marca',
    'portfolio.projects.motion': 'Projeto Wilds Art\'s - motion graphics',
    
    // Testimonials
    'testimonials.title': 'Testemunhos',
    'testimonials.subtitle': 'O que os nossos clientes dizem sobre o nosso trabalho',
    'testimonials.items': [
      {
        text: "Trabalho impecável! As peças chegaram prontas para produção, sem necessidade de ajustes. A qualidade técnica é excelente.",
        author: "Waldir",
        company: "Cia da Fé"
      },
      {
        text: "Entrega sempre no prazo e comunicação clara. Os arquivos são perfeitos para estamparia digital, facilitam muito nosso processo.",
        author: "Neiva",
        company: "Stamp|Cia"
      },
      {
        text: "Profissionalismo de primeira! O design da nossa marca ficou moderno e impactante. Recomendo sem dúvidas.",
        author: "Leandro",
        company: "LuminaBox"
      },
      {
        text: "Criatividade e atenção aos detalhes que fazem a diferença. Cada peça é pensada com carinho e técnica.",
        author: "Sandra",
        company: "Mimos da Drika"
      },
      {
        text: "Identidade visual forte e marcante! O resultado superou nossas expectativas e fortaleceu nossa presença no mercado.",
        author: "Kleber",
        company: "TransKav"
      },
      {
        text: "Design acolhedor que traduz perfeitamente o conceito da nossa cantina. Ficamos muito satisfeitas com o resultado!",
        author: "Izilda",
        company: "Cantina das Marias"
      }
    ],
    
    // Plans
    'plans.title': 'Design para Redes Sociais',
    'plans.subtitle': 'Conteúdo visual profissional e constante para as suas redes sociais.',
    'plans.recommended': 'Recomendado',
    'plans.hire': 'Contratar via WhatsApp',
    'plans.comparison': 'Comparativo de Planos',
    'plans.features': 'Recursos',
    'plans.faq.title': 'Perguntas Frequentes',
    'plans.faq.revisions.question': 'Como funcionam as revisões?',
    'plans.faq.revisions.answer': 'Incluídas por peça conforme plano. Mudança de conceito gera nova peça.',
    'plans.faq.formats.question': 'Que formatos de entrega?',
    'plans.faq.formats.answer': 'PNG, JPG, PDF para posts. MP4 para stories e motions.',
    'plans.faq.dates.question': 'Posso escolher as datas de publicação?',
    'plans.faq.dates.answer': 'Sim, você define as datas e nós criamos o conteúdo seguindo o seu cronograma.',
    'plans.faq.deadlines.question': 'Prazos de entrega?',
    'plans.faq.deadlines.answer': 'START 5 dias úteis; ESSENCIAL 3 dias úteis; PRO 48h; ELITE 24–48h (prioridade).',
    'plans.terms.title': 'Termos Resumidos',
    'plans.terms.content': 'Vigência mensal; pagamento antecipado; janela de revisões até 7 dias após entrega; cancelamento com 15 dias (sem reembolso do mês corrente); uso comercial liberado; banco de imagens premium pode ter custo adicional.',
    'plans.subscribe': 'Subscrever agora',
    
    // Clients
    'clients.title': 'Empresas que confiam no nosso trabalho',
    'clients.subtitle': 'Conheça algumas das empresas que já transformaram a sua identidade visual connosco',
    
    // Footer
    'footer.description': 'Wilds Art\'s — artes para redes sociais, identidade visual e manual de marca. Também vectorização, vectores para corte e gravação (MDF, acrílico, metal) e rótulos/embalagens.',
    'footer.rights': 'Todos os direitos reservados.',
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
    
    // About
    'about.title': 'About Us',
    'about.description': 'Wilds Art\'s was born from 23 years of design experience, acquired in visual communication companies, laser cutting, printing and manufacturing. We combine technical precision and result-oriented language, from post to production file.',
    
    // Services
    'services.title': 'Services',
    'services.subtitle': 'Complete design solutions to elevate your brand and business',
    'services.social.title': 'Social media arts',
    'services.social.description': 'Posts, stories, carousels and short motion; content planning, copywriting and art direction focused on conversion.',
    'services.identity.title': 'Visual identity',
    'services.identity.description': 'Logo, palette, typography and applications that position your brand.',
    'services.manual.title': 'Brand manual',
    'services.manual.description': 'Usage rules, grids, colors, typography, tone of voice and application examples.',
    'services.vectorization.title': 'Vectorization',
    'services.vectorization.description': 'Logos, illustrations and products with clean and faithful lines.',
    'services.cutting.title': 'Cutting and engraving vectors',
    'services.cutting.description': 'Optimized files for laser/router (MDF, acrylic, metal), with tolerances and fittings defined according to the project.',
    'services.packaging.title': 'Labels and packaging',
    'services.packaging.description': 'Art creation for labels and packaging, with functional design ready for printing.',
    'services.quote': 'Request quote',
    
    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Discover some of our completed works and projects',
    'portfolio.cta': 'I want something like this',
    'portfolio.projects.social': 'Wilds Art\'s Project - social media designs',
    'portfolio.projects.identity': 'Wilds Art\'s Project - visual identity',
    'portfolio.projects.vector': 'Wilds Art\'s Project - vectorization', 
    'portfolio.projects.packaging': 'Wilds Art\'s Project - labels and packaging',
    'portfolio.projects.manual': 'Wilds Art\'s Project - brand manual',
    'portfolio.projects.motion': 'Wilds Art\'s Project - motion graphics',
    
    // Testimonials
    'testimonials.title': 'Testimonials',
    'testimonials.subtitle': 'What our clients say about our work',
    'testimonials.items': [
      {
        text: "Impeccable work! The pieces arrived ready for production, no adjustments needed. The technical quality is excellent.",
        author: "Waldir",
        company: "Cia da Fé"
      },
      {
        text: "Always on time delivery and clear communication. The files are perfect for digital printing, they make our process much easier.",
        author: "Neiva",
        company: "Stamp|Cia"
      },
      {
        text: "First-class professionalism! Our brand design turned out modern and impactful. I recommend without a doubt.",
        author: "Leandro",
        company: "LuminaBox"
      },
      {
        text: "Creativity and attention to detail that make the difference. Each piece is designed with care and technique.",
        author: "Sandra",
        company: "Mimos da Drika"
      },
      {
        text: "Strong and striking visual identity! The result exceeded our expectations and strengthened our market presence.",
        author: "Kleber",
        company: "TransKav"
      },
      {
        text: "Welcoming design that perfectly translates our cafeteria concept. We were very satisfied with the result!",
        author: "Izilda",
        company: "Cantina das Marias"
      }
    ],
    
    // Plans
    'plans.title': 'Social Media Design',
    'plans.subtitle': 'Professional and consistent visual content for your social networks.',
    'plans.recommended': 'Recommended',
    'plans.hire': 'Hire via WhatsApp',
    'plans.comparison': 'Plan Comparison',
    'plans.features': 'Features',
    'plans.faq.title': 'Frequently Asked Questions',
    'plans.faq.revisions.question': 'How do revisions work?',
    'plans.faq.revisions.answer': 'Included per piece according to plan. Concept change generates new piece.',
    'plans.faq.formats.question': 'What delivery formats?',
    'plans.faq.formats.answer': 'PNG, JPG, PDF for posts. MP4 for stories and motions.',
    'plans.faq.dates.question': 'Can I choose posting dates?',
    'plans.faq.dates.answer': 'Yes, you define the dates and we create content following your schedule.',
    'plans.faq.deadlines.question': 'Delivery deadlines?',
    'plans.faq.deadlines.answer': 'START 5 business days; ESSENCIAL 3 business days; PRO 48h; ELITE 24–48h (priority).',
    'plans.terms.title': 'Summary Terms',
    'plans.terms.content': 'Monthly validity; advance payment; revision window up to 7 days after delivery; cancellation with 15 days (no refund for current month); commercial use allowed; premium image bank may have additional cost.',
    'plans.subscribe': 'Subscribe now',
    'plans.period': '/month',
    'plans.start.description': '4 posts + 4 stories • 1 revision/piece • 5 business days deadline',
    'plans.start.features': '4 posts per month|4 stories per month|1 revision per piece|5 business days deadline',
    'plans.essencial.description': '8 posts + 8 stories • 1 carousel (up to 7 pages) • 2 revisions/piece • 3 business days deadline',
    'plans.essencial.features': '8 posts per month|8 stories per month|1 carousel (up to 7 pages)|2 revisions per piece|3 business days deadline',
    'plans.pro.description': '12 posts + 12 stories • 2 carousels • 1 motion up to 10s • 2 revisions/piece • 48h deadline',
    'plans.pro.features': '12 posts per month|12 stories per month|2 carousels|1 motion up to 10s|2 revisions per piece|48h deadline',
    'plans.elite.description': '16 posts + 16 stories • 3 carousels • 2 motions up to 10s • 3 revisions/piece • priority 24–48h',
    'plans.elite.features': '16 posts per month|16 stories per month|3 carousels|2 motions up to 10s|3 revisions per piece|Priority 24-48h',
    'plans.table.posts': 'Posts/month',
    'plans.table.stories': 'Stories/month',
    'plans.table.carousels': 'Carousels',
    'plans.table.motion': 'Motion',
    'plans.table.revisions': 'Revisions/piece',
    'plans.table.deadline': 'Deadline',
    'plans.table.deadline_5days': '5 days',
    'plans.table.deadline_3days': '3 days',
    'plans.table.deadline_48h': '48h',
    'plans.table.deadline_24_48h': '24-48h',
    
    // Clients
    'clients.title': 'Companies that trust our work',
    'clients.subtitle': 'Meet some of the companies that have already transformed their visual identity with us',
    
    // Footer
    'footer.description': 'Wilds Art\'s — social media arts, visual identity and brand manual. Also vectorization, cutting and engraving vectors (MDF, acrylic, metal) and labels/packaging.',
    'footer.rights': 'All rights reserved.',
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
    
    // About
    'about.title': 'Quiénes Somos',
    'about.description': 'Wilds Art\'s nace con 23 años de experiencia en diseño, adquirida en empresas de comunicación visual, corte láser, estampado y confección. Unimos precisión técnica y lenguaje orientado a resultados, del post al archivo de producción.',
    
    // Services
    'services.title': 'Servicios',
    'services.subtitle': 'Soluciones completas de diseño para elevar tu marca y negocio',
    'services.social.title': 'Artes para redes sociales',
    'services.social.description': 'Posts, stories, carruseles y motion corto; pauta, copy y dirección de arte enfocado en conversión.',
    'services.identity.title': 'Identidad visual',
    'services.identity.description': 'Logo, paleta, tipografía y aplicaciones que posicionan tu marca.',
    'services.manual.title': 'Manual de marca',
    'services.manual.description': 'Reglas de uso, grids, colores, tipografía, tono de voz y ejemplos de aplicación.',
    'services.vectorization.title': 'Vectorización',
    'services.vectorization.description': 'Logos, ilustraciones y productos con trazos limpios y fieles.',
    'services.cutting.title': 'Vectores para corte y grabado',
    'services.cutting.description': 'Archivos optimizados para láser/router (MDF, acrílico, metal), con tolerancias y encajes definidos según el proyecto.',
    'services.packaging.title': 'Etiquetas y empaques',
    'services.packaging.description': 'Creación de arte para etiquetas y empaques, con diseño funcional y listo para impresión.',
    'services.quote': 'Solicitar cotización',
    
    // Portfolio
    'portfolio.title': 'Portafolio',
    'portfolio.subtitle': 'Conoce algunos de nuestros trabajos y proyectos realizados',
    'portfolio.cta': 'Quiero algo así',
    'portfolio.projects.social': 'Proyecto Wilds Art\'s - diseños para redes sociales',
    'portfolio.projects.identity': 'Proyecto Wilds Art\'s - identidad visual',
    'portfolio.projects.vector': 'Proyecto Wilds Art\'s - vectorización',
    'portfolio.projects.packaging': 'Proyecto Wilds Art\'s - etiquetas y empaques', 
    'portfolio.projects.manual': 'Proyecto Wilds Art\'s - manual de marca',
    'portfolio.projects.motion': 'Proyecto Wilds Art\'s - motion graphics',
    
    // Testimonials
    'testimonials.title': 'Testimonios',
    'testimonials.subtitle': 'Lo que nuestros clientes dicen sobre nuestro trabajo',
    'testimonials.items': [
      {
        text: "¡Trabajo impecable! Las piezas llegaron listas para producción, sin necesidad de ajustes. La calidad técnica es excelente.",
        author: "Waldir",
        company: "Cia da Fé"
      },
      {
        text: "Entrega siempre a tiempo y comunicación clara. Los archivos son perfectos para estampado digital, facilitan mucho nuestro proceso.",
        author: "Neiva",
        company: "Stamp|Cia"
      },
      {
        text: "¡Profesionalismo de primera! El diseño de nuestra marca quedó moderno e impactante. Lo recomiendo sin dudas.",
        author: "Leandro",
        company: "LuminaBox"
      },
      {
        text: "Creatividad y atención a los detalles que marcan la diferencia. Cada pieza está pensada con cariño y técnica.",
        author: "Sandra",
        company: "Mimos da Drika"
      },
      {
        text: "¡Identidad visual fuerte y llamativa! El resultado superó nuestras expectativas y fortaleció nuestra presencia en el mercado.",
        author: "Kleber",
        company: "TransKav"
      },
      {
        text: "Diseño acogedor que traduce perfectamente el concepto de nuestra cantina. ¡Quedamos muy satisfechas con el resultado!",
        author: "Izilda",
        company: "Cantina das Marias"
      }
    ],
    
    // Plans
    'plans.title': 'Diseño para Redes Sociales',
    'plans.subtitle': 'Contenido visual profesional y constante para tus redes sociales.',
    'plans.recommended': 'Recomendado',
    'plans.hire': 'Contratar vía WhatsApp',
    'plans.comparison': 'Comparativo de Planes',
    'plans.features': 'Características',
    'plans.faq.title': 'Preguntas Frecuentes',
    'plans.faq.revisions.question': '¿Cómo funcionan las revisiones?',
    'plans.faq.revisions.answer': 'Incluidas por pieza según el plan. Cambio de concepto genera nueva pieza.',
    'plans.faq.formats.question': '¿Qué formatos de entrega?',
    'plans.faq.formats.answer': 'PNG, JPG, PDF para posts. MP4 para stories y motions.',
    'plans.faq.dates.question': '¿Puedo elegir las fechas de publicación?',
    'plans.faq.dates.answer': 'Sí, defines las fechas y creamos contenido siguiendo tu cronograma.',
    'plans.faq.deadlines.question': '¿Plazos de entrega?',
    'plans.faq.deadlines.answer': 'START 5 días hábiles; ESSENCIAL 3 días hábiles; PRO 48h; ELITE 24–48h (prioridad).',
    'plans.terms.title': 'Términos Resumidos',
    'plans.terms.content': 'Vigencia mensual; pago anticipado; ventana de revisiones hasta 7 días después de la entrega; cancelación con 15 días (sin reembolso del mes corriente); uso comercial permitido; banco de imágenes premium puede tener costo adicional.',
    'plans.subscribe': 'Suscribirse ahora',
    'plans.period': '/mes',
    'plans.start.description': '4 posts + 4 stories • 1 revisión/pieza • plazo de 5 días hábiles',
    'plans.start.features': '4 posts por mes|4 stories por mes|1 revisión por pieza|Plazo de 5 días hábiles',
    'plans.essencial.description': '8 posts + 8 stories • 1 carrusel (hasta 7 págs) • 2 revisiones/pieza • plazo de 3 días hábiles',
    'plans.essencial.features': '8 posts por mes|8 stories por mes|1 carrusel (hasta 7 págs)|2 revisiones por pieza|Plazo de 3 días hábiles',
    'plans.pro.description': '12 posts + 12 stories • 2 carruseles • 1 motion hasta 10s • 2 revisiones/pieza • plazo de 48h',
    'plans.pro.features': '12 posts por mes|12 stories por mes|2 carruseles|1 motion hasta 10s|2 revisiones por pieza|Plazo de 48h',
    'plans.elite.description': '16 posts + 16 stories • 3 carruseles • 2 motions hasta 10s • 3 revisiones/pieza • prioridad 24–48h',
    'plans.elite.features': '16 posts por mes|16 stories por mes|3 carruseles|2 motions hasta 10s|3 revisiones por pieza|Prioridad 24-48h',
    'plans.table.posts': 'Posts/mes',
    'plans.table.stories': 'Stories/mes',
    'plans.table.carousels': 'Carruseles',
    'plans.table.motion': 'Motion',
    'plans.table.revisions': 'Revisiones/pieza',
    'plans.table.deadline': 'Plazo',
    'plans.table.deadline_5days': '5 días',
    'plans.table.deadline_3days': '3 días',
    'plans.table.deadline_48h': '48h',
    'plans.table.deadline_24_48h': '24-48h',
    
    // Clients
    'clients.title': 'Empresas que confían en nuestro trabajo',
    'clients.subtitle': 'Conoce algunas de las empresas que ya transformaron su identidad visual con nosotros',
    
    // Footer
    'footer.description': 'Wilds Art\'s — artes para redes sociales, identidad visual y manual de marca. También vectorización, vectores para corte y grabado (MDF, acrílico, metal) y etiquetas/empaques.',
    'footer.rights': 'Todos los derechos reservados.',
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
    
    // About
    'about.title': 'Qui Sommes-Nous',
    'about.description': 'Wilds Art\'s naît avec 23 ans d\'expérience en design, acquise dans des entreprises de communication visuelle, découpe laser, impression et confection. Nous combinons précision technique et langage orienté résultat, du post au fichier de production.',
    
    // Services
    'services.title': 'Services',
    'services.subtitle': 'Solutions de design complètes pour élever votre marque et entreprise',
    'services.social.title': 'Arts pour réseaux sociaux',
    'services.social.description': 'Posts, stories, carrousels et motion court ; planning de contenu, rédaction et direction artistique axée sur la conversion.',
    'services.identity.title': 'Identité visuelle',
    'services.identity.description': 'Logo, palette, typographie et applications qui positionnent votre marque.',
    'services.manual.title': 'Manuel de marque',
    'services.manual.description': 'Règles d\'usage, grilles, couleurs, typographie, ton de voix et exemples d\'application.',
    'services.vectorization.title': 'Vectorisation',
    'services.vectorization.description': 'Logos, illustrations et produits avec des traits nets et fidèles.',
    'services.cutting.title': 'Vecteurs pour découpe et gravure',
    'services.cutting.description': 'Fichiers optimisés pour laser/routeur (MDF, acrylique, métal), avec tolérances et assemblages définis selon le projet.',
    'services.packaging.title': 'Étiquettes et emballages',
    'services.packaging.description': 'Création d\'art pour étiquettes et emballages, avec design fonctionnel prêt pour l\'impression.',
    'services.quote': 'Demander un devis',
    
    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Découvrez quelques-uns de nos travaux et projets réalisés',
    'portfolio.cta': 'Je veux quelque chose comme ça',
    'portfolio.projects.social': 'Projet Wilds Art\'s - créations pour réseaux sociaux',
    'portfolio.projects.identity': 'Projet Wilds Art\'s - identité visuelle',
    'portfolio.projects.vector': 'Projet Wilds Art\'s - vectorisation',
    'portfolio.projects.packaging': 'Projet Wilds Art\'s - étiquettes et emballages',
    'portfolio.projects.manual': 'Projet Wilds Art\'s - manuel de marque', 
    'portfolio.projects.motion': 'Projet Wilds Art\'s - motion graphics',
    
    // Testimonials
    'testimonials.title': 'Témoignages',
    'testimonials.subtitle': 'Ce que nos clients disent de notre travail',
    'testimonials.items': [
      {
        text: "Travail impeccable ! Les pièces sont arrivées prêtes pour la production, sans besoin d'ajustements. La qualité technique est excellente.",
        author: "Waldir",
        company: "Cia da Fé"
      },
      {
        text: "Livraison toujours à temps et communication claire. Les fichiers sont parfaits pour l'impression numérique, ils facilitent beaucoup notre processus.",
        author: "Neiva",
        company: "Stamp|Cia"
      },
      {
        text: "Professionnalisme de première classe ! Le design de notre marque est devenu moderne et percutant. Je recommande sans hésitation.",
        author: "Leandro",
        company: "LuminaBox"
      },
      {
        text: "Créativité et attention aux détails qui font la différence. Chaque pièce est conçue avec soin et technique.",
        author: "Sandra",
        company: "Mimos da Drika"
      },
      {
        text: "Identité visuelle forte et marquante ! Le résultat a dépassé nos attentes et renforcé notre présence sur le marché.",
        author: "Kleber",
        company: "TransKav"
      },
      {
        text: "Design accueillant qui traduit parfaitement le concept de notre cantine. Nous avons été très satisfaites du résultat !",
        author: "Izilda",
        company: "Cantina das Marias"
      }
    ],
    
    // Plans
    'plans.title': 'Design pour Réseaux Sociaux',
    'plans.subtitle': 'Contenu visuel professionnel et constant pour vos réseaux sociaux.',
    'plans.recommended': 'Recommandé',
    'plans.hire': 'Embaucher via WhatsApp',
    'plans.comparison': 'Comparaison des Plans',
    'plans.features': 'Fonctionnalités',
    'plans.faq.title': 'Questions Fréquentes',
    'plans.faq.revisions.question': 'Comment fonctionnent les révisions ?',
    'plans.faq.revisions.answer': 'Incluses par pièce selon le plan. Changement de concept génère une nouvelle pièce.',
    'plans.faq.formats.question': 'Quels formats de livraison ?',
    'plans.faq.formats.answer': 'PNG, JPG, PDF pour les posts. MP4 pour les stories et motions.',
    'plans.faq.dates.question': 'Puis-je choisir les dates de publication ?',
    'plans.faq.dates.answer': 'Oui, vous définissez les dates et nous créons le contenu selon votre calendrier.',
    'plans.faq.deadlines.question': 'Délais de livraison ?',
    'plans.faq.deadlines.answer': 'START 5 jours ouvrables ; ESSENCIAL 3 jours ouvrables ; PRO 48h ; ELITE 24–48h (priorité).',
    'plans.terms.title': 'Termes Résumés',
    'plans.terms.content': 'Validité mensuelle ; paiement anticipé ; fenêtre de révision jusqu\'à 7 jours après livraison ; annulation avec 15 jours (pas de remboursement pour le mois en cours) ; usage commercial autorisé ; banque d\'images premium peut avoir un coût supplémentaire.',
    'plans.subscribe': 'S\'abonner maintenant',
    'plans.period': '/mois',
    'plans.start.description': '4 posts + 4 stories • 1 révision/pièce • délai de 5 jours ouvrables',
    'plans.start.features': '4 posts par mois|4 stories par mois|1 révision par pièce|Délai de 5 jours ouvrables',
    'plans.essencial.description': '8 posts + 8 stories • 1 carrousel (jusqu\'à 7 pages) • 2 révisions/pièce • délai de 3 jours ouvrables',
    'plans.essencial.features': '8 posts par mois|8 stories par mois|1 carrousel (jusqu\'à 7 pages)|2 révisions par pièce|Délai de 3 jours ouvrables',
    'plans.pro.description': '12 posts + 12 stories • 2 carrousels • 1 motion jusqu\'à 10s • 2 révisions/pièce • délai de 48h',
    'plans.pro.features': '12 posts par mois|12 stories par mois|2 carrousels|1 motion jusqu\'à 10s|2 révisions par pièce|Délai de 48h',
    'plans.elite.description': '16 posts + 16 stories • 3 carrousels • 2 motions jusqu\'à 10s • 3 révisions/pièce • priorité 24–48h',
    'plans.elite.features': '16 posts par mois|16 stories par mois|3 carrousels|2 motions jusqu\'à 10s|3 révisions par pièce|Priorité 24-48h',
    'plans.table.posts': 'Posts/mois',
    'plans.table.stories': 'Stories/mois',
    'plans.table.carousels': 'Carrousels',
    'plans.table.motion': 'Motion',
    'plans.table.revisions': 'Révisions/pièce',
    'plans.table.deadline': 'Délai',
    'plans.table.deadline_5days': '5 jours',
    'plans.table.deadline_3days': '3 jours',
    'plans.table.deadline_48h': '48h',
    'plans.table.deadline_24_48h': '24-48h',
    
    // Clients
    'clients.title': 'Entreprises qui font confiance à notre travail',
    'clients.subtitle': 'Rencontrez quelques-unes des entreprises qui ont déjà transformé leur identité visuelle avec nous',
    
    // Footer
    'footer.description': 'Wilds Art\'s — arts pour réseaux sociaux, identité visuelle et manuel de marque. Aussi vectorisation, vecteurs pour découpe et gravure (MDF, acrylique, métal) et étiquettes/emballages.',
    'footer.rights': 'Tous droits réservés.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');
  const { currency, prices } = detectCurrencyAndPrices();

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

  const t = (key: string): any => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, currency, prices }}>
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