import React, { useState, useEffect, useRef } from 'react';
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
import { Loader2, Radio, Sparkles, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

type ServiceCategory = 'todos' | 'marketing' | 'audiovisual';

interface ServiceItem {
  title: string;
  description: string;
  category: 'marketing' | 'audiovisual';
  tags: string[];
  featured?: boolean;
  badge?: string;
  icon: React.ReactNode;
}

const RevealSection: React.FC<{ children: React.ReactNode; className?: string; delayMs?: number }> = ({
  children,
  className,
  delayMs = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
};

const marqueeItems = [
  "TRANSMISSÃO DE EVENTOS AO VIVO",
  "BROADCAST MULTICÂMERA & TRICASTER",
  "INFRAESTRUTURA DE VÍDEO & STREAMING",
  "PRODUÇÃO AUDIOVISUAL",
  "ESTRATÉGIA DE MARKETING",
  "ANÁLISE DE DADOS",
  "GESTÃO DE REDES SOCIAIS",
  "SEO & PERFORMANCE WEB",
];

const servicesList: ServiceItem[] = [
  {
    title: "Transmissão de Eventos & Broadcast Ao Vivo",
    description: "Nosso carro-chefe: infraestrutura completa de vídeo, áudio e streaming para transmissão ao vivo de convenções, feiras (como SET Expo), shows, eventos corporativos e workshops. Operação técnica de ponta com corte multicâmera (Tricaster, OBS, XSplit, Streamlabs) e encoders dedicados (NVX e Matrox).",
    category: "audiovisual",
    featured: true,
    badge: "Serviço Principal • Live Broadcast",
    tags: [
      "Eventos, Feiras, Shows & Workshops",
      "Tricaster, OBS, XSplit & Streamlabs",
      "Encoders Dedicados NVX & Matrox",
      "Operação Técnica de Áudio & Vídeo",
      "Gestão de Projetos de Streaming",
    ],
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>,
  },
  {
    title: "Produção Audiovisual",
    description: "Oferecemos serviços completos de produção audiovisual, desde a captação até edição avançada e motion design.",
    category: "audiovisual",
    tags: ["Direção de Fotografia", "Premiere & Vegas", "Cinema 4D & Photoshop"],
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2" ry="2"/></svg>,
  },
  {
    title: "Estratégia de Marketing Digital",
    description: "Desenvolvemos estratégias personalizadas baseadas em dados para maximizar o ROI do seu investimento em marketing.",
    category: "marketing",
    tags: ["ROI & Funil", "Planejamento", "Performance"],
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  },
  {
    title: "Análise de Dados",
    description: "Transformamos dados complexos em insights acionáveis para orientar suas decisões de negócios com precisão.",
    category: "marketing",
    tags: ["BI & Dashboards", "Métricas", "Atribuição"],
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8a3 3 0 1 0-5.7-1.8"/><path d="M13 7.4v3a1 1 0 0 0 1.7.7l.3-.3"/><path d="M9 15.7a2.5 2.5 0 0 1 2.5-2.6h0a2.5 2.5 0 0 1 2.5 2.6v4.3h-5z"/></svg>,
  },
  {
    title: "Gestão de Redes Sociais",
    description: "Criamos e gerenciamos conteúdo que engaja seu público-alvo e fortalece sua marca nas redes sociais.",
    category: "marketing",
    tags: ["Social Selling", "Engajamento", "Posicionamento"],
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>,
  },
  {
    title: "SEO e Performance Web",
    description: "Otimizamos seu site para mecanismos de busca e melhoramos a experiência do usuário para aumentar conversões.",
    category: "marketing",
    tags: ["Conversão (CRO)", "SEO Técnico", "UX/UI"],
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>,
  },
  {
    title: "Marketing de Conteúdo",
    description: "Produzimos conteúdo relevante e estratégico que atrai, engaja e converte seu público-alvo.",
    category: "marketing",
    tags: ["Copywriting", "Roteiros", "Storytelling"],
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/></svg>,
  },
];

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('todos');
  const [activePillar, setActivePillar] = useState<number>(0);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % 3);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const filteredServices = servicesList.filter(
    (s) => activeCategory === 'todos' || s.category === activeCategory
  );

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
    <div className="min-h-screen bg-[#141414] bg-grid-pattern text-white font-inter font-light overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between px-6 pt-28 md:pt-32 pb-12">
        {/* Ambient Glow Orbs */}
        <div className="pointer-events-none absolute top-24 left-1/4 w-96 h-96 bg-neura-orange-gradient/10 rounded-full blur-[120px]" />
        <div className="pointer-events-none absolute bottom-20 right-1/4 w-80 h-80 bg-neura-yellow/10 rounded-full blur-[110px]" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            {/* Left side - Logo and Text */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-7">
              <div className="inline-flex items-center gap-2.5 self-start px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-neura-orange/40 text-xs font-space tracking-widest text-white/90">
                <span className="w-2 h-2 rounded-full bg-neura-orange animate-pulse" />
                <span>LIVE BROADCAST • PRODUÇÃO AUDIOVISUAL • DADOS & ESTRATÉGIA</span>
              </div>

              <div className="flex">
                <Logo size={2.8} />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold leading-tight">
                Onde o sentido<br />
                <span className="text-gradient-neura">encontra a forma</span>
              </h1>

              <p className="text-white/75 max-w-md text-base md:text-lg leading-relaxed">
                Especialistas em <strong className="text-white font-medium">transmissão de eventos ao vivo (Broadcast & Streaming)</strong>, 
                produção audiovisual e marketing orientado por dados — transformando tecnologia e criatividade humana em impacto real.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <HeroButton href="#contato">ENTRE EM CONTATO</HeroButton>
                <a
                  href="#servicos"
                  className="text-sm font-space tracking-wider text-white/70 hover:text-neura-yellow transition-colors px-4 py-3"
                >
                  EXPLORAR SERVIÇOS →
                </a>
              </div>
            </div>
            
            {/* Right side - Video with floating frame accents */}
            <div className="w-full md:w-1/2 flex justify-end relative">
              <div className="relative w-full max-w-xl animate-float">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-neura-orange-gradient/25 via-transparent to-neura-yellow/20 blur-xl pointer-events-none" />
                <GradientImage />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Infinite Marquee Ticker */}
        <div className="w-screen -mx-6 border-y border-white/10 bg-black/40 backdrop-blur-sm py-3.5 mt-8 overflow-hidden">
          <div className="flex w-max animate-marquee space-x-10 items-center">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-10">
                <span className="text-xs md:text-sm font-space tracking-[0.2em] text-white/70 uppercase whitespace-nowrap">
                  {item}
                </span>
                <span className="text-neura-orange text-sm">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="sobre" className="py-24 px-6 md:px-12 lg:px-24 relative">
        <RevealSection className="max-w-5xl mx-auto">
          <SectionTitle>Sobre Nós</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6 text-white/80 leading-relaxed">
                A Neura Frame Lab une análise de dados, criatividade humana e excelência técnica audiovisual.
                Nosso diferencial está na capacidade de transformar informações complexas em estratégias, 
                narrativas e transmissões ao vivo de alto impacto.
              </p>
              <p className="text-lg mb-6 text-white/80 leading-relaxed">
                Acreditamos que os melhores resultados surgem quando combinamos o poder analítico 
                dos dados com a sensibilidade humana e infraestrutura de ponta — criando experiências 
                que não apenas atingem métricas, mas também conectam e emocionam.
              </p>
              <HeroButton href="#servicos" className="mt-4">CONHEÇA NOSSOS SERVIÇOS</HeroButton>
            </div>

            {/* Interactive Pillars Showcase */}
            <div className="h-full flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-neura-orange-gradient to-neura-yellow opacity-25 blur-xl animate-pulse" />
                <div className="relative w-full bg-black/90 p-7 md:p-8 rounded-2xl border border-white/15 shadow-2xl space-y-6">
                  <div className="text-center space-y-1.5 pb-2 border-b border-white/10">
                    <div className="text-4xl md:text-5xl font-space font-bold text-gradient-neura">
                      Data + Human
                    </div>
                    <p className="text-xs md:text-sm font-space tracking-widest uppercase text-white/60">
                      Nossa fórmula para resultados extraordinários
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        icon: <Radio className="w-5 h-5 text-neura-orange-gradient" />,
                        title: "Broadcast & Eventos Ao Vivo (Carro-Chefe)",
                        desc: "Infraestrutura de streaming, corte multicâmera (Tricaster/OBS) e encoders NVX/Matrox para eventos e shows.",
                      },
                      {
                        icon: <BarChart3 className="w-5 h-5 text-neura-orange" />,
                        title: "Inteligência de Dados",
                        desc: "Decisões guiadas por métricas, funil de vendas e performance real.",
                      },
                      {
                        icon: <Sparkles className="w-5 h-5 text-neura-yellow" />,
                        title: "Criatividade & Narrativa",
                        desc: "Direção estratégica, produção audiovisual e histórias que geram conexão.",
                      },
                    ].map((pillar, idx) => (
                      <div
                        key={pillar.title}
                        onMouseEnter={() => setActivePillar(idx)}
                        className={cn(
                          "p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-3.5",
                          activePillar === idx
                            ? "bg-white/10 border-neura-orange/50 translate-x-1 shadow-md"
                            : "bg-white/[0.03] border-white/10 opacity-75 hover:opacity-100"
                        )}
                      >
                        <div className="mt-0.5 p-2 rounded-lg bg-white/5 border border-white/10">
                          {pillar.icon}
                        </div>
                        <div>
                          <h4 className="font-space font-bold text-sm text-white">
                            {pillar.title}
                          </h4>
                          <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>
      
      {/* Services Section */}
      <section id="servicos" className="py-24 px-6 md:px-12 lg:px-24 bg-[#141414]/60 border-y border-white/5">
        <RevealSection className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <SectionTitle className="mb-0">Nossos Serviços</SectionTitle>
            </div>

            {/* Dynamic Category Filter Tabs */}
            <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 self-start">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'audiovisual', label: 'Broadcast & Audiovisual' },
                { id: 'marketing', label: 'Marketing & Dados' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as ServiceCategory)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs md:text-sm font-space transition-all duration-300",
                    activeCategory === tab.id
                      ? "bg-gradient-to-r from-neura-orange-gradient to-neura-yellow text-black font-bold shadow-md"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                tags={service.tags}
                featured={service.featured}
                badge={service.badge}
                className={
                  service.featured
                    ? "md:col-span-2 lg:col-span-3"
                    : undefined
                }
              />
            ))}
          </div>
        </RevealSection>
      </section>
      
      {/* Team Section */}
      <section id="equipe" className="py-24 px-6 md:px-12 lg:px-24">
        <RevealSection className="max-w-6xl mx-auto">
          <SectionTitle>Conheça Nossa Equipe</SectionTitle>
          <p className="text-white/65 text-sm md:text-base mb-10 max-w-xl">
            Passe o cursor sobre os integrantes para conhecer as especialidades de cada área.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TeamMember 
              name="Koji Ogasawara" 
              role="Co-Founder · Audiovisual Specialist & Prompt Engineer"
              imageSrc="/img/Koji.JPG"
              imagePosition="top"
              bio="Estrategista de marketing, narrativa e direção de fotografia, conectando análise de dados à construção de marca."
              tags={["Estratégia", "Narrativa", "Direção de Fotografia"]}
            />
          
            <TeamMember 
              name="Hassan Deraoui" 
              role="Co-Fundador & Developer Visual"
              imageSrc="/img/Hassan.jpg"
              bio="Especialista em desenvolvimento visual, interfaces interativas, identidade digital e experiências web de alta conversão."
              tags={["Visual Dev", "UI/UX", "Creative Tech"]}
            />

            <TeamMember 
              name="Wallace Lima" 
              role="Especialista em Broadcast & Infraestrutura de Streaming"
              imageSrc="/img/Wallace.jpg"
              imagePosition="top"
              bio="Formado em Rádio, TV e Internet. Atua desde 2017 em broadcast, operação de áudio/vídeo e transmissões de eventos, shows e workshops."
              tags={["Broadcast & Live Events", "Tricaster & OBS", "Encoders NVX/Matrox"]}
              linkedinUrl="https://www.linkedin.com/in/wallace-lima/"
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
        </RevealSection>
      </section>
      
      {/* Contact Section */}
      <section id="contato" className="py-24 px-6 md:px-12 lg:px-24 bg-[#141414]/60 border-t border-white/5">
        <RevealSection className="max-w-5xl mx-auto">
          <SectionTitle>Entre em Contato</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Pronto para impulsionar sua marca com estratégia orientada por dados, produção 
                audiovisual ou transmissão profissional ao vivo para o seu próximo evento? 
                Fale conosco para uma consultoria personalizada.
              </p>
              <div className="space-y-4 text-white/80">
                <a
                  href="https://wa.me/5511934938988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-neura-orange/40 hover:bg-white/[0.06] transition-all w-fit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-neura-orange"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span>(11) 93493-8988</span>
                </a>
                <a
                  href="mailto:hub@neuraframelab.com"
                  className="flex items-center p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-neura-orange/40 hover:bg-white/[0.06] transition-all w-fit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-neura-orange"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>hub@neuraframelab.com</span>
                </a>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
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
                    className="w-full bg-gradient-to-r from-neura-orange-gradient to-neura-yellow hover:opacity-95 text-black font-space font-bold tracking-wider py-2.5 shadow-[0_0_24px_rgba(255,107,0,0.3)] transition-all"
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
        </RevealSection>
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
