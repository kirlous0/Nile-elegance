export interface MenuItem {
  id: string;
  name: string;
  englishName: string;
  category: 'grill' | 'tajin' | 'appetizers' | 'desserts' | 'beverages';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  ingredients: string[];
  calories: number;
  prepTime: string;
  badge?: 'الأكثر طلباً' | 'توقيع الشيف' | 'جديد' | 'نباتي';
  spiceLevel: number; // 0 to 3
}

export const MENU_CATEGORIES = [
  { id: 'all', name: 'جميع الأطباق', icon: 'Utensils' },
  { id: 'grill', name: 'المشويات الملكية', icon: 'Flame' },
  { id: 'tajin', name: 'طواجن زمان', icon: 'CookingPot' },
  { id: 'appetizers', name: 'الفطير والمقبلات', icon: 'Wheat' },
  { id: 'desserts', name: 'الحلويات الشرقية', icon: 'Cake' },
  { id: 'beverages', name: 'المشروبات والنرجيلة', icon: 'Coffee' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'مشاوي قصر الفيروز المشكلة',
    englishName: 'Royal Palace Mixed Grill',
    category: 'grill',
    price: 890,
    rating: 4.9,
    reviewsCount: 142,
    description: 'توليفة ملكية من كباب الضأن البلدي، كفتة الفيروز بالمكسرات، ريش خروف متبلة بالأعشاب المصرية، وريش الدجاج المشوي على الفحم مع خبز البلد الساخن والطحينة البكر.',
    image: '/src/assets/images/egyptian_mixed_grill_1786055034487.jpg',
    ingredients: ['لحم ضأن بلدي', 'كفتة مشوية', 'ريش خروف', 'توابل الفيروز الخاصة', 'خبز بلدي بالفحم'],
    calories: 850,
    prepTime: '25-30 دقيقة',
    badge: 'الأكثر طلباً',
    spiceLevel: 1
  },
  {
    id: 'm2',
    name: 'بط بلدي محمر مع ملوخية بالطشة الملكية',
    englishName: 'Royal Roast Duck with Garlic Molokhia',
    category: 'tajin',
    price: 740,
    rating: 5.0,
    reviewsCount: 189,
    description: 'نصف بطة بلدية مسلوقة ومحمرة بالمسلي البلدي مع النودار، تقدم بجوار طاجن الملوخية الخضراء الساخنة بطشة الثوم والكسبرة المحمصة وأرز بالفيرميسيل.',
    image: '/src/assets/images/royal_duck_molokhia_1786055047783.jpg',
    ingredients: ['بط بلدي عالي الجودة', 'ملوخية خضراء طازجة', 'ثوم بلدي', 'كزبرة جافة محمصة', 'سمن بلدي أصيل'],
    calories: 920,
    prepTime: '25 دقيقة',
    badge: 'توقيع الشيف',
    spiceLevel: 0
  },
  {
    id: 'm3',
    name: 'فطير مشلتت فاخر مع المش والعسل الأسود',
    englishName: 'Luxury Feteer Meshaltet with Honey & Mesh',
    category: 'appetizers',
    price: 380,
    rating: 4.8,
    reviewsCount: 96,
    description: 'طبقات هشة ذهبية ومقرمشة مجهزة بالسمن البلدي الصافي على الطريقة الصعيدية الأصلية، تقدم مع مش معتق وعسل أسود بالطحينة وعسل نخل بكر.',
    image: '/src/assets/images/egyptian_appetizers_feteer_1786055130194.jpg',
    ingredients: ['دقيق فاخر', 'سمن بلدي معتق', 'مش قديم', 'عسل أسود قصب', 'طحينة سمسم بكر'],
    calories: 680,
    prepTime: '20 دقيقة',
    badge: 'توقيع الشيف',
    spiceLevel: 0
  },
  {
    id: 'm4',
    name: 'كشري الفيروز الراق بالبصل الذهبي',
    englishName: 'Fine Dining Gourmet Koshary',
    category: 'tajin',
    price: 260,
    rating: 4.7,
    reviewsCount: 210,
    description: 'إعادة ابتكار ملكية لطبق الشعب الأول: أرز بسمتي مع العدس البني المقرمش، حمص الشام المتبل، تقلية البصل الذهبي المكرمل، وصلصة الثوم والخل الحارة الفاخرة.',
    image: '/src/assets/images/koshary_gourmet_1786055072823.jpg',
    ingredients: ['أرز بسمتي فاخر', 'عدس بني جبة', 'حمص الشام', 'بصل مقرمش', 'صلصة طماطم بالثوم والخل'],
    calories: 520,
    prepTime: '15 دقيقة',
    badge: 'نباتي',
    spiceLevel: 2
  },
  {
    id: 'm5',
    name: 'أم علي بالرقاق والمكسرات ورقائق الذهب',
    englishName: 'Royal Umm Ali with Pistachios & Gold Leaf',
    category: 'desserts',
    price: 240,
    rating: 4.9,
    reviewsCount: 175,
    description: 'رقاق هش محمص مسبوقاً بالحليب الطازج الكثيف والقشطة البلدية المخفوقة، مع مكسرات الفستق الحلبي، اللوز المحمص، ورقائق الذهب القابلة للأكل.',
    image: '/src/assets/images/umm_ali_dessert_1786055060752.jpg',
    ingredients: ['رقاق بلدي محمص', 'حليب كامل الدسم', 'قشطة بلدية مخفوقة', 'فستق حلبي ولوز', 'رقائق ذهب فاخرة'],
    calories: 540,
    prepTime: '15 دقيقة',
    badge: 'الأكثر طلباً',
    spiceLevel: 0
  },
  {
    id: 'm6',
    name: 'طاجن عكاوي بالبصل الأورمة والبهارات المصرية',
    englishName: 'Oxtail Tajine with Caramelized Onions',
    category: 'tajin',
    price: 690,
    rating: 4.9,
    reviewsCount: 118,
    description: 'عكاوي بقرية طرية ناضجة على نار هادئة لمدة 6 ساعات في الفخار الحراري مع بصل الأورمة الصغير المستورد وزيت الزيتون البكر مع خبز المحمص.',
    image: '/src/assets/images/royal_duck_molokhia_1786055047783.jpg',
    ingredients: ['عكاوي بقرية ممتاز', 'بصل أورمة صغير', 'حبهان ومستكة', 'طماطم طازجة', 'مرق العظام المكثف'],
    calories: 780,
    prepTime: '30 دقيقة',
    badge: 'توقيع الشيف',
    spiceLevel: 1
  },
  {
    id: 'm7',
    name: 'حواوشي قصر الفيروز بالفحم والموزاريلا',
    englishName: 'Stuffed Gourmet Charcoal Hawawshi',
    category: 'appetizers',
    price: 320,
    rating: 4.8,
    reviewsCount: 88,
    description: 'خبز بلدي طازج محشو باللحم البلدي المفروم مع الفلفل الألوان والمستكة، مشوي على الفحم ومحشو بجوزة الطيب والجبن البلدي الذائب.',
    image: '/src/assets/images/egyptian_mixed_grill_1786055034487.jpg',
    ingredients: ['لحم بلدي مفروم', 'فلفل حار وحلو', 'بهارات الحواوشي الفاخرة', 'خبز بلدي مقرمش', 'سمن بلدي'],
    calories: 610,
    prepTime: '20 دقيقة',
    badge: 'جديد',
    spiceLevel: 2
  },
  {
    id: 'm8',
    name: 'عصير كركديه أسواني مثلج مع الورد والنعناع',
    englishName: 'Iced Aswan Hibiscus with Rose & Mint',
    category: 'beverages',
    price: 110,
    rating: 4.9,
    reviewsCount: 230,
    description: 'مستخلص زهور الكركديه الأسواني المعتق والمستخلص على البارد، محلى بعسل النحل الطبيعي ومزين بماء الورد البلدي وأوراق النعناع الطازج.',
    image: '/src/assets/images/nile_terrace_view_1786055142767.jpg',
    ingredients: ['زهور كركديه أسواني', 'ماء ورد جوري', 'عسل نحل طازج', 'نعناع بلدي', 'ثلج مجروش'],
    calories: 120,
    prepTime: '5 دقائق',
    badge: 'الأكثر طلباً',
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
    image: '/src/assets/images/royal_duck_molokhia_1786055047783.jpg',
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
    image: '/src/assets/images/egyptian_mixed_grill_1786055034487.jpg',
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
    image: '/src/assets/images/koshary_gourmet_1786055072823.jpg',
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
    image: '/src/assets/images/umm_ali_dessert_1786055060752.jpg',
    ingredients: ['حليب طبيعي فاخر', 'مسحوق السحلب الأصلي', 'مستكة ومسك', 'فستق حلبي ولوز', 'قرفة هندية طازجة'],
    calories: 310,
    prepTime: '10 دقائق',
    badge: 'الأكثر طلباً',
    spiceLevel: 0
  }
];
