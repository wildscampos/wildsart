import { Card, CardContent } from './ui/card';

const testimonials = [
  {
    text: "Arquivo perfeito para produção, sem retrabalho.",
    author: "Carla",
    company: "marcenaria"
  },
  {
    text: "Entrega ágil e capricho; o logo elevou a marca.",
    author: "Lucas",
    company: "agência"
  },
  {
    text: "Comunicação simples e resultado consistente.",
    author: "Ana",
    company: "e-commerce"
  }
];

export const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Depoimentos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            O que nossos clientes dizem sobre nosso trabalho
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <blockquote className="text-lg leading-relaxed mb-4">
                  "{testimonial.text}"
                </blockquote>
                <cite className="text-muted-foreground not-italic">
                  — {testimonial.author}, {testimonial.company}
                </cite>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};