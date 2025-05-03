// import React, { useState } from 'react';
// import RegistrationForm from '../RegistrationForm/RegistrationForm';
// import ProductOptions from '../ProductOptions/ProductOptions';
// import './Chatbox.css';

// const Chatbox = ({ showChat, setShowChat }) => {
//   const [step, setStep] = useState('registration');
//   const [userData, setUserData] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleSubmit = (data) => {
//     setUserData(data);
//     setStep('productServiceOptions');
//     // यहाँ आप backend API को data भेज सकते हैं
//   };

//   const toggleChat = () => {
//     setShowChat(!showChat);
//   };

//   return (
//     <div className="chatbox-container">
//       {!showChat && (
//         <button className="chatbox-icon" onClick={toggleChat}>
//           <img src="https://img.icons8.com/ios-filled/50/000000/chat.png" alt="Chat Icon" />
//         </button>
//       )}

//       {showChat && (
//         <div className="chatbox-support">
//           <div className="chatbox-header">
//             <div className="chatbox-image-header">
//               <img src="./AnD.png" width="50px" height="50px" alt="Chat" />
//             </div>
//             <div className="chatbox-content-header">
//               <h4>Chat Support</h4>
//               <p>Hi! Please fill out the form below.</p>
//             </div>
//           </div>

//           <div className="chatbox-messages">
//             {step === 'registration' && (
//               <RegistrationForm onSubmit={handleSubmit} />
//             )}

//             {step === 'productServiceOptions' && (
//               <div className="product-service-options">
//                 <p>Thank you for registering. Please select an option:</p>
//                 <button onClick={() => setStep('productOptions')}>Product</button>
//                 <button onClick={() => setStep('serviceOptions')}>Service</button>
//                 <button onClick={() => setStep('registration')}>Back</button>
//               </div>
//             )}

//             {step === 'productOptions' && (
//               <ProductOptions 
//                 onSelectProduct={setSelectedProduct}
//                 onBack={() => setStep('productServiceOptions')}
//               />
//             )}

//             {/* अन्य steps के लिए components */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbox;