// 01 right code ha 
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


// 02 right code ha 
// import React, { useState, useEffect } from 'react';
// import { Chatbot } from 'react-chatbot-kit';
// import 'react-chatbot-kit/build/main.css';
// import MessageParser from './MessageParser';
// import ActionProvider from './ActionProvider';

// const ChatbotComponent = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [websiteContent, setWebsiteContent] = useState('');

//   // Function to extract website content when component mounts
//   useEffect(() => {
//     const extractWebsiteContent = () => {
//       try {
//         // Get all text content from the page
//         const bodyText = document.body.innerText;
        
//         // Remove excessive whitespace and newlines
//         const cleanedContent = bodyText.replace(/\s+/g, ' ').trim();
        
//         // Limit to first 5000 characters to avoid performance issues
//         setWebsiteContent(cleanedContent.substring(0, 5000));
//       } catch (error) {
//         console.error("Error extracting website content:", error);
//       }
//     };

//     extractWebsiteContent();
//   }, []);

//   const handleChatbotToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const config = {
//     botName: "SiteAnalyzerBot",
//     initialMessages: [
//       {
//         text: "Hello! I can help you with information about this website. Ask me anything!",
//         sender: "bot",
//       },
//     ],
//     customStyles: {
//       botMessageBox: {
//         backgroundColor: "#2D87F0",
//       },
//       chatButton: {
//         backgroundColor: "#2D87F0",
//       },
//     },
//     state: {
//       websiteContent: websiteContent // Pass website content to chatbot
//     }
//   };

//   return (
//     <div className="chatbot-wrapper">
//       <button className="chatbot-toggle-btn" onClick={handleChatbotToggle}>
//         {isOpen ? '✕' : '🗨️'}
//       </button>

//       {isOpen && (
//         <div className="chatbot-container">
//           <Chatbot
//             config={config}
//             messageParser={MessageParser}
//             actionProvider={ActionProvider}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotComponent;






// 03 right code ha 
import React, { useState } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import config from './CipherShieldConfig';
import 'react-chatbot-kit/build/main.css';

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
      <button 
        className={`chatbot-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatbotComponent;