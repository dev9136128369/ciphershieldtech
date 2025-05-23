import React from 'react';

const AIAutomationWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <button onClick={() => actionProvider.handleConfirmation('yes')}>
        ✅ Yes, I want a free audit
      </button>
      <button onClick={() => actionProvider.handleServicesMenu()}>
        ↩️ Back to Services
      </button>
    </div>
  );
};

export default AIAutomationWidget;