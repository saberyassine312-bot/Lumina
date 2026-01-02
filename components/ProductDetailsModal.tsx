
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

  const handleRateSubmit = () => {
    if (userRating === 0) return;
    setIsSubmitted(true);
    // هنا يمكن إضافة كود لإرسال التقييم إلى السيرفر لاحقاً
    setTimeout(() => {
      setIsSubmitted(false);
      setUserRating(0);
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
            className="w-full h-full object-cover animate-fade-in"
          />
          {hasDiscount && (
            <div className="absolute bottom-6 right-6 bg-pink-600 text-white px-6 py-2 rounded-2xl font-black text-sm shadow-xl animate-bounce">
              وفر {product.discountPercentage}% اليوم
            </div>
          )}
          
          {/* Mobile Quick Nav */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 md:hidden">
             {onPrev && (
               <button onClick={onPrev} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"><i className="fas fa-chevron-right"></i></button>
             )}
             {onNext && (
               <button onClick={onNext} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"><i className="fas fa-chevron-left"></i></button>
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

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight animate-fade-in">
            {product.name}
          </h2>

          <div className="mb-10 flex items-baseline justify-end gap-4 flex-row-reverse animate-fade-in">
            <span className="text-5xl font-black text-pink-600 tracking-tighter">{finalPrice} درهم</span>
            {hasDiscount && (
              <span className="text-2xl text-slate-300 line-through decoration-slate-200 decoration-2">{product.price} درهم</span>
            )}
          </div>

          {/* التقييم التفاعلي الجديد */}
          <div className="mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-100 animate-fade-in" style={{animationDelay: '50ms'}}>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-4 text-pink-600 animate-bounce">
                <i className="fas fa-check-circle text-3xl mb-2"></i>
                <p className="font-bold">شكراً لتقييمكِ الرائع!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center sm:flex-row-reverse sm:justify-between gap-4">
                <span className="text-slate-700 font-bold">قيمي هذا المنتج:</span>
                <div className="flex flex-row-reverse gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setUserRating(star)}
                      className="text-2xl transition-all transform hover:scale-125 focus:outline-none"
                    >
                      <i className={`fa-star ${
                        star <= (hoverRating || userRating) 
                        ? 'fas text-amber-400' 
                        : 'far text-slate-300'
                      }`}></i>
                    </button>
                  ))}
                </div>
                {userRating > 0 && (
                  <button 
                    onClick={handleRateSubmit}
                    className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-pink-600 transition-all shadow-lg active:scale-95"
                  >
                    إرسال
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-8 mb-12">
            <div className="animate-fade-in" style={{animationDelay: '100ms'}}>
              <h4 className="font-bold text-slate-900 mb-3 text-xl">وصف المنتج</h4>
              <p className="text-slate-500 leading-relaxed text-lg italic">
                "{product.description}"
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{animationDelay: '200ms'}}>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <i className="fas fa-check-circle text-pink-500 mb-2"></i>
                <p className="font-bold text-sm text-slate-800">طبيعي 100%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <i className="fas fa-vial text-pink-500 mb-2"></i>
                <p className="font-bold text-sm text-slate-800">مختبر طبياً</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '300ms'}}>
            <button className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-pink-600 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 group">
              <i className="fas fa-shopping-bag group-hover:animate-bounce"></i>
              <span>أضيفي للسلة الآن</span>
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-5 border-2 border-slate-100 text-slate-400 rounded-2xl font-bold hover:bg-slate-50 hover:text-slate-600 transition-all"
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
