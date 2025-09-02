import { useState, useEffect } from 'react';
import { MessageCircle, Mail, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';

const plans = [
  {
    name: 'START',
    price: 'R$ 250',
    period: '/mês',
    description: '4 posts + 4 stories • 1 revisão/peça • prazo até 5 dias úteis',
    features: ['4 posts por mês', '4 stories por mês', '1 revisão por peça', 'Prazo de 5 dias úteis'],
    recommended: false
  },
  {
    name: 'ESSENCIAL',
    price: 'R$ 500',
    period: '/mês', 
    description: '8 posts + 8 stories • 1 carrossel (até 7 págs) • 2 revisões/peça • prazo 3 dias úteis',
    features: ['8 posts por mês', '8 stories por mês', '1 carrossel (até 7 págs)', '2 revisões por peça', 'Prazo de 3 dias úteis'],
    recommended: false
  },
  {
    name: 'PRO',
    price: 'R$ 750',
    period: '/mês',
    description: '12 posts + 12 stories • 2 carrosséis • 1 motion até 10s • 2 revisões/peça • prazo 48h',
    features: ['12 posts por mês', '12 stories por mês', '2 carrosséis', '1 motion até 10s', '2 revisões por peça', 'Prazo de 48h'],
    recommended: true
  },
  {
    name: 'ELITE',
    price: 'R$ 1.000',
    period: '/mês',
    description: '16 posts + 16 stories • 3 carrosséis • 2 motions até 10s • 3 revisões/peça • prioridade 24–48h',
    features: ['16 posts por mês', '16 stories por mês', '3 carrosséis', '2 motions até 10s', '3 revisões por peça', 'Prioridade 24-48h'],
    recommended: false
  }
];

const faqs = [
  {
    question: 'Como funcionam as revisões?',
    answer: 'Incluídas por peça conforme plano. Mudança de conceito gera nova peça.'
  },
  {
    question: 'Quais formatos de entrega?',
    answer: 'SVG, CDR, AI, PDF, DXF, PNG.'
  },
  {
    question: 'Fazem arquivo para laser/router?',
    answer: 'Sim, arquivos otimizados para MDF, acrílico e metal, com tolerâncias e encaixes definidos conforme o projeto.'
  },
  {
    question: 'Prazos de entrega?',
    answer: 'START 5 dias úteis; ESSENCIAL 3 dias úteis; PRO 48h; ELITE 24–48h (prioridade).'
  }
];

export const Plans = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date('2025-12-31T23:59:59-03:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Promoção encerrada');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <StructuredData type="faqPage" data={faqs} />
      <Header />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Planos de Assinatura</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Constância criativa com prazos definidos e atendimento direto.
            </p>
          </div>
        </section>

        {/* Plans Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative ${plan.recommended ? 'border-primary shadow-lg scale-105' : 'border-border'} transition-all duration-300 hover:shadow-lg`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        Recomendado
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-3xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="space-y-2 pt-4">
                      <Button 
                        className="w-full"
                        variant={plan.recommended ? "default" : "outline"}
                        asChild
                      >
                        <a 
                          href="https://wa.me/5512981823416?text=Olá,%20vim%20pelo%20site%20da%20Wilds%20Art's%20e%20quero%20um%20orçamento."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full"
                        asChild
                      >
                        <a 
                          href="mailto:wildsarts@gmail.com?subject=Contato%20via%20site&body=Olá,%20quero%20um%20orçamento."
                          className="flex items-center justify-center gap-2"
                        >
                          <Mail className="h-4 w-4" />
                          E-mail
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Comparativo de Planos</h2>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto bg-card rounded-lg border border-border">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">Recursos</th>
                    <th className="text-center p-4 font-semibold">START</th>
                    <th className="text-center p-4 font-semibold">ESSENCIAL</th>
                    <th className="text-center p-4 font-semibold bg-primary/5">PRO</th>
                    <th className="text-center p-4 font-semibold">ELITE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4">Posts/mês</td>
                    <td className="text-center p-4">4</td>
                    <td className="text-center p-4">8</td>
                    <td className="text-center p-4 bg-primary/5">12</td>
                    <td className="text-center p-4">16</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Stories/mês</td>
                    <td className="text-center p-4">4</td>
                    <td className="text-center p-4">8</td>
                    <td className="text-center p-4 bg-primary/5">12</td>
                    <td className="text-center p-4">16</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Carrosséis</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4">1</td>
                    <td className="text-center p-4 bg-primary/5">2</td>
                    <td className="text-center p-4">3</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Motion</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4 bg-primary/5">1</td>
                    <td className="text-center p-4">2</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Revisões/peça</td>
                    <td className="text-center p-4">1</td>
                    <td className="text-center p-4">2</td>
                    <td className="text-center p-4 bg-primary/5">2</td>
                    <td className="text-center p-4">3</td>
                  </tr>
                  <tr>
                    <td className="p-4">Prazo</td>
                    <td className="text-center p-4">5 dias</td>
                    <td className="text-center p-4">3 dias</td>
                    <td className="text-center p-4 bg-primary/5">48h</td>
                    <td className="text-center p-4">24-48h</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Indique & Ganhe 2026</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Assinou e indicou alguém que assinou? Você concorre a 1 ano do ESSENCIAL (R$ 500/mês) grátis em 2026. 
                  Cada indicação paga = 1 número. Sorteio em janeiro/2026.
                </p>
                <div className="text-2xl font-bold text-primary">
                  {timeLeft}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Terms */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Termos Resumidos</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
                <p>
                  Vigência mensal; pagamento antecipado; janela de revisões até 7 dias após entrega; 
                  cancelamento com 15 dias (sem reembolso do mês corrente); uso comercial liberado; 
                  banco de imagens premium pode ter custo adicional.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  size="lg"
                  asChild
                >
                  <a 
                    href="https://wa.me/5512981823416?text=Olá,%20vim%20pelo%20site%20da%20Wilds%20Art's%20e%20quero%20um%20orçamento."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Assinar agora
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                >
                  <a 
                    href="#"
                    className="flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    Baixar PDF dos planos
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};