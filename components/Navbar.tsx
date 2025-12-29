
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-2 shadow-sm' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#hero" className="text-2xl font-extrabold gradient-text tracking-tighter">LUMINA</a>
          </div>
          
          <div className="hidden md:flex space-x-8 space-x-reverse items-center font-medium">
            <a href="#hero" className="hover:text-pink-600 transition-colors">الرئيسية</a>
            <a href="#products" className="hover:text-pink-600 transition-colors">المنتجات</a>
            <a href="#ai-consultant" className="hover:text-pink-600 transition-colors">مستشارك الذكي</a>
            <a href="#about" className="hover:text-pink-600 transition-colors">عن لومينا</a>
          </div>

          <div>
            <a href="#products" className="bg-pink-600 text-white px-6 py-2 rounded-full font-bold hover:bg-pink-700 transition-all transform hover:scale-105 inline-block">
              تسوقي الآن
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
