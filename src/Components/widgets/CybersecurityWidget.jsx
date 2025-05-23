import React from 'react';

const CybersecurityWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <button onClick={() => actionProvider.handleConfirmation('yes')}>
        ✅ Yes, need vulnerability scan
      </button>
      <button onClick={() => actionProvider.handleServicesMenu()}>
        ↩️ Back to Services
      </button>
    </div>
  );
};

export default CybersecurityWidget;