import React from 'react';

const SupportWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <button onClick={() => actionProvider.handleSupportDetails()}>
        Contact Support
      </button>
    </div>
  );
};

export default SupportWidget;