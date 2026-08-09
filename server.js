const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MOHAMMED MOBILE STORE</title>
      <style>
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #080808;
          color: white;
          min-height: 100vh;
        }

        header {
          padding: 35px 20px;
          text-align: center;
          background: linear-gradient(135deg, #111, #1b1b1b);
          border-bottom: 1px solid #333;
        }

        h1 {
          margin: 0;
          font-size: 32px;
        }

        .subtitle {
          color: #aaa;
          margin-top: 10px;
        }

        .container {
          max-width: 1100px;
          margin: auto;
          padding: 30px 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .card {
          background: #151515;
          border: 1px solid #292929;
          border-radius: 20px;
          padding: 30px 20px;
          text-align: center;
          transition: .25s;
        }

        .card:hover {
          transform: translateY(-5px);
          border-color: #555;
        }

        .icon {
          font-size: 45px;
          margin-bottom: 15px;
        }

        .card h2 {
          margin: 10px 0;
        }

        .card p {
          color: #999;
        }

        a {
          display: inline-block;
          margin-top: 15px;
          padding: 12px 20px;
          border-radius: 12px;
          text-decoration: none;
          color: white;
          background: #222;
        }

        footer {
          text-align: center;
          padding: 30px;
          color: #777;
        }
      </style>
    </head>

    <body>

      <header>
        <h1>📱 MOHAMMED MOBILE STORE</h1>
        <div class="subtitle">كل ما تحتاجه للموبايل بمكان واحد</div>
      </header>

      <main class="container">

        <div class="grid">

          <div class="card">
            <div class="icon">📱</div>
            <h2>الموبايلات</h2>
            <p>أحدث أجهزة الموبايل</p>
          </div>

          <div class="card">
            <div class="icon">🎧</div>
            <h2>AirPods</h2>
            <p>سماعات وإكسسوارات صوتية</p>
          </div>

          <div class="card">
            <div class="icon">🔋</div>
            <h2>Power Bank</h2>
            <p>بطاريات وشواحن متنقلة</p>
          </div>

          <div class="card">
            <div class="icon">🔌</div>
            <h2>الشواحن</h2>
            <p>شواحن وكابلات</p>
          </div>

          <div class="card">
            <div class="icon">🧩</div>
            <h2>الإكسسوارات</h2>
            <p>كل إكسسوارات الموبايل</p>
          </div>

          <div class="card">
            <div class="icon">🔥</div>
            <h2>العروض</h2>
            <p>أفضل العروض والأسعار</p>
          </div>

          <div class="card">
            <div class="icon">🛒</div>
            <h2>سلة المشتريات</h2>
            <p>راجع المنتجات قبل الطلب</p>
          </div>

          <div class="card">
            <div class="icon">📲</div>
            <h2>تواصل معنا</h2>

            <a href="https://wa.me/9647830000745" target="_blank">
              واتساب
            </a>

            <br>

            <a href="https://www.instagram.com/mohamed__mobile/" target="_blank">
              Instagram
            </a>
          </div>

        </div>

      </main>

      <footer>
        © MOHAMMED MOBILE STORE
      </footer>

    </body>
    </html>
  );
});

module.exports = app;

if (require.main === module) {
  app.listen(process.env.PORT || 3000, () => {
    console.log("MOHAMMED MOBILE STORE running");
  });
}
