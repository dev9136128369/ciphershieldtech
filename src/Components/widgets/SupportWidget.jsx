// import React from 'react';

// const SupportWidget = ({ actionProvider }) => {
//   return (
//     <div className="menu-options">
//       <button onClick={() => actionProvider.handleSupportDetails()}>
//         Contact Support
//       </button>
//     </div>
//   );
// };

// export default SupportWidget;


// 23-05-25
import React from 'react';

const ExpertWidget = ({ actionProvider }) => {
  return (
    <div className="menu-options">
      <button 
        onClick={() => actionProvider.handleConfirmation('yes')}
        className="confirmation-button"
      >
        ✅ Confirm Details
      </button>
      <button 
        onClick={() => actionProvider.handleMainMenu()}
        className="cancel-button"
      >
        ❌ Cancel
      </button>
    </div>
  );
};

export default ExpertWidget;