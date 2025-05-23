

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
//   constructor(createChatBotMessage, setStateFunc, stateRef) {
//     this.createChatBotMessage = createChatBotMessage;
//     this.setState = setStateFunc;
//     this.stateRef = stateRef;
//   }

//   updateUserData = (name, phone) => {
//     this.setState(prev => ({
//       ...prev,
//       userData: {
//         ...prev.userData,
//         name,
//         phone
//       }
//     }));
//   };

//   handleGreeting = () => {
//     const message = this.createChatBotMessage(
//       "Welcome to CipherShieldTech! 🛡️\n\n" +
//       "Please share your name and phone number:\n" +
//       "(Example: 'John Doe, 9876543210')"
//     );
//     this.addMessageToState(message);
//   };

//   handleMainMenu = () => {
//     const message = this.createChatBotMessage(
//       "How can we help you today? Here are some options:\n\n" +
//       "1️⃣ Products & Services\n" +
//       "2️⃣ Pricing & Plans\n" +
//       "3️⃣ Technical Support\n" +
//       "4️⃣ Speak to an Expert\n\n" +
//       "*Please type your choice (1-4).*",
//       { widget: "mainMenuWidget" }
//     );
//     this.addMessageToState(message);
//   };

//   handleServicesMenu = () => {
//     const message = this.createChatBotMessage(
//       "We offer cutting-edge cybersecurity solutions. Which area interests you?\n\n" +
//       "🔒 Encryption Tools\n" +
//       "🛡️ Threat Detection\n" +
//       "☁️ Cloud Security\n" +
//       "📜 Compliance Solutions\n" +
//       "💼 Enterprise Security\n\n" +
//       "Reply with the corresponding emoji or keyword.",
//       { widget: "servicesMenuWidget" }
//     );
//     this.addMessageToState(message);
//   };

//   handleEncryptionTools = () => {
//     const message = this.createChatBotMessage(
//       "🔒 Encryption Tools:\n\n" +
//       "• End-to-End Encryption (Secure messaging/file sharing)\n" +
//       "• AES-256 & Quantum-Resistant Cryptography\n" +
//       "• Custom Encryption SDKs for developers\n\n" +
//       "Interested in a demo or pricing? (Yes/No)"
//     );
//     this.setState(prev => ({
//       ...prev,
//       userData: { ...prev.userData, interest: "Encryption Tools" }
//     }));
//     this.addMessageToState(message);
//   };

//   handleThreatDetection = () => {
//     const message = this.createChatBotMessage(
//       "🛡️ Threat Detection:\n\n" +
//       "• AI-powered Intrusion Detection Systems (IDS)\n" +
//       "• Real-time Malware & Ransomware Protection\n" +
//       "• Network Anomaly Monitoring\n\n" +
//       "Want a free vulnerability scan? (Yes/No)"
//     );
//     this.setState(prev => ({
//       ...prev,
//       userData: { ...prev.userData, interest: "Threat Detection" }
//     }));
//     this.addMessageToState(message);
//   };

//   handlePricing = () => {
//     const message = this.createChatBotMessage(
//       "💰 Pricing & Plans:\n\n" +
//       "• Starter: $99/month (Basic encryption & firewall)\n" +
//       "• Business: $299/month (Threat detection + compliance)\n" +
//       "• Enterprise: Custom pricing (Full-scale SOC & pentesting)\n\n" +
//       "Shall I email you a detailed brochure? (Yes/No)",
//       { widget: "pricingWidget" }
//     );
//     this.addMessageToState(message);
//   };

//   handleSupport = () => {
//     const message = this.createChatBotMessage(
//       "🛠️ Technical Support:\n\n" +
//       "*For urgent issues, contact our 24/7 support:*\n\n" +
//       "📞 Phone: +91 1204375355\n" +
//       "✉️ Email: support@ciphershieldtech.com\n\n" +
//       "Or describe your issue briefly (e.g., 'Login error').",
//       { widget: "supportWidget" }
//     );
//     this.addMessageToState(message);
//   };

//   handleExpertConnect = () => {
//     const { name, phone, interest } = this.stateRef().userData;
//     const message = this.createChatBotMessage(
//       "👨‍💻 Speak to an Expert:\n\n" +
//       "A cybersecurity expert will contact you shortly. Confirm your details:\n\n" +
//       `• Name: ${name || 'Not provided'}\n` +
//       `• Number: ${phone || 'Not provided'}\n` +
//       `• Query Topic: ${interest || 'Not specified'}\n\n` +
//       "Is this correct? (Yes/No)",
//       { widget: "expertWidget" }
//     );
//     this.addMessageToState(message);
//   };

//   handleClosing = () => {
//     const name = this.stateRef().userData.name || "there";
//     const message = this.createChatBotMessage(
//       `Thanks for connecting, ${name}! Stay secure with CipherShieldTech. ` +
//       "Visit our website for more. Have a great day! 🚀"
//     );
//     this.addMessageToState(message);
//   };

//   addMessageToState = (message) => {
//     this.setState(prev => ({
//       ...prev,
//       messages: [...prev.messages, message]
//     }));
//   };
// }

// export default ActionProvider;



// 23-05-25
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, stateRef) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.stateRef = stateRef;
  }

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };


handleGreeting = () => {
  const message = this.createChatBotMessage(
    "👋 Welcome to CipherShield Technologies!\n\n" +
    "To serve you better, please provide:\n\n" +
    "📛 Full Name:\n" +
    "📞 Phone Number:\n" +
    "📧 Email ID:\n\n" +
    "(Format: Name, Phone, Email)"
  );
  this.addMessageToState(message);
};

updateUserData = (name, phone, email) => {
  this.setState(prev => ({
    ...prev,
    userData: {
      name: name || prev.userData?.name || '',
      phone: phone || prev.userData?.phone || '',
      email: email || prev.userData?.email || '',
      interest: prev.userData?.interest || ''
    }
  }));
};

  // updateUserData = (name, phone, email) => {
  //   this.setState((prev) => ({
  //     ...prev,
  //     userData: {
  //       ...prev.userData,
  //       name,
  //       phone,
  //       email,
  //     },
  //   }));
  // };

  // handleGreeting = () => {
  //   const message = this.createChatBotMessage(
  //     "👋 Welcome to CipherShield Technologies -- Your Partner in Innovation, Automation, and Cybersecurity!\n\n" +
  //       "To serve you better, may I know your:\n\n" +
  //       "📛 Full Name:\n" +
  //       "📞 Phone Number:\n" +
  //       "📧 Email ID:\n\n" +
  //       "(Please provide in this format: Name, Phone, Email)"
  //   );
  //   this.addMessageToState(message);
  // };

  handleMainMenu = () => {
    const name = this.stateRef().userData?.name || "User";
    const message = this.createChatBotMessage(
      `Thank you, ${name}! Please select what you're looking for today:\n\n` +
        "1️⃣ View All Services\n" +
        "2️⃣ Book a Free Consultancy\n" +
        "3️⃣ Get quotation\n" +
        "4️⃣ Talk to Our Expert\n" +
        "5️⃣ Raise a Support Request\n\n" +
        "*Please type the number (1-5) of your choice.*",
      { widget: "mainMenuWidget" }
    );
    this.addMessageToState(message);
  };

  handleViewPortfolio = () => {
    const navigate = this.stateRef().navigate;
    if (navigate && typeof navigate === 'function') {
      navigate('/CategoryPage');
    } else {
      // Fallback अगर navigate उपलब्ध न हो
      window.location.href = '/CategoryPage';
    }
  };


  handleServicesMenu = () => {
    const message = this.createChatBotMessage(
      "We offer 360° Digital Solutions. Select a category to explore detailed services:\n\n" +
        "🧠 AI-Powered Automation\n" +
        "💻 Custom Software / Web / App Development\n" +
        "📊 Data Analytics, BI & Dashboards\n" +
        "💬 CRM, ERP & Chatbot Integration\n" +
        "🧾 Billing, GST, Accounting Software\n" +
        "☁️ Cloud Infrastructure (AWS / Azure / GCP)\n" +
        "🎯 SEO, Digital Marketing & Website Design\n" +
        "📚 Corporate Training in IT / Automation\n" +
        "🔐 Cybersecurity & Compliance\n\n" +
        "Type the keyword or emoji to continue",
      { widget: "servicesMenuWidget" }
    );
    this.addMessageToState(message);
  };

  handleAIAutomation = () => {
    const message = this.createChatBotMessage(
      "🧠 AI-Powered Automation\n\n" +
        "We help businesses automate daily operations with:\n\n" +
        "✅ Process Automation (emails, workflows, tasks)\n" +
        "✅ AI Chatbots for Customer Support\n" +
        "✅ Auto-Invoice Generation & Filing\n" +
        "✅ Lead Generation Bots\n\n" +
        "Want a free automation audit? (Yes/No)",
      { widget: "aiAutomationWidget" }
    );
    this.setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, interest: "AI-Powered Automation" },
    }));
    this.addMessageToState(message);
  };

  handleSoftwareDev = () => {
    const message = this.createChatBotMessage(
      "💻 Software / App Development\n\n" +
        "Tech Stack: Java, Python, React, Node.js, C#, Django\n\n" +
        "📱 Mobile Apps | 🖥️ Web Apps | 🧾 ERP/Billing Software\n\n" +
        "Ready to build your next idea? (Yes/No)"
    );
    this.setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, interest: "Software Development" },
    }));
    this.addMessageToState(message);
  };

  handleDataAnalytics = () => {
    const message = this.createChatBotMessage(
      "📊 Data Analytics, BI & Dashboards\n\n" +
        "Turn raw data into powerful insights 📈\n\n" +
        "✅ Custom Power BI & Tableau Dashboards\n" +
        "✅ Sales, HR, Inventory, Finance Analytics\n" +
        "✅ Excel Automation & Data Visualization\n" +
        "✅ Predictive Analytics using Machine Learning\n" +
        "✅ Real-Time Reports with API integration\n\n" +
        "Want to see sample dashboards? (Yes/No)"
    );
    this.setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, interest: "Data Analytics" },
    }));
    this.addMessageToState(message);
  };

  handleCRMIntegration = () => {
    const message = this.createChatBotMessage(
      "💬 CRM, ERP & Chatbot Integration\n\n" +
        "Centralize & streamline your business operations 🤖\n\n" +
        "✅ Custom CRM Solutions (Sales, Support, HRM)\n" +
        "✅ ERP Software (Tally, Zoho, SAP integrations)\n" +
        "✅ AI Chatbots for WhatsApp, Web & FB Messenger\n" +
        "✅ Lead Management & Auto-Follow-up Bots\n" +
        "✅ WhatsApp Business API Integration\n\n" +
        "Want to integrate AI into your CRM/ERP? (Yes/No)"
    );
    this.setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, interest: "CRM Integration" },
    }));
    this.addMessageToState(message);
  };

  handleBillingSoftware = () => {
    const message = this.createChatBotMessage(
      "🧾 Billing, GST & Accounting Software\n\n" +
        "Smart solutions for accounting and compliance 📊\n\n" +
        "✅ GST Invoicing Tool (with Excel Conversion)\n" +
        "✅ Tally & Zoho Customization\n" +
        "✅ Multi-Branch Billing Software\n" +
        "✅ Inventory Management & E-way Bill\n" +
        "✅ Reports: GSTR-1, 2A, 3B, Balance Sheet, P&L\n\n" +
        "Want to schedule a demo of our billing tools? (Yes/No)"
    );
    this.setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, interest: "Billing Software" },
    }));
    this.addMessageToState(message);
  };


handleCloudInfra = () => {
    const message = this.createChatBotMessage(
      "☁️ Cloud Infrastructure (AWS / Azure / GCP)\n\n" +
      "Scale securely in the cloud ☁️🚀\n\n" +
      "✅ AWS, Microsoft Azure & Google Cloud Setup\n" +
      "✅ Cloud Migration Services\n" +
      "✅ DevOps & CI/CD Pipeline Deployment\n" +
      "✅ Data Backup & Disaster Recovery\n" +
      "✅ Kubernetes & Docker Container Security\n\n" +
      "📦 Need help migrating your software to the cloud? (Yes/No)"
    );
    this.setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, interest: "Cloud Infrastructure" },
    }));
    this.addMessageToState(message);
  };

  handleSEOMarketing = () => {
    const message = this.createChatBotMessage(
      "🎯 SEO, Digital Marketing & Website Design\n\n" +
      "Boost your online presence & generate leads 🌐\n\n" +
      "✅ Responsive Websites (HTML, WordPress, React)\n" +
      "✅ SEO Optimization (On-page/Off-page, Keywords)\n" +
      "✅ Social Media Marketing (Instagram, LinkedIn, FB)\n" +
      "✅ Google Ads & Remarketing Campaigns\n" +
      "✅ Branding: Logo, Brochures, Company Profiles\n\n" +
      "📈 Need a free website audit or SEO report? (Yes/No)"
    );
    this.setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, interest: "SEO & Marketing" },
    }));
    this.addMessageToState(message);
  };

  handleCorporateTraining = () => {
    const message = this.createChatBotMessage(
      "📚 Corporate Training in IT / Automation\n\n" +
      "Empower your team with skill-based training 🎓\n\n" +
      "✅ Python, Java, Web Development\n" +
      "✅ AI/ML, RPA & Data Science\n" +
      "✅ Cloud Computing (AWS/Azure)\n" +
      "✅ Cybersecurity Awareness & SOC Tools\n" +
      "✅ Corporate ERP/CRM/Power BI Training\n\n" +
      "🎯 Want a custom training proposal for your team? (Yes/No)"
    );
    this.setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, interest: "Corporate Training" },
    }));
    this.addMessageToState(message);
  };


  handleCybersecurity = () => {
    const message = this.createChatBotMessage(
      "🔐 Cybersecurity & Compliance\n\n" +
        "We secure your digital assets with:\n\n" +
        "✅ Threat Detection, Firewall, SOC\n" +
        "✅ Encryption Tools & Secure File Sharing\n" +
        "✅ GDPR / ISO / PCI Compliance Audits\n\n" +
        "Need a vulnerability scan report? (Yes/No)",
      { widget: "cybersecurityWidget" }
    );
    this.setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, interest: "Cybersecurity" },
    }));
    this.addMessageToState(message);
  };

  handleConsultancy = () => {
    const message = this.createChatBotMessage(
      "📅 Book a Free Consultancy\n\n" +
        "Choose the solution you'd like a demo for:\n\n" +
        "🔹 AI Automation & RPA\n" +
        "🔹 GST Invoice Extractor Tool\n" +
        "🔹 CRM + Power BI Dashboard\n" +
        "🔹 Custom ERP / Billing System\n" +
        "🔹 Cybersecurity Assessment\n\n" +
        "Type the service name. We'll schedule a live demo 📅",
      { widget: "consultancyWidget" }
    );
    this.addMessageToState(message);
  };

  handleConsultancyOption = (option) => {
    const message = this.createChatBotMessage(
      `You've selected: ${option}\n\n` +
        "Please provide your preferred date and time for the consultancy session.\n" +
        "(Example: '25th May, 3 PM')"
    );
    
    this.setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, consultancyOption: option },
    }));
    this.addMessageToState(message);
    
  };

  handleQuotation = () => {
    const message = this.createChatBotMessage(
      "💰 Get Quotation\n\n" +
        "Please describe your requirements briefly (e.g., 'Need a custom CRM system' or 'Website development for e-commerce').\n\n" +
        "Our team will prepare a customized quotation for you."
    );
    this.addMessageToState(message);
  };

  
  
//  handleExpertConnect = () => {
//   const userData = this.stateRef().userData || {};
  
//   // अगर details नहीं हैं
//   if (!userData.name || !userData.phone) {
//     const message = this.createChatBotMessage(
//       "First, please share your details:\n\n" +
//       "📛 Full Name:\n" +
//       "📞 Phone Number:\n" +
//       "📧 Email ID:\n\n" +
//       "(Format: Name, Phone, Email)"
//     );
//     this.addMessageToState(message);
//     return;
//   }

//   const message = this.createChatBotMessage(
//     "☎️ Talk to Our Expert\n\n" +
//     "Please confirm your details:\n\n" +
//     `👤 Name: ${userData.name}\n` +
//     `📞 Phone: ${userData.phone}\n` +
//     `📧 Email: ${userData.email}\n\n` +
//     "Our expert will contact you shortly. Confirm? (Yes/No)",
//     { widget: "expertWidget" }
//   );
  
//   this.addMessageToState(message);
// };
handleExpertConnect = () => {
    const message = this.createChatBotMessage(
      // "🛠️ Raise a Support Request\n\n" +
      "☎️ Talk to Our Expert\n\n" +
    "Please confirm your details:\n\n" +
    `👤 Name: Devendra Pal Singh\n` +
        "Please describe your issue briefly (e.g., 'Dashboard not loading' or 'Login error').\n\n" +
        "📞 You may also call us at +91 8979509677\n" +
        "📧 Or email us: ciphershieldtechnologies@gmail.com",
      { widget: "ExpertWidget" }
    );
    this.addMessageToState(message);
  };

  handleSupport = () => {
    const message = this.createChatBotMessage(
      "🛠️ Raise a Support Request\n\n" +
        "Please describe your issue briefly (e.g., 'Dashboard not loading' or 'Login error').\n\n" +
        "📞 You may also call us at +91 1204375355\n" +
        "📧 Or email us: ciphershieldtechnologies@gmail.com",
      { widget: "supportWidget" }
    );
    this.addMessageToState(message);
  };

  handleConfirmation = (response) => {
    const isYes = response.toLowerCase() === "yes";
    const message = this.createChatBotMessage(
      isYes
        ? "✅ Thank you! Our team will connect with you shortly.\n\nHave a great day! 🚀"
        : "No problem! Here's the main menu again:",
    );
    this.addMessageToState(message);
    if (!isYes) this.handleMainMenu();
  };

  handleClosing = () => {
    const name = this.stateRef().userData?.name || "there";
    const message = this.createChatBotMessage(
      `Thanks for reaching CipherShield Technologies, ${name}! 🔐\n\n` +
        "We're here to make your business smarter, faster, and more secure.\n\n" +
        "Explore more on our website 🌐 or reply at any time to continue.\n\n" +
        "Have a great day! 🚀"
    );
    this.addMessageToState(message);
  };
}

export default ActionProvider;
