const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// ============================================
// 1. إعداد CORS - السماح لكل شيء (للتطوير)
// ============================================
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// ============================================
// 2. إعداد الجلسات
// ============================================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions"
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    }
  })
);

// ============================================
// 3. الاتصال بقاعدة البيانات
// ============================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ============================================
// 4. الملفات الثابتة (الصور)
// ============================================
app.use('/uploads', express.static('uploads'));

// ============================================
// 5. مسار التهيئة
// ============================================
app.get("/api/config", (req, res) => {
  const host = req.get('host');
  const protocol = req.protocol;
  res.json({ serverUrl: `${protocol}://${host}` });
});

// ============================================
// 6. المسارات
// ============================================
const projectRoutes = require("./routes/projects");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// ============================================
// 7. الصفحة الرئيسية
// ============================================
app.get("/", (req, res) => {
  res.send("🎉 Backend is running!");
});

// ============================================
// 8. تشغيل الخادم
// ============================================
app.listen(PORT, HOST, () => {
  console.log(`\n🚀 Server is running on:`);
  console.log(`   📡 http://localhost:${PORT}`);
  console.log(`   📡 http://192.168.100.7:${PORT}`);
  console.log(`   📡 http://192.168.1.103:${PORT}`);
  console.log(`\n✅ Ready to accept requests!\n`);
});