const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// قاعدة بيانات لتخزين المفاتيح العشوائية وعداد الـ 100 رسالة
const keysDatabase = {};

// 1. مسار توليد المفتاح العشوائي للمستخدم بحد 100 رسالة
app.post('/api/create-key', (req, res) => {
    const randomStr = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    const randomKey = `AQ.${randomStr.toUpperCase()}`;

    keysDatabase[randomKey] = {
        requestsCount: 0,
        maxLimit: 100
    };

    res.json({
        success: true,
        apiKey: randomKey,
        limit: 100
    });
});

// 2. مسار معالجة الطلبات وجلب الردود من Gemalot Normal
app.post('/api/generate', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: "مفتاح API مفقود" });

    const userKey = authHeader.replace('Bearer ', '').trim();

    // التحقق من وجود المفتاح العشوائي
    if (!keysDatabase[userKey]) {
        return res.status(403).json({ error: "مفتاح API غير صالح" });
    }

    // التحقق من استهلاك الـ 100 رسالة
    if (keysDatabase[userKey].requestsCount >= keysDatabase[userKey].maxLimit) {
        return res.status(429).json({ error: "لقد استنفذت الحد الأقصى (100 رسالة) لهذا المفتاح." });
    }

    try {
        keysDatabase[userKey].requestsCount++;

        // جلب الرد حصرياً من Gemalot Normal عبر الرابط الخاص بك
        const response = await axios.post('https://Alislamiah.github.io/Gemalot/', {
            prompt: req.body.prompt,
            model: "Gemalot-Normal",
            project_id: req.headers['x-project-id']
        });

        res.json({
            status: "success",
            model: "Gemalot Normal",
            response: response.data,
            remaining_requests: keysDatabase[userKey].maxLimit - keysDatabase[userKey].requestsCount
        });

    } catch (error) {
        keysDatabase[userKey].requestsCount--; // استرجاع العداد عند الفشل
        res.status(500).json({ error: "فشل الاتصال بنموذج Gemalot Normal" });
    }
});

app.listen(3000, () => {
    console.log("Alislamiah API (Gemalot Normal) Server running on port 3000");
});
