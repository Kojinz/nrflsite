
import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon,
  className 
}) => {
  return (
    <div className={cn(
      "p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm",
      "hover:border-neura-orange/30 hover:bg-white/10 transition-all duration-300",
      className
    )}>
      <div className="text-neura-orange mb-4 text-3xl">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default ServiceCard;
