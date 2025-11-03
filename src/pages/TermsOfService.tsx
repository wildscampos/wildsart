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
            <h1 className="text-4xl font-bold mb-8">{t('terms.title')}</h1>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.intro.title')}</h2>
                <p>{t('terms.intro.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.services.title')}</h2>
                <p>{t('terms.services.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.intellectual.title')}</h2>
                <p>{t('terms.intellectual.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.payment.title')}</h2>
                <p>{t('terms.payment.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.liability.title')}</h2>
                <p>{t('terms.liability.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.modifications.title')}</h2>
                <p>{t('terms.modifications.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('terms.contact.title')}</h2>
                <p>{t('terms.contact.content')}</p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}