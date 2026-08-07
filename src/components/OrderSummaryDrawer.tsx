import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowLeft, Check, Calendar } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { SafeImage } from './SafeImage';

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  notes?: string;
}

interface OrderSummaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  onOpenReservation: () => void;
}

export const OrderSummaryDrawer: React.FC<OrderSummaryDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenReservation,
}) => {
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const serviceCharge = Math.round(subtotal * 0.12);
  const total = subtotal + serviceCharge;

  const handleCheckout = () => {
    setOrderSubmitted(true);
    setTimeout(() => {
      onClearCart();
      setOrderSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md royal-glass border-r border-amber-500/30 text-slate-100 flex flex-col justify-between p-6 shadow-2xl">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full gold-bg-gradient text-slate-950 flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold amiri-font gold-gradient-text">طلبك الملكي الحالي</h3>
                  <p className="text-[10px] text-slate-400">قصر الفيروز بالزمالك</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content List */}
            <div className="mt-6 max-h-[55vh] overflow-y-auto space-y-4 pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-amber-500/40" />
                  <p className="text-sm font-bold text-slate-200">حقيبة الطلبات فارغة</p>
                  <p className="text-xs">تصفح قائمة الطعام الملكية وأضف أطباقك المفضلة</p>
                </div>
              ) : (
                cart.map(({ dish, quantity, notes }) => (
                  <div
                    key={dish.id}
                    className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <SafeImage src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{dish.name}</h4>
                      <p className="text-xs text-amber-400 font-bold mt-0.5">
                        {dish.price * quantity} ج.م
                      </p>
                      {notes && <p className="text-[10px] text-slate-400 italic">ملاحظة: {notes}</p>}
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-full border border-slate-800">
                      <button
                        onClick={() => onUpdateQuantity(dish.id, -1)}
                        className="w-6 h-6 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-amber-300">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(dish.id, 1)}
                        className="w-6 h-6 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(dish.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                      title="إزالة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer & Submit */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>المجموع الفرعي الأطباق:</span>
                  <span>{subtotal.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>رسوم الخدمة الملكية (12%):</span>
                  <span>{serviceCharge.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-slate-100 pt-2 border-t border-slate-800">
                  <span>الإجمالي الكلي:</span>
                  <span className="text-xl font-extrabold gold-gradient-text amiri-font">{total.toLocaleString()} ج.م</span>
                </div>
              </div>

              {orderSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>تم اعتماد الطلب وإرساله للمطبخ بنجاح!</span>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>تأكيد وإرسال الطلب للطهي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenReservation();
                    }}
                    className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>ربط الطلب بحجز طاولة بالزمالك</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
