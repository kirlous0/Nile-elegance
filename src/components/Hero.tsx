import React from 'react';
import { Calendar, Utensils, MapPin, Sparkles, Award, Star, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenAiSommelier: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenAiSommelier }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Royal Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/egyptian_restaurant_hero_1786055022971.jpg"
          alt="مطعم قصر الفيروز بالزمالك"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs sm:text-sm mb-6 shadow-xl backdrop-blur-md"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>أفخم مطعم مصري على كورنيش الزمالك 👑</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight amiri-font tracking-tight max-w-5xl mx-auto"
        >
          أصالة المطبخ المصري الفاخر <br />
          <span className="gold-gradient-text">بروح ملكية على ضفاف النيل</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light"
        >
          نأخذكم في رحلة طهي غنية بنكهات الزمان؛ من المشويات الفاخرة المتبلة بأعشاب بلادنا والطواجن الفخارية المعتقة، إلى الفطير المشلتت الذهبي والحلويات الشرقية المحضرة على أيدي كبار الطهاة.
        </motion.p>

        {/* Action Buttons - Strict Rounded Shape Rule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto"
        >
          <button
            onClick={onOpenReservation}
            className="px-8 py-4 rounded-full gold-bg-gradient text-slate-950 font-black text-base shadow-2xl shadow-amber-500/30 hover:scale-105 hover:brightness-110 transition-all flex items-center gap-2.5"
          >
            <Calendar className="w-5 h-5" />
            <span>احجز طاولتك الملكية</span>
          </button>

          <a
            href="#menu"
            className="px-8 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-white font-extrabold text-base transition-all hover:border-amber-500/60 flex items-center gap-2"
          >
            <Utensils className="w-5 h-5 text-amber-400" />
            <span>قائمة الطعام التفاعلية</span>
          </a>

          <button
            onClick={onOpenAiSommelier}
            className="px-6 py-4 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-sm transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>اقتراح وجبة بالذكاء الاصطناعي</span>
          </button>
        </motion.div>

        {/* Floating Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-amber-500/20 pt-8"
        >
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-900 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center justify-center gap-1">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs text-slate-400">تقييم أكثر من 2,400 ضيف</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-900 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
            <span className="text-xs text-slate-400">مكونات ومواشي بلدي طازجة</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-900 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">شرفة النيل</div>
            <span className="text-xs text-slate-400">جلسات خارجية بإطلالة ساحرة</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-900 backdrop-blur-md">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">صف مجاني</div>
            <span className="text-xs text-slate-400">Valet خاص للسيارات بالزمالك</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
