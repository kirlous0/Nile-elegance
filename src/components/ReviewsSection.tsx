import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  dishRecommended: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'م. ياسين السعيد',
    role: 'ناقد طعام وزائر دائم',
    rating: 5,
    comment: 'أفضل تجربة بط وملوخية بالطشة في مصر كلها! الإطلالة على النيل ليلاً مع أنغام العود وخدمة الـ Valet جعلت الأمسية لا تُنسى.',
    date: 'منذ 3 أيام',
    dishRecommended: 'بط بلدي محمر وطاجن ملوخية'
  },
  {
    id: 'r2',
    name: 'د. سارة الألفي',
    role: 'استشارية طبية',
    rating: 5,
    comment: 'الفطير المشلتت مع العسل والجبن القديم يذكرني ببيت جدي بالصعيد لكن بتقديم أنيق وراقي جداً. شرفة النيل كانت رائعة للغاية.',
    date: 'منذ أسبوع',
    dishRecommended: 'فطير مشلتت فاخر'
  },
  {
    id: 'r3',
    name: 'الأستاذ هشام عبد الفتاح',
    role: 'رجل أعمال',
    rating: 5,
    comment: 'استضفت وفد دبي في جناح السلطان الخاص، أثنوا جميعاً على المشاوي المشكلة وعصير الكركديه الأسواني المثلج. خدمة فاخرة بكل المقاييس.',
    date: 'منذ أسبوعين',
    dishRecommended: 'مشاوي قصر الفيروز المشكلة'
  }
];

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newDish, setNewDish] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName || !newComment) return;

    const newRev: Review = {
      id: `r-${Date.now()}`,
      name: newReviewerName,
      role: 'ضيف مقيم بالقاهرة',
      rating: newRating,
      comment: newComment,
      date: 'الآن',
      dishRecommended: newDish || 'أطباق متنوعة'
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddForm(false);
      setNewReviewerName('');
      setNewComment('');
      setNewDish('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-24 bg-slate-950 relative overflow-hidden border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-3">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>آراء وتقييمات زوارنا الكرام</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 amiri-font">
            ماذا يقول ضيوف <span className="gold-gradient-text">قصر الفيروز</span>؟
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            نفخر بتقديم تجربة استثنائية حازت على رضا أكثر من 98% من كبار ضيوفنا وعائلاتهم.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between text-right relative"
            >
              <Quote className="absolute top-4 left-4 w-8 h-8 text-amber-500/10 pointer-events-none" />

              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-200 text-sm leading-relaxed mb-4 font-light">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm">{rev.name}</h4>
                  <span className="text-slate-400 text-[11px]">{rev.role}</span>
                </div>

                <span className="text-[10px] text-amber-400 font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {rev.dishRecommended}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Review Button */}
        <div className="text-center">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-8 py-3.5 rounded-full gold-bg-gradient text-slate-950 font-bold text-sm shadow-xl hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>مشاركتنا تجربتك وتقييمك في القصر</span>
            </button>
          ) : (
            <form onSubmit={handleAddReview} className="max-w-lg mx-auto bg-slate-900 border border-amber-500/30 rounded-3xl p-6 text-right space-y-4">
              <h3 className="font-bold text-white text-base mb-2">أضف تقييمك الخاص:</h3>

              <input
                type="text"
                required
                value={newReviewerName}
                onChange={(e) => setNewReviewerName(e.target.value)}
                placeholder="اسمك الكريـم..."
                className="w-full bg-slate-950 border border-slate-800 rounded-full py-2.5 px-4 text-white text-xs focus:outline-none focus:border-amber-500"
              />

              <input
                type="text"
                value={newDish}
                onChange={(e) => setNewDish(e.target.value)}
                placeholder="الطبق الذي نال إعجابك أكثر..."
                className="w-full bg-slate-950 border border-slate-800 rounded-full py-2.5 px-4 text-white text-xs focus:outline-none focus:border-amber-500"
              />

              <textarea
                required
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="اكتب تفاصيل تجربتك وانطباعك عن الطعام والخدمة..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white text-xs focus:outline-none focus:border-amber-500 resize-none"
              ></textarea>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full gold-bg-gradient text-slate-950 text-xs font-bold"
                >
                  {submitted ? 'تم نشر تقييمك!' : 'نشر التقييم'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
