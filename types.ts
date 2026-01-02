
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  discountPercentage?: number;
  salesCount: number; // عدد المبيعات لتحديد الأكثر مبيعاً
  createdAt: string;  // تاريخ الإضافة لتحديد المنتجات الجديدة
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
