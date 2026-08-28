export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return Response.json({ ok: true, app: 'Lotta-app' });
    }

    if (url.pathname === '/manifest.webmanifest') {
      return new Response(JSON.stringify({
        name: 'Min ekonomi',
        short_name: 'Ekonomi',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#f7f4ef',
        theme_color: '#f7f4ef',
        icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }]
      }), { headers: { 'content-type': 'application/manifest+json; charset=UTF-8' } });
    }

    if (url.pathname === '/icon.svg') {
      return new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><rect width="1024" height="1024" rx="220" fill="#F2E3D7"/><g fill="#111111"><circle cx="512" cy="270" r="74"/><circle cx="730" cy="396" r="74"/><circle cx="730" cy="628" r="74"/><circle cx="512" cy="754" r="74"/><circle cx="294" cy="628" r="74"/><circle cx="294" cy="396" r="74"/></g></svg>`, { headers: { 'content-type': 'image/svg+xml; charset=UTF-8', 'cache-control': 'public, max-age=31536000, immutable' } });
    }

    return new Response(`<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#f7f4ef">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Ekonomi">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/icon.svg">
  <link rel="apple-touch-icon-precomposed" href="/icon.svg">
  <title>Min ekonomi</title>
  <style>
    *{box-sizing:border-box}
    body{margin:0;background:#f7f4ef;color:#272522;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    main{max-width:760px;margin:auto;padding:28px 18px 44px}
    .top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:26px}
    .eyebrow{font-size:13px;letter-spacing:.08em;color:#8a837b;text-transform:uppercase}
    h1{font-size:34px;line-height:1.05;margin:6px 0 0}
    .month{border:1px solid #ded8d0;background:#fff;border-radius:12px;padding:9px 12px;color:#5e5953}
    .balance{background:#2d2b29;color:#fff;border-radius:24px;padding:24px;margin-bottom:16px}
    .balance span{color:#cfcac3;font-size:14px}.balance strong{display:block;font-size:38px;margin:5px 0 18px}
    .progress{height:8px;background:#514e4a;border-radius:99px;overflow:hidden}.progress i{display:block;width:62%;height:100%;background:#fff;border-radius:99px}
    .stats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:16px}
    .card{background:#fff;border-radius:20px;padding:19px;box-shadow:0 3px 18px rgba(0,0,0,.045)}
    .stat small{color:#8a837b}.stat strong{display:block;font-size:23px;margin-top:5px}
    section{margin-top:16px}.section-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.section-head h2{font-size:20px;margin:0}.link{border:0;background:none;color:#756e66;font-size:14px}
    .row{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #eee9e3}.row:last-child{border-bottom:0}.icon{width:42px;height:42px;border-radius:13px;background:#f1eee9;display:grid;place-items:center;font-size:20px}.row .info{flex:1}.info strong{display:block}.info small{color:#8a837b}.amount{font-weight:600}.negative{color:#514c47}
    .actions{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.action{border:0;border-radius:16px;background:#fff;padding:16px;text-align:left;font:inherit;box-shadow:0 3px 18px rgba(0,0,0,.045);cursor:pointer}.action b{display:block;margin-bottom:4px}.action span{font-size:13px;color:#827b73}
    .categories{display:grid;gap:12px}.cat{display:grid;grid-template-columns:105px 1fr 55px;gap:10px;align-items:center;font-size:14px}.bar{height:9px;background:#eee9e3;border-radius:99px;overflow:hidden}.bar i{display:block;height:100%;background:#57534e;border-radius:99px}
    footer{margin-top:28px;text-align:center;color:#918a82;font-size:12px}
    @media(min-width:650px){.stats{grid-template-columns:repeat(4,1fr)}.actions{grid-template-columns:repeat(4,1fr)}}
  </style>
</head>
<body>
<main>
  <header class="top">
    <div><div class="eyebrow">Din ekonomi</div><h1>Augusti</h1></div>
    <div class="month">2026 ▾</div>
  </header>

  <div class="balance">
    <span>Kvar efter planerade utgifter</span>
    <strong id="balance">18 450 kr</strong>
    <div class="progress"><i></i></div>
  </div>

  <div class="stats">
    <div class="card stat"><small>Inkomster</small><strong>42 000 kr</strong></div>
    <div class="card stat"><small>Utgifter</small><strong>23 550 kr</strong></div>
    <div class="card stat"><small>Räkningar</small><strong>14 200 kr</strong></div>
    <div class="card stat"><small>Sparat</small><strong>4 000 kr</strong></div>
  </div>

  <section>
    <div class="section-head"><h2>Snabbt</h2></div>
    <div class="actions">
      <button class="action" onclick="addExpense()"><b>＋ Utgift</b><span>Lägg till köp</span></button>
      <button class="action" onclick="addIncome()"><b>＋ Inkomst</b><span>Lägg till pengar</span></button>
      <button class="action" onclick="addReceipt()"><b>▣ Kvitto</b><span>Registrera kvitto</span></button>
      <button class="action" onclick="showSummary()"><b>↗ Översikt</b><span>Se sammanfattning</span></button>
    </div>
  </section>

  <section class="card">
    <div class="section-head"><h2>Senaste</h2><button class="link" onclick="showAll()">Visa alla</button></div>
    <div id="transactions">
      <div class="row"><div class="icon">🛒</div><div class="info"><strong>Mercadona</strong><small>Mat · idag</small></div><div class="amount negative">− 64 kr</div></div>
      <div class="row"><div class="icon">🏠</div><div class="info"><strong>Hyra</strong><small>Boende · 1 aug</small></div><div class="amount negative">− 9 800 kr</div></div>
      <div class="row"><div class="icon">💼</div><div class="info"><strong>Lön</strong><small>Inkomst · 25 aug</small></div><div class="amount">+ 42 000 kr</div></div>
    </div>
  </section>

  <section class="card">
    <div class="section-head"><h2>Utgifter per kategori</h2></div>
    <div class="categories">
      <div class="cat"><span>Boende</span><div class="bar"><i style="width:82%"></i></div><b>9 800</b></div>
      <div class="cat"><span>Mat</span><div class="bar"><i style="width:46%"></i></div><b>3 250</b></div>
      <div class="cat"><span>Transport</span><div class="bar"><i style="width:25%"></i></div><b>1 720</b></div>
      <div class="cat"><span>Övrigt</span><div class="bar"><i style="width:34%"></i></div><b>2 380</b></div>
    </div>
  </section>

  <footer>Första byggversionen · nästa steg blir riktiga poster, kvitton och sparad data.</footer>
</main>
<script>
  function money(n){return new Intl.NumberFormat('sv-SE').format(n)+' kr'}
  function addExpense(){const v=prompt('Vad kostade utgiften?'); if(!v)return; const n=Number(v.replace(',','.')); if(!Number.isFinite(n))return alert('Skriv ett belopp.'); const b=18450-n; document.getElementById('balance').textContent=money(b); alert('Utgiften är tillagd i denna prototyp. Nästa version sparar den permanent.')}
  function addIncome(){const v=prompt('Hur mycket fick du in?'); if(!v)return; const n=Number(v.replace(',','.')); if(!Number.isFinite(n))return alert('Skriv ett belopp.'); const b=18450+n; document.getElementById('balance').textContent=money(b); alert('Inkomsten är tillagd i denna prototyp.')}
  function addReceipt(){alert('Kvittofunktionen kommer härnäst — med uppladdning och automatisk registrering.')}
  function showSummary(){alert('Augusti\\n\\nInkomster: 42 000 kr\\nUtgifter: 23 550 kr\\nSparat: 4 000 kr\\nKvar: 18 450 kr')}
  function showAll(){alert('Transaktionslistan byggs ut i nästa steg.')}
</script>
</body>
</html>`,{headers:{'content-type':'text/html; charset=UTF-8'}});
  }
};