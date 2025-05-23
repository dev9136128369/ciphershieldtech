import React from 'react';

const ConsultancyWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <div className="menu-buttons">
        <button onClick={() => actionProvider.handleConsultancyOption('AI Automation')}>
          🔹 AI Automation & RPA
        </button>
        <button onClick={() => actionProvider.handleConsultancyOption('GST Tool')}>
          🔹 GST Invoice Extractor Tool
        </button>
        <button onClick={() => actionProvider.handleConsultancyOption('CRM Dashboard')}>
          🔹 CRM + Power BI Dashboard
        </button>
        <button onClick={() => actionProvider.handleConsultancyOption('Custom ERP')}>
          🔹 Custom ERP / Billing System
        </button>
        <button onClick={() => actionProvider.handleConsultancyOption('Cybersecurity')}>
          🔹 Cybersecurity Assessment
        </button>
        <button onClick={() => actionProvider.handleMainMenu()}>
          ↩️ Back to Main Menu
        </button>
      </div>
    </div>
  );
};

export default ConsultancyWidget;