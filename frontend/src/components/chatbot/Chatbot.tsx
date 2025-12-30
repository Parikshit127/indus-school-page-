
import { useState, useRef, useEffect } from 'react';
import { X, Send, Download, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  type?: 'text' | 'fees' | 'contact' | 'location';
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! Welcome to Indus Public School. How can I help you today?", isUser: false, type: 'text' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [feesData, setFeesData] = useState<{ pdfUrl: string | null; title: string }>({ pdfUrl: null, title: "Fees Structure" });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        const response = await fetch(`${apiUrl}/api/content/fees`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setFeesData({
              pdfUrl: data.pdfUrl || null,
              title: data.title || "Fees Structure 2024-25"
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch fees structure", error);
      }
    };
    fetchFees();
  }, []);

  const quickOptions = [
    { label: "Admission Process", type: 'text' as const, response: "To start the admission process, you can fill out our online inquiry form on the Admissions page or visit the school office between 9:00 AM and 2:00 PM. We require previous school records, birth certificate, and residence proof." },
    { label: "Fee Structure", type: 'fees' as const, response: "Our fee structure varies by grade level. You can download the detailed fee breakdown below:" },
    { label: "School Timing", type: 'text' as const, response: "The normal school hours are:\nMon - Sat: 8:00 AM - 2:30 PM" },
    { label: "Location", type: 'location' as const, response: "Indus Public School, Delhi Road, Near Asthal Bohar, Rohtak, Haryana 124001" },
    { label: "Contact Info", type: 'contact' as const, response: "Here are our contact details:" }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isUser: true,
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      let botResponse = "Hello! How can I assist you today? You can ask about our Admission Process, Fee Structure, or Location.";
      let responseType: 'text' | 'fees' | 'contact' | 'location' = 'text';
      
      const lowerText = text.toLowerCase().trim();
      
      const matchedOption = quickOptions.find(opt => 
        lowerText.includes(opt.label.toLowerCase()) || 
        opt.label.toLowerCase().includes(lowerText)
      );

      if (matchedOption) {
        botResponse = matchedOption.response;
        responseType = matchedOption.type;
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        isUser: false,
        type: responseType
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (option: typeof quickOptions[0]) => {
    const userMessage: Message = {
      id: Date.now(),
      text: option.label,
      isUser: true,
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: option.response,
        isUser: false,
        type: option.type
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const renderMessageContent = (msg: Message) => {
    if (msg.isUser || msg.type === 'text' || !msg.type) {
      return <div className="message-text">{msg.text}</div>;
    }

    if (msg.type === 'fees') {
      return (
        <div className="message-rich-content">
          <p>{msg.text}</p>
          {feesData.pdfUrl ? (
            <a 
              href={feesData.pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="chat-download-btn"
            >
              <Download size={16} />
              {feesData.title}
            </a>
          ) : (
            <div className="chat-info-box"> Fees structure PDF not available yet. </div>
          )}
        </div>
      );
    }

    if (msg.type === 'contact') {
      return (
        <div className="message-rich-content contact-details">
          <p>{msg.text}</p>
          <div className="contact-item">
            <Phone size={14} /> <span>+91 9992900574</span>
          </div>
          <div className="contact-item">
            <Mail size={14} /> <span> info@ipsrohtak.edu.in</span>
          </div>
          <div className="contact-item">
            <Clock size={14} /> <span>Mon-Sat: 8:00 AM - 2:30 PM</span>
          </div>
          <div className="contact-item">
            <MapPin size={14} /> <span>Rohtak, Haryana</span>
          </div>
        </div>
      );
    }

    if (msg.type === 'location') {
      return (
        <div className="message-rich-content location-content">
          <p>{msg.text}</p>
          <div className="chat-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.5658744005666!2d76.61111007616149!3d28.881729373033504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d84d7286de731%3A0xe54c15337b5268c3!2sIndus%20Public%20School%2C%20Rohtak!5e0!3m2!1sen!2sin!4v1709228947214!5m2!1sen!2sin"
              width="100%"
              height="150"
              style={{ border: 0, borderRadius: '8px', marginTop: '10px' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
            <a 
              href="https://maps.app.goo.gl/SNGRWPV4XqjG4AC2A" 
              target="_blank" 
              rel="noopener noreferrer"
              className="chat-map-link"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      );
    }

    return <div className="message-text">{msg.text}</div>;
  };

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="chatbot-window"
          >
            <div className="chatbot-header">
              <div className="chatbot-header-img">
                <img src="/image.png" alt="Chatbot" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div className="chatbot-header-info">
                <h3>Indus Assistant</h3>
                <div className="chatbot-header-status">
                  <span className="status-dot"></span>
                  Online
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="chatbot-messages custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.isUser ? 'message-user' : 'message-bot'} ${msg.type !== 'text' && !msg.isUser ? 'message-rich' : ''}`}>
                  {renderMessageContent(msg)}
                </div>
              ))}
              {isTyping && (
                <div className="message message-bot" style={{ display: 'flex', gap: '4px', padding: '12px' }}>
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }}>.</motion.div>
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>.</motion.div>
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>.</motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-options">
              {quickOptions.map((opt, idx) => (
                <button 
                  key={idx} 
                  className="option-btn"
                  onClick={() => handleOptionClick(opt)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <form 
              className="chatbot-input-area" 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
            >
              <input 
                type="text" 
                className="chatbot-input" 
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="send-btn">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <img src="/image.png" alt="Chatbot" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />}
      </button>
    </div>
  );
};

export default Chatbot;

