import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Clients } from '@/components/Clients';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none"
      >
        Pular para o conteúdo principal
      </a>
      <StructuredData type="organization" />
      <Header />
      <main id="main-content" role="main" aria-label="Conteúdo principal">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Contact />
        <Clients />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
