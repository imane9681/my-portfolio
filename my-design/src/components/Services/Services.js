// Services.js - مع Modal لعرض تفاصيل الخدمات
import React, { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import ServiceModal from './ServiceModal';

function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleLearnMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const services = [
    {
      id: 1,
      title: 'Web Development',
      color: '#9C76B2',
      colorLight: '#F5EEF8',
      description: 'Modern, responsive, and high-performance websites using React, HTML, CSS, and JavaScript. Clean code, best practices.',
      image: '/images/Group61.png'
    },
    {
      id: 2,
      title: 'UI/UX Design',
      color: '#E4A488',
      colorLight: '#FDF2F0',
      description: 'Intuitive, beautiful user interfaces and experiences using Figma. Focus on clarity, usability, and brand consistency.',
      image: '/images/Group66.png'
    },
    {
      id: 3,
      title: 'Full-Stack Solutions',
      color: '#7280B3',
      colorLight: '#EEF0F7',
      description: 'Complete solutions from frontend to backend (Django & MySQL). Scalable, secure, and ready for deployment.',
      image: '/images/Group63.png'
    }
  ];

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative w-full overflow-hidden" 
        id="services"
        style={{
          background: 'linear-gradient(270deg, #17447E 0%, #404C99 24.52%, #733A91 75%, #5F2C78 100%)'
        }}
      >
        {/* Mobile Background */}
        <style>{`
          @media (max-width: 767px) {
            #services {
              background: linear-gradient(180deg, #17447E 0%, #404C99 25%, #733A91 75%, #5F2C78 100%) !important;
            }
          }
        `}</style>

        {/* Animated Background Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#FBB267]/15 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D5775D]/15 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9C76B2]/8 rounded-full blur-[150px] animate-pulse-slow delay-2000" />
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

        <div className="relative z-10 max-w-8xl mx-auto px-5 sm:px-8 md:px-12 lg:px-26 py-16 sm:py-20 md:py-24 lg:py-14">
          
          {/* Section Header */}
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-5 py-1.5 sm:py-2 mb-4 sm:mb-6">
              <HiOutlineSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBB267]" />
              <span className="text-xs sm:text-sm text-white/80 font-medium">What I Offer</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6">
              <span className="bg-gradient-to-r from-[#D5775D] to-[#FBB267] bg-clip-text text-transparent">
                My Services
              </span>
            </h2>
            
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#D5775D] to-[#FBB267] rounded-full mx-auto mb-5 sm:mb-6" />
            
            <p className="text-white/60 text-md md:text-lg max-w-xl lg:max-w-2xl mx-auto leading-relaxed">
              I offer a range of services to help you build, design, and launch your 
              digital presence with confidence and creativity.
            </p>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-20 md:gap-26 lg:gap-6 sm:px-0 md:px-14 lg:px-0 mt-26">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`group transition-all duration-700 delay-${100 + index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 pt-14 sm:pt-16 h-full flex flex-col">
                  
                  {/* Image Container */}
                  <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-10">
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div 
                      className="relative bg-white w-32 h-32 lg:w-40 lg:h-40 md:w-36 md:h-36 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    >
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="lg:w-30 lg:h-30 w-28 h-28 md:w-30 md:h-30 object-contain lg:p-0 sm:p-2"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-5 sm:px-6 pb-8 sm:pb-8 text-center mt-8 lg:mt-10 sm:mt-6 flex flex-col flex-grow">
                    <h3 
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3"
                      style={{ color: service.color }}
                    >
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-500 text-xs md:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="flex justify-center mt-auto">
                      <button
                        onClick={() => handleLearnMore(service)}
                        className="group/btn inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 rounded-full text-white font-medium text-xs sm:text-sm transition-all duration-300 hover:gap-3 hover:-translate-y-0.5"
                        style={{ backgroundColor: service.color }}
                      >
                        <span>Learn More</span>
                        <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`mt-16 sm:mt-20 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center gap-3 text-white/50 text-xs sm:text-sm">
              <FiMessageCircle className="w-4 h-4 text-[#FBB267]" />
              <span>Have a project in mind?</span>
              <span className="text-white/30">•</span>
              <a href="#contact" className="text-white/70 hover:text-[#FBB267] transition-colors">
                Let's discuss
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </>
  );
}

export default Services;