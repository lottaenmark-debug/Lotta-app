export default {
  async fetch(request) {
    return new Response(`<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Din dag</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f7f4ef;
      color: #2d2b29;
    }

    main {
      max-width: 520px;
      margin: 0 auto;
      padding: 40px 22px;
    }

    .small {
      font-size: 14px;
      color: #817b74;
      margin-bottom: 8px;
    }

    h1 {
      font-size: 36px;
      line-height: 1.1;
      margin: 0 0 12px;
    }

    .intro {
      color: #68625c;
      font-size: 17px;
      line-height: 1.5;
      margin-bottom: 30px;
    }

    .card {
      background: white;
      border-radius: 24px;
      padding: 24px;
      margin-bottom: 18px;
      box-shadow: 0 4px 20px rgba(0,0,0,.05);
    }

    h2 {
      margin-top: 0;
      font-size: 22px;
    }

    button {
      width: 100%;
      border: 0;
      border-radius: 14px;
      padding: 15px;
      font-size: 16px;
      background: #2d2b29;
      color: white;
      cursor: pointer;
    }

    .feelings {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }

    .feeling {
      background: #f1eee9;
      color: #2d2b29;
      padding: 12px 4px;
    }

    textarea {
      width: 100%;
      min-height: 120px;
      border: 1px solid #ddd7d0;
      border-radius: 14px;
      padding: 14px;
      font: inherit;
      resize: vertical;
      margin-bottom: 12px;
    }

    #message {
      margin-top: 12px;
      color: #6b665f;
      text-align: center;
    }
  </style>
</head>

<body>
  <main>
    <div class="small">EN LITEN STUND FÖR DIG</div>
    <h1>Du behöver inte lösa allt idag.</h1>
    <p class="intro">
      Vi tar bara ett litet steg. Sedan ett till.
    </p>

    <section class="card">
      <h2>🌱 Dagens lilla steg</h2>
      <p>
        Gör en enda liten sak som känns bra för dig.
        Det kan vara att gå ut en stund, duscha, lyssna på en låt
        eller bara dricka ett glas vatten.
      </p>
      <button onclick="done()">Jag gjorde mitt lilla steg</button>
      <div id="message"></div>
    </section>

    <section class="card">
      <h2>Hur känns det idag?</h2>

      <div class="feelings">
        <button class="feeling" onclick="checkin('😔')">😔</button>
        <button class="feeling" onclick="checkin('😕')">😕</button>
        <button class="feeling" onclick="checkin('😐')">😐</button>
        <button class="feeling" onclick="checkin('🙂')">🙂</button>
        <button class="feeling" onclick="checkin('😊')">😊</button>
      </div>

      <div id="checkin"></div>
    </section>

    <section class="card">
      <h2>Vill du skriva något?</h2>
      <textarea id="reflection"
        placeholder="Skriv precis det du tänker på..."></textarea>
      <button onclick="saveReflection()">Spara min reflektion</button>
    </section>

    <p class="small">
      Det här är ett stöd för vardagen och ersätter inte mänskligt eller professionellt stöd.
    </p>
  </main>

  <script>
    function done() {
      document.getElementById("message").textContent =
        "❤️ Bra. Ett litet steg räknas.";
    }

    function checkin(feeling) {
      document.getElementById("checkin").textContent =
        "Du valde " + feeling + ". Tack för att du checkade in.";
    }

    function saveReflection() {
      const text = document.getElementById("reflection").value;

      if (!text.trim()) {
        document.getElementById("message").textContent =
          "Skriv något först om du vill spara en reflektion.";
        return;
      }

      localStorage.setItem("reflection", text);

      document.getElementById("message").textContent =
        "🌿 Din reflektion är sparad på den här enheten.";
    }
  </script>
</body>
</html>`, {
      headers: {
        "content-type": "text/html; charset=UTF-8"
      }
    });
  }
};
