const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// إعداد المرسل (Transporter)
// ملاحظة هامة: ستحتاج إلى وضع بريدك الإلكتروني وكلمة مرور التطبيقات (App Password) هنا
const transporter = nodemailer.createTransport({
  service: "gmail", // أو يمكنك استخدام خدمة أخرى مثل Outlook
  auth: {
    user: process.env.EMAIL_USER, // سيتم أخذها من ملف .env لاحقاً
    pass: process.env.EMAIL_PASS, // سيتم أخذها من ملف .env لاحقاً
  },
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // التحقق من أن الحقول الأساسية موجودة
  if (!firstName || !email || !message) {
    return res.status(400).json({ success: false, message: "Please fill in all required fields." });
  }

  try {
    // إعداد محتوى البريد الإلكتروني
    const mailOptions = {
      from: email, // بريد المرسل (الزائر)
      to: process.env.EMAIL_USER, // بريدك الإلكتروني (المستقبل)
      subject: `New Contact Message from ${firstName} ${lastName || ''}`,
      text: `
        You have received a new message from your portfolio contact form.
        
        Name: ${firstName} ${lastName || ''}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // إرسال البريد
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
  }
});

module.exports = router;