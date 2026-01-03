
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
      salesCount: 1250,
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
      createdAt: new Date().toISOString()
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

  const sortedProductsList = useMemo(() => {
    const list = [...products];
    if (list.length === 0) return [];
    
    const maxSales = Math.max(...list.map(p => p.salesCount));
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return list.sort((a, b) => {
      if (a.salesCount === maxSales) return -1;
      if (b.salesCount === maxSales) return 1;

      const isNewA = new Date(a.createdAt) > sevenDaysAgo;
      const isNewB = new Date(b.createdAt) > sevenDaysAgo;
      
      if (isNewA && !isNewB) return -1;
      if (isNewB && !isNewA) return 1;

      return b.salesCount - a.salesCount;
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    return activeCategory === 'الكل' 
      ? sortedProductsList 
      : sortedProductsList.filter(product => product.category === activeCategory);
  }, [activeCategory, sortedProductsList]);

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

  const categories = ['الكل', 'سيروم', 'مرطب', 'منظف', 'تونر', 'حماية', 'عناية خاصة'];

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
          onNext={() => {
            const idx = filteredProducts.findIndex(p => p.id === selectedProduct.id);
            setSelectedProduct(filteredProducts[(idx + 1) % filteredProducts.length]);
          }}
          onPrev={() => {
            const idx = filteredProducts.findIndex(p => p.id === selectedProduct.id);
            setSelectedProduct(filteredProducts[(idx - 1 + filteredProducts.length) % filteredProducts.length]);
          }}
        />
      )}
      
      <Navbar onShopNow={handleShopNow} />
      <Hero onShopNow={handleShopNow} />

      <section id="products" className="py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">مجموعتنا المختارة</h2>
              <p className="text-slate-500 text-lg leading-relaxed">اكتشفي تشكيلة لومينا الفريدة، المرتبة حسب ذوق عملائنا وأحدث ابتكاراتنا الجمالية.</p>
            </div>
            <div className="flex space-x-3 space-x-reverse overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-8 py-3 rounded-2xl font-black transition-all border-2 ${
                    activeCategory === cat 
                      ? 'bg-pink-600 text-white border-pink-600 shadow-xl' 
                      : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
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
        </div>
      </section>

      <GeminiConsultant />
      
      {/* باقي الأقسام مثل Hero و Brand Values موجودة مسبقاً */}
      
      <button 
        onClick={() => setIsAdminMode(true)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-pink-600 transition-all z-[90] border-4 border-white group"
      >
        <i className="fas fa-lock text-sm group-hover:scale-125 transition-transform"></i>
      </button>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default App;
