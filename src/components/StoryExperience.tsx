import React from 'react';
import { Award, Flame, Heart, Crown, ShieldCheck } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const StoryExperience: React.FC = () => {
  return (
    <section id="story" className="py-24 relative bg-slate-900/60 overflow-hidden">
      {/* Glow Ornaments */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase with SafeImages */}
          <div className="relative">
            {/* Main Primary Image */}
            <div className="relative h-[420px] sm:h-[480px] w-full rounded-3xl overflow-hidden royal-glass border border-amber-500/30 shadow-2xl">
              <SafeImage
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
                alt="القاعة الملكية بمطعم قصر الفيروز"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-6 right-6 left-6 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-amber-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gold-bg-gradient flex items-center justify-center text-slate-950">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">فخامة الضيافة المصرية الأصيلة</h4>
                    <p className="text-xs text-amber-300/80">تصميمات أندلسية وفاطمية معاصرة بالزمالك</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Image */}
            <div className="hidden sm:block absolute -bottom-8 -left-6 w-60 h-44 rounded-2xl overflow-hidden royal-glass border-2 border-amber-500/40 shadow-2xl">
              <SafeImage
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="شرفة النيل بالزمالك"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Story Narrative */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full royal-glass border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>سر الطعم الإمبراطوري</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold amiri-font gold-gradient-text leading-tight mb-6">
              قصة قصر الفيروز <br />
              <span className="text-slate-100">سر السمن البلدي وطواجن الفخار</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              تأسس قصر الفيروز لتجسيد أرقى مستويات الفخامة المصرية. نستخدم الفخار الحراري المصنوع يدوياً بقنا وأسوان، ونختار أجود قطع اللحوم البلدي المرباة طبيعياً بالريف المصري، لتخرج كل وجبة بطعم عريق يداعب ذاكرة التذوق.
            </p>

            {/* Pillars */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">فحم طبيعي وطواجن معتقة</h4>
                  <p className="text-xs text-slate-400">طريقة تسوية بطيئة تحفظ القيمة الغذائية والنكهة الفريدة لكل طبق.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">مكونات عضوية 100%</h4>
                  <p className="text-xs text-slate-400">سمن بلدي فلاحي نقي بدون إضافات مصنعة، وخضروات طازجة يومياً.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">إشراف كبار الشيفات</h4>
                  <p className="text-xs text-slate-400">فريق طهاة بخبرة تتجاوز 25 عاماً في قصور الضيافة العربية.</p>
                </div>
              </div>
            </div>

            {/* Quote Badge */}
            <div className="p-4 rounded-2xl royal-glass border border-amber-500/30 flex items-center gap-3">
              <Heart className="w-6 h-6 text-amber-400 shrink-0" />
              <p className="text-xs text-slate-300 italic font-serif">
                "نحن لا نقدم وجبة طعام فحسب، بل نصنع ذكرى ضيافة ملكية تدوم طويلاً"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
