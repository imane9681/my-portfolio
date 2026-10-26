// Contact.js - التصميم الأصلي مع وظائف الإرسال
import React, { useEffect, useRef, useState } from 'react';
import { FiMail, FiUser, FiPhone, FiMessageCircle, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'loading', 'success', 'error'
  const sectionRef = useRef(null);

  // حالات الحقول
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');

    const formData = { firstName, lastName, email, phone, message };

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        // تفريغ الحقول
        setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setMessage('');
        setTimeout(() => setFormStatus(null), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full overflow-hidden" 
      id="contact"
      style={{
        background: 'linear-gradient(270deg, #17447E 0%, #404C99 24.52%, #733A91 75%, #5F2C78 100%)'
      }}
    >
      {/* خلفية الهاتف */}
      <style>{`
        @media (max-width: 767px) {
          #contact {
            background: linear-gradient(180deg, #17447E 0%, #404C99 25%, #733A91 75%, #5F2C78 100%) !important;
          }
        }
      `}</style>

      {/* Animated Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FBB267]/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D5775D]/15 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9C76B2]/8 rounded-full blur-[150px] animate-pulse-slow delay-2000" />
        <div className="absolute top-40 right-20 w-64 h-64 bg-[#FBB267]/5 rounded-full blur-[100px] animate-pulse-slow delay-500" />
      </div>

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FBB267]/5 via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#9C76B2]/5 via-transparent to-transparent opacity-30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(251, 178, 103, ${0.1 + Math.random() * 0.2})`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-6 py-12 sm:px-8 md:px-20 lg:px-[6.5vw]  md:py-20 lg:py-20">
        
        {/* الصورة - تظهر أولاً في الهاتف والتابلت فوق العنوان */}
        <div className={`flex justify-center mb-6 md:mb-20 lg:hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex">
            <div className="relative flex justify-center items-center group">
              <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-[#FBB267]/20 animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#FBB267] rounded-full" />
              </div>
              <div className="absolute w-52 h-52 md:w-80 md:h-80 rounded-full border border-[#D5775D]/20 animate-spin-slow-reverse">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-[#D5775D] rounded-full" />
              </div>
              <div className="absolute w-40 h-40 md:w-64 md:h-64 rounded-full border border-[#9C76B2]/20 animate-spin-medium">
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#9C76B2] rounded-full" />
              </div>
              <div className="relative">
                <img src="/images/secretfriend-removebg-preview.png" alt="Contact illustration" className="w-80 h-80 md:w-[500px] lg:h-[500px] object-contain animate-float-slow" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className={`text-center mb-10 md:mb-14 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-5">
            <HiOutlineSparkles className="w-4 h-4 text-[#FBB267]" />
            <span className="text-sm font-medium text-white/80">Get In Touch</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Contact Me
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-[#FBB267] to-[#D5775D] rounded-full mx-auto mb-6" />
          
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear from you. Let's work together to create something amazing.
          </p>
        </div>

        {/* Contact Form and Image - للحاسوب فقط */}
        <div className={`hidden lg:grid lg:grid-cols-2 gap-10 items-center transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="flex">
            <div className="relative flex justify-center items-center group">
              <div className="absolute w-[30vw] h-[30vw] rounded-full border border-[#FBB267]/20 animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#FBB267] rounded-full" />
              </div>
              <div className="absolute w-[25vw] h-[25vw] rounded-full border border-[#D5775D]/20 animate-spin-slow-reverse">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-[#D5775D] rounded-full" />
              </div>
              <div className="absolute w-[20vw] h-[20vw] rounded-full border border-[#9C76B2]/20 animate-spin-medium">
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#9C76B2] rounded-full" />
              </div>
              <div className="relative">
                <img src="/images/secretfriend-removebg-preview.png" alt="Contact illustration" className="w-[35vw] h-[35vw] object-contain animate-float-slow" />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 lg:p-10 shadow-xl border border-white/20">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Send Me a Message</h3>
                <p className="text-white/60 text-sm md:text-base mb-8">Fill out the form below and I'll get back to you as soon as possible.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full pl-12 pr-5 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FBB267] focus:ring-2 focus:ring-[#FBB267]/20 outline-none transition-all" required />
                  </div>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full pl-12 pr-5 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FBB267] focus:ring-2 focus:ring-[#FBB267]/20 outline-none transition-all" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-5 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FBB267] focus:ring-2 focus:ring-[#FBB267]/20 outline-none transition-all" required />
                  </div>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-12 pr-5 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FBB267] focus:ring-2 focus:ring-[#FBB267]/20 outline-none transition-all" />
                  </div>
                </div>

                <div className="relative">
                  <FiMessageCircle className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                  <textarea placeholder="Your Message..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full pl-12 pr-5 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FBB267] focus:ring-2 focus:ring-[#FBB267]/20 outline-none transition-all resize-none" required />
                </div>

                <button type="submit" disabled={formStatus === 'loading'} className="group relative w-full py-3 rounded-xl bg-gradient-to-r from-[#D5775D] to-[#FBB267] text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                    <FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                {formStatus === 'success' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 animate-fade-in">
                    <FiCheckCircle className="w-5 h-5" />
                    <span className="text-sm">Message sent successfully!</span>
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 animate-fade-in">
                    <FiAlertCircle className="w-5 h-5" />
                    <span className="text-sm">Failed to send message. Try again.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* نموذج الاتصال للهاتف والتابلت فقط */}
        <div className={`lg:hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 md:mx-16 shadow-xl border border-white/20">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Send Me a Message</h3>
              <p className="text-white/60 text-sm mb-6">Fill out the form below and I'll get back to you as soon as possible.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FBB267] focus:ring-2 focus:ring-[#FBB267]/20 outline-none transition-all text-sm" required />
                </div>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FBB267] focus:ring-2 focus:ring-[#FBB267]/20 outline-none transition-all text-sm" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FBB267] focus:ring-2 focus:ring-[#FBB267]/20 outline-none transition-all text-sm" required />
                </div>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FBB267] focus:ring-2 focus:ring-[#FBB267]/20 outline-none transition-all text-sm" />
                </div>
              </div>

              <div className="relative">
                <FiMessageCircle className="absolute left-4 top-4 w-4 h-4 text-white/50" />
                <textarea placeholder="Your Message..." rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FBB267] focus:ring-2 focus:ring-[#FBB267]/20 outline-none transition-all resize-none text-sm" required />
              </div>

              <button type="submit" disabled={formStatus === 'loading'} className="group relative w-full py-3 rounded-xl bg-gradient-to-r from-[#D5775D] to-[#FBB267] text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                  <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {formStatus === 'success' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 animate-fade-in">
                  <FiCheckCircle className="w-4 h-4" />
                  <span className="text-xs">Message sent successfully!</span>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 animate-fade-in">
                  <FiAlertCircle className="w-4 h-4" />
                  <span className="text-xs">Failed to send message. Try again.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;