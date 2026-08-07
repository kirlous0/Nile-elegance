import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Phone, Clock, Mail, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const InteractiveMapSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (mapContainerRef.current) {
      try {
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

        L.control.zoom({ position: 'topleft' }).addTo(map);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map);

        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `<div style="
            background: linear-gradient(135deg, #dfb253 0%, #b8860b 100%);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(223, 178, 83, 0.6);
            border: 2px solid #ffffff;
            color: #0c0e12;
            font-weight: bold;
            font-size: 20px;
          ">👑</div>`,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="text-align: right; direction: rtl; font-family: 'Cairo', sans-serif; padding: 4px;">
            <h4 style="color: #dfb253; font-weight: bold; margin-bottom: 4px; font-size: 14px;">${RESTAURANT_INFO.name}</h4>
            <p style="font-size: 12px; color: #d1d5db; margin-bottom: 6px;">${RESTAURANT_INFO.address}</p>
            <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank" rel="noreferrer" style="
              display: inline-block;
              background: #dfb253;
              color: #000;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: bold;
              text-decoration: none;
            ">فتح في خرائط جوجل &larr;</a>
          </div>
        `;

        marker.bindPopup(popupContent).openPopup();
        mapInstanceRef.current = map;
      } catch (err) {
        console.error('Error initializing map:', err);
      }
    }

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="location" className="py-24 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact & Hours Info Card */}
          <div className="lg:col-span-5 rounded-3xl royal-glass border border-amber-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>الوصول لقصر الفيروز</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold amiri-font gold-gradient-text mb-4">
                موقعنا بالزمالك وقنوات التواصل
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8">
                يقع المطعم في أرقى أحياء الزمالك مباشرة على طريق كورنيش أبو الفدا، مع مواقف سيارات خاصة لخدمة الفاليه (Valet Parking).
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-100 mb-0.5">العنوان الملكي:</h4>
                    <p className="text-slate-400 text-xs">{RESTAURANT_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-100 mb-0.5">مواعيد العمل الاستقبال:</h4>
                    <p className="text-slate-400 text-xs">{RESTAURANT_INFO.workingHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-100 mb-0.5">الهاتف المباشر والواتساب:</h4>
                    <p className="text-slate-400 text-xs">{RESTAURANT_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-100 mb-0.5">البريد الإلكتروني للفعاليات:</h4>
                    <p className="text-slate-400 text-xs">{RESTAURANT_INFO.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex gap-3">
              <a
                href={`https://maps.google.com/?q=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-full gold-bg-gradient text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110"
              >
                <Navigation className="w-4 h-4" />
                <span>الاتجاهات عبر Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg"
              >
                <span>واتساب</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Leaflet Map Box */}
          <div className="lg:col-span-7 h-[450px] lg:h-auto rounded-3xl overflow-hidden royal-glass border border-amber-500/30 p-2 shadow-2xl relative">
            <div ref={mapContainerRef} className="w-full h-full rounded-2xl z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
