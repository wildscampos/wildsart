import { MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/StructuredData';
import { useLanguage } from '@/contexts/LanguageContext';

const planData = [
  {
    name: 'START',
    priceIndex: 0,
    recommended: false
  },
  {
    name: 'ESSENCIAL',
    priceIndex: 1,
    recommended: false
  },
  {
    name: 'PRO',
    priceIndex: 2,
    recommended: true
  },
  {
    name: 'ELITE',
    priceIndex: 3,
    recommended: false
  }
];

export const Plans = () => {
  const { t, currency, prices } = useLanguage();

  const faqs = [
    {
      question: t('plans.faq.revisions.question'),
      answer: t('plans.faq.revisions.answer')
    },
    {
      question: t('plans.faq.formats.question'),
      answer: t('plans.faq.formats.answer')
    },
    {
      question: t('plans.faq.dates.question'),
      answer: t('plans.faq.dates.answer')
    },
    {
      question: t('plans.faq.deadlines.question'),
      answer: t('plans.faq.deadlines.answer')
    }
  ];
  return (
    <section id="planos" className="py-20">
      <StructuredData type="faqPage" data={faqs} />
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('plans.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('plans.subtitle')}
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
          {planData.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.recommended ? 'border-primary shadow-lg scale-105' : 'border-border'} transition-all duration-300 hover:shadow-lg`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    {t('plans.recommended')}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-3xl font-bold text-primary">{currency} {prices[plan.priceIndex]}</span>
                  <span className="text-muted-foreground">{t('plans.period')}</span>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {t(`plans.${plan.name.toLowerCase()}.description`)}
                </CardDescription>
                <p className="text-xs text-primary font-medium italic mt-2">
                  {t(`plans.${plan.name.toLowerCase()}.benefit`)}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {t(`plans.${plan.name.toLowerCase()}.features`).split('|').map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4">
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
                      {t('plans.hire')}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="py-12 mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">{t('plans.comparison')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto bg-card rounded-lg border border-border">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">{t('plans.features')}</th>
                  <th className="text-center p-4 font-semibold">START</th>
                  <th className="text-center p-4 font-semibold">ESSENCIAL</th>
                  <th className="text-center p-4 font-semibold bg-primary/5">PRO</th>
                  <th className="text-center p-4 font-semibold">ELITE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4">{t('plans.table.posts')}</td>
                  <td className="text-center p-4">4</td>
                  <td className="text-center p-4">8</td>
                  <td className="text-center p-4 bg-primary/5">12</td>
                  <td className="text-center p-4">16</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">{t('plans.table.stories')}</td>
                  <td className="text-center p-4">4</td>
                  <td className="text-center p-4">8</td>
                  <td className="text-center p-4 bg-primary/5">12</td>
                  <td className="text-center p-4">16</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">{t('plans.table.carousels')}</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">1</td>
                  <td className="text-center p-4 bg-primary/5">2</td>
                  <td className="text-center p-4">3</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">{t('plans.table.motion')}</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4 bg-primary/5">1</td>
                  <td className="text-center p-4">2</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">{t('plans.table.revisions')}</td>
                  <td className="text-center p-4">1</td>
                  <td className="text-center p-4">2</td>
                  <td className="text-center p-4 bg-primary/5">2</td>
                  <td className="text-center p-4">3</td>
                </tr>
                <tr>
                  <td className="p-4">{t('plans.table.deadline')}</td>
                  <td className="text-center p-4">{t('plans.table.deadline_5days')}</td>
                  <td className="text-center p-4">{t('plans.table.deadline_3days')}</td>
                  <td className="text-center p-4 bg-primary/5">{t('plans.table.deadline_48h')}</td>
                  <td className="text-center p-4">{t('plans.table.deadline_24_48h')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="py-12 mb-20 bg-muted/30 rounded-2xl px-8">
          <h3 className="text-2xl font-bold text-center mb-8">{t('plans.faq.title')}</h3>
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

        {/* Terms */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">{t('plans.terms.title')}</h3>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground mb-8">
            <p>
              {t('plans.terms.content')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
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
                {t('plans.subscribe')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};