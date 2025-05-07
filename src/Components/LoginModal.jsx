// import React, { useState, useContext } from 'react';
// import { AuthContext } from './AuthContext';
// import axios from 'axios';

// const LoginModal = ({ onClose, onLoginSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       let response;
      
//       if (isRegistering) {
//         response = await axios.post('http://localhost:8000/api/register', {
//           name,
//           email,
//           password
//         });
//       } else {
//         response = await axios.post('http://localhost:8000/api/login', {
//           email,
//           password
//         }, {
//           validateStatus: (status) => status < 500 // Important for error handling
//         });

//         if (response.status === 401) {
//           throw new Error('Invalid email or password');
//         }
//       }

//       // Call the success handler
//       onLoginSuccess(response.data);
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.error || err.message || 'Authentication failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
        
//         <h2>{isRegistering ? 'Create Account' : 'Login'}</h2>
        
//         {error && <div className="error-message">{error}</div>}
        
//         <form onSubmit={handleSubmit}>
//           {isRegistering && (
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//           )}
          
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength="6"
//             />
//           </div>
          
//           <button type="submit" disabled={isLoading} className="submit-btn">
//             {isLoading ? 'Processing...' : isRegistering ? 'Register' : 'Login'}
//           </button>
//         </form>
        
//         <div className="toggle-mode">
//           {isRegistering ? (
//             <p>
//               Already have an account?{' '}
//               <button onClick={() => setIsRegistering(false)} className="toggle-btn">
//                 Login
//               </button>
//             </p>
//           ) : (
//             <p>
//               Don't have an account?{' '}
//               <button onClick={() => setIsRegistering(true)} className="toggle-btn">
//                 Register
//               </button>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;

import React, { useState } from 'react';
import axios from 'axios';

const LoginModal = ({ show, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Make sure this matches your backend URL exactly
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }

      // CORRECTED ENDPOINT: /api/auth/register
      const response = await axios.post(`${apiBaseUrl}/api/auth/register`, {
        name,
        email: email.trim().toLowerCase(),
        password,
      });

      // Auto-login after successful registration
      await handleLogin(email, password);
      onClose();
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError('');

    try {
      // CORRECTED ENDPOINT: /api/auth/login
      const response = await axios.post(`${apiBaseUrl}/api/auth/login`, {
        email: email.trim().toLowerCase(),
        password,
      });

      // Pass both token and user data to parent component
      onLogin(response.data.token, response.data.user);
      onClose();
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await handleRegister(e);
      } else {
        await handleLogin(email, password);
      }
    } catch (err) {
      // Error already handled in individual functions
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="toggle-mode">
          {isRegistering ? 'Already have an account?' : 'Need an account?'}
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="toggle-btn"
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;