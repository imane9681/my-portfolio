const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    return res.json({ success: true, message: "تم تسجيل الدخول كمشرف" });
  }
  res.status(401).json({ success: false, message: "كلمة السر غير صحيحة" });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "حدث خطأ أثناء تسجيل الخروج" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "تم تسجيل الخروج" });
  });
});

router.get("/check", (req, res) => {
  res.json({ isAdmin: !!req.session.isAdmin });
});

module.exports = router;