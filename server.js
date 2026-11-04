const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// قاعدة بيانات مخزنة للتحقق من المفاتيح وعداد الـ 100 رسالة
const keysDb = {};

// مسار لتوليد مفتاح جديد بحد 100 رسالة
app.post('/api/create-key', (req, res) => {
    const rand = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    const newKey = `AQ.${rand.toUpperCase()}`;
    
    keysDb[newKey] = { count: 0, limit: 100 };

    res.json({ success: true, apiKey: newKey, remaining: 100 });
});

// مسار معالجة الطلبات وإرسالها لـ Gemalot
app.post('/api/generate', async (req, res) => {
    const auth = req.headers['authorization'];
    if(!auth) return res.status(401).json({ error: "مفتاح API مفقود" });

    const key = auth.replace('Bearer ', '').trim();

    if(!keysDb[key]) {
        return res.status(403).json({ error: "مفتاح API غير صالح" });
    }

    if(keysDb[key].count >= keysDb[key].limit) {
        return res.status(429).json({ error: "لقد استنفدت الحد الأقصى (100 رسالة) لهذا المفتاح." });
    }

    try {
        keysDb[key].count++;

        // جلب الرد من نموذج Gemalot الخاص بك على الرابط المطلوب
        const response = await axios.post('https://Alislamiah.github.io/Gemalot/', {
            prompt: req.body.prompt,
            project_id: req.headers['x-project-id']
        });

        res.json({
            result: response.data,
            remaining_requests: keysDb[key].limit - keysDb[key].count
        });

    } catch (err) {
        keysDb[key].count--; // استرجاع العداد عند الخطأ
        res.status(500).json({ error: "فشل الاتصال بنموذج Gemalot" });
    }
});

app.listen(3000, () => {
    console.log("Alislamiah API Backend is running on port 3000");
});
