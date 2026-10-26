
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags?: string[];
  featured?: boolean;
  badge?: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon,
  tags,
  featured = false,
  badge,
  className 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300 flex flex-col justify-between",
        featured
          ? "p-7 md:p-9 border-2 border-neura-orange/60 bg-gradient-to-br from-neura-orange-gradient/15 via-white/[0.06] to-black/80 shadow-[0_0_45px_-10px_rgba(255,107,0,0.35)] hover:border-neura-yellow hover:shadow-[0_0_55px_-8px_rgba(255,184,0,0.45)]"
          : "p-6 border border-white/10 bg-white/[0.04] hover:border-neura-orange/40 hover:bg-white/[0.08] hover:-translate-y-1.5 hover:shadow-[0_12px_36px_-10px_rgba(255,107,0,0.22)]",
        className
      )}
    >
      {/* Interactive spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(${featured ? '520px' : '360px'} circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 184, 0, 0.16), transparent 70%)`
            : undefined,
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div
            className={cn(
              "rounded-lg bg-gradient-to-br from-neura-orange-gradient/25 to-neura-yellow/15 border border-neura-orange/40 flex items-center justify-center text-neura-orange group-hover:scale-110 group-hover:border-neura-yellow transition-all duration-300",
              featured ? "w-14 h-14" : "w-12 h-12"
            )}
          >
            {icon}
          </div>

          {badge && (
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-space font-bold uppercase tracking-widest bg-gradient-to-r from-neura-orange-gradient to-neura-yellow text-black shadow-md">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              {badge}
            </span>
          )}
        </div>

        <h3
          className={cn(
            "font-bold mb-3 group-hover:text-neura-yellow transition-colors duration-300",
            featured ? "text-2xl md:text-3xl text-white" : "text-xl"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-white/80 leading-relaxed",
            featured ? "text-base md:text-lg max-w-3xl" : "text-sm md:text-base text-white/70"
          )}
        >
          {description}
        </p>
      </div>

      {tags && tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "text-xs font-space px-3 py-1 rounded-full border transition-colors",
                  featured
                    ? "bg-black/50 text-neura-yellow border-neura-orange/40"
                    : "bg-white/5 text-white/75 border-white/10 group-hover:border-neura-orange/30 group-hover:text-neura-yellow/90"
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          {featured && (
            <a
              href="#contato"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-space font-bold tracking-wider text-neura-yellow hover:text-white transition-colors"
            >
              <span>SOLICITAR TRANSMISSÃO →</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
