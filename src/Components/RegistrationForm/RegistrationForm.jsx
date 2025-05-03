// import React, { useState } from 'react';
// import './RegistrationForm.css';

// const RegistrationForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="registration-form">
//       <div className="form-group">
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>
      
//       <div className="form-group">
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </div>
      
//       <div className="form-group">
//         <label htmlFor="phone">Phone</label>
//         <input
//           type="text"
//           id="phone"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//       </div>
      
//       <button type="submit" className="submit-btn">Submit</button>
//     </form>
//   );
// };

// export default RegistrationForm;