import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'SOBRE', href: '#sobre' },
  { label: 'SERVIÇOS', href: '#servicos' },
  { label: 'EQUIPE', href: '#equipe' },
  { label: 'OMNIK', href: '/omnik' },
  { label: 'CONTATO', href: '#contato' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        scrolled || mobileMenuOpen
          ? "py-3 bg-[#141414]/85 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Logo variant="cube" />
        </Link>

        <div className="hidden md:flex items-center space-x-10 text-white uppercase tracking-wider text-sm font-space font-light">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 text-white/80 hover:text-neura-yellow transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-neura-orange-gradient after:to-neura-yellow hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            className="px-5 py-2 rounded-full text-xs tracking-widest border border-neura-orange/50 bg-neura-orange/10 text-white hover:bg-gradient-to-r hover:from-neura-orange-gradient hover:to-neura-yellow hover:border-transparent transition-all duration-300"
          >
            FALE CONOSCO
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Abrir menu"
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-6 mt-3 border-t border-white/10 flex flex-col space-y-4 font-space">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-neura-yellow transition-colors text-base tracking-wider py-1"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
