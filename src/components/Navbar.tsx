import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center">
      <Link to="/">
        <Logo variant="cube" />
      </Link>
      <div className="hidden md:flex space-x-12 text-white uppercase tracking-wider text-sm font-space font-light">
        <a href="#sobre" className="hover:text-neura-yellow transition-colors">SOBRE</a>
        <a href="#servicos" className="hover:text-neura-yellow transition-colors">SERVIÇOS</a>
        <a href="#contato" className="hover:text-neura-yellow transition-colors">CONTATO</a>
      </div>
      <button className="md:hidden text-white">
        <img 
          src="/icon.png" 
          alt="Menu" 
          className="w-6 h-6"
        />
      </button>
    </nav>
  );
};

export default Navbar;
