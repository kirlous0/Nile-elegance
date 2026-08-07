import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Calendar, Menu, X, Phone, Compass, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface NavbarProps {
  onOpenAiSommelier: () => void;
  onOpenReservation: () => void;
  selectedItemsCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAiSommelier,
  onOpenReservation,
  selectedItemsCount,
  onOpenCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full gold-bg-gradient p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <span className="text-amber-400 font-bold text-xl amiri-font">ف</span>
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold gold-gradient-text amiri-font tracking-wide block">
                {RESTAURANT_INFO.name}
              </span>
              <span className="text-[10px] text-amber-300/70 tracking-widest uppercase block -mt-1 font-sans">
                Zamalek • Cairo
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse text-sm font-medium">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              قائمة الطعام
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="text-slate-200 hover:text-amber-400 transition-colors"
            >
              قصتنا وخبراتنا
            </button>
            <button
              onClick={() => scrollToSection('reservation')}
              className="text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              حجز الطاولات
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              الموقع والخريطة
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* AI Sommelier Button */}
            <button
              onClick={onOpenAiSommelier}
              className="relative group px-3.5 py-2 rounded-full royal-glass border border-amber-500/30 text-amber-300 hover:border-amber-400 transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm font-semibold shadow-lg shadow-amber-500/5 hover:shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">مستشار الطعام الذكي</span>
              <span className="sm:hidden">الشيف الذكي</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="فتح حقيبة الطلبات"
              className="relative p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400 hover:border-amber-500/40 transition-all duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              {selectedItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs flex items-center justify-center animate-bounce shadow-md">
                  {selectedItemsCount}
                </span>
              )}
            </button>

            {/* Reserve Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full gold-bg-gradient text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              <span>احجز طاولتك</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-900 text-slate-300 hover:text-amber-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 rounded-2xl royal-glass p-5 border border-amber-500/20 shadow-2xl flex flex-col gap-4 animate-in fade-in duration-200">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-right py-2 text-slate-200 hover:text-amber-400 border-b border-slate-800 flex items-center justify-between"
            >
              <span>قائمة الطعام الفاخرة</span>
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="text-right py-2 text-slate-200 hover:text-amber-400 border-b border-slate-800"
            >
              تجربة قصر الفيروز وقصتنا
            </button>
            <button
              onClick={() => scrollToSection('reservation')}
              className="text-right py-2 text-slate-200 hover:text-amber-400 border-b border-slate-800 flex items-center justify-between"
            >
              <span>حجز الطاولات والأماكن</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="text-right py-2 text-slate-200 hover:text-amber-400 border-b border-slate-800 flex items-center justify-between"
            >
              <span>الموقع والوصول</span>
              <Compass className="w-4 h-4 text-amber-400" />
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 font-semibold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>اتصل بنا: {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
