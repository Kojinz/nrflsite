import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';
import {
  Activity,
  Aperture,
  Apple,
  Download,
  Monitor,
  ArrowRight,
  Columns2,
  Crosshair,
  FileText,
  Gauge,
  Grid3x3,
  Languages,
  MonitorPlay,
  ScanLine,
  Sun,
} from 'lucide-react';

// Hotsite do OMNIK (app de scopes da NeuraFrameLab). A compra é pela Gumroad; a KEY sai no recibo dela
// e é ativada no app (Ajuda > Licença). Imagens em /omnik-media são capturas reais do OMNIK.

const BUY_URL = 'https://kojirootz.gumroad.com/l/omnik';
const RENEW_URL = 'https://license.neuraframelab.com/omnik/renew';
// Instaladores no servidor de licenças: cada endereço entrega sempre a versão mais nova.
const DOWNLOADS = {
  mac: 'https://license.neuraframelab.com/download/mac',
  windows: 'https://license.neuraframelab.com/download/windows',
};
const PRICE = 'US$ 24.90';
const RENEWAL_PRICE = 'US$ 12.90';
const SUPPORT_EMAIL = 'hub@neuraframelab.com';

type Lang = 'en' | 'pt' | 'es';

const copy = {
  en: {
    badge: 'Real-time video scopes · macOS & Windows',
    title1: 'See your signal',
    title2: 'the way it really is',
    lead: 'OMNIK reads your camera, capture card or screen and draws professional scopes in real time: waveform, parade, vectorscope, CIE, histogram, false color and exposure in stops.',
    buy: `Buy OMNIK · ${PRICE}`,
    download: 'Download free trial',
    dlTitle: 'Download',
    dlLead: 'The same download works as a 7-day trial and as the full version: your license key unlocks it.',
    dlMac: 'macOS',
    dlMacReq: 'macOS 13 or later, Apple Silicon or Intel',
    dlMacNote: 'First launch: macOS may say the developer cannot be verified. Right-click OMNIK in Applications and choose Open, or go to System Settings > Privacy & Security and click Open Anyway.',
    dlWin: 'Windows',
    dlWinReq: 'Windows 10 or 11, 64-bit',
    dlWinNote: 'Unzip the folder and run OMNIK.exe. If Windows SmartScreen appears, click More info > Run anyway.',
    dlButton: 'Download',
    trial: '7-day free trial with everything unlocked. Lifetime license, 2 computers.',
    shotCaption: 'Real OMNIK screenshot analyzing a night street frame.',
    scopesTitle: '11 scopes, one window',
    scopesLead: 'Mix and match any scope in any panel, float them to a second window or monitor, and save the layout.',
    scopes: [
      ['Waveform', 'Luma, RGB overlay, RGB parade and YCbCr parade, with legal-range lines.'],
      ['Vectorscope', 'Hue and saturation against 75% and 100% targets, with skin-tone line.'],
      ['CIE 1931 xy', 'Where your colors sit inside Rec.709 and Rec.2020.'],
      ['Histogram', 'Per channel and luma, from 8 to 16 bits.'],
      ['Diamond & Arrowhead', 'Gamut checks the way broadcast engineers read them.'],
      ['Hue vs Sat · Luma vs Sat', 'Find oversaturated hues and clipped highlights at a glance.'],
    ],
    motionTitle: 'See it react',
    motionLead: 'Every frame of this live concert clip went through OMNIK: CIE 1931, Diamond, Arrowhead, Hue vs Sat and Luma vs Sat follow the stage lights.',
    toolsTitle: 'Tools for the set, the grade and the broadcast',
    tools: [
      ['Exposure in stops', 'Zone meter, false color, zebras and focus peaking.'],
      ['Pixel probe', 'RGB, Y′CbCr, nits and stops of any area, with A/B memory.'],
      ['A/B comparison', 'Wipe, side by side or overlay, with an automatic back-and-forth.'],
      ['HDR ready', 'PQ (ST 2084) and HLG (BT.2100), Rec.709 and Rec.2020.'],
      ['Guides and rulers', 'Safe areas, frame lines from 2.39 to 9:16 and custom guides.'],
      ['Analysis reports', 'Export the frame with its scopes and metadata to PNG, JPEG or PDF.'],
      ['Live sources', 'UVC, HDMI and SDI capture cards, virtual cameras (OBS, NDI) and screen capture.'],
      ['Multi-monitor', 'Image full screen on one display, scopes in a grid on another.'],
      ['Three languages', 'English, Portuguese and Spanish, including exported reports.'],
    ],
    galleryTitle: 'Real screenshots',
    galleryLead: 'Every interface image on this page was captured from OMNIK itself.',
    gallery: ['Night street', 'Golden hour portrait', 'Desert at sunset', 'Live concert', 'CIE, Diamond, Arrowhead, Hue and Luma vs Sat · concert', 'CIE, Diamond, Arrowhead, Hue and Luma vs Sat · desert'],
    pricingTitle: 'One price. Yours forever.',
    pricingLead: 'No subscription. Pay once and keep every version released during your updates year.',
    planName: 'OMNIK license',
    planFeatures: [
      'Lifetime license for macOS and Windows',
      'Use it on 2 computers at the same time',
      '1 year of updates included',
      `Optional updates renewal: ${RENEWAL_PRICE}/year`,
      'Works offline; checks the license online once a day (up to 7 days offline)',
    ],
    renew: 'Already have OMNIK? Renew updates',
    checkout: 'Secure checkout by Gumroad: card, PayPal, Apple Pay and Google Pay. Your key arrives right after payment.',
    faqTitle: 'Questions',
    faq: [
      ['How do I activate?', 'Open OMNIK, go to Help > License, paste the key from your Gumroad receipt and click Activate.'],
      ['Can I move my license to another computer?', 'Yes. Deactivate it on the old computer (Help > License) and activate it on the new one.'],
      ['What happens when the updates year ends?', 'Nothing stops working. Versions released until then are yours forever; renew only if you want newer versions.'],
      ['Do I need internet?', 'Only to activate. After that OMNIK checks the license once a day and keeps working up to 7 days offline.'],
    ],
    support: 'Support',
    by: 'Made by NeuraFrameLab',
  },
  pt: {
    badge: 'Scopes de vídeo em tempo real · macOS e Windows',
    title1: 'Veja o seu sinal',
    title2: 'como ele realmente é',
    lead: 'O OMNIK lê a sua câmera, placa de captura ou tela e desenha scopes profissionais em tempo real: waveform, parade, vectorscope, CIE, histograma, false color e exposição em stops.',
    buy: `Comprar o OMNIK · ${PRICE}`,
    download: 'Baixar o teste grátis',
    dlTitle: 'Download',
    dlLead: 'O mesmo download serve como teste de 7 dias e como versão completa: a sua KEY libera.',
    dlMac: 'macOS',
    dlMacReq: 'macOS 13 ou mais novo, Apple Silicon ou Intel',
    dlMacNote: 'Primeira abertura: o macOS pode dizer que não consegue verificar o desenvolvedor. Clique com o botão direito no OMNIK em Aplicativos e escolha Abrir, ou vá em Ajustes do Sistema > Privacidade e Segurança e clique em Abrir Mesmo Assim.',
    dlWin: 'Windows',
    dlWinReq: 'Windows 10 ou 11, 64 bits',
    dlWinNote: 'Descompacte a pasta e abra o OMNIK.exe. Se aparecer o SmartScreen do Windows, clique em Mais informações > Executar assim mesmo.',
    dlButton: 'Baixar',
    trial: 'Teste de 7 dias com tudo liberado. Licença vitalícia, 2 computadores.',
    shotCaption: 'Captura real do OMNIK analisando um quadro de rua à noite.',
    scopesTitle: '11 scopes numa janela só',
    scopesLead: 'Combine qualquer scope em qualquer painel, leve para uma segunda janela ou monitor e salve o layout.',
    scopes: [
      ['Waveform', 'Luma, RGB sobreposto, parade RGB e parade YCbCr, com linhas de faixa legal.'],
      ['Vectorscope', 'Matiz e saturação contra alvos de 75% e 100%, com linha de pele.'],
      ['CIE 1931 xy', 'Onde as suas cores estão dentro do Rec.709 e do Rec.2020.'],
      ['Histograma', 'Por canal e por luma, de 8 a 16 bits.'],
      ['Diamond e Arrowhead', 'Conferência de gamut do jeito que a engenharia de broadcast lê.'],
      ['Hue vs Sat · Luma vs Sat', 'Encontre matizes saturados demais e altas luzes estouradas num relance.'],
    ],
    motionTitle: 'Veja reagir',
    motionLead: 'Cada quadro deste clipe de show passou pelo OMNIK: CIE 1931, Diamond, Arrowhead, Hue vs Sat e Luma vs Sat acompanham as luzes do palco.',
    toolsTitle: 'Ferramentas para o set, a cor e o broadcast',
    tools: [
      ['Exposição em stops', 'Medidor por zona, false color, zebras e focus peaking.'],
      ['Leitura de pixel', 'RGB, Y′CbCr, nits e stops de qualquer área, com memória A/B.'],
      ['Comparação A/B', 'Cortina, lado a lado ou sobreposição, com vai e volta automático.'],
      ['Pronto para HDR', 'PQ (ST 2084) e HLG (BT.2100), Rec.709 e Rec.2020.'],
      ['Guias e réguas', 'Áreas seguras, molduras de 2.39 a 9:16 e guias próprias.'],
      ['Relatórios de análise', 'Exporte o quadro com os scopes e os metadados em PNG, JPEG ou PDF.'],
      ['Fontes ao vivo', 'Placas de captura UVC, HDMI e SDI, câmeras virtuais (OBS, NDI) e captura de tela.'],
      ['Multitelas', 'Imagem em tela cheia num monitor, scopes em grade em outro.'],
      ['Três idiomas', 'Português, inglês e espanhol, inclusive nos relatórios exportados.'],
    ],
    galleryTitle: 'Capturas reais',
    galleryLead: 'Todas as imagens da interface nesta página foram capturadas do próprio OMNIK.',
    gallery: ['Rua à noite', 'Retrato na hora dourada', 'Deserto ao pôr do sol', 'Show ao vivo', 'CIE, Diamond, Arrowhead, Hue e Luma vs Sat · show', 'CIE, Diamond, Arrowhead, Hue e Luma vs Sat · deserto'],
    pricingTitle: 'Um preço. Seu para sempre.',
    pricingLead: 'Sem assinatura. Pague uma vez e fique com todas as versões lançadas no seu ano de atualizações.',
    planName: 'Licença do OMNIK',
    planFeatures: [
      'Licença vitalícia para macOS e Windows',
      'Use em 2 computadores ao mesmo tempo',
      '1 ano de atualizações incluído',
      `Renovação opcional das atualizações: ${RENEWAL_PRICE}/ano`,
      'Funciona sem internet; confere a licença online uma vez por dia (até 7 dias sem conexão)',
    ],
    renew: 'Já tem o OMNIK? Renove as atualizações',
    checkout: 'Pagamento seguro pela Gumroad: cartão, PayPal, Apple Pay e Google Pay. A KEY chega logo depois do pagamento.',
    faqTitle: 'Dúvidas',
    faq: [
      ['Como eu ativo?', 'Abra o OMNIK, vá em Ajuda > Licença, cole a KEY do recibo da Gumroad e clique em Ativar.'],
      ['Posso passar a licença para outro computador?', 'Pode. Desative no computador antigo (Ajuda > Licença) e ative no novo.'],
      ['O que acontece quando acaba o ano de atualizações?', 'Nada para de funcionar. As versões lançadas até lá são suas para sempre; renove só se quiser as mais novas.'],
      ['Preciso de internet?', 'Só para ativar. Depois o OMNIK confere a licença uma vez por dia e funciona até 7 dias sem conexão.'],
    ],
    support: 'Suporte',
    by: 'Feito pela NeuraFrameLab',
  },
  es: {
    badge: 'Scopes de video en tiempo real · macOS y Windows',
    title1: 'Mira tu señal',
    title2: 'como realmente es',
    lead: 'OMNIK lee tu cámara, tarjeta de captura o pantalla y dibuja scopes profesionales en tiempo real: waveform, parade, vectorscopio, CIE, histograma, false color y exposición en stops.',
    buy: `Comprar OMNIK · ${PRICE}`,
    download: 'Descargar la prueba gratis',
    dlTitle: 'Descarga',
    dlLead: 'La misma descarga sirve como prueba de 7 días y como versión completa: tu KEY la desbloquea.',
    dlMac: 'macOS',
    dlMacReq: 'macOS 13 o posterior, Apple Silicon o Intel',
    dlMacNote: 'Primera apertura: macOS puede decir que no puede verificar al desarrollador. Haz clic derecho en OMNIK en Aplicaciones y elige Abrir, o ve a Ajustes del Sistema > Privacidad y Seguridad y haz clic en Abrir de todos modos.',
    dlWin: 'Windows',
    dlWinReq: 'Windows 10 u 11, 64 bits',
    dlWinNote: 'Descomprime la carpeta y abre OMNIK.exe. Si aparece SmartScreen de Windows, haz clic en Más información > Ejecutar de todas formas.',
    dlButton: 'Descargar',
    trial: 'Prueba de 7 días con todo desbloqueado. Licencia vitalicia, 2 equipos.',
    shotCaption: 'Captura real de OMNIK analizando un cuadro de calle nocturna.',
    scopesTitle: '11 scopes en una sola ventana',
    scopesLead: 'Combina cualquier scope en cualquier panel, llévalo a una segunda ventana o monitor y guarda el diseño.',
    scopes: [
      ['Waveform', 'Luma, RGB superpuesto, parade RGB y parade YCbCr, con líneas de rango legal.'],
      ['Vectorscopio', 'Tono y saturación frente a objetivos de 75% y 100%, con línea de piel.'],
      ['CIE 1931 xy', 'Dónde están tus colores dentro de Rec.709 y Rec.2020.'],
      ['Histograma', 'Por canal y por luma, de 8 a 16 bits.'],
      ['Diamond y Arrowhead', 'Control de gamut como lo leen los ingenieros de broadcast.'],
      ['Hue vs Sat · Luma vs Sat', 'Encuentra tonos sobresaturados y altas luces quemadas de un vistazo.'],
    ],
    motionTitle: 'Míralo reaccionar',
    motionLead: 'Cada cuadro de este clip de concierto pasó por OMNIK: CIE 1931, Diamond, Arrowhead, Hue vs Sat y Luma vs Sat siguen las luces del escenario.',
    toolsTitle: 'Herramientas para el set, el color y el broadcast',
    tools: [
      ['Exposición en stops', 'Medidor por zonas, false color, cebras y focus peaking.'],
      ['Lectura de píxel', 'RGB, Y′CbCr, nits y stops de cualquier área, con memoria A/B.'],
      ['Comparación A/B', 'Cortinilla, lado a lado o superposición, con ida y vuelta automática.'],
      ['Listo para HDR', 'PQ (ST 2084) y HLG (BT.2100), Rec.709 y Rec.2020.'],
      ['Guías y reglas', 'Áreas seguras, marcos de 2.39 a 9:16 y guías propias.'],
      ['Informes de análisis', 'Exporta el cuadro con sus scopes y metadatos en PNG, JPEG o PDF.'],
      ['Fuentes en vivo', 'Tarjetas de captura UVC, HDMI y SDI, cámaras virtuales (OBS, NDI) y captura de pantalla.'],
      ['Multipantalla', 'Imagen a pantalla completa en un monitor, scopes en cuadrícula en otro.'],
      ['Tres idiomas', 'Español, inglés y portugués, incluso en los informes exportados.'],
    ],
    galleryTitle: 'Capturas reales',
    galleryLead: 'Todas las imágenes de la interfaz en esta página se capturaron del propio OMNIK.',
    gallery: ['Calle nocturna', 'Retrato en la hora dorada', 'Desierto al atardecer', 'Concierto en vivo', 'CIE, Diamond, Arrowhead, Hue y Luma vs Sat · concierto', 'CIE, Diamond, Arrowhead, Hue y Luma vs Sat · desierto'],
    pricingTitle: 'Un precio. Tuyo para siempre.',
    pricingLead: 'Sin suscripción. Paga una vez y quédate con todas las versiones lanzadas en tu año de actualizaciones.',
    planName: 'Licencia de OMNIK',
    planFeatures: [
      'Licencia vitalicia para macOS y Windows',
      'Úsala en 2 equipos al mismo tiempo',
      '1 año de actualizaciones incluido',
      `Renovación opcional de actualizaciones: ${RENEWAL_PRICE}/año`,
      'Funciona sin internet; verifica la licencia en línea una vez al día (hasta 7 días sin conexión)',
    ],
    renew: '¿Ya tienes OMNIK? Renueva las actualizaciones',
    checkout: 'Pago seguro con Gumroad: tarjeta, PayPal, Apple Pay y Google Pay. Tu KEY llega justo después del pago.',
    faqTitle: 'Preguntas',
    faq: [
      ['¿Cómo lo activo?', 'Abre OMNIK, ve a Ayuda > Licencia, pega la KEY del recibo de Gumroad y haz clic en Activar.'],
      ['¿Puedo pasar la licencia a otro equipo?', 'Sí. Desactívala en el equipo anterior (Ayuda > Licencia) y actívala en el nuevo.'],
      ['¿Qué pasa cuando termina el año de actualizaciones?', 'Nada deja de funcionar. Las versiones lanzadas hasta entonces son tuyas para siempre; renueva solo si quieres las nuevas.'],
      ['¿Necesito internet?', 'Solo para activar. Después OMNIK verifica la licencia una vez al día y funciona hasta 7 días sin conexión.'],
    ],
    support: 'Soporte',
    by: 'Hecho por NeuraFrameLab',
  },
} as const;

const toolIcons = [Sun, Crosshair, Columns2, Aperture, Grid3x3, FileText, MonitorPlay, ScanLine, Languages];
// Recortes reais de cada scope (Diamond/Arrowhead e Hue/Luma vs Sat aparecem lado a lado).
const scopeImages: (readonly string[])[] = [
  ['scope-waveform'],
  ['scope-vectorscope'],
  ['scope-cie-tight'],
  ['scope-histogram'],
  ['scope-diamond-tight', 'scope-arrowhead-tight'],
  ['scope-huesat', 'scope-lumasat'],
];
const galleryShots = ['neon', 'portrait', 'canyon', 'concert', 'gamut-concert', 'gamut-canyon'] as const;

function initialLang(): Lang {
  const saved = (() => {
    try {
      return localStorage.getItem('omnik-lang');
    } catch {
      return null;
    }
  })();
  if (saved === 'en' || saved === 'pt' || saved === 'es') return saved;
  const nav = (navigator.language || 'en').toLowerCase();
  return nav.startsWith('pt') ? 'pt' : nav.startsWith('es') ? 'es' : 'en';
}

const Media: React.FC<{ name: string; alt: string; className?: string; eager?: boolean }> = ({ name, alt, className, eager }) => (
  <img
    src={`/omnik-media/${name}.webp`}
    alt={alt}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    className={className}
  />
);

const BuyButton: React.FC<{ label: string; className?: string }> = ({ label, className }) => (
  <a
    href={BUY_URL}
    className={cn(
      'inline-flex items-center gap-2 px-6 py-3 rounded-full font-space text-sm tracking-wider text-black font-medium bg-gradient-to-r from-neura-orange-gradient to-neura-yellow hover:brightness-110 transition-all',
      className
    )}
  >
    {label}
    <ArrowRight className="w-4 h-4" />
  </a>
);

const Omnik: React.FC = () => {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = copy[lang];

  useEffect(() => {
    try {
      localStorage.setItem('omnik-lang', lang);
    } catch {
      /* sem armazenamento: o idioma vale só nesta visita */
    }
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  }, [lang]);

  useEffect(() => {
    const previous = document.title;
    document.title = 'OMNIK · Real-time video scopes · NeuraFrameLab';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] bg-grid-pattern text-white font-inter font-light overflow-x-hidden">
      {/* Barra */}
      <nav className="fixed top-0 inset-x-0 z-50 px-4 md:px-12 py-3 bg-[#141414]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-90 transition-opacity" aria-label="NeuraFrameLab">
              <Logo variant="cube" />
            </Link>
            <span className="font-space font-bold tracking-[0.25em] text-lg">OMNIK</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex rounded-full border border-white/15 p-0.5 text-xs font-space">
              {(['en', 'pt', 'es'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    'px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors',
                    lang === l ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href={BUY_URL}
              className="hidden sm:inline-flex px-4 py-2 rounded-full text-xs tracking-widest font-space border border-neura-orange/50 bg-neura-orange/10 hover:bg-gradient-to-r hover:from-neura-orange-gradient hover:to-neura-yellow hover:text-black hover:border-transparent transition-all"
            >
              {PRICE}
            </a>
          </div>
        </div>
      </nav>

      {/* Abertura */}
      <header className="relative pt-28 md:pt-36 pb-16 px-4 md:px-6">
        <div className="pointer-events-none absolute top-20 left-1/4 w-96 h-96 bg-neura-orange-gradient/10 rounded-full blur-[120px]" />
        <div className="pointer-events-none absolute top-40 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-[110px]" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-neura-orange/40 text-xs font-space tracking-widest text-white/90 mb-6">
            <Activity className="w-3.5 h-3.5 text-neura-orange" />
            {t.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-space font-bold leading-[1.05]">
            {t.title1}
            <br />
            <span className="text-gradient-neura">{t.title2}</span>
          </h1>
          <p className="mt-6 text-white/75 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">{t.lead}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <BuyButton label={t.buy} />
            <a
              href="#download"
              className="px-6 py-3 rounded-full font-space text-sm tracking-wider border border-white/20 hover:border-white/50 transition-colors"
            >
              {t.download}
            </a>
          </div>
          <p className="mt-4 text-xs md:text-sm text-white/50">{t.trial}</p>
        </div>

        <figure className="relative max-w-6xl mx-auto mt-14">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-neura-orange-gradient/25 via-transparent to-cyan-400/20 blur-xl pointer-events-none" />
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <Media name="ui-neon" alt="OMNIK" eager className="w-full h-auto block" />
          </div>
          <figcaption className="mt-3 text-center text-xs text-white/40">{t.shotCaption}</figcaption>
        </figure>
      </header>

      {/* Scopes */}
      <section className="px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-space font-bold">{t.scopesTitle}</h2>
          <p className="mt-4 text-white/65 max-w-2xl">{t.scopesLead}</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.scopes.map(([title, text], i) => {
              const imgs = scopeImages[i] ?? [];
              return (
                <div key={title} className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col">
                  <div className={cn('bg-[#1b1b1e] aspect-[16/7] grid gap-px', imgs.length > 1 && (i === 5 ? 'grid-rows-2' : 'grid-cols-2'))}>
                    {imgs.map((img) => (
                      <div key={img} className="flex items-center justify-center overflow-hidden bg-[#1b1b1e]">
                        <Media name={img} alt={title} className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                  <div className="p-5">
                    <h3 className="font-space font-bold text-lg">{title}</h3>
                    <p className="mt-2 text-sm text-white/65 leading-relaxed">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-4 items-stretch">
            <div className="rounded-xl border border-white/10 bg-[#1b1b1e] overflow-hidden">
              <Media name="scope-parade" alt="RGB Parade" className="w-full h-auto block" />
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1b1b1e] overflow-hidden hidden md:block">
              <Media name="scope-exposure" alt="Exposure" className="h-full w-auto max-h-[420px] block" />
            </div>
          </div>
        </div>
      </section>

      {/* Em movimento */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-space font-bold">{t.motionTitle}</h2>
          <p className="mt-4 text-white/65 max-w-3xl">{t.motionLead}</p>
          <div className="mt-8 rounded-xl overflow-hidden border border-white/10 bg-black">
            <video
              className="w-full h-auto block"
              src="/omnik-media/scopes-motion.mp4"
              poster="/omnik-media/scopes-motion-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>

      {/* Ferramentas */}
      <section className="px-4 md:px-6 py-16 md:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-space font-bold max-w-3xl">{t.toolsTitle}</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {t.tools.map(([title, text], i) => {
              const Icon = toolIcons[i] ?? Gauge;
              return (
                <div key={title} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-neura-orange/10 border border-neura-orange/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-neura-orange" />
                  </div>
                  <div>
                    <h3 className="font-space font-bold">{title}</h3>
                    <p className="mt-1 text-sm text-white/65 leading-relaxed">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="px-4 md:px-6 py-16 md:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-space font-bold">{t.galleryTitle}</h2>
          <p className="mt-4 text-white/65">{t.galleryLead}</p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {galleryShots.map((n, i) => (
              <figure key={n} className="rounded-xl overflow-hidden border border-white/10 bg-black">
                <Media name={`ui-${n}`} alt={t.gallery[i]} className="w-full h-auto block" />
                <figcaption className="px-4 py-3 text-sm text-white/60 font-space">{t.gallery[i]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="px-4 md:px-6 py-16 md:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-space font-bold">{t.dlTitle}</h2>
          <p className="mt-4 text-white/65 max-w-2xl">{t.dlLead}</p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {(
              [
                ['mac', t.dlMac, t.dlMacReq, t.dlMacNote, Apple],
                ['windows', t.dlWin, t.dlWinReq, t.dlWinNote, Monitor],
              ] as const
            ).map(([key, name, req, note, Icon]) => (
              <div key={key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-3">
                  <Icon className="w-7 h-7 text-neura-orange" />
                  <h3 className="font-space font-bold text-2xl">{name}</h3>
                </div>
                <p className="mt-2 text-sm text-white/60">{req}</p>
                <a
                  href={DOWNLOADS[key]}
                  className="mt-6 self-start inline-flex items-center gap-2 px-6 py-3 rounded-full font-space text-sm tracking-wider border border-neura-orange/50 bg-neura-orange/10 hover:bg-gradient-to-r hover:from-neura-orange-gradient hover:to-neura-yellow hover:text-black hover:border-transparent transition-all"
                >
                  <Download className="w-4 h-4" />
                  {t.dlButton} · {name}
                </a>
                <p className="mt-6 text-xs text-white/50 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preço */}
      <section id="comprar" className="px-4 md:px-6 py-16 md:py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-space font-bold">{t.pricingTitle}</h2>
          <p className="mt-4 text-white/65">{t.pricingLead}</p>
          <div className="mt-10 rounded-2xl border border-neura-orange/40 bg-white/[0.04] p-6 md:p-10 text-left">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="font-space tracking-widest text-xs text-white/60 uppercase">{t.planName}</div>
                <div className="mt-1 text-4xl md:text-5xl font-space font-bold">{PRICE}</div>
              </div>
              <BuyButton label={t.buy} />
            </div>
            <ul className="mt-8 space-y-3">
              {t.planFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-white/80">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neura-orange shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-white/50 leading-relaxed">{t.checkout}</p>
          </div>
          <a href={RENEW_URL} className="inline-block mt-6 text-sm text-white/60 hover:text-neura-yellow transition-colors">
            {t.renew} · {RENEWAL_PRICE}
          </a>
        </div>
      </section>

      {/* Dúvidas */}
      <section className="px-4 md:px-6 py-16 md:py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-space font-bold">{t.faqTitle}</h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {t.faq.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-space font-medium">
                  {q}
                  <span className="text-neura-orange transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-white/65 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-4 md:px-6 py-10 border-t border-white/10 text-sm text-white/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-3">
          <Link to="/" className="hover:text-neura-yellow transition-colors">
            {t.by}
          </Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-neura-yellow transition-colors">
            {t.support} · {SUPPORT_EMAIL}
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Omnik;
