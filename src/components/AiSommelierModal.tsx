import React, { useState } from 'react';
import { Sparkles, X, Bot, Utensils, CheckCircle, RefreshCw, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AiSommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiSommelierModal: React.FC<AiSommelierModalProps> = ({ isOpen, onClose }) => {
  const [occasion, setOccasion] = useState('عشاء فاخر لشخصين');
  const [userPreference, setUserPreference] = useState('');
  const [dietary, setDietary] = useState('لا توجد حساسيات خاصة');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConsultAi = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const res = await fetch('/api/ai-sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occasion, userPreference, dietary })
      });

      const data = await res.json();
      if (res.ok && data.recommendation) {
        setRecommendation(data.recommendation);
      } else {
        setError(data.error || 'حدث خطأ أثناء التواصل مع مساعد الفيروز الذكي');
      }
    } catch (err) {
      console.error(err);
      setError('تعذر الاتصال بالخادم. يرجى التأكد من تشغيل الخدمة.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-900 border border-amber-500/30 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gold-bg-gradient flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>مساعد الفيروز الملكي</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-normal">Gemini AI</span>
                </h3>
                <p className="text-xs text-slate-400">دع الذكاء الاصطناعي يختار لك تجربة طهي مصرية ملائمة لذوقك</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-right">
            {!recommendation ? (
              <form onSubmit={handleConsultAi} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">نوع المناسبة والجو المطلوب</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-full py-3 px-5 text-white focus:outline-none focus:border-amber-500 text-sm"
                  >
                    <option value="عشاء فاخر لشخصين">عشاء فاخر لشخصين (رومانسي)</option>
                    <option value="عشاء عمل واستضافة كبار الضيوف">عشاء عمل واستضافة كبار الضيوف</option>
                    <option value="تجمع عائلي واحتفال">تجمع عائلي واحتفال ملكي</option>
                    <option value="تجربة المطبخ المصري لأول مرة">تجربة المطبخ المصري لأول مرة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">ما الذي تفضله في الطعام؟ (مثال: محب للمشويات، طواجن أصلية، أكل خفيف)</label>
                  <textarea
                    rows={3}
                    value={userPreference}
                    onChange={(e) => setUserPreference(e.target.value)}
                    placeholder="مثال: أحب الأطباق الغنية بالبهارات الشرقية والمشويات الطرية مع مشروب منعش وقليل من السكريات..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">المتطلبات الغذائية أو الحساسية</label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    placeholder="مثال: خالي من الجلوتين / لا أحب الثوم الكثيف / خالي من المكسرات..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-full py-3 px-5 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                {error && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full gold-bg-gradient text-slate-950 font-bold text-base shadow-xl shadow-amber-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>جاري صياغة التوصية الملكية...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>اطلب اقتراح الشيف الذكي</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                  <div className="flex items-center gap-2 font-bold text-amber-400 mb-2">
                    <Bot className="w-5 h-5" />
                    <span>توصية شيف الفيروز الملكي:</span>
                  </div>
                  <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-line amiri-font text-lg">
                    {recommendation}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setRecommendation(null)}
                    className="flex-1 py-3 px-5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>طلب توصية أخرى</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-5 rounded-full gold-bg-gradient text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>اعتماد هذه الوجبة للحجز</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
