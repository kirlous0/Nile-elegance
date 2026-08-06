import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { Crown, MapPin, Phone, Mail, Clock, Compass, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-amber-500/20 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-right">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gold-bg-gradient flex items-center justify-center text-slate-950 font-bold shadow-lg">
                <Crown className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white amiri-font">{RESTAURANT_INFO.name}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {RESTAURANT_INFO.tagline}. وجهتك الأولى لأرقى تجارب الضيافة والمأكولات المصرية على ضفاف النيل.
            </p>
            <div className="pt-2 text-xs text-amber-400 font-semibold flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-b border-amber-500/20 pb-2">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">الصفحة الرئيسية</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">قائمة الطعام التفاعلية</a></li>
              <li><a href="#reservation" className="hover:text-amber-400 transition-colors">نظام حجز الطاولات</a></li>
              <li><a href="#location" className="hover:text-amber-400 transition-colors">الخريطة والاتجاهات بالزمالك</a></li>
              <li><a href="#story" className="hover:text-amber-400 transition-colors">عن القصر وتاريخنا</a></li>
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-b border-amber-500/20 pb-2">مواعيد استقبال الضيوف</h4>
            <div className="space-y-2 text-xs">
              {RESTAURANT_INFO.openingHours.map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-slate-900 pb-1.5">
                  <span className="text-amber-400/90 font-bold">{item.days}</span>
                  <span className="text-slate-300">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: VIP Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-b border-amber-500/20 pb-2">النادي الملكي لكبار الضيوف</h4>
            <p className="text-xs text-slate-400">اشترك لتصلك أحدث العروض والفعاليات والأطباق الموسمية قبل الجميع.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني..."
                className="w-full bg-slate-900 border border-slate-800 rounded-full py-2.5 px-4 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
              >
                <span>الاشتراك في النادي</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-slate-300">الشروط والأحكام</a>
            <span>•</span>
            <a href="#hero" className="hover:text-slate-300">سياسة الخصوصية</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
