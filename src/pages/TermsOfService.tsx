import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useEffect } from 'react';

export default function TermsOfService() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = 'Termos de Serviço - Wilds Art';
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">{t('terms.title')}</h1>
            <p className="text-sm text-muted-foreground mb-8">{t('terms.lastUpdate')}</p>
            
            <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
              <p className="text-foreground leading-relaxed">{t('terms.intro')}</p>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.services.title')}</h2>
                <p>{t('terms.services.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.proposals.title')}</h2>
                <p className="whitespace-pre-line">{t('terms.proposals.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.workflow.title')}</h2>
                <p className="mb-3">Cada projeto possui:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('terms.workflow.briefing')}</li>
                  <li>{t('terms.workflow.proposal')}</li>
                  <li>{t('terms.workflow.approval')}</li>
                  <li>{t('terms.workflow.creation')}</li>
                  <li>{t('terms.workflow.revisions')}</li>
                </ul>
                <p className="mt-3">{t('terms.workflow.final')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.approval.title')}</h2>
                <p className="whitespace-pre-line">{t('terms.approval.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.obligations.title')}</h2>
                <p>{t('terms.obligations.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.payment.title')}</h2>
                <p className="whitespace-pre-line">{t('terms.payment.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.copyright.title')}</h2>
                <p className="mb-3">{t('terms.copyright.license')}</p>
                <p>{t('terms.copyright.thirdparty')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.delivery.title')}</h2>
                <p className="mb-3">Após quitação:</p>
                <p className="whitespace-pre-line mb-3">{t('terms.delivery.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.limitations.title')}</h2>
                <p className="whitespace-pre-line">{t('terms.limitations.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.support.title')}</h2>
                <p className="whitespace-pre-line">{t('terms.support.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.privacy.title')}</h2>
                <p className="whitespace-pre-line">{t('terms.privacy.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.term.title')}</h2>
                <p className="whitespace-pre-line">{t('terms.term.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.law.title')}</h2>
                <p className="whitespace-pre-line">{t('terms.law.content')}</p>
              </section>


              <div className="pt-8 mt-8 border-t border-border text-center">
                <p className="whitespace-pre-line text-sm">{t('terms.footer')}</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
