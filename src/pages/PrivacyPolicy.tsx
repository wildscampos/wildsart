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
            <h1 className="text-4xl font-bold mb-8">{t('privacy.title')}</h1>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.intro.title')}</h2>
                <p>{t('privacy.intro.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.collection.title')}</h2>
                <p>{t('privacy.collection.content')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.collection.items.0')}</li>
                  <li>{t('privacy.collection.items.1')}</li>
                  <li>{t('privacy.collection.items.2')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.usage.title')}</h2>
                <p>{t('privacy.usage.content')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.usage.items.0')}</li>
                  <li>{t('privacy.usage.items.1')}</li>
                  <li>{t('privacy.usage.items.2')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.protection.title')}</h2>
                <p>{t('privacy.protection.content')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.rights.title')}</h2>
                <p>{t('privacy.rights.content')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.rights.items.0')}</li>
                  <li>{t('privacy.rights.items.1')}</li>
                  <li>{t('privacy.rights.items.2')}</li>
                  <li>{t('privacy.rights.items.3')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.contact.title')}</h2>
                <p>{t('privacy.contact.content')}</p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}