
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import GeminiConsultant from './components/GeminiConsultant';
import Dashboard from './components/Dashboard';
import ProductDetailsModal from './components/ProductDetailsModal';
import { Product } from './types';

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "سيروم لومينا جلو",
      category: "سيروم",
      price: 165,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
      description: "سيروم فيتامين C المركز لتفتيح البشرة وإزالة البقع الداكنة بشكل فعال، معزز بحمض الهيالورونيك لترطيب فائق ونضارة فورية.",
      rating: 4.9,
      discountPercentage: 15,
      salesCount: 1250, // الأكثر مبيعاً
      createdAt: "2023-10-01"
    },
    {
      id: 2,
      name: "كريم الترطيب العميق",
      category: "مرطب",
      price: 120,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
      description: "ترطيب يدوم 24 ساعة مع حمض الهيالورونيك والسيراميد لإصلاح حاجز البشرة التالف وحمايتها من العوامل البيئية الضارة.",
      rating: 4.8,
      salesCount: 850,
      createdAt: "2023-11-15"
    },
    {
      id: 3,
      name: "منظف الرغوة اللطيف",
      category: "منظف",
      price: 85,
      image: "https://images.unsplash.com/photo-1556229162-5c63ed9c4ffb?q=80&w=800&auto=format&fit=crop",
      description: "ينظف المسام بعمق دون تجفيف البشرة، مثالي للبشرة الحساسة والمختلطة، غني بخلاصة الصبار الطبيعي والبابونج المهدئ.",
      rating: 4.7,
      salesCount: 920,
      createdAt: new Date().toISOString() // منتج جديد (اليوم)
    },
    {
      id: 4,
      name: "تونر التوازن النقي",
      category: "تونر",
      price: 95,
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop",
      description: "يعيد توازن درجة الحموضة الطبيعية للبشرة ويقلص حجم المسام بفعالية مذهلة بفضل تركيبة النياسيناميد المتطورة.",
      rating: 4.6,
      salesCount: 430,
      createdAt: "2023-12-01"
    }
  ]);

  // منطق الترتيب الذكي
  const sortedProductsList = useMemo(() => {
    const list = [...products];
    const maxSales = Math.max(...list.map(p => p.salesCount));
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return list.sort((a, b) => {
      // 1. الأكثر مبيعاً على الإطلاق في المقدمة
      if (a.salesCount === maxSales) return -1;
      if (b.salesCount === maxSales) return 1;

      // 2. المنتجات الجديدة (أقل من أسبوع) تلي الأكثر مبيعاً
      const isNewA = new Date(a.createdAt) > sevenDaysAgo;
      const isNewB = new Date(b.createdAt) > sevenDaysAgo;
      
      if (isNewA && !isNewB) return -1;
      if (isNewB && !isNewA) return 1;

      // 3. الباقي حسب عدد المبيعات تنازلياً
      return b.salesCount - a.salesCount;
    });
  }, [products]);

  // منطق الفلترة المعتمد على القائمة المرتبة
  const filteredProducts = useMemo(() => {
    return activeCategory === 'الكل' 
      ? sortedProductsList 
      : sortedProductsList.filter(product => product.category === activeCategory);
  }, [activeCategory, sortedProductsList]);

  const categories = ['الكل', 'سيروم', 'مرطب', 'منظف', 'تونر', 'حماية', 'عناية خاصة'];

  // تفعيل زر "تسوقي الآن" لفتح المنتج الأكثر مبيعاً
  const handleShopNow = () => {
    if (sortedProductsList.length > 0) {
      setSelectedProduct(sortedProductsList[0]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextProduct = () => {
    if (!selectedProduct) return;
    const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    const nextIndex = (currentIndex + 1) % filteredProducts.length;
    setSelectedProduct(filteredProducts[nextIndex]);
  };

  const handlePrevProduct = () => {
    if (!selectedProduct) return;
    const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    const prevIndex = (currentIndex - 1 + filteredProducts.length) % filteredProducts.length;
    setSelectedProduct(filteredProducts[prevIndex]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-pink-100 selection:text-pink-600">
      {isAdminMode && (
        <Dashboard 
          products={products} 
          setProducts={setProducts} 
          onClose={() => setIsAdminMode(false)} 
        />
      )}

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onNext={filteredProducts.length > 1 ? handleNextProduct : undefined}
          onPrev={filteredProducts.length > 1 ? handlePrevProduct : undefined}
        />
      )}
      
      <Navbar onShopNow={handleShopNow} />
      <Hero onShopNow={handleShopNow} />

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div className="group">
            <p className="text-5xl font-black text-pink-600 mb-3 group-hover:scale-110 transition-transform inline-block">98%</p>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">رضا العملاء</p>
          </div>
          <div className="group">
            <p className="text-5xl font-black text-pink-600 mb-3 group-hover:scale-110 transition-transform inline-block">100%</p>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">مكونات نباتية</p>
          </div>
          <div className="group">
            <p className="text-5xl font-black text-pink-600 mb-3 group-hover:scale-110 transition-transform inline-block">15k+</p>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">شحنة شهرياً</p>
          </div>
          <div className="group">
            <p className="text-5xl font-black text-pink-600 mb-3 group-hover:scale-110 transition-transform inline-block">24/7</p>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">دعم مباشر</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="text-right max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">مجموعتنا المختارة</h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                اكتشفي تشكيلة لومينا الفريدة، المرتبة حسب ذوق عملائنا وأحدث ابتكاراتنا الجمالية.
              </p>
            </div>
            <div className="flex space-x-3 space-x-reverse overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-8 py-3 rounded-2xl font-black transition-all border-2 ${
                    activeCategory === cat 
                      ? 'bg-pink-600 text-white border-pink-600 shadow-xl shadow-pink-100 -translate-y-1' 
                      : 'bg-white text-slate-500 hover:bg-slate-50 border-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onOpenDetails={setSelectedProduct}
                  isBestSeller={product.salesCount === Math.max(...products.map(p => p.salesCount))}
                  isNew={new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
                />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
              <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-300">
                <i className="fas fa-magic text-4xl"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">قريباً جداً...</h3>
              <p className="text-slate-400 text-lg">نحن نحضر لكِ مفاجآت جمالية مذهلة في هذا القسم.</p>
              <button 
                onClick={() => setActiveCategory('الكل')}
                className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-pink-600 transition-all"
              >
                استكشفي الأقسام الأخرى
              </button>
            </div>
          )}
        </div>
      </section>

      <GeminiConsultant />

      {/* Brand Values */}
      <section id="about" className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-right">
              <h2 className="text-5xl md:text-7xl font-black leading-tight">جمالكِ أمانة <br/><span className="text-pink-500">نعتز بها</span></h2>
              <div className="grid gap-8">
                <div className="flex items-start gap-6 flex-row-reverse">
                  <div className="w-16 h-16 bg-pink-600/20 rounded-3xl flex items-center justify-center text-pink-500 shrink-0 border border-pink-500/20">
                    <i className="fas fa-heart text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black mb-2">شغف بالتميز</h4>
                    <p className="text-slate-400 text-lg">نحن لا نصنع منتجات فحسب، بل نصمم تجارب جمالية فريدة تدلل حواسكِ.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 flex-row-reverse">
                  <div className="w-16 h-16 bg-pink-600/20 rounded-3xl flex items-center justify-center text-pink-500 shrink-0 border border-pink-500/20">
                    <i className="fas fa-shield-alt text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black mb-2">أمان مطلق</h4>
                    <p className="text-slate-400 text-lg">تركيباتنا خالية تماماً من البارابين والكبريتات، لتمنحكِ الأمان الذي تستحقينه.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-pink-600/20 rounded-[3rem] blur-2xl group-hover:bg-pink-600/30 transition-all"></div>
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1000&auto=format&fit=crop" 
                className="rounded-[3rem] shadow-2xl border-4 border-white/10 relative z-10 transition-transform duration-700 group-hover:scale-105"
                alt="Brand philosophy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-pink-600 to-amber-500 p-1 rounded-[4rem] shadow-2xl">
            <div className="bg-white rounded-[3.8rem] p-12 md:p-20">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8">كوني أول من يعلم</h2>
              <p className="text-slate-500 text-xl mb-12 max-w-2xl mx-auto">
                اشتركي الآن لتصلكِ أحدث نصائح الجمال وعروضنا الحصرية التي لا تكرر.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="بريدكِ الإلكتروني المميز" 
                  className="flex-1 px-8 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-pink-500 outline-none text-right font-bold"
                />
                <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-pink-600 transition-all shadow-xl">
                  اشتركي
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 w-14 h-14 bg-white text-slate-900 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 z-40 border-2 border-slate-100 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        } hover:bg-pink-600 hover:text-white hover:-translate-y-2`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* Admin Toggle */}
      <button 
        onClick={() => setIsAdminMode(true)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-pink-600 transition-all z-[90] border-4 border-white group"
        title="لوحة الإدارة"
      >
        <i className="fas fa-lock text-sm group-hover:scale-125 transition-transform"></i>
      </button>

      <footer className="bg-white pt-32 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-4xl font-black gradient-text tracking-tighter mb-10 inline-block">LUMINA</span>
          <div className="flex justify-center space-x-8 space-x-reverse mb-12">
            <a href="#" className="text-slate-400 hover:text-pink-600 text-2xl transition-all hover:scale-125"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-slate-400 hover:text-pink-600 text-2xl transition-all hover:scale-125"><i className="fab fa-tiktok"></i></a>
            <a href="#" className="text-slate-400 hover:text-pink-600 text-2xl transition-all hover:scale-125"><i className="fab fa-snapchat"></i></a>
          </div>
          <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">&copy; {new Date().getFullYear()} LUMINA SKINCARE • صنع بكل حب لجمالكِ</p>
        </div>
      </footer>
      
      <style>{`
        .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
