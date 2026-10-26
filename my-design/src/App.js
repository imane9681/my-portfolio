import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/global.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

axios.defaults.withCredentials = true;

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState([]);
  const [serverUrl, setServerUrl] = useState('');

  useEffect(() => {
  // قراءة رابط الخادم من ملف .env
  const url = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  setServerUrl(url);
  console.log("✅ Server URL:", url);
}, []);

  useEffect(() => {
    if (!serverUrl) return;

    axios.get(`${serverUrl}/api/projects`)
      .then((response) => {
        console.log("Projects loaded:", response.data.length);
        setProjects(response.data);
      })
      .catch(error => console.error("Error fetching projects:", error));

    const checkAdminStatus = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/auth/check`,
          { withCredentials: true }
        );
        setIsAdmin(res.data.isAdmin);
      } catch (err) {
        console.error("Failed to check admin status:", err);
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
  }, [serverUrl]);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!serverUrl) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#17447E] via-[#404C99] via-[#733A91] to-[#5F2C78]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#9C76B2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  const particles = [...Array(40)].map((_, i) => ({
    id: i,
    size: 2 + Math.random() * 5,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 4 + Math.random() * 6,
    opacity: 0.1 + Math.random() * 0.2
  }));

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden page-background">
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[5%] w-[150px] h-[150px] md:w-[300px] md:h-[300px] bg-[#FBB267]/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[5%] w-[180px] h-[180px] md:w-[350px] md:h-[350px] bg-[#D5775D]/10 rounded-full blur-[100px] md:blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-[#9C76B2]/8 rounded-full blur-[100px] md:blur-[140px] animate-pulse-slow delay-2000" />
        
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              background: `rgba(251, 178, 103, ${particle.opacity})`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FBB267]/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#9C76B2]/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="hero-wrapper">
          <img 
            src="/images/Ellipse1.png" 
            className="absolute hidden md:block md:w-[20vw] lg:w-[20vw] xl:w-[16vw]" 
            alt="Ellipse 1" 
          />
          <Navbar onNavClick={handleNavClick} />
          <Hero onNavClick={handleNavClick} />
        </div>

        <div className="wave wave-desktop">
          <img src="/images/Group26.png" className="wave00" alt="wave" />
        </div>

        <div className="wave wave-mobile">
          <img src="/images/Group026.png" className="wave00" alt="wave" />
        </div>

        <About />

        <div className="wave wave-desktop">
          <img src="/images/Vector111.png" className="wave001" alt="wave" />
        </div>

        <div className="wave wave-mobile">
          <img src="/images/Vector4.png" className="wave001" alt="wave" />
        </div>

        <Services />

        <div className="wave1 wave-desktop">
          <img src="/images/Vector02.png" className="wave2" alt="wave2" />
        </div>

        <div className="wave wave-mobile">
          <img src="/images/Vector5.png" className="wave2" alt="wave2" />
        </div>

        <Skills />

        <Projects 
          isAdmin={isAdmin} 
          projects={projects}
        />

        <div className="wave wave-desktop">
          <img src="/images/Group27.png" className="wave3" alt="wave3" />
        </div>

        <div className="wave wave-mobile">
          <img src="/images/Group149.png" className="wave3" alt="wave3" />
        </div>

        <div className="contact-footer-wrapper">
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;