
import React, { useState, useRef } from 'react';
import { Product } from '../types';

interface DashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ products, setProducts, onClose }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'سيروم',
    price: 0,
    image: '',
    description: '',
    rating: 5,
    discountPercentage: 0,
    salesCount: 0,
    createdAt: new Date().toISOString()
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...editingProduct, ...formData } as Product : p));
    } else {
      const newProduct = { ...formData, id: Date.now(), createdAt: new Date().toISOString() } as Product;
      setProducts(prev => [...prev, newProduct]);
    }
    resetForm();
  };

  const resetForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
    setFormData({ name: '', category: 'سيروم', price: 0, image: '', description: '', rating: 5, discountPercentage: 0, salesCount: 0 });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنتِ متأكدة من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl overflow-y-auto pb-20">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 text-white">
          <div className="text-right">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">لوحة تحكم <span className="text-pink-500">لومينا</span></h1>
            <p className="text-slate-400 mt-2 text-sm md:text-base">إدارة المبيعات والمخزون</p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <button 
              onClick={() => setIsFormOpen(true)}
              className="flex-1 md:flex-none bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-900/20"
            >
              <i className="fas fa-plus text-sm"></i> <span>إضافة منتج</span>
            </button>
            <button 
              onClick={onClose}
              className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-bold transition-all border border-white/10"
            >
              إغلاق
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-sm">
                  <th className="px-8 py-5 font-bold">معلومات المنتج</th>
                  <th className="px-8 py-5 font-bold">الفئة</th>
                  <th className="px-8 py-5 font-bold">المبيعات</th>
                  <th className="px-8 py-5 font-bold">السعر</th>
                  <th className="px-8 py-5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map(product => (
                  <tr key={product.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={product.image} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/5" alt="" />
                        <div>
                          <p className="font-bold text-white text-lg">{product.name}</p>
                          <p className="text-xs text-slate-500">أضيف في: {new Date(product.createdAt).toLocaleDateString('ar-EG')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="bg-pink-500/10 text-pink-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-pink-500/20">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-white">{product.salesCount} قطعة</td>
                    <td className="px-8 py-5 font-bold text-white text-xl">{product.price} ر.س</td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => handleEdit(product)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete(product.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form */}
        {isFormOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl">
              <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                <h3 className="text-2xl font-bold">{editingProduct ? 'تحديث المنتج' : 'إضافة منتج'}</h3>
                <button onClick={resetForm} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"><i className="fas fa-times"></i></button>
              </div>
              <form onSubmit={handleSave} className="p-10 space-y-6 text-right">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">اسم المنتج</label>
                    <input required className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-pink-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">عدد المبيعات الحالي</label>
                    <input type="number" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-pink-500 text-right" value={formData.salesCount} onChange={e => setFormData({...formData, salesCount: Number(e.target.value)})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">السعر</label>
                    <input type="number" required className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-pink-500 text-right" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                  </div>
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">الفئة</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none text-right appearance-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option>سيروم</option><option>مرطب</option><option>منظف</option><option>تونر</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">رابط الصورة</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
                <button type="submit" className="w-full py-4 bg-pink-600 text-white rounded-2xl font-bold hover:bg-pink-700 transition-all">حفظ البيانات</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
