import React, { useState } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem } from '../data/menuData';
import { Search, Star, Clock, Flame, Plus, Sparkles, Filter, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
  onOpenAiSommelier: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDish,
  onQuickAdd,
  onOpenAiSommelier,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.includes(searchQuery) ||
      item.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.includes(searchQuery) ||
      item.ingredients.some((ing) => ing.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-4"
          >
            <Utensils className="w-4 h-4" />
            <span>قائمة الطعام الفاخرة</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white mb-6 amiri-font"
          >
            تذوق عظمة <span className="gold-gradient-text">الأطباق المصرية الملكية</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            تتميز القائمة بمكونات طازجة بلدي 100%، وتتبيلات سرية وراثية مجهزة بالفحم البلدي والسمن الصافي لتقدم لكم وجبة لا تُنسى.
          </motion.p>
        </div>

        {/* Search & AI Recommendation Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن طبقك المفضل، مكونات، أو مشويات..."
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-3.5 pr-12 pl-6 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 shadow-inner"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" />
          </div>

          {/* AI Helper Button */}
          <button
            onClick={onOpenAiSommelier}
            className="w-full md:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-300 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>مستشار الوجبات بالذكاء الاصطناعي</span>
          </button>
        </div>

        {/* Categories Horizontal Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'gold-bg-gradient text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div
                onClick={() => onSelectDish(item)}
                className="relative h-48 sm:h-52 overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                {item.badge && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full gold-bg-gradient text-slate-950 font-bold text-[11px] shadow-md">
                    {item.badge}
                  </span>
                )}

                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold border border-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between text-right">
                <div onClick={() => onSelectDish(item)} className="cursor-pointer space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors amiri-font">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price & Add Button Bar */}
                <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-slate-400 block">السعر</span>
                    <span className="text-base font-extrabold text-amber-400">{item.price} ج.م</span>
                  </div>

                  <button
                    onClick={() => onQuickAdd(item)}
                    className="px-4 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>أضف للطاولة</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 max-w-lg mx-auto">
            <p className="text-slate-400 text-base mb-4">لم نجد أي طبق يطابق خيارات البحث الحالية.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs"
            >
              عرض القائمة الكاملة
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
