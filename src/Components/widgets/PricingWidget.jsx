import React from 'react';

const PricingWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <div className="menu-buttons">
        <button onClick={() => actionProvider.handlePricingResponse('1')}>
          <span>1️⃣</span> Starter Plan
        </button>
        <button onClick={() => actionProvider.handlePricingResponse('2')}>
          <span>2️⃣</span> Business Plan
        </button>
        <button onClick={() => actionProvider.handlePricingResponse('3')}>
          <span>3️⃣</span> Enterprise Plan
        </button>
      </div>
    </div>
  );
};

export default PricingWidget;