import React from 'react';

const ExpertWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <button onClick={() => actionProvider.handleExpertConnect()}>
        Connect with Expert
      </button>
    </div>
  );
};

export default ExpertWidget;
