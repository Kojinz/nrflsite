
import React from 'react';
import { cn } from '@/lib/utils';

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
        "inline-block border border-white/30 text-white py-3 px-8 rounded-full",
        "hover:bg-white/10 transition-all duration-300 text-center",
        "font-space font-light",
        className
      )}
    >
      {children}
    </a>
  );
};

export default HeroButton;
