import React, { useState } from 'react';
import { X, Star, Clock, Flame, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { SafeImage } from './SafeImage';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number, notes?: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity, notes);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setQuantity(1);
      setNotes('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl royal-glass border border-amber-500/30 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-amber-400 border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-72 w-full">
          <SafeImage
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {item.badge && (
            <span className="absolute top-4 right-4 px-3.5 py-1 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs shadow-lg">
              {item.badge}
            </span>
          )}

          <div className="absolute bottom-4 right-4 left-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold amiri-font gold-gradient-text mb-1">
              {item.name}
            </h2>
            <p className="text-xs text-amber-300/80 font-mono">{item.englishName}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-amber-300">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-sm">{item.rating}</span>
              <span className="text-slate-400">({item.reviewsCount} تقييم ممتاز)</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>وقت التحضير: {item.prepTime}</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>السعرات: {item.calories} سعرة</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-2">وصف الطبق وتجربة الشيف</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
          </div>

          {/* Ingredients */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-2.5">المكونات والمقادير الملكية</h4>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-200 text-xs flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Special Notes / Customization */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              ملاحظات خاصة للشيف (درجة التسوية، بدون ثوم، إلخ):
            </label>
            <input
              type="text"
              placeholder="مثال: يرجى جعل الطشة بدون شطة زائدة..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-200 text-xs outline-none"
            />
          </div>

          {/* Quantity and Add to Cart CTA */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-slate-900 p-1.5 rounded-full border border-slate-800">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-amber-300 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Total Price and Submit Button */}
            <button
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 py-3.5 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all duration-300 ${
                added
                  ? 'bg-emerald-500 text-slate-950'
                  : 'gold-bg-gradient text-slate-950 hover:brightness-110'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>تمت الإضافة للطلب بنجاح!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>إضافة للطلب - {(item.price * quantity).toLocaleString()} ج.م</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
