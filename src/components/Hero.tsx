import React from 'react';
import { Sparkles, Calendar, UtensilsCrossed, Award, MapPin, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenAiSommelier: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReservation,
  onOpenAiSommelier,
}) => {
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Image Container with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={RESTAURANT_INFO.heroImage}
          alt="مطعم قصر الفيروز بالزمالك"
          className="w-full h-full object-cover scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/50 to-slate-950" />
      </div>

      {/* Decorative Golden Ornaments Background */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Rating & Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full royal-glass border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-amber-500/10">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </div>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            أبو الفدا، الزمالك • إطلالة على النيل
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold amiri-font leading-tight text-slate-100 mb-6">
          أصالة المطبخ المصري الملكي <br />
          <span className="gold-gradient-text">بروح معاصرة وفاخرة</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans mb-10">
          في قصر الفيروز، نعيد كتابة تاريخ الضيافة المصرية الأصيلة بطواجن الفخار المعتقة، ومشويات الفحم الصافي، ومقادير السمن البلدي الفلاحي النقي على ضفاف نيل الزمالك.
        </p>

        {/* Action Buttons Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          {/* Main CTA: Reserve */}
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 rounded-full gold-bg-gradient text-slate-950 font-bold text-base shadow-2xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            <span>احجز طاولتك بالفيو الملكي</span>
          </button>

          {/* Secondary CTA: AI Sommelier */}
          <button
            onClick={onOpenAiSommelier}
            className="w-full sm:w-auto px-7 py-4 rounded-full royal-glass border border-amber-500/40 text-amber-300 hover:text-amber-200 font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 hover:border-amber-400 shadow-xl"
          >
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <span>استشر الشيف الذكي (AI)</span>
          </button>

          {/* View Menu */}
          <button
            onClick={scrollToMenu}
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-slate-300 font-medium text-base transition-all duration-200 flex items-center justify-center gap-2"
          >
            <UtensilsCrossed className="w-5 h-5 text-amber-400" />
            <span>تصفح قائمة الطعام</span>
          </button>
        </div>

        {/* Quick Highlights / Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80">
          <div className="p-3 rounded-2xl royal-glass flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg">
              ✨
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">سمن بلدي 100%</h4>
              <p className="text-xs text-slate-400">مكونات طازجة وفاخرة</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl royal-glass flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg">
              🌅
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">شرفة النيل</h4>
              <p className="text-xs text-slate-400">إطلالة ساحرة بالزمالك</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl royal-glass flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg">
              🏺
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">طواجن فخار</h4>
              <p className="text-xs text-slate-400">طعام معتق كالأزمنة</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl royal-glass flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">خدمة ملكية</h4>
              <p className="text-xs text-slate-400">ضيافة مصرية رفيعة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
