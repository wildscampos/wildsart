import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }).max(100),
  company: z.string().trim().min(1, { message: "Empresa é obrigatória" }).max(100),
  service: z.string().min(1, { message: "Selecione um serviço" }),
  email: z.string().trim().email({ message: "E-mail inválido" }).max(255),
});

type FormValues = z.infer<typeof formSchema>;

export const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      service: '',
      email: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    const message = `Mensagem enviada através do site\n\nNome: ${data.name}\nEmpresa: ${data.company}\nServiço de Interesse: ${data.service}\nE-mail: ${data.email}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5512981823416?text=${encodedMessage}`;
    
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('contact.form.namePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.company')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('contact.form.companyPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.service')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('contact.form.servicePlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Artes para redes sociais">Artes para redes sociais</SelectItem>
                        <SelectItem value="Identidade visual">Identidade visual</SelectItem>
                        <SelectItem value="Manual de marca">Manual de marca</SelectItem>
                        <SelectItem value="Vetorizações">Vetorizações</SelectItem>
                        <SelectItem value="Vetores para corte e gravação">Vetores para corte e gravação</SelectItem>
                        <SelectItem value="Rótulos e embalagens">Rótulos e embalagens</SelectItem>
                        <SelectItem value="Arte para Silk-Screen">Arte para Silk-Screen</SelectItem>
                        <SelectItem value="Landing Page">Landing Page</SelectItem>
                        <SelectItem value="Pacote Mensal">Pacote Mensal</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t('contact.form.emailPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {t('contact.form.submit')}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};