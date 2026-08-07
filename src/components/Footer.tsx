import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { Phone, MapPin, Mail, Clock, Heart, Crown } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full gold-bg-gradient flex items-center justify-center text-slate-950 font-bold">
                <Crown className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold amiri-font gold-gradient-text">
                {RESTAURANT_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              {RESTAURANT_INFO.tagline}. أسلوب ضيافة ملكي متوارث مع مقادير وطواجن الفخار المعتقة بالزمالك.
            </p>
            <div className="flex items-center gap-3 text-slate-300">
              <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:text-amber-400">فيسبوك</a>
              <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:text-amber-400">إنستغرام</a>
              <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:text-amber-400">تيك توك</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 mb-4 border-b border-slate-800 pb-2">روابط سريعة</h4>
            <ul className="space-y-2.5">
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">قائمة الطعام الملكية</a></li>
              <li><a href="#story" className="hover:text-amber-400 transition-colors">سر طباخي القصر</a></li>
              <li><a href="#reservation" className="hover:text-amber-400 transition-colors">حجز شرفة النيل والقاعات</a></li>
              <li><a href="#location" className="hover:text-amber-400 transition-colors">موقعنا بالزمالك والماب</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 mb-4 border-b border-slate-800 pb-2">التواصل والاستقبال</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESTAURANT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESTAURANT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 mb-4 border-b border-slate-800 pb-2">مواعيد استقبال الضيوف</h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Clock className="w-4 h-4" />
                <span>يومياً من 12:00 ظهراً - 2:00 صباحاً</span>
              </div>
              <p className="text-[11px] text-slate-400">تتاح خدمة الفاليه (Valet Parking) مجاناً لجميع ضيوف طاولات القصر.</p>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} مطعم قصر الفيروز بالزمالك. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            صنع بكل <Heart className="w-3 h-3 text-red-500 fill-red-500" /> في القاهرة، مصر
          </p>
        </div>
      </div>
    </footer>
  );
};
