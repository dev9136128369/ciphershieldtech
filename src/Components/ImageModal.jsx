// import React from 'react';

// const ImageModal = ({ imageUrl, onClose }) => {
//   return (
//     <div className="image-modal-overlay" onClick={onClose}>
//       <div className="image-modal-content" onClick={e => e.stopPropagation()}>
//         <button className="close-modal-btn" onClick={onClose}>
//           &times;
//         </button>
//         <img 
//           src={imageUrl} 
//           alt="Full size preview" 
//           className="modal-image"
//         />
//       </div>
//     </div>
//   );
// };

// export default ImageModal;


// 24-05-25
import React from 'react';
// import './ImageModal.css';

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <img src={imageUrl} alt="Full size" className="modal-image" />
      </div>
    </div>
  );
};

export default ImageModal;