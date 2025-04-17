import React from 'react';
import { cn } from '@/lib/utils';

interface GradientImageProps {
  className?: string;
}

const GradientImage: React.FC<GradientImageProps> = ({ className }) => {
  return (
    <div className={cn("relative aspect-square w-full max-w-xl", className)}>
      <div className="relative aspect-square w-full rounded-xl overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/img/sqr_anim.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default GradientImage;
