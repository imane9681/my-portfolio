// Hero.js
import React, { useState, useEffect } from 'react';
import {  
  FiDownload, 
  FiArrowRight, 
  FiChevronDown,
  FiCode,
  FiPenTool,
  FiZap,
  FiBriefcase,
  FiCalendar,
  FiAward,
} from 'react-icons/fi';
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaTwitter, 

} from 'react-icons/fa';
import { HiOutlineSparkles, HiOutlineBadgeCheck } from 'react-icons/hi';
import { MdRocketLaunch } from 'react-icons/md';

function Hero({ onNavClick }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const words = [
    { text: 'Full-Stack Developer', icon: <FiCode className="w-6 h-6" />, color: '#fab876', description: 'Building scalable web applications' },
    { text: 'UI/UX Designer', icon: <FiPenTool className="w-6 h-6" />, color: '#E4A488', description: 'Creating intuitive interfaces' },
    { text: 'Creative Problem Solver', icon: <FiZap className="w-6 h-6" />, color: '#f5b195', description: 'Turning ideas into reality' }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  const socialIcons = [
    { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedinIn, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' }
  ];

  const stats = [
    { value: '5+', label: 'Projects Completed', icon: <FiBriefcase className="w-4 h-4" />, color: '#FBB267' },
    { value: '2+', label: 'Years Experience', icon: <FiCalendar className="w-4 h-4" />, color: '#E4A488' },
    { value: '100%', label: 'Client Satisfaction', icon: <HiOutlineBadgeCheck className="w-4 h-4" />, color: '#9C76B2' }
  ];

 /* const handleDownloadCV = () => {
  window.open('/cv.html', '_blank');
  };*/

  const handleDownloadCV = () => {
    // إنشاء رابط لملف الـ PDF الموجود في مجلد public
    const link = document.createElement('a');
    link.href = '/Imane_Bouasla_CV.pdf'; 
    link.download = 'Imane_Bouasla_CV.pdf'; // اسم الملف عند التحميل
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <section className="relative w-full min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-b from-[#17447E] via-[#404C99] via-[#733A91] to-[#5F2C78] md:bg-none" 
  id="Home">
      
      {/* Animated Background Orbs - More Dynamic */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FBB267]/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D5775D]/15 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9C76B2]/8 rounded-full blur-[150px] animate-pulse-slow delay-2000" />
        <div className="absolute top-40 right-20 w-64 h-64 bg-[#FBB267]/5 rounded-full blur-[100px] animate-pulse-slow delay-500" />
      </div>

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FBB267]/5 via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#9C76B2]/5 via-transparent to-transparent opacity-30" />

      {/* Floating Particles - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
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

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] px-6 md:px-12 lg:px-16">
        <div className="max-w-9xl mx-auto w-full">
          {/* Desktop: grid with 2 columns, Tablet/Mobile: flex column-reverse so image appears above text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            
            {/* Left Content - Desktop: social vertical + text, Tablet/Mobile: text first then social horizontal below buttons */}
            <div className="flex gap-10">
              {/* Social Links - Desktop: vertical, Tablet/Mobile: horizontal (handled by responsive classes) */}
              <div className="hidden lg:flex flex-col justify-center gap-8 animate-fade-in-up">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-[#D5775D] hover:to-[#FBB267] transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-[#fab876]/50 hover:border-transparent"
                  >
                    <social.icon className="w-7 h-7 text-white/80 group-hover:text-white transition-colors" />
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-white/60 text-xs">
                      {social.label}
                    </div>
                  </a>
                ))}
              </div>

              <div className="text-center lg:text-left w-full">
                {/* Status Badge - Refined */}
                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in-up border border-white/10 shadow-lg">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">Available for work</span>
                  <HiOutlineSparkles className="w-3.5 h-3.5 text-[#FBB267] animate-pulse" />
                </div>

                {/* Greeting with decorative line */}
                <div className="overflow-hidden mb-2">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="hidden md:block w-8 h-px bg-gradient-to-r from-[#FBB267] to-transparent" />
                    <h2 className="text-white/60 text-base md:text-lg tracking-wide animate-slide-up">
                      Hello, I'm
                    </h2>
                  </div>
                </div>

                {/* Name with enhanced gradient */}
                <div className="overflow-hidden">
                  <h1 className="text-5xl md:text-5xl lg:text-[3.8vw] font-bold mb-4 animate-slide-up tracking-tight">
                    <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                      Imane Bouasla
                    </span>
                  </h1>
                </div>

                {/* Animated Title with Icon - Enhanced */}
                <div className="mb-5 animate-fade-in-up">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <div 
                      className="  transition-all duration-500 transform group"
                      style={{ color: words[currentWordIndex].color }}
                    >
                      <div className="hidden md:block p-3 rounded-xl bg-white/5 backdrop-blur-sm">
                        {words[currentWordIndex].icon}
                      </div>
                    </div>
                    <div>
                      <p className="w-[350px] lg:w-[600px] md:w-auto text-white/80 text-2xl md:text-3xl lg:text-[2.7vw]">
                        <span className="text-lg md:text-xl lg:text-[2.7vw] text-white/60 mr-2">I'm a</span>
                        <span 
                          className="font-semibold transition-all duration-500 "
                          style={{ color: words[currentWordIndex].color }}
                        >
                          {words[currentWordIndex].text}
                        </span>
                      </p>
                      <p className="text-white/40 text-sm mt-1">
                        {words[currentWordIndex].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description - Enhanced */}
                <p className="text-white/60 text-base md:text-lg lg:text-[1.2vw] leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6 lg:mb-8 animate-fade-in-up">
                  Building complete digital experiences that combine aesthetic design with robust functionality, 
                  delivered ready for launch. Passionate about creating solutions that make a difference.
                </p>

                {/* Stats - Refined Cards */}
                <div className={`lg:flex lg:justify-start grid grid-cols-2  md:grid-cols-3 gap-4 mb-6 lg:mb-10 animate-fade-in-up }`}>
                  {stats.map((stat, index) => (
                   <div 
                   key={index} 
                   className={`group relative ${
                   stats.length === 3 && index === 2 ? 'col-span-2 md:col-span-1 md:justify-self-auto  justify-self-center  ' : ''
                   }`}
                   >
                      <div className="  absolute inset-0 bg-gradient-to-r from-[#FBB267]/20 to-[#D5775D]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative  flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                        <div 
                          className="p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${stat.color}20` }}
                        >
                          <div style={{ color: stat.color }}>
                            {stat.icon}
                          </div>
                        </div>
                        <div>
                          <div className="text-white font-bold text-xl">{stat.value}</div>
                          <div className="text-white/40 text-xs">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons - Enhanced */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6 animate-fade-in-up">
                  <button 
                    onClick={handleDownloadCV} 
                    className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D5775D] to-[#FBB267] text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <span className="relative z-10 flex items-center gap-2">
                      <FiDownload className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                      Download CV
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FBB267] to-[#D5775D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                  
                  <button onClick={() => onNavClick('contact')} className="group relative px-8 py-3.5 rounded-full border-2 border-white/30 text-white font-semibold hover:border-white/60 transition-all duration-300 overflow-hidden hover:shadow-xl">
                    <span className="relative z-10 flex items-center gap-2">
                      Contact Me
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </div>

                {/* Social Links - Tablet/Mobile only (below buttons) */}
                <div className="flex lg:hidden justify-center items-center gap-6 mt-4 animate-fade-in-up">
                  {socialIcons.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-2.5 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-[#D5775D] hover:to-[#FBB267] transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-[#fab876]/50 hover:border-transparent"
                    >
                      <social.icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Image with Enhanced Effects (Desktop: ml-48, Tablet/Mobile: no margin, appears above text) */}
            <div className="relative lg:ml-48 mt-8 lg:mt-0 order-first lg:order-last mb-8 md:mb-10 lg:mb-0">
              <div className="relative flex justify-center items-center group">
                {/* Animated Rings */}
                <div className="absolute w-64 h-64 md:w-80 md:h-80 lg:w-[35vw] lg:h-[35vw] rounded-full border border-[#FBB267]/20 animate-spin-slow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#FBB267] rounded-full" />
                </div>
                <div className="absolute w-52 h-52 md:w-64 md:h-64 lg:w-[30vw] lg:h-[30vw] rounded-full border border-[#D5775D]/20 animate-spin-slow-reverse">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-[#D5775D] rounded-full" />
                </div>
                <div className="absolute w-40 h-40 md:w-52 md:h-52 lg:w-[25vw] lg:h-[25vw] rounded-full border border-[#9C76B2]/20 animate-spin-medium">
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#9C76B2] rounded-full" />
                </div>

                <div className="absolute ">
                 <img  src="/images/Group121.png" alt="Imane Bouasla"  className="w-[65vw] md:w-[40vw] lg:w-[32vw] h-full" />
                </div>
                

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FBB267]/30 to-[#D5775D]/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 opacity-50" />
                
                {/* Main Image Container */}
                <div className="relative">
                  <img 
                    src="/images/lmbi.png" 
                    alt="Imane Bouasla" 
                    className="w-[45vw] sm:w-[22vw] md:w-[25vw] lg:w-[20vw] h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                
                  {/* Floating Info Cards - Enhanced */}
                  <div className="absolute hidden md:block -top-4 -right-8 md:-right-16 bg-white/10 backdrop-blur-md rounded-2xl px-3 md:px-4 py-1.5 md:py-2 border border-white/20 animate-float-slow shadow-lg">
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-[#FBB267]/20 flex items-center justify-center">
                        <FiCode className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#FBB267]" />
                      </div>
                      <span className="text-white text-[10px] md:text-xs font-medium">Full-Stack</span>
                    </div>
                  </div>

                  <div className="absolute hidden md:block -bottom-4 -left-8 md:-left-14 bg-white/10 backdrop-blur-md rounded-2xl px-3 md:px-4 py-1.5 md:py-2 border border-white/20 animate-float-slow-delay shadow-lg">
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-[#D5775D]/20 flex items-center justify-center">
                        <FiPenTool className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#D5775D]" />
                      </div>
                      <span className="text-white text-[10px] md:text-xs font-medium">UI/UX Expert</span>
                    </div>
                  </div>

                  {/* Experience Badge - Enhanced */}
                  <div className="absolute hidden md:block top-0 md:top-7 -left-12 md:-left-16 bg-gradient-to-r from-[#FBB267] to-[#D5775D] rounded-2xl px-2 md:px-4 py-1 md:py-2 shadow-xl animate-pulse-slow">
                    <div className="flex items-center gap-1 md:gap-2">
                      <MdRocketLaunch className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white" />
                      <div>
                        <span className="text-white text-[10px] md:text-xs font-bold">2+ Years</span>
                        <p className="text-white/80 text-[8px] md:text-[10px]">Experience</p>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  <div className="absolute hidden md:block bottom-4 md:bottom-12 -right-12 md:-right-24 bg-white/10 backdrop-blur-md rounded-2xl px-2 md:px-3 py-1 md:py-1.5 border border-white/20 animate-float-slow shadow-lg">
                    <div className="flex items-center gap-1">
                      <FiAward className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#FBB267]" />
                      <span className="text-white text-[8px] md:text-[10px] font-medium">Top Designer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Enhanced */}
      <div className=" relative mb-3 mt-7  lg:absolute  lg:bottom-[2%] left-1/2 -translate-x-1/2 animate-bounce-slow">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/30 text-xs tracking-wider uppercase">Scroll to explore</span>
          <div className="relative w-6 h-10 border border-white/30 rounded-full flex justify-center">
            <div className="absolute bottom-2">
              <FiChevronDown className="w-3 h-3 text-white/50 animate-scroll" />
            </div>
            <div className="absolute top-2 w-1 h-1 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;