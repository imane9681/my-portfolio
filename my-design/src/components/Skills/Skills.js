// Skills.js - نسخة محدثة مع جميع المهارات الجديدة
import React, { useEffect, useRef, useState } from 'react';
import { 
  SiReact, SiJavascript, SiPython, SiTailwindcss, 
  SiNodedotjs, SiMysql, SiMongodb, SiGit,
  SiDjango, SiFigma, SiHtml5, SiCss, SiPostgresql,
  SiNextdotjs, SiTypescript, SiVite, SiSupabase, SiPhp
} from 'react-icons/si';
import { 
  FiCloud, FiLayout, FiZap, FiSave, FiPenTool,
  FiTrendingUp, FiBarChart2, FiFileText, FiDatabase, FiServer
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { IoRocket } from 'react-icons/io5';
import { MdOutlineDesignServices } from 'react-icons/md';

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
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

  // ============================================
  // جميع المهارات - مرتبة حسب المستوى
  // ============================================
  const allSkills = [
    // ===== Frontend =====
    { 
      name: "React.js", 
      description: "Hooks, Context API, Custom Hooks, Router DOM", 
      icon: SiReact, 
      level: 92, 
      cardBg: "#F5E8FA", 
      color: "#9C76B2" 
    },
    { 
      name: "JavaScript (ES6+)", 
      description: "Async/Await, Promises, Modules, OOP", 
      icon: SiJavascript, 
      level: 88, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    { 
      name: "HTML5", 
      description: "Semantic markup, Accessibility, SEO", 
      icon: SiHtml5, 
      level: 92, 
      cardBg: "#F5E8FA", 
      color: "#9C76B2" 
    },
    { 
      name: "CSS3", 
      description: "Flexbox, Grid, Animations, Dark/Light Mode", 
      icon: SiCss, 
      level: 90, 
      cardBg: "#FFF4EF", 
      color: "#E4A488" 
    },
    { 
      name: "Tailwind CSS", 
      description: "Utility-first CSS, Responsive design", 
      icon: SiTailwindcss, 
      level: 85, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    { 
      name: "Next.js", 
      description: "SSR, SSG, App Router, API Routes", 
      icon: SiNextdotjs, 
      level: 80, 
      cardBg: "#F5E8FA", 
      color: "#9C76B2" 
    },
    { 
      name: "TypeScript", 
      description: "Type safety, Interfaces, Generics", 
      icon: SiTypescript, 
      level: 75, 
      cardBg: "#F5E8FA", 
      color: "#9C76B2" 
    },
    { 
      name: "Vite", 
      description: "Build tool & dev server, Fast HMR", 
      icon: SiVite, 
      level: 70, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    
    // ===== Backend =====
    { 
      name: "Python", 
      description: "Django, DRF, Scripting, Automation", 
      icon: SiPython, 
      level: 85, 
      cardBg: "#FFF4EF", 
      color: "#E4A488" 
    },
    { 
      name: "Django REST Framework", 
      description: "RESTful APIs, Serializers, Auth, Permissions", 
      icon: SiDjango, 
      level: 82, 
      cardBg: "#F5E8FA", 
      color: "#9C76B2" 
    },
    { 
      name: "Node.js", 
      description: "Express.js, REST APIs, Middleware", 
      icon: SiNodedotjs, 
      level: 80, 
      cardBg: "#FFF4EF", 
      color: "#E4A488" 
    },
    { 
      name: "Express.js", 
      description: "API design, Routing, Error handling", 
      icon: SiNodedotjs, 
      level: 78, 
      cardBg: "#FFF4EF", 
      color: "#E4A488" 
    },
    { 
      name: "RESTful API Design", 
      description: "Best practices, Versioning, Documentation", 
      icon: FiServer, 
      level: 85, 
      cardBg: "#FFF4EF", 
      color: "#E4A488" 
    },
    { 
      name: "JWT Authentication", 
      description: "Secure auth, Tokens, Refresh tokens", 
      icon: FiCloud, 
      level: 85, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    { 
      name: "WebSockets", 
      description: "Real-time communication, Socket.io", 
      icon: FiCloud, 
      level: 70, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    { 
      name: "Supabase", 
      description: "PostgreSQL, Auth, Storage, Realtime", 
      icon: SiSupabase, 
      level: 65, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    { 
      name: "PHP", 
      description: "OOP, PDO, Sessions, Form Handling, MVC", 
      icon: SiPhp, 
      level: 75, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    
    // ===== Databases =====
    { 
      name: "PostgreSQL", 
      description: "Relational DB, SQL, Indexes, Triggers", 
      icon: SiPostgresql, 
      level: 75, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    { 
      name: "MySQL", 
      description: "Relational database, Complex queries", 
      icon: SiMysql, 
      level: 88, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    { 
      name: "MongoDB", 
      description: "NoSQL, Document-oriented, Aggregation", 
      icon: SiMongodb, 
      level: 80, 
      cardBg: "#FFF4EF", 
      color: "#E4A488" 
    },
    
    // ===== Data Visualization =====
    { 
      name: "Recharts", 
      description: "Data visualization, Charts, Dashboards", 
      icon: FiBarChart2, 
      level: 70, 
      cardBg: "#F5E8FA", 
      color: "#9C76B2" 
    },
    
    // ===== Tools =====
    { 
      name: "Git", 
      description: "Version control, Git Flow, Branching", 
      icon: SiGit, 
      level: 85, 
      cardBg: "#F5E8FA", 
      color: "#9C76B2" 
    },
    { 
      name: "Figma", 
      description: "UI/UX design, Prototyping, Wireframes", 
      icon: SiFigma, 
      level: 82, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    { 
      name: "Responsive Design", 
      description: "Mobile-first, Cross-browser, Media Queries", 
      icon: FiLayout, 
      level: 88, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    
    // ===== File Management =====
    { 
      name: "File Upload & Management", 
      description: "Multer, Cloud Storage, Validation", 
      icon: FiSave, 
      level: 75, 
      cardBg: "#FFF4EF", 
      color: "#E4A488" 
    },
    
    // ===== PDF/Excel Export =====
    { 
      name: "PDF & Excel Export", 
      description: "jsPDF, XLSX, Data export, Reports", 
      icon: FiFileText, 
      level: 65, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
    
    // ===== Deployment =====
    { 
      name: "Vercel", 
      description: "Deployment, CI/CD, Serverless Functions", 
      icon: FiCloud, 
      level: 65, 
      cardBg: "#F5F5FF", 
      color: "#7280B3" 
    },
  ];

  // ترتيب المهارات حسب المستوى (من الأعلى للأقل)
  const sortedSkills = [...allSkills].sort((a, b) => b.level - a.level);
  
  // عرض أفضل 12 مهارة فقط في البداية
  const topSkills = sortedSkills.slice(0, 12);
  const skillsToShow = showAllSkills ? sortedSkills : topSkills;

  // تقسيم المهارات إلى أعمدة متساوية
  const splitIntoColumns = (skills, numColumns) => {
    const columns = Array(numColumns).fill().map(() => []);
    skills.forEach((skill, index) => {
      columns[index % numColumns].push(skill);
    });
    return columns;
  };

  const threeColumns = splitIntoColumns(skillsToShow, 3);
  const twoColumns = splitIntoColumns(skillsToShow, 2);

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-16 md:py-20" id="skills">
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

      <div className="max-w-8xl mx-auto px-7 lg:px-[6.5vw] md:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FBB267]/10 to-[#D5775D]/10 rounded-full px-4 py-2 mb-4">
            <HiOutlineSparkles className="w-4 h-4 text-[#FBB267]" />
            <span className="text-sm text-gray-600">Technical Expertise</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#5F2C78] via-[#733A91] to-[#404C99] bg-clip-text text-transparent">
              My Skills
            </span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-[#FBB267] via-[#D5775D] to-[#9C76B2] rounded-full mx-auto mb-6" />
          
          <p className="text-gray-500 text-md md:text-lg max-w-2xl mx-auto">
            I combine technical proficiency and creative vision to deliver robust, scalable, 
            and visually stunning digital solutions.
          </p>
          
          {/* إحصائيات سريعة */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#9C76B2]"></span>
              <span>{sortedSkills.length} Skills</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#E4A488]"></span>
              <span>{sortedSkills.filter(s => s.level >= 80).length} Advanced</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#FBB267]"></span>
              <span>Full-Stack</span>
            </div>
          </div>
        </div>

        {/* Skills Grid - مع خلفية متدرجة */}
        <div className={`rounded-3xl lg:rounded-[50px] py-10 px-5 md:py-[4vw] md:px-[5vw] transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
         style={{
           background: 'linear-gradient(270deg, #17447E 0%, #404C99 24.52%, #733A91 75%, #5F2C78 100%)'
         }}>
          
          {/* 3 Columns - Desktop (lg screens and above) */}
          <div className="relative hidden lg:grid lg:grid-cols-3 gap-4">
            {threeColumns.map((column, colIdx) => (
              <div key={colIdx} className="space-y-3">
                {column.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="rounded-2xl py-4 px-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group"
                    style={{ backgroundColor: skill.cardBg }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-4 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${skill.color}15` }}>
                        <skill.icon className="w-9 h-9" style={{ color: skill.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h4 className="font-semibold text-sm sm:text-[1.2vw] truncate" style={{ color: skill.color }}>{skill.name}</h4>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: `${skill.color}10`, color: skill.color }}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="min-h-[40px]">
                          <p className="text-gray-500 text-xs sm:text-[0.9rem] leading-relaxed line-clamp-2">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* 2 Columns - Tablet (md to lg screens) */}
          <div className="relative hidden md:grid lg:hidden grid-cols-2 gap-4">
            {twoColumns.map((column, colIdx) => (
              <div key={colIdx} className="space-y-3">
                {column.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="rounded-2xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group"
                    style={{ backgroundColor: skill.cardBg }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-4 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${skill.color}15` }}>
                        <skill.icon className="w-9 h-9" style={{ color: skill.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h4 className="font-semibold text-sm sm:text-base truncate" style={{ color: skill.color }}>{skill.name}</h4>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: `${skill.color}10`, color: skill.color }}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="min-h-[40px]">
                          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* 1 Column - Mobile (below md screens) */}
          <div className="relative grid md:hidden grid-cols-1 gap-4">
            <div className="space-y-3">
              {skillsToShow.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="rounded-2xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group"
                  style={{ backgroundColor: skill.cardBg }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-4 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${skill.color}15` }}>
                      <skill.icon className="w-9 h-9" style={{ color: skill.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="font-semibold text-sm sm:text-base truncate" style={{ color: skill.color }}>{skill.name}</h4>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: `${skill.color}10`, color: skill.color }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="min-h-[40px]">
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Show More / Show Less Button */}
          {sortedSkills.length > 12 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 text-sm font-medium border border-white/20"
              >
                {showAllSkills ? (
                  <>
                    <span>Show Less</span>
                    <FiTrendingUp className="w-4 h-4 rotate-180" />
                  </>
                ) : (
                  <>
                    <span>Show All Skills ({sortedSkills.length})</span>
                    <FiTrendingUp className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Categories Summary - Professional Version */}
        <div className={`mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Frontend Category */}
          <div className="group relative bg-[#9C76B2]/10 rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden border border-[#9C76B2]/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9C76B2]/0 to-[#9C76B2]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative mb-3 inline-block">
              <div className="absolute inset-0 bg-[#9C76B2] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#9C76B2]/20 to-[#9C76B2]/30 rounded-2xl p-3 inline-block group-hover:scale-110 transition-transform duration-300">
                <SiReact className="w-8 h-8" style={{ color: '#9C76B2' }} />
              </div>
            </div>
            
            <h3 className="font-bold text-base mb-2" style={{ color: '#9C76B2' }}>Frontend Development</h3>
            <div className="w-0 h-0.5 bg-gradient-to-r from-[#9C76B2] to-[#9C76B2]/40 mx-auto rounded-full group-hover:w-12 transition-all duration-300 mb-2"></div>    
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">React.js</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">JavaScript</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">Next.js</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">TypeScript</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[#9C76B2]/10 flex items-center justify-center gap-1">
              <FiZap className="w-3.5 h-3.5" style={{ color: '#9C76B2' }} />
              <span className="text-xs text-[#9C76B2] font-semibold">Advanced Level</span>
            </div>
          </div>

          {/* Backend Category */}
          <div className="group relative bg-[#E4A488]/10 rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden border border-[#E4A488]/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E4A488]/0 to-[#E4A488]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative mb-3 inline-block">
              <div className="absolute inset-0 bg-[#E4A488] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#E4A488]/20 to-[#E4A488]/30 rounded-2xl p-3 inline-block group-hover:scale-110 transition-transform duration-300">
                <SiPython className="w-8 h-8" style={{ color: '#E4A488' }} />
              </div>
            </div>
            
            <h3 className="font-bold text-base mb-2" style={{ color: '#E4A488' }}>Backend & APIs</h3>
            <div className="w-0 h-0.5 bg-gradient-to-r from-[#E4A488] to-[#E4A488]/40 mx-auto rounded-full group-hover:w-12 transition-all duration-300 mb-2"></div>    
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">Django REST</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">Node.js</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">Express.js</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">PHP</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[#E4A488]/10 flex items-center justify-center gap-1">
              <IoRocket className="w-3.5 h-3.5" style={{ color: '#E4A488' }} />
              <span className="text-xs text-[#E4A488] font-semibold">Expert Level</span>
            </div>
          </div>

          {/* Database Category */}
          <div className="group relative bg-[#7280B3]/10 rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden border border-[#7280B3]/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7280B3]/0 to-[#7280B3]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative mb-3 inline-block">
              <div className="absolute inset-0 bg-[#7280B3] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#7280B3]/20 to-[#7280B3]/30 rounded-2xl p-3 inline-block group-hover:scale-110 transition-transform duration-300">
                <FiDatabase className="w-8 h-8" style={{ color: '#7280B3' }} />
              </div>
            </div>
            
            <h3 className="font-bold text-base mb-2" style={{ color: '#7280B3' }}>Databases</h3>
            <div className="w-0 h-0.5 bg-gradient-to-r from-[#7280B3] to-[#7280B3]/40 mx-auto rounded-full group-hover:w-12 transition-all duration-300 mb-2"></div>    
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">PostgreSQL</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">MySQL</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">MongoDB</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[#7280B3]/10 flex items-center justify-center gap-1">
              <FiSave className="w-3.5 h-3.5" style={{ color: '#7280B3' }} />
              <span className="text-xs text-[#7280B3] font-semibold">Optimized Queries</span>
            </div>
          </div>

          {/* Tools & Design Category */}
          <div className="group relative bg-[#FBB267]/10 rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden border border-[#FBB267]/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FBB267]/0 to-[#FBB267]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative mb-3 inline-block">
              <div className="absolute inset-0 bg-[#FBB267] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#FBB267]/20 to-[#FBB267]/30 rounded-2xl p-3 inline-block group-hover:scale-110 transition-transform duration-300">
                <MdOutlineDesignServices className="w-8 h-8" style={{ color: '#FBB267' }} />
              </div>
            </div>
            
            <h3 className="font-bold text-base mb-2" style={{ color: '#FBB267' }}>Tools & Data</h3>
            <div className="w-0 h-0.5 bg-gradient-to-r from-[#FBB267] to-[#FBB267]/40 mx-auto rounded-full group-hover:w-12 transition-all duration-300 mb-2"></div>    
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">Figma</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">Recharts</span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/50 text-gray-700 font-medium">Vercel</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[#FBB267]/10 flex items-center justify-center gap-1">
              <FiPenTool className="w-3.5 h-3.5" style={{ color: '#FBB267' }} />
              <span className="text-xs text-[#FBB267] font-semibold">Creative Vision</span>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className={`mt-12 text-center transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-md text-gray-400">
            ✨ Continuously expanding my skillset with new technologies and best practices
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-300">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#9C76B2]"></span>
              {sortedSkills.filter(s => s.level >= 80).length} Advanced
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#E4A488]"></span>
              {sortedSkills.filter(s => s.level >= 60 && s.level < 80).length} Intermediate
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#FBB267]"></span>
              {sortedSkills.length} Total Skills
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;