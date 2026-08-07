export interface MenuItem {
  id: string;
  name: string;
  englishName: string;
  category: 'tajin' | 'grill' | 'appetizers' | 'desserts' | 'beverages';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  ingredients: string[];
  calories: number;
  prepTime: string;
  badge?: string;
  spiceLevel?: number; // 0 to 3
}

export const MENU_CATEGORIES = [
  { id: 'all', name: 'كافة الأطباق', icon: '✨' },
  { id: 'tajin', name: 'الطواجن والقطع الملكية', icon: '🍲' },
  { id: 'grill', name: 'مشاوي الفيروز على الفحم', icon: '🥩' },
  { id: 'appetizers', name: 'المقبلات والمحاشي', icon: '🥗' },
  { id: 'desserts', name: 'الحلويات الشرقية الفاخرة', icon: '🍨' },
  { id: 'beverages', name: 'المشروبات والإنعاش الملكي', icon: '🍹' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'طاجن موزة البط البلدي بالملوخية الخضراء',
    englishName: 'Royal Duck Leg & Traditional Fresh Molokhia',
    category: 'tajin',
    price: 780,
    rating: 4.9,
    reviewsCount: 184,
    description: 'نصف بطة بلدي طرية مطهوة بطريقة القصر في الفخار مع المستكة والحبهان، تقدم مع الملوخية الخضراء المخفوقة طازجة مع طشة الثوم والكسبرة البلدي الساخنة.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['بط بلدي طازج', 'ملوخية خضراء خالية من الشوائب', 'سمن بلدي صافي', 'ثوم بلدي مفروم', 'كسبرة جافة مطحونة', 'مستكة وحبهان'],
    calories: 850,
    prepTime: '25 دقيقة',
    badge: 'توقيع الشيف',
    spiceLevel: 1
  },
  {
    id: 'm2',
    name: 'مشويات الفيروز الملكية المشكلة',
    englishName: 'Royal Egyptian Charcoal Mixed Grill',
    category: 'grill',
    price: 950,
    rating: 5.0,
    reviewsCount: 240,
    description: 'تشكيلة ملكية فاخرة من الكباب الضأني، الكفتة الكندوز المتبلة بالبصل المشوي، الريش البلدي، وريش الشيش طاووق المعطرة بالفحم والبهارات المصرية العتيقة.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['لحم ضأن بلدي', 'كفتة كندوز طازجة', 'ريش خروف بلدي', 'خلطة أعشاب الفيروز', 'بصل وطماطم مشوية'],
    calories: 1100,
    prepTime: '30 دقيقة',
    badge: 'الأكثر طلباً',
    spiceLevel: 1
  },
  {
    id: 'm3',
    name: 'كشري الفيروز الفاخر برقائق الذهب والترافل',
    englishName: 'Royal Truffle & Gold Leaf Gourmet Koshary',
    category: 'appetizers',
    price: 420,
    rating: 4.8,
    reviewsCount: 128,
    description: 'إعادة إحياء معاصرة للطبق المصري الشعبي الأول بأرز بسمتي معتق، عدس بني جبة، حمص الشام الفاخر، بصل مقرمش ذهبي، مع لمسة زيت الترافل ورقائق الذهب القابلة للأكل.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['أرز بسمتي معتق', 'عدس جبة ممتاز', 'صلصة طماطم بالخل والثوم', 'زيت الترافل الإيطالي', 'رقائق ذهب 24 karat'],
    calories: 620,
    prepTime: '15 دقيقة',
    badge: 'ابتكار الفيروز',
    spiceLevel: 2
  },
  {
    id: 'm4',
    name: 'فطير مشلتت بالسمن البلدي والقشطة والعسل',
    englishName: 'Feteer Meshaltet with Clotted Cream & Honey',
    category: 'appetizers',
    price: 360,
    rating: 4.9,
    reviewsCount: 210,
    description: 'فطير مصري مورق بـ 128 طبقة رقيقة خبزت بالسمن البلدي الفلاحي الصافي، يقدم مع قشطة اللبن الجمسي والعسل الجبلي الصافي والجبنة القديمة المعتقة.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['دقيق فاخر مورق', 'سمن بلدي فلاحي', 'قشطة بلدي طازجة', 'عسل نحل جبلي', 'جبنة حادقة معتقة'],
    calories: 920,
    prepTime: '20 دقيقة',
    badge: 'أصيل',
    spiceLevel: 0
  },
  {
    id: 'm5',
    name: 'طاجن بامية باللحم الضأني البلدي',
    englishName: 'Lamb Shank Slow-Cooked Okra Tajin',
    category: 'tajin',
    price: 720,
    rating: 4.8,
    reviewsCount: 96,
    description: 'بامية ممتازة صغيرة الحجم مطهوة في طاجن فخاري حراري مع قطع لحم الضأن البلدي وقطع الطماطم الطازجة وطشة الثوم والليمون المعصفر.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['بامية طازجة', 'لحم موزة ضأن', 'صلصة طماطم مركزة', 'ثوم وفلفل حار', 'عصير ليمون معصفر'],
    calories: 780,
    prepTime: '25 دقيقة',
    badge: '',
    spiceLevel: 2
  },
  {
    id: 'm6',
    name: 'حواوشي الفيروز بالجبنة الكيرف والجوز',
    englishName: 'Royal Stuffed Hawawshi with Aged Cheese & Walnuts',
    category: 'appetizers',
    price: 290,
    rating: 4.7,
    reviewsCount: 88,
    description: 'خبز بلدي مصري مقرمش محشو باللحم المفروم المتبل ببهارات الفيروز الخاصة مع جبن عكاري معتق ومكسرات الجوز المحمصة.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['خبز بلدي طازج', 'لحم مفروم بلدي', 'جبنة معتقة', 'جوز محمص', 'فلفل ألوان وأعشاب'],
    calories: 680,
    prepTime: '15 دقيقة',
    badge: 'مقرمش',
    spiceLevel: 1
  },
  {
    id: 'm7',
    name: 'طاجن أم علي بالمكسرات الملكية والقشطة',
    englishName: 'Royal Umm Ali with Pistachios & Clotted Cream',
    category: 'desserts',
    price: 220,
    rating: 5.0,
    reviewsCount: 310,
    description: 'رقائق الميلفي الهشة المغمورة بالحليب الساخن المعطر بالفانيليا والمستكة، تعلوها طبقة من القشطة البلدي المحمرة بالفستق واللوز والزبيب.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['رقائق ميلفي طازجة', 'حليب كامل الدسم', 'قشطة بلدي محمرة', 'فستق حلبي ولوز', 'مستكة وفانيليا'],
    calories: 540,
    prepTime: '15 دقيقة',
    badge: 'الأكثر طلباً',
    spiceLevel: 0
  },
  {
    id: 'm8',
    name: 'عصير فرعون مصر الذهبي (الكركديه بالنعناع والرمان)',
    englishName: 'Pharaoh Gold Hibiscus Mint & Pomegranate Elixir',
    category: 'beverages',
    price: 110,
    rating: 4.9,
    reviewsCount: 156,
    description: 'مشروب أسواني أصيل من أوراق الكركديه الأسواني المنقوع بارداً مع عصير الرمان الطازج وماء الورد وأوراق النعناع البلدي.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['كركديه أسواني ممتاز', 'عصير رمان طازج', 'ماء ورد مقطر', 'نعناع بلدي', 'قطع ثلج بلورية'],
    calories: 140,
    prepTime: '5 دقائق',
    badge: 'منعش',
    spiceLevel: 0
  },
  {
    id: 'm9',
    name: 'زوج حمام بلدي محشي بالفريك والكبدة والقوانص',
    englishName: 'Stuffed Royal Pigeon with Freekeh & Liver',
    category: 'tajin',
    price: 640,
    rating: 4.9,
    reviewsCount: 164,
    description: 'زوج من الحمام البلدي المحشو بالفريك الصعيدي المستورد المتبل بالحبهان والمستكة، محمر بالسمن البلدي الصافي ومزين بالمكسرات المحمصة.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['حمام بلدي طازج', 'فريك صعيدي فاخر', 'كبد وقوانص طازجة', 'سمن بلدي', 'مكسرات محمصة'],
    calories: 790,
    prepTime: '30 دقيقة',
    badge: 'توقيع الشيف',
    spiceLevel: 1
  },
  {
    id: 'm10',
    name: 'فتة الموزة الضأني بالخل والثوم البلدي',
    englishName: 'Braised Lamb Shank Royal Fattah',
    category: 'tajin',
    price: 820,
    rating: 5.0,
    reviewsCount: 205,
    description: 'موزة ضأن بلدي طرية تذوب بالأنامل، مع أرز مصري معطر ومكعبات الخبز المحمص بالسمن البلدي، وطشة الخل والثوم العتيقة مع صلصة الطماطم الفاخرة.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['موزة خروف بلدي', 'أرز مصري مصفي', 'خبز محمص بالسمن', 'ثوم وخل معتق', 'صلصة طماطم بلدي'],
    calories: 960,
    prepTime: '25 دقيقة',
    badge: 'الأكثر طلباً',
    spiceLevel: 1
  },
  {
    id: 'm11',
    name: 'صينية مشكل المحاشي والممبار الفاخر',
    englishName: 'Royal Mahshi & Crispy Mombar Selection',
    category: 'appetizers',
    price: 520,
    rating: 4.8,
    reviewsCount: 112,
    description: 'تشكيلة فاخرة من ورق العنب بالليمون المعصفر، الكوسة، الباذنجان المتبل، مع أصابع الممبار البلدي المحمصة المقرمشة بخلطة الفيروز السرية.',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['ممبار بلدي طازج', 'ورق عنب مصري', 'كوسة وباذنجان', 'خلطة أرز بالأعشاب والصلصة', 'ليمون معصفر'],
    calories: 710,
    prepTime: '20 دقيقة',
    badge: 'جديد',
    spiceLevel: 1
  },
  {
    id: 'm12',
    name: 'مشروب سحلب الرحمانية بالمكسرات والقرفة',
    englishName: 'Royal Sahlab with Mixed Nuts & Cinnamon',
    category: 'beverages',
    price: 130,
    rating: 4.9,
    reviewsCount: 145,
    description: 'سحلب فاخر سميك وقوام كريمي أملس، ممزوج بالمسك والمستكة والحليب البلدي، يغطى بالفستق، اللوز، وجوز الهند الذهبي مع القرفة الهندية.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['حليب طبيعي فاخر', 'مسحوق السحلب الأصلي', 'مستكة ومسك', 'فستق حلبي ولوز', 'قرفة هندية طازجة'],
    calories: 310,
    prepTime: '10 دقائق',
    badge: 'دافئ',
    spiceLevel: 0
  }
];
