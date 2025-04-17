import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import GradientImage from '@/components/GradientImage';
import HeroButton from '@/components/HeroButton';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';
import TeamMember from '@/components/TeamMember';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

// Add this interface near the top of the file
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um endereço de email válido.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'hub@neuraframelab.com'
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Retornaremos em breve!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Houve um problema ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white font-inter font-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col px-6 pt-24 md:pt-32 pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            {/* Left side - Logo and Text */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
              <div className="flex">
                <Logo size={2.8} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold leading-tight">
                Onde o sentido<br />
                encontra a<br />
                forma
              </h1>
              <p className="text-white/70 max-w-md">
                Somos uma agência de marketing orientada por dados e liderada por humanos, 
                transformando insights em estratégias eficazes para sua marca.
              </p>
            </div>
            
            {/* Right side - Image */}
            <div className="w-full md:w-1/2 flex justify-end">
              <GradientImage />
            </div>
          </div>
          
          {/* Centered Button */}
          <div className="w-full flex justify-center mt-4 mb-12">
            <HeroButton href="#contato">ENTRE EM CONTATO</HeroButton>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="sobre" className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>Sobre Nós</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6 text-white/80">
                A Neura Frame Lab é uma agência de marketing que une análise de dados com criatividade humana.
                Nosso diferencial está na capacidade de transformar informações complexas em estratégias 
                eficientes e criativas.
              </p>
              <p className="text-lg mb-6 text-white/80">
                Acreditamos que os melhores resultados surgem quando combinamos o poder analítico 
                dos dados com a intuição e sensibilidade humana, criando campanhas que não apenas 
                atingem métricas, mas também conectam e emocionam.
              </p>
              <HeroButton href="#servicos" className="mt-4">CONHEÇA NOSSOS SERVIÇOS</HeroButton>
            </div>
            <div className="h-full flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-neura-orange-gradient to-neura-yellow opacity-30 blur-lg"></div>
                <div className="relative aspect-square w-full max-w-md bg-black/90 p-8 rounded-xl border border-white/10">
                  <div className="flex flex-col h-full justify-center items-center text-center space-y-4">
                    <div className="text-5xl font-space font-bold text-neura-orange-gradient">Data + Human</div>
                    <p className="text-white/80">Nossa fórmula para resultados extraordinários</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="servicos" className="py-20 px-6 md:px-12 lg:px-24 bg-[#141414]/50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Nossos Serviços</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Estratégia de Marketing Digital" 
              description="Desenvolvemos estratégias personalizadas baseadas em dados para maximizar o ROI do seu investimento em marketing."
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
            />
            <ServiceCard 
              title="Análise de Dados" 
              description="Transformamos dados complexos em insights acionáveis para orientar suas decisões de negócios."
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8a3 3 0 1 0-5.7-1.8"/><path d="M13 7.4v3a1 1 0 0 0 1.7.7l.3-.3"/><path d="M9 15.7a2.5 2.5 0 0 1 2.5-2.6h0a2.5 2.5 0 0 1 2.5 2.6v4.3h-5z"/></svg>}
            />
            <ServiceCard 
              title="Gestão de Redes Sociais" 
              description="Criamos e gerenciamos conteúdo que engaja seu público alvo e fortalece sua marca nas redes sociais."
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>}
            />
            <ServiceCard 
              title="SEO e Performance Web" 
              description="Otimizamos seu site para mecanismos de busca e melhoramos a experiência do usuário para aumentar conversões."
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>}
            />
            <ServiceCard 
              title="Produção Audiovisual" 
              description="Oferecemos serviços completos de produção audiovisual, desde o planejamento até a entrega final. "
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2" ry="2"/></svg>}
            />
            <ServiceCard 
              title="Marketing de Conteúdo" 
              description="Produzimos conteúdo relevante e estratégico que atrai, engaja e converte seu público-alvo."
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/></svg>}
            />
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section id="equipe" className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Conheça Nossa Equipe</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <TeamMember 
              name="Koji Ogasawara" 
              role="Co-Fundador & Diretor De Estratégia"
              imageSrc="/img/Koji.JPG"
              imagePosition="top"
            />
            <TeamMember 
              name="Zero Koga" 
              role="Co-Fundador & Especialista Em Mídias"
              imageSrc="/img/Koga.jpg"
              imagePosition="top"
            />
            <TeamMember 
              name="Hassan Deraoui" 
              role="Co-Fundador & Developer Visual"
              imageSrc="/img/Hassan.jpg"
            />
          </div>
          <div className="mt-16 text-center">
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Nossa equipe multidisciplinar une expertise técnica e criatividade para entregar 
              as melhores soluções para nossos clientes. Somos apaixonados por resultados e 
              comprometidos com a excelência.
            </p>
            <HeroButton href="#contato">FALE COM NOSSA EQUIPE</HeroButton>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contato" className="py-20 px-6 md:px-12 lg:px-24 bg-[#141414]/50">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>Entre em Contato</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-white/80 mb-6">
                Pronto para transformar sua estratégia de marketing com uma abordagem 
                orientada por dados e liderada por humanos? Entre em contato conosco hoje 
                mesmo para uma consulta personalizada.
              </p>
              <div className="space-y-4 text-white/80">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-neura-orange"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span>(11) 93493-8988</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-neura-orange"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>hub@neuraframelab.com</span>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome Completo"
                    className="bg-white/5 border-white/10 placeholder:text-white/50 focus:border-neura-orange"
                    required
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E-mail"
                    className="bg-white/5 border-white/10 placeholder:text-white/50 focus:border-neura-orange"
                    required
                  />
                </div>
                <div>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Empresa"
                    className="bg-white/5 border-white/10 placeholder:text-white/50 focus:border-neura-orange"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Mensagem"
                    rows={5}
                    className="bg-white/5 border-white/10 placeholder:text-white/50 focus:border-neura-orange"
                    required
                  />
                </div>
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-neura-orange-gradient to-neura-yellow hover:opacity-90 text-white font-space font-light py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ENVIANDO...
                      </>
                    ) : (
                      'ENVIAR MENSAGEM'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 text-center text-white/60">
        <div className="max-w-6xl mx-auto">
          <Logo variant="cube" className="mx-auto mb-4" />
          <p>© {new Date().getFullYear()} Neura Frame Lab. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
