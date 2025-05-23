// // MessageParser.js
// class MessageParser {
//     constructor(actionProvider, state) {
//         this.actionProvider = actionProvider;
//         this.state = state;
//     }

//     // Ye method messages ko handle karta hai
//     parse(message) {
//         console.log("Received message: ", message);  // Debugging purpose ke liye

//         // Lowercase message for easy comparison
//         const lowercaseMessage = message.toLowerCase();

//         // Check for "hello"
//         if (lowercaseMessage.includes("hello")) {
//             this.actionProvider.handleHello(); // Trigger the action
//         }

//         // Check for "bye"
//         if (lowercaseMessage.includes("bye")) {
//             this.actionProvider.handleAdditionalMessage("Goodbye! Have a great day!");
//         }

//         // Check for "thank you"
//         if (lowercaseMessage.includes("thank you")) {
//             this.actionProvider.handleAdditionalMessage("You're welcome!");
//         } 
//     }
// }

// export default MessageParser;



// class MessageParser {
//     constructor(actionProvider, state) {
//       this.actionProvider = actionProvider;
//       this.state = state;
//     }
  
//     parse(message) {
//       console.log("Parsing message:", message);
      
//       const lowercaseMessage = message.toLowerCase();
//       const websiteContent = this.state.websiteContent;
  
//       // Check for greetings
//       if (/(hi|hello|hey)/i.test(lowercaseMessage)) {
//         this.actionProvider.handleHello();
//       }
//       // Check for farewell
//       else if (/(bye|goodbye)/i.test(lowercaseMessage)) {
//         this.actionProvider.handleAdditionalMessage("Goodbye! Feel free to ask if you have more questions.");
//       }
//       // Check for thanks
//       else if (/(thanks|thank you)/i.test(lowercaseMessage)) {
//         this.actionProvider.handleAdditionalMessage("You're welcome!");
//       }
//       // Handle website content queries
//       else {
//         this.actionProvider.handleWebsiteQuery(message, websiteContent);
//       }
//     }
//   }
  
//   export default MessageParser;










// class MessageParser {
//   constructor(actionProvider) {
//     this.actionProvider = actionProvider;
//   }

//   parse(message) {
//     const msg = message.toLowerCase();

//     if (msg.includes("hi") || msg.includes("hello")) {
//       this.actionProvider.handleGreeting();
//     } else if (["1", "products", "services"].some(k => msg.includes(k))) {
//       this.actionProvider.handleServicesMenu();
//     } else if (["2", "pricing", "plans"].some(k => msg.includes(k))) {
//       this.actionProvider.handlePricing();
//     } else if (["3", "support", "technical"].some(k => msg.includes(k))) {
//       this.actionProvider.handleSupport();
//     } else if (["4", "expert"].some(k => msg.includes(k))) {
//       this.actionProvider.handleExpertConnect();
//     } else if (msg.includes("encryption")) {
//       this.actionProvider.handleEncryptionTools();
//     } else if (msg.includes("threat") || msg.includes("detection")) {
//       this.actionProvider.handleThreatDetection();
//     } else if (msg.includes("bye") || msg.includes("thanks")) {
//       this.actionProvider.handleClosing();
//     } else if (msg.match(/^[a-zA-Z ]+, \d{10}$/)) {
//       const [name, phone] = msg.split(",").map(item => item.trim());
//       this.actionProvider.updateUserData(name, phone);
//       this.actionProvider.handleMainMenu();
//     } else {
//       const defaultMsg = this.actionProvider.createChatBotMessage(
//         "Sorry, I didn’t understand that. Please choose an option from the menu."
//       );
//       this.actionProvider.addMessageToState(defaultMsg);
//     }
//   }
// }

// export default MessageParser;


// 23-05-25

// class MessageParser {
//   constructor(actionProvider) {
//     this.actionProvider = actionProvider;
//   }

//   parse(message) {
//     const msg = message.toLowerCase();
//     const userData = this.actionProvider.stateRef().userData;

//     // Check if we're collecting user info
//     if (!userData.name || !userData.phone || !userData.email) {
//       const userInfo = message.split(',').map(item => item.trim());
//       if (userInfo.length === 3) {
//         this.actionProvider.updateUserData(userInfo[0], userInfo[1], userInfo[2]);
//         this.actionProvider.handleMainMenu();
//         return;
//       } else {
//         const errorMsg = this.actionProvider.createChatBotMessage(
//           "Please provide your details in the correct format: Name, Phone, Email"
//         );
//         this.actionProvider.addMessageToState(errorMsg);
//         return;
//       }
//     }

//     // Main menu options
//     if (msg.match(/^1$|view all services|services/)) {
//       this.actionProvider.handleServicesMenu();
//     } 
//     else if (msg.match(/^2$|book|consultancy/)) {
//       this.actionProvider.handleConsultancy();
//     } 
//     else if (msg.match(/^3$|quotation|quote/)) {
//       this.actionProvider.handleQuotation();
//     } 
//     else if (msg.match(/^4$|expert|talk/)) {
//       this.actionProvider.handleExpertConnect();
//     } 
//     else if (msg.match(/^5$|support|raise/)) {
//       this.actionProvider.handleSupport();
//     }
//     // Service menu options
//     else if (msg.includes('ai') || msg.includes('automation') || msg.includes('🧠')) {
//       this.actionProvider.handleAIAutomation();
//     }
//     else if (msg.includes('software') || msg.includes('app') || msg.includes('development') || msg.includes('💻')) {
//       this.actionProvider.handleSoftwareDev();
//     }
//     else if (msg.includes('data') || msg.includes('analytics') || msg.includes('📊')) {
//       this.actionProvider.handleDataAnalytics();
//     }
//     else if (msg.includes('crm') || msg.includes('erp') || msg.includes('💬')) {
//       this.actionProvider.handleCRMIntegration();
//     }
//     else if (msg.includes('billing') || msg.includes('gst') || msg.includes('🧾')) {
//       this.actionProvider.handleBillingSoftware();
//     }
//     else if (msg.includes('cyber') || msg.includes('security') || msg.includes('🔐')) {
//       this.actionProvider.handleCybersecurity();
//     }
//     // Consultancy options
//     else if (msg.includes('ai automation') || msg.includes('rpa')) {
//       this.actionProvider.handleConsultancyOption('AI Automation & RPA');
//     }
//     else if (msg.includes('gst') || msg.includes('invoice')) {
//       this.actionProvider.handleConsultancyOption('GST Invoice Extractor Tool');
//     }
//     else if (msg.includes('crm') || msg.includes('dashboard')) {
//       this.actionProvider.handleConsultancyOption('CRM + Power BI Dashboard');
//     }
//     else if (msg.includes('erp') || msg.includes('billing')) {
//       this.actionProvider.handleConsultancyOption('Custom ERP / Billing System');
//     }
//     else if (msg.includes('cyber') || msg.includes('security') || msg.includes('assessment')) {
//       this.actionProvider.handleConsultancyOption('Cybersecurity Assessment');
//     }
//     // Confirmations
//     else if (msg.includes('yes') || msg.includes('confirm') || msg.includes('sure')) {
//       this.actionProvider.handleConfirmation('yes');
//     }
//     else if (msg.includes('no') || msg.includes('cancel')) {
//       this.actionProvider.handleConfirmation('no');
//     }
//     // Greetings and closing
//     else if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
//       this.actionProvider.handleGreeting();
//     }
//     else if (msg.includes('bye') || msg.includes('thanks') || msg.includes('thank you')) {
//       this.actionProvider.handleClosing();
//     }
//     // Default response
//     else {
//       const defaultMsg = this.actionProvider.createChatBotMessage(
//         "Sorry, I didn't understand that. Please choose an option from the menu or type 'help'."
//       );
//       this.actionProvider.addMessageToState(defaultMsg);
//     }
//   }
// }

// export default MessageParser;






class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const msg = message.toLowerCase();

    const state = this.actionProvider.stateRef?.();
    const userData = state?.userData || {};

    // Check if we're collecting user info
    if (!userData.name || !userData.phone || !userData.email) {
      const userInfo = message.split(',').map(item => item.trim());
      if (userInfo.length === 3) {
        this.actionProvider.updateUserData(userInfo[0], userInfo[1], userInfo[2]);
        this.actionProvider.handleMainMenu();
        return;
      } else {
        const errorMsg = this.actionProvider.createChatBotMessage(
          "Please provide your details in the correct format: Name, Phone, Email"
        );
        this.actionProvider.addMessageToState(errorMsg);
        return;
      }
    }

    // Main menu options
    if (msg.match(/^1$|view all services|services/)) {
      this.actionProvider.handleServicesMenu();
    } 
    else if (msg.match(/^2$|book|consultancy/)) {
      this.actionProvider.handleConsultancy();
    } 
    else if (msg.match(/^3$|quotation|quote/)) {
      this.actionProvider.handleQuotation();
    } 
    else if (msg.match(/^4$|expert|talk/)) {
      this.actionProvider.handleExpertConnect();
    } 
    else if (msg.match(/^5$|support|raise/)) {
      this.actionProvider.handleSupport();
    }
    // Service menu options
    else if (msg.includes('ai') || msg.includes('automation') || msg.includes('🧠')) {
      this.actionProvider.handleAIAutomation();
    }
    else if (msg.includes('software') || msg.includes('app') || msg.includes('development') || msg.includes('💻')) {
      this.actionProvider.handleSoftwareDev();
    }
    else if (msg.includes('data') || msg.includes('analytics') || msg.includes('📊')) {
      this.actionProvider.handleDataAnalytics();
    }
    else if (msg.includes('crm') || msg.includes('erp') || msg.includes('💬')) {
      this.actionProvider.handleCRMIntegration();
    }
    else if (msg.includes('billing') || msg.includes('gst') || msg.includes('🧾')) {
      this.actionProvider.handleBillingSoftware();
    }
    else if (msg.includes('cyber') || msg.includes('security') || msg.includes('🔐')) {
      this.actionProvider.handleCybersecurity();
    }
    // Consultancy options
    else if (msg.includes('ai automation') || msg.includes('rpa')) {
      this.actionProvider.handleConsultancyOption('AI Automation & RPA');
    }
    else if (msg.includes('gst') || msg.includes('invoice')) {
      this.actionProvider.handleConsultancyOption('GST Invoice Extractor Tool');
    }
    else if (msg.includes('crm') || msg.includes('dashboard')) {
      this.actionProvider.handleConsultancyOption('CRM + Power BI Dashboard');
    }
    else if (msg.includes('erp') || msg.includes('billing')) {
      this.actionProvider.handleConsultancyOption('Custom ERP / Billing System');
    }
    else if (msg.includes('cyber') || msg.includes('security') || msg.includes('assessment')) {
      this.actionProvider.handleConsultancyOption('Cybersecurity Assessment');
    }
    // Confirmations
    else if (msg.includes('yes') || msg.includes('confirm') || msg.includes('sure')) {
      this.actionProvider.handleConfirmation('yes');
    }
    else if (msg.includes('no') || msg.includes('cancel')) {
      this.actionProvider.handleConfirmation('no');
    }
    // Greetings and closing
    else if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
      this.actionProvider.handleGreeting();
    }
    else if (msg.includes('bye') || msg.includes('thanks') || msg.includes('thank you')) {
      this.actionProvider.handleClosing();
    }
    else  if (msg.includes('portfolio') || msg.includes('view portfolio')) {
      this.actionProvider.handleViewPortfolio();
    }
    else if (!userData.name || !userData.phone || !userData.email) {
    const userInfo = msg.split(',').map(item => item.trim());
    if (userInfo.length === 3) {
      this.actionProvider.updateUserData(userInfo[0], userInfo[1], userInfo[2]);
      this.actionProvider.handleMainMenu();
      return;
    }
  }

  // Expert connect option
  if (msg.includes('expert') || msg.includes('4')) {
    this.actionProvider.handleExpertConnect();
    return;
  }
    // Default response
    else {
      const defaultMsg = this.actionProvider.createChatBotMessage(
        "Sorry, I didn't understand that. Please choose an option from the menu or type 'help'."
      );
      this.actionProvider.addMessageToState(defaultMsg);
    }
  }
}

export default MessageParser;
