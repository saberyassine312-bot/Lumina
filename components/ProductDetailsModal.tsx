
import React, { useEffect, useState } from 'react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose, onNext, onPrev }) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const hasDiscount = (product.discountPercentage || 0) > 0;
  const finalPrice = hasDiscount 
    ? (product.price * (1 - (product.discountPercentage || 0) / 100)).toFixed(2)
    : product.price;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleRateSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userRating === 0) return;
    setIsSubmitted(true);
    
    // محاكاة إرسال التقييم بنجاح
    setTimeout(() => {
      setIsSubmitted(false);
      setUserRating(0);
      setHoverRating(0);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-8 bg-slate-950/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
      
      {/* Navigation Arrows - Desktop */}
      {onPrev && (
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="hidden md:flex absolute left-10 z-[130] w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full items-center justify-center transition-all border border-white/10"
        >
          <i className="fas fa-chevron-left text-xl"></i>
        </button>
      )}
      {onNext && (
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="hidden md:flex absolute right-10 z-[130] w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full items-center justify-center transition-all border border-white/10"
        >
          <i className="fas fa-chevron-right text-xl"></i>
        </button>
      )}

      <div 
        className="bg-white rounded-none md:rounded-[3rem] w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-slide-up relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-xl border border-slate-100 hover:bg-pink-600 hover:text-white transition-all"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 bg-slate-100 relative h-[40vh] md:h-auto overflow-hidden">
          <img 
            key={product.image}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover animate-fade-in transition-transform duration-700 hover:scale-110"
          />
          {hasDiscount && (
            <div className="absolute bottom-6 right-6 bg-pink-600 text-white px-6 py-2 rounded-2xl font-black text-sm shadow-xl animate-bounce">
              وفر {product.discountPercentage}% اليوم
            </div>
          )}
          
          {/* Mobile Quick Nav */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 md:hidden">
             {onPrev && (
               <button onClick={onPrev} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg text-slate-900"><i className="fas fa-chevron-right"></i></button>
             )}
             {onNext && (
               <button onClick={onNext} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg text-slate-900"><i className="fas fa-chevron-left"></i></button>
             )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col text-right overflow-y-auto">
          <div className="flex justify-between items-center mb-6 flex-row-reverse">
            <span className="bg-pink-100 text-pink-600 px-5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border border-pink-200">
              {product.category}
            </span>
            <div className="flex text-amber-400 items-center">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star text-sm ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`}></i>
              ))}
              <span className="text-slate-400 text-xs mr-2 font-bold">{product.rating}</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            {product.name}
          </h2>

          <div className="mb-10 flex items-baseline justify-end gap-4 flex-row-reverse">
            <span className="text-5xl font-black text-pink-600 tracking-tighter">{finalPrice} درهم</span>
            {hasDiscount && (
              <span className="text-2xl text-slate-300 line-through decoration-slate-200 decoration-2">{product.price} درهم</span>
            )}
          </div>

          {/* التقييم التفاعلي المفعّل */}
          <div className="mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden transition-all duration-500">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-4 text-pink-600 animate-fade-in">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-heart text-xl animate-pulse"></i>
                </div>
                <p className="font-black text-lg">شكراً لتقييمكِ الرقيق!</p>
                <p className="text-sm text-slate-400">نحن نقدر رأيكِ لتقديم الأفضل دوماً</p>
              </div>
            ) : (
              <div className="flex flex-col items-center sm:flex-row-reverse sm:justify-between gap-6">
                <span className="text-slate-800 font-black text-lg">قيمي تجربتكِ:</span>
                <div className="flex flex-row-reverse gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={(e) => { e.stopPropagation(); setUserRating(star); }}
                      className="text-3xl transition-all duration-300 transform hover:scale-150 active:scale-90 focus:outline-none"
                    >
                      <i className={`fa-star ${
                        star <= (hoverRating || userRating) 
                        ? 'fas text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]' 
                        : 'far text-slate-300'
                      }`}></i>
                    </button>
                  ))}
                </div>
                <button 
                  disabled={userRating === 0}
                  onClick={handleRateSubmit}
                  className={`px-8 py-3 rounded-2xl font-black transition-all shadow-lg active:scale-95 ${
                    userRating > 0 
                    ? 'bg-slate-900 text-white hover:bg-pink-600' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  إرسال التقييم
                </button>
              </div>
            )}
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <h4 className="font-black text-slate-900 mb-3 text-xl">لماذا تحبينه؟</h4>
              <p className="text-slate-500 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 flex-row-reverse text-right">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 shrink-0">
                  <i className="fas fa-leaf text-sm"></i>
                </div>
                <p className="font-bold text-sm text-slate-800">مكونات عضوية نقية</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 flex-row-reverse text-right">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 shrink-0">
                  <i className="fas fa-microscope text-sm"></i>
                </div>
                <p className="font-bold text-sm text-slate-800">نتائج مثبتة معملياً</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <button className="flex-[2] py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xl hover:bg-pink-600 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 group active:scale-95">
              <i className="fas fa-shopping-bag group-hover:animate-bounce"></i>
              <span>أضيفي للسلة الآن</span>
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-5 border-2 border-slate-100 text-slate-500 rounded-[1.5rem] font-black hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
