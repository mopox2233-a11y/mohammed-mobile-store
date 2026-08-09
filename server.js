import express from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

// =========================
// Basic security
// =========================

app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],
        scriptSrc: ["'self'"],
        imgSrc: [
          "'self'",
          "data:",
          "https:"
        ],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"]
      }
    },
    referrerPolicy: {
      policy: "no-referrer"
    }
  })
);

app.use(compression());

app.use(
  express.json({
    limit: "100kb"
  })
);

// =========================
// Rate limit
// =========================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use("/api", limiter);

// =========================
// Admin sessions
// =========================

const sessions = new Map();

function safeEqual(a, b) {
  const x = Buffer.from(String(a ?? ""));
  const y = Buffer.from(String(b ?? ""));

  if (x.length !== y.length) {
    return false;
  }

  return crypto.timingSafeEqual(x, y);
}

function requireAdmin(req, res, next) {
  const token = req.get("x-admin-token");

  if (!token || !sessions.has(token)) {
    return res.status(401).json({
      error: "غير مصرح"
    });
  }

  next();
}

// =========================
// Admin login
// =========================

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body || {};

  const adminUsername = process.env.ADMIN_USERNAME || "";
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (
    !safeEqual(username, adminUsername) ||
    !safeEqual(password, adminPassword)
  ) {
    return res.status(401).json({
      error: "بيانات الدخول غير صحيحة"
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  sessions.set(token, {
    createdAt: Date.now()
  });

  return res.json({
    ok: true,
    token
  });
});

// =========================
// Admin logout
// =========================

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  const token = req.get("x-admin-token");

  sessions.delete(token);

  return res.json({
    ok: true
  });
});

// =========================
// Admin check
// =========================

app.get("/api/admin/check", requireAdmin, (_req, res) => {
  return res.json({
    ok: true
  });
});

// =========================
// Public configuration
// =========================

app.get("/api/config", (_req, res) => {
  return res.json({
    whatsapp: String(
      process.env.WHATSAPP_NUMBER || ""
    ).replace(/\D/g, ""),

    instagram: String(
      process.env.INSTAGRAM_URL ||
        "https://www.instagram.com/mohamed__mobile/"
    )
  });
});

// =========================
// Health check
// =========================

app.get("/api/health", (_req, res) => {
  return res.json({
    ok: true,
    service: "Mohammed Mobile Store"
  });
});

// =========================
// Static website
// =========================

const publicPath = path.join(__dirname, "public");

app.use(
  express.static(publicPath, {
    extensions: ["html"],
    maxAge: "1h"
  })
);

// =========================
// Frontend fallback
// =========================

app.get(/.*/, (_req, res) => {
  res.sendFile(
    path.join(publicPath, "index.html")
  );
});import express from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

// =========================
// Basic security
// =========================

app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],
        scriptSrc: ["'self'"],
        imgSrc: [
          "'self'",
          "data:",
          "https:"
        ],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"]
      }
    },
    referrerPolicy: {
      policy: "no-referrer"
    }
  })
);

app.use(compression());

app.use(
  express.json({
    limit: "100kb"
  })
);

// =========================
// Rate limit
// =========================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use("/api", limiter);

// =========================
// Admin sessions
// =========================

const sessions = new Map();

function safeEqual(a, b) {
  const x = Buffer.from(String(a ?? ""));
  const y = Buffer.from(String(b ?? ""));

  if (x.length !== y.length) {
    return false;
  }

  return crypto.timingSafeEqual(x, y);
}

function requireAdmin(req, res, next) {
  const token = req.get("x-admin-token");

  if (!token || !sessions.has(token)) {
    return res.status(401).json({
      error: "غير مصرح"
    });
  }

  next();
}

// =========================
// Admin login
// =========================

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body || {};

  const adminUsername = process.env.ADMIN_USERNAME || "";
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (
    !safeEqual(username, adminUsername) ||
    !safeEqual(password, adminPassword)
  ) {
    return res.status(401).json({
      error: "بيانات الدخول غير صحيحة"
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  sessions.set(token, {
    createdAt: Date.now()
  });

  return res.json({
    ok: true,
    token
  });
});

// =========================
// Admin logout
// =========================

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  const token = req.get("x-admin-token");

  sessions.delete(token);

  return res.json({
    ok: true
  });
});

// =========================
// Admin check
// =========================

app.get("/api/admin/check", requireAdmin, (_req, res) => {
  return res.json({
    ok: true
  });
});

// =========================
// Public configuration
// =========================

app.get("/api/config", (_req, res) => {
  return res.json({
    whatsapp: String(
      process.env.WHATSAPP_NUMBER || ""
    ).replace(/\D/g, ""),

    instagram: String(
      process.env.INSTAGRAM_URL ||
        "https://www.instagram.com/mohamed__mobile/"
    )
  });
});

// =========================
// Health check
// =========================

app.get("/api/health", (_req, res) => {
  return res.json({
    ok: true,
    service: "Mohammed Mobile Store"
  });
});

// =========================
// Static website
// =========================

const publicPath = path.join(__dirname, "public");

app.use(
  express.static(publicPath, {
    extensions: ["html"],
    maxAge: "1h"
  })
);

// =========================
// Frontend fallback
// =========================

app.get(/.*/, (_req, res) => {
  res.sendFile(
    path.join(publicPath, "index.html")
  );
});// =========================
// Start server locally
// =========================

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(
      Mohammed Mobile Store: http://localhost:${PORT}
    );
  });
}

// =========================
// Vercel / Node export
// =========================

export default app;
