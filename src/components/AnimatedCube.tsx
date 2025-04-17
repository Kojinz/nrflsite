
import React from 'react';

const AnimatedCube: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* Plus symbols around the cube */}
      <div className="absolute top-0 right-0 text-white/50 text-3xl">+</div>
      <div className="absolute top-1/2 right-0 text-white/50 text-3xl">+</div>
      <div className="absolute bottom-0 right-0 text-white/50 text-3xl">+</div>
      <div className="absolute top-1/4 right-1/4 text-white/50 text-3xl">+</div>
      <div className="absolute bottom-1/4 right-1/4 text-white/50 text-3xl">+</div>
      
      {/* Gradient cube */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
        <div className="absolute inset-0 gradient-cube animate-pulse-orange"></div>
      </div>
    </div>
  );
};

export default AnimatedCube;
