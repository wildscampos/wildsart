import { useLanguage } from '@/contexts/LanguageContext';
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';
import { TestimonialAuthor } from '@/components/ui/testimonial-card';

export const Testimonials = () => {
  const { t } = useLanguage();
  const testimonialsData = (t('testimonials.items') as Array<{
    text: string;
    author: string;
    company: string;
    avatar?: string;
  }>) || [];

  // Transform data to match the new component format
  const testimonials = testimonialsData.map((testimonial, index) => ({
    author: {
      name: testimonial.author,
      handle: testimonial.company,
      avatar: testimonial.avatar || `https://images.unsplash.com/photo-${1494790108377 + index}?w=150&h=150&fit=crop&crop=face`
    } as TestimonialAuthor,
    text: testimonial.text
  }));

  return (
    <TestimonialsSection
      title={t('testimonials.title')}
      description={t('testimonials.subtitle')}
      testimonials={testimonials}
    />
  );
};