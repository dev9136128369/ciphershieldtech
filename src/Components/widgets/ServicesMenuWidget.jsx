// import React from 'react';

// const ServicesMenuWidget = ({ actionProvider }) => {
//   return (
//     <div className="menu-options">
//       <div className="menu-buttons">
//         <button onClick={() => actionProvider.handleEncryptionTools()}>
//           <span>🔒</span> Encryption Tools
//         </button>
//         <button onClick={() => actionProvider.handleThreatDetection()}>
//           <span>🛡️</span> Threat Detection
//         </button>
//         <button onClick={() => actionProvider.handleCloudSecurity()}>
//           <span>☁️</span> Cloud Security
//         </button>
//         <button onClick={() => actionProvider.handleCompliance()}>
//           <span>📜</span> Compliance Solutions
//         </button>
//         <button onClick={() => actionProvider.handleEnterprise()}>
//           <span>💼</span> Enterprise Security
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ServicesMenuWidget;




// 23-05-25

import React from 'react';

const ServicesMenuWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <div className="menu-buttons">
        <button onClick={() => actionProvider.handleAIAutomation()}>
          <span>🧠</span> AI-Powered Automation
        </button>
        <button onClick={() => actionProvider.handleSoftwareDev()}>
          <span>💻</span> Custom Software Development
        </button>
        <button onClick={() => actionProvider.handleDataAnalytics()}>
          <span>📊</span> Data Analytics & BI
        </button>
        <button onClick={() => actionProvider.handleCRMIntegration()}>
          <span>💬</span> CRM & ERP Integration
        </button>
        <button onClick={() => actionProvider.handleBillingSoftware()}>
          <span>🧾</span> Billing & Accounting
        </button>
        <button onClick={() => actionProvider.handleCloudInfra()}>
          <span>☁️</span> Cloud Infrastructure
        </button>
        <button onClick={() => actionProvider.handleSEOMarketing()}>
          <span>🎯</span> SEO & Digital Marketing
        </button>
        <button onClick={() => actionProvider.handleCorporateTraining()}>
          <span>📚</span> Corporate Training
        </button>
        <button onClick={() => actionProvider.handleCybersecurity()}>
          <span>🔐</span> Cybersecurity
        </button>
        <button onClick={() => actionProvider.handleMainMenu()}>
          <span>↩️</span> Back to Main Menu
        </button>
      </div>
    </div>
  );
};

export default ServicesMenuWidget;