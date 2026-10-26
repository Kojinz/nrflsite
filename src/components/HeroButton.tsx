
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface HeroButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const HeroButton: React.FC<HeroButtonProps> = ({ children, href, className }) => {
  return (
    <a 
      href={href} 
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
        "border border-white/30 text-white py-3.5 px-8 rounded-full",
        "hover:border-neura-orange hover:bg-white/10 hover:shadow-[0_0_28px_rgba(255,107,0,0.35)] hover:-translate-y-0.5",
        "transition-all duration-300 text-center font-space font-light tracking-wider",
        className
      )}
    >
      <span>{children}</span>
      <ArrowUpRight className="w-4 h-4 text-neura-orange transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
};

export default HeroButton;
