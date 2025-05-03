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



class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log("Parsing message:", message);
      
      const lowercaseMessage = message.toLowerCase();
      const websiteContent = this.state.websiteContent;
  
      // Check for greetings
      if (/(hi|hello|hey)/i.test(lowercaseMessage)) {
        this.actionProvider.handleHello();
      }
      // Check for farewell
      else if (/(bye|goodbye)/i.test(lowercaseMessage)) {
        this.actionProvider.handleAdditionalMessage("Goodbye! Feel free to ask if you have more questions.");
      }
      // Check for thanks
      else if (/(thanks|thank you)/i.test(lowercaseMessage)) {
        this.actionProvider.handleAdditionalMessage("You're welcome!");
      }
      // Handle website content queries
      else {
        this.actionProvider.handleWebsiteQuery(message, websiteContent);
      }
    }
  }
  
  export default MessageParser;