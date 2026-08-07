import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle, Sparkles, Phone, User, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { SafeImage } from './SafeImage';

export const ReservationSection: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState(RESTAURANT_INFO.areas[0].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-08-10');
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('عشاء خاص');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !time) {
      setError('يرجى ملء جميع الحقول المطلوبة (الاسم، الهاتف، التاريخ، الوقت)');
      return;
    }

    setLoading(true);
    setError(null);

    const chosenAreaObj = RESTAURANT_INFO.areas.find((a) => a.id === selectedArea);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          date,
          time,
          guests,
          area: chosenAreaObj?.name || 'القاعة الملكية الرئيسية',
          occasion,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ أثناء تأكيد الحجز');
      }

      setConfirmedReservation(data.reservation);
    } catch (err: any) {
      setError(err.message || 'تعذر إتمام الحجز. يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full royal-glass border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>نظام الحجز الملكي المباشر</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold amiri-font gold-gradient-text mb-4">
            احجز طاولتك وشرفتك الخاصة على النيل
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            اختر الموقع المفضل لك في قصر الفيروز لتجربة طعام استثنائية مع أروع إطلالات القاهرة
          </p>
        </div>

        {/* Confirmation Modal */}
        {confirmedReservation ? (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl royal-glass border border-emerald-500/50 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-mono font-bold">
                كود الحجز: {confirmedReservation.id}
              </span>
              <h3 className="text-2xl font-bold amiri-font gold-gradient-text mt-3">
                تم تأكيد حجزك الملكي بنجاح، {confirmedReservation.name}!
              </h3>
              <p className="text-slate-300 text-xs mt-2">
                تم إرسال تفاصيل الحجز وتأكيده على نظام قصر الفيروز بالزمالك.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-right space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">المكان المختار:</span>
                <span className="font-bold text-amber-300">{confirmedReservation.area}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">التاريخ والوقت:</span>
                <span className="font-bold text-slate-100">{confirmedReservation.date} في تمام الساعة {confirmedReservation.time}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">عدد الأفراد والمناسبة:</span>
                <span className="font-bold text-slate-100">{confirmedReservation.guests} أفراد ({confirmedReservation.occasion})</span>
              </div>
              {confirmedReservation.notes && (
                <div className="flex justify-between">
                  <span className="text-slate-400">ملاحظاتك:</span>
                  <span className="text-slate-300 italic">{confirmedReservation.notes}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setConfirmedReservation(null)}
              className="px-8 py-3 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs"
            >
              إجراء حجز آخر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Table Area Selection Cards */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 mb-2">1. اختر قاعة أو شرفة الجلوس المفضلة:</h3>

              {RESTAURANT_INFO.areas.map((area) => {
                const isSelected = selectedArea === area.id;
                return (
                  <div
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 ${
                      isSelected
                        ? 'royal-glass border-2 border-amber-500 shadow-xl shadow-amber-500/15'
                        : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
                      <SafeImage src={area.image} alt={area.name} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-amber-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-slate-100">{area.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-semibold">
                          {area.capacity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-snug line-clamp-2 mb-2">
                        {area.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {area.features.map((feat, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-300">
                            • {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-7 rounded-3xl royal-glass border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
              <h3 className="text-sm font-bold text-amber-400 mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                2. إدخال معلومات صاحب الحجز والتوقيت:
              </h3>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      الاسم بالكامل *
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="أدخل اسمك الكريم..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-100 text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      رقم الهاتف / الواتساب *
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        required
                        placeholder="0100 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-100 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      التاريخ *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-100 text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      الوقت *
                    </label>
                    <div className="relative">
                      <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-100 text-xs outline-none"
                      >
                        <option value="13:00">1:00 ظهراً</option>
                        <option value="15:00">3:00 عصراً</option>
                        <option value="18:00">6:00 مساءً</option>
                        <option value="20:00">8:00 مساءً (ذروة النيل)</option>
                        <option value="22:00">10:00 مساءً</option>
                        <option value="00:00">12:00 منتصف الليل</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      عدد الحضور *
                    </label>
                    <div className="relative">
                      <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-100 text-xs outline-none"
                      >
                        <option value={2}>شخصين (طاولة ثنائية)</option>
                        <option value={4}>4 أشخاص</option>
                        <option value={6}>6 أشخاص</option>
                        <option value={8}>8 أشخاص</option>
                        <option value={12}>مجموعة كبيرة (12+ فرد)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      المناسبة:
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-100 text-xs outline-none"
                    >
                      <option value="عشاء خاص">عشاء خاص</option>
                      <option value="ذكرى زواج">ذكرى زواج</option>
                      <option value="عيد ميلاد">عيد ميلاد</option>
                      <option value="عزومة عائلية">عزومة عائلية</option>
                      <option value="اجتماع عمل">اجتماع عمل</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      طلب خاص أو إضاءة ورد:
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="طاولة على السور مباشرة، ورد أحمر..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-100 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full gold-bg-gradient text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>{loading ? 'جاري تأكيد الحجز الملكي...' : 'تأكيد وحجز الطاولة الآن'}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
