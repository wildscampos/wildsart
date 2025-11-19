import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt-BR' | 'en' | 'es';

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
    'nav.testimonials': 'Depoimentos',
    'nav.contact': 'Contato',
    
    // Hero Section
    'hero.title': 'Wilds Art',
    'hero.subtitle': 'Onde sua visão vira design',
    'hero.description': 'Artes para redes sociais, identidade visual, manual de marca, vetorização, vetores para corte e gravação, rótulos e embalagens. Peças prontas para produzir e vender.',
    'hero.cta.quote': 'Falar agora com a Wilds Art',
    'hero.trust.experience': '23 anos de experiência',
    'hero.trust.ready': 'Arquivos prontos para produção',
    'hero.trust.fast': 'Atendimento rápido',
    
    // Contact
    'contact.title': 'Entre em contato com a Wilds Art\ncontato direto e rápido',
    'contact.subtitle': 'Entre em contato conosco para solicitar seu orçamento personalizado',
    'contact.whatsapp': 'WhatsApp',
    'contact.form.name': 'Nome',
    'contact.form.namePlaceholder': 'Seu nome completo',
    'contact.form.company': 'Empresa',
    'contact.form.companyPlaceholder': 'Nome da sua empresa',
    'contact.form.service': 'Serviço de Interesse',
    'contact.form.servicePlaceholder': 'Selecione um serviço',
    'contact.form.email': 'E-mail',
    'contact.form.emailPlaceholder': 'seu@email.com',
    'contact.form.submit': 'Enviar',
    
    // WhatsApp
    'whatsapp.greeting': 'Olá! 👋 Como posso te ajudar hoje?',
    'whatsapp.cta': 'Clique no botão abaixo para conversar pelo WhatsApp!',
    'whatsapp.button': 'Conversar no WhatsApp',
    'whatsapp.online': 'Online agora',
    'whatsapp.aria': 'Abrir chat do WhatsApp',
    'whatsapp.message': 'Olá! Gostaria de saber mais sobre os serviços da Wilds Art.',
    
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
    
    // Testimonials
    'testimonials.title': 'Veja como ajudamos empresas reais a crescer com design',
    'testimonials.subtitle': 'O que nossos clientes dizem sobre nosso trabalho',
    'testimonials.items': [
      {
        text: "Trabalho impecável! As peças chegaram prontas para produção, sem necessidade de ajustes. A qualidade técnica é excelente.",
        author: "Waldir",
        company: "Cia da Fé",
        logo: "/lovable-uploads/284477c0-3c6e-4a63-a4c9-2d319d510d74.png"
      },
      {
        text: "Entrega sempre no prazo e comunicação clara. Os arquivos são perfeitos para estamparia digital, facilitam muito nosso processo.",
        author: "Neiva",
        company: "Stamp|Cia",
        logo: "/lovable-uploads/db1fc48f-67f3-472a-b6f2-7f21d2d989d4.png"
      },
      {
        text: "Profissionalismo de primeira! O design da nossa marca ficou moderno e impactante. Recomendo sem dúvidas.",
        author: "Leandro",
        company: "LuminaBox",
        logo: "/lovable-uploads/cd7a7768-c2ef-4c99-8309-ed4175b2b2d8.png"
      },
      {
        text: "Criatividade e atenção aos detalhes que fazem a diferença. Cada peça é pensada com carinho e técnica.",
        author: "Sandra",
        company: "Mimos da Drika",
        logo: "/lovable-uploads/3878e6a3-3c75-4899-8748-81ead810c47b.png"
      },
      {
        text: "Identidade visual forte e marcante! O resultado superou nossas expectativas e fortaleceu nossa presença no mercado.",
        author: "Kleber",
        company: "TransKav",
        logo: "/lovable-uploads/540213af-8d15-483d-85fe-2cf8f214bd97.png"
      },
      {
        text: "Design acolhedor que traduz perfeitamente o conceito da nossa cantina. Ficamos muito satisfeitas com o resultado!",
        author: "Izilda",
        company: "Cantina das Marias",
        logo: "/lovable-uploads/263c2bb0-e232-4bd9-9829-f1f5a623afe3.png"
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
    'footer.description': 'Wilds Art\nartes para redes sociais, identidade visual e manual de marca. Também vetorização, vetores para corte e gravação (MDF, acrílico, metal), rótulos/embalagens e artes vetoriais para silk-screen e DTF.',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.nav.home': 'Início',
    'footer.nav.services': 'Serviços',
    'footer.nav.testimonials': 'Depoimentos',
    'footer.nav.contact': 'Contato',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Serviço',
    
    // Privacy Policy
    'privacy.title': 'Política de Privacidade (LGPD)',
    'privacy.lastUpdate': 'Última atualização: 03/11/2025',
    'privacy.intro': 'A Wilds Art ("nós") se compromete com a privacidade e a proteção dos seus dados pessoais, em conformidade com a Lei nº 13.709/2018 (LGPD). Esta Política descreve como coletamos, usamos e protegemos as informações dos visitantes e clientes que interagem com nosso site e canais de atendimento.',
    'privacy.controller.title': '1. Controlador e contato',
    'privacy.controller.content': 'Controlador: Wilds Art\nCanais oficiais: WhatsApp +55 12 98182-3416 e e-mail contato@wildsart.com',
    'privacy.data.title': '2. Dados que coletamos',
    'privacy.data.contact': 'Dados de contato: nome, e-mail, telefone e mensagens enviadas por formulários, WhatsApp ou e-mail.',
    'privacy.data.navigation': 'Dados de navegação: IP, páginas visitadas, data e hora de acesso, cookies essenciais e de desempenho.',
    'privacy.data.contract': 'Dados de contratação: informações necessárias para orçamento, briefing, execução e faturamento.',
    'privacy.data.content': 'Conteúdos fornecidos pelo cliente: logos, textos, imagens e referências para execução dos serviços.',
    'privacy.legal.title': '3. Bases legais e finalidades',
    'privacy.legal.intro': 'Tratamos dados para:',
    'privacy.legal.service': 'Atendimento e orçamento (execução de contrato e procedimentos preliminares).',
    'privacy.legal.delivery': 'Prestação do serviço (criação, revisão e entrega de arquivos).',
    'privacy.legal.communication': 'Comunicação sobre prazos, andamento do projeto e suporte (interesse legítimo/execução de contrato).',
    'privacy.legal.billing': 'Cobrança e faturamento (obrigação legal/execução de contrato).',
    'privacy.legal.security': 'Segurança do site e prevenção a fraudes (interesse legítimo).',
    'privacy.legal.marketing': 'Marketing direto leve, quando pertinente, com opção de opt-out a qualquer momento (interesse legítimo/consentimento quando exigido).',
    'privacy.sharing.title': '4. Compartilhamento com terceiros',
    'privacy.sharing.intro': 'Podemos compartilhar dados com:',
    'privacy.sharing.platforms': 'Plataformas de comunicação (ex.: WhatsApp);',
    'privacy.sharing.hosting': 'Serviços de hospedagem, e-mail e analytics;',
    'privacy.sharing.payment': 'Meios de pagamento e contabilidade, quando aplicável.',
    'privacy.sharing.note': 'Fornecedores recebem apenas o necessário e têm deveres de confidencialidade e segurança.',
    'privacy.cookies.title': '5. Cookies',
    'privacy.cookies.essential': 'Essenciais: garantem o funcionamento do site.',
    'privacy.cookies.analytics': 'Desempenho/analytics: ajudam a entender visitas e melhorar a experiência.',
    'privacy.cookies.manage': 'Você pode gerenciar cookies no navegador; bloquear alguns pode afetar funcionalidades.',
    'privacy.retention.title': '6. Retenção',
    'privacy.retention.content': 'Mantemos dados pelo tempo necessário ao cumprimento das finalidades e obrigações legais/contratuais. Mensagens e arquivos de projeto podem ser preservados para histórico e defesa de direitos.',
    'privacy.rights.title': '7. Direitos do titular',
    'privacy.rights.content': 'Você pode solicitar: confirmação do tratamento, acesso, correção, anonimização, portabilidade, eliminação, informação sobre compartilhamentos, oposição e revisão de decisões, além de revogar consentimentos. Para exercer, escreva para contato@wildsart.com ou WhatsApp +55 12 98182-3416.',
    'privacy.security.title': '8. Segurança',
    'privacy.security.content': 'Adotamos medidas técnicas e organizacionais proporcionais ao risco (controle de acesso, criptografia em trânsito, backups). Nenhuma transmissão pela internet é 100% segura, mas atuamos para reduzir riscos e notificaremos incidentes conforme a LGPD.',
    'privacy.minors.title': '9. Crianças e adolescentes',
    'privacy.minors.content': 'Nossos serviços são destinados a pessoas com capacidade civil para contratar. Se identificarmos dados de menores sem consentimento adequado, removeremos tais dados.',
    'privacy.changes.title': '10. Alterações',
    'privacy.changes.content': 'Esta Política pode ser atualizada para refletir melhorias, requisitos legais ou novos processos. A versão vigente é a publicada neste endereço, com a "Última atualização" acima.',
    'privacy.footer': '© 2025 Wilds Art · Termos de Serviço · Política de Privacidade\n\nContato: contato@wildsart.com',
    
    // Terms of Service
    'terms.title': 'Termos de Serviço',
    'terms.lastUpdate': 'Última atualização: 03/11/2025',
    'terms.intro': 'Estes Termos regulam o uso do site e a contratação dos serviços criativos da Wilds Art. Ao solicitar orçamento, enviar briefing ou contratar um projeto, você concorda com estes Termos.',
    'terms.services.title': '1. Serviços',
    'terms.services.content': 'Prestamos, entre outros, vetorização profissional; artes para corte/gravação; identidade visual; rótulos/embalagens; peças para redes sociais; e entrega de arquivos em múltiplos formatos (ex.: SVG, CDR, PDF, DXF, AI, PNG), conforme divulgado no site e na proposta enviada ao cliente.',
    'terms.proposals.title': '2. Propostas, prazos e escopo',
    'terms.proposals.content': 'Cada trabalho é regido por proposta/briefing com: descrição do escopo, prazos estimados, valores, formas de pagamento, entregáveis e eventuais restrições.\n\nPrazos são estimativas e podem variar por complexidade, fila de produção e a tempestividade dos insumos fornecidos pelo cliente.',
    'terms.workflow.title': '3. Processo de trabalho',
    'terms.workflow.briefing': 'Briefing',
    'terms.workflow.proposal': 'Proposta',
    'terms.workflow.approval': 'Aprovação e pagamento conforme proposta',
    'terms.workflow.creation': 'Criação e entregas parciais',
    'terms.workflow.revisions': 'Revisões dentro dos limites definidos na proposta',
    'terms.workflow.final': 'Arquivos finais',
    'terms.approval.title': '4. Aprovação e revisões',
    'terms.approval.content': 'A aprovação parcial ou final de peças encerra a etapa de criação correspondente. Revisões além do limite definido na proposta podem ser orçadas à parte.',
    'terms.obligations.title': '5. Obrigações do cliente',
    'terms.obligations.content': 'Fornecer informações, referências e materiais livres de restrições (ou com licenças válidas) e dentro do prazo acordado. A qualidade e o calendário dependem do envio tempestivo desses insumos.',
    'terms.payment.title': '6. Pagamentos e reembolsos',
    'terms.payment.content': 'Salvo disposição em contrário na proposta, os pagamentos são antecipados ou por marcos de entrega.\n\nEm caso de cancelamento após o início da execução, poderão ser retidos valores proporcionais às etapas já realizadas e custos não reembolsáveis (ex.: aquisições de fontes/imagens/licenças). Condições específicas de reembolso constarão na proposta.',
    'terms.copyright.title': '7. Direitos autorais e licenças',
    'terms.copyright.license': 'Com a quitação, o cliente recebe licença de uso comercial das peças criadas para o projeto, de forma não exclusiva, salvo ajuste escrito em contrário.',
    'terms.copyright.thirdparty': 'Materiais de terceiros (ex.: bancos de imagem, tipografias) seguem a licença do fornecedor e podem ter custos adicionais, informados previamente na proposta.',
    'terms.delivery.title': '8. Entrega de arquivos',
    'terms.delivery.content': 'Entregas nos formatos adequados à finalidade (ex.: SVG, CDR, PDF, DXF, AI, PNG), conforme acordado. Arquivos editáveis e versões finais serão organizados segundo o escopo contratado.',
    'terms.limitations.title': '9. Limitações',
    'terms.limitations.content': 'Não garantimos resultados específicos (ex.: vendas). Prazos "estimados" podem variar por fatores técnicos, operacionais e dependências do cliente. Eventos de força maior podem afetar cronogramas; nesses casos, comunicaremos impactos e novo plano.',
    'terms.support.title': '10. Suporte e comunicação',
    'terms.support.content': 'Atendimento via WhatsApp/e-mail em dias úteis (contato@wildsart.com). Mensagens fora do horário comercial podem ser respondidas no próximo dia útil. Os canais oficiais constam no site.',
    'terms.privacy.title': '11. Privacidade',
    'terms.privacy.content': 'O uso do site e a contratação estão sujeitos à Política de Privacidade.',
    'terms.term.title': '12. Vigência, alterações e cessão',
    'terms.term.content': 'Podemos atualizar estes Termos para refletir mudanças legais ou de serviço. A versão vigente é a publicada no site. Podemos ceder direitos/obrigações a sucessoras operacionais, mantendo os compromissos com clientes ativos.',
    'terms.law.title': '13. Legislação e foro',
    'terms.law.content': 'Aplica-se a legislação brasileira. Fica eleito o foro do domicílio do consumidor (nas relações de consumo) e, em contratos B2B, o foro da sede operacional da Wilds Art.',
    'terms.footer': '© 2025 Wilds Art · Termos de Serviço · Política de Privacidade\n\n Li e aceito os Termos e a Política.\nContato: contato@wildsart.com',
  },
  
  'en': {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Wilds Art\'s',
    'hero.subtitle': 'Where your vision becomes design',
    'hero.description': 'Social media arts, visual identity, brand manual, vectorization, cutting and engraving vectors, labels and packaging. Ready-to-produce pieces for sale.',
    'hero.cta.quote': 'Request quote',
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
    'footer.nav.testimonials': 'Testimonials',
    'footer.nav.contact': 'Contact',
  },
  
  'es': {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.testimonials': 'Testimonios',
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
    'footer.nav.testimonials': 'Testimonios',
    'footer.nav.contact': 'Contacto',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language] = useState<Language>('pt-BR');
  const { currency, prices } = detectCurrencyAndPrices();

  // Set page title to Portuguese
  useEffect(() => {
    document.title = 'Wilds Art - Design Profissional para Sua Marca';
  }, []);

  const handleSetLanguage = () => {
    // Language is fixed to pt-BR
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
