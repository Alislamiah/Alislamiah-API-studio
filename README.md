<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alislamiah API Studio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #0a0f1a;
            color: #e2e8f0;
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* ===== VIDEO INTRO ===== */
        #video-stage {
            position: fixed;
            inset: 0;
            z-index: 1000;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #intro-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        #continue-btn {
            position: absolute;
            bottom: 12%;
            left: 50%;
            transform: translateX(-50%);
            padding: 16px 36px;
            font-size: 1.15rem;
            font-weight: 600;
            color: #fff;
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: none;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 0 30px rgba(2, 132, 199, 0.5), 0 8px 25px rgba(0,0,0,0.4);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.6s ease, transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 10;
        }

        #continue-btn.visible {
            opacity: 1;
            pointer-events: auto;
        }

        #continue-btn:hover {
            transform: translateX(-50%) scale(1.05);
            box-shadow: 0 0 40px rgba(56, 189, 248, 0.6), 0 10px 30px rgba(0,0,0,0.5);
        }

        /* ===== HERO / LANDING ===== */
        #hero-stage {
            display: none;
            min-height: 100vh;
            position: relative;
            background: #0a0f1a;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            text-align: center;
        }

        #hero-stage.active {
            display: flex;
        }

        .hero-image-wrapper {
            position: relative;
            width: 100%;
            max-width: 420px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 0 60px rgba(2, 132, 199, 0.25), 0 20px 50px rgba(0,0,0,0.5);
            margin-bottom: 32px;
        }

        .hero-image-wrapper img {
            width: 100%;
            display: block;
            border-radius: 20px;
        }

        .hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(10,15,26,0.85) 0%, rgba(10,15,26,0.3) 50%, transparent 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            padding: 30px 20px;
        }

        .hero-title {
            font-size: 1.45rem;
            font-weight: 700;
            color: #fff;
            margin-bottom: 8px;
            text-shadow: 0 2px 12px rgba(0,0,0,0.6);
            line-height: 1.3;
        }

        .hero-subtitle {
            font-size: 0.95rem;
            color: #94a3b8;
            margin-bottom: 24px;
        }

        .start-btn {
            padding: 14px 40px;
            font-size: 1.1rem;
            font-weight: 600;
            color: #0a0f1a;
            background: linear-gradient(135deg, #38bdf8, #0ea5e9);
            border: none;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 0 25px rgba(56, 189, 248, 0.4);
            transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .start-btn:hover {
            transform: scale(1.06);
            box-shadow: 0 0 35px rgba(56, 189, 248, 0.6);
        }

        /* ===== MAIN STUDIO ===== */
        #studio-stage {
            display: none;
            min-height: 100vh;
            padding: 40px 20px;
            justify-content: center;
            align-items: flex-start;
            background: radial-gradient(ellipse at top, #0f172a 0%, #0a0f1a 70%);
        }

        #studio-stage.active {
            display: flex;
        }

        .container {
            background: rgba(30, 41, 59, 0.85);
            backdrop-filter: blur(12px);
            padding: 36px 32px;
            border-radius: 16px;
            width: 100%;
            max-width: 480px;
            box-shadow: 0 0 40px rgba(2, 132, 199, 0.15), 0 25px 50px rgba(0,0,0,0.4);
            border: 1px solid rgba(51, 65, 85, 0.6);
        }

        h2 {
            color: #38bdf8;
            margin-bottom: 28px;
            text-align: center;
            font-size: 1.45rem;
            font-weight: 700;
            letter-spacing: -0.3px;
        }

        .step {
            display: none;
            animation: fadeIn 0.4s ease;
        }

        .step.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #94a3b8;
            font-size: 0.9rem;
        }

        input[type="text"] {
            width: 100%;
            padding: 14px 16px;
            margin-bottom: 24px;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 10px;
            color: #f1f5f9;
            font-size: 1rem;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        input[type="text"]:focus {
            outline: none;
            border-color: #0284c7;
            box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.2);
        }

        input[type="text"]::placeholder {
            color: #64748b;
        }

        button.action-btn {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }

        button.action-btn:hover {
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(2, 132, 199, 0.35);
        }

        .result-box {
            background: #0f172a;
            padding: 14px 16px;
            border-radius: 10px;
            border: 1px solid #334155;
            margin-bottom: 20px;
            word-break: break-all;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.85rem;
            color: #38bdf8;
            line-height: 1.5;
        }

        #codeSnippet {
            font-size: 0.72rem;
            color: #94a3b8;
            max-height: 280px;
            overflow-y: auto;
            white-space: pre-wrap;
        }

        .success-badge {
            display: inline-block;
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            font-size: 0.8rem;
            padding: 4px 12px;
            border-radius: 20px;
            margin-bottom: 16px;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .logo-text {
            text-align: center;
            margin-bottom: 8px;
            font-size: 0.85rem;
            color: #64748b;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
    </style>
</head>
<body>

    <!-- STAGE 0: Fullscreen Video -->
    <div id="video-stage">
        <video id="intro-video" autoplay muted playsinline>
            <source src="intro.mp4" type="video/mp4">
        </video>
        <button id="continue-btn" onclick="goToHero()">Continue to Alislamiah API studio</button>
    </div>

    <!-- STAGE 1: Hero / Landing -->
    <div id="hero-stage">
        <div class="hero-image-wrapper">
            <img src="hero-frame.jpg" alt="Alislamiah API">
            <div class="hero-overlay">
                <div class="hero-title">Build your models with<br>Alislamiah API</div>
                <div class="hero-subtitle">Powerful • Fast • Ready for production</div>
                <button class="start-btn" onclick="goToStudio()">Start project</button>
            </div>
        </div>
    </div>

    <!-- STAGE 2: Studio (original logic) -->
    <div id="studio-stage">
        <div class="container">
            <div class="logo-text">Alislamiah API Studio</div>

            <!-- Step 1: Project Name -->
            <div id="step1" class="step active">
                <h2>مشروع جديد</h2>
                <label>Project Name</label>
                <input type="text" id="projectName" placeholder="أدخل اسم المشروع">
                <button class="action-btn" onclick="nextStep()">Next</button>
            </div>

            <!-- Step 2: Name Key -->
            <div id="step2" class="step">
                <h2>إنشاء مفتاح API</h2>
                <label>Project ID</label>
                <div class="result-box" id="displayId"></div>
                <label>Name your API Key</label>
                <input type="text" id="keyName" placeholder="أدخل اسم المفتاح">
                <button class="action-btn" onclick="generateKey()">توليد المفتاح وكود الاستدعاء</button>
            </div>

            <!-- Step 3: Result -->
            <div id="step3" class="step">
                <h2>تم إنشاء المفتاح بنجاح</h2>
                <div class="success-badge">100 رسالة مجانية</div>
                <label>مفتاحك</label>
                <div class="result-box" id="finalKey"></div>
                <label>كود التثبيت والربط بـ Gemalot</label>
                <div class="result-box" id="codeSnippet"></div>
                <button class="action-btn" onclick="location.reload()" style="margin-top: 10px;">إنشاء مشروع آخر</button>
            </div>
        </div>
    </div>

    <script>
        let projId = "";

        // Video handling
        const video = document.getElementById('intro-video');
        const continueBtn = document.getElementById('continue-btn');

        video.addEventListener('ended', () => {
            continueBtn.classList.add('visible');
        });

        // Fallback if video fails to play or already ended
        video.addEventListener('error', () => {
            continueBtn.classList.add('visible');
        });

        // Ensure play starts
        video.play().catch(() => {
            // Autoplay blocked – still show button after a short delay
            setTimeout(() => continueBtn.classList.add('visible'), 1500);
        });

        function goToHero() {
            document.getElementById('video-stage').style.display = 'none';
            document.getElementById('hero-stage').classList.add('active');
        }

        function goToStudio() {
            document.getElementById('hero-stage').classList.remove('active');
            document.getElementById('studio-stage').classList.add('active');
        }

        // Original functions – unchanged logic
        function nextStep() {
            const name = document.getElementById('projectName').value.trim();
            if (!name) return alert('الرجاء إدخال اسم المشروع');
            const randomNum = Math.floor(100000 + Math.random() * 900000);
            projId = `${name}-${randomNum}`;
            document.getElementById('displayId').innerText = projId;
            document.getElementById('step1').classList.remove('active');
            document.getElementById('step2').classList.add('active');
        }

        function generateKey() {
            const kName = document.getElementById('keyName').value.trim();
            if (!kName) return alert('الرجاء تسمية المفتاح');

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
