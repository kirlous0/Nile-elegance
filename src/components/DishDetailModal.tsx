import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { X, Star, Flame, Clock, Plus, Minus, Check, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, notes: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity, specialNotes);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-amber-500/30 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

            <button
              onClick={onClose}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white flex items-center justify-center border border-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {item.badge && (
              <span className="absolute top-4 right-4 px-3.5 py-1 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs shadow-lg">
                {item.badge}
              </span>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-right">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h3 className="text-2xl font-bold text-white amiri-font">{item.name}</h3>
                <span className="text-xl font-extrabold text-amber-400">{item.price} ج.م</span>
              </div>
              <p className="text-xs text-slate-400 font-sans tracking-wide uppercase">{item.englishName}</p>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">التقييم</div>
                <div className="text-sm font-bold text-amber-400 flex items-center justify-center gap-1">
                  <span>{item.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">السعرات الحرارية</div>
                <div className="text-sm font-bold text-slate-200">{item.calories} كالوري</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">وقت التحضير</div>
                <div className="text-sm font-bold text-slate-200">{item.prepTime}</div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h4 className="text-sm font-bold text-amber-400 mb-2">المكونات الفاخرة المستخدمة:</h4>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ing, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">ملاحظات خاصة للشيف (اختياري)</label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="مثال: بدون بصل / مستوى التوابل خفيف..."
                className="w-full bg-slate-950 border border-slate-800 rounded-full py-2.5 px-4 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-full p-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-bold text-sm w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={addedSuccess}
              className="flex-1 py-3.5 px-6 rounded-full gold-bg-gradient text-slate-950 font-black text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-5 h-5 text-emerald-950" />
                  <span>تم إضافته للطاولة!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>إضافة للطاولة ({item.price * quantity} ج.م)</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
