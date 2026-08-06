import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [orderSent, setOrderSent] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const serviceCharge = Math.round(subtotal * 0.12);
  const total = subtotal + serviceCharge;

  const handleConfirmOrder = () => {
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      onClearCart();
      onClose();
      onOpenReservation();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="pointer-events-auto w-screen max-w-md bg-slate-900 border-r border-amber-500/20 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white text-lg amiri-font">اختيارات الطاولة ({cart.length})</h3>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4 text-right">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 space-y-3">
                    <Utensils className="w-12 h-12 mx-auto text-slate-600" />
                    <p className="text-sm font-semibold">لم تقم بإضافة أي طبق إلى اختيارات الطاولة بعد.</p>
                    <p className="text-xs text-slate-500">استعرض قائمة الطعام واضغط "أضف للطاولة"</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.dish.id}
                      className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3"
                    >
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-xs truncate mb-1">{item.dish.name}</h4>
                        <span className="text-amber-400 font-extrabold text-xs block">
                          {item.dish.price * item.quantity} ج.م
                        </span>
                        {item.notes && (
                          <span className="text-[10px] text-slate-400 italic block truncate">ملاحظة: {item.notes}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-full p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.dish.id, -1)}
                          className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.dish.id, 1)}
                          className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.dish.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Calculations */}
              {cart.length > 0 && (
                <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>إجمالي الأطباق:</span>
                      <span className="text-white font-bold">{subtotal} ج.م</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>خدمة القصر والضريبة (12%):</span>
                      <span className="text-white font-bold">{serviceCharge} ج.م</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-amber-400 pt-2 border-t border-slate-800">
                      <span>الإجمالي الكلي:</span>
                      <span>{total} ج.م</span>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmOrder}
                    disabled={orderSent}
                    className="w-full py-3.5 rounded-full gold-bg-gradient text-slate-950 font-black text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {orderSent ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-emerald-950" />
                        <span>تم ربط الوجبات بالحجز!</span>
                      </>
                    ) : (
                      <>
                        <span>اعتماد الوجبات والانتقال للحجز</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
