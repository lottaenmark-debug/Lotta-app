export default {
  async fetch(request) {
    return new Response(`<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#f7f4ef">
  <title>Din dag</title>
  <style>
    * { box-sizing: border-box; }
    :root { --bg:#f7f4ef; --ink:#2d2b29; --muted:#746e67; --soft:#f1eee9; --line:#e2dcd5; --accent:#7d9072; }
    body { margin:0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background:var(--bg); color:var(--ink); }
    main { max-width:560px; margin:0 auto; padding:34px 20px 48px; }
    .small { font-size:13px; letter-spacing:.08em; color:#8a837b; margin-bottom:9px; }
    h1 { font-size:38px; line-height:1.08; margin:0 0 12px; letter-spacing:-.03em; }
    .intro { color:var(--muted); font-size:17px; line-height:1.55; margin:0 0 28px; }
    .card { background:#fff; border-radius:24px; padding:22px; margin-bottom:16px; box-shadow:0 4px 20px rgba(0,0,0,.05); }
    h2 { margin:0 0 10px; font-size:21px; }
    p { line-height:1.55; }
    button { width:100%; border:0; border-radius:14px; padding:15px; font-size:16px; font-weight:600; background:var(--ink); color:#fff; cursor:pointer; -webkit-tap-highlight-color:transparent; }
    button:active { transform:scale(.99); }
    .step { color:#5f5952; margin:0 0 17px; }
    .feelings { display:grid; grid-template-columns:repeat(5,1fr); gap:8px; }
    .feeling { background:var(--soft); color:var(--ink); font-size:25px; padding:12px 4px; }
    .feeling.selected { outline:2px solid var(--accent); background:#e9eee5; }
    textarea { width:100%; min-height:125px; border:1px solid var(--line); border-radius:14px; padding:14px; font:inherit; resize:vertical; margin:4px 0 12px; background:#fff; }
    textarea:focus { outline:2px solid #c8d2c1; border-color:#aab8a1; }
    .status { margin:12px 0 0; color:#625d56; text-align:center; min-height:22px; }
    .saved { border-top:1px solid var(--line); margin-top:18px; padding-top:16px; color:#625d56; font-size:14px; }
    .saved strong { color:var(--ink); }
    footer { color:#8a837b; font-size:12px; line-height:1.5; margin-top:24px; }
  </style>
</head>
<body>
  <main>
    <div class="small">EN LITEN STUND FÖR DIG</div>
    <h1>Du behöver inte lösa allt idag.</h1>
    <p class="intro">Vi tar bara ett litet steg. Sedan ett till. ❤️</p>

    <section class="card">
      <h2>🌱 Dagens lilla steg</h2>
      <p class="step">Gör en enda liten sak som känns bra för dig. Det kan vara att gå ut en stund, duscha, lyssna på en låt eller bara dricka ett glas vatten.</p>
      <button id="doneButton" onclick="done()">Jag gjorde mitt lilla steg</button>
      <div id="stepStatus" class="status" aria-live="polite"></div>
    </section>

    <section class="card">
      <h2>Hur känns det idag?</h2>
      <p class="step">Det finns inget rätt svar.</p>
      <div class="feelings" role="group" aria-label="Välj hur det känns idag">
        <button class="feeling" aria-label="Ledsen" onclick="checkin('😔', this)">😔</button>
        <button class="feeling" aria-label="Lite nere" onclick="checkin('😕', this)">😕</button>
        <button class="feeling" aria-label="Neutral" onclick="checkin('😐', this)">😐</button>
        <button class="feeling" aria-label="Ganska bra" onclick="checkin('🙂', this)">🙂</button>
        <button class="feeling" aria-label="Bra" onclick="checkin('😊', this)">😊</button>
      </div>
      <div id="checkin" class="status" aria-live="polite"></div>
    </section>

    <section class="card">
      <h2>Vill du skriva något?</h2>
      <textarea id="reflection" placeholder="Skriv precis det du tänker på..."></textarea>
      <button onclick="saveReflection()">Spara min reflektion</button>
      <div id="reflectionStatus" class="status" aria-live="polite"></div>
      <div id="savedReflection" class="saved" hidden></div>
    </section>

    <footer>Det här är ett stöd för vardagen och ersätter inte mänskligt eller professionellt stöd.</footer>
  </main>

  <script>
    const reflectionKey = 'reflection';

    function done() {
      localStorage.setItem('stepDone', new Date().toISOString().slice(0,10));
      document.getElementById('doneButton').textContent = '✓ Mitt lilla steg är gjort';
      document.getElementById('stepStatus').textContent = '❤️ Bra. Ett litet steg räknas.';
    }

    function checkin(feeling, button) {
      document.querySelectorAll('.feeling').forEach(b => b.classList.remove('selected'));
      button.classList.add('selected');
      localStorage.setItem('feeling', feeling);
      document.getElementById('checkin').textContent = 'Du valde ' + feeling + '. Tack för att du checkade in.';
    }

    function saveReflection() {
      const text = document.getElementById('reflection').value.trim();
      const status = document.getElementById('reflectionStatus');
      if (!text) {
        status.textContent = 'Skriv något först om du vill spara en reflektion.';
        return;
      }
      localStorage.setItem(reflectionKey, text);
      status.textContent = '🌿 Din reflektion är sparad på den här enheten.';
      showSavedReflection(text);
    }

    function showSavedReflection(text) {
      const box = document.getElementById('savedReflection');
      box.hidden = false;
      box.innerHTML = '<strong>Din senaste reflektion</strong><br>' + escapeHtml(text).replace(/\\n/g, '<br>');
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    window.addEventListener('DOMContentLoaded', () => {
      const saved = localStorage.getItem(reflectionKey);
      if (saved) {
        document.getElementById('reflection').value = saved;
        showSavedReflection(saved);
      }
      const today = new Date().toISOString().slice(0,10);
      if (localStorage.getItem('stepDone') === today) done();
      const savedFeeling = localStorage.getItem('feeling');
      if (savedFeeling) {
        const button = [...document.querySelectorAll('.feeling')].find(b => b.textContent === savedFeeling);
        if (button) checkin(savedFeeling, button);
      }
    });
  </script>
</body>
</html>`, {
      headers: { "content-type": "text/html; charset=UTF-8" }
    });
  }
};
