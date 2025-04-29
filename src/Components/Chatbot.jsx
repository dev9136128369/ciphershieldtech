// import React from 'react'

// const Chatbot = () => {
    
//   return (
//     <div>
//       <div class="chatbox">
//         {/* <!-- Chatbox Icon --> */}
//         <div class="chatbox__button">
//             <button id="chatboxIcon">
//                 <img src="https://img.icons8.com/ios-filled/50/000000/chat.png" alt="Chat Icon"/>
//             </button>
//         </div>

//         {/* <!-- Chatbox Support Window --> */}
//         <div class="chatbox__support" id="chatboxSupport" style={{display:'none'}}>
//             <div class="chatbox__header">
//                 <div class="chatbox__image--header">
//                     <img src="./AnD.png" width="50px" height="50px" style={{borderRadius:'50%'}} alt="Chat"/>
//                 </div>
//                 <div class="chatbox__content--header">
//                     <h4 class="chatbox__heading--header"> </h4>
//                     <p class="chatbox__description--header">Hi! Please fill out the form below.</p>
//                 </div>
//             </div>
//             <div class="chatbox__messages">
//                 <div id="messages">
//                     <div id="registrationForm" class="container">
//                         <form id="registerForm">
//                             <div class="mb-2">
//                                 <label for="name" class="form-label">Name</label>
//                                 <input type="text" class="form-control form-control-sm" id="name"
//                                     style={{ padding: '15px', color: 'black', backgroundColor: 'white', borderRadius: '500px' }}

//                                     placeholder="Enter your name" required/>
//                             </div>
//                             <div class="mb-2">
//                                 <label for="email" class="form-label">Email</label>
//                                 <input type="email" class="form-control form-control-sm" id="email"
//                                     style={{ padding: '15px', color: 'black', backgroundColor: 'white', borderRadius: '500px' }}

//                                     placeholder="Enter your email" required/>
//                             </div>
//                             <div class="mb-2">
//                                 <label for="phone" class="form-label">Phone</label>
//                                 <input type="text" class="form-control form-control-sm" id="phone"
//                                    style={{ padding: '15px', color: 'black', backgroundColor: 'white', borderRadius: '500px' }}

//                                     placeholder="Enter your phone number" required />
//                             </div>
//                             <button type="submit" class="btn btn-primary w-100 btn-sm"
//                                 // style="border-radius:500px; width:50%; margin-top: 20px;" 
//                                 style={{borderRadius:'500px', width:'50%', marginTop:'20px'}}
//                                 >Submit</button>
//                         </form>
//                     </div>

//                     {/* <!-- Product & Service Options (Initially Hidden) --> */}
//                     <div id="productServiceOptions" class="container" style="display: none;">
//                         <p class="text-center">Thank you for registering. Please select an option:</p>
//                         <div class="d-flex flex-column align-items-center" style="gap: 20px; margin-top: 20px;">
//                             <button class="btn btn-secondary w-100 btn-sm" id="productButton"
//                                 style="padding: 15px; color:black ;background-color:white ;border-radius:500px">Product</button>
//                             <button class="btn btn-secondary w-100 btn-sm" id="serviceButton"
//                                 style="padding: 15px; color:black; background-color:white ;border-radius:500px">Service</button>
//                             <button class="btn btn-secondary w-100 btn-sm" id="backButton"
//                                 style="padding: 15px; color:black; background-color:white ;border-radius:500px">Back</button>
//                         </div>
//                     </div>

//                     {/* <!-- Product Options (Initially Hidden) --> */}
//                     <div id="productOptions" class="container"
//                         style="display: none; max-height: 400px; overflow-y: auto;">
//                         <h5>Select a Product:</h5>

//                         {/* <!-- Product List --> */}
//                         <div class="product-option mb-3">
//                             <button class="btn btn-secondary w-100 btn-sm product-button"
//                                 style="padding: 10px; color:black; background-color:white; border-radius:500px"
//                                 data-product="Tally">
//                                 Tally
//                             </button>
//                         </div>
//                         <div class="product-option mb-3">
//                             <button class="btn btn-secondary w-100 btn-sm product-button"
//                                 style="padding: 10px; color:black; background-color:white; border-radius:500px"
//                                 data-product="EzyBill">
//                                 EzyBill
//                             </button>
//                         </div>
//                         <div class="product-option mb-3">
//                             <button class="btn btn-secondary w-100 btn-sm product-button"
//                                 style="padding: 10px; color:black; background-color:white; border-radius:500px"
//                                 data-product="Import Busy Data">
//                                 Import Busy Data
//                             </button>
//                         </div>
//                         <div class="product-option mb-3">
//                             <button class="btn btn-secondary w-100 btn-sm product-button"
//                                 style="padding: 10px; color:black; background-color:white; border-radius:500px"
//                                 data-product="Tally on Cloud">
//                                 Tally on Cloud
//                             </button>
//                         </div>
//                         <div class="product-option mb-3">
//                             <button class="btn btn-secondary w-100 btn-sm product-button"
//                                 style="padding: 10px; color:black; background-color:white; border-radius:500px"
//                                 data-product="Tally on Mobile">
//                                 Tally on Mobile
//                             </button>
//                         </div>

//                         {/* <!-- Back Button for Product --> */}
//                         <button class="btn btn-secondary w-100 btn-sm" id="backToProductServiceOptionsFromProduct"
//                             style="padding: 10px; background-color:white; color:black; border-radius:500px;">
//                             Back
//                         </button>
//                     </div>

//                     {/* <!-- Contact and More Details Modal (Initially Hidden) --> */}
//                     <div id="contactMoreDetails" class="container" style="display: none;">
//                         <h5 id="productOptionHeading">Options for <span id="selectedProductName"></span></h5>
//                         <div class="d-flex flex-column align-items-center" style="gap: 20px; margin-top: 20px;">
//                             {/* <!-- Contact Button --> */}
//                             <button class="btn btn-secondary w-100 btn-sm" id="contactButton"
//                                 style="padding: 15px; color:black; background-color:white; border-radius:500px">
//                                 Contact
//                             </button>
//                             {/* <!-- More Details Button --> */}
//                             <button class="btn btn-secondary w-100 btn-sm" id="moreDetailsButton"
//                                 style="padding: 15px; color:black; background-color:white; border-radius:500px">
//                                 More Details
//                             </button>
//                             {/* <!-- Back Button --> */}
//                             <button class="btn btn-secondary w-100 btn-sm" id="backoButton"
//                                 style="padding: 15px; background-color:white; color:black; border-radius:500px">
//                                 Back
//                             </button>
//                         </div>
//                     </div>

//                     {/* <!-- WhatsApp and Call Icons (Initially Hidden) --> */}
//                     <div id="contactOptions" class="container text-center" style="display: none; margin-top: 20px;">
//                         <h5>Contact Options:</h5>
//                         <div class="d-flex justify-content-center" style="gap: 20px;">
//                             {/* <!-- WhatsApp Icon --> */}
//                             <a href="https://wa.me/919997544981?text=Hello" target="_blank" id="whatsappIcon">
//                                 <img src="whatsapp.png" alt="WhatsApp"
//                                     style="width: 50px; height: 50px; cursor: pointer;"/>
//                             </a>
//                             {/* <!-- Call Icon --> */}
//                             <a href="tel:+91-9997544981" id="callIcon">
//                                 <img src="/call.png" alt="Call" style="width: 50px; height: 50px; cursor: pointer;"/>
//                             </a>
//                         </div>
//                         {/* <!-- Back Button --> */}
//                         <button class="btn btn-secondary w-100 btn-sm mt-3" id="backToOptionsButton" >
//                         </button>
//                     </div>

//                     {/* // <!-- Service Options (Initially Hidden) --> */}
//                     <div id="serviceOptions" class="container"
//                         style="display: none; max-height: 400px; overflow-y: auto;">
//                         <h5>Select a Service:</h5>
//                         <div>
//                             {/* <!-- Back Button for Service --> */}
//                             <button class="btn btn-secondary w-100 btn-sm" id="backToProductServiceOptionsFromService"
//                                 style="padding: 10px; background-color:white; color:black; border-radius:500px; margin-bottom: 20px;">Back</button>
//                         </div>
//                         <div class="service-option">
//                             <button class="btn btn-secondary w-100 btn-sm"
//                                 style="padding: 10px; color:black ;background-color:white ;border-radius:500px"
//                                 id="webDesigningButton">Web
//                                 Designing</button>
//                         </div>
//                         <div class="service-option">
//                             <button class="btn btn-secondary w-100 btn-sm"
//                                 style="padding: 10px; color:black ;background-color:white ;border-radius:500px"
//                                 id="softwareDevButton">Software
//                                 Development</button>
//                         </div>
//                         <div class="service-option">
//                             <button class="btn btn-secondary w-100 btn-sm"
//                                 style="padding: 10px; color:black ;background-color:white ;border-radius:500px"
//                                 id="androidDevButton">Android App
//                                 Development</button>
//                         </div>
//                         <div class="service-option">
//                             <button class="btn btn-secondary w-100 btn-sm"
//                                 style="padding: 10px; color:black ;background-color:white ;border-radius:500px"
//                                 id="digitalMarketingButton">Digital
//                                 Marketing</button>
//                         </div>
//                         <div class="service-option">
//                             <button class="btn btn-secondary w-100 btn-sm"
//                                 style="padding: 10px;color:black ;background-color:white ;border-radius:500px"
//                                 id="seoButton">SEO</button>
//                         </div>
//                         <div class="service-option">
//                             <button class="btn btn-secondary w-100 btn-sm"
//                                 style="padding: 10px; color:black ;background-color:white ;border-radius:500px"
//                                 id="ePublishingButton">E-Publishing</button>
//                         </div>
//                         <div class="service-option">
//                             <button class="btn btn-secondary w-100 btn-sm"
//                                 style="padding: 10px;color:black ;background-color:white ;border-radius:500px"
//                                 id="digitizationButton">Digitization</button>
//                         </div>
//                         <div class="service-option">
//                             <button class="btn btn-secondary w-100 btn-sm"
//                                 style="padding: 10px; color:black ;background-color:white ;border-radius:500px"
//                                 id="dataConversionButton">Data
//                                 Conversion</button>
//                         </div>
//                     </div>
//                     <div class="chatbox__footer">
//                     </div>
//                 </div>
//     </div>
//     </div>
//     </div>
//     </div>
//   )
// }

// export default Chatbot


import React, { useState } from 'react';


const Chatbot = () => {
  const [activeSection, setActiveSection] = useState('registrationForm');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setActiveSection('productServiceOptions');
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setActiveSection('contactMoreDetails');
  };

  const handleBack = (fromSection) => {
    if (fromSection === 'productOptions') {
      setActiveSection('productServiceOptions');
    } else if (fromSection === 'serviceOptions') {
      setActiveSection('productServiceOptions');
    } else if (fromSection === 'contactMoreDetails') {
      setActiveSection('productOptions');
    } else if (fromSection === 'contactOptions') {
      setActiveSection('contactMoreDetails');
    }
  };






document.addEventListener("DOMContentLoaded", () => {
  const contactMoreDetails = document.getElementById("contactMoreDetails");
  const chatboxSupport = document.getElementById("chatboxSupport");
  const contactButton = document.getElementById("contactButton");
  const contactOptions = document.getElementById("contactOptions");
  const backToOptionsButton = document.getElementById("backToOptionsButton");
  const selectedProductName = document.getElementById("selectedProductName");

  const chatboxIcon = document.getElementById("chatboxIcon");
  const productButton = document.getElementById("productButton");
  const serviceButton = document.getElementById("serviceButton");
  const backToRegistrationFromProduct = document.getElementById(
    "backToRegistrationFromProduct"
  );
  const productOptions = document.getElementById("productOptions");
  const serviceOptions = document.getElementById("serviceOptions");

  const productServiceInfo = document.getElementById("productServiceInfo");
  const productServiceTitle = document.getElementById("productServiceTitle");
  const productServiceDescription = document.getElementById(
    "productServiceDescription"
  );
  const tallyButton = document.getElementById("tallyButton");
  const ezyBillButton = document.getElementById("ezyBillButton");
  const busyDataButton = document.getElementById("busyDataButton");
  const tallyCloudButton = document.getElementById("tallyCloudButton");
  const tallyMobileButton = document.getElementById("tallyMobileButton");

  // Ensure that the elements are available before attaching event listeners
  if (contactButton) {
    contactButton.addEventListener("click", () => {
      contactOptions.style.display = "block";
    });
  }

  if (backToOptionsButton) {
    backToOptionsButton.addEventListener("click", () => {
      contactOptions.style.display = "none";
    });
  }

  // Attach Event Listeners to Redirect Buttons
  const buttons = [
    tallyButton,
    ezyBillButton,
    busyDataButton,
    tallyCloudButton,
    tallyMobileButton,
  ];
  buttons.forEach((button) => {
    if (button) {
      button.addEventListener("click", redirectToContactModal);
    }
  });

  const serviceButtons = [
    { id: "webDesigningButton", serviceName: "Web Designing" },
    { id: "softwareDevButton", serviceName: "Software Development" },
    { id: "androidDevButton", serviceName: "Android App Development" },
    { id: "digitalMarketingButton", serviceName: "Digital Marketing" },
    { id: "seoButton", serviceName: "SEO" },
    { id: "ePublishingButton", serviceName: "E-Publishing" },
    { id: "digitizationButton", serviceName: "Digitization" },
    { id: "dataConversionButton", serviceName: "Data Conversion" },
  ];

  // Add click event for each service button
  serviceButtons.forEach(({ id, serviceName }) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", () => {
        displayServiceDetails(serviceName);
      });
    }

    function displayServiceDetails(serviceName) {
      const contactMoreDetails = document.getElementById("contactMoreDetails");
      const serviceContactDetails = document.getElementById(
        "serviceContactMoreDetails"
      );
      const serviceOptions = document.getElementById("serviceOptions");
      const productServiceInfo = document.getElementById("productServiceInfo");
      const productServiceTitle = document.getElementById(
        "productServiceTitle"
      );
      const productServiceDescription = document.getElementById(
        "productServiceDescription"
      );

      // Ensure the passed serviceName is valid
      if (!serviceName) {
        console.error("Service name is not defined.");
        return;
      }

      // Hide service options and display details section
      if (serviceOptions) serviceOptions.style.display = "none";

      // Update the service title and description
      if (productServiceInfo) {
        productServiceInfo.style.display = "block";
        if (productServiceTitle) productServiceTitle.textContent = serviceName;
        if (productServiceDescription) {
          productServiceDescription.textContent = `Learn more about ${serviceName}. Connect with us for detailed information.`;
        }
      }

      // Show contact and more details sections
      if (contactMoreDetails) contactMoreDetails.style.display = "block";
      if (serviceContactDetails) serviceContactDetails.style.display = "block";
    }

    // Back button logic to go back to service options
    const backToServiceOptionsButton = document.getElementById(
      "backToServiceOptionsButton"
    );
    if (backToServiceOptionsButton) {
      backToServiceOptionsButton.addEventListener("click", () => {
        if (document.getElementById("serviceContactMoreDetails"))
          document.getElementById("serviceContactMoreDetails").style.display =
            "none";
        if (serviceOptions) serviceOptions.style.display = "block";
      });
    }
  });

  // Display Contact and More Details Modal
  function redirectToContactModal() {
    const contactMoreDetails = document.getElementById("contactMoreDetails");
    if (productOptions) {
      productOptions.style.display = "none";
    }
    if (contactMoreDetails) {
      contactMoreDetails.style.display = "block";
    }
  }

  // Toggle Chatbox Visibility
  if (chatboxIcon) {
    chatboxIcon.addEventListener("click", () => {
      const isHidden =
        chatboxSupport.style.display === "none" ||
        chatboxSupport.style.display === "";
      chatboxSupport.style.display = isHidden ? "block" : "none";
    });
  }

  // Handle form submission
  if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;

      // Send the form data to the backend using fetch
      fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Email sent successfully!");
            // Hide the registration form and show productServiceOptions
            document.getElementById("registrationForm").style.display = "none";
            document.getElementById("productServiceOptions").style.display =
              "block";
          } else {
            console.error("There was an error sending the email.");
            alert("There was an error sending the email. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an error sending the email. Please try again.");
        });
    });
  }

  // Function to handle "More Details" click
  function handleMoreDetailsClick(selectedName, type) {
    if (!selectedName || !type) {
      console.error("Invalid parameters: selectedName or type is missing.");
      return;
    }

    let redirectUrl = "#"; // Default URL

    if (type === "product") {
      switch (selectedName) {
        case "Tally":
          redirectUrl = "https://andwebtech.com/content.php#";
          break;
        case "EzyBill":
          redirectUrl = "https://andwebtech.com/content2.php";
          break;
        case "Import BusyData":
          redirectUrl = "https://andwebtech.com/content2.php#";
          break;
        case "Tally on Cloud":
          redirectUrl = "https://andwebtech.com/tally_on_cloud.php";
          break;
        case "Tally on Mobile":
          redirectUrl = "https://andwebtech.com/tally_on_mobile.php";
          break;
        default:
          console.warn(`Unknown product: ${selectedName}`);
      }
    } else if (type === "service") {
      switch (selectedName) {
        case "Web Designing":
          redirectUrl = "https://andwebtech.com/content.php#";
          break;
        case "Software Development":
          redirectUrl = "https://andwebtech.com/content2.php";
          break;
        case "Android App Development":
          redirectUrl = "https://andwebtech.com/content2.php#";
          break;
        case "Digital Marketing":
          redirectUrl = "https://andwebtech.com/tally_on_cloud.php";
          break;
        case "SEO":
          redirectUrl = "https://andwebtech.com/tally_on_mobile.php";
          break;
        case "E-Publishing":
          redirectUrl = "https://andwebtech.com/tally_on_cloud.php";
          break;
        case "Digitization":
          redirectUrl = "https://andwebtech.com/tally_on_mobile.php";
          break;
        case "Data Conversion":
          redirectUrl = "https://andwebtech.com/tally_on_cloud.php";
          break;
        default:
          console.warn(`Unknown service: ${selectedName}`);
      }
    }

    if (redirectUrl === "#") {
      console.error("Failed to resolve redirect URL for:", selectedName);
    } else {
      window.open(redirectUrl, "_blank");
    }
  }

  // Add event listeners for product buttons
  document.querySelectorAll(".product-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.getAttribute("data-product");
      selectedProductName.textContent = productName;

      // Show the contact and more details section
      productOptions.style.display = "none";
      contactMoreDetails.style.display = "block";

      // Set data type for "More Details" button
      document
        .getElementById("moreDetailsButton")
        .setAttribute("data-type", "product");
    });
  });

  // Add event listeners for product buttons
  document.querySelectorAll(".service-button").forEach((button) => {
    button.addEventListener("click", () => {
      const serviceName = button.getAttribute("data-product");
      selectedProductName.textContent = serviceName;

      // Show the contact and more details section
      productOptions.style.display = "none";
      contactMoreDetails.style.display = "block";

      // Set data type for "More Details" button
      document
        .getElementById("moreDetailsButton")
        .setAttribute("data-type", "product");
    });
  });

  // Debugging inside "More Details" click handler
  document.getElementById("moreDetailsButton").addEventListener("click", () => {
    const selectedName = selectedProductName.textContent;
    const type = document
      .getElementById("moreDetailsButton")
      .getAttribute("data-type");

    console.log("More Details Button Clicked");
    console.log("Selected Name:", selectedName);
    console.log("Type:", type);

    // Call the handler with the selected name and type
    handleMoreDetailsClick(selectedName, type);
  });

  // Back button logic
  document.getElementById("backoButton").addEventListener("click", () => {
    contactMoreDetails.style.display = "none";
    productOptions.style.display = "block";
  });

  // Handle Product Button Click
  productButton?.addEventListener("click", () => {
    document.getElementById("productServiceOptions").style.display = "none";
    productOptions.style.display = "block";
  });

  // Handle Service Button Click
  serviceButton?.addEventListener("click", () => {
    document.getElementById("productServiceOptions").style.display = "none";
    serviceOptions.style.display = "block";
  });

  // Back Button Click for Product Options
  backToRegistrationFromProduct?.addEventListener("click", () => {
    if (productOptions) productOptions.style.display = "none";
    if (serviceOptions) serviceOptions.style.display = "none";
    if (productServiceInfo) productServiceInfo.style.display = "none";
    const productServiceOptions = document.getElementById(
      "productServiceOptions"
    );
    if (productServiceOptions) productServiceOptions.style.display = "block";
  });

  // Display Info when Product/Service Button is Clicked
  function displayProductServiceInfo(title, description) {
    if (
      productServiceTitle &&
      productServiceDescription &&
      productServiceInfo
    ) {
      productServiceTitle.textContent = title;
      productServiceDescription.textContent = description;
      productServiceInfo.style.display = "block";
    }
  }

  document.getElementById("tallyButton")?.addEventListener("click", () => {
    displayProductServiceInfo(
      "Tally",
      "Tally is a popular accounting software for businesses."
    );
  });

  document.getElementById("ezyBillButton")?.addEventListener("click", () => {
    displayProductServiceInfo(
      "EzyBill",
      "EzyBill is a cloud-based invoicing solution."
    );
  });

  document.getElementById("busyDataButton")?.addEventListener("click", () => {
    displayProductServiceInfo(
      "Import BusyData",
      "Import your Busy accounting data into new software."
    );
  });

  document.getElementById("tallyCloudButton")?.addEventListener("click", () => {
    displayProductServiceInfo(
      "Tally on Cloud",
      "Tally available on cloud for easy access."
    );
  });

  document
    .getElementById("tallyMobileButton")
    ?.addEventListener("click", () => {
      displayProductServiceInfo(
        "Tally on Mobile",
        "Access Tally on mobile devices for greater flexibility."
      );
    });

  // Back to Service Options from Contact/More Details
  document
    .getElementById("backToServiceOptionsButton")
    ?.addEventListener("click", function () {
      // Hide all other sections
      if (document.getElementById("serviceContactMoreDetails")) {
        document.getElementById("serviceContactMoreDetails").style.display =
          "none";
      }
      if (document.getElementById("productServiceInfo")) {
        document.getElementById("productServiceInfo").style.display = "none";
      }
      if (document.getElementById("productOptions")) {
        document.getElementById("productOptions").style.display = "none";
      }
      if (document.getElementById("contactMoreDetails")) {
        document.getElementById("contactMoreDetails").style.display = "none";
      }

      // Show Service Options
      const serviceOptions = document.getElementById("serviceOptions");
      if (serviceOptions) {
        serviceOptions.style.display = "block";
      }
    });

  // Back to Product/Service Options
  document
    .getElementById("backToProductServiceOptionsFromService")
    ?.addEventListener("click", function () {
      const serviceOptions = document.getElementById("serviceOptions");
      const productServiceOptions = document.getElementById(
        "productServiceOptions"
      );

      if (serviceOptions) {
        serviceOptions.style.display = "none";
      }
      if (productServiceOptions) {
        productServiceOptions.style.display = "block";
      }
    });

  // Show Contact Information (WhatsApp and Call)
  document
    .getElementById("contactButton")
    .addEventListener("click", function () {
      document.getElementById("serviceContactInfo").style.display = "block";
      document.getElementById("serviceMoreDetailsLinks").style.display = "none";
    });
});

// Directly attach the click event handler to the "Go Back" link
const goBackLink = document.getElementById("goBackLink");

// Check if the element exists before adding an event listener
if (goBackLink) {
  goBackLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior

    // Logic to toggle visibility or navigate back
    const currentSection = document.getElementById("moreDetailsLinks");
    const previousSection = document.getElementById("productServiceOptions");

    if (currentSection && previousSection) {
      currentSection.style.display = "none"; // Hide current section
      previousSection.style.display = "block"; // Show the previous section
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registrationForm");
  const productOptions = document.getElementById("productOptions");
  const serviceOptions = document.getElementById("serviceOptions");

  // JavaScript to handle button click
  document.getElementById("backButton").addEventListener("click", function () {
    // Show the registration form
    document.getElementById("registrationForm").style.display = "block";

    // Hide other sections if necessary
    // Example: document.getElementById('otherSection').style.display = 'none';
  });

  // Back button from Product Options
  document
    .getElementById("backToProductServiceOptionsFromProduct")
    .addEventListener("click", function () {
      document.getElementById("productOptions").style.display = "none";
      document.getElementById("productServiceOptions").style.display = "block";
    });
});






  return (
    <div className="chatbot-container">
      {/* Chatbox Icon */}
      <div className="chatbox__button">
        <button id="chatboxIcon" onClick={toggleChatbox}>
          <img 
            src="https://img.icons8.com/ios-filled/50/000000/chat.png" 
            alt="Chat Icon"
          />
        </button>
      </div>

      {/* Chatbox Support Window */}
      {isChatboxOpen && (
        <div className="chatbox__support" id="chatboxSupport">
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img 
                src="./AnD.png" 
                width="50px" 
                height="50px" 
                alt="Chat"
              />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header"></h4>
              <p className="chatbox__description--header">Hi! Please fill out the form below.</p>
            </div>
          </div>

          <div className="chatbox__messages">
            <div id="messages">
              {/* Registration Form */}
              {activeSection === 'registrationForm' && (
                <div id="registrationForm" className="container">
                  <form id="registerForm" onSubmit={handleFormSubmit}>
                    <div className="mb-2">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        id="name"
                        placeholder="Enter your name" 
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control form-control-sm" 
                        id="email"
                        placeholder="Enter your email" 
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        id="phone"
                        placeholder="Enter your phone number" 
                        required 
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary w-100 btn-sm"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}

              {/* Product & Service Options */}
              {activeSection === 'productServiceOptions' && (
                <div id="productServiceOptions" className="container">
                  <p className="text-center">Thank you for registering. Please select an option:</p>
                  <div className="options-container">
                    <button 
                      className="btn btn-secondary w-100 btn-sm" 
                      onClick={() => setActiveSection('productOptions')}
                    >
                      Product
                    </button>
                    <button 
                      className="btn btn-secondary w-100 btn-sm" 
                      onClick={() => setActiveSection('serviceOptions')}
                    >
                      Service
                    </button>
                    <button 
                      className="btn btn-secondary w-100 btn-sm" 
                      onClick={() => setActiveSection('registrationForm')}
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* Product Options */}
              {activeSection === 'productOptions' && (
                <div id="productOptions" className="container">
                  <h5>Select a Product:</h5>
                  <div className="product-option mb-3">
                    <button 
                      className="btn btn-secondary w-100 btn-sm product-button"
                      onClick={() => handleProductSelect('Tally')}
                    >
                      Tally
                    </button>
                  </div>
                  <div className="product-option mb-3">
                    <button 
                      className="btn btn-secondary w-100 btn-sm product-button"
                      onClick={() => handleProductSelect('EzyBill')}
                    >
                      EzyBill
                    </button>
                  </div>
                  <div className="product-option mb-3">
                    <button 
                      className="btn btn-secondary w-100 btn-sm product-button"
                      onClick={() => handleProductSelect('Import Busy Data')}
                    >
                      Import Busy Data
                    </button>
                  </div>
                  <div className="product-option mb-3">
                    <button 
                      className="btn btn-secondary w-100 btn-sm product-button"
                      onClick={() => handleProductSelect('Tally on Cloud')}
                    >
                      Tally on Cloud
                    </button>
                  </div>
                  <div className="product-option mb-3">
                    <button 
                      className="btn btn-secondary w-100 btn-sm product-button"
                      onClick={() => handleProductSelect('Tally on Mobile')}
                    >
                      Tally on Mobile
                    </button>
                  </div>
                  <button 
                    className="btn btn-secondary w-100 btn-sm" 
                    onClick={() => handleBack('productOptions')}
                  >
                    Back
                  </button>
                </div>
              )}

              {/* Contact and More Details */}
              {activeSection === 'contactMoreDetails' && (
                <div id="contactMoreDetails" className="container">
                  <h5>Options for <span>{selectedProduct}</span></h5>
                  <div className="options-container">
                    <button 
                      className="btn btn-secondary w-100 btn-sm" 
                      onClick={() => setActiveSection('contactOptions')}
                    >
                      Contact
                    </button>
                    <button 
                      className="btn btn-secondary w-100 btn-sm"
                    >
                      More Details
                    </button>
                    <button 
                      className="btn btn-secondary w-100 btn-sm" 
                      onClick={() => handleBack('contactMoreDetails')}
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* Contact Options */}
              {activeSection === 'contactOptions' && (
                <div id="contactOptions" className="container text-center">
                  <h5>Contact Options:</h5>
                  <div className="contact-icons">
                    <a href="https://wa.me/919997544981?text=Hello" target="_blank" rel="noreferrer">
                      <img 
                        src="whatsapp.png" 
                        alt="WhatsApp"
                        className="contact-icon"
                      />
                    </a>
                    <a href="tel:+91-9997544981">
                      <img 
                        src="/call.png" 
                        alt="Call" 
                        className="contact-icon"
                      />
                    </a>
                  </div>
                  <button 
                    className="btn btn-secondary w-100 btn-sm mt-3" 
                    onClick={() => handleBack('contactOptions')}
                  >
                    Back
                  </button>
                </div>
              )}

              {/* Service Options */}
              {activeSection === 'serviceOptions' && (
                <div id="serviceOptions" className="container">
                  <h5>Select a Service:</h5>
                  <button 
                    className="btn btn-secondary w-100 btn-sm"
                    onClick={() => handleBack('serviceOptions')}
                  >
                    Back
                  </button>
                  <div className="service-option">
                    <button className="btn btn-secondary w-100 btn-sm">
                      Web Designing
                    </button>
                  </div>
                  <div className="service-option">
                    <button className="btn btn-secondary w-100 btn-sm">
                      Software Development
                    </button>
                  </div>
                  <div className="service-option">
                    <button className="btn btn-secondary w-100 btn-sm">
                      Android App Development
                    </button>
                  </div>
                  <div className="service-option">
                    <button className="btn btn-secondary w-100 btn-sm">
                      Digital Marketing
                    </button>
                  </div>
                  <div className="service-option">
                    <button className="btn btn-secondary w-100 btn-sm">
                      SEO
                    </button>
                  </div>
                  <div className="service-option">
                    <button className="btn btn-secondary w-100 btn-sm">
                      E-Publishing
                    </button>
                  </div>
                  <div className="service-option">
                    <button className="btn btn-secondary w-100 btn-sm">
                      Digitization
                    </button>
                  </div>
                  <div className="service-option">
                    <button className="btn btn-secondary w-100 btn-sm">
                      Data Conversion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
