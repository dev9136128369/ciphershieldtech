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
//   constructor(actionProvider, state) {
//     this.actionProvider = actionProvider;
//     this.state = state;
//   }

//   parse(message) {
//     const lowerMsg = message.toLowerCase().trim();

//     // Handle user info collection
//     if (!this.state.userData.name && !this.state.userData.phone) {
//       this.handleUserInfo(message);
//       return;
//     }

//     // Main menu options
//     if (/^(1|products?|services?)$/i.test(lowerMsg)) {
//       this.actionProvider.handleServicesMenu();
//     } 
//     else if (/^(2|pricing|plans?)$/i.test(lowerMsg)) {
//       this.actionProvider.handlePricing();
//     }
//     else if (/^(3|support|technical)/i.test(lowerMsg)) {
//       this.actionProvider.handleSupport();
//     }
//     else if (/^(4|expert)/i.test(lowerMsg)) {
//       this.actionProvider.handleExpertConnect();
//     }
//     // Service selections
//     else if (/(🔒|encryption)/i.test(lowerMsg)) {
//       this.actionProvider.handleEncryptionTools();
//     }
//     else if (/(🛡️|threat|detection)/i.test(lowerMsg)) {
//       this.actionProvider.handleThreatDetection();
//     }
//     // Add more service options...
//     else {
//       this.actionProvider.handleDefault();
//     }
//   }

//   handleUserInfo(message) {
//     // Extract name and phone from message
//     const info = message.split(',');
//     if (info.length >= 2) {
//       const name = info[0].trim();
//       const phone = info[1].trim();
      
//       // Update state
//       this.setState(prevState => ({
//         ...prevState,
//         userData: {
//           ...prevState.userData,
//           name,
//           phone
//         }
//       }));
      
//       this.actionProvider.handleMainMenu();
//     } else {
//       this.actionProvider.handleGreeting();
//     }
//   }
// }

// export default MessageParser;




// class MessageParser {
//   constructor(actionProvider, state) {
//     this.actionProvider = actionProvider;
//     this.state = state;
//   }

//   parse(message) {
//     const lowerMsg = message.toLowerCase().trim();

//     // First check if user data needs to be collected
//     if (!this.state.userData.name || !this.state.userData.phone) {
//       this.handleUserInfo(message);
//       return;
//     }

//     // Main menu options
//     if (/^(1|products?|services?)/i.test(lowerMsg)) {
//       this.actionProvider.handleServicesMenu();
//     } 
//     else if (/^(2|pricing|plans?)/i.test(lowerMsg)) {
//       this.actionProvider.handlePricing();
//     }
//     else if (/^(3|support|technical)/i.test(lowerMsg)) {
//       this.actionProvider.handleSupport();
//     }
//     else if (/^(4|expert)/i.test(lowerMsg)) {
//       this.actionProvider.handleExpertConnect();
//     }
//     // Service selections
//     else if (/(🔒|encryption)/i.test(lowerMsg)) {
//       this.actionProvider.handleEncryptionTools();
//     }
//     else if (/(🛡️|threat|detection)/i.test(lowerMsg)) {
//       this.actionProvider.handleThreatDetection();
//     }
//     else if (/(☁️|cloud)/i.test(lowerMsg)) {
//       this.actionProvider.handleCloudSecurity();
//     }
//     else if (/(📜|compliance)/i.test(lowerMsg)) {
//       this.actionProvider.handleCompliance();
//     }
//     else if (/(💼|enterprise)/i.test(lowerMsg)) {
//       this.actionProvider.handleEnterprise();
//     }
//     // Yes/No responses
//     else if (/yes|y|ha|हां/i.test(lowerMsg)) {
//       this.actionProvider.handlePositiveResponse();
//     }
//     else if (/no|n|nahi|नहीं/i.test(lowerMsg)) {
//       this.actionProvider.handleNegativeResponse();
//     }
//     else {
//       this.actionProvider.handleDefault();
//     }
//   }

//   handleUserInfo(message) {
//     const info = message.split(',');
//     if (info.length >= 2) {
//       const name = info[0].trim();
//       const phone = info[1].trim();
      
//       if (this.validatePhone(phone)) {
//         this.actionProvider.updateUserData(name, phone);
//         this.actionProvider.handleMainMenu();
//       } else {
//         this.actionProvider.handleInvalidPhone();
//       }
//     } else {
//       this.actionProvider.handleInvalidInfo();
//     }
//   }

//   validatePhone(phone) {
//     return /^\d{10}$/.test(phone);
//   }
// }

// export default MessageParser;









class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const msg = message.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello")) {
      this.actionProvider.handleGreeting();
    } else if (["1", "products", "services"].some(k => msg.includes(k))) {
      this.actionProvider.handleServicesMenu();
    } else if (["2", "pricing", "plans"].some(k => msg.includes(k))) {
      this.actionProvider.handlePricing();
    } else if (["3", "support", "technical"].some(k => msg.includes(k))) {
      this.actionProvider.handleSupport();
    } else if (["4", "expert"].some(k => msg.includes(k))) {
      this.actionProvider.handleExpertConnect();
    } else if (msg.includes("encryption")) {
      this.actionProvider.handleEncryptionTools();
    } else if (msg.includes("threat") || msg.includes("detection")) {
      this.actionProvider.handleThreatDetection();
    } else if (msg.includes("bye") || msg.includes("thanks")) {
      this.actionProvider.handleClosing();
    } else if (msg.match(/^[a-zA-Z ]+, \d{10}$/)) {
      const [name, phone] = msg.split(",").map(item => item.trim());
      this.actionProvider.updateUserData(name, phone);
      this.actionProvider.handleMainMenu();
    } else {
      const defaultMsg = this.actionProvider.createChatBotMessage(
        "Sorry, I didn’t understand that. Please choose an option from the menu."
      );
      this.actionProvider.addMessageToState(defaultMsg);
    }
  }
}

export default MessageParser;
