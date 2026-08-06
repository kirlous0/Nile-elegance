import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';

export const StoryExperience: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-slate-950 relative overflow-hidden border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Images Grid Showcase */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl h-64 sm:h-80"
            >
              <img
                src="/src/assets/images/royal_duck_molokhia_1786055047783.jpg"
                alt="طهي مصري ملكي"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl h-64 sm:h-80 mt-8"
            >
              <img
                src="/src/assets/images/umm_ali_dessert_1786055060752.jpg"
                alt="حلويات شرقية بالذهب"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>قصة قصر الفيروز</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight amiri-font">
              عظمة الضيافة المصرية <br />
              <span className="gold-gradient-text">في قلب الزمالك الملكية</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              تأسس قصر الفيروز ليعيد تقديم إرث الطهي المصري الملكي العريق بلمسة بصرية وطهوية معاصرة. نحرص على جلب أجود الذبائح البلدي والمحاصيل الطازجة من مزارعنا الخاصة بالصعيد والريف المصري يومياً.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full gold-bg-gradient flex items-center justify-center text-slate-950 font-bold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">وصفات وراثية معتقة</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">سر التتبيلات في الفخار والفحم البلدي من أجيال الطهاة.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full gold-bg-gradient flex items-center justify-center text-slate-950 font-bold shrink-0">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">طهو بطيء وطازج</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">تُعد الطواجن والبط يومياً طازجة حسب الطلب.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#reservation"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full gold-bg-gradient text-slate-950 font-bold text-sm shadow-xl hover:brightness-110 transition-all"
              >
                <span>احجز تجربتك الطهوية الآن</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
