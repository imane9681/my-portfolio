import React, { useState, useEffect } from 'react';
import { 
  FiGithub, FiExternalLink, FiEdit2, FiTrash2, FiShare2, FiCode, FiLayers, 
  FiChevronDown, FiChevronUp, FiArrowRight, FiMaximize2, FiX,
  FiDownload, FiChevronLeft, FiChevronRight, FiImage
} from 'react-icons/fi';
import { LuBrain } from "react-icons/lu";
import { MdOutlineDesignServices, MdOutlineDeveloperMode } from 'react-icons/md';
import { motion } from 'framer-motion';
import Modal from 'react-modal';

if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const ProjectCard = ({ project, isAdmin, onEdit, onDelete, serverUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = project.categories || (project.category ? [project.category] : []);
  
  const getCategoryInfo = (cat) => {
    const categoriesMap = {
      web: { 
        label: 'Web Dev', 
        icon: MdOutlineDeveloperMode,
        color: '#9C76B2',
        bg: '#F5E8FA'
      },
      design: { 
        label: 'UI/UX Design', 
        icon: MdOutlineDesignServices,
        color: '#FBB267',
        bg: '#FFF4EF'
      },
      fullstack: { 
        label: 'Full Stack', 
        icon: FiLayers,
        color: '#D5775D',
        bg: '#FEF0EC'
      },
      ai: { 
        label: 'AI / ML', 
        icon: LuBrain,
        color: '#8B5CF6',
        bg: '#F0ECFE'
      }
    };
    return categoriesMap[cat] || { 
      label: cat, 
      icon: FiCode,
      color: '#6B7280',
      bg: '#F3F4F6'
    };
  };

  const getTags = () => {
    if (Array.isArray(project.tags)) {
      return project.tags;
    }
    if (typeof project.tags === 'string' && project.tags) {
      return project.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    return [];
  };

  const tags = getTags();

  const getLinks = () => {
    if (project.liveLink || project.githubLink) {
      return {
        live: project.liveLink || '#',
        github: project.githubLink || '#'
      };
    }
    
    if (project.links && Array.isArray(project.links) && project.links.length > 0) {
      const liveLink = project.links.find(link => 
        link.title === 'View Live' || link.title === 'Live Demo'
      );
      const githubLink = project.links.find(link => 
        link.title === 'View Code' || link.href?.includes('github')
      );
      
      return {
        live: liveLink?.href || '#',
        github: githubLink?.href || '#'
      };
    }
    
    return {
      live: '#',
      github: '#'
    };
  };

  const links = getLinks();

  const descriptionLength = project.description?.length || 0;
  const isDescriptionLong = descriptionLength > 80;

  const getProjectImages = () => {
    const images = [];
    
    if (project.img) {
      images.push(project.img);
    }
    
    if (project.images && Array.isArray(project.images)) {
      project.images.forEach(img => {
        if (img && !images.includes(img)) {
          images.push(img);
        }
      });
    }
    
    if (images.length === 0) {
      images.push('/images/CourseWebsiteLandingPageThumbnail.png');
    }
    
    return images;
  };

  const projectImages = getProjectImages();

  const getImageSrc = (img) => {
    if (!img) {
      return '/images/CourseWebsiteLandingPageThumbnail.png';
    }
    
    if (img.startsWith('/uploads') && serverUrl) {
      return `${serverUrl}${img}`;
    }
    
    if (img.startsWith('http')) {
      return img;
    }
    
    return img;
  };

  const currentImageSrc = getImageSrc(projectImages[currentImageIndex] || projectImages[0]);

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setModalImageLoaded(false);
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setModalImageLoaded(false);
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const handleOpenImageModal = (e, index = 0) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex(index);
    setModalImageLoaded(false);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageLoaded(false);
  };

  const handleDownloadImage = async (e) => {
    if (e) e.stopPropagation();
    try {
      const response = await fetch(currentImageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${project.title}-image-${currentImageIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isImageModalOpen) {
        handleCloseImageModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isImageModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isImageModalOpen) return;
      if (e.key === 'ArrowRight') {
        nextImage(e);
      } else if (e.key === 'ArrowLeft') {
        prevImage(e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageModalOpen, currentImageIndex]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -10, transition: { duration: 0.3 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    content: {
      position: 'relative',
      inset: 'auto',
      border: 'none',
      background: 'transparent',
      overflow: 'hidden',
      padding: 0,
      maxWidth: '1200px',
      width: '95%',
      maxHeight: '90vh',
      borderRadius: '24px',
    }
  };

  const mobileStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: 0,
    },
    content: {
      position: 'relative',
      inset: 'auto',
      border: 'none',
      background: 'transparent',
      overflow: 'hidden',
      padding: 0,
      maxWidth: '100%',
      width: '100%',
      maxHeight: '100vh',
      height: '100vh',
      borderRadius: 0,
    }
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-50px" }}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
      >
        {/* صورة المشروع */}
        <div className="relative overflow-hidden w-full aspect-[16/16] bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-[#9C76B2] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          <img
            src={getImageSrc(project.img)}
            alt={project.title}
            className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {projectImages.length > 1 && (
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80 text-xs flex items-center gap-1.5">
              <FiImage className="w-3 h-3" />
              <span>{projectImages.length}</span>
            </div>
          )}
          
          <button
            onClick={(e) => handleOpenImageModal(e, 0)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 border border-white/10"
            aria-label="Zoom image"
            type="button"
          >
            <FiMaximize2 className="w-4 h-4 text-white" />
          </button>
          
          {/* ✅ Overlay مع أزرار التفاعل - تظهر دائماً في الهاتف */}
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            whileHover="visible"
            className={`absolute inset-0 bg-gradient-to-t from-[#5F2C78]/80 via-[#733A91]/50 to-transparent 
              ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
              transition-all duration-500 flex items-center justify-center gap-4`}
          >
            {/* ✅ رابط Live Demo */}
            <motion.a 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={links.live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#9C76B2] transition-all duration-300 border border-white/20"
            >
              <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </motion.a>
            
            {/* ✅ رابط GitHub */}
            <motion.a 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#E4A488] transition-all duration-300 border border-white/20"
            >
              <FiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </motion.a>
            
            {isAdmin && (
              <>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(project._id)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#7280B3] transition-all duration-300 border border-white/20"
                  aria-label="Edit project"
                >
                  <FiEdit2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDelete(project._id)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-rose-400 transition-all duration-300 border border-white/20"
                  aria-label="Delete project"
                >
                  <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.button>
              </>
            )}
          </motion.div>
        </div>

        {/* محتوى البطاقة */}
        <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            {categories.map((cat, idx) => {
              const { label, icon: Icon, color, bg } = getCategoryInfo(cat);
              return (
                <span 
                  key={idx} 
                  className="inline-flex items-center gap-1 bg-[#9C76B2] text-white text-[10px] sm:text-[11px] md:text-xs px-2 sm:px-3.5 py-0.5 sm:py-2 rounded-full font-medium border"
                >
                  <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                  <span>{label}</span>
                </span>
              );
            })}
          </div>
          
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#9C76B2] mb-1.5 sm:mb-2 line-clamp-1 group-hover:text-[#9C76B2] transition-colors duration-300">
            {project.title}
          </h3>
          
          <div className="mb-3 sm:mb-4">
            <div className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed whitespace-normal break-words">
              {isDescriptionExpanded ? (
                <p>{project.description}</p>
              ) : (
                <p>
                  {isDescriptionLong 
                    ? `${project.description?.slice(0, 90)}...` 
                    : project.description}
                </p>
              )}
            </div>
            
            {isDescriptionLong && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-[#9C76B2] hover:text-[#D5775D] text-[10px] sm:text-xs font-medium mt-1.5 flex items-center gap-1 transition-colors"
              >
                {isDescriptionExpanded ? (
                  <>
                    <span>Show Less</span>
                    <FiChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>Read More</span>
                    <FiChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
              {tags.slice(0, 4).map((tag, idx) => (
                <span 
                  key={idx} 
                  className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-200">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2 sm:pt-3 mt-auto border-t border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 hover:text-[#9C76B2] transition-colors"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: project.title, text: project.description });
                  }
                }}
              >
                <FiShare2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline">Share</span>
              </motion.button>

              {/* ✅ أزرار الروابط في البطاقة - تظهر دائماً */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-lg bg-gray-50 hover:bg-[#FBB267]/10 text-gray-400 hover:text-[#D5775D] transition-all duration-300"
                  aria-label="Live Demo"
                >
                  <FiExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-lg bg-gray-50 hover:bg-[#9C76B2]/10 text-gray-400 hover:text-[#9C76B2] transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FiGithub className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
              </div>
            </div>
            
            <motion.button 
              whileHover={{ x: 3 }}
              onClick={() => window.open(links.live, "_blank")}
              className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm text-[#9C76B2] hover:text-[#D5775D] transition-colors font-medium"
            >
              <span>Details</span>
              <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ============================================ */}
      {/* مودال عرض الصور */}
      {/* ============================================ */}
      <Modal
        isOpen={isImageModalOpen}
        onRequestClose={handleCloseImageModal}
        style={isMobile ? mobileStyles : customStyles}
        contentLabel="Project Image Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        {isMobile ? (
          <div className="flex flex-col h-full bg-white">
            <div className="flex-shrink-0 sticky top-0 z-20 p-4 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between">
              <button
                onClick={handleCloseImageModal}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/10 active:scale-95"
                type="button"
              >
                <FiX className="w-5 h-5 text-white" />
              </button>
              <span className="text-white/80 text-sm font-medium truncate max-w-[150px]">
                {project.title}
              </span>
              <button
                onClick={handleDownloadImage}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/10 active:scale-95"
                type="button"
              >
                <FiDownload className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="relative bg-gray-900 flex items-center justify-center min-h-[40vh]">
              {!modalImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-[#9C76B2] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              
              <img
                src={currentImageSrc}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className={`w-full h-full max-h-[50vh] object-contain transition-opacity duration-500 ${
                  modalImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setModalImageLoaded(true)}
              />

              {projectImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/10 active:scale-95"
                    type="button"
                  >
                    <FiChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/10 active:scale-95"
                    type="button"
                  >
                    <FiChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}

              {projectImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                  {currentImageIndex + 1} / {projectImages.length}
                </div>
              )}

              <button
                onClick={handleCloseImageModal}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs flex items-center gap-1.5 border border-white/10 active:scale-95"
                type="button"
              >
                <FiX className="w-3 h-3" />
                <span>Close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 bg-white">
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat, idx) => {
                  const { label, color, bg } = getCategoryInfo(cat);
                  return (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium border"
                      style={{ backgroundColor: bg, color: color, borderColor: color + '30' }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {project.title}
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="border-t border-gray-100 mb-4" />

              {tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 border border-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#FBB267] to-[#D5775D] text-white font-semibold text-sm active:scale-95 transition-transform"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gray-800 text-white font-semibold text-sm active:scale-95 transition-transform"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                </div>
                
                {isAdmin && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <button
                      onClick={() => {
                        handleCloseImageModal();
                        onEdit(project._id);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#9C76B2]/10 text-[#9C76B2] font-semibold text-sm active:scale-95 transition-transform"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        handleCloseImageModal();
                        if (window.confirm('Are you sure you want to delete this project?')) {
                          onDelete(project._id);
                        }
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-500 font-semibold text-sm active:scale-95 transition-transform"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] h-full bg-white rounded-2xl overflow-hidden">
            <div className="relative bg-gray-900 flex items-center justify-center p-6 min-h-[500px]">
              {!modalImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-[#9C76B2] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              
              <img
                src={currentImageSrc}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className={`w-full h-full max-h-[75vh] object-contain transition-opacity duration-500 ${
                  modalImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setModalImageLoaded(true)}
              />

              {projectImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/10"
                    type="button"
                  >
                    <FiChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/10"
                    type="button"
                  >
                    <FiChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {projectImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                  {currentImageIndex + 1} / {projectImages.length}
                </div>
              )}

              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={handleDownloadImage}
                  className="p-2.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 border border-white/10"
                  type="button"
                >
                  <FiDownload className="w-5 h-5 text-white" />
                </button>
              </div>

              <button
                onClick={handleCloseImageModal}
                className="absolute top-4 left-4 z-10 p-2.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 border border-white/10"
                type="button"
              >
                <FiX className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="bg-white p-8 overflow-y-auto max-h-[80vh]">
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat, idx) => {
                  const { label, color, bg } = getCategoryInfo(cat);
                  return (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium border"
                      style={{ backgroundColor: bg, color: color, borderColor: color + '30' }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {project.title}
              </h2>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="border-t border-gray-100 mb-4" />

              {tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#FBB267] to-[#D5775D] text-white font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-800 text-white font-semibold text-sm hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                </div>
                
                {isAdmin && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <button
                      onClick={() => {
                        handleCloseImageModal();
                        onEdit(project._id);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#9C76B2]/10 text-[#9C76B2] font-semibold text-sm hover:bg-[#9C76B2]/20 transition-all duration-300"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        handleCloseImageModal();
                        if (window.confirm('Are you sure you want to delete this project?')) {
                          onDelete(project._id);
                        }
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-500 font-semibold text-sm hover:bg-red-100 transition-all duration-300"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProjectCard;