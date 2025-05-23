import React from 'react';

const MainMenuWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <div className="menu-buttons">
        <button onClick={() => actionProvider.handleServicesMenu()}>
          <span>1️⃣</span> Products & Services
        </button>
        <button onClick={() => actionProvider.handlePricing()}>
          <span>2️⃣</span> Pricing & Plans
        </button>
        <button onClick={() => actionProvider.handleSupport()}>
          <span>3️⃣</span> Technical Support
        </button>
        <button onClick={() => actionProvider.handleExpertConnect()}>
          <span>4️⃣</span> Speak to an Expert
        </button>
      </div>
    </div>
  );
};

export default MainMenuWidget;