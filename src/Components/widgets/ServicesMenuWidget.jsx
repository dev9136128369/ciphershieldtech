import React from 'react';

const ServicesMenuWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <div className="menu-buttons">
        <button onClick={() => actionProvider.handleEncryptionTools()}>
          <span>🔒</span> Encryption Tools
        </button>
        <button onClick={() => actionProvider.handleThreatDetection()}>
          <span>🛡️</span> Threat Detection
        </button>
        <button onClick={() => actionProvider.handleCloudSecurity()}>
          <span>☁️</span> Cloud Security
        </button>
        <button onClick={() => actionProvider.handleCompliance()}>
          <span>📜</span> Compliance Solutions
        </button>
        <button onClick={() => actionProvider.handleEnterprise()}>
          <span>💼</span> Enterprise Security
        </button>
      </div>
    </div>
  );
};

export default ServicesMenuWidget;