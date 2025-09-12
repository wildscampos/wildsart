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
    'Europe/Vilnius', 'Europe/Ljubljana', 'Europe/Bratislava', 'Europe/Nicosia'
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
      prices: ['297', '597', '797', '997']
    };
  } else if (usTimezones.some(tz => timeZone.includes(tz)) || locale.includes('en-US')) {
    return {
      currency: '$',
      prices: ['297', '597', '797', '997']
    };
  } else {
    return {
      currency: 'R$',
      prices: ['297', '597', '797', '997']
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
    'hero.cta.quote': 'Falar agora com a Wilds Art\'s',
    'hero.cta.portfolio': 'Ver portfólio',
    'hero.trust.experience': '23 anos de experiência',
    'hero.trust.ready': 'Arquivos prontos para produção',
    'hero.trust.fast': 'Atendimento rápido',
    
    // Contact
    'contact.title': 'Entre em contato com a Wilds Art\'s\ncontato direto e rápido',
    'contact.subtitle': 'Entre em contato conosco para solicitar seu orçamento personalizado',
    'contact.whatsapp': 'WhatsApp',
    
    // WhatsApp
    'whatsapp.greeting': 'Olá! 👋 Como posso te ajudar hoje?',
    'whatsapp.cta': 'Clique no botão abaixo para conversar pelo WhatsApp!',
    'whatsapp.button': 'Conversar no WhatsApp',
    'whatsapp.online': 'Online agora',
    'whatsapp.aria': 'Abrir chat do WhatsApp',
    'whatsapp.message': 'Olá! Gostaria de saber mais sobre os serviços da Wilds Art\'s.',
    
    // About
    'about.title': 'Quem Somos',
    'about.description': [
      '23 anos de experiência em design',
      'Precisão técnica e criatividade',
      'Do post ao arquivo de produção',
      'Artes prontas para impressão ou corte'
    ],
    
    // Services
    'services.title': 'Serviços\nCompletos de Design',
    'services.subtitle': 'Soluções completas de design para elevar sua marca e negócio',
    'services.social.title': 'Artes para redes sociais',
    'services.social.description': 'Posts, stories, carrosséis e motion curto; pauta, copy e direção de arte focada em conversão.',
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
    'services.silkscreen.title': 'Arte para Silk-Screen',
    'services.silkscreen.description': 'Criação de artes otimizadas para impressão em serigrafia, com cores separadas e especificações técnicas precisas.',
    'services.landingpage.title': 'Landing Page',
    'services.landingpage.description': 'Páginas de conversão profissionais com design responsivo e foco em resultados.',
    'services.quote': 'Solicitar orçamento deste serviço',
    
    // Portfolio
    'portfolio.title': 'Portfólio',
    'portfolio.subtitle': 'Conheça alguns dos nossos trabalhos e projetos realizados',
    'portfolio.cta': 'Quero algo assim',
    'portfolio.projects.social': 'Projeto Wilds Art\'s - designs para redes sociais',
    'portfolio.projects.identity': 'Projeto Wilds Art\'s - identidade visual',
    'portfolio.projects.vector': 'Projeto Wilds Art\'s - vetorização', 
    'portfolio.projects.packaging': 'Projeto Wilds Art\'s - rótulos e embalagens',
    'portfolio.projects.manual': 'Projeto Wilds Art\'s - manual de marca',
    'portfolio.projects.motion': 'Projeto Wilds Art\'s - motion graphics',
    
    // Testimonials
    'testimonials.title': 'Veja como ajudamos empresas reais a crescer com design',
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
    'plans.title': 'Design para Redes Sociais\nPacotes Mensais',
    'plans.subtitle': 'Conteúdo visual profissional e constante para suas redes sociais.',
    'plans.recommended': 'Recomendado',
    'plans.hire': 'Quero este plano no WhatsApp',
    'plans.comparison': 'Comparativo de Planos',
    'plans.features': 'Características',
    'plans.faq.title': 'Perguntas Frequentes',
    'plans.faq.revisions.question': 'Como funcionam as revisões?',
    'plans.faq.revisions.answer': 'Incluídas por peça conforme o plano. Mudança de conceito gera nova peça.',
    'plans.faq.formats.question': 'Quais formatos de entrega?',
    'plans.faq.formats.answer': 'PNG, JPG, PDF para posts. MP4 para stories e motions.',
    'plans.faq.dates.question': 'Posso escolher as datas de postagem?',
    'plans.faq.dates.answer': 'Sim, você define as datas e criamos conteúdo seguindo seu cronograma.',
    'plans.faq.deadlines.question': 'Prazos de entrega?',
    'plans.faq.deadlines.answer': 'START 5 dias úteis; ESSENCIAL 3 dias úteis; PRO 48h; ELITE 24–48h (prioridade).',
    'plans.terms.title': 'Termos Resumidos',
    'plans.terms.content': 'Validade mensal; pagamento antecipado; janela de revisões até 7 dias após entrega; cancelamento com 15 dias (sem reembolso mês corrente); uso comercial permitido; banco de imagens premium pode ter custo adicional.',
    'plans.subscribe': 'Assinar agora',
    'plans.period': '/mês',
    'plans.start.description': '4 posts + 4 stories • 1 revisão/peça • prazo de 5 dias úteis',
    'plans.start.features': '4 posts por mês|4 stories por mês|1 revisão por peça|Prazo de 5 dias úteis',
    'plans.start.benefit': 'Ideal para quem precisa de presença profissional nas redes.',
    'plans.essencial.description': '8 posts + 8 stories • 1 carrossel (até 7 págs) • 2 revisões/peça • prazo de 3 dias úteis',
    'plans.essencial.features': '8 posts por mês|8 stories por mês|1 carrossel (até 7 págs)|2 revisões por peça|Prazo de 3 dias úteis',
    'plans.essencial.benefit': 'Entrega em até 72h para manter sua marca sempre atual.',
    'plans.pro.description': '12 posts + 12 stories • 2 carrosséis • 1 motion até 10s • 2 revisões/peça • prazo de 48h',
    'plans.pro.features': '12 posts por mês|12 stories por mês|2 carrosséis|1 motion até 10s|2 revisões por peça|Prazo de 48h',
    'plans.pro.benefit': 'Entrega em até 48h para manter sua marca sempre atual.',
    'plans.elite.description': '16 posts + 16 stories • 3 carrosséis • 2 motions até 10s • 3 revisões/peça • prioridade 24–48h',
    'plans.elite.features': '16 posts por mês|16 stories por mês|3 carrosséis|2 motions até 10s|3 revisões por peça|Prioridade 24-48h',
    'plans.elite.benefit': 'Plano Elite: prioridade máxima para demandas urgentes.',
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
    
    // Individual Services
    'individual.title': 'Serviços Individuais',
    'individual.subtitle': 'Valores e descrições para contratação de serviços avulsos',
    'individual.quote': 'Solicitar orçamento',
    'individual.social.name': 'Artes para redes sociais',
    'individual.social.description': 'Posts, stories, carrosséis, motion curto, com pauta e copy',
    'individual.social.unit': 'Por peça',
    'individual.identity.name': 'Identidade visual',
    'individual.identity.description': 'Logo, paleta, tipografia e aplicações para posicionamento',
    'individual.identity.unit': 'Por projeto',
    'individual.manual.name': 'Manual de marca',
    'individual.manual.description': 'Regras de uso, grids, cores, tipografia, tom de voz, exemplos',
    'individual.manual.unit': 'Por projeto',
    'individual.vectorization.name': 'Vetorizações',
    'individual.vectorization.description': 'Logos, ilustrações e produtos digitalizados com traços fiéis',
    'individual.vectorization.unit': 'Por arte',
    'individual.cutting.name': 'Vetores para corte e gravação',
    'individual.cutting.description': 'Arquivos otimizados para laser/router (MDF, acrílico, metal)',
    'individual.cutting.unit': 'Por arquivo',
    'individual.packaging.name': 'Rótulos e embalagens',
    'individual.packaging.description': 'Arte funcional para rótulos/embalagens, pronta para impressão',
    'individual.packaging.unit': 'Por peça/projeto',
    'individual.silkscreen.name': 'Arte para Silk-Screen',
    'individual.silkscreen.description': 'Artes otimizadas, separação de cores e especificações técnicas',
    'individual.silkscreen.unit': 'Por arte',
    'individual.landingpage.name': 'Landing Page',
    'individual.landingpage.description': 'Página de conversão, design responsivo, foco em resultados',
    'individual.landingpage.unit': 'Por projeto',
    
    // Clients
    'clients.title': 'Empresas que confiam no nosso trabalho',
    'clients.subtitle': 'Conheça algumas das empresas que já transformaram sua identidade visual conosco',
    
    // Footer
    'footer.description': 'Wilds Art\'s\nartes para redes sociais, identidade visual e manual de marca. Também vetorização, vetores para corte e gravação (MDF, acrílico, metal) e rótulos/embalagens.',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.nav.home': 'Início',
    'footer.nav.services': 'Serviços',
    'footer.nav.plans': 'Planos',
    'footer.nav.portfolio': 'Portfólio',
    'footer.nav.testimonials': 'Depoimentos',
    'footer.nav.contact': 'Contato',
  },
  
  'pt-PT': {
    // Navigation
    'nav.home': 'Início',
    'nav.services': 'Serviços',
    'nav.portfolio': 'Portfólio',
    'nav.testimonials': 'Depoimentos',
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
    'contact.title': 'Fale com a Wilds Art\'s\ncontacto directo e rápido',
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
    'services.silkscreen.title': 'Arte para Silk-Screen',
    'services.silkscreen.description': 'Criação de artes optimizadas para impressão em serigrafia, com cores separadas e especificações técnicas precisas.',
    'services.landingpage.title': 'Landing Page',
    'services.landingpage.description': 'Páginas de conversão profissionais com design responsivo e foco em resultados.',
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
    
    // Individual Services
    'individual.title': 'Serviços Individuais',
    'individual.subtitle': 'Valores e descrições para contratação de serviços avulsos',
    'individual.quote': 'Solicitar orçamento',
    'individual.social.name': 'Artes para redes sociais',
    'individual.social.description': 'Posts, stories, carrosséis, motion curto, com pauta e copy',
    'individual.social.unit': 'Por peça',
    'individual.identity.name': 'Identidade visual',
    'individual.identity.description': 'Logo, paleta, tipografia e aplicações para posicionamento',
    'individual.identity.unit': 'Por projeto',
    'individual.manual.name': 'Manual de marca',
    'individual.manual.description': 'Regras de uso, grids, cores, tipografia, tom de voz, exemplos',
    'individual.manual.unit': 'Por projeto',
    'individual.vectorization.name': 'Vetorizações',
    'individual.vectorization.description': 'Logos, ilustrações e produtos digitalizados com traços fiéis',
    'individual.vectorization.unit': 'Por arte',
    'individual.cutting.name': 'Vetores para corte e gravação',
    'individual.cutting.description': 'Arquivos otimizados para laser/router (MDF, acrílico, metal)',
    'individual.cutting.unit': 'Por arquivo',
    'individual.packaging.name': 'Rótulos e embalagens',
    'individual.packaging.description': 'Arte funcional para rótulos/embalagens, pronta para impressão',
    'individual.packaging.unit': 'Por peça/projeto',
    'individual.silkscreen.name': 'Arte para Silk-Screen',
    'individual.silkscreen.description': 'Artes otimizadas, separação de cores e especificações técnicas',
    'individual.silkscreen.unit': 'Por arte',
    'individual.landingpage.name': 'Landing Page',
    'individual.landingpage.description': 'Página de conversão, design responsivo, foco em resultados',
    'individual.landingpage.unit': 'Por projeto',
    
    // Clients
    'clients.title': 'Empresas que confiam no nosso trabalho',
    'clients.subtitle': 'Conheça algumas das empresas que já transformaram sua identidade visual conosco',
    
    // Footer
    'footer.description': 'Wilds Art\'s\nartes para redes sociais, identidade visual e manual de marca. Também vectorização, vectores para corte e gravação (MDF, acrílico, metal) e rótulos/embalagens.',
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
    'contact.title': 'Contact Wilds Art\'s\ndirect and fast contact',
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
    'about.description': [
      '23 years of experience in design',
      'Technical precision and creativity',
      'From post to production file',
      'Arts ready for printing or cutting'
    ],
    
    // Services
    'services.title': 'Complete Design Services',
    'services.subtitle': 'Complete design solutions to elevate your brand and business',
    'services.social.title': 'Social media arts',
    'services.social.description': 'Posts, stories, carousels and short motion; content planning, copy and art direction focused on conversion.',
    'services.identity.title': 'Visual identity',
    'services.identity.description': 'Logo, palette, typography and applications that position your brand.',
    'services.manual.title': 'Brand manual',
    'services.manual.description': 'Usage rules, grids, colors, typography, tone of voice and application examples.',
    'services.vectorization.title': 'Vectorization',
    'services.vectorization.description': 'Logos, illustrations and products with clean and faithful strokes.',
    'services.cutting.title': 'Cutting and engraving vectors',
    'services.cutting.description': 'Files optimized for laser/router (MDF, acrylic, metal), with tolerances and fittings defined according to the project.',
    'services.packaging.title': 'Labels and packaging',
    'services.packaging.description': 'Art creation for labels and packaging, with functional design ready for printing.',
    'services.silkscreen.title': 'Silk-Screen art',
    'services.silkscreen.description': 'Creation of arts optimized for screen printing, with separated colors and precise technical specifications.',
    'services.landingpage.title': 'Landing Page',
    'services.landingpage.description': 'Professional conversion pages with responsive design and results focus.',
    'services.quote': 'Request quote for this service',
    
    // Individual Services
    'individual.title': 'Individual Services',
    'individual.subtitle': 'Prices and descriptions for individual service contracts',
    'individual.quote': 'Request quote',
    'individual.social.name': 'Social media arts',
    'individual.social.description': 'Posts, stories, carousels, short motion, with content and copy',
    'individual.social.unit': 'Per piece',
    'individual.identity.name': 'Visual identity',
    'individual.identity.description': 'Logo, palette, typography and applications for positioning',
    'individual.identity.unit': 'Per project',
    'individual.manual.name': 'Brand manual',
    'individual.manual.description': 'Usage rules, grids, colors, typography, tone of voice, examples',
    'individual.manual.unit': 'Per project',
    'individual.vectorization.name': 'Vectorizations',
    'individual.vectorization.description': 'Logos, illustrations and products digitized with faithful strokes',
    'individual.vectorization.unit': 'Per art',
    'individual.cutting.name': 'Cutting and engraving vectors',
    'individual.cutting.description': 'Files optimized for laser/router (MDF, acrylic, metal)',
    'individual.cutting.unit': 'Per file',
    'individual.packaging.name': 'Labels and packaging',
    'individual.packaging.description': 'Functional art for labels/packaging, ready for printing',
    'individual.packaging.unit': 'Per piece/project',
    'individual.silkscreen.name': 'Silk-Screen art',
    'individual.silkscreen.description': 'Optimized arts, color separation and technical specifications',
    'individual.silkscreen.unit': 'Per art',
    'individual.landingpage.name': 'Landing Page',
    'individual.landingpage.description': 'Conversion page, responsive design, results focused',
    'individual.landingpage.unit': 'Per project',
    
    // Clients
    'clients.title': 'Companies that trust our work',
    'clients.subtitle': 'Meet some of the companies that have already transformed their visual identity with us',
    
    // Footer
    'footer.description': 'Wilds Art\'s\nsocial media arts, visual identity and brand manual. Also vectorization, cutting and engraving vectors (MDF, acrylic, metal) and labels/packaging.',
    'footer.rights': 'All rights reserved.',
    'footer.nav.home': 'Home',
    'footer.nav.services': 'Services',
    'footer.nav.plans': 'Plans',
    'footer.nav.portfolio': 'Portfolio',
    'footer.nav.testimonials': 'Testimonials',
    'footer.nav.contact': 'Contact',
  },
  
  'es': {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.portfolio': 'Portafolio',
    'nav.testimonials': 'Testimonios',
    'nav.plans': 'Planes',
    'nav.contact': 'Contacto',
    
    // Individual Services
    'individual.title': 'Servicios Individuales',
    'individual.subtitle': 'Valores y descripciones para contratación de servicios individuales',
    'individual.quote': 'Solicitar cotización',
    'individual.social.name': 'Artes para redes sociales',
    'individual.social.description': 'Posts, stories, carruseles, motion corto, con pauta y copy',
    'individual.social.unit': 'Por pieza',
    'individual.identity.name': 'Identidad visual',
    'individual.identity.description': 'Logo, paleta, tipografía y aplicaciones para posicionamiento',
    'individual.identity.unit': 'Por proyecto',
    'individual.manual.name': 'Manual de marca',
    'individual.manual.description': 'Reglas de uso, grids, colores, tipografía, tono de voz, ejemplos',
    'individual.manual.unit': 'Por proyecto',
    'individual.vectorization.name': 'Vectorizaciones',
    'individual.vectorization.description': 'Logos, ilustraciones y productos digitalizados con trazos fieles',
    'individual.vectorization.unit': 'Por arte',
    'individual.cutting.name': 'Vectores para corte y grabado',
    'individual.cutting.description': 'Archivos optimizados para láser/router (MDF, acrílico, metal)',
    'individual.cutting.unit': 'Por archivo',
    'individual.packaging.name': 'Etiquetas y empaques',
    'individual.packaging.description': 'Arte funcional para etiquetas/empaques, listo para impresión',
    'individual.packaging.unit': 'Por pieza/proyecto',
    'individual.silkscreen.name': 'Arte para Silk-Screen',
    'individual.silkscreen.description': 'Artes optimizados, separación de colores y especificaciones técnicas',
    'individual.silkscreen.unit': 'Por arte',
    'individual.landingpage.name': 'Landing Page',
    'individual.landingpage.description': 'Página de conversión, diseño responsivo, enfoque en resultados',
    'individual.landingpage.unit': 'Por proyecto',
    
    // Footer
    'footer.nav.home': 'Inicio',
    'footer.nav.services': 'Servicios',
    'footer.nav.plans': 'Planes',
    'footer.nav.portfolio': 'Portafolio',
    'footer.nav.testimonials': 'Testimonios',
    'footer.nav.contact': 'Contacto',
  },
  
  'fr': {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.testimonials': 'Témoignages',
    'nav.plans': 'Plans',
    'nav.contact': 'Contact',
    
    // Individual Services
    'individual.title': 'Services Individuels',
    'individual.subtitle': 'Prix et descriptions pour la contractualisation de services individuels',
    'individual.quote': 'Demander un devis',
    'individual.social.name': 'Arts pour réseaux sociaux',
    'individual.social.description': 'Posts, stories, carrousels, motion court, avec planning et copy',
    'individual.social.unit': 'Par pièce',
    'individual.identity.name': 'Identité visuelle',
    'individual.identity.description': 'Logo, palette, typographie et applications pour positionnement',
    'individual.identity.unit': 'Par projet',
    'individual.manual.name': 'Manuel de marque',
    'individual.manual.description': 'Règles d\'usage, grilles, couleurs, typographie, ton de voix, exemples',
    'individual.manual.unit': 'Par projet',
    'individual.vectorization.name': 'Vectorisations',
    'individual.vectorization.description': 'Logos, illustrations et produits numérisés avec traits fidèles',
    'individual.vectorization.unit': 'Par art',
    'individual.cutting.name': 'Vecteurs pour découpe et gravure',
    'individual.cutting.description': 'Fichiers optimisés pour laser/routeur (MDF, acrylique, métal)',
    'individual.cutting.unit': 'Par fichier',
    'individual.packaging.name': 'Étiquettes et emballages',
    'individual.packaging.description': 'Art fonctionnel pour étiquettes/emballages, prêt pour impression',
    'individual.packaging.unit': 'Par pièce/projet',
    'individual.silkscreen.name': 'Art pour Silk-Screen',
    'individual.silkscreen.description': 'Arts optimisés, séparation de couleurs et spécifications techniques',
    'individual.silkscreen.unit': 'Par art',
    'individual.landingpage.name': 'Landing Page',
    'individual.landingpage.description': 'Page de conversion, design responsive, axée sur les résultats',
    'individual.landingpage.unit': 'Par projet',
    
    // Footer
    'footer.nav.home': 'Accueil',
    'footer.nav.services': 'Services',
    'footer.nav.plans': 'Plans',
    'footer.nav.portfolio': 'Portfolio',
    'footer.nav.testimonials': 'Témoignages',
    'footer.nav.contact': 'Contact',
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
    
    // Update page title based on language
    const titles = {
      'pt-BR': 'Wilds Art\'s - Design Profissional para Sua Marca',
      'pt-PT': 'Wilds Art\'s - Design Profissional para Sua Marca',
      'en': 'Wilds Art\'s - Professional Design for Your Brand',
      'es': 'Wilds Art\'s - Diseño Profesional para Tu Marca',
      'fr': 'Wilds Art\'s - Design Professionnel pour Votre Marque'
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
