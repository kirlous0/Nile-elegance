import React, { useState } from 'react';
import { Star, MessageSquare, Check, Sparkles, UserCheck } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  dishTried: string;
  verified: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'الأستاذ د. هشام سلامة',
    rating: 5,
    date: 'منذ يومين',
    comment: 'طاجن البط بالملوخية تجربة ملكية بحق! طشة الملوخية أمام الطاولة بالسمن البلدي تفتح الشهية، والخدمة في شرفة النيل كانت مبهرة.',
    dishTried: 'طاجن موزة البط البلدي بالملوخية',
    verified: true
  },
  {
    id: 'r2',
    author: 'المهندسة مريم الجندي',
    rating: 5,
    date: 'منذ 5 أيام',
    comment: 'أفضل كباب وكفتة ضأني أكلتها في القاهرة! اللحم طري جداً ويدوب في الفم، والجو العام للقصر مع عزف القانون هادئ وراقي جداً.',
    dishTried: 'مشويات الفيروز الملكية المشكلة',
    verified: true
  },
  {
    id: 'r3',
    author: 'السيد/ مارك جونسون (زائر من إنجلترا)',
    rating: 5,
    date: 'منذ أسبوع',
    comment: 'The Truffle Koshary and Stuffed Pigeon were incredible! Authentic Egyptian flavors served with world-class hospitality.',
    dishTried: 'كشري الفيروز بالترافل وحمام محشي',
    verified: true
  }
];

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [dishTried, setDishTried] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: Review = {
      id: `r-${Date.now()}`,
      author,
      rating,
      date: 'الآن',
      comment,
      dishTried: dishTried || 'وجبة ملكية متكاملة',
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setAuthor('');
    setComment('');
    setDishTried('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 relative bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full royal-glass border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>آراء وتقييمات ضيوف القصر</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold amiri-font gold-gradient-text mb-4">
            ماذا يقول كبار ضيوفنا عن التجربة؟
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            نفخر بتقديم ضيافة تترك انطباعاً دافئاً وتجربة طعام استثنائية لكافة الضيوف والزوار
          </p>
        </div>

        {/* Reviews Grid & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Reviews Cards */}
          <div className="lg:col-span-7 space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl royal-glass border border-slate-800/80 hover:border-amber-500/30 transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full gold-bg-gradient text-slate-950 font-bold flex items-center justify-center text-xs">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                        {rev.author}
                        {rev.verified && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-0.5">
                            <UserCheck className="w-3 h-3" />
                            ضيف موثق
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-slate-400">{rev.date}</p>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-sans">{rev.comment}</p>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>الطبق المفضل: <strong className="text-amber-300">{rev.dishTried}</strong></span>
                  <span className="text-emerald-400 font-semibold">★ تجربة ممتازة</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div className="lg:col-span-5 p-6 rounded-3xl royal-glass border border-amber-500/30 shadow-2xl">
            <h3 className="text-base font-bold amiri-font gold-gradient-text mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              شاركنا انطباعك وتقييمك لتجربتك
            </h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-center text-emerald-200 text-xs space-y-2">
                <Check className="w-8 h-8 mx-auto text-emerald-400" />
                <p className="font-bold text-sm">شكراً لك! تم إضافة تقييمك بنجاح.</p>
                <p className="text-slate-300">يسعدنا دائماً استقبال آرائكم واقتراحاتكم.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">اسم الضيف الكريم</label>
                  <input
                    type="text"
                    required
                    placeholder="أدخل اسمك..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-200 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">الطبق الذي تناولته</label>
                  <input
                    type="text"
                    placeholder="مثال: طاجن البط بالملوخية، فتة الموزة الضأني..."
                    value={dishTried}
                    onChange={(e) => setDishTried(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-200 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">التقييم من 5 نجوم</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">تعليقك وانطباعك</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="اكتب انطباعك عن جودة الطعام، الضيافة، والجو العام..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-200 text-xs outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>إرسال التقييم</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
