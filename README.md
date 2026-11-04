<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alislamiah API Studio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, sans-serif; }
        body { background-color: #0f172a; color: #fff; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 20px; }
        .container { background: #1e293b; padding: 30px; border-radius: 12px; width: 100%; max-width: 500px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        h2 { color: #38bdf8; margin-bottom: 20px; text-align: center; }
        .step { display: none; }
        .step.active { display: block; }
        label { display: block; margin-bottom: 8px; font-weight: 600; }
        input[type="text"] { width: 100%; padding: 12px; margin-bottom: 20px; background: #0f172a; border: 1px solid #334155; border-radius: 6px; color: #fff; }
        button { width: 100%; padding: 12px; background: #0284c7; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
        button:hover { background: #0369a1; }
        .result-box { background: #0f172a; padding: 15px; border-radius: 6px; border: 1px solid #334155; margin-bottom: 15px; word-break: break-all; font-family: monospace; font-size: 0.85rem; color: #38bdf8; }
    </style>
</head>
<body>

    <div class="container">
        <!-- الخطوة 1: اسم المشروع -->
        <div id="step1" class="step active">
            <h2>Alislamiah API - مشروع جديد</h2>
            <label>Project Name:</label>
            <input type="text" id="projectName" placeholder="أدخل اسم المشروع">
            <button onclick="nextStep()">Next</button>
        </div>

        <!-- الخطوة 2: تسمية المفتاح وتوليده -->
        <div id="step2" class="step">
            <h2>إنشاء مفتاح API</h2>
            <label>Project ID:</label>
            <div class="result-box" id="displayId"></div>
            <label>Name your API Key:</label>
            <input type="text" id="keyName" placeholder="أدخل اسم المفتاح">
            <button onclick="generateKey()">توليد المفتاح وكود الاستدعاء</button>
        </div>

        <!-- الخطوة 3: عرض المفتاح وكود الربط الموجه لـ Gemalot -->
        <div id="step3" class="step">
            <h2>تم إنشاء المفتاح بنجاح (100 رسالة)</h2>
            <label>مفتاحك:</label>
            <div class="result-box" id="finalKey"></div>
            <label>كود التثبيت والربط بـ Gemalot:</label>
            <div class="result-box" id="codeSnippet" style="font-size: 0.75rem; color: #cbd5e1;"></div>
            <button onclick="location.reload()">إنشاء مشروع آخر</button>
        </div>
    </div>

    <script>
        let projId = "";

        function nextStep() {
            const name = document.getElementById('projectName').value.trim();
            if(!name) return alert('الرجاء إدخال اسم المشروع');
            const randomNum = Math.floor(100000 + Math.random() * 900000);
            projId = `${name}-${randomNum}`;
            document.getElementById('displayId').innerText = projId;
            document.getElementById('step1').classList.remove('active');
            document.getElementById('step2').classList.add('active');
        }

        function generateKey() {
            const kName = document.getElementById('keyName').value.trim();
            if(!kName) return alert('الرجاء تسمية المفتاح');
            
            // توليد مفتاح عشوائي يحاكي الشكل المطلوب
            const randStr = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
            const apiKey = `AQ.${randStr.toUpperCase()}`;

            document.getElementById('finalKey').innerText = apiKey;

            // الكود البرمجي الذي يوجه الردود حصرياً إلى نموذج Gemalot Normal عبر الرابط المطلوب
            const snippet = `
// Alislamiah API - Gemalot Normal Integration
const API_KEY = "${apiKey}";
const PROJECT_ID = "${projId}";
const GEMALOT_ENDPOINT = "https://Alislamiah.github.io/Gemalot/";

async function callGemalot(promptText) {
    const res = await fetch(GEMALOT_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + API_KEY,
            'X-Project-ID': PROJECT_ID
        },
        body: JSON.stringify({ prompt: promptText })
    });
    return await res.json();
}
            `.trim();

            document.getElementById('codeSnippet').innerText = snippet;
            document.getElementById('step2').classList.remove('active');
            document.getElementById('step3').classList.add('active');
        }
    </script>
</body>
</html>
