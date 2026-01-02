
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  isBestSeller?: boolean;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails, isBestSeller, isNew }) => {
  const hasDiscount = (product.discountPercentage || 0) > 0;
  const finalPrice = hasDiscount 
    ? (product.price * (1 - (product.discountPercentage || 0) / 100)).toFixed(2)
    : product.price;

  return (
    <div 
      onClick={() => onOpenDetails(product)}
      className="group bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-2xl border border-slate-100 relative overflow-hidden flex flex-col h-full cursor-pointer"
    >
      {/* Badges Stack */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        {isBestSeller && (
          <div className="bg-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-amber-400">
            الأكثر مبيعاً ⭐
          </div>
        )}
        {isNew && !isBestSeller && (
          <div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
            جديد ✨
          </div>
        )}
        {hasDiscount && (
          <div className="bg-pink-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            وفر {product.discountPercentage}%
          </div>
        )}
      </div>
      
      <div className="relative h-64 mb-6 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-pink-600 tracking-wider uppercase">
          {product.category}
        </div>
      </div>
      
      <div className="px-2 pb-2 flex-grow flex flex-col text-right">
        <div className="flex justify-between items-start mb-2 flex-row-reverse">
          <h3 className="text-xl font-bold text-slate-900 leading-tight">{product.name}</h3>
          <div className="flex flex-col items-start">
            <span className="text-pink-600 font-black text-2xl">{finalPrice} درهم</span>
            {hasDiscount && (
              <span className="text-slate-400 text-sm line-through decoration-slate-300 decoration-2">{product.price} درهم</span>
            )}
          </div>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center mb-6 justify-end">
          <span className="text-xs text-slate-400 ml-2">({product.rating})</span>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fas fa-star text-[10px] ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`}></i>
            ))}
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-pink-600 transition-all flex items-center justify-center space-x-2 space-x-reverse shadow-lg shadow-slate-200"
        >
          <i className="fas fa-shopping-bag text-sm"></i>
          <span>أضيفي للسلة</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
