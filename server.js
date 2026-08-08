import express from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const app=express();
const PORT=Number(process.env.PORT||3000);
app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy:{directives:{
    defaultSrc:["'self'"],styleSrc:["'self'","'unsafe-inline'","https://fonts.googleapis.com"],
    fontSrc:["'self'","https://fonts.gstatic.com"],scriptSrc:["'self'"],
    imgSrc:["'self'","data:","https:"],connectSrc:["'self'"],objectSrc:["'none'"],
    baseUri:["'self'"],frameAncestors:["'none'"]
  }},
  referrerPolicy:{policy:"no-referrer"}
}));
app.use(compression());
app.use(express.json({limit:"100kb"}));
const limiter=rateLimit({windowMs:15*60*1000,limit:100,standardHeaders:true,legacyHeaders:false});
app.use("/api",limiter);
const sessions=new Map();
const safeEqual=(a,b)=>{const x=Buffer.from(String(a)),y=Buffer.from(String(b));return x.length===y.length&&crypto.timingSafeEqual(x,y)};
const requireAdmin=(req,res,next)=>{const t=req.get("x-admin-token");if(!t||!sessions.has(t))return res.status(401).json({error:"غير مصرح"});next()};
app.post("/api/admin/login",(req,res)=>{
  const {username,password}=req.body||{};
  if(!safeEqual(username,process.env.ADMIN_USERNAME||"")||!safeEqual(password,process.env.ADMIN_PASSWORD||""))
    return res.status(401).json({error:"بيانات الدخول غير صحيحة"});
  const token=crypto.randomBytes(32).toString("hex"); sessions.set(token,Date.now());
  res.json({token});
});
app.post("/api/admin/logout",requireAdmin,(req,res)=>{sessions.delete(req.get("x-admin-token"));res.json({ok:true})});
app.get("/api/admin/check",requireAdmin,(_req,res)=>res.json({ok:true}));
app.get("/api/config",(_req,res)=>res.json({
  whatsapp:String(process.env.WHATSAPP_NUMBER||"").replace(/\D/g,""),
  instagram:String(process.env.INSTAGRAM_URL||"https://www.instagram.com/mohamed__mobile/")
}));
app.use(express.static(path.join(__dirname,"public"),{extensions:["html"],maxAge:"1h"}));
app.get("*splat",(_req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`Mohammed Mobile Store: http://localhost:${PORT}`));
