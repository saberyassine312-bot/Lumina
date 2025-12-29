
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-2xl border border-slate-100 relative overflow-hidden">
      <div className="relative h-64 mb-6 rounded-2xl overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-pink-600">
          {product.category}
        </div>
      </div>
      
      <div className="px-2 pb-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
          <span className="text-pink-600 font-bold text-lg">${product.price}</span>
        </div>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center mb-6">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fas fa-star text-xs ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`}></i>
            ))}
          </div>
          <span className="text-xs text-slate-400 mr-2">({product.rating})</span>
        </div>
        <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2 space-x-reverse">
          <i className="fas fa-shopping-bag"></i>
          <span>أضيفي للسلة</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
