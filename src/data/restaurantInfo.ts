export interface TableArea {
  id: string;
  name: string;
  description: string;
  capacity: string;
  image: string;
  features: string[];
}

export const RESTAURANT_INFO = {
  name: 'مطعم قصر الفيروز',
  tagline: 'تجربة طهي ملكية أصلية بلمسة معاصرة على ضفاف النيل',
  address: 'شارع أبو الفدا، الزمالك، القاهرة، مصر',
  phone: '0100 888 9900',
  whatsapp: '201008889900',
  email: 'royal@alfayrouzpalace.com',
  workingHours: 'يومياً من 12:00 ظهراً حتى 2:00 صباحاً',
  coordinates: {
    lat: 30.0626,
    lng: 31.2201,
  },
  heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
  nileViewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  areas: [
    {
      id: 'nile-terrace',
      name: 'شرفة النيل الملكية (Nile Terrace)',
      description: 'إطلالة مباشرة بانورامية على النيل مع نسمات الهواء العليل وإضاءة خافتة ساحرة.',
      capacity: '2 - 8 أفراد',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      features: ['إطلالة مائية مباشرة', 'موسيقى قانون حية', 'مناسبة للمناسبات الرومانسية']
    },
    {
      id: 'royal-hall',
      name: 'القاعة الملكية الرئيسية (Royal Hall)',
      description: 'تصميم عثماني وفاطمي فاخر يجمع بين الزخارف الذهبية والثريات الكريستالية.',
      capacity: '2 - 12 فرد',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80',
      features: ['تكييف مركزى رفيع', 'مقاعد مخملية فاخرة', 'خدمة نادل خاص']
    },
    {
      id: 'vip-cabins',
      name: 'صالون الفيروز الخاص (VIP Private Lounge)',
      description: 'كابينة خاصة مغلقة تماماً للعائلات أو اجتماعات كبار الشخصيات مع أقصى درجات الخصوصية.',
      capacity: '6 - 16 فرد',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
      features: ['خصوصية تامة', 'شاشة عرض خاصة', 'قائمة طعام مخصصة من الشيف']
    }
  ] as TableArea[]
};
