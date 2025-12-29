
import React, { useState, useRef, useEffect } from 'react';
import { getSkinAdvice } from '../services/geminiService';
import { Message } from '../types';

const GeminiConsultant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'أهلاً بكِ في ركن الاستشارة من لومينا. أنا مستشاركِ الافتراضي المدعوم بالذكاء الاصطناعي. كيف يمكنني مساعدتكِ اليوم في رحلة العناية ببشرتكِ؟' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await getSkinAdvice(input);
    
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <section id="ai-consultant" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">مستشاركِ الذكي للعناية</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            احصلي على نصائح فورية ومخصصة لنوع بشرتكِ باستخدام تقنيات الذكاء الاصطناعي الأكثر تطوراً.
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px]">
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white">
                <i className="fas fa-magic"></i>
              </div>
              <div>
                <p className="font-bold text-sm">Lumina AI Expert</p>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">متصل الآن</span>
                </div>
              </div>
            </div>
            <button className="text-slate-400 hover:text-white transition-colors">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-white text-slate-800 border border-slate-200 rounded-tr-none' 
                    : 'bg-pink-600 text-white rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-pink-100 rounded-2xl px-4 py-2 flex space-x-1 space-x-reverse">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسألي عن روتين البشرة، الحبوب، أو الترطيب..."
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 pr-14 focus:ring-2 focus:ring-pink-500 transition-all outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`absolute right-2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  input.trim() && !isTyping ? 'bg-pink-600 text-white' : 'bg-slate-200 text-slate-400'
                }`}
              >
                <i className="fas fa-paper-plane transform -rotate-45"></i>
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              مدعوم بتقنية Gemini AI - استشارات عامة فقط
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeminiConsultant;
