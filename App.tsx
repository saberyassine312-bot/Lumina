
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import GeminiConsultant from './components/GeminiConsultant';
import { Product } from './types';

const App: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "سيروم لومينا جلو",
      category: "سيروم",
      price: 45,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
      description: "سيروم فيتامين C المركز لتفتيح البشرة وإزالة البقع الداكنة بشكل فعال.",
      rating: 4.9
    },
    {
      id: 2,
      name: "كريم الترطيب العميق",
      category: "مرطب",
      price: 32,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
      description: "ترطيب يدوم 24 ساعة مع حمض الهيالورونيك والسيراميد لإصلاح حاجز البشرة.",
      rating: 4.8
    },
    {
      id: 3,
      name: "منظف الرغوة اللطيف",
      category: "منظف",
      price: 24,
      image: "https://images.unsplash.com/photo-1556229162-5c63ed9c4ffb?q=80&w=800&auto=format&fit=crop",
      description: "ينظف المسام بعمق دون تجفيف البشرة، مثالي للبشرة الحساسة.",
      rating: 4.7
    },
    {
      id: 4,
      name: "تونر التوازن النقي",
      category: "تونر",
      price: 28,
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop",
      description: "يعيد توازن درجة الحموضة ويقلص حجم المسام بفعالية مذهلة.",
      rating: 4.6
    }
  ];

  const relatedProducts: Product[] = [
    {
      id: 5,
      name: "واقي شمس ألترا شيلد",
      category: "حماية",
      price: 38,
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop",
      description: "حماية كاملة من الأشعة فوق البنفسجية مع ملمس غير دهني يدوم طويلاً.",
      rating: 4.8
    },
    {
      id: 6,
      name: "كريم العين المجدد",
      category: "عناية خاصة",
      price: 42,
      image: "https://images.unsplash.com/photo-1594411428577-96e05342a176?q=80&w=800&auto=format&fit=crop",
      description: "تركيبة غنية بالكافيين لتقليل الهالات السوداء والانتفاخات تحت العين.",
      rating: 4.9
    },
    {
      id: 7,
      name: "زيت الوجه الليلي",
      category: "زيوت",
      price: 55,
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop",
      description: "مزيج من الزيوت العضوية لترميم البشرة بعمق أثناء النوم.",
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold text-pink-600 mb-2">98%</p>
            <p className="text-slate-500 font-medium">رضا العملاء</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-pink-600 mb-2">100%</p>
            <p className="text-slate-500 font-medium">مكونات نباتية</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-pink-600 mb-2">15k+</p>
            <p className="text-slate-500 font-medium">طلب شهرياً</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-pink-600 mb-2">24/7</p>
            <p className="text-slate-500 font-medium">دعم خبير</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="text-right">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">الأكثر مبيعاً</h2>
              <p className="text-slate-500 max-w-xl">
                منتجاتنا المختارة بعناية فائقة لتناسب جميع أنواع البشرة واحتياجاتها المختلفة.
              </p>
            </div>
            <div className="flex space-x-4 space-x-reverse overflow-x-auto pb-2 scrollbar-hide">
              <button className="whitespace-nowrap px-6 py-2 bg-pink-600 text-white rounded-full font-bold shadow-md">الكل</button>
              <button className="whitespace-nowrap px-6 py-2 bg-white text-slate-600 hover:bg-pink-100 rounded-full font-bold border border-slate-200 transition-colors">سيروم</button>
              <button className="whitespace-nowrap px-6 py-2 bg-white text-slate-600 hover:bg-pink-100 rounded-full font-bold border border-slate-200 transition-colors">مرطبات</button>
              <button className="whitespace-nowrap px-6 py-2 bg-white text-slate-600 hover:bg-pink-100 rounded-full font-bold border border-slate-200 transition-colors">منظفات</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">قد يعجبكِ أيضاً</h2>
            <div className="w-20 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            <div className="hidden lg:flex items-center justify-center p-8 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
              <div className="text-center text-slate-300">
                <i className="fas fa-plus-circle text-4xl mb-2 opacity-20"></i>
                <p className="font-medium">المزيد قريباً</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Consultation Section */}
      <GeminiConsultant />

      {/* Values Section */}
      <section id="about" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-600/10 skew-x-12 transform origin-top"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-right order-2 md:order-1">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">لماذا تختارين لومينا؟</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-500 shrink-0 mt-1">
                    <i className="fas fa-leaf text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">استدامة ونقاء</h4>
                    <p className="text-slate-400">نلتزم باستخدام مكونات صديقة للبيئة وغير مجربة على الحيوانات تماماً.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-500 shrink-0 mt-1">
                    <i className="fas fa-flask text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">أبحاث علمية</h4>
                    <p className="text-slate-400">يتم اختبار كل منتج في مختبراتنا لضمان الفعالية والأمان لجميع أنواع البشرة.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-500 shrink-0 mt-1">
                    <i className="fas fa-heart text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">عناية مخصصة</h4>
                    <p className="text-slate-400">نؤمن أن لكل بشرة قصتها، لذلك نقدم حلولاً تناسب تفرد جمالكِ.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1000&auto=format&fit=crop" 
                className="rounded-3xl shadow-2xl border-4 border-white/10"
                alt="Brand philosophy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-24 bg-pink-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white rounded-[3rem] p-12 shadow-xl border border-pink-100">
          <div className="inline-block p-4 bg-pink-100 rounded-full mb-6 text-pink-600">
            <i className="fas fa-envelope-open-text text-3xl"></i>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">انضمي لنادي لومينا</h2>
          <p className="text-slate-500 mb-10 max-w-2xl mx-auto text-lg">
            اشتركي في نشرتنا البريدية للحصول على نصائح حصرية للعناية بالبشرة، وعروض خاصة، وخصم 15% على أول طلب لكِ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="بريدكِ الإلكتروني" 
              className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-pink-500 outline-none text-right"
            />
            <button className="bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-pink-700 transition-all shadow-lg hover:shadow-pink-200">
              اشتركي الآن
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-right mb-16">
            <div className="col-span-1 md:col-span-1">
              <span className="text-3xl font-extrabold gradient-text tracking-tighter mb-6 inline-block">LUMINA</span>
              <p className="text-slate-500 leading-relaxed">
                لومينا هي رفيقكِ الأمثل لرحلة جمال تبدأ من الداخل. نحن نهتم بصحة بشرتكِ كما تهتمين أنتِ تماماً.
              </p>
              <div className="flex justify-end space-x-4 space-x-reverse mt-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-200 transition-all">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-200 transition-all">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-200 transition-all">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-6 underline decoration-pink-300 underline-offset-8">روابط سريعة</h4>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><a href="#about" className="hover:text-pink-600 transition-colors">عن لومينا</a></li>
                <li><a href="#products" className="hover:text-pink-600 transition-colors">جميع المنتجات</a></li>
                <li><a href="#newsletter" className="hover:text-pink-600 transition-colors">المدونة</a></li>
                <li><a href="#contact" className="hover:text-pink-600 transition-colors">اتصلي بنا</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-6 underline decoration-pink-300 underline-offset-8">الدعم</h4>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><a href="#hero" className="hover:text-pink-600 transition-colors">الشحن والتوصيل</a></li>
                <li><a href="#hero" className="hover:text-pink-600 transition-colors">سياسة الاسترجاع</a></li>
                <li><a href="#ai-consultant" className="hover:text-pink-600 transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#hero" className="hover:text-pink-600 transition-colors">الشروط والأحكام</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-6 underline decoration-pink-300 underline-offset-8">تواصل معنا</h4>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li className="flex items-center justify-end space-x-3 space-x-reverse">
                  <a href="mailto:support@lumina.beauty" className="hover:text-pink-600 transition-colors">support@lumina.beauty</a>
                  <i className="fas fa-envelope text-pink-600"></i>
                </li>
                <li className="flex items-center justify-end space-x-3 space-x-reverse">
                  <a href="tel:+966500000000" className="hover:text-pink-600 transition-colors" dir="ltr">+966 50 000 0000</a>
                  <i className="fas fa-phone text-pink-600"></i>
                </li>
                <li className="flex items-center justify-end space-x-3 space-x-reverse">
                  <a href="https://www.google.com/maps/search/?api=1&query=الرياض+المملكة+العربية+السعودية" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">الرياض، المملكة العربية السعودية</a>
                  <i className="fas fa-map-marker-alt text-pink-600"></i>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-200 text-center">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} لومينا للعناية بالبشرة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
