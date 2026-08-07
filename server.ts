import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Sommelier Endpoint
  app.post('/api/ai-sommelier', async (req, res) => {
    try {
      const { userPreference, occasion, dietary } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({ error: 'مفتاح GEMINI_API_KEY غير متوفر في الإعدادات.' });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `المناسبة: ${occasion || 'عشاء فاخر'}\nالتفضيلات الشخصية: ${userPreference || 'أطباق مصريّة أصلية متوازنة'}\nالمتطلبات الغذائية: ${dietary || 'لا يوجد'}\nاقترح قائمة طعام متكاملة (مقبلات، طبق رئيسي، حلويات، ومشروب ملكي) من قائمة مطعم قصر الفيروز مع شرح جذاب ومحفز للشهية وسبب اختيارك للأطباق.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: `أنت المضيف الملكي "شيف قصر الفيروز" الخبير في المطبخ المصري الأصيل المعاصر بالزمالك، القاهرة. أسلوبك راقٍ ودافئ، مع استخدام مصطلحات ضيافة ملكية مصرية مثل (أهلاً بك في قصر الفيروز، يسعدنا إكرام ضيافتكم، طعم زمان بروح عصرية). قدّم التوصية بشكل منظم وممتع بأسلوب نقاط سهلة القراءة مع ذكر المكونات الفاخرة.`,
        },
      });

      res.json({ recommendation: response.text });
    } catch (error: any) {
      console.error('AI Sommelier error:', error);
      res.status(500).json({ error: 'تعذر الاتصال بمساعد الفيروز الذكي حالياً. يرجى المحاولة لاحقاً.' });
    }
  });

  // In-memory reservations storage
  const reservations: any[] = [
    {
      id: 'RES-8821',
      name: 'د. كريم الخولي',
      phone: '01001234567',
      date: '2026-08-10',
      time: '20:30',
      guests: 4,
      area: 'شرفة النيل الملكية (Nile Terrace)',
      occasion: 'ذكرى زواج',
      notes: 'طاولة بجوار السور مباشرة مع إضاءة خافتة وورود',
      status: 'مؤكد',
      createdAt: new Date().toISOString()
    }
  ];

  app.get('/api/reservations', (_req, res) => {
    res.json(reservations);
  });

  app.post('/api/reservations', (req, res) => {
    const { name, phone, date, time, guests, area, occasion, notes } = req.body;
    if (!name || !phone || !date || !time) {
      return res.status(400).json({ error: 'يرجى إدخال كافة البيانات الأساسية للحجز' });
    }
    const newRes = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      phone,
      date,
      time,
      guests: guests || 2,
      area: area || 'القاعة الملكية الرئيسية',
      occasion: occasion || 'عشاء خاص',
      notes: notes || '',
      status: 'مؤكد',
      createdAt: new Date().toISOString()
    };
    reservations.unshift(newRes);
    res.json({ success: true, reservation: newRes });
  });

  // Serve frontend in dev or prod
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
