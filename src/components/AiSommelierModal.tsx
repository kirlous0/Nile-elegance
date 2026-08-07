import React, { useState } from 'react';
import { X, Sparkles, Send, RefreshCw, ChefHat, Heart, Utensils } from 'lucide-react';

interface AiSommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiSommelierModal: React.FC<AiSommelierModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [occasion, setOccasion] = useState('عشاء فاخر لشخصين');
  const [userPreference, setUserPreference] = useState('مشويات وطواجن معتقة بالسمن البلدي');
  const [dietary, setDietary] = useState('لا يوجد حساسية');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const res = await fetch('/api/ai-sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occasion, userPreference, dietary }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ أثناء الاتصال بمساعد الفيروز');
      }

      setRecommendation(data.recommendation);
    } catch (err: any) {
      setError(err.message || 'تعذر الاتصال بالمساعد الذكي حالياً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl royal-glass border border-amber-500/40 shadow-2xl p-6 sm:p-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl gold-bg-gradient flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
            <ChefHat className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold amiri-font gold-gradient-text">
              مستشار قصر الفيروز الملكي (AI Sommelier)
            </h3>
            <p className="text-xs text-slate-300">
              صمم وجبتك المثالية بتوجيهات ذكية معتمدة على الذكاء الاصطناعي لتجربة ضيافة لا تُنسى
            </p>
          </div>
        </div>

        {/* Input Controls */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-1.5 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5" />
              المناسبة / طبيعة اللقاء:
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-200 text-xs outline-none"
            >
              <option value="عشاء رومانسى فاخر لشخصين على النيل">عشاء رومانسي فاخر لشخصين على النيل</option>
              <option value="عزومة عائلية كبيرة بالصالون الملكي">عزومة عائلية كبيرة بالصالون الملكي</option>
              <option value="غداء عمل رسمى لرجال الأعمال">غداء عمل رسمي لكبار الشخصيات</option>
              <option value="احتفال بذكرى زواج أو عيد ميلاد">احتفال بذكرى خاصة أو عيد ميلاد</option>
              <option value="تجربة المطبخ المصري لأول مرة لضيوف أجانب">تجربة المطبخ المصري لأول مرة لضيوف أجانب</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-1.5 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              تفضيلاتك المفضل التركيز عليها:
            </label>
            <input
              type="text"
              value={userPreference}
              onChange={(e) => setUserPreference(e.target.value)}
              placeholder="مثال: نحب الطواجن المحشوة بالفريك والمشويات القوية..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-200 text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-1.5">
              متطلبات أو تفضيلات خاصة (اختياري):
            </label>
            <input
              type="text"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              placeholder="مثال: يفضل أكل قليل الدسم، بدون شطة حارة، حلال..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-200 text-xs outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full gold-bg-gradient text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>جاري إعداد القائمة الملكية بواسطة الذكاء الاصطناعي...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>اقترح لي قوام وجبة متكاملة الآن</span>
              </>
            )}
          </button>
        </div>

        {/* Errors if any */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs mb-6">
            {error}
          </div>
        )}

        {/* AI Output Result */}
        {recommendation && (
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-slate-200 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
              <span className="font-bold amiri-font text-amber-400 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                توصية شيف قصر الفيروز
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Gemini AI Model</span>
            </div>

            <div className="text-xs leading-relaxed whitespace-pre-line text-slate-200 font-sans space-y-2">
              {recommendation}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs"
              >
                اعتماد التوصية وتصفح القائمة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
