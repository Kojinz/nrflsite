
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  children, 
  className,
  align = 'left' 
}) => {
  return (
    <h2 
      className={cn(
        "text-3xl md:text-4xl font-bold relative pb-4 mb-8",
        align === 'center' && "text-center",
        align === 'right' && "text-right",
        className
      )}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-16 h-1 bg-neura-orange"></span>
    </h2>
  );
};

export default SectionTitle;
