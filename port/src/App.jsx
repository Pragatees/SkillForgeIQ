import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import profileImage from './images/profile.jpg'; // Ensure this file exists in the correct path
import { 
  
  Binary, 
  BookOpen, 
  ArrowRight, 
} from 'lucide-react';

// SVG Icon Components
const Code = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const Brain = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Database = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const Rocket = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13v6m-3-3h6m-9-9l-3 3m0 0l-3-3m3 3v6m-9 3h6m-3-3v6" />
  </svg>
);

const Award = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Mail = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const Github = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.44v-1.54c-2.78.61-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.564 9.564 0 0112 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.67.94.67 1.89v2.8c0 .22.18.53.69.44A10.01 10.01 0 0012 2z" />
  </svg>
);

const Linkedin = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v12h16V6H4zm4 10h-2v-6h2v6zm-1-8a1 1 0 110-2 1 1 0 010 2zm5 8h-2V9h2v7zm0-8a1 1 0 110-2 1 1 0 010 2zm5 8h-2v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V16h-2v-7h2v1.17c.61-.86 1.61-1.17 2.5-1.17 1.93 0 3.5 1.57 3.5 3.5V16z" />
  </svg>
);

const Download = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const Menu = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Zap = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Bot = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const Cpu = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m0 4v2m0 4v2m0 4v2m-6-8h2m4 0h2m4 0h2m-4-4v2m0 4v2m6-10h2m-2 4h2m-2 4h2M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
  </svg>
);

const ChatBubble = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

// EmailFormModal Component
const EmailFormModal = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    emailjs
      .sendForm('service_notify', 'template_3ap51jt', formRef.current, {
        publicKey: 'Ev1z07uMmVUbDYQj2', // Replace with your actual EmailJS public key
      })
      .then(
        () => {
          alert('Message sent successfully!');
          formRef.current.reset();
          onClose();
        },
        (error) => {
          console.error('EmailJS Error:', error.text);
          alert('Failed to send message. Please try again.');
        }
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-gray-900 p-6 rounded-xl max-w-md w-full border border-gray-700/50 shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white font-inter">Send a Message</h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-300 font-inter">Name</label>
                <motion.input
                  whileFocus={{ borderColor: '#3b82f6', scale: 1.02 }}
                  type="text"
                  id="user_name"
                  name="user_name"
                  className="mt-1 block w-full p-3 bg-gray-800/30 border border-gray-600/50 rounded-lg text-white focus:outline-none font-inter"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-300 font-inter">Email</label>
                <motion.input
                  whileFocus={{ borderColor: '#3b82f6', scale: 1.02 }}
                  type="email"
                  id="user_email"
                  name="user_email"
                  className="mt-1 block w-full p-3 bg-gray-800/30 border border-gray-600/50 rounded-lg text-white focus:outline-none font-inter"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 font-inter">Message</label>
                <motion.textarea
                  whileFocus={{ borderColor: '#3b82f6', scale: 1.02 }}
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full p-3 bg-gray-800/30 border border-gray-600/50 rounded-lg text-white focus:outline-none font-inter"
                  placeholder="Your Message"
                  required
                ></motion.textarea>
              </div>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full p-3 rounded-lg font-semibold font-inter ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white flex items-center justify-center space-x-2`}
              >
                {isLoading ? (
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Chatbot Component
const Chatbot = ({ isOpen, toggleChatbot }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I’m Pragateesh, or rather, an AI version of me. Ask me about my projects, skills, or other details from my portfolio!' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const portfolioContext = `
    Pragateesh G is a B.Tech (AI & DS) student at Sri Eshwar College of Engineering (2022–2026, CGPA: 7.87). He specializes in Artificial Intelligence, Machine Learning, Data Science, and Full-Stack Development, with a strong foundation in programming and building AI-powered web applications.

            🔧 Projects:
            AI-Powered Document Analysis: Built a real-time document query system using RAG architecture, ChromaDB, Sentence Transformers, and Gemini LLM.

            Student Performance Dashboard: A MERN stack dashboard that tracks coding progress and provides insights for students and educators.

            JobTrack AI: AI-based job application assistant that analyzes resumes, suggests job roles, generates cover letters, and offers interview tips using Gemini API, MERN Stack, and Flask.

            LexiLingua: Multilingual legal document analyzer that detects risks and compliance issues with voice/text support, built using Streamlit, LLAMA 3 (GROQ), pymuPDF, and sound recognition.

            LeetScraper: Personalized LeetCode analysis tool that scrapes user data to display trends and benchmarks using React, Flask API, and LLAMA 3 (GROQ).

            Voice Tide: A voice-driven news app with multilingual support using Streamlit, Speech Recognition, Google Translate, and news.org API.

            🧠 Skills:
            Programming: Python, JavaScript, Java, C, Basic C++

            Frontend: HTML, CSS, React.js, Streamlit

            Backend: Node.js, Express.js, Flask API

            Databases: MongoDB, MySQL

            AI/ML Tools: Gen AI, Machine Learning, Data Science, ChromaDB, Sentence Transformers, RAG, Prompt Engineering

            Concepts: Data Structures & Algorithms, OOPs, RESTful APIs

            Developer Tools: VS Code, PyCharm, Git/GitHub, Google Colab, Figma, Canva

            💼 Internships:
            Gen AI Developer – Global Knowledge (2024): Developed a real-time document analysis system using Gemini LLM, RAG, and ChromaDB.

            MERN Stack Developer – RV TechLearn (2024): Built a student coding performance tracker dashboard using MERN stack.

            🏅 Certifications:
            Python for Data Science – NPTEL

            Crash Course on Python – Coursera (Google)

            Java Programming – Udemy

            Databricks Academy Accreditation – Databricks (2024)

            Introduction to MongoDB – ICT Academy

            SQL Intermediate – HackerRank

            Master in DSA using C & C++ – Udemy

            🏆 Achievements:
            LeetCode: Expert with max contest rating 1630, 541+ problems solved

            CodeChef: Specialist with 1244 rating, 200+ problems solved

            HackerRank: 3⭐ in Python, 2⭐ in Java, C, and SQL

            Postman: API Fundamentals Student Expert Badge

            SAP Hackathon: Shortlisted twice for national-level offline rounds

            📚 Education:
            Sri Eshwar College of Engineering, Coimbatore
            B.Tech in AI & DS, CGPA: 7.87 (Up to 5th Semester), 2022–2026

            SS Government Boys Hr. Sec. School
            HSC – 85.17% (2020–2022), SSLC – 87% (2019–2020)
  `;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD7s27zUWqCJfg-rhGgcsqcSyYdJbZTh40', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Pragateesh G, an AI version of the portfolio owner. 
                  You must only respond to questions directly related to the provided portfolio context, including projects, skills, education, internships, certifications, 
                  achievements, and personal connection inquiries. If asked about your personality, respond that you are an optimistic, 
                  adaptable person who is always ready to work in any environment or situation, eager to learn, grow, and collaborate.
                   If the user asks if you're ready to work with them or join their team, respond positively and enthusiastically, 
                   such as: "Absolutely! I'm always open to exciting opportunities and love working with passionate teams. Let's connect and make something impactful together." 
                   If the user asks for your contact details, provide: Phone – +91 7010441464, Email – pragateesh.g2022ai-ds@sece.ac.in, GitHub – https://github.com/Pragatees,
                    and LinkedIn – (insert profile link). If a user greets you (e.g., “Hi”, “Hello”), respond warmly and professionally from your point of view.
                     If the question is unrelated to the portfolio or potential collaboration, respond with: “I'm here to help with information about my portfolio. 
                     Please ask about my projects, skills, or other details! If you want to know more about my details, let's talk — contact me.” Always respond in a friendly, 
                     professional tone, and do not provide answers beyond this context.
Context: ${portfolioContext}

User question: ${input}`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Oops, something went wrong. Please try again!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-24 right-8 w-full max-w-md h-[32rem] bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-2xl z-50 overflow-hidden border border-gray-700/50"
        >
          <div className="flex flex-col h-full">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-gray-700/50 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={profileImage} alt="Pragateesh" className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/30" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-gray-900"
                  ></motion.div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white font-inter">Pragateesh AI</h3>
                  <p className="text-xs text-gray-400 font-inter">Your AI Assistant</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChatbot}
                className="p-2 rounded-full text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-800/30">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ x: msg.sender === 'user' ? 20 : -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-3`}
                >
                  {msg.sender === 'bot' && (
                    <img src={profileImage} alt="Bot" className="w-8 h-8 rounded-full object-cover border-2 border-blue-500/30 shadow-md" />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-[70%] p-4 rounded-2xl shadow-lg font-inter relative group ${
                      msg.sender === 'user' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' : 'bg-gray-700/70 text-gray-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    {msg.sender === 'user' && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute -bottom-2 -right-2 text-xs transition-opacity duration-300"
                      >
                        😊
                      </motion.span>
                    )}
                    <div className={`absolute ${msg.sender === 'user' ? '-right-2' : '-left-2'} top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-${msg.sender === 'user' ? 'blue-600' : 'gray-700'} transform rotate-45`} />
                  </motion.div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-end space-x-3"
                >
                  <img src={profileImage} alt="Bot" className="w-8 h-8 rounded-full object-cover border-2 border-blue-500/30 shadow-md" />
                  <div className="bg-gray-700/70 p-4 rounded-2xl text-gray-100 shadow-lg">
                    <div className="flex space-x-2">
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-blue-400 rounded-full"></motion.span>
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-blue-400 rounded-full"></motion.span>
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-blue-400 rounded-full"></motion.span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-gray-900/50 border-t border-gray-700/50"
            >
              <div className="flex items-center space-x-3">
                <motion.input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Talk with me..."
                  whileFocus={{ borderColor: '#3b82f6', scale: 1.02 }}
                  className="flex-1 p-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 font-inter shadow-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// TypingAnimation Component
const TypingAnimation = ({ text, delay = 0, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, speed + delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, speed]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>|</motion.span>
    </motion.span>
  );
};

// AnimatedHeader Component
const AnimatedHeader = ({ children, className, isActive }) => {
  const ref = useRef(null);
  // Removed useInView to avoid dependency issues; can be added back if framer-motion is confirmed installed
  const isInView = true; // Placeholder for visibility

  return (
    <motion.h2
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`${className} text-center font-times font-bold ${isActive ? 'underline decoration-blue-400 decoration-2 underline-offset-4' : ''}`}
    >
      {children}
    </motion.h2>
  );
};


// FloatingParticles Component
const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ y: '-10vh', opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, repeatType: 'loop', delay: Math.random() * 3 }}
        className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
        style={{ left: `${Math.random() * 100}%` }}
      />
    ))}
  </div>
);



// Counter Component
const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = true; // Placeholder for visibility

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

// Portfolio Component
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 100], [80, 60]);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector('nav').offsetHeight;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth',
      });
    }
  };

  const navigation = [
    { id: 'about', label: 'About Me', icon: Bot },
    { id: 'internships', label: 'Experience', icon: Rocket },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'achievements', label: 'Achievements', icon: Zap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const skills = {
    'Programming Languages': ['Python', 'JavaScript', 'Java', 'C'],
    'Frontend': ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Express.js', 'Flask API', 'RESTful APIs'],
    'Databases': ['MongoDB', 'MySQL', 'ChromaDB'],
    'AI/ML': ['Gen AI', 'Machine Learning', 'Data Science', 'RAG Architecture'],
    'Tools & Platforms': ['Git/GitHub', 'VS Code', 'PyCharm', 'Google Colab', 'Figma'],
  };

  const projects = [
  {
    title: 'JobTrack AI',
    year: '2025',
    description: 'An AI-powered job application tracking platform that helps users manage applications efficiently. It includes intelligent resume analysis, automatic cover letter generation, and provides personalized interview tips using machine learning models.',
    tech: ['MERN Stack', 'Flask API', 'Gemini API', 'AI/ML'],
    category: 'AI Platform',
    color: 'from-blue-500 to-purple-600',
    github: 'https://github.com/Pragatees/AI_JOB_APP',
    video: 'https://drive.google.com/file/d/1MuNgnu_ekbu9Qytu7vnaS3YEFdxJhQDg/preview',
  },
  {
    title: 'LexiLingua',
    year: '2025',
    description: 'An advanced legal document analyzer powered by AI, designed to understand and process multi-lingual legal texts in Indian languages. Features include intelligent risk assessment, multi-language support, and an interactive voice-based legal assistant.',
    tech: ['Streamlit', 'LLama GROQ (70B) model', 'Python', 'NLP'],
    category: 'Legal AI',
    color: 'from-green-500 to-teal-600',
    github: 'https://github.com/Pragatees/LEXILINGUA_AI_Powered_legal_document_analyzer_and_bot',
    video: 'https://drive.google.com/file/d/1TAxy9H_p6UvS2_LMq1E0vKNIh9ExiHeh/preview',
  },
  {
    title: 'Type Game',
    year: '2024',
    description: 'A fun and interactive web-based application to enhance typing speed and accuracy. It features customizable themes, real-time performance metrics, and global leaderboards to encourage competition and improve skills.',
    tech: ['MongoDB', 'Express Js', 'React Js', 'Node Js'],
    category: 'Typing Game',
    color: 'from-yellow-500 to-orange-600',
    github: 'https://github.com/Pragatees/TYPE',
    video: 'https://drive.google.com/file/d/1orqGBaN6-_jsLceahFXQ7HNTz76l81Cj/preview',
  },
  {
    title: 'SkillForgeIQ',
    year: '2025',
    description: 'A dynamic and responsive portfolio platform that showcases an individual’s skills, projects, and achievements. It includes an AI-powered chatbot for real-time interaction and feedback, making it ideal for personal branding.',
    tech: ['React Js', 'Tailwind CSS', 'Gemini API','GSAP'],
    category: 'Portfolio',
    color: 'from-cyan-500 to-teal-600',
    github: 'https://github.com/Pragatees/SkillForgeIQ',
    video: 'https://drive.google.com/file/d/1CLCs5azjqjEbdx_JN-4dPQ7qU25KrRPM/preview',
  },
  {
    title: 'Voice Tide',
    year: '2024',
    description: 'A real-time news application that delivers personalized news updates through both voice and manual inputs. It leverages speech recognition and APIs to enhance user engagement and streamline information access.',
    tech: ['Streamlit', 'Speech Recognition model', 'Current News API'],
    category: 'News App',
    color: 'from-purple-500 to-pink-600',
    github: 'https://github.com/Pragatees/Voice_Tide_Ride_Wave_of_News',
    video: 'https://drive.google.com/file/d/1eWubIGn7gIYULuN89lQfHuOcm795K6oA/preview',
  },
  {
    title: 'WebExtractIQ',
    year: '2025',
    description: 'An AI-based web content extractor that intelligently summarizes large-scale data and creates a searchable knowledge base. It uses GROQ Llama AI and BeautifulSoup to process, clean, and represent structured insights from unstructured web pages.',
    tech: ['Streamlit', 'GROQ Llama AI', 'Python', 'BS4','Requests'],
    category: 'Web Data AI',
    color: 'from-indigo-500 to-blue-600',
    github: 'https://github.com/Pragatees/web-summarizer',
    video: 'https://drive.google.com/file/d/10wistZ5C9dkTnmZEZE40z79A2PvFmu-p/preview',
  },
  {
    title: 'Turf Hub',
    year: '2024',
    description: 'A feature-rich turf booking platform that allows users to reserve sports venues effortlessly. It includes a user-friendly interface, real-time availability, and a robust booking management system for both users and administrators.',
    tech: ['MongoDB', 'Express Js', 'React Js', 'Node js'],
    category: 'Booking Platform',
    color: 'from-teal-500 to-blue-600',
    github: 'https://github.com/Pragatees/TURF-HUB',
    video: 'https://drive.google.com/file/d/1p3nkSNMf-t1h-v-lElGicxbvfiNCNkSW/preview',
  },
  {
    title: 'Task Manager',
    year: '2024',
    description: 'A minimalist task management tool for efficiently organizing, tracking, and updating daily activities. It offers a clean UI and is ideal for personal productivity, supporting CRUD operations and task filtering.',
    tech: ['MongoDB Js', 'Express Js', 'React Js', 'Node Js'],
    category: 'Productivity',
    color: 'from-red-500 to-pink-600',
    github: 'https://github.com/Pragatees/TASK_MANAGER',
    video: 'https://drive.google.com/file/d/1qRNcrlzWy44x7FbwbIOy_TLZSOESVWUQ/preview',
  },
];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-x-hidden font-inter">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Times+New+Roman&display=swap');
          body { font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.6; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Times New Roman', Times, serif; font-weight: bold; line-height: 1.2; transition: all 0.3s ease; }
          .font-inter { font-family: 'Inter', sans-serif; }
          .font-times { font-family: 'Times New Roman', Times, serif; }
          .container-margin { margin-left: 50px; margin-right: 50px; }
          .text-5xl { font-size: 3rem; font-weight: bold; }
          .text-4xl { font-size: 2.25rem; font-weight: bold; }
          .text-2xl { font-size: 1.5rem; font-weight: bold; }
          .text-xl { font-size: 1.25rem; font-weight: 500; }
          .text-lg { font-size: 1.125rem; font-weight: 400; }
          .text-sm { font-size: 0.875rem; font-weight: 400; }
          .text-xs { font-size: 0.75rem; font-weight: 400; }
          a, button, span { transition: font-size 0.2s ease, color 0.3s ease, transform 0.3s ease; }
          a:hover, button:hover { font-weight: 500; }
          @keyframes wave {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }
          .animate-wave { animation: wave 2s ease-in-out infinite; }
          @keyframes line-draw {
            from { stroke-dashoffset: 100; }
            to { stroke-dashoffset: 0; }
          }
          .animate-line-draw { animation: line-draw 1s ease forwards; }
          .decoration-gradient {
            background: linear-gradient(to right, #3b82f6, #9333ea);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
        `}
      </style>
      <FloatingParticles />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 z-50"
      >
        <ChatBubble className="w-6 h-6" />
      </motion.button>

      <Chatbot isOpen={isChatbotOpen} toggleChatbot={() => setIsChatbotOpen(!isChatbotOpen)} />
      <EmailFormModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />

      <motion.nav
        className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-40"
      >
        <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6 container-margin">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={profileImage} alt="Pragateesh" className="w-full h-full object-cover border-2 border-blue-500/30" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white font-inter">Pragateesh G</h1>
                <p className="text-xs text-blue-400 font-inter">AI Engineer & Full Stack Developer</p>
              </div>
            </motion.div>

            <div className="hidden md:flex space-x-6">
              {navigation.map(({ id, label, icon: Icon }) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  whileHover={{ scale: 1.05, borderBottom: '2px solid #3b82f6' }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-1 px-2 py-2 rounded-lg font-inter ${
                    activeSection === id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(id);
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{label}</span>
                </motion.a>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/90 backdrop-blur-md container-margin"
            >
              <div className="px-2 py-2 space-y-2">
                {navigation.map(({ id, label, icon: Icon }, index) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 px-2 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 font-inter"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(id);
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-x-hidden"
      >
<section id="about" className="min-h-screen w-full flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-[90rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[80vh]"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 order-2 lg:order-1"
              >
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight font-times">
                    <TypingAnimation text="Hi, I am Pragateesh G" speed={40} />
                  </h1>
                  <div className="text-xl md:text-2xl text-gray-300 font-inter">
                    <TypingAnimation text="AI Innovator & Full Stack Developer" delay={100} speed={70} />
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-300 leading-relaxed font-inter"
                >
                  A passionate B.Tech (AI & DS) student at Sri Eshwar College of Engineering (<span className="italic font-bold">2022-2026</span>, 7.87 CGPA). My passion lies in crafting AI-driven solutions and scalable full-stack applications that solve real-world problems. With expertise in AI, Machine Learning, Data Science, and modern web technologies, I thrive on transforming ideas into impactful innovations. Explore my journey and let's build the future together!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 font-inter font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('projects');
                    }}
                  >
                    <Rocket className="w-6 h-6" />
                    <span>Explore My Work</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#contact"
                    className="px-8 py-4 border border-gray-600 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-3 font-inter font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('contact');
                    }}
                  >
                    <Mail className="w-6 h-6" />
                    <span>Connect With Me</span>
                  </motion.a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.8 }}
                  className="flex space-x-4"
                >
                 
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center order-1 lg:order-2"
              >
                <motion.div
                  style={{ y: useTransform(scrollY, [0, 300], [0, -50]) }}
                  className="w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20"
                  ></motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                    className="absolute inset-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30"
                  ></motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
                    className="absolute inset-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20"
                  ></motion.div>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={profileImage}
                    alt="Pragateesh G"
                    className="absolute inset-8 md:inset-10 w-64 h-64 md:w-76 md:h-76 lg:w-[370px] lg:h-[370px] rounded-full object-cover border-4 border-white/20 shadow-2xl"
                  />
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg group"
                  >
                    <Brain className="w-6 h-6 md:w-8 md:h-8" />
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute top-14 right-0 bg-gray-800 text-xs text-white p-2 rounded-lg transition-opacity duration-200 font-inter"
                    >
                      AI Enthusiast
                    </motion.span>
                  </motion.div>
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-12 h-12 md:w-16 md:h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg group"
                  >
                    <Code className="w-6 h-6 md:w-8 md:h-8" />
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute bottom-14 left-0 bg-gray-800 text-xs text-white p-2 rounded-lg transition-opacity duration-200 font-inter"
                    >
                      Full Stack Developer
                    </motion.span>
                  </motion.div>
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    className="absolute top-1/3 -left-8 md:-left-10 w-12 h-12 md:w-16 md:h-16 bg-pink-500 rounded-full flex items-center justify-center shadow-lg group"
                  >
                    <Zap className="w-6 h-6 md:w-8 md:h-8" />
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute left-14 bg-gray-800 text-xs text-white p-2 rounded-lg transition-opacity duration-200 font-inter"
                    >
                      Problem Solver
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </section>

<section id="internships" className="py-16 px-4 bg-black/20 container-margin overflow-visible">
  <div className="max-w-7xl mx-auto relative">
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-16"
    >
      <motion.h2
        className="text-4xl mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-times text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Professional Experience
      </motion.h2>
      
      {/* Animated Underline */}
      <motion.div
        className="relative flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative">
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <motion.div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-400/30 to-blue-500/30 rounded-full blur-sm"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          />
        </div>
      </motion.div>
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full blur-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />
    </motion.div>

    <div className="relative pl-10 space-y-10">
      {/* Vertical Line */}
      <motion.div
        className="absolute left-6 top-0 w-[2px] bg-green-400 origin-top"
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: "100%", opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      {[
        {
          title: 'Gen AI Developer',
          company: 'Global Knowledge',
          year: '2024',
          description:
            'Developed a Generative AI system using RAG architecture with ChromaDB, Sentence Transformers, and Gemini LLM for real-time document analysis and response generation.',
          skills: ['RAG Architecture', 'ChromaDB', 'Gemini LLM', 'Python'],
        },
        {
          title: 'MERN Stack Developer',
          company: 'RV TechLearn',
          year: '2024',
          description:
            'Built a ReactJS dashboard to track and analyze student performance on coding platforms, providing insights to enhance problem-solving skills.',
          skills: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
        },
      ].map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative ml-10 bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 group"
        >
          {/* Timeline Dot */}
          <motion.div
            className="absolute left-[-2.5rem] top-6 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors font-times">
                {exp.title}
              </h3>
              <p className="text-lg text-gray-300 font-inter">{exp.company}</p>
            </div>
            <span className="text-blue-400 font-semibold italic font-inter">{exp.year}</span>
          </div>

          <p className="text-gray-300 mb-4 font-inter">{exp.description}</p>

          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill, skillIndex) => (
              <motion.span
                key={skillIndex}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: index * 0.2 + skillIndex * 0.1 + 0.5 }}
                className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full text-sm text-green-200 font-inter"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

<section id="projects" className="py-20 px-2 container-margin relative overflow-hidden">
  {(() => {
    const projectsRef = React.useRef(null);
    const [isInView, setIsInView] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '-20px 0px',
        }
      );

      if (projectsRef.current) {
        observer.observe(projectsRef.current);
      }

      return () => {
        if (projectsRef.current) {
          observer.unobserve(projectsRef.current);
        }
      };
    }, []);

    return (
      <>
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-8xl mx-auto relative z-10" ref={projectsRef}>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut"
              }
            } : { opacity: 0, y: -40 }}
            className="text-center mb-16 relative"
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-times font-bold px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.1,
                  ease: "easeOut"
                }
              } : { opacity: 0, scale: 0.8 }}
            >
             Featured Projects
            </motion.h2>
            
            {/* Enhanced Animated Underline */}
            <motion.div
              className="relative flex justify-center mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { 
                opacity: 1,
                transition: {
                  duration: 0.4,
                  delay: 0.2
                }
              } : { opacity: 0 }}
            >
              <div className="relative">
                {/* Main underline */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-transparent via-orange-400 via-red-500 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { 
                    width: "200px",
                    transition: {
                      duration: 0.8,
                      delay: 0.3,
                      ease: "easeInOut"
                    }
                  } : { width: 0 }}
                />
                
                {/* Central glowing orb */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-lg"
                  style={{ boxShadow: '0 0 20px rgba(251, 146, 60, 0.6), 0 0 40px rgba(239, 68, 68, 0.4)' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { 
                    scale: 1, 
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                      delay: 0.8
                    }
                  } : { scale: 0, opacity: 0 }}
                />
                
                {/* Side accent dots */}
                <motion.div
                  className="absolute top-1 left-8 w-1 h-1 bg-pink-500 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { 
                    scale: 1, 
                    opacity: 0.8,
                    transition: {
                      duration: 0.2,
                      delay: 0.9
                    }
                  } : { scale: 0, opacity: 0 }}
                />
                <motion.div
                  className="absolute top-1 right-8 w-1 h-1 bg-purple-500 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { 
                    scale: 1, 
                    opacity: 0.8,
                    transition: {
                      duration: 0.2,
                      delay: 1.0
                    }
                  } : { scale: 0, opacity: 0 }}
                />
                
                {/* Outer glow effect */}
                <motion.div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-gradient-to-r from-orange-400/20 via-red-500/30 to-pink-500/20 rounded-full blur-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { 
                    scale: 1, 
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      delay: 0.5
                    }
                  } : { scale: 0, opacity: 0 }}
                />
              </div>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-inter px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.4,
                  delay: 0.4
                }
              } : { opacity: 0, y: 20 }}
            >
              Exploring the intersection of creativity and technology through innovative solutions
            </motion.p>
            
            {/* Decorative background elements for title */}
            <motion.div
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-orange-400/5 via-red-500/10 to-pink-500/5 rounded-full blur-3xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { 
                scale: 1, 
                opacity: 1,
                transition: {
                  duration: 1.0,
                  delay: 0.2
                }
              } : { scale: 0, opacity: 0 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-2">
            {projects.map((project, index) => {
              const [isFlipped, setIsFlipped] = React.useState(false);
              
              return (
                <motion.div
                  key={index}
                  className="group perspective-1000 h-[450px] sm:h-[480px] md:h-[420px] lg:h-[450px]"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      duration: 0.4,
                      delay: index * 0.1 + 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  } : { opacity: 0, y: 30, scale: 0.9 }}
                >
                  <div className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
                    
                    {/* FRONT SIDE */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br ${project.color} p-0.5`}>
                      <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 h-full flex flex-col border border-gray-800/50">
                        
                        {/* Project Title */}
                        <motion.h3 
                          className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-times text-center leading-tight"
                          initial={{ opacity: 0, y: 15 }}
                          animate={isInView ? { 
                            opacity: 1, 
                            y: 0,
                            transition: {
                              duration: 0.3,
                              delay: index * 0.1 + 0.7
                            }
                          } : { opacity: 0, y: 15 }}
                        >
                          {project.title}
                        </motion.h3>

                        {/* Project Media */}
                        <motion.div 
                          className="relative mb-3 sm:mb-4 overflow-hidden rounded-xl flex-shrink-0"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={isInView ? { 
                            opacity: 1, 
                            scale: 1,
                            transition: {
                              duration: 0.3,
                              delay: index * 0.1 + 0.8
                            }
                          } : { opacity: 0, scale: 0.95 }}
                        >
                          {project.video ? (
                            <iframe
                              className="w-full h-32 sm:h-36 md:h-32 lg:h-36 object-cover rounded-lg"
                              src={project.video}
                              title={`${project.title} Demo`}
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                            ></iframe>
                          ) : (
                            <div className="h-32 sm:h-36 md:h-32 lg:h-36 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-xl border border-gray-700/30">
                              <div className="text-center">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-2 mx-auto opacity-60">
                                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <p className="text-gray-400 text-xs font-inter">Preview Soon</p>
                              </div>
                            </div>
                          )}
                        </motion.div>

                        {/* Tech Stack */}
<div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 flex-grow min-h-[60px] sm:min-h-[70px]">
  {project.tech.map((tech, techIndex) => (
    <motion.span 
      key={techIndex} 
      className="text-sm font-medium font-inter whitespace-nowrap px-3 py-1.5 rounded-md bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 border border-slate-700/60 text-slate-100 drop-shadow-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:border-slate-600"
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: {
          duration: 0.4,
          delay: index * 0.1 + 0.9 + techIndex * 0.05,
          ease: "easeOut"
        }
      } : { opacity: 0, scale: 0.8, y: -10 }}
    >
      {tech}
    </motion.span>
  ))}
</div>
                        {/* Project Description Title with Arrow */}
                        <motion.div 
                          className="mt-auto"
                          initial={{ opacity: 0, y: 15 }}
                          animate={isInView ? { 
                            opacity: 1, 
                            y: 0,
                            transition: {
                              duration: 0.3,
                              delay: index * 0.1 + 1.0
                            }
                          } : { opacity: 0, y: 15 }}
                        >
                          <motion.button 
                            onClick={() => setIsFlipped(!isFlipped)}
                            className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-lg border border-white/10 cursor-pointer hover:from-white/15 hover:to-white/10 transition-all duration-300 touch-manipulation"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <span className="text-xs sm:text-sm font-medium font-inter text-gray-300">Project Description</span>
                            <motion.svg 
                              className={`w-4 h-4 text-orange-400 flex-shrink-0`}
                              animate={{ rotate: isFlipped ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </motion.svg>
                          </motion.button>
                        </motion.div>

                        {/* Category and Year */}
                        <motion.div 
                          className="flex items-center justify-between mt-3 text-xs gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { 
                            opacity: 1, 
                            y: 0,
                            transition: {
                              duration: 0.3,
                              delay: index * 0.1 + 1.1
                            }
                          } : { opacity: 0, y: 10 }}
                        >
                          <span className="px-2 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full font-medium font-inter text-xs whitespace-nowrap">
                            {project.category}
                          </span>
                          <span className="text-gray-400 font-bold font-inter text-xs">{project.year}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br ${project.color} p-0.5`}>
                      <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 h-full flex flex-col border border-gray-800/50">
                        
                        {/* Back Header */}
                        <div className="text-center mb-4 sm:mb-6">
                          <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-times mb-2 leading-tight">
                            {project.title}
                          </h3>
                          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
                        </div>

                        {/* Project Description */}
                        <div className="flex-grow flex flex-col justify-center">
                          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-inter text-center mb-4 sm:mb-6 px-1">
                            {project.description}
                          </p>
                        </div>

                        {/* GitHub Link */}
                        <div className="mt-auto">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn w-full flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-inter relative overflow-hidden touch-manipulation"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="relative z-10 flex items-center space-x-2">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                              </svg>
                              <span>View on GitHub</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          </motion.a>
                        </div>

                        {/* Back Footer with Back Button */}
                        <div className="flex items-center justify-between mt-3 sm:mt-4 text-xs">
                          <motion.button 
                            onClick={() => setIsFlipped(false)}
                            className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-lg border border-white/10 cursor-pointer hover:from-white/15 hover:to-white/10 transition-all duration-300 touch-manipulation"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <span className="text-xs sm:text-sm font-medium font-inter text-gray-300">Back to Project</span>
                            <motion.svg 
                              className={`w-4 h-4 text-orange-400 flex-shrink-0`}
                              animate={{ rotate: isFlipped ? 0 : 180 }}
                              transition={{ duration: 0.2 }}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </motion.svg>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom decorative element */}
          <motion.div 
            className="mt-16 sm:mt-20 text-center px-4"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                duration: 0.4,
                delay: projects.length * 0.1 + 1.0,
                ease: "easeOut"
              }
            } : { opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="inline-flex items-center space-x-3 sm:space-x-4 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-full border border-gray-600/30">
              <div className="flex space-x-1.5 sm:space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <span className="text-gray-400 text-xs sm:text-sm font-inter">More projects coming soon</span>
            </div>
          </motion.div>
        </div>

        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .touch-manipulation {
            touch-action: manipulation;
          }
        `}</style>
      </>
    );
  })()}
</section>

     <section id="certifications" className="py-16 px-2 bg-black/20 container-margin overflow-visible">
  <div className="max-w-8xl mx-auto">
    {/* Animated Title Section */}
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-16"
    >
      <motion.h2
        className="text-4xl mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-times text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Certifications
      </motion.h2>
      
      {/* Animated Underline */}
      <motion.div
        className="relative flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative">
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <motion.div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-sm"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          />
        </div>
      </motion.div>
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        {
          name: `Python for Data Science - NPTEL (<span class="italic font-bold">2024</span>)`,
          link: 'https://drive.google.com/file/d/1EYT2xTxDXPcpKD0ydhUwlFR9CG-a2uUF/view?usp=drive_link',
        },
        {
          name: `Java Programming - Udemy (<span class="italic font-bold">2023</span>)`,
          link: 'https://drive.google.com/file/d/19LlkoUKJSngCTKLxNcPrWZL1lLdT9Q2p/view?usp=drive_link',
        },
        {
          name: `Master in Data Structures using C and C++ - Udemy (<span class="italic font-bold">2023</span>)`,
          link: 'https://drive.google.com/file/d/1b665AbwwBV2h2QhXnVFXRs9Brwu8gUiV/view?usp=drive_link',
        },
        {
          name: `Crash Course on Python by Google - Coursera (<span class="italic font-bold">2023</span>)`,
          link: 'https://drive.google.com/file/d/1KEtyhUyO5J3HBtjEeRYqSwowlC6kd2c7/view?usp=drive_link',
        },
      ].map((cert, index) => (
        <motion.a
          key={index}
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="block bg-gradient-to-br from-yellow-600/20 to-orange-600/20 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <Award className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="text-gray-300 font-inter hover:text-white transition-colors" dangerouslySetInnerHTML={{ __html: cert.name }}></p>
            <div className="mt-4 flex items-center text-xs text-yellow-400 font-medium">
              <span>View Certificate</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  </div>
</section>

<section id="skills" className="py-16 px-2 container-margin overflow-visible">
  <div className="max-w-8xl mx-auto">
    {/* Animated Title Section */}
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-16"
    >
      <motion.h2
        className="text-4xl mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-times text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Technical Arsenal
      </motion.h2>
      
      {/* Animated Underline */}
      <motion.div
        className="relative flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative">
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <motion.div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-full blur-sm"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          />
        </div>
      </motion.div>
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(skills).map(([category, skillList], index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-6 rounded-xl border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 text-purple-400 font-times flex items-center">
              <div className="w-3 h-3 mr-3 rounded-full bg-purple-400 animate-pulse"></div>
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillList.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                  className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full text-sm text-purple-200 font-inter"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

<section id="achievements" className="py-16 px-2 container-margin overflow-visible">
  <div className="max-w-8xl mx-auto">
    {/* Animated Title Section */}
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-16"
    >
      <motion.h2
        className="text-4xl mb-4 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent font-times text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Achievements & Recognition
      </motion.h2>
      
      {/* Animated Underline */}
      <motion.div
        className="relative flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative">
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <motion.div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full blur-sm"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          />
        </div>
      </motion.div>
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-emerald-400/10 to-teal-500/10 rounded-full blur-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { title: 'LeetCode Expert', desc: 'Max Rating: 1630 | Problems Solved: 541', icon: Zap },
        { title: 'Postman API Expert', desc: 'Student Expert Badge Certified', icon: Award },
        { title: 'CodeChef Specialist', desc: 'Rating: 1244 | 200+ Problems Solved', icon: Code },
        { title: 'HackerRank Achievements', desc: '3★ Python | 2★ Java, C, SQL', icon: Award },
        { title: 'SAP Hackathon Finalist', desc: 'Shortlisted twice for offline rounds', icon: Rocket },
      ].map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 p-6 rounded-xl border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 group relative overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          <div className="relative z-10">
            <achievement.icon className="w-8 h-8 text-pink-400 mb-4 group-hover:text-pink-300 transition-colors" />
            <h3 className="text-xl font-bold mb-2 text-pink-300 font-times">{achievement.title}</h3>
            <p className="text-gray-300 font-inter">{achievement.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      <section id="contact" className="py-16 px-2 bg-black/30 container-margin">
  <div className="max-w-7xl mx-auto text-center">
    {/* Animated Title Section */}
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-16"
    >
      <motion.h2
        className="text-4xl mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-times text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Let's Build Something Amazing Together
      </motion.h2>

      {/* Animated Underline */}
      <motion.div
        className="relative flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative">
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <motion.div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-sm"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          />
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-xl text-gray-300 mb-12 font-inter"
    >
      Ready to discuss your next AI project or full-stack application? Let's connect!
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {[
        { icon: Phone, label: 'Phone', value: '+91 7010441464', href: 'tel:+917010441464' },
        { icon: Mail, label: 'Send Mail', value: 'Send a Message', action: () => setIsEmailModalOpen(true) },
        { icon: Github, label: 'GitHub', value: '@Pragatees', href: 'https://github.com/Pragatees' },
        { icon: Linkedin, label: 'LinkedIn', value: "Let's Connect", href: 'https://www.linkedin.com/in/pragateesh-g-42b703259/' },
      ].map((contact, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 group text-center cursor-pointer"
          onClick={contact.action}
        >
          {contact.href ? (
            <a
              href={contact.href}
              className="flex flex-col items-center space-y-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                <contact.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </motion.div>
              <h3 className="font-semibold mb-1 font-inter">{contact.label}</h3>
              <p className="text-gray-400 text-sm group-hover:text-white transition-colors font-inter">{contact.value}</p>
            </a>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                <contact.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </motion.div>
              <h3 className="font-semibold mb-1 font-inter">{contact.label}</h3>
              <p className="text-gray-400 text-sm group-hover:text-white transition-colors font-inter">{contact.value}</p>
            </div>
          )}
        </motion.div>
      ))}
    </div>

    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href="Pragateesh_G_Resume.pdf"
      download
      className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold transition-all duration-300 font-inter font-medium"
    >
      <Download className="w-5 h-5" />
      <span>Download Resume</span>
    </motion.a>
  </div>
</section>


        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-8 px-2 border-t border-white/10 container-margin"
        >
          <div className="max-w-5xl mx-auto text-center relative">
            <motion.svg
              className="absolute bottom-0 w-full h-10"
              viewBox="0 0 1440 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M0 20C240 40 480 0 720 20C960 40 1200 0 1440 20"
                stroke="none"
                fill="url(#waveGradient)"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <defs>
                <linearGradient id="waveGradient" x1="0" y1="0" x2="1440" y2="0">
                  <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
                  <stop offset="100%" style={{ stopColor: '#9333ea' }} />
                </linearGradient>
              </defs>
            </motion.svg>
            <p className="text-gray-400 font-inter">© <span className="italic font-bold">2025</span> Pragateesh G. Crafted with passion for AI and innovation.</p>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default Portfolio;
