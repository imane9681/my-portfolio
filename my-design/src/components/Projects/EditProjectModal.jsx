import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiTrash2, FiUpload } from 'react-icons/fi';

const EditProjectModal = ({
  isOpen,
  onClose,
  projectData,
  onUpdate,
  onDelete,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [],
    tags: [],
    img: '',
    liveLink: '',
    githubLink: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [serverUrl, setServerUrl] = useState('');

  // جلب عنوان السيرفر
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setServerUrl(data.serverUrl))
      .catch(() => setServerUrl('http://localhost:5000'));
  }, []);

  // Update form data when project to edit changes
  useEffect(() => {
    if (projectData) {
      let tagsArray = [];
      if (Array.isArray(projectData.tags)) {
        tagsArray = projectData.tags;
      } else if (typeof projectData.tags === 'string' && projectData.tags) {
        tagsArray = projectData.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
      
      let imgUrl = projectData.img || '';
      if (imgUrl.startsWith('/uploads') && serverUrl) {
        imgUrl = `${serverUrl}${imgUrl}`;
      }
      
      setFormData({
        title: projectData.title || '',
        description: projectData.description || '',
        categories: projectData.categories || (projectData.category ? [projectData.category] : []),
        tags: tagsArray,
        img: imgUrl,
        liveLink: projectData.liveLink || '',
        githubLink: projectData.githubLink || ''
      });
      setImagePreview(imgUrl);
    }
  }, [projectData, serverUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // دالة لتبديل اختيار الفئة
  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      const currentCategories = prev.categories || [];
      if (currentCategories.includes(category)) {
        return {
          ...prev,
          categories: currentCategories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...currentCategories, category]
        };
      }
    });
  };

  // دالة لتبديل اختيار الهاشتاج
  const handleTagToggle = (tag) => {
    setFormData(prev => {
      const currentTags = prev.tags || [];
      if (currentTags.includes(tag)) {
        return {
          ...prev,
          tags: currentTags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          tags: [...currentTags, tag]
        };
      }
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert("Please select an image file");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Please fill in title and description");
      return;
    }
    if (!formData.categories || formData.categories.length === 0) {
      alert("Please select at least one category");
      return;
    }
    
    const submitData = {
      ...formData,
      tags: formData.tags.join(', '),
      liveLink: formData.liveLink || '',
      githubLink: formData.githubLink || '',
      links: JSON.stringify([
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
      ])
    };
    onUpdate(submitData, selectedFile);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      onDelete(projectData._id);
      onClose();
    }
  };

  // قائمة الفئات المتاحة
  const availableCategories = [
    { id: 'web', label: 'Web Development', color: '#9C76B2', bgLight: '#F5E8FA' },
    { id: 'design', label: 'UI/UX Design', color: '#FBB267', bgLight: '#FFF4EF' },
    { id: 'fullstack', label: 'Full Stack', color: '#D5775D', bgLight: '#FEF0EC' },
    { id: 'ai', label: 'AI / Machine Learning', color: '#8B5CF6', bgLight: '#F0ECFE' }
  ];

  // قائمة الهاشتاجات المتاحة
  const availableTags = [
     // Frontend
  { id: 'react', label: 'React', color: '#61DAFB', bgLight: '#E8F9FF' },
  { id: 'nextjs', label: 'Next.js', color: '#000000', bgLight: '#F0F0F0' },
  { id: 'typescript', label: 'TypeScript', color: '#3178C6', bgLight: '#E8F0FE' },
  { id: 'javascript', label: 'JavaScript', color: '#F7DF1E', bgLight: '#FFFCE8' },
  { id: 'tailwind', label: 'Tailwind CSS', color: '#06B6D4', bgLight: '#E8FDFF' },
  { id: 'css3', label: 'CSS3', color: '#1572B6', bgLight: '#EBF3FA' },
  { id: 'html5', label: 'HTML5', color: '#E34F26', bgLight: '#FEF0EC' },
  { id: 'framer', label: 'Framer Motion', color: '#000000', bgLight: '#F0F0F0' },
  { id: 'recharts', label: 'Recharts', color: '#22B573', bgLight: '#E8F8F0' },
  { id: 'responsive', label: 'Responsive Design', color: '#9C76B2', bgLight: '#F5E8FA' },
  
  // Backend
  { id: 'nodejs', label: 'Node.js', color: '#339933', bgLight: '#E8F5E8' },
  { id: 'express', label: 'Express.js', color: '#000000', bgLight: '#F0F0F0' },
  { id: 'python', label: 'Python', color: '#3776AB', bgLight: '#EBF3FA' },
  { id: 'django', label: 'Django', color: '#092E20', bgLight: '#E8F0EA' },
  { id: 'jwt', label: 'JWT', color: '#000000', bgLight: '#F0F0F0' },
  { id: 'bcrypt', label: 'Bcrypt', color: '#000000', bgLight: '#F0F0F0' },
  { id: 'multer', label: 'Multer', color: '#000000', bgLight: '#F0F0F0' },
  { id: 'nodemailer', label: 'Nodemailer', color: '#000000', bgLight: '#F0F0F0' },
  { id: 'pdfkit', label: 'PDFKit', color: '#000000', bgLight: '#F0F0F0' },
  { id: 'exceljs', label: 'ExcelJS', color: '#217346', bgLight: '#E8F5ED' },
  
  // Databases
  { id: 'postgresql', label: 'PostgreSQL', color: '#336791', bgLight: '#E8F0F5' },
  { id: 'mongodb', label: 'MongoDB', color: '#47A248', bgLight: '#E8F5E8' },
  { id: 'mysql', label: 'MySQL', color: '#4479A1', bgLight: '#EBF2F7' },
  { id: 'supabase', label: 'Supabase', color: '#3ECF8E', bgLight: '#E8FDF5' },
  
  // Tools
  { id: 'git', label: 'Git', color: '#F05032', bgLight: '#FEF0EC' },
  { id: 'figma', label: 'Figma', color: '#F24E1E', bgLight: '#FEF0EC' },
  { id: 'vercel', label: 'Vercel', color: '#000000', bgLight: '#F0F0F0' },
  { id: 'api', label: 'REST APIs', color: '#FF6C37', bgLight: '#FFF0EA' },
  
  // AI
  { id: 'groq', label: 'Groq AI', color: '#F55036', bgLight: '#FEF0EC' },
  { id: 'ai', label: 'AI/ML', color: '#8B5CF6', bgLight: '#F0ECFE' },
  
  // Real-time
  { id: 'socketio', label: 'Socket.io', color: '#010101', bgLight: '#F0F0F0' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FBB267]/20 to-[#D5775D]/20 flex items-center justify-center">
              <FiSave className="w-5 h-5 text-[#D5775D]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Edit Project</h3>
              <p className="text-xs text-gray-500 mt-0.5">Update your project information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 hover:rotate-90"
          >
            <FiX className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., E-Commerce Website"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D5775D] focus:ring-3 focus:ring-[#D5775D]/20 outline-none transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              placeholder="Describe your project..."
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D5775D] focus:ring-3 focus:ring-[#D5775D]/20 outline-none transition-all resize-none"
              required
            />
          </div>

          {/* Categories - Multiple Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categories * 
              <span className="text-xs font-normal text-gray-400 ml-2">(select one or more)</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {availableCategories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryToggle(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    formData.categories?.includes(cat.id)
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: formData.categories?.includes(cat.id) ? cat.color : undefined
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ 
                    backgroundColor: formData.categories?.includes(cat.id) ? 'white' : cat.color,
                    boxShadow: formData.categories?.includes(cat.id) ? '0 0 0 1px rgba(255,255,255,0.5)' : 'none'
                  }} />
                  {cat.label}
                  {formData.categories?.includes(cat.id) && (
                    <FiX className="w-3 h-3 ml-1 opacity-70 hover:opacity-100" />
                  )}
                </button>
              ))}
            </div>
            {formData.categories && formData.categories.length > 0 && (
              <p className="text-xs text-green-600 mt-2">
                ✓ {formData.categories.length} category(ies) selected
              </p>
            )}
          </div>

          {/* Tags - Multiple Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Technologies & Tags 
              <span className="text-xs font-normal text-gray-400 ml-2">(select one or more)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    formData.tags?.includes(tag.id)
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: formData.tags?.includes(tag.id) ? tag.color : undefined
                  }}
                >
                  <span className="text-sm">#</span>
                  {tag.label}
                  {formData.tags?.includes(tag.id) && (
                    <FiX className="w-2.5 h-2.5 ml-0.5 opacity-70 hover:opacity-100" />
                  )}
                </button>
              ))}
            </div>
            {formData.tags && formData.tags.length > 0 && (
              <p className="text-xs text-blue-600 mt-2">
                ✓ {formData.tags.length} technology(ies) selected
              </p>
            )}
          </div>

          {/* 🔗 Live Demo URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔗 Live Demo URL
            </label>
            <input
              type="url"
              name="liveLink"
              placeholder="https://your-project.vercel.app"
              value={formData.liveLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D5775D] focus:ring-3 focus:ring-[#D5775D]/20 outline-none transition-all"
            />
          </div>

          {/* 🔗 GitHub Repository URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔗 GitHub Repository URL
            </label>
            <input
              type="url"
              name="githubLink"
              placeholder="https://github.com/your-username/repo"
              value={formData.githubLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D5775D] focus:ring-3 focus:ring-[#D5775D]/20 outline-none transition-all"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Image</label>
            <div
              onClick={() => document.getElementById('edit-file-input').click()}
              className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#D5775D] hover:bg-[#D5775D]/5 transition-all duration-300"
            >
              <input
                id="edit-file-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-40 mx-auto rounded-lg object-contain"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setSelectedFile(null);
                      setFormData(prev => ({ ...prev, img: "" }));
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <>
                  <FiUpload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </>
              )}
            </div>
          </div>

          {/* Actions Buttons */}
          <div className="sticky bottom-0 bg-white pt-4 flex gap-3">
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Delete Project</span>
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FBB267] to-[#D5775D] text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiSave className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;