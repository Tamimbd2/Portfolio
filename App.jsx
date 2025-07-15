import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three'; // Import Three.js
import {
  Code, FileCode, Database, Github, Cloud, PenTool, Image, Video, Mic, Sparkles, Linkedin,
  Smartphone, Globe, Layout, Server, Mail, Facebook, MessageSquare
} from 'lucide-react'; // Import Lucide React icons

// Map icon names to Lucide React components
const IconMap = {
  code: Code,
  'file-html': FileCode,
  'file-css': FileCode,
  'file-javascript': FileCode,
  database: Database,
  github: Github,
  cloud: Cloud,
  'pen-tool': PenTool,
  image: Image,
  video: Video,
  mic: Mic,
  smartphone: Smartphone,
  globe: Globe,
  layout: Layout,
  server: Server,
  mail: Mail,
  facebook: Facebook,
  whatsapp: MessageSquare
};

// CursorFollower Component
const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed z-50 pointer-events-none w-8 h-8 rounded-full bg-[#5378f6] opacity-30 blur-lg transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out animate-pulse-slow"
      style={{ left: mousePosition.x, top: mousePosition.y }}
    ></div>
  );
};

// TypewriterEffect Component
const TypewriterEffect = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100; // Speed of typing (ms)
  const deletingSpeed = 50; // Speed of deleting (ms)
  const pauseBeforeDelete = 1500; // Pause before deleting (ms)
  const pauseBeforeType = 500; // Pause before typing next word (ms)

  useEffect(() => {
    const handleType = () => {
      const fullWord = words[currentWordIndex];
      if (isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullWord) {
        // Pause at end of word, then start deleting
        setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      } else if (isDeleting && currentText === '') {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    };

    const timeout = setTimeout(
      handleType,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseBeforeDelete]);

  return (
    <span className="font-extrabold text-[#5378f6]">
      {currentText}
      <span className="animate-blink">|</span> {/* Blinking cursor */}
    </span>
  );
};


// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosFor3D, setMousePosFor3D] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMoveFor3D = (event) => {
      setMousePosFor3D({
        x: (event.clientX / window.innerWidth) * 2 - 1, // Normalize to -1 to +1
        y: -(event.clientY / window.innerHeight) * 2 + 1 // Normalize to -1 to +1
      });
    };
    window.addEventListener('mousemove', handleMouseMoveFor3D);
    return () => window.removeEventListener('mousemove', handleMouseMoveFor3D);
  }, []);

  const portfolioData = {
    name: "Tamim.dev",
    taglineWords: ["Flutter Developer", "Digital Content Creator"], // Changed tagline to an array for typewriter effect
    about: {
      paragraph1: "As a Flutter developer and digital content creator, I specialize in crafting high-performance, cross-platform mobile applications while also producing engaging, visually impactful video content. My work blends the precision of technology with the creativity of storytelling—delivering seamless, user-centric experiences that connect with audiences on both functional and emotional levels. With a passion for clean code, elegant design, and meaningful narratives, I aim to transform ideas into digital realities that inform, inspire, and innovate.",
      paragraph2: "",
      paragraph3: ""
    },
    services: [
      {
        title: "Mobile Apps",
        description: "Professional development of applications for Android and iOS.",
        icon: "smartphone"
      },
      {
        title: "Web Development",
        description: "High-quality development of sites at the professional level.",
        icon: "globe"
      },
      {
        title: "UI/UX Design",
        description: "The most modern and high-quality design made at a professional level.",
        icon: "layout"
      },
      {
        title: "Backend Development",
        description: "High-performance backend services designed for scalability and seamless user experience.",
        icon: "server"
      }
    ],
    skills: [
      {
        category: "Programming Language",
        items: [
          { name: "Dart", icon: "code" },
          { name: "HTML", icon: "file-html" },
          { name: "CSS", icon: "file-css" },
          { name: "JavaScript", icon: "file-javascript" },
          { name: "Java", icon: "code" },
          { name: "C", icon: "code" }
        ]
      },
      {
        category: "Databases",
        items: [
          { name: "MySQL", icon: "database" },
          { name: "Firebase", icon: "database" },
          { name: "MongoDB", icon: "database" }
        ]
      },
      {
        category: "Tool & Other",
        items: [
          { name: "Github", icon: "github" },
          { name: "Netlify", icon: "cloud" },
          { name: "Vercel", icon: "cloud" },
          { name: "Figma", icon: "pen-tool" },
          { name: "Canva", icon: "image" },
          { name: "Android Studio", icon: "code" }
        ]
      },
      {
        category: "Tools for Content Creation",
        items: [
          { name: "Adobe Premiere Pro", icon: "video" },
          { name: "CapCut", icon: "video" },
          { name: "Adobe Photoshop", icon: "image" },
          { name: "Canva Pro", icon: "image" },
          { name: "Audacity", icon: "mic" }
        ]
      }
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration. Built with React, Node.js, Express, and MongoDB.",
        technologies: ["React", "Redux", "Node.js", "Express.js", "MongoDB", "Stripe API", "Tailwind CSS"],
        image: "https://placehold.co/600x400/1e293b/a78bfa?text=E-commerce+App",
        liveUrl: "#",
        githubUrl: "#"
      },
      {
        id: 2,
        title: "Task Management App",
        description: "A responsive task management application allowing users to create, update, and delete tasks. Features drag-and-drop reordering and filtering options. Built with React and Firebase.",
        technologies: ["React", "Firebase (Firestore, Auth)", "Tailwind CSS"],
        image: "https://placehold.co/600x400/1e293b/34d399?text=Task+App",
        liveUrl: "#",
        githubUrl: "#"
      },
      {
        id: 3,
        title: "Personal Blog",
        description: "A modern, responsive blog platform with a content management system (CMS) integration. Features markdown support and dynamic content loading. Built with Next.js and a headless CMS.",
        technologies: ["Next.js", "GraphQL", "Headless CMS (e.g., Strapi)", "TypeScript", "Tailwind CSS"],
        image: "https://placehold.co/600x400/1e293b/facc15?text=Blog+Site",
        liveUrl: "#",
        githubUrl: "#"
      }
    ],
    contact: {
      email: "itstamim.ban@gmail.com",
      linkedin: "https://www.linkedin.com/in/MahabubTamim/",
      github: "https://github.com/Tamimbd2",
      facebook: "https://www.facebook.com/fb.tamim",
      whatsapp: "https://wa.me/+8801744463419"
    }
  };

  // Helper function for smooth scrolling (optional, but good for dynamic feel)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-inter text-gray-200">
      {/* Cursor Follower */}
      <CursorFollower />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950 shadow-lg py-4 px-6 md:px-12 border-b border-[#5378f6]">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-[#5378f6] hover:text-blue-300 transition-colors duration-300">
            {portfolioData.name.split(' ')[0]}
          </a>
          <div className="hidden md:flex space-x-6">
            <NavItem id="home" label="Home" activeSection={activeSection} onClick={scrollToSection} />
            <NavItem id="about" label="About" activeSection={activeSection} onClick={scrollToSection} />
            <NavItem id="services" label="Services" activeSection={activeSection} onClick={scrollToSection} />
            <NavItem id="skills" label="Skills" activeSection={activeSection} onClick={scrollToSection} />
            <NavItem id="projects" label="Projects" activeSection={activeSection} onClick={scrollToSection} />
            <NavItem id="contact" label="Contact" activeSection={activeSection} onClick={scrollToSection} />
          </div>
          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden">
            <button className="text-gray-400 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Background */}
      <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center min-h-screen-75 overflow-hidden">
        {/* Three.js Canvas */}
        <ThreeDBackground mousePos={mousePosFor3D} />
        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 animate-fade-in-up">
            Hi, I'm <span className="text-[#5378f6]">{portfolioData.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up delay-200">
            <TypewriterEffect words={portfolioData.taglineWords} />
          </p>
          <button
            onClick={() => scrollToSection('projects')}
            className="bg-[#5378f6] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in-up delay-400"
          >
            View My Work
          </button>
          {/* Social Icons below "View My Work" button */}
          <div className="flex justify-center space-x-6 mt-8 animate-fade-in-up delay-500">
            <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5378f6] transition-colors duration-300">
              <Linkedin size={32} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5378f6] transition-colors duration-300">
              <Github size={32} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">About Me</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            {/* Removed photo div */}
            <div className="md:w-full text-lg text-gray-300 leading-relaxed text-center md:text-left"> {/* Adjusted width and alignment */}
              {portfolioData.about.paragraph1 && <p className="mb-4">{portfolioData.about.paragraph1}</p>}
              {portfolioData.about.paragraph2 && <p className="mb-4">{portfolioData.about.paragraph2}</p>}
              {portfolioData.about.paragraph3 && <p>{portfolioData.about.paragraph3}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* What I'm Doing Section */}
      <section id="services" className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">What I'm Doing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioData.services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.skills.map((skillCategory, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#5378f6]">
                <h3 className="text-2xl font-semibold text-[#5378f6] mb-4">{skillCategory.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillCategory.items.map((skill, skillIndex) => {
                    const IconComponent = IconMap[skill.icon];
                    return (
                      <span key={skillIndex} className="bg-blue-900 text-blue-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center space-x-2">
                        {IconComponent && <IconComponent size={16} />}
                        <span>{skill.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {portfolioData.projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Get In Touch</h2>
          <div className="flex flex-col md:flex-row md:space-x-12">
            {/* Contact Form (Placeholder) */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <p className="text-lg text-gray-300 mb-6">
                I'm always open to new opportunities and collaborations. Feel free to reach out using the form below, or connect with me directly.
              </p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#5378f6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#5378f6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Message"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#5378f6] focus:border-transparent resize-y"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#5378f6] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Send Message
                </button>
                <p className="text-gray-400 text-xs mt-2">
                  *Note: This form is for display purposes. For actual email sending, a backend service is required.
                </p>
              </form>
            </div>

            {/* Direct Contact Info (Icons only) */}
            <div className="md:w-1/2 flex flex-col items-center md:items-start space-y-6 mt-8 md:mt-0">
              {/* Email with icon */}
              <a href={`mailto:${portfolioData.contact.email}`} className="flex items-center space-x-3 text-lg text-[#5378f6] hover:text-blue-300 transition-colors duration-300">
                <Mail size={24} />
                <span>{portfolioData.contact.email}</span>
              </a>
              <div className="flex space-x-6 mt-6">
                <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5378f6] transition-colors duration-300">
                  <Linkedin size={32} />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5378f6] transition-colors duration-300">
                  <Github size={32} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href={portfolioData.contact.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5378f6] transition-colors duration-300">
                  <Facebook size={32} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href={portfolioData.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5378f6] transition-colors duration-300">
                  <MessageSquare size={32} />
                  <span className="sr-only">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8 text-center border-t border-[#5378f6]">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
          <p className="text-sm mt-2">Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

// NavItem Component
const NavItem = ({ id, label, activeSection, onClick }) => (
  <a
    href={`#${id}`}
    onClick={(e) => {
      e.preventDefault();
      onClick(id);
    }}
    className={`text-lg font-medium hover:text-[#5378f6] transition-colors duration-300 ${
      activeSection === id ? 'text-[#5378f6] font-semibold' : 'text-gray-300'
    }`}
  >
    {label}
  </a>
);

// Service Card Component
const ServiceCard = ({ service }) => {
  const IconComponent = IconMap[service.icon];
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#5378f6] text-center">
      <div className="text-[#5378f6] mb-4 flex justify-center">
        {IconComponent && <IconComponent size={48} strokeWidth={1.5} />}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
      <p className="text-gray-300 text-sm">{service.description}</p>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project }) => {
  const [generatedDescription, setGeneratedDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGenerated, setShowGenerated] = useState(false);

  // Function to call Gemini API and generate description
  const generateProjectDescription = async () => {
    setIsLoading(true);
    setGeneratedDescription(null); // Clear previous generation
    setShowGenerated(true); // Ensure the section is visible

    try {
      const prompt = `Given the following project details, generate a more detailed and engaging description (around 100-150 words) that highlights its key features and impact. Focus on the value it provides.

Project Title: ${project.title}
Technologies: ${project.technologies.join(', ')}
Current Description: ${project.description}`;

      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };

      // Using empty string for API key, Canvas will provide it at runtime
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setGeneratedDescription(text);
      } else {
        setGeneratedDescription("Failed to generate description. Please try again.");
        console.error("Gemini API response structure unexpected:", result);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setGeneratedDescription("Error generating description. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out border border-[#5378f6]">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-56 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/333333/999999?text=Image+Error`; }}
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-300 mb-4 text-base">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-start space-x-4 mb-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-[#5378f6] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-700 text-gray-200 text-sm font-medium rounded-md hover:bg-gray-600 transition-colors duration-300 shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.165 6.839 9.48.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.007.07 1.532 1.03 1.532 1.03.89 1.529 2.336 1.089 2.904.832.091-.646.352-1.089.636-1.338-2.22-.253-4.555-1.11-4.555-4.945 0-1.09.39-1.984 1.029-2.682-.103-.253-.446-1.27.097-2.659 0 0 .84-.27 2.75 1.025.798-.222 1.647-.333 2.497-.333.85 0 1.699.111 2.497.333 1.909-1.295 2.747-1.025 2.747-1.025.546 1.389.202 2.406.099 2.659.64.698 1.028 1.592 1.028 2.682 0 3.843-2.339 4.686-4.566 4.935.359.308.678.915.678 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.18.579.688.482C21.137 20.165 24 16.419 24 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
            GitHub
          </a>
        </div>
        <button
          onClick={generateProjectDescription}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-[#5378f6] text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors duration-300 shadow-md mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Sparkles size={16} className="mr-2" />
          )}
          {isLoading ? 'Generating...' : 'Generate Description ✨'}
        </button>

        {showGenerated && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-[#5378f6]">
            <h4 className="text-lg font-semibold text-blue-300 mb-2">Generated Description:</h4>
            {generatedDescription ? (
              <p className="text-gray-300 text-sm">{generatedDescription}</p>
            ) : (
              <p className="text-gray-400 text-sm">Description will appear here...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ThreeDBackground Component
const ThreeDBackground = ({ mousePos }) => {
  const mountRef = useRef(null);
  const animationFrameId = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const mainObjectRef = useRef(null);
  const particlesRef = useRef(null);
  const linesRef = useRef(null);

  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    if (mainObjectRef.current) {
      mainObjectRef.current.rotation.x += 0.001;
      mainObjectRef.current.rotation.y += 0.001;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0001;
    }

    if (linesRef.current) {
      const positions = linesRef.current.geometry.attributes.position.array;
      const time = Date.now() * 0.0001;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.5 + time) * 0.2 + Math.cos(y * 0.5 + time) * 0.2;
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.rotation.y += 0.00005;
    }

    if (cameraRef.current) {
      cameraRef.current.position.x += (mousePos.x * 0.5 - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y += (mousePos.y * 0.5 - cameraRef.current.position.y) * 0.05;
      cameraRef.current.lookAt(sceneRef.current.position);
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationFrameId.current = requestAnimationFrame(animate);
  }, [mousePos]);

  useEffect(() => {
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(rendererRef.current.domElement);

    cameraRef.current.position.z = 5;

    const dodecahedronGeometry = new THREE.DodecahedronGeometry(1.5);
    const dodecahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x5378f6, // Changed to #5378f6
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    mainObjectRef.current = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
    sceneRef.current.add(mainObjectRef.current);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x5378f6, // Changed to #5378f6
      size: 0.04,
      transparent: true,
      opacity: 0.7
    });
    particlesRef.current = new THREE.Points(particleGeometry, particleMaterial);
    sceneRef.current.add(particlesRef.current);

    const lineGeometry = new THREE.BufferGeometry();
    const linePoints = [];
    const gridSize = 10;
    const segments = 20;
    const spacing = gridSize / segments;

    for (let i = 0; i <= segments; i++) {
      const y = -gridSize / 2 + i * spacing;
      linePoints.push(new THREE.Vector3(-gridSize / 2, y, 0));
      linePoints.push(new THREE.Vector3(gridSize / 2, y, 0));
    }
    for (let i = 0; i <= segments; i++) {
      const x = -gridSize / 2 + i * spacing;
      linePoints.push(new THREE.Vector3(x, -gridSize / 2, 0));
      linePoints.push(new THREE.Vector3(x, gridSize / 2, 0));
    }

    lineGeometry.setFromPoints(linePoints);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5378f6, // Changed to #5378f6
      transparent: true,
      opacity: 0.3,
      linewidth: 1
    });
    linesRef.current = new THREE.LineSegments(lineGeometry, lineMaterial);
    linesRef.current.position.z = -5;
    linesRef.current.rotation.x = Math.PI / 2;
    sceneRef.current.add(linesRef.current);

    const ambientLight = new THREE.AmbientLight(0x222222);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x404040, 0.5);
    directionalLight.position.set(1, 1, 1).normalize();
    sceneRef.current.add(directionalLight);

    const handleResize = () => {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (mountRef.current && rendererRef.current.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      sceneRef.current.traverse((object) => {
        if (object.isMesh || object.isLineSegments || object.isPoints) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) object.material.dispose();
        }
      });
      rendererRef.current.dispose();
    };
  }, [animate]);

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 opacity-70">
      {/* The Three.js canvas will be appended here */}
    </div>
  );
};

export default App;
