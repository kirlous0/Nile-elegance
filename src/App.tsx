import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DishDetailModal } from './components/DishDetailModal';
import { AiSommelierModal } from './components/AiSommelierModal';
import { ReservationSection } from './components/ReservationSection';
import { InteractiveMapSection } from './components/InteractiveMapSection';
import { StoryExperience } from './components/StoryExperience';
import { ReviewsSection } from './components/ReviewsSection';
import { OrderSummaryDrawer, CartItem } from './components/OrderSummaryDrawer';
import { Footer } from './components/Footer';
import { MenuItem } from './data/menuData';

export default function App() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cart Management
  const handleAddToCart = (dish: MenuItem, quantity: number, notes?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (notes) updated[existingIndex].notes = notes;
        return updated;
      }
      return [...prev, { dish, quantity, notes }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar
        onOpenAiSommelier={() => setAiModalOpen(true)}
        onOpenReservation={scrollToReservation}
        selectedItemsCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner Section */}
        <Hero
          onOpenReservation={scrollToReservation}
          onOpenAiSommelier={() => setAiModalOpen(true)}
        />

        {/* Menu Section */}
        <MenuSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onQuickAdd={(dish) => handleAddToCart(dish, 1)}
          onOpenAiSommelier={() => setAiModalOpen(true)}
        />

        {/* Story & Heritage */}
        <StoryExperience />

        {/* Real-time Table Reservation System */}
        <ReservationSection />

        {/* Interactive Location & Leaflet Map */}
        <InteractiveMapSection />

        {/* Guest Reviews & Community */}
        <ReviewsSection />
      </main>

      {/* Modals & Overlays */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      <AiSommelierModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />

      <OrderSummaryDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenReservation={scrollToReservation}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
