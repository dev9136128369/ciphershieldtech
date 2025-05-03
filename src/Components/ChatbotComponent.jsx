// import React, { useState } from 'react';
// import { Chatbot } from 'react-chatbot-kit'; // Chatbot import kiya
// import 'react-chatbot-kit/build/main.css'; // CSS import ki
// import MessageParser from './MessageParser'; // MessageParser import kiya
// import ActionProvider from './ActionProvider'; // ActionProvider import kiya

// const ChatbotComponent = () => {
//   const [isOpen, setIsOpen] = useState(false); // State for toggling chatbot visibility

//   // Function to toggle chatbot visibility
//   const handleChatbotToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const config = {
//     botName: "CipherBot", // Bot ka naam
//     initialMessages: [
//       {
//         text: "Hello! How can I assist you today?", // Initial message
//         sender: "bot",
//       },
//     ],
//     customStyles: {
//       botMessageBox: {
//         backgroundColor: "#2D87F0", // Bot message box ka color
//       },
//       chatButton: {
//         backgroundColor: "#2D87F0", // Chatbot button ka color
//       },
//     },
//   };

//   return (
//     <div>
//       {/* Chatbot toggle karne ka button */}
//       <button className="chatbot-button" onClick={handleChatbotToggle}>
//         🗨️ {/* Chatbot icon */}
//       </button>

//       {/* Agar isOpen state true hai, toh chatbot ko render karen */}
//       {isOpen && (
//         <div className="chatbot-container">
//           <Chatbot
//             config={config} // Chatbot configuration pass ki
//             messageParser={MessageParser} // MessageParser ko pass kiya
//             actionProvider={ActionProvider} // ActionProvider ko pass kiya
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotComponent;



import React, { useState, useEffect } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [websiteContent, setWebsiteContent] = useState('');

  // Function to extract website content when component mounts
  useEffect(() => {
    const extractWebsiteContent = () => {
      try {
        // Get all text content from the page
        const bodyText = document.body.innerText;
        
        // Remove excessive whitespace and newlines
        const cleanedContent = bodyText.replace(/\s+/g, ' ').trim();
        
        // Limit to first 5000 characters to avoid performance issues
        setWebsiteContent(cleanedContent.substring(0, 5000));
      } catch (error) {
        console.error("Error extracting website content:", error);
      }
    };

    extractWebsiteContent();
  }, []);

  const handleChatbotToggle = () => {
    setIsOpen(!isOpen);
  };

  const config = {
    botName: "SiteAnalyzerBot",
    initialMessages: [
      {
        text: "Hello! I can help you with information about this website. Ask me anything!",
        sender: "bot",
      },
    ],
    customStyles: {
      botMessageBox: {
        backgroundColor: "#2D87F0",
      },
      chatButton: {
        backgroundColor: "#2D87F0",
      },
    },
    state: {
      websiteContent: websiteContent // Pass website content to chatbot
    }
  };

  return (
    <div className="chatbot-wrapper">
      <button className="chatbot-toggle-btn" onClick={handleChatbotToggle}>
        {isOpen ? '✕' : '🗨️'}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;