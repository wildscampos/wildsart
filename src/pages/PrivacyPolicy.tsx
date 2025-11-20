import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useEffect } from 'react';

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = 'Política de Privacidade - Wilds Art';
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">{t('privacy.title')}</h1>
            <p className="text-sm text-muted-foreground mb-8">{t('privacy.lastUpdate')}</p>
            
            <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
              <p className="text-foreground leading-relaxed">{t('privacy.intro')}</p>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.controller.title')}</h2>
                <p className="whitespace-pre-line">{t('privacy.controller.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.data.title')}</h2>
                <p className="mb-2">{t('privacy.data.contact')}</p>
                <p className="mb-2">{t('privacy.data.navigation')}</p>
                <p className="mb-2">{t('privacy.data.contract')}</p>
                <p>{t('privacy.data.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.legal.title')}</h2>
                <p className="mb-3">{t('privacy.legal.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.legal.service')}</li>
                  <li>{t('privacy.legal.delivery')}</li>
                  <li>{t('privacy.legal.communication')}</li>
                  <li>{t('privacy.legal.billing')}</li>
                  <li>{t('privacy.legal.security')}</li>
                  <li>{t('privacy.legal.marketing')}</li>
                </ul>
                <p className="mt-3 whitespace-pre-line">{t('privacy.sharing.note')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.sharing.title')}</h2>
                <p className="mb-3">{t('privacy.sharing.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.sharing.platforms')}</li>
                  <li>{t('privacy.sharing.hosting')}</li>
                  <li>{t('privacy.sharing.payment')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.cookies.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.cookies.essential')}</li>
                  <li>{t('privacy.cookies.analytics')}</li>
                </ul>
                <p className="mt-3">{t('privacy.cookies.manage')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.retention.title')}</h2>
                <p>{t('privacy.retention.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.rights.title')}</h2>
                <p>{t('privacy.rights.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.security.title')}</h2>
                <p>{t('privacy.security.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.minors.title')}</h2>
                <p>{t('privacy.minors.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.changes.title')}</h2>
                <p>{t('privacy.changes.content')}</p>
              </section>

              <div className="pt-8 mt-8 border-t border-border text-center">
                <p className="whitespace-pre-line text-sm">{t('privacy.footer')}</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
