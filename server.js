import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.json({ limit: "100kb" }));

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// إعدادات الموقع
app.get("/api/config", (req, res) => {
  res.json({
    whatsapp: String(process.env.WHATSAPP_NUMBER || "").replace(/\D/g, ""),
    instagram:
      process.env.INSTAGRAM_URL ||
      "https://www.instagram.com/mohamed__mobile/"
  });
});

// ملفات الموقع
app.use(
  express.static(path.join(__dirname, "public"))
);

// معالجة الأخطاء
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "حدث خطأ في الخادم"
  });
});

export default app;
