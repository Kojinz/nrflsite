import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'horizontal' | 'cube';
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ variant = 'horizontal', className, size = 1 }) => {
  if (variant === 'cube') {
    return (
      <div className={cn("relative w-10 h-10", className)}>
        <img 
          src="/img/icon.png" 
          alt="Neura Frame Lab Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  const dimensions = size === 2.8 ? "w-[250px] h-[250px]" : "w-24 h-24";

  return (
    <div className={cn("flex", className)}>
      <div className={cn("relative", dimensions)}>
        <img 
          src="/img/nrfl.png" 
          alt="Neura Frame Lab Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
