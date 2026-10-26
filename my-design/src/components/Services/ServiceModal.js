// ServiceModal.js - نافذة منبثقة متجاوبة مع ألوان متناسقة
import React, { useEffect, useRef } from 'react';
import { 
  FiX, 
  FiArrowRight, 
  FiCheck, 
  FiInfo, 
  FiStar, 
  FiClock, 
  FiZap,
  FiAward
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceModal = ({ isOpen, onClose, service }) => {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const features = {
    'Web Development': [
      'Fast, responsive websites for all devices',
      'Search Engine Optimization (SEO)',
      'Interactive user interfaces with React',
      'Clean, maintainable code'
    ],
    'UI/UX Design': [
      'Beautiful, user-friendly interfaces',
      'Interactive prototypes',
      'User-centered design approach',
      'Brand identity consistency'
    ],
    'Full-Stack Solutions': [
      'Complete frontend to backend solutions',
      'Scalable database architecture',
      'Secure API development',
      'Cloud-ready deployment'
    ]
  };

  const serviceFeatures = features[service.title] || [
    'Custom solutions tailored to your needs',
    'High-quality execution',
    'Ongoing technical support',
    'On-time delivery'
  ];

  // ألوان متناسقة مع لون الخدمة
  const getColorScheme = (color) => {
    return {
      light: `${color}15`,
      medium: `${color}25`,
      border: `${color}30`,
      text: color,
      gradient: `linear-gradient(135deg, ${color}dd, ${color})`
    };
  };

  const colors = getColorScheme(service.color);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            ref={modalRef}
            className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl mx-2 sm:mx-0"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-white/50 hover:bg-white flex items-center justify-center transition-all duration-300 hover:rotate-90 shadow-md"
            >
              <FiX className="w-4 h-4 text-gray-600" />
            </button>

            {/* Header - Responsive */}
            <div 
              className="relative h-26 sm:h-30 rounded-t-2xl sm:rounded-t-3xl flex items-center justify-center overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, ${service.color}99, ${service.color})` 
              }}
            >
              <div className="absolute inset-0 bg-black/10 rounded-t-2xl sm:rounded-t-3xl" />
              <div className="relative z-10 text-center text-white px-4">
                
                <h2 className="text-2xl sm:text-3xl font-bold">{service.title}</h2>
                <p className="text-white/80 text-xs sm:text-sm mt-1">Professional Service</p>
              </div>
            </div>

            {/* Content - Responsive */}
            <div className="p-5 sm:p-8">
              {/* Description */}
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: colors.light }}
                  >
                    <FiInfo className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Overview</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed ml-10 sm:ml-13">
                  {service.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: colors.light }}
                  >
                    <FiZap className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">What This Service Offers</h3>
                </div>
                <ul className="space-y-2 sm:space-y-2.5 ml-10 sm:ml-13">
                  {serviceFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                      <div 
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: colors.light }}
                      >
                        <FiCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: service.color }} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats - Responsive Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                <div 
                  className="text-center p-3 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: colors.light, borderColor: colors.border }}
                >
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mx-auto mb-1 sm:mb-2"
                    style={{ backgroundColor: colors.medium }}
                  >
                    <FiStar className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: service.color }} />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: service.color }}>100%</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Satisfaction</div>
                </div>
                <div 
                  className="text-center p-3 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: colors.light, borderColor: colors.border }}
                >
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mx-auto mb-1 sm:mb-2"
                    style={{ backgroundColor: colors.medium }}
                  >
                    <FiClock className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: service.color }} />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: service.color }}>2+</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Years</div>
                </div>
                <div 
                  className="text-center p-3 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: colors.light, borderColor: colors.border }}
                >
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mx-auto mb-1 sm:mb-2"
                    style={{ backgroundColor: colors.medium }}
                  >
                    <FiAward className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: service.color }} />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: service.color }}>✓</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Guaranteed</div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }, 300);
                }}
                className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{ 
                  background: colors.gradient
                }}
              >
                <span>Get This Service</span>
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;