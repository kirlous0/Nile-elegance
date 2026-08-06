import React, { useState, useEffect } from 'react';
import { Sparkles, Utensils, Calendar, MapPin, Menu, X, Phone, ShoppingBag, Crown } from 'lucide-react';

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'قائمة الطعام', href: '#menu' },
    { name: 'حجز طاولة', href: '#reservation' },
    { name: 'الموقع والخريطة', href: '#location' },
    { name: 'قصتنا', href: '#story' },
    { name: 'آراء الضيوف', href: '#reviews' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full gold-bg-gradient flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Crown className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-wide amiri-font group-hover:text-amber-400 transition-colors">
              قصر الفيروز
            </span>
            <span className="text-[10px] text-amber-400/90 uppercase tracking-widest font-semibold">
              EGYPTIAN FINE DINING
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-amber-400 font-semibold text-sm transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiSommelier}
            className="px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-2 hover:border-amber-500/60 transition-all shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>المساعد الذكي</span>
          </button>

          {/* Table Selection / Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            title="الأطباق المختارة للطاولة"
          >
            <ShoppingBag className="w-5 h-5" />
            {selectedItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center animate-bounce">
                {selectedItemsCount}
              </span>
            )}
          </button>

          {/* Book Table Primary Button */}
          <button
            onClick={onOpenReservation}
            className="px-6 py-2.5 rounded-full gold-bg-gradient text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>حجز طاولة ملكية</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-200"
          >
            <ShoppingBag className="w-5 h-5" />
            {selectedItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {selectedItemsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-slate-900 text-slate-200 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-amber-500/20 px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-amber-400 font-bold text-sm border-b border-slate-900"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiSommelier();
              }}
              className="w-full py-3 rounded-full bg-slate-900 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-amber-500/30"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>مساعد الفيروز للذكاء الاصطناعي</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 rounded-full gold-bg-gradient text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>حجز طاولة الآن</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
