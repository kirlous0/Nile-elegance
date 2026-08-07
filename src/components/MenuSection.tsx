import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Star, Clock, Flame, Info } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../data/menuData';
import { SafeImage } from './SafeImage';

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="menu" className="py-20 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full royal-glass border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>قائمة قصر الفيروز الملكية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold amiri-font gold-gradient-text mb-4">
            نخبة الأطباق وطواجن الفخار المعتقة
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            استمتع بأشهر الوصفات المصرية الأصيلة المطهوة بكل عناية تحت إشراف نخبة من كبار طهاة القاهرة
          </p>
        </div>

        {/* Search & AI Recommendation Banner */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500/60" />
            <input
              type="text"
              placeholder="ابحث عن طبق، مكونات (بط، فريك، ملوخية)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 rounded-full bg-slate-900 border border-slate-800 focus:border-amber-500 text-slate-100 placeholder-slate-500 text-sm outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-amber-400"
              >
                مسح
              </button>
            )}
          </div>

          {/* Sort Dropdown & AI Banner */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>ترتيب حسب:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-amber-300 text-xs rounded-full px-3 py-2 outline-none cursor-pointer hover:border-amber-500/40"
              >
                <option value="featured">الأكثر تميزاً (مقترحات الشيف)</option>
                <option value="rating">الأعلى تقييماً ⭐</option>
                <option value="price-asc">الأقل سعراً</option>
                <option value="price-desc">الأعلى سعراً</option>
              </select>
            </div>

            <button
              onClick={onOpenAiSommelier}
              className="px-4 py-2 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/15 hover:brightness-110 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>مساعد الشيف الملكي الذكي</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'gold-bg-gradient text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-slate-900/90 text-slate-300 hover:text-amber-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 royal-glass rounded-3xl border border-slate-800 p-8">
            <p className="text-amber-400 font-bold text-lg mb-2">لم نجد أطباق مطابقة لـ "{searchQuery}"</p>
            <p className="text-slate-400 text-sm mb-6">جرب البحث بكلمات أخرى مثل "بط"، "كباب"، "ملوخية"، أو مسح الفلتر.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs"
            >
              عرض كافة الأطباق
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                className="group relative rounded-3xl royal-glass border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10"
              >
                {/* Dish Image with SafeImage Loader */}
                <div className="relative h-56 w-full cursor-pointer overflow-hidden" onClick={() => onSelectDish(dish)}>
                  <SafeImage
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                  {/* Badge */}
                  {dish.badge && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full gold-bg-gradient text-slate-950 font-bold text-[11px] shadow-lg">
                      {dish.badge}
                    </span>
                  )}

                  {/* Prep Time & Rating */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                    <span className="flex items-center gap-1 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/20 text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{dish.rating}</span>
                      <span className="text-slate-400">({dish.reviewsCount})</span>
                    </span>

                    <span className="flex items-center gap-1 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{dish.prepTime}</span>
                    </span>
                  </div>
                </div>

                {/* Dish Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3
                        onClick={() => onSelectDish(dish)}
                        className="text-lg font-bold amiri-font text-slate-100 hover:text-amber-400 cursor-pointer transition-colors leading-snug"
                      >
                        {dish.name}
                      </h3>
                      {dish.spiceLevel && dish.spiceLevel > 0 ? (
                        <div className="flex items-center text-red-400 text-xs shrink-0" title={`مستوى الفلفل: ${dish.spiceLevel}`}>
                          {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <p className="text-xs text-amber-400/80 font-mono mb-2">{dish.englishName}</p>

                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-[11px] block">السعر</span>
                      <span className="text-xl font-black gold-gradient-text amiri-font">
                        {dish.price} <span className="text-xs font-sans text-amber-300 font-normal">ج.م</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectDish(dish)}
                        className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 text-xs transition-colors"
                        title="تفاصيل المكونات والقيمة الغذائية"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onQuickAdd(dish)}
                        className="px-4 py-2 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>إضافة للطلب</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
