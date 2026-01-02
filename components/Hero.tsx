
import React from 'react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 hero-gradient overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-[-10%] w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-[-5%] w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-right space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-bold mb-4">
            عناية طبيعية 100%
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-slate-900">
            أعيدي لبشرتك <br />
            <span className="gradient-text">توهجها الطبيعي</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            اكتشفي سر الجمال الحقيقي مع منتجات لومينا المبتكرة. نجمع بين أحدث التقنيات العلمية وأجود المكونات الطبيعية لنمنحك بشرة مشرقة وصحية تليق بكِ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button 
              onClick={onShopNow}
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-pink-600 transition-all shadow-lg hover:shadow-pink-200 text-center transform hover:-translate-y-1 outline-none"
            >
              ابدأي رحلة الجمال
            </button>
            <a 
              href="#products" 
              className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all text-center inline-block transform hover:-translate-y-1"
            >
              مشاهدة المجموعات
            </a>
          </div>
          <div className="flex items-center justify-end space-x-4 space-x-reverse pt-8">
            <div className="flex -space-x-2 space-x-reverse">
              <img className="w-10 h-10 rounded-full border-2 border-white" src="https://picsum.photos/100/100?random=1" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-white" src="https://picsum.photos/100/100?random=2" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-white" src="https://picsum.photos/100/100?random=3" alt="User" />
            </div>
            <div className="text-sm text-slate-500 font-medium">
              انضمي لأكثر من <span className="text-pink-600 font-bold">10,000+</span> امرأة سعيدة
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="relative z-20 transform hover:scale-105 transition-transform duration-700">
            <img 
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop" 
              alt="Lumina Skincare Product" 
              className="rounded-3xl shadow-2xl mx-auto w-full max-w-md cursor-pointer"
              onClick={onShopNow}
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl z-30 animate-bounce">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <i className="fas fa-star text-2xl"></i>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold">الأكثر مبيعاً</p>
                <p className="text-lg font-bold">سيروم لومينا جلو</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
