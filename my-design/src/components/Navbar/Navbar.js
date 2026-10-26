// Navbar.js - نسخة معدلة باستخدام Tailwind فقط
import React, { useState, useEffect, useRef } from 'react';
import { HiMenu, HiX, HiHome, HiUser, HiCode, HiBriefcase, HiMail, HiChevronRight, HiChip } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

function Navbar({ onNavClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const sections = [
      { id: 'Home', name: 'Home' },
      { id: 'about', name: 'About' },
      { id: 'services', name: 'Services' },
      { id: 'skills', name: 'Skills' },
      { id: 'Projects', name: 'Projects' },
      { id: 'contact', name: 'Contact' }
    ];
    
    const observers = sections.map(section => {
      const element = document.getElementById(section.id);
      if (element) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setActiveItem(section.name === 'Home' ? 'Home' : section.id);
          }
        }, { threshold: 0.3 });
        observer.observe(element);
        return observer;
      }
      return null;
    });
    
    return () => observers.forEach(observer => observer?.disconnect());
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    setActiveItem(sectionId);
    if (onNavClick) onNavClick(sectionId);
  };

  const navItems = [
    { name: 'Home', id: 'Home', icon: HiHome },
    { name: 'About', id: 'about', icon: HiUser },
    { name: 'Services', id: 'services', icon: HiCode },
    { name: 'Skills', id: 'skills', icon: HiChip },
    { name: 'Projects', id: 'Projects', icon: HiBriefcase },
  ];

  const socialIcons = [
    { icon: FiGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, url: 'https://twitter.com', label: 'Twitter' }
  ];

  return (
    <>
      {/* Navbar - خلفية شفافة في البداية، متدرجة عند التمرير */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-gradient-to-r from-[#5F2C78]/95 via-[#733A91]/95 to-[#404C99]/95  backdrop-blur-md shadow-lg py-3 md:py-2' 
            : 'bg-transparent py-4 md:py-4'
        }`} 
      >
        

        <div className="max-w-8xl mx-auto px-5 md:px-9 lg:px-18">
          <div className="flex justify-between items-center">
            
            <a 
              href="#Home" 
              onClick={(e) => { e.preventDefault(); handleNavClick('Home'); }}
              className="group cursor-pointer"
            >
              <div className="font-bold text-xl md:text-xl lg:text-2xl tracking-wide transition-all duration-300 text-white">
                Portfolio
              </div>
              <div className="w-0 h-0.5 bg-gradient-to-r from-[#FBB267] to-[#D5775D] rounded-full group-hover:w-full transition-all duration-500"></div>
            </a>
            
            <div className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1.5">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={`#${item.id}`} 
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeItem === (item.id === 'Home' ? 'Home' : item.id)
                      ? 'bg-gradient-to-r from-[#D5775D]/50 to-[#FBB267]/50 text-white shadow-lg'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </div>
                </a>
              ))}
            </div>

            <div className="hidden md:flex lg:hidden items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={`#${item.id}`} 
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                  className={`relative px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeItem === (item.id === 'Home' ? 'Home' : item.id)
                      ? 'bg-gradient-to-r from-[#FBB267] to-[#D5775D] text-white shadow-lg'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <a 
              href="#contact" 
              className={`hidden md:inline-flex items-center gap-2 px-5 py-1.5 rounded-full font-semibold transition-all duration-300 text-sm ${
                scrolled
                  ? 'bg-gradient-to-r from-[#D5775D] to-[#FBB267] text-white shadow-md'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            >
              <span>Contact</span>
              <HiMail className="w-3.5 h-3.5" />
            </a>

            <button
              className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 bg-white/10 backdrop-blur-sm text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <HiX size={18} /> : <HiMenu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <div className="h-16 md:h-20"></div>

      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar - خلفية متدرجة عمودية للهاتف */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-[280px] h-full z-[999] transition-all duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col shadow-2xl overflow-y-auto`}
        style={{
          background: 'linear-gradient(180deg, #17447E 0%, #404C99 25%, #733A91 75%, #5F2C78 100%)',
        }}
      >
        <div className="fixed inset-0 w-[280px] pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#FBB267]/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#D5775D]/10 rounded-full blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9C76B2]/8 rounded-full blur-[100px]" />
          
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

        <div className="relative z-10 pt-8 pb-4 px-5 shrink-0 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-bold text-2xl text-white">Portfolio</div>
              <p className="text-sm text-white/70 mt-1">Imane Bouasla</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 bg-white/20 text-white hover:bg-white/30"
            >
              <HiX size={18} />
            </button>
          </div>
        </div>

        <nav className="relative z-10 flex-1 py-6 px-5 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeItem === (item.id === 'Home' ? 'Home' : item.id);
            return (
              <a 
                key={item.name} 
                href={`#${item.id}`} 
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
                  isActive ? 'bg-gradient-to-r from-[#D5775D]/20 to-[#FBB267]/20' : 'hover:bg-white/10'
                }`}
              >
                <div className={`flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'text-[#EE9C6C] shadow-md scale-110' : 'text-white/80 group-hover:text-[#EE9C6C]'
                } group-hover:scale-105`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={`flex-1 font-medium text-base ${isActive ? 'text-[#EE9C6C]' : 'text-white group-hover:text-[#EE9C6C]'}`}>
                  {item.name}
                </span>
                {isActive && <HiChevronRight className="w-4 h-4 text-[#FBB267]" />}
              </a>
            );
          })}
        </nav>

        <div className="relative z-10 shrink-0 pb-8 px-5">
          <div className="h-px bg-white/10 mb-4" />
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-r from-[#FBB267] to-[#D5775D] text-white"
          >
            <HiMail size={16} />
            <span className="text-sm font-semibold">Contact Me</span>
          </a>
          <div className="flex justify-center gap-4 mt-5">
            {socialIcons.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FBB267] hover:to-[#D5775D] hover:text-white hover:-translate-y-1 cursor-pointer group"
              >
                <social.icon className="w-4 h-4 text-white group-hover:text-white transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;