import logoHorizontal from '@/assets/logo-horizontal.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div>
            <img 
              src="/lovable-uploads/f79b63da-e287-4435-bba0-6eb0c184ee07.png" 
              alt="Wilds Art's - logotipo" 
              className="h-8 w-auto mx-auto"
            />
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Wilds Art's — artes para redes sociais, identidade visual e manual de marca. 
            Também vetorização, vetores para corte e gravação (MDF, acrílico, metal) e rótulos/embalagens.
          </p>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Wilds Art's. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};