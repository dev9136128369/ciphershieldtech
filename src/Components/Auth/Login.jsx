// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// const Login = ({ setIsLoggedIn, setCurrentUser }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newEmail, setNewEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [modalError, setModalError] = useState('');
//   const [modalSuccess, setModalSuccess] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!email || !password) {
//       setError('Both email and password are required');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/api/auth/login', {
//         email,
//         password
//       });
      
//       console.log('Full response:', response);
//       console.log('User object:', response.data.user);
      
//       if (response.data.success) {
//         setIsLoggedIn(true);
//         setCurrentUser(response.data.user);
        
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        
//         const userRole = response.data.user.role?.toString().trim().toLowerCase();
//         console.log('User role:', userRole);
        
//         if (userRole === 'admin') {
//           console.log("Admin detected - showing modal");
//           setShowAddModal(true);
//         } else {
//           console.log("Non-admin - redirecting to dashboard");
//           const from = location.state?.from || '/dashboard';
//           navigate(from, { replace: true });
//         }
//       } else {
//         setError(response.data.message || 'Authentication failed');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddCredentials = async (e) => {
//     e.preventDefault();
//     setModalError('');
//     setModalSuccess('');

//     if (!newEmail || !newPassword) {
//       setModalError('Both email and password are required');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:8000/api/auth/add-test-login',
//         { 
//           email: newEmail, 
//           password: newPassword,
//           role: 'manager' // Always set role to 'manager'
//         },
//       );

//       if (response.data.success) {
//         setModalSuccess('Manager credentials added successfully!');
//         setNewEmail('');
//         setNewPassword('');
//         setTimeout(() => {
//           setShowAddModal(false);
//           const from = location.state?.from || '/dashboard';
//           navigate(from, { replace: true });
//         }, 1500);
//       } else {
//         setModalError(response.data.message || 'Failed to add credentials');
//       }
//     } catch (err) {
//       console.error('Add credentials error:', err);
//       setModalError(err.response?.data?.message || 'Failed to add credentials. Please try again.');
//     }
//   };

//   const closeModal = () => {
//     setShowAddModal(false);
//     const from = location.state?.from || '/dashboard';
//     navigate(from, { replace: true });
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#f5f5f5'
//     }}>
//       <div style={{
//         width: '100%',
//         maxWidth: '400px',
//         padding: '2rem',
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//       }}>
//         <h2 style={{
//           textAlign: 'center',
//           marginBottom: '1.5rem',
//           color: '#333'
//         }}>Login to Dashboard</h2>
        
//         {error && (
//           <div style={{
//             padding: '0.75rem',
//             marginBottom: '1rem',
//             backgroundColor: '#ffebee',
//             color: '#d32f2f',
//             borderRadius: '4px',
//             border: '1px solid #ef9a9a'
//           }}>
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '1rem' }}>
//             <label htmlFor="email" style={{
//               display: 'block',
//               marginBottom: '0.5rem',
//               fontWeight: '500',
//               color: '#333'
//             }}>Email</label>
//             <input
//               type="email"
//               style={{
//                 width: '100%',
//                 padding: '0.75rem',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 fontSize: '1rem'
//               }}
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
          
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label htmlFor="password" style={{
//               display: 'block',
//               marginBottom: '0.5rem',
//               fontWeight: '500',
//               color: '#333'
//             }}>Password</label>
//             <input
//               type="password"
//               style={{
//                 width: '100%',
//                 padding: '0.75rem',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 fontSize: '1rem'
//               }}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
          
//           <button 
//             type="submit" 
//             style={{
//               width: '100%',
//               padding: '0.75rem',
//               backgroundColor: '#1976d2',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               fontSize: '1rem',
//               fontWeight: '500',
//               cursor: 'pointer',
//               transition: 'background-color 0.3s',
//               ':hover': {
//                 backgroundColor: '#1565c0'
//               }
//             }}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>

//       {/* Add Credentials Modal */}
//       <Modal
//         isOpen={showAddModal}
//         onRequestClose={closeModal}
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             maxWidth: '500px',
//             width: '90%',
//             borderRadius: '8px',
//             padding: '2rem'
//           },
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.5)'
//           }
//         }}
//       >
//         <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Add Manager Credentials</h2>
        
//         {modalError && (
//           <div style={{
//             padding: '0.75rem',
//             marginBottom: '1rem',
//             backgroundColor: '#ffebee',
//             color: '#d32f2f',
//             borderRadius: '4px',
//             border: '1px solid #ef9a9a'
//           }}>
//             {modalError}
//           </div>
//         )}
        
//         {modalSuccess && (
//           <div style={{
//             padding: '0.75rem',
//             marginBottom: '1rem',
//             backgroundColor: '#e8f5e9',
//             color: '#2e7d32',
//             borderRadius: '4px',
//             border: '1px solid #a5d6a7'
//           }}>
//             {modalSuccess}
//           </div>
//         )}
        
//         <form onSubmit={handleAddCredentials}>
//           <div style={{ marginBottom: '1rem' }}>
//             <label htmlFor="newEmail" style={{
//               display: 'block',
//               marginBottom: '0.5rem',
//               fontWeight: '500',
//               color: '#333'
//             }}>Email</label>
//             <input
//               type="email"
//               style={{
//                 width: '100%',
//                 padding: '0.75rem',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 fontSize: '1rem'
//               }}
//               id="newEmail"
//               value={newEmail}
//               onChange={(e) => setNewEmail(e.target.value)}
//               required
//             />
//           </div>
          
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label htmlFor="newPassword" style={{
//               display: 'block',
//               marginBottom: '0.5rem',
//               fontWeight: '500',
//               color: '#333'
//             }}>Password</label>
//             <input
//               type="password"
//               style={{
//                 width: '100%',
//                 padding: '0.75rem',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 fontSize: '1rem'
//               }}
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//           </div>
          
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label style={{
//               display: 'block',
//               marginBottom: '0.5rem',
//               fontWeight: '500',
//               color: '#333'
//             }}>Role</label>
//             <div style={{
//               padding: '0.75rem',
//               backgroundColor: '#f5f5f5',
//               borderRadius: '4px',
//               border: '1px solid #ddd'
//             }}>
//               manager (auto-assigned)
//             </div>
//           </div>
          
//           <div style={{ display: 'flex', gap: '1rem' }}>
//             <button 
//               type="submit" 
//               style={{
//                 flex: 1,
//                 padding: '0.75rem',
//                 backgroundColor: '#4caf50',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontSize: '1rem',
//                 fontWeight: '500',
//                 cursor: 'pointer'
//               }}
//             >
//               Add Manager
//             </button>
            
//             <button 
//               type="button" 
//               onClick={closeModal}
//               style={{
//                 flex: 1,
//                 padding: '0.75rem',
//                 backgroundColor: '#f5f5f5',
//                 color: '#333',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 fontSize: '1rem',
//                 fontWeight: '500',
//                 cursor: 'pointer'
//               }}
//             >
//               Skip
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default Login;






















































// // import React, { useState } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import axios from 'axios';
// // import Modal from 'react-modal';

// // Modal.setAppElement('#root');

// // const Login = ({ setIsLoggedIn, setCurrentUser }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [newEmail, setNewEmail] = useState('');
// //   const [newPassword, setNewPassword] = useState('');
// //   const [modalError, setModalError] = useState('');
// //   const [modalSuccess, setModalSuccess] = useState('');
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   setError('');
// //   setIsLoading(true);

// //   if (!email || !password) {
// //     setError('Both email and password are required');
// //     setIsLoading(false);
// //     return;
// //   }

// //   try {
// //     const response = await axios.post('http://localhost:8000/api/auth/login', {
// //       email,
// //       password
// //     });
    
// //     console.log('Full response:', response); 
// //     console.log('User object:', response.data.user); 
    
// //     if (response.data.success) {
// //       setIsLoggedIn(true);
// //       setCurrentUser(response.data.user);
      
// //       localStorage.setItem('token', response.data.token);
// //       localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      
// //       // Enhanced role check
// //       const userRole = response.data.user.role?.toString().trim().toLowerCase();
// //       console.log('User role:', userRole); // Debug role value
      
// //       if (userRole === 'admin') {
// //         console.log("Admin detected - showing modal");
// //         setShowAddModal(true);
// //       } else {
// //         console.log("Non-admin - redirecting to dashboard");
// //         const from = location.state?.from || '/dashboard';
// //         navigate(from, { replace: true });
// //       }
// //     } else {
// //       setError(response.data.message || 'Authentication failed');
// //     }
// //   } catch (err) {
// //     console.error('Login error:', err);
// //     setError(err.response?.data?.message || 'Login failed. Please try again.');
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };
// //   const handleAddCredentials = async (e) => {
// //     e.preventDefault();
// //     setModalError('');
// //     setModalSuccess('');

// //     if (!newEmail || !newPassword) {
// //       setModalError('Both email and password are required');
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         'http://localhost:8000/api/auth/add-test-login',
// //         { email: newEmail, password: newPassword },
// //       );

// //       if (response.data.success) {
// //         setModalSuccess('Credentials added successfully!');
// //         setNewEmail('');
// //         setNewPassword('');
// //         setTimeout(() => {
// //           setShowAddModal(false);
// //           const from = location.state?.from || '/dashboard';
// //           navigate(from, { replace: true });
// //         }, 1500);
// //       } else {
// //         setModalError(response.data.message || 'Failed to add credentials');
// //       }
// //     } catch (err) {
// //       console.error('Add credentials error:', err);
// //       setModalError(err.response?.data?.message || 'Failed to add credentials. Please try again.');
// //     }
// //   };

// //   const closeModal = () => {
// //     setShowAddModal(false);
// //     const from = location.state?.from || '/dashboard';
// //     navigate(from, { replace: true });
// //   };
// //   return (
// //     <div style={{
// //       display: 'flex',
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //       minHeight: '100vh',
// //       backgroundColor: '#f5f5f5'
// //     }}>
// //       <div style={{
// //         width: '100%',
// //         maxWidth: '400px',
// //         padding: '2rem',
// //         backgroundColor: 'white',
// //         borderRadius: '8px',
// //         boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
// //       }}>
// //         <h2 style={{
// //           textAlign: 'center',
// //           marginBottom: '1.5rem',
// //           color: '#333'
// //         }}>Login to Dashboard</h2>
        
// //         {error && (
// //           <div style={{
// //             padding: '0.75rem',
// //             marginBottom: '1rem',
// //             backgroundColor: '#ffebee',
// //             color: '#d32f2f',
// //             borderRadius: '4px',
// //             border: '1px solid #ef9a9a'
// //           }}>
// //             {error}
// //           </div>
// //         )}
        
// //         <form onSubmit={handleSubmit}>
// //           <div style={{ marginBottom: '1rem' }}>
// //             <label htmlFor="email" style={{
// //               display: 'block',
// //               marginBottom: '0.5rem',
// //               fontWeight: '500',
// //               color: '#333'
// //             }}>Email</label>
// //             <input
// //               type="email"
// //               style={{
// //                 width: '100%',
// //                 padding: '0.75rem',
// //                 border: '1px solid #ddd',
// //                 borderRadius: '4px',
// //                 fontSize: '1rem'
// //               }}
// //               id="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //           </div>
          
// //           <div style={{ marginBottom: '1.5rem' }}>
// //             <label htmlFor="password" style={{
// //               display: 'block',
// //               marginBottom: '0.5rem',
// //               fontWeight: '500',
// //               color: '#333'
// //             }}>Password</label>
// //             <input
// //               type="password"
// //               style={{
// //                 width: '100%',
// //                 padding: '0.75rem',
// //                 border: '1px solid #ddd',
// //                 borderRadius: '4px',
// //                 fontSize: '1rem'
// //               }}
// //               id="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //           </div>
          
// //           <button 
// //             type="submit" 
// //             style={{
// //               width: '100%',
// //               padding: '0.75rem',
// //               backgroundColor: '#1976d2',
// //               color: 'white',
// //               border: 'none',
// //               borderRadius: '4px',
// //               fontSize: '1rem',
// //               fontWeight: '500',
// //               cursor: 'pointer',
// //               transition: 'background-color 0.3s',
// //               ':hover': {
// //                 backgroundColor: '#1565c0'
// //               }
// //             }}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? 'Logging in...' : 'Login'}
// //           </button>
// //         </form>
// //       </div>

// //       {/* Add Credentials Modal */}
// //       <Modal
// //         isOpen={showAddModal}
// //         onRequestClose={closeModal}
// //         style={{
// //           content: {
// //             top: '50%',
// //             left: '50%',
// //             right: 'auto',
// //             bottom: 'auto',
// //             marginRight: '-50%',
// //             transform: 'translate(-50%, -50%)',
// //             maxWidth: '500px',
// //             width: '90%',
// //             borderRadius: '8px',
// //             padding: '2rem'
// //           },
// //           overlay: {
// //             backgroundColor: 'rgba(0, 0, 0, 0.5)'
// //           }
// //         }}
// //       >
// //         <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Add Test Credentials</h2>
        
// //         {modalError && (
// //           <div style={{
// //             padding: '0.75rem',
// //             marginBottom: '1rem',
// //             backgroundColor: '#ffebee',
// //             color: '#d32f2f',
// //             borderRadius: '4px',
// //             border: '1px solid #ef9a9a'
// //           }}>
// //             {modalError}
// //           </div>
// //         )}
        
// //         {modalSuccess && (
// //           <div style={{
// //             padding: '0.75rem',
// //             marginBottom: '1rem',
// //             backgroundColor: '#e8f5e9',
// //             color: '#2e7d32',
// //             borderRadius: '4px',
// //             border: '1px solid #a5d6a7'
// //           }}>
// //             {modalSuccess}
// //           </div>
// //         )}
        
// //         <form onSubmit={handleAddCredentials}>
// //           <div style={{ marginBottom: '1rem' }}>
// //             <label htmlFor="newEmail" style={{
// //               display: 'block',
// //               marginBottom: '0.5rem',
// //               fontWeight: '500',
// //               color: '#333'
// //             }}>Email</label>
// //             <input
// //               type="email"
// //               style={{
// //                 width: '100%',
// //                 padding: '0.75rem',
// //                 border: '1px solid #ddd',
// //                 borderRadius: '4px',
// //                 fontSize: '1rem'
// //               }}
// //               id="newEmail"
// //               value={newEmail}
// //               onChange={(e) => setNewEmail(e.target.value)}
// //               required
// //             />
// //           </div>
          
// //           <div style={{ marginBottom: '1.5rem' }}>
// //             <label htmlFor="newPassword" style={{
// //               display: 'block',
// //               marginBottom: '0.5rem',
// //               fontWeight: '500',
// //               color: '#333'
// //             }}>Password</label>
// //             <input
// //               type="password"
// //               style={{
// //                 width: '100%',
// //                 padding: '0.75rem',
// //                 border: '1px solid #ddd',
// //                 borderRadius: '4px',
// //                 fontSize: '1rem'
// //               }}
// //               id="newPassword"
// //               value={newPassword}
// //               onChange={(e) => setNewPassword(e.target.value)}
// //               required
// //             />
// //           </div>
          
// //           <div style={{ display: 'flex', gap: '1rem' }}>
// //             <button 
// //               type="submit" 
// //               style={{
// //                 flex: 1,
// //                 padding: '0.75rem',
// //                 backgroundColor: '#4caf50',
// //                 color: 'white',
// //                 border: 'none',
// //                 borderRadius: '4px',
// //                 fontSize: '1rem',
// //                 fontWeight: '500',
// //                 cursor: 'pointer'
// //               }}
// //             >
// //               Add Credentials
// //             </button>
            
// //             <button 
// //               type="button" 
// //               onClick={closeModal}
// //               style={{
// //                 flex: 1,
// //                 padding: '0.75rem',
// //                 backgroundColor: '#f5f5f5',
// //                 color: '#333',
// //                 border: '1px solid #ddd',
// //                 borderRadius: '4px',
// //                 fontSize: '1rem',
// //                 fontWeight: '500',
// //                 cursor: 'pointer'
// //               }}
// //             >
// //               Skip
// //             </button>
// //           </div>
// //         </form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default Login;



import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Both email and password are required');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password
      });
      
      if (response.data.success) {
        setIsLoggedIn(true);
        setCurrentUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        const from = location.state?.from || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(response.data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to Dashboard</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='yash8754@gmail.com'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='yash@12123'
            />
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;