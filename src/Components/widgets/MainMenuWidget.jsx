// import React from 'react';

// const MainMenuWidget = ({ actionProvider }) => {
//   return (
//     <div className="menu-options">
//       <div className="menu-buttons">
//         <button onClick={() => actionProvider.handleServicesMenu()}>
//           <span>1️⃣</span> Products & Services
//         </button>
//         <button onClick={() => actionProvider.handlePricing()}>
//           <span>2️⃣</span> Pricing & Plans
//         </button>
//         <button onClick={() => actionProvider.handleSupport()}>
//           <span>3️⃣</span> Technical Support
//         </button>
//         <button onClick={() => actionProvider.handleExpertConnect()}>
//           <span>4️⃣</span> Speak to an Expert
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MainMenuWidget;



// 23-05-25
import React from 'react';

const MainMenuWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <div className="menu-buttons">
        <button onClick={() => actionProvider.handleServicesMenu()}>
          <span>1️⃣</span> View All Services
        </button>
        <button onClick={() => actionProvider.handleViewPortfolio()}>
          <span>2️⃣</span> View Portfolio
        </button>
        <button onClick={() => actionProvider.handleConsultancy()}>
          <span>3️⃣</span> Book a Free Consultancy
        </button>
        <button onClick={() => actionProvider.handleQuotation()}>
          <span>4️⃣</span> Get Quotation
        </button>
        <button onClick={() => actionProvider.handleExpertConnect()}>
          <span>5️⃣</span> Talk to Our Expert
        </button>
       
        <button onClick={() => actionProvider.handleSupport()}>
  <span>6️⃣</span> Raise a Support Request
</button>
      </div>
    </div>
  );
};

export default MainMenuWidget;