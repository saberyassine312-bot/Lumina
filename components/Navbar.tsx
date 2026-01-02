
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onShopNow: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onShopNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a 
              href="#hero" 
              onClick={handleLogoClick}
              className="text-3xl font-black gradient-text tracking-tighter hover:opacity-80 transition-opacity cursor-pointer"
            >
              LUMINA
            </a>
          </div>
          
          <div className="hidden md:flex space-x-10 space-x-reverse items-center font-bold text-slate-600">
            <a href="#hero" className="hover:text-pink-600 transition-all hover:-translate-y-0.5">الرئيسية</a>
            <a href="#products" className="hover:text-pink-600 transition-all hover:-translate-y-0.5">المنتجات</a>
            <a href="#ai-consultant" className="hover:text-pink-600 transition-all hover:-translate-y-0.5">مستشارك الذكي</a>
            <a href="#about" className="hover:text-pink-600 transition-all hover:-translate-y-0.5">عن لومينا</a>
          </div>

          <div className="flex items-center">
            <button 
              onClick={onShopNow}
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black hover:bg-pink-600 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-pink-200 inline-block active:scale-95 outline-none"
            >
              تسوقي الآن
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
