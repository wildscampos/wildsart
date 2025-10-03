import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { IndividualServices } from '@/components/IndividualServices';
import { Portfolio } from '@/components/Portfolio';
import { Testimonials } from '@/components/Testimonials';
import { Plans } from '@/components/Plans';
import { Contact } from '@/components/Contact';
import { Clients } from '@/components/Clients';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData type="organization" />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <IndividualServices />
        <Portfolio />
        <Testimonials />
        <Plans />
        <Contact />
        <Clients />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
