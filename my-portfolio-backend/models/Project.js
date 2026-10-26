const mongoose = require("mongoose");

// تعريف هيكل المشروع (شكل البيانات)
const ProjectSchema = new mongoose.Schema({
  title: String,           // عنوان المشروع
  description: String,     // وصف المشروع
  tags: [String],          // قائمة كلمات مفتاحية
  category: String,        // فئة المشروع (للتطابق مع الإصدارات القديمة)
  categories: [String],    // دعم الفئات المتعددة (جديد)
  img: String,             // مسار الصورة
  
  // ✅ الحقول الجديدة للروابط
  liveLink: String,        // رابط المعاينة المباشرة
  githubLink: String,      // رابط مستودع GitHub
  
  links: [                 // روابط للمشروع (كود + معاينة)
    {
      href: String,        // رابط URL
      icon: String,        // صورة الأيقونة
      title: String        // عنوان الرابط
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,     // وقت الإنشاء تلقائي
  },
});

// تصدير النموذج ليُستخدم في الملفات الأخرى
module.exports = mongoose.model("Project", ProjectSchema);