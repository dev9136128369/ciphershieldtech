// import React, { useState } from 'react';

// const Chatbot = () => {
//   const [activeSection, setActiveSection] = useState('registrationForm');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isChatboxOpen, setIsChatboxOpen] = useState(false);

//   const toggleChatbox = () => {
//     setIsChatboxOpen(!isChatboxOpen);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     setActiveSection('productServiceOptions');
//   };

//   const handleProductSelect = (product) => {
//     setSelectedOption(product);
//     setActiveSection('contactMoreDetails');
//   };

//   const handleServiceSelect = (service) => {
//     setSelectedOption(service);
//     setActiveSection('serviceContactMoreDetails');
//   };

//   const handleBack = (fromSection) => {
//     switch(fromSection) {
//       case 'productOptions':
//         setActiveSection('productServiceOptions');
//         break;
//       case 'serviceOptions':
//         setActiveSection('productServiceOptions');
//         break;
//       case 'contactMoreDetails':
//         setActiveSection('productOptions');
//         break;
//       case 'serviceContactMoreDetails':
//         setActiveSection('serviceOptions');
//         break;
//       case 'contactOptions':
//         setActiveSection('contactMoreDetails');
//         break;
//       default:
//         setActiveSection('registrationForm');
//     }
//   };

//   const products = [
//     { name: 'Tally', link: 'https://andwebtech.com/content.php#' },
//     { name: 'EzyBill', link: 'https://andwebtech.com/content2.php' },
//     { name: 'Import BusyData', link: 'https://andwebtech.com/content2.php#' },
//     { name: 'Tally on Cloud', link: 'https://andwebtech.com/tally_on_cloud.php' },
//     { name: 'Tally on Mobile', link: 'https://andwebtech.com/tally_on_mobile.php' }
//   ];

//   const services = [
//     { name: 'Web Designing', link: 'https://andwebtech.com/content.php#' },
//     { name: 'Software Development', link: 'https://andwebtech.com/content2.php' },
//     { name: 'Android App Development', link: 'https://andwebtech.com/content2.php#' },
//     { name: 'Digital Marketing', link: 'https://andwebtech.com/tally_on_cloud.php' },
//     { name: 'SEO', link: 'https://andwebtech.com/tally_on_mobile.php' },
//     { name: 'E-Publishing', link: 'https://andwebtech.com/content3.php' },
//     { name: 'Digitization', link: 'https://andwebtech.com/content4.php' },
//     { name: 'Data Conversion', link: 'https://andwebtech.com/content5.php' }
//   ];







//   document.addEventListener("DOMContentLoaded", () => {
//     const contactMoreDetails = document.getElementById("contactMoreDetails");
//     const chatboxSupport = document.getElementById("chatboxSupport");
//     const contactButton = document.getElementById("contactButton");
//     const contactOptions = document.getElementById("contactOptions");
//     const backToOptionsButton = document.getElementById("backToOptionsButton");
//     const selectedProductName = document.getElementById("selectedProductName");
  
//     const chatboxIcon = document.getElementById("chatboxIcon");
//     const productButton = document.getElementById("productButton");
//     const serviceButton = document.getElementById("serviceButton");
//     const backToRegistrationFromProduct = document.getElementById(
//       "backToRegistrationFromProduct"
//     );
//     const productOptions = document.getElementById("productOptions");
//     const serviceOptions = document.getElementById("serviceOptions");
  
//     const productServiceInfo = document.getElementById("productServiceInfo");
//     const productServiceTitle = document.getElementById("productServiceTitle");
//     const productServiceDescription = document.getElementById(
//       "productServiceDescription"
//     );
//     const tallyButton = document.getElementById("tallyButton");
//     const ezyBillButton = document.getElementById("ezyBillButton");
//     const busyDataButton = document.getElementById("busyDataButton");
//     const tallyCloudButton = document.getElementById("tallyCloudButton");
//     const tallyMobileButton = document.getElementById("tallyMobileButton");
  
//     // Ensure that the elements are available before attaching event listeners
//     if (contactButton) {
//       contactButton.addEventListener("click", () => {
//         contactOptions.style.display = "block";
//       });
//     }
  
//     if (backToOptionsButton) {
//       backToOptionsButton.addEventListener("click", () => {
//         contactOptions.style.display = "none";
//       });
//     }
  
//     // Attach Event Listeners to Redirect Buttons
//     const buttons = [
//       tallyButton,
//       ezyBillButton,
//       busyDataButton,
//       tallyCloudButton,
//       tallyMobileButton,
//     ];
//     buttons.forEach((button) => {
//       if (button) {
//         button.addEventListener("click", redirectToContactModal);
//       }
//     });
  
//     const serviceButtons = [
//       { id: "webDesigningButton", serviceName: "Web Designing" },
//       { id: "softwareDevButton", serviceName: "Software Development" },
//       { id: "androidDevButton", serviceName: "Android App Development" },
//       { id: "digitalMarketingButton", serviceName: "Digital Marketing" },
//       { id: "seoButton", serviceName: "SEO" },
//       { id: "ePublishingButton", serviceName: "E-Publishing" },
//       { id: "digitizationButton", serviceName: "Digitization" },
//       { id: "dataConversionButton", serviceName: "Data Conversion" },
//     ];
  
//     // Add click event for each service button
//     serviceButtons.forEach(({ id, serviceName }) => {
//       const button = document.getElementById(id);
//       if (button) {
//         button.addEventListener("click", () => {
//           displayServiceDetails(serviceName);
//         });
//       }
  
//       function displayServiceDetails(serviceName) {
//         const contactMoreDetails = document.getElementById("contactMoreDetails");
//         const serviceContactDetails = document.getElementById(
//           "serviceContactMoreDetails"
//         );
//         const serviceOptions = document.getElementById("serviceOptions");
//         const productServiceInfo = document.getElementById("productServiceInfo");
//         const productServiceTitle = document.getElementById(
//           "productServiceTitle"
//         );
//         const productServiceDescription = document.getElementById(
//           "productServiceDescription"
//         );
  
//         // Ensure the passed serviceName is valid
//         if (!serviceName) {
//           console.error("Service name is not defined.");
//           return;
//         }
  
//         // Hide service options and display details section
//         if (serviceOptions) serviceOptions.style.display = "none";
  
//         // Update the service title and description
//         if (productServiceInfo) {
//           productServiceInfo.style.display = "block";
//           if (productServiceTitle) productServiceTitle.textContent = serviceName;
//           if (productServiceDescription) {
//             productServiceDescription.textContent = `Learn more about ${serviceName}. Connect with us for detailed information.`;
//           }
//         }
  
//         // Show contact and more details sections
//         if (contactMoreDetails) contactMoreDetails.style.display = "block";
//         if (serviceContactDetails) serviceContactDetails.style.display = "block";
//       }
  
//       // Back button logic to go back to service options
//       const backToServiceOptionsButton = document.getElementById(
//         "backToServiceOptionsButton"
//       );
//       if (backToServiceOptionsButton) {
//         backToServiceOptionsButton.addEventListener("click", () => {
//           if (document.getElementById("serviceContactMoreDetails"))
//             document.getElementById("serviceContactMoreDetails").style.display =
//               "none";
//           if (serviceOptions) serviceOptions.style.display = "block";
//         });
//       }
//     });
  
//     // Display Contact and More Details Modal
//     function redirectToContactModal() {
//       const contactMoreDetails = document.getElementById("contactMoreDetails");
//       if (productOptions) {
//         productOptions.style.display = "none";
//       }
//       if (contactMoreDetails) {
//         contactMoreDetails.style.display = "block";
//       }
//     }
  
//     // Toggle Chatbox Visibility
//     if (chatboxIcon) {
//       chatboxIcon.addEventListener("click", () => {
//         const isHidden =
//           chatboxSupport.style.display === "none" ||
//           chatboxSupport.style.display === "";
//         chatboxSupport.style.display = isHidden ? "block" : "none";
//       });
//     }
  
//     // Handle form submission
//     if (document.getElementById("registerForm")) {
//       document.getElementById("registerForm").addEventListener("submit", (e) => {
//         e.preventDefault();
  
//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const phone = document.getElementById("phone").value;
  
//         // Send the form data to the backend using fetch
//         fetch("http://localhost:3000/chat-email", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name, email, phone }),
//         })
//           .then((response) => {
//             if (response.ok) {
//               console.log("Email sent successfully!");
//               // Hide the registration form and show productServiceOptions
//               document.getElementById("registrationForm").style.display = "none";
//               document.getElementById("productServiceOptions").style.display =
//                 "block";
//             } else {
//               console.error("There was an error sending the email.");
//               alert("There was an error sending the email. Please try again.");
//             }
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//             alert("There was an error sending the email. Please try again.");
//           });
//       });
//     }
  
//     // Function to handle "More Details" click
//     function handleMoreDetailsClick(selectedName, type) {
//       if (!selectedName || !type) {
//         console.error("Invalid parameters: selectedName or type is missing.");
//         return;
//       }
  
//       let redirectUrl = "#"; // Default URL
  
//       if (type === "product") {
//         switch (selectedName) {
//           case "Tally":
//             redirectUrl = "https://andwebtech.com/content.php#";
//             break;
//           case "EzyBill":
//             redirectUrl = "https://andwebtech.com/content2.php";
//             break;
//           case "Import BusyData":
//             redirectUrl = "https://andwebtech.com/content2.php#";
//             break;
//           case "Tally on Cloud":
//             redirectUrl = "https://andwebtech.com/tally_on_cloud.php";
//             break;
//           case "Tally on Mobile":
//             redirectUrl = "https://andwebtech.com/tally_on_mobile.php";
//             break;
//           default:
//             console.warn(`Unknown product: ${selectedName}`);
//         }
//       } else if (type === "service") {
//         switch (selectedName) {
//           case "Web Designing":
//             redirectUrl = "https://andwebtech.com/content.php#";
//             break;
//           case "Software Development":
//             redirectUrl = "https://andwebtech.com/content2.php";
//             break;
//           case "Android App Development":
//             redirectUrl = "https://andwebtech.com/content2.php#";
//             break;
//           case "Digital Marketing":
//             redirectUrl = "https://andwebtech.com/tally_on_cloud.php";
//             break;
//           case "SEO":
//             redirectUrl = "https://andwebtech.com/tally_on_mobile.php";
//             break;
//           case "E-Publishing":
//             redirectUrl = "https://andwebtech.com/tally_on_cloud.php";
//             break;
//           case "Digitization":
//             redirectUrl = "https://andwebtech.com/tally_on_mobile.php";
//             break;
//           case "Data Conversion":
//             redirectUrl = "https://andwebtech.com/tally_on_cloud.php";
//             break;
//           default:
//             console.warn(`Unknown service: ${selectedName}`);
//         }
//       }
  
//       if (redirectUrl === "#") {
//         console.error("Failed to resolve redirect URL for:", selectedName);
//       } else {
//         window.open(redirectUrl, "_blank");
//       }
//     }
  
//     // Add event listeners for product buttons
//     document.querySelectorAll(".product-button").forEach((button) => {
//       button.addEventListener("click", () => {
//         const productName = button.getAttribute("data-product");
//         selectedProductName.textContent = productName;
  
//         // Show the contact and more details section
//         productOptions.style.display = "none";
//         contactMoreDetails.style.display = "block";
  
//         // Set data type for "More Details" button
//         document
//           .getElementById("moreDetailsButton")
//           .setAttribute("data-type", "product");
//       });
//     });
  
//     // Add event listeners for product buttons
//     document.querySelectorAll(".service-button").forEach((button) => {
//       button.addEventListener("click", () => {
//         const serviceName = button.getAttribute("data-product");
//         selectedProductName.textContent = serviceName;
  
//         // Show the contact and more details section
//         productOptions.style.display = "none";
//         contactMoreDetails.style.display = "block";
  
//         // Set data type for "More Details" button
//         document
//           .getElementById("moreDetailsButton")
//           .setAttribute("data-type", "product");
//       });
//     });
  
//     // Debugging inside "More Details" click handler
//     document.getElementById("moreDetailsButton").addEventListener("click", () => {
//       const selectedName = selectedProductName.textContent;
//       const type = document
//         .getElementById("moreDetailsButton")
//         .getAttribute("data-type");
  
//       console.log("More Details Button Clicked");
//       console.log("Selected Name:", selectedName);
//       console.log("Type:", type);
  
//       // Call the handler with the selected name and type
//       handleMoreDetailsClick(selectedName, type);
//     });
  
//     // Back button logic
//     document.getElementById("backoButton").addEventListener("click", () => {
//       contactMoreDetails.style.display = "none";
//       productOptions.style.display = "block";
//     });
  
//     // Handle Product Button Click
//     productButton?.addEventListener("click", () => {
//       document.getElementById("productServiceOptions").style.display = "none";
//       productOptions.style.display = "block";
//     });
  
//     // Handle Service Button Click
//     serviceButton?.addEventListener("click", () => {
//       document.getElementById("productServiceOptions").style.display = "none";
//       serviceOptions.style.display = "block";
//     });
  
//     // Back Button Click for Product Options
//     backToRegistrationFromProduct?.addEventListener("click", () => {
//       if (productOptions) productOptions.style.display = "none";
//       if (serviceOptions) serviceOptions.style.display = "none";
//       if (productServiceInfo) productServiceInfo.style.display = "none";
//       const productServiceOptions = document.getElementById(
//         "productServiceOptions"
//       );
//       if (productServiceOptions) productServiceOptions.style.display = "block";
//     });
  
//     // Display Info when Product/Service Button is Clicked
//     function displayProductServiceInfo(title, description) {
//       if (
//         productServiceTitle &&
//         productServiceDescription &&
//         productServiceInfo
//       ) {
//         productServiceTitle.textContent = title;
//         productServiceDescription.textContent = description;
//         productServiceInfo.style.display = "block";
//       }
//     }
  
//     document.getElementById("tallyButton")?.addEventListener("click", () => {
//       displayProductServiceInfo(
//         "Tally",
//         "Tally is a popular accounting software for businesses."
//       );
//     });
  
//     document.getElementById("ezyBillButton")?.addEventListener("click", () => {
//       displayProductServiceInfo(
//         "EzyBill",
//         "EzyBill is a cloud-based invoicing solution."
//       );
//     });
  
//     document.getElementById("busyDataButton")?.addEventListener("click", () => {
//       displayProductServiceInfo(
//         "Import BusyData",
//         "Import your Busy accounting data into new software."
//       );
//     });
  
//     document.getElementById("tallyCloudButton")?.addEventListener("click", () => {
//       displayProductServiceInfo(
//         "Tally on Cloud",
//         "Tally available on cloud for easy access."
//       );
//     });
  
//     document
//       .getElementById("tallyMobileButton")
//       ?.addEventListener("click", () => {
//         displayProductServiceInfo(
//           "Tally on Mobile",
//           "Access Tally on mobile devices for greater flexibility."
//         );
//       });
  
//     // Back to Service Options from Contact/More Details
//     document
//       .getElementById("backToServiceOptionsButton")
//       ?.addEventListener("click", function () {
//         // Hide all other sections
//         if (document.getElementById("serviceContactMoreDetails")) {
//           document.getElementById("serviceContactMoreDetails").style.display =
//             "none";
//         }
//         if (document.getElementById("productServiceInfo")) {
//           document.getElementById("productServiceInfo").style.display = "none";
//         }
//         if (document.getElementById("productOptions")) {
//           document.getElementById("productOptions").style.display = "none";
//         }
//         if (document.getElementById("contactMoreDetails")) {
//           document.getElementById("contactMoreDetails").style.display = "none";
//         }
  
//         // Show Service Options
//         const serviceOptions = document.getElementById("serviceOptions");
//         if (serviceOptions) {
//           serviceOptions.style.display = "block";
//         }
//       });
  
//     // Back to Product/Service Options
//     document
//       .getElementById("backToProductServiceOptionsFromService")
//       ?.addEventListener("click", function () {
//         const serviceOptions = document.getElementById("serviceOptions");
//         const productServiceOptions = document.getElementById(
//           "productServiceOptions"
//         );
  
//         if (serviceOptions) {
//           serviceOptions.style.display = "none";
//         }
//         if (productServiceOptions) {
//           productServiceOptions.style.display = "block";
//         }
//       });
  
//     // Show Contact Information (WhatsApp and Call)
//     document
//       .getElementById("contactButton")
//       .addEventListener("click", function () {
//         document.getElementById("serviceContactInfo").style.display = "block";
//         document.getElementById("serviceMoreDetailsLinks").style.display = "none";
//       });
//   });
  
//   // Directly attach the click event handler to the "Go Back" link
//   const goBackLink = document.getElementById("goBackLink");
  
//   // Check if the element exists before adding an event listener
//   if (goBackLink) {
//     goBackLink.addEventListener("click", (event) => {
//       event.preventDefault(); // Prevent default link behavior
  
//       // Logic to toggle visibility or navigate back
//       const currentSection = document.getElementById("moreDetailsLinks");
//       const previousSection = document.getElementById("productServiceOptions");
  
//       if (currentSection && previousSection) {
//         currentSection.style.display = "none"; // Hide current section
//         previousSection.style.display = "block"; // Show the previous section
//       }
//     });
//   }
  
//   document.addEventListener("DOMContentLoaded", () => {
//     const registrationForm = document.getElementById("registrationForm");
//     const productOptions = document.getElementById("productOptions");
//     const serviceOptions = document.getElementById("serviceOptions");
  
//     // JavaScript to handle button click
//     document.getElementById("backButton").addEventListener("click", function () {
//       // Show the registration form
//       document.getElementById("registrationForm").style.display = "block";
  
//       // Hide other sections if necessary
//       // Example: document.getElementById('otherSection').style.display = 'none';
//     });
  
//     // Back button from Product Options
//     document
//       .getElementById("backToProductServiceOptionsFromProduct")
//       .addEventListener("click", function () {
//         document.getElementById("productOptions").style.display = "none";
//         document.getElementById("productServiceOptions").style.display = "block";
//       });
//   });
  






//   return (
//     <div className="chatbot">
//       {/* Chatbox Icon */}
//       <div className="chatbox__button">
//         <button id="chatboxIcon" onClick={toggleChatbox}>
//           <img 
//             src="https://img.icons8.com/ios-filled/50/000000/chat.png" 
//             alt="Chat Icon"
//           />
//         </button>
//       </div>

//       {/* Chatbox Support Window */}
//       {isChatboxOpen && (
//         <div className="chatbox__support" id="chatboxSupport">
//           <div className="chatbox__header">
//             <div className="chatbox__image--header">
//               <img 
//                 src="./AnD.png" 
//                 width="50px" 
//                 height="50px" 
//                 alt="Chat"
//               />
//             </div>
//             <div className="chatbox__content--header">
//               <h4 className="chatbox__heading--header"></h4>
//               <p className="chatbox__description--header">Hi! Please fill out the form below.</p>
//             </div>
//           </div>

//           <div className="chatbox__messages">
//             <div id="messages">
//               {/* Registration Form */}
//               {activeSection === 'registrationForm' && (
//                 <div id="registrationForm" className="container">
//                   <form id="registerForm" onSubmit={handleFormSubmit}>
//                     <div className="mb-2">
//                       <label htmlFor="name" className="form-label">Name</label>
//                       <input 
//                         type="text" 
//                         className="form-control form-control-sm" 
//                         id="name"
//                         placeholder="Enter your name" 
//                         required
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <label htmlFor="email" className="form-label">Email</label>
//                       <input 
//                         type="email" 
//                         className="form-control form-control-sm" 
//                         id="email"
//                         placeholder="Enter your email" 
//                         required
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <label htmlFor="phone" className="form-label">Phone</label>
//                       <input 
//                         type="text" 
//                         className="form-control form-control-sm" 
//                         id="phone"
//                         placeholder="Enter your phone number" 
//                         required 
//                       />
//                     </div>
//                     <button 
//                       type="submit" 
//                       className="btn btn-primary w-100 btn-sm"
//                     >
//                       Submit
//                     </button>
//                   </form>
//                 </div>
//               )}

//               {/* Product & Service Options */}
//               {activeSection === 'productServiceOptions' && (
//                 <div id="productServiceOptions" className="container">
//                   <p className="text-center">Thank you for registering. Please select an option:</p>
//                   <div className="options-container">
//                     <button 
//                       className="btn btn-secondary w-100 btn-sm" 
//                       onClick={() => setActiveSection('productOptions')}
//                     >
//                       Product
//                     </button>
//                     <button 
//                       className="btn btn-secondary w-100 btn-sm" 
//                       onClick={() => setActiveSection('serviceOptions')}
//                     >
//                       Service
//                     </button>
//                     <button 
//                       className="btn btn-secondary w-100 btn-sm" 
//                       onClick={() => setActiveSection('registrationForm')}
//                     >
//                       Back
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Product Options */}
//               {activeSection === 'productOptions' && (
//                 <div id="productOptions" className="container">
//                   <h5>Select a Product:</h5>
//                   {products.map((product, index) => (
//                     <div key={index} className="product-option mb-3">
//                       <button 
//                         className="btn btn-secondary w-100 btn-sm product-button"
//                         onClick={() => handleProductSelect(product.name)}
//                       >
//                         {product.name}
//                       </button>
//                     </div>
//                   ))}
//                   <button 
//                     className="btn btn-secondary w-100 btn-sm" 
//                     onClick={() => handleBack('productOptions')}
//                   >
//                     Back
//                   </button>
//                 </div>
//               )}

//               {/* Contact and More Details for Products */}
//               {activeSection === 'contactMoreDetails' && (
//                 <div id="contactMoreDetails" className="container">
//                   <h5>Options for <span>{selectedOption}</span></h5>
//                   <div className="options-container">
//                     <button 
//                       className="btn btn-secondary w-100 btn-sm" 
//                       onClick={() => setActiveSection('contactOptions')}
//                     >
//                       Contact
//                     </button>
//                     <a
//                       href={products.find(p => p.name === selectedOption)?.link || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="btn btn-secondary w-100 btn-sm"
//                     >
//                       More Details
//                     </a>
//                     <button 
//                       className="btn btn-secondary w-100 btn-sm" 
//                       onClick={() => handleBack('contactMoreDetails')}
//                     >
//                       Back
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Contact Options */}
//               {activeSection === 'contactOptions' && (
//                 <div id="contactOptions" className="container text-center">
//                   <h5>Contact Options:</h5>
//                   <div className="contact-icons">
//                     <a href="https://wa.me/1234567890?text=Hello" target="_blank" rel="noopener noreferrer">
//                       <img 
//                         src="whatsapp.png" 
//                         alt="WhatsApp"
//                         className="contact-icon"
//                       />
//                     </a>
//                     <a href="tel:+91-9997544981">
//                       <img 
//                         src="/call.png" 
//                         alt="Call" 
//                         className="contact-icon"
//                       />
//                     </a>
//                   </div>
//                   <button 
//                     className="btn btn-secondary w-100 btn-sm mt-3" 
//                     onClick={() => handleBack('contactOptions')}
//                   >
//                     Back
//                   </button>
//                 </div>
//               )}

//               {/* Service Options */}
//               {activeSection === 'serviceOptions' && (
//                 <div id="serviceOptions" className="container">
//                   <h5>Select a Service:</h5>
//                   <button 
//                     className="btn btn-secondary w-100 btn-sm"
//                     onClick={() => handleBack('serviceOptions')}
//                   >
//                     Back
//                   </button>
//                   {services.map((service, index) => (
//                     <div key={index} className="service-option">
//                       <button 
//                         className="btn btn-secondary w-100 btn-sm"
//                         onClick={() => handleServiceSelect(service.name)}
//                       >
//                         {service.name}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Contact and More Details for Services */}
//               {activeSection === 'serviceContactMoreDetails' && (
//                 <div id="serviceContactMoreDetails" className="container">
//                   <h5>Contact Options:</h5>
//                   <div className="contact-icons">
//                     <a href="https://wa.me/1234567890?text=Hello" target="_blank" rel="noopener noreferrer">
//                       <img 
//                         src="whatsapp.png" 
//                         alt="WhatsApp"
//                         className="contact-icon"
//                       />
//                     </a>
//                     <a href="tel:+91-9997544981">
//                       <img 
//                         src="/call.png" 
//                         alt="Call" 
//                         className="contact-icon"
//                       />
//                     </a>
//                   </div>

//                   <h5>For more details, visit the following links:</h5>
//                   <ul className="details-links">
//                     {services.map((service, index) => (
//                       <li key={index}>
//                         <a href={service.link} target="_blank" rel="noopener noreferrer">
//                           {service.name}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>

//                   <button 
//                     className="btn btn-secondary w-100 btn-sm" 
//                     onClick={() => handleBack('serviceContactMoreDetails')}
//                   >
//                     Back
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;













// import React, { useState } from 'react';
// import axios from 'axios';
// import '../ChatbotBox.css';
// const Chatbot = () => {
//   const [activeSection, setActiveSection] = useState('registrationForm');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isChatboxOpen, setIsChatboxOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState('');

//   const toggleChatbox = () => {
//     setIsChatboxOpen(!isChatboxOpen);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // const handleFormSubmit = async (event) => {
//   //   event.preventDefault();
//   //   setIsSubmitting(true);
//   //   setSubmitError('');
//   //   try {
//   //     const response = await axios.post('http://localhost:8000/chat-email', formData);
//   //     console.log('Form submitted successfully', response.data);
//   //     // Reset form or take further actions
//   //   } catch (error) {
//   //     console.error('Error submitting form:', error);
//   //     if (error.response) {
//   //       // Server responded with an error code
//   //       console.error('Error response:', error.response.data);
//   //       setSubmitError(error.response.data.message || 'An error occurred');
//   //     } else if (error.request) {
//   //       // No response received
//   //       console.error('No response from server:', error.request);
//   //       setSubmitError('Server did not respond');
//   //     } else {
//   //       // Error setting up the request
//   //       console.error('Request setup error:', error.message);
//   //       setSubmitError('Request setup error');
//   //     }
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   const handleFormSubmit = (e) => {
//         e.preventDefault();
//         setActiveSection('productServiceOptions');
//       };
    
//       const handleProductSelect = (product) => {
//         setSelectedOption(product);
//         setActiveSection('contactMoreDetails');
//       };
    
//       const handleServiceSelect = (service) => {
//         setSelectedOption(service);
//         setActiveSection('serviceContactMoreDetails');
//       };
    
//       const handleBack = (fromSection) => {
//         switch(fromSection) {
//           case 'productOptions':
//             setActiveSection('productServiceOptions');
//             break;
//           case 'serviceOptions':
//             setActiveSection('productServiceOptions');
//             break;
//           case 'contactMoreDetails':
//             setActiveSection('productOptions');
//             break;
//           case 'serviceContactMoreDetails':
//             setActiveSection('serviceOptions');
//             break;
//           case 'contactOptions':
//             setActiveSection('contactMoreDetails');
//             break;
//           default:
//             setActiveSection('registrationForm');
//         }
//       };
    
  
//   // const handleProductSelect = (product) => {
//   //   setSelectedOption(product);
//   //   setActiveSection('contactMoreDetails');
//   // };

//   // const handleServiceSelect = (service) => {
//   //   setSelectedOption(service);
//   //   setActiveSection('serviceContactMoreDetails');
//   // };

//   // const handleBack = (fromSection) => {
//   //   switch(fromSection) {
//   //     case 'productOptions':
//   //       setActiveSection('productServiceOptions');
//   //       break;
//   //     case 'serviceOptions':
//   //       setActiveSection('productServiceOptions');
//   //       break;
//   //     case 'contactMoreDetails':
//   //       setActiveSection('productOptions');
//   //       break;
//   //     case 'serviceContactMoreDetails':
//   //       setActiveSection('serviceOptions');
//   //       break;
//   //     case 'contactOptions':
//   //       setActiveSection('contactMoreDetails');
//   //       break;
//   //     default:
//   //       setActiveSection('registrationForm');
//   //   }
//   // };

//   const products = [
//     { name: 'Tally', link: 'https://andwebtech.com/content.php#' },
//     { name: 'EzyBill', link: 'https://andwebtech.com/content2.php' },
//     { name: 'Import BusyData', link: 'https://andwebtech.com/content2.php#' },
//     { name: 'Tally on Cloud', link: 'https://andwebtech.com/tally_on_cloud.php' },
//     { name: 'Tally on Mobile', link: 'https://andwebtech.com/tally_on_mobile.php' }
//   ];

//   const services = [
//     { name: 'Web Designing', link: 'https://andwebtech.com/content.php#' },
//     { name: 'Software Development', link: 'https://andwebtech.com/content2.php' },
//     { name: 'Android App Development', link: 'https://andwebtech.com/content2.php#' },
//     { name: 'Digital Marketing', link: 'https://andwebtech.com/tally_on_cloud.php' },
//     { name: 'SEO', link: 'https://andwebtech.com/tally_on_mobile.php' },
//     { name: 'E-Publishing', link: 'https://andwebtech.com/content3.php' },
//     { name: 'Digitization', link: 'https://andwebtech.com/content4.php' },
//     { name: 'Data Conversion', link: 'https://andwebtech.com/content5.php' }
//   ];

//   return (
//     <div className="chatbot">
//       {/* Chatbox Icon */}
//       <div className="chatbox__button">
//         <button id="chatboxIcon" onClick={toggleChatbox}>
//           <img 
//             src="https://img.icons8.com/ios-filled/50/000000/chat.png" 
//             alt="Chat Icon"
//           />
//         </button>
//       </div>

//       {/* Chatbox Support Window */}
//       {isChatboxOpen && (
//         <div className="chatbox__support" id="chatboxSupport">
//           <div className="chatbox__header">
//             <div className="chatbox__image--header">
//               <img 
//                 src="./AnD.png" 
//                 width="50px" 
//                 height="50px" 
//                 alt="Chat"
//               />
//             </div>
//             <div className="chatbox__content--header">
//               <h4 className="chatbox__heading--header"></h4>
//               <p className="chatbox__description--header">Hi! Please fill out the form below.</p>
//             </div>
//           </div>

//           <div className="chatbox__messages">
//             <div id="messages">
//               {/* Registration Form */}
//               {activeSection === 'registrationForm' && (
//                 <div id="registrationForm" className="container">
//                   <form id="registerForm" onSubmit={handleFormSubmit}>
//                     {submitError && <div className="error-message">{submitError}</div>}
//                     <div className="mb-2">
//                       <label htmlFor="name" className="form-label">Name</label>
//                       <input 
//                         type="text" 
//                         className="form-control form-control-sm" 
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Enter your name" 
//                         required
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <label htmlFor="email" className="form-label">Email</label>
//                       <input 
//                         type="email" 
//                         className="form-control form-control-sm" 
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="Enter your email" 
//                         required
//                       />
//                     </div>
//                     <div className="mb-2">
//                       <label htmlFor="phone" className="form-label">Phone</label>
//                       <input 
//                         type="text" 
//                         className="form-control form-control-sm" 
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder="Enter your phone number" 
//                         required 
//                       />
//                     </div>
//                     <button 
//                       type="submit" 
//                       className="btn btn-primary w-100 btn-sm"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? 'Submitting...' : 'Submit'}
//                     </button>
//                   </form>
//                 </div>
//               )}

//               {/* Product & Service Options */}
//               {activeSection === 'productServiceOptions' && (
//                 <div id="productServiceOptions" className="container">
//                   <p className="text-center">Thank you for registering. Please select an option:</p>
//                   <div className="options-container">
//                     <button 
//                       className="btn btn-secondary w-100 btn-sm" 
//                       onClick={() => setActiveSection('productOptions')}
//                     >
//                       Product
//                     </button>
//                     <button 
//                       className="btn btn-secondary w-100 btn-sm" 
//                       onClick={() => setActiveSection('serviceOptions')}
//                     >
//                       Service
//                     </button>
//                     <button 
//                       className="btn btn-secondary w-100 btn-sm" 
//                       onClick={() => setActiveSection('registrationForm')}
//                     >
//                       Back
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Product Options */}
//               {activeSection === 'productOptions' && (
//                 <div id="productOptions" className="container">
//                   <h5>Select a Product:</h5>
//                   {products.map((product, index) => (
//                     <div key={index} className="product-option mb-3">
//                       <button 
//                         className="btn btn-secondary w-100 btn-sm product-button"
//                         onClick={() => handleProductSelect(product.name)}
//                       >
//                         {product.name}
//                       </button>
//                     </div>
//                   ))}
//                   <button 
//                     className="btn btn-secondary w-100 btn-sm" 
//                     onClick={() => handleBack('productOptions')}
//                   >
//                     Back
//                   </button>
//                 </div>
//               )}

//               {/* Contact and More Details for Products */}
//               {activeSection === 'contactMoreDetails' && (
//                 <div id="contactMoreDetails" className="container">
//                   <h5>Options for <span>{selectedOption}</span></h5>
//                   <div className="options-container">
//                     <button 
//                       className="btn btn-secondary w-100 btn-sm" 
//                       onClick={() => setActiveSection('contactOptions')}
//                     >
//                       Contact
//                     </button>
//                     <a
//                       href={products.find(p => p.name === selectedOption)?.link || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="btn btn-secondary w-100 btn-sm"
//                     >
//                       More Details
//                     </a>
//                     <button 
//                       className="btn btn-secondary w-100 btn-sm" 
//                       onClick={() => handleBack('contactMoreDetails')}
//                     >
//                       Back
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Contact Options */}
//               {activeSection === 'contactOptions' && (
//                 <div id="contactOptions" className="container text-center">
//                   <h5>Contact Options:</h5>
//                   <div className="contact-icons">
//                     <a href="https://wa.me/919997544981?text=Hello" target="_blank" rel="noopener noreferrer">
//                       <img 
//                         src="whatsapp.png" 
//                         alt="WhatsApp"
//                         className="contact-icon"
//                       />
//                     </a>
//                     <a href="tel:+91-9997544981">
//                       <img 
//                         src="/call.png" 
//                         alt="Call" 
//                         className="contact-icon"
//                       />
//                     </a>
//                   </div>
//                   <button 
//                     className="btn btn-secondary w-100 btn-sm mt-3" 
//                     onClick={() => handleBack('contactOptions')}
//                   >
//                     Back
//                   </button>
//                 </div>
//               )}

//               {/* Service Options */}
//               {activeSection === 'serviceOptions' && (
//   <div id="serviceOptions" className="container">
//                   <h5>Select a Service:</h5>
//                   <button 
//                     className="btn btn-secondary w-100 btn-sm"
//                     onClick={() => handleBack('serviceOptions')}
//                   >
//                     Back
//                   </button>
//                   {services.map((service, index) => (
//                     <div key={index} className="service-option">
//                       <button 
//                         className="btn btn-secondary w-100 btn-sm"
//                         onClick={() => handleServiceSelect(service.name)}
//                       >
//                         {service.name}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Contact and More Details for Services */}
//               {activeSection === 'serviceContactMoreDetails' && (
//                 <div id="serviceContactMoreDetails" className="container">
//                   <h5>Contact Options:</h5>
//                   <div className="contact-icons">
//                     <a href="https://wa.me/919997544981?text=Hello" target="_blank" rel="noopener noreferrer">
//                       <img 
//                         src="whatsapp.png" 
//                         alt="WhatsApp"
//                         className="contact-icon"
//                       />
//                     </a>
//                     <a href="tel:+91-9997544981">
//                       <img 
//                         src="/call.png" 
//                         alt="Call" 
//                         className="contact-icon"
//                       />
//                     </a>
//                   </div>

//                   <h5>For more details, visit the following links:</h5>
//                   <ul className="details-links">
//                     {services.map((service, index) => (
//                       <li key={index}>
//                         <a href={service.link} target="_blank" rel="noopener noreferrer">
//                           {service.name}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>

//                   <button 
//                     className="btn btn-secondary w-100 btn-sm" 
//                     onClick={() => handleBack('serviceContactMoreDetails')}
//                   >
//                     Back
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;


