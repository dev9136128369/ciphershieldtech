

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



class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setStateFunc = setStateFunc;
      this.createClientMessage = createClientMessage;
    }
  
    // Handle general greetings
    handleHello() {
      const message = this.createChatBotMessage("Hello! I can answer questions about this website. What would you like to know?");
      this.addMessageToState(message);
    }
  
    // Handle website content questions
    handleWebsiteQuery(query, websiteContent) {
      let response = "I couldn't find relevant information about that on this website.";
      
      if (websiteContent) {
        // Simple keyword matching (can be enhanced with NLP)
        const lowercaseContent = websiteContent.toLowerCase();
        const lowercaseQuery = query.toLowerCase();
        
        if (lowercaseContent.includes(lowercaseQuery)) {
          response = `Yes, this website mentions "${query}". Here's some relevant information: `;
          
          // Extract context around the keyword
          const index = lowercaseContent.indexOf(lowercaseQuery);
          const context = websiteContent.substring(Math.max(0, index - 50), Math.min(websiteContent.length, index + 50));
          response += `..."${context}"...`;
        }
      } else {
        response = "I'm having trouble analyzing this website's content.";
      }
      
      const message = this.createChatBotMessage(response);
      this.addMessageToState(message);
    }
  
    // Handle unknown queries
    handleUnknown() {
      const message = this.createChatBotMessage("I'm not sure about that. You can ask me about this website's content.");
      this.addMessageToState(message);
    }
  
    // Helper method to add message to state
    addMessageToState(message) {
      this.setStateFunc(prevState => ({
        ...prevState,
        messages: [...prevState.messages, message]
      }));
    }
  }
  
  export default ActionProvider;