// import React from 'react';
// import './ProductOptions.css';

// const products = [
//   { id: 1, name: 'Tally' },
//   { id: 2, name: 'EzyBill' },
//   { id: 3, name: 'Import Busy Data' },
//   { id: 4, name: 'Tally on Cloud' },
//   { id: 5, name: 'Tally on Mobile' }
// ];

// const ProductOptions = ({ onSelectProduct, onBack }) => {
//   return (
//     <div className="product-options">
//       <h5>Select a Product:</h5>
      
//       {products.map(product => (
//         <button 
//           key={product.id}
//           className="product-btn"
//           onClick={() => onSelectProduct(product)}
//         >
//           {product.name}
//         </button>
//       ))}
      
//       <button className="back-btn" onClick={onBack}>Back</button>
//     </div>
//   );
// };

// export default ProductOptions;