import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  imageSrc: string;
  className?: string;
  imagePosition?: string;
  bio?: string;
  tags?: string[];
  linkedinUrl?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  imageSrc,
  className,
  imagePosition = "center",
  bio,
  tags,
  linkedinUrl
}) => {
  return (
    <div className={cn("group flex flex-col", className)}>
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-square border border-white/10 group-hover:border-neura-orange/50 transition-all duration-500 shadow-lg">
        <img 
          src={imageSrc} 
          alt={name} 
          className={cn(
            "w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500",
            {
              'object-[center_20%]': imagePosition === 'top',
              'object-[center_80%]': imagePosition === 'bottom'
            }
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          {bio && (
            <p className="text-xs md:text-sm text-white/90 leading-snug mb-3 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              {bio}
            </p>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-space text-neura-yellow hover:underline"
            >
              <span>Ver LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold group-hover:text-neura-yellow transition-colors duration-300">
        {name}
      </h3>
      <p className="text-white/70 text-sm md:text-base mt-0.5">{role}</p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-space px-2.5 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/10 group-hover:border-neura-orange/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMember;
