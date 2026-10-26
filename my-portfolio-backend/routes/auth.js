const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// المفتاح السري للتوقيع (نستخدم SESSION_SECRET الموجود في Render)
const JWT_SECRET = process.env.SESSION_SECRET || "secret123";

// 1. مسار تسجيل الدخول
router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    // إنشاء توكن صالح لمدة 24 ساعة
    const token = jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: "24h" });
    return res.json({ success: true, token, message: "تم تسجيل الدخول كمشرف" });
  }
  res.status(401).json({ success: false, message: "كلمة السر غير صحيحة" });
});

// 2. مسار تسجيل الخروج (في JWT لا نحتاج لحذف شيء في الخادم)
router.post("/logout", (req, res) => {
  res.json({ success: true, message: "تم تسجيل الخروج" });
});

// 3. مسار التحقق من الحالة (يقرأ التوكن من الهيدر)
router.get("/check", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ isAdmin: false });
  }
  
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ isAdmin: decoded.isAdmin });
  } catch (err) {
    res.json({ isAdmin: false });
  }
});

module.exports = router;