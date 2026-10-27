// Footer.js - مع أيقونات مشابهة لـ Navbar
import React, { useEffect, useRef, useState } from 'react';
import { 
  FiGithub, FiLinkedin, FiTwitter, FiInstagram, 
  FiMail, FiPhone, FiMapPin, 
  FiArrowUp, FiCode, FiTrendingUp, FiGlobe,
  FiCoffee,
} from 'react-icons/fi';
import { 
  FaReact, FaPython, FaJs,
  FaNodeJs, FaGitAlt
} from 'react-icons/fa';
import { 
  HiHome, HiUser, HiCode, HiBriefcase, HiPhone
} from 'react-icons/hi';
import { FiCpu } from 'react-icons/fi';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '#Home', id: 'Home', icon: HiHome },
    { name: 'About', href: '#about', id: 'about', icon: HiUser },
    { name: 'Services', href: '#services', id: 'services', icon: HiCode },
    { name: 'Skills', href: '#skills', id: 'skills', icon: FiCpu },
    { name: 'Projects', href: '#Projects', id: 'Projects', icon: HiBriefcase },
    { name: 'Contact', href: '#contact', id: 'contact', icon: HiPhone },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/imane9681', label: 'GitHub', color: '#333' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/imane-bouasla-001bba42b', label: 'LinkedIn', color: '#0077B5' },
   
  ];

  const techIcons = [
    { icon: FaReact, color: '#61DAFB', name: 'React' },
    { icon: FaPython, color: '#3776AB', name: 'Python' },
    { icon: FaJs, color: '#F7DF1E', name: 'JavaScript' },
    { icon: FaNodeJs, color: '#339933', name: 'Node.js' },
    { icon: FaGitAlt, color: '#F05032', name: 'Git' },
  ];

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative w-full overflow-hidden" id="footer">
      
      {/* خلفية متدرجة */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(270deg, #17447E 0%, #404C99 24.52%, #733A91 75%, #5F2C78 100%)'
        }}
      />
      
      {/* خلفية الهاتف */}
      <div 
        className="absolute inset-0 md:hidden"
        style={{
          background: 'linear-gradient(180deg, #5F2C78 0%, #733A91 25%, #404C99 75%, #17447E 100%)'
        }}
      />

     
     
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#FBB267]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#9C76B2]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D5775D]/5 rounded-full blur-3xl" />
        
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(251, 178, 103, ${0.1 + Math.random() * 0.2})`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 max-w-8xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 pt-8 md:pt-12 pb-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>

             {/* Divider Line */}
        <div className="relative mb-16 ">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#FBB267]/30"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-transparent">
              <div className="w-2 h-2 rounded-full bg-[#FBB267]/50"></div>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-8">
          
          {/* Column 1 - Logo & Bio */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <a 
                href="#Home" 
                onClick={(e) => { e.preventDefault(); handleNavClick('Home'); }}
                className="inline-block group"
              >
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FBB267] to-[#D5775D] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  Portfolio
                </h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#FBB267] to-[#D5775D] rounded-full mt-2 mx-auto md:mx-0 transition-all duration-300 group-hover:w-16" />
              </a>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Crafting beautiful digital experiences that blend creativity with technical excellence.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 text-white/30 text-xs">
              <span className="flex items-center gap-1">
                <FiCode className="w-3 h-3" />
                Full-Stack
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1">
                <FiTrendingUp className="w-3 h-3" />
                UI/UX
              </span>
            </div>
          </div>

          {/* Column 2 - Quick Links with Navbar-style Icons */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-lg mb-5 inline-block relative">
              Quick Links
              <div className="absolute -bottom-2 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-8 h-0.5 bg-[#FBB267] rounded-full" />
            </h4>
            <ul className="gap-3 grid grid-cols-2 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                    className="text-white/50 hover:text-[#FBB267] transition-all duration-300 text-sm flex items-center justify-center md:justify-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#FBB267]/20 transition-all duration-300">
                      <link.icon className="w-4 h-4 text-white/40 group-hover:text-[#FBB267] transition-colors" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-lg mb-5 inline-block relative">
              Contact Info
              <div className="absolute -bottom-2 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-8 h-0.5 bg-[#D5775D] rounded-full" />
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:imane.bouasla@example.com" 
                  className="text-white/50 hover:text-[#FBB267] transition-all duration-300 text-sm flex items-center justify-center md:justify-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#FBB267]/20 transition-all duration-300">
                    <FiMail className="w-4 h-4 text-white/40 group-hover:text-[#FBB267]" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">bouaslaiman@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+213123456789" 
                  className="text-white/50 hover:text-[#FBB267] transition-all duration-300 text-sm flex items-center justify-center md:justify-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#FBB267]/20 transition-all duration-300">
                    <FiPhone className="w-4 h-4 text-white/40 group-hover:text-[#FBB267]" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">+213 07 81 59 09 28</span>
                </a>
              </li>
              <li>
                <div className="text-white/50 text-sm flex items-center justify-center md:justify-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                    <FiMapPin className="w-4 h-4 text-white/40" />
                  </div>
                  <span>Skikda, Algeria</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4 - Tech Stack & Social */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-lg mb-5 inline-block relative">
              Tech Stack
              <div className="absolute -bottom-2 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-8 h-0.5 bg-[#9C76B2] rounded-full" />
            </h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              {techIcons.map((tech, idx) => (
                <div 
                  key={idx}
                  className="group relative"
                  title={tech.name}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                    <tech.icon className="w-5 h-5" style={{ color: tech.color }} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Follow Me</h4>
              <div className="flex justify-center md:justify-start gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={social.label}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#D5775D] group-hover:to-[#FBB267] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                      <social.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      
      </div>

       {/* Bottom Bar */}
        <div className="relative px-10 bg-gradient-to-r from-[#D5775D] via-[#FBB267] to-[#D5775D] py-5 md-py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-xs sm:text-sm text-center">
            &copy; {currentYear} MyPortfolio. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3 md:pr-20 lg:pr-[10vw]">
            <span className="text-white/70 text-xs flex items-center gap-1">
              <FiCoffee className="w-3 h-3" />
              Designed with care
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/70 text-xs flex items-center gap-1">
              <FiGlobe className="w-3 h-3" />
              Version 2.0
            </span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="group w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FBB267] transition-all duration-300 hover:-translate-y-1"
            aria-label="Back to top"
          >
            <FiArrowUp className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
          </button>
        </div>

    </footer>
  );
}

export default Footer;