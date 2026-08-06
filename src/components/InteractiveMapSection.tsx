import React, { useEffect, useRef, useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { MapPin, Navigation, Compass, Phone, Clock, Car, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const InteractiveMapSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'directions' | 'valet'>('map');
  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      try {
        const L = (await import('leaflet')).default;

        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        if (mapContainerRef.current && (mapContainerRef.current as any)._leaflet_id) {
          try {
            delete (mapContainerRef.current as any)._leaflet_id;
          } catch (e) {
            // ignore
          }
        }

        if (!isMounted || !mapContainerRef.current) return;

        // Initialize Map centered on Zamalek Nile Abu El Feda
        const { lat, lng } = RESTAURANT_INFO.coordinates;
        const map = L.map(mapContainerRef.current, {
          center: [lat, lng],
          zoom: 16,
          zoomControl: false,
        });

        if (!isMounted) {
          map.remove();
          return;
        }

        // Custom Zoom Control placed at top-left
        L.control.zoom({ position: 'topleft' }).addTo(map);

        // Dark Luxury Tile Layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Custom Gold Royal Icon
        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div class="relative flex items-center justify-center">
              <div class="absolute w-12 h-12 bg-amber-500/30 rounded-full animate-ping"></div>
              <div class="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-slate-950 font-bold text-xs transform hover:scale-110 transition-transform">
                👑
              </div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="font-family: 'Cairo', sans-serif; text-align: right; padding: 4px;">
            <div style="font-weight: 800; font-size: 16px; color: #dfb253; margin-bottom: 4px;">👑 ${RESTAURANT_INFO.name}</div>
            <p style="font-size: 12px; color: #d1d5db; margin-bottom: 8px;">${RESTAURANT_INFO.address}</p>
            <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #dfb253; color: #0c0e12; font-weight: 700; font-size: 11px; padding: 6px 14px; border-radius: 9999px; text-decoration: none;">فتح في خرائط جوجل ↗</a>
          </div>
        `;

        marker.bindPopup(popupContent).openPopup();

        mapInstanceRef.current = map;
      } catch (err) {
        console.error('Error initializing map:', err);
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  const openGoogleMaps = () => {
    const { lat, lng } = RESTAURANT_INFO.coordinates;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <section id="location" className="py-24 bg-slate-950/80 relative overflow-hidden border-t border-amber-500/10">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-4"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>موقعنا الفريد على ضفاف النيل</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight amiri-font"
          >
            زورونا في <span className="gold-gradient-text">قلب الزمالك الملكية</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            يقع مطعم قصر الفيروز في أرقى المربعات السكنية المطلة على كورنيش الزمالك، حيث يلتقي هدوء النيل الخالد بإطلالة حية ساحرة على برج القاهرة والأوبرا.
          </motion.p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'map'
                ? 'gold-bg-gradient text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>الخريطة التفاعلية</span>
          </button>

          <button
            onClick={() => setActiveTab('directions')}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'directions'
                ? 'gold-bg-gradient text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>اتجاهات الوصول والمعالم</span>
          </button>

          <button
            onClick={() => setActiveTab('valet')}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'valet'
                ? 'gold-bg-gradient text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>خدمة صف السيارات والمواقف</span>
          </button>
        </div>

        {/* Grid Layout: Map Display + Details Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Leaflet Map Box */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-amber-500/20 royal-glass shadow-2xl relative min-h-[480px] flex flex-col">
            <div className="p-4 bg-slate-900/80 border-b border-amber-500/10 flex flex-wrap items-center justify-between gap-3 z-20">
              <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>المطعم مفتوح الآن استقبال الضيوف</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={openGoogleMaps}
                  className="px-5 py-2 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 transition-all shadow-md"
                >
                  <span>الحصول على الاتجاهات</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Map Canvas Container */}
            <div className="flex-1 w-full min-h-[420px] relative">
              <div ref={mapContainerRef} className="absolute inset-0 w-full h-full"></div>
            </div>

            {/* Floating Banner over Map */}
            <div className="p-4 bg-slate-950/90 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{RESTAURANT_INFO.name}</h4>
                  <p className="text-slate-400 text-xs">{RESTAURANT_INFO.address}</p>
                </div>
              </div>

              <button
                onClick={copyToClipboard}
                className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-400 transition-colors flex items-center gap-1.5"
              >
                {copiedAddress ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم نسخ العنوان!</span>
                  </>
                ) : (
                  <>
                    <span>نسخ العنوان بالعربية</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Location Sidebar Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Quick Contact & Working Hours */}
            <div className="p-6 rounded-3xl royal-glass border border-amber-500/20 flex flex-col gap-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-amber-500/10 pb-4">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>أوقات العمل واستقبال الطاولات</span>
              </h3>

              <div className="space-y-4">
                {RESTAURANT_INFO.openingHours.map((item, index) => (
                  <div key={index} className="flex flex-col bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-xs text-amber-400/90 font-bold mb-1">{item.days}</span>
                    <span className="text-slate-200 text-sm font-semibold">{item.hours}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-amber-500/10 pt-4 flex flex-col gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="w-full py-3 px-4 rounded-full bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>اتصال مباشر: {RESTAURANT_INFO.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-0]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>واتساب الاستفسارات والحجوزات</span>
                </a>
              </div>
            </div>

            {/* Landmarks Proximity Card */}
            <div className="p-6 rounded-3xl royal-glass border border-amber-500/20 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-400" />
                <span>المسافة من أشهر المعالم</span>
              </h3>

              <div className="space-y-3">
                {RESTAURANT_INFO.landmarks.map((lm, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-900/40 border border-slate-800">
                    <span className="text-slate-300 font-medium">{lm.name}</span>
                    <span className="text-amber-400 font-bold">{lm.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Valet & Security Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 to-slate-900 border border-amber-500/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">خدمة Valet مخصصة لراحتكم</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  يتوفر فريق متكفل بصف وركن السيارات في مواقفنا المؤمنة مجاناً لجميع ضيوف طاولات القصر.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
