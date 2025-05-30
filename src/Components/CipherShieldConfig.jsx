// const CipherShieldConfig = (lang) => ({
//   botName: "CipherShield Assistant",
//   initialMessages: [{
//     text: lang === 'hi' 
//       ? "नमस्ते! मैं CipherShield टेक्नोलॉजीज का असिस्टेंट हूँ। आप हिंदी या अंग्रेजी में पूछ सकते हैं।" 
//       : "Hello! I'm CipherShield's assistant. You can ask in English or Hindi.",
//     delay: 500
//   }],
//   customStyles: {
//     botMessageBox: { backgroundColor: "#2D87F0" },
//     chatButton: { backgroundColor: "#2D87F0" },
//   },
//   customComponents: {
//     header: () => (
//       <div style={{
//         backgroundColor: '#2D87F0',
//         color: 'white',
//         padding: '15px',
//         textAlign: 'center',
//         fontWeight: 'bold'
//       }}>
//         CipherShield Technologies
//       </div>
//     )
//   },
//   state: {
//     language: lang,
//     websitePages: {
//       services: 'https://www.ciphershieldtech.com/services',
//       about: 'https://www.ciphershieldtech.com/about',
//       contact: 'https://www.ciphershieldtech.com/contact',
//       products: 'https://www.ciphershieldtech.com/products',
//       team: 'https://www.ciphershieldtech.com/team'
//     }
//   }
// });

// export default CipherShieldConfig;












// import GreetingWidget from './widgets/GreetingWidget';
// import MainMenuWidget from './widgets/MainMenuWidget';
// import ServicesMenuWidget from './widgets/ServicesMenuWidget';
// // import PricingWidget from './widgets/PricingWidget';
// // import SupportWidget from './widgets/SupportWidget';
// // import ExpertWidget from './widgets/ExpertWidget';

// const config = {
//   botName: "CipherShield Assistant",
//   initialMessages: [
//     {
//       widget: "greetingWidget",
//       delay: 300
//     }
//   ],
//   widgets: [
//     {
//       widgetName: "greetingWidget",
//       widgetFunc: (props) => <GreetingWidget {...props} />
//     },
//     {
//       widgetName: "mainMenuWidget",
//       widgetFunc: (props) => <MainMenuWidget {...props} />
//     },
//     {
//       widgetName: "servicesMenuWidget",
//       widgetFunc: (props) => <ServicesMenuWidget {...props} />
//     },
//     {
//       widgetName: "pricingWidget",
//       widgetFunc: (props) => <PricingWidget {...props} />
//     },
//     {
//       widgetName: "supportWidget",
//       widgetFunc: (props) => <SupportWidget {...props} />
//     },
//     {
//       widgetName: "expertWidget",
//       widgetFunc: (props) => <ExpertWidget {...props} />
//     }
//   ],
//   customStyles: {
//     botMessageBox: {
//       backgroundColor: "#4a6fa5",
//       color: "#ffffff",
//       fontSize: "14px",
//       borderRadius: "15px 15px 0 15px",
//       padding: "12px"
//     },
//     chatButton: {
//       backgroundColor: "#4a6fa5",
//       color: "#ffffff"
//     },
//     userMessageBox: {
//       backgroundColor: "#e8f1f8",
//       color: "#333333",
//       borderRadius: "15px 15px 15px 0",
//       padding: "12px"
//     },
//     chatInput: {
//       border: "1px solid #4a6fa5",
//       borderRadius: "20px",
//       padding: "12px 20px"
//     }
//   },
//   state: {
//     userData: {
//       name: "",
//       phone: "",
//       interest: ""
//     }
//   }
// };

// export default config;







// import GreetingWidget from './widgets/GreetingWidget';
// import MainMenuWidget from './widgets/MainMenuWidget';
// import ServicesMenuWidget from './widgets/ServicesMenuWidget';
// import PricingWidget from './widgets/PricingWidget';
// import SupportWidget from './widgets/SupportWidget';
// import ExpertWidget from './widgets/ExpertWidget';

// const config = {
//   botName: "CipherShield Assistant",
//   initialMessages: [
//     {
//       widget: "greetingWidget",
//       delay: 300
//     }
//   ],
//   widgets: [
//     {
//       widgetName: "greetingWidget",
//       widgetFunc: (props) => <GreetingWidget {...props} />
//     },
//     {
//       widgetName: "mainMenuWidget",
//       widgetFunc: (props) => <MainMenuWidget {...props} />
//     },
//     {
//       widgetName: "servicesMenuWidget",
//       widgetFunc: (props) => <ServicesMenuWidget {...props} />
//     },
//     {
//       widgetName: "pricingWidget",
//       widgetFunc: (props) => <PricingWidget {...props} />
//     },
//     {
//       widgetName: "supportWidget",
//       widgetFunc: (props) => <SupportWidget {...props} />
//     },
//     {
//       widgetName: "expertWidget",
//       widgetFunc: (props) => <ExpertWidget {...props} />
//     }
//   ],
//   customStyles: {
//     botMessageBox: {
//       backgroundColor: "#4a6fa5",
//       color: "#ffffff",
//       fontSize: "14px",
//       borderRadius: "15px 15px 0 15px",
//       padding: "12px"
//     },
//     chatButton: {
//       backgroundColor: "#4a6fa5",
//       color: "#ffffff"
//     },
//     userMessageBox: {
//       backgroundColor: "#e8f1f8",
//       color: "#333333",
//       borderRadius: "15px 15px 15px 0",
//       padding: "12px"
//     },
//     chatInput: {
//       border: "1px solid #4a6fa5",
//       borderRadius: "20px",
//       padding: "12px 20px"
//     }
//   },
//   state: {
//     userData: {
//       name: "",
//       phone: "",
//       interest: ""
//     },
//     currentQuestion: ""
//   }
// };

// export default config;


// 23-05-25
import React from 'react';
// import MainMenuWidget from './widgets/MainMenuWidget';
// import ServicesMenuWidget from './widgets/ServicesMenuWidget';
// import ExpertWidget from './widgets/ExpertWidget';
// import SupportWidget from './widgets/SupportWidget';
// import ConsultancyWidget from './widgets/ConsultancyWidget';
// import GreetingWidget from './widgets/GreetingWidget';
// import AIAutomationWidget from './widgets/AIAutomationWidget';
// import CybersecurityWidget from './widgets/CybersecurityWidget';
// import PortfolioRedirectWidget from './widgets/PortfolioRedirectWidget';
import MainMenuWidget from './widgets/MainMenuWidget';
import ServicesMenuWidget from './widgets/ServicesMenuWidget';
import ExpertWidget from './widgets/ExpertWidget';
import SupportWidget from './widgets/SupportWidget';
import ConsultancyWidget from './widgets/ConsultancyWidget';
import GreetingWidget from './widgets/GreetingWidget';
import AIAutomationWidget from './widgets/AIAutomationWidget';
import CybersecurityWidget from './widgets/CybersecurityWidget';
import PortfolioRedirectWidget from './widgets/PortfolioRedirectWidget';


const config = {
  botName: "CipherShield Bot",
  initialMessages: [<GreetingWidget />],
  customComponents: {
    header: () => <div className="chatbot-header">CipherShield Technologies</div>
  },
  widgets: [
    {
      widgetName: 'mainMenuWidget',
      widgetFunc: (props) => <MainMenuWidget {...props} />,
    },
    {
      widgetName: 'servicesMenuWidget',
      widgetFunc: (props) => <ServicesMenuWidget {...props} />,
    },
    {
      widgetName: 'expertWidget',
      widgetFunc: (props) => <ExpertWidget {...props} />,
    },
    {
      widgetName: 'supportWidget',
      widgetFunc: (props) => <SupportWidget {...props} />,
    },
    {
      widgetName: 'consultancyWidget',
      widgetFunc: (props) => <ConsultancyWidget {...props} />,
    },
    {
      widgetName: 'aiAutomationWidget',
      widgetFunc: (props) => <AIAutomationWidget {...props} />,
    },
    {
      widgetName: 'cybersecurityWidget',
      widgetFunc: (props) => <CybersecurityWidget {...props} />,
    },
    {
  widgetName: 'portfolioRedirect',
  widgetFunc: (props) => <PortfolioRedirectWidget {...props} />,
}
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#376B7E',
    },
  },
  state: {
    userData: {
      name: '',
      phone: '',
      email: '',
      interest: ''
    }
  }
};

export default config;