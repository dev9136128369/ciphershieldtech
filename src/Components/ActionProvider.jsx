

// // ActionProvider.js
// class ActionProvider {
//     constructor(createChatBotMessage, setStateFunc, createClientMessage) {
//         this.createChatBotMessage = createChatBotMessage;
//         this.setStateFunc = setStateFunc;
//         this.createClientMessage = createClientMessage;
//     }

//     // Action handle karne ka function
//     handleHello() {
//         const message = this.createChatBotMessage("Hello! How can I assist you today?");
//         this.setStateFunc(prevState => ({
//             ...prevState,
//             messages: [...prevState.messages, message]  // Yahan message add karo
//         }));
//     }

//     // Additional messages handle karne ka new action
//     handleAdditionalMessage(text) {
//         const message = this.createChatBotMessage(text);
//         this.setStateFunc(prevState => ({
//             ...prevState,
//             messages: [...prevState.messages, message]  // Yahan message add karo
//         }));
//     }
// }

// export default ActionProvider;



// class ActionProvider {
//     constructor(createChatBotMessage, setStateFunc, createClientMessage) {
//       this.createChatBotMessage = createChatBotMessage;
//       this.setStateFunc = setStateFunc;
//       this.createClientMessage = createClientMessage;
//     }
  
//     // Handle general greetings
//     handleHello() {
//       const message = this.createChatBotMessage("Hello! I can answer questions about this website. What would you like to know?");
//       this.addMessageToState(message);
//     }
  
//     // Handle website content questions
//     handleWebsiteQuery(query, websiteContent) {
//       let response = "I couldn't find relevant information about that on this website.";
      
//       if (websiteContent) {
//         // Simple keyword matching (can be enhanced with NLP)
//         const lowercaseContent = websiteContent.toLowerCase();
//         const lowercaseQuery = query.toLowerCase();
        
//         if (lowercaseContent.includes(lowercaseQuery)) {
//           response = `Yes, this website mentions "${query}". Here's some relevant information: `;
          
//           // Extract context around the keyword
//           const index = lowercaseContent.indexOf(lowercaseQuery);
//           const context = websiteContent.substring(Math.max(0, index - 50), Math.min(websiteContent.length, index + 50));
//           response += `..."${context}"...`;
//         }
//       } else {
//         response = "I'm having trouble analyzing this website's content.";
//       }
      
//       const message = this.createChatBotMessage(response);
//       this.addMessageToState(message);
//     }
  
//     // Handle unknown queries
//     handleUnknown() {
//       const message = this.createChatBotMessage("I'm not sure about that. You can ask me about this website's content.");
//       this.addMessageToState(message);
//     }
  
//     // Helper method to add message to state
//     addMessageToState(message) {
//       this.setStateFunc(prevState => ({
//         ...prevState,
//         messages: [...prevState.messages, message]
//       }));
//     }
//   }
  
//   export default ActionProvider;


class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, stateRef) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.stateRef = stateRef;
  }

  updateUserData = (name, phone) => {
    this.setState(prev => ({
      ...prev,
      userData: {
        ...prev.userData,
        name,
        phone
      }
    }));
  };

  handleGreeting = () => {
    const message = this.createChatBotMessage(
      "Welcome to CipherShieldTech! 🛡️\n\n" +
      "Please share your name and phone number:\n" +
      "(Example: 'John Doe, 9876543210')"
    );
    this.addMessageToState(message);
  };

  handleMainMenu = () => {
    const message = this.createChatBotMessage(
      "How can we help you today? Here are some options:\n\n" +
      "1️⃣ Products & Services\n" +
      "2️⃣ Pricing & Plans\n" +
      "3️⃣ Technical Support\n" +
      "4️⃣ Speak to an Expert\n\n" +
      "*Please type your choice (1-4).*",
      { widget: "mainMenuWidget" }
    );
    this.addMessageToState(message);
  };

  handleServicesMenu = () => {
    const message = this.createChatBotMessage(
      "We offer cutting-edge cybersecurity solutions. Which area interests you?\n\n" +
      "🔒 Encryption Tools\n" +
      "🛡️ Threat Detection\n" +
      "☁️ Cloud Security\n" +
      "📜 Compliance Solutions\n" +
      "💼 Enterprise Security\n\n" +
      "Reply with the corresponding emoji or keyword.",
      { widget: "servicesMenuWidget" }
    );
    this.addMessageToState(message);
  };

  handleEncryptionTools = () => {
    const message = this.createChatBotMessage(
      "🔒 Encryption Tools:\n\n" +
      "• End-to-End Encryption (Secure messaging/file sharing)\n" +
      "• AES-256 & Quantum-Resistant Cryptography\n" +
      "• Custom Encryption SDKs for developers\n\n" +
      "Interested in a demo or pricing? (Yes/No)"
    );
    this.setState(prev => ({
      ...prev,
      userData: { ...prev.userData, interest: "Encryption Tools" }
    }));
    this.addMessageToState(message);
  };

  handleThreatDetection = () => {
    const message = this.createChatBotMessage(
      "🛡️ Threat Detection:\n\n" +
      "• AI-powered Intrusion Detection Systems (IDS)\n" +
      "• Real-time Malware & Ransomware Protection\n" +
      "• Network Anomaly Monitoring\n\n" +
      "Want a free vulnerability scan? (Yes/No)"
    );
    this.setState(prev => ({
      ...prev,
      userData: { ...prev.userData, interest: "Threat Detection" }
    }));
    this.addMessageToState(message);
  };

  handlePricing = () => {
    const message = this.createChatBotMessage(
      "💰 Pricing & Plans:\n\n" +
      "• Starter: $99/month (Basic encryption & firewall)\n" +
      "• Business: $299/month (Threat detection + compliance)\n" +
      "• Enterprise: Custom pricing (Full-scale SOC & pentesting)\n\n" +
      "Shall I email you a detailed brochure? (Yes/No)",
      { widget: "pricingWidget" }
    );
    this.addMessageToState(message);
  };

  handleSupport = () => {
    const message = this.createChatBotMessage(
      "🛠️ Technical Support:\n\n" +
      "*For urgent issues, contact our 24/7 support:*\n\n" +
      "📞 Phone: +91 1204375355\n" +
      "✉️ Email: support@ciphershieldtech.com\n\n" +
      "Or describe your issue briefly (e.g., 'Login error').",
      { widget: "supportWidget" }
    );
    this.addMessageToState(message);
  };

  handleExpertConnect = () => {
    const { name, phone, interest } = this.stateRef().userData;
    const message = this.createChatBotMessage(
      "👨‍💻 Speak to an Expert:\n\n" +
      "A cybersecurity expert will contact you shortly. Confirm your details:\n\n" +
      `• Name: ${name || 'Not provided'}\n` +
      `• Number: ${phone || 'Not provided'}\n` +
      `• Query Topic: ${interest || 'Not specified'}\n\n` +
      "Is this correct? (Yes/No)",
      { widget: "expertWidget" }
    );
    this.addMessageToState(message);
  };

  handleClosing = () => {
    const name = this.stateRef().userData.name || "there";
    const message = this.createChatBotMessage(
      `Thanks for connecting, ${name}! Stay secure with CipherShieldTech. ` +
      "Visit our website for more. Have a great day! 🚀"
    );
    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  };
}

export default ActionProvider;
