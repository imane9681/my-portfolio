import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { 
  FiGrid, FiLayers, FiArrowRight, FiCode, FiPlus, FiChevronDown, FiLogIn, FiLogOut
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdOutlineDesignServices, MdOutlineDeveloperMode } from 'react-icons/md';
import AdminLoginModal from './AdminLoginModal';
import ProjectModal from './ProjectModal';
import EditProjectModal from './EditProjectModal';
import ProjectCard from './ProjectCard';

function Projects({ isAdmin: externalIsAdmin, projects: externalProjects }) {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditProject, setCurrentEditProject] = useState(null);
  const [adminError, setAdminError] = useState("");
  const [deletedProjects, setDeletedProjects] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [serverUrl, setServerUrl] = useState('');
  const sectionRef = useRef(null);

  const sortByDate = useCallback((projectsList) => {
    return [...projectsList].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
  }, []);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // جلب serverUrl
  useEffect(() => {
  // قراءة رابط الخادم من ملف .env
  const url = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  setServerUrl(url);
  console.log('✅ Server URL:', url);
}, []);

  // جلب المشاريع
  useEffect(() => {
    const fetchProjects = async () => {
      if (externalProjects) {
        setProjects(sortByDate(externalProjects));
      } else {
        try {
          console.log("Fetching projects...");
          const response = await axios.get("/api/projects");
          console.log("Projects received:", response.data);
          setProjects(sortByDate(response.data));
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      }
    };
    fetchProjects();
  }, [externalProjects, sortByDate]);

  // التحقق من حالة المشرف
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (externalIsAdmin !== undefined) {
        setIsAdmin(externalIsAdmin);
      } else {
        try {
          const res = await axios.get("/api/auth/check", { withCredentials: true });
          setIsAdmin(res.data.isAdmin);
        } catch (err) {
          setIsAdmin(false);
        }
      }
    };
    checkAdminStatus();
  }, [externalIsAdmin]);

  const handleShowMore = () => setVisibleCount(prev => prev + 6);
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setVisibleCount(6);
  };

  const filteredProjects = React.useMemo(() => {
    if (filter === "all") return projects;
    
    return projects.filter(p => {
      const categories = p.categories || (p.category ? [p.category] : []);
      return categories.includes(filter);
    });
  }, [projects, filter]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = filteredProjects.length > visibleCount;

  const loginAsAdmin = async (password) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { password }, { withCredentials: true });
      if (res.data.success) {
        setIsAdmin(true);
        setShowLoginModal(false);
        setAdminError("");
      } else {
        setAdminError(res.data.message);
      }
    } catch (err) {
      setAdminError("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logoutAdmin = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setIsAdmin(false);
      setShowProjectModal(false);
      setShowEditModal(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✅ تحديث دالة إضافة مشروع
  const handleAddProject = async (formData, selectedFile) => {
    setIsLoading(true);
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('categories', JSON.stringify(formData.categories || []));
    if (formData.categories?.length) submitData.append('category', formData.categories[0]);
    submitData.append('tags', formData.tags);
    if (selectedFile) submitData.append('image', selectedFile);
    else if (formData.img) submitData.append('imageUrl', formData.img);
    
    // ✅ إرسال الروابط الجديدة
    submitData.append('liveLink', formData.liveLink || '');
    submitData.append('githubLink', formData.githubLink || '');
    
    // ✅ إنشاء مصفوفة الروابط بشكل صحيح
    const links = [
      { 
        href: formData.liveLink || '#', 
        icon: "/images/external-link.svg", 
        title: "View Live" 
      },
      { 
        href: formData.githubLink || '#', 
        icon: "/images/github.svg", 
        title: "View Code" 
      }
    ];
    submitData.append('links', JSON.stringify(links));

    try {
      const response = await axios.post("/api/projects", submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProjects(prev => sortByDate([response.data, ...prev]));
      setVisibleCount(6);
      setShowProjectModal(false);
    } catch (error) {
      alert("Error adding project: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ تحديث دالة تعديل مشروع
  const handleEditProject = async (formData, selectedFile) => {
    if (!currentEditProject) return;
    setIsLoading(true);
    
    const updateData = new FormData();
    updateData.append('title', formData.title);
    updateData.append('description', formData.description);
    updateData.append('categories', JSON.stringify(formData.categories || []));
    if (formData.categories?.length) updateData.append('category', formData.categories[0]);
    updateData.append('tags', formData.tags);
    if (selectedFile) updateData.append('image', selectedFile);
    
    // ✅ إرسال الروابط الجديدة
    updateData.append('liveLink', formData.liveLink || '');
    updateData.append('githubLink', formData.githubLink || '');
    
    // ✅ إنشاء مصفوفة الروابط بشكل صحيح
    const links = [
      { 
        href: formData.liveLink || '#', 
        icon: "/images/external-link.svg", 
        title: "View Live" 
      },
      { 
        href: formData.githubLink || '#', 
        icon: "/images/github.svg", 
        title: "View Code" 
      }
    ];
    updateData.append('links', JSON.stringify(links));

    try {
      const response = await axios.put(`/api/projects/${currentEditProject._id}`, updateData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setProjects(prev => {
        const filtered = prev.filter(p => p._id !== currentEditProject._id);
        return sortByDate([response.data, ...filtered]);
      });
      setShowEditModal(false);
      setCurrentEditProject(null);
    } catch (error) {
      alert("Failed to update project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const projectToDelete = projects.find(p => p._id === id);
      await axios.delete(`/api/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
      setDeletedProjects(prev => [projectToDelete, ...prev]);
    } catch (error) {
      alert("Failed to delete project");
    }
  };

  const handleDeleteFromEdit = async (id) => {
    await handleDeleteProject(id);
    setShowEditModal(false);
  };

  const handleRestoreLastDeleted = async () => {
    if (!deletedProjects.length) return;
    try {
      const response = await axios.post("/api/projects", deletedProjects[0]);
      setProjects(prev => sortByDate([response.data, ...prev]));
      setDeletedProjects(prev => prev.slice(1));
    } catch (error) {
      alert("Failed to restore project");
    }
  };

  const handleEditClick = (id) => {
    const projectToEdit = projects.find((project) => project._id === id);
    if (projectToEdit) {
      setCurrentEditProject(projectToEdit);
      setShowEditModal(true);
    }
  };

  const filters = [
    { id: "all", label: "All Projects", icon: FiGrid },
    { id: "web", label: "Web Dev", icon: MdOutlineDeveloperMode },
    { id: "design", label: "UI/UX Design", icon: MdOutlineDesignServices },
    { id: "fullstack", label: "Full Stack", icon: FiLayers }
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-white pb-5 md:pb-5 lg:py-10" id="Projects">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FBB267]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9C76B2]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D5775D]/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#5F2C78 1px, transparent 1px), linear-gradient(90deg, #5F2C78 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-6 sm:px-8 lg:px-24">
        
        <div className={`text-center mb-12 md:mb-16 lg:mb-14 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FBB267]/10 to-[#D5775D]/10 rounded-full px-5 py-2 mb-5">
            <HiOutlineSparkles className="w-4 h-4 text-[#FBB267]" />
            <span className="text-sm font-medium text-gray-600">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#5F2C78] via-[#733A91] to-[#404C99] bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FBB267] via-[#D5775D] to-[#9C76B2] rounded-full mx-auto mb-6" />
          <p className="text-gray-500 text-md md:text-lg max-w-2xl mx-auto">
            Explore my latest projects showcasing modern web development and creative design solutions.
          </p>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-3 mb-12 md:mb-16 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {filters.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleFilterChange(id)}
              className={`flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                filter === id
                  ? 'bg-[#9C76B2] text-white shadow-lg'
                  : 'border-2 border-gray-200 hover:border-[#F5E8FA] text-gray-500 hover:bg-[#F5E8FA] hover:text-[#9C76B2]'
              }`}
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
              <span>{label}</span>
            </button>
          ))}
          
          {isAdmin && (
            <button
              onClick={() => {
                setCurrentEditProject(null);
                setShowProjectModal(true);
              }}
              className="flex items-center gap-2 px-2.5 md:px-3 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 bg-[#9C76B2] text-white shadow-lg hover:scale-105"
              title="Add New Project"
            >
              <FiPlus className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}

          {!isAdmin && (
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 border-2 border-[#9C76B2]/70 text-[#9C76B2] hover:bg-[#9C76B2] hover:text-white hover:shadow-lg"
              title="Admin Login"
            >
              <FiLogIn className="w-4 h-4 md:w-5 md:h-5" />
              <span>Admin</span>
            </button>
          )}

          {isAdmin && (
            <button
              onClick={logoutAdmin}
              className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 border-2 border-[#EE9C6C]/50 text-[#EE9C6C] hover:bg-[#EE9C6C]/70 hover:text-white hover:shadow-lg"
              title="Logout"
            >
              <FiLogOut className="w-4 h-4 md:w-5 md:h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              isAdmin={isAdmin}
              onEdit={handleEditClick}
              onDelete={handleDeleteProject}
              serverUrl={serverUrl}
            />
          ))}
        </div>

        {hasMoreProjects && (
          <div className="text-center mt-12 md:mt-16">
            <button
              onClick={handleShowMore}
              className="group inline-flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 rounded-full bg-[#9C76B2] text-white font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span>Show More Projects</span>
              <FiChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
            <p className="text-gray-400 text-sm mt-4">
              Showing {displayedProjects.length} of {filteredProjects.length} projects
            </p>
          </div>
        )}

        <div className="mb-12 mt-16">
          <div className="relative rounded-2xl border border-[#FBB267]/10 bg-[#FEF3E8]/80 p-8 md:p-10 text-center shadow-xl overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FBB267]/10 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#D5775D]/10 rounded-full blur-2xl animate-pulse-slow delay-1000" />
            
            <div className="relative z-10">
              <div className="flex justify-center gap-3 mb-6">
                {[
                  { icon: FiCode, color: "#FBB267" },
                  { icon: FiGrid, color: "#D5775D" },
                  { icon: FiLayers, color: "#9C76B2" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center animate-float-slow"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Ready to build something <span className="bg-[#9C76B2] bg-clip-text text-transparent">amazing?</span>
              </h3>
              
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                Whether you need a full-stack application, a stunning design, or just some advice — I'm here to help.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D5775D] to-[#FBB267] hover:from-[#D5775D] hover:to-[#FBB267] px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                >
                  <span>Start your project</span>
                  <FiArrowRight className="w-4 h-4" />
                </a>
                
                <a
                  href="#Projects"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#FBB267]/30 hover:border-[#FBB267]/50 bg-white/50 px-8 py-3.5 rounded-full font-semibold text-gray-600 hover:text-[#D5775D] transition-all duration-300"
                >
                  <FiGrid className="w-4 h-4" />
                  <span>See my work</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 && projects.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>

      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={loginAsAdmin}
        isLoading={isLoading}
        error={adminError}
      />

      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => {
          setShowProjectModal(false);
          setCurrentEditProject(null);
        }}
        isEdit={false}
        projectData={null}
        onSubmit={handleAddProject}
        onRestore={handleRestoreLastDeleted}
        onLogout={logoutAdmin}
        isLoading={isLoading}
      />

      <EditProjectModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setCurrentEditProject(null);
        }}
        projectData={currentEditProject}
        onUpdate={handleEditProject}
        onDelete={handleDeleteFromEdit}
        isLoading={isLoading}
      />
    </section>
  );
}

export default Projects;