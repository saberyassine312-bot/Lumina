
import { GoogleGenAI } from "@google/genai";

export const getSkinAdvice = async (userQuery: string) => {
  // التأكد من استخدام التنسيق المطلوب: { apiKey: process.env.API_KEY }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userQuery,
      config: {
        systemInstruction: "أنت خبير عناية بالبشرة محترف لعلامة تجارية تدعى Lumina. هدفك هو تقديم نصائح مفيدة ولطيفة بناءً على مشاكل البشرة التي يطرحها المستخدم. كن مهذباً واستخدم اللغة العربية الفصحى أو بيضاء مفهومة. ركز على المكونات الطبيعية والروتين الصحي. إذا سألك المستخدم عن منتج، اقترح حلولاً عامة موجودة في منتجات Lumina (مثل السيروم، المرطب، أو المنظف).",
        temperature: 0.7,
      },
    });
    
    // استخدام .text مباشرة كما هو مطلوب في القواعد الجديدة
    return response.text || "عذراً، لم أستطع صياغة نصيحة في الوقت الحالي.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، واجهت مشكلة في الاتصال بخبيرنا الافتراضي. يرجى التأكد من إعداد مفتاح واجهة برمجة التطبيقات بشكل صحيح.";
  }
};
