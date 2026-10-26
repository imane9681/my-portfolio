// About.js - مع ألوان جديدة ومتناسقة
import React, { useEffect, useRef, useState } from 'react';
import { 
  FiMapPin, FiCalendar, FiHeart, FiTarget, 
  FiAward, FiSmile, FiMessageSquare, FiCompass,
  FiZap, FiBookOpen, FiCode, FiGlobe,
  FiChevronRight, FiTrendingUp, FiPenTool
} from 'react-icons/fi';
import { HiOutlineSparkles, HiOutlineLightBulb, HiOutlineBadgeCheck } from 'react-icons/hi';
import {  MdRocketLaunch } from 'react-icons/md';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const personalInfo = [
    { icon: FiMapPin, label: 'Based in', value: 'Skikda, Algeria' },
    { icon: FiCalendar, label: 'Experience', value: '2+ Years' },
    { icon: FiSmile, label: 'Available', value: 'Yes' },
  ];

  const personalInterests = [
    { icon: FiBookOpen, title: 'Continuous Learning', description: 'Always exploring new technologies', color: '#FBB267', bgLight: '#FEF3E8' },
    { icon: FiCode, title: 'Clean Code', description: 'Passionate about maintainable code', color: '#D5775D', bgLight: '#FDF2F0' },
  ];

  const philosophy = [
    {
      icon: HiOutlineLightBulb,
      title: 'My Approach',
      description: 'I don\'t just write code — I solve problems. Every project starts with understanding the "why" before the "how".',
      color: '#FBB267',
      bgLight: '#FEF3E8'
    },
    {
      icon: FiTarget,
      title: 'My Promise',
      description: 'Clean code, clear communication, and deadlines I actually keep. No surprises, just results.',
      color: '#D5775D',
      bgLight: '#FDF2F0'
    },
    {
      icon: HiOutlineBadgeCheck,
      title: 'My Vision',
      description: 'To build digital products that make people\'s lives easier and businesses grow.',
      color: '#9C76B2',
      bgLight: '#F5EEF8'
    }
  ];

  const personalMoments = [
    {
      year: '2020',
      title: 'Journey Started',
      description: 'Earned Licence\'s in Information Systems',
      icon: FiZap,
      color: '#FBB267',
      bgLight: '#FEF3E8'
    },
    {
      year: '2022',
      title: 'Advanced Studies',
      description: 'Completed Master\'s in Distributed Systems & Networks',
      icon: FiAward,
      color: '#D5775D',
      bgLight: '#FDF2F0'
    },
    {
      year: '2024',
      title: 'Professional Growth',
      description: 'Earned Web Development Certification',
      icon: FiTrendingUp,
      color: '#9C76B2',
      bgLight: '#F5EEF8'
    },
    {
      year: 'Present',
      title: 'Making Impact',
      description: 'Building solutions that make a difference',
      icon: FiGlobe,
      color: '#7280B3',
      bgLight: '#EEF0F7'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden" 
      id="about"
    >
   {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FBB267]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9C76B2]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D5775D]/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#5F2C78 1px, transparent 1px), linear-gradient(90deg, #5F2C78 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-8xl mx-auto px-5 sm:px-8 md:px-12 lg:px-24 py-12 sm:py-16 md:py-20 lg:py-16">
        
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FBB267]/10 to-[#D5775D]/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 mb-4 sm:mb-6 shadow-sm">
            <HiOutlineSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBB267]" />
            <span className="text-xs sm:text-sm text-gray-600 font-medium">Behind the Code</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#5F2C78] via-[#733A91] to-[#404C99] bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#5F2C78] via-[#733A91] to-[#404C99] rounded-full mx-auto" />
        </div>

        {/* Main Content - Responsive Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          
          {/* Left Column */}
          <div className={`space-y-6  sm:space-y-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 '
          }`}>
            
           {/* Profile Image */}
<div className="relative group mx-auto mb-14 ">
  <div className="relative flex justify-center items-center">
    {/* Animated Rings */}
    <div className="absolute w-64 h-64 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] rounded-full border border-[#FBB267]/20 animate-spin-slow">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#FBB267] rounded-full" />
    </div>
    <div className="absolute w-52 h-52 sm:w-72 sm:h-72 lg:w-[360px] lg:h-[360px] rounded-full border border-[#D5775D]/20 animate-spin-slow-reverse">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-[#D5775D] rounded-full" />
    </div>
    <div className="absolute w-40 h-40 sm:w-56 sm:h-56 lg:w-[300px] lg:h-[300px] rounded-full border border-[#9C76B2]/20 animate-spin-medium">
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#9C76B2] rounded-full" />
    </div>

    {/* Background Image behind profile */}
    <div className="absolute">
      <img src="/images/Group121.png" alt="Background decoration" className="w-[70vw] lg:w-[28vw] md:w-[48vw]  h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
    </div>

    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#FBB267]/30 to-[#D5775D]/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 opacity-50" />

    {/* Profile Image */}
    <div className="relative flex justify-center p-5 sm:p-6 md:p-8">
      <img 
        src="/images/lmbi2.png" 
        alt="Imane Bouasla" 
        className="w-48 sm:w-56 md:w-64 lg:w-72 h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
      />
      
      
                        {/* Floating Info Cards - Enhanced */}
                        <div className="absolute  -top-4 -right-8 md:-right-16 bg-white/10 backdrop-blur-md rounded-2xl px-3 md:px-4 py-1.5 md:py-2 border border-white/20 animate-float-slow shadow-lg">
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-[#FBB267]/20 flex items-center justify-center">
                              <FiCode className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#FBB267]" />
                            </div>
                            <span className="text-[#9C76B2] text-[10px] md:text-xs font-medium">Full-Stack</span>
                          </div>
                        </div>
      
                        <div className="absolute  -bottom-4 -left-8 md:-left-14 bg-white/10 backdrop-blur-md rounded-2xl px-3 md:px-4 py-1.5 md:py-2 border border-white/20 animate-float-slow-delay shadow-lg">
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-[#D5775D]/20 flex items-center justify-center">
                              <FiPenTool className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#D5775D]" />
                            </div>
                            <span className="text-[#9C76B2] text-[10px] md:text-xs font-medium">UI/UX Expert</span>
                          </div>
                        </div>
      
                        {/* Experience Badge - Enhanced */}
                        <div className="absolute  top-0 md:top-7 -left-12 md:-left-16 bg-gradient-to-r from-[#FBB267] to-[#D5775D] rounded-2xl px-2 md:px-4 py-1 md:py-2 shadow-xl animate-pulse-slow">
                          <div className="flex items-center gap-1 md:gap-2">
                            <MdRocketLaunch className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white" />
                            <div>
                              <span className="text-white text-[10px] md:text-xs font-bold">2+ Years</span>
                              <p className="text-white/80 text-[8px] md:text-[10px]">Experience</p>
                            </div>
                          </div>
                        </div>
      
                        {/* Achievement Badge */}
                        <div className="absolute  bottom-4 md:bottom-12 -right-12 md:-right-24 bg-white/10 backdrop-blur-md rounded-2xl px-2 md:px-3 py-1 md:py-1.5 border border-white/20 animate-float-slow shadow-lg">
                          <div className="flex items-center gap-1">
                            <FiAward className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#FBB267]" />
                            <span className="text-[#9C76B2] text-[8px] md:text-[10px] font-medium">Top Designer</span>
                          </div>
                        </div>

    </div>
  </div>
</div>
            {/* Quote Card - تصميم جديد */}
            <div className="relative bg-gradient-to-br from-[#FBB267]/5 to-[#D5775D]/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center lg:text-left border border-[#FBB267]/10">
              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#FBB267] to-[#D5775D] rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                <FiMessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed pt-4 sm:pt-5">
                "I believe the best products are born when creativity meets functionality. 
                I'm here to bridge that gap."
              </p>
            </div>

            {/* Personal Story */}
            <div className="space-y-2 sm:space-y-3 text-gray-500 text-sm sm:text-base leading-relaxed text-center lg:text-left">
              <p>
                I'm a curious mind who found their passion in the intersection of 
                <strong className="text-[#D5775D] font-semibold"> design and technology</strong>.
              </p>
              <p>
                What excites me most is seeing an idea transform into a product that 
                <strong className="text-[#9C76B2] font-semibold"> actually helps people</strong>.
              </p>
              <p className="hidden sm:block">
                Outside of work, I'm always learning new technologies and working on 
                projects that challenge me to grow.
              </p>
            </div>

            {/* Personal Info Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              {personalInfo.map((info, idx) => (
                <div key={idx} className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#FBB267]/10 to-[#D5775D]/10 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                  <info.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FBB267]" />
                  <span className="text-[11px] sm:text-xs text-gray-600">{info.label}</span>
                  <span className="text-[11px] sm:text-xs font-medium text-gray-800">{info.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            
            {/* Philosophy Section - بطاقات جديدة */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-3 sm:mb-4 flex items-center justify-center lg:justify-start gap-2 text-base sm:text-lg">
                <FiHeart className="w-4 h-4 sm:w-5 sm:h-5 text-[#D5775D]" />
                My Philosophy
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {philosophy.map((item, idx) => (
                  <div 
                    key={idx}
                    className="group rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border"
                    style={{ 
                      backgroundColor: item.bgLight,
                      borderColor: `${item.color}20`
                    }}
                  >
                    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-center lg:items-start">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: item.color }} />
                      </div>
                      <div className="text-center lg:text-left">
                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1" style={{ color: item.color }}>{item.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests Grid - بطاقات جديدة */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-3 sm:mb-4 flex items-center justify-center lg:justify-start gap-2 text-base sm:text-lg">
                <FiCode className="w-4 h-4 sm:w-5 sm:h-5 text-[#FBB267]" />
                What Drives Me
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {personalInterests.map((interest, idx) => (
                  <div 
                    key={idx}
                    className="group rounded-xl p-4 sm:p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border"
                    style={{ 
                      backgroundColor: interest.bgLight,
                      borderColor: `${interest.color}20`
                    }}
                  >
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${interest.color}20` }}
                    >
                      <interest.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: interest.color }} />
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1" style={{ color: interest.color }}>{interest.title}</h4>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">{interest.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* My Journey Section - بطاقات جديدة */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-3 sm:mb-4 flex items-center justify-center lg:justify-start gap-2 text-base sm:text-lg">
                <FiCompass className="w-4 h-4 sm:w-5 sm:h-5 text-[#9C76B2]" />
                My Journey
              </h3>
              <div className="relative rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border" style={{ backgroundColor: '#FAFAFE', borderColor: '#E8E4F0' }}>
                
                {/* Vertical Timeline Line */}
                <div className="hidden lg:block absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#FBB267] via-[#D5775D] to-[#9C76B2] rounded-full" />
                
                <div className="space-y-4 sm:space-y-5 lg:pl-5">
                  {personalMoments.map((moment, idx) => (
                    <div key={idx} className="relative flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-3 sm:gap-4">
                      <div className="relative z-10 flex-shrink-0">
                        <div 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110"
                          style={{ 
                            backgroundColor: moment.bgLight,
                            border: `2px solid ${moment.color}40`
                          }}
                        >
                          <moment.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: moment.color }} />
                        </div>
                      </div>
                      <div className="flex-1 pb-2 sm:pb-3">
                        <div className="flex items-center justify-center lg:justify-start flex-wrap gap-2 sm:gap-3">
                          <span className="text-xs sm:text-sm font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${moment.color}15`, color: moment.color }}>{moment.year}</span>
                          <FiChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-300 hidden lg:inline" />
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{moment.title}</h4>
                        </div>
                        <p className="text-[11px] sm:text-xs text-gray-500 mt-1.5 leading-relaxed max-w-[250px] sm:max-w-none mx-auto lg:mx-0">{moment.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Signature */}
        <div className={`mt-12 sm:mt-16 text-center transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 bg-gradient-to-r from-[#FBB267]/10 to-[#D5775D]/10 rounded-full px-5 sm:px-6 py-2 sm:py-2.5">
            <FiGlobe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBB267]" />
            <span>Every great product starts with a conversation. Let's talk about your next project.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;