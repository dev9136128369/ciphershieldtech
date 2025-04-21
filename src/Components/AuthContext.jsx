// // import React, { createContext, useContext, useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (token) {
// //           axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// //           const response = await axios.get('http://localhost:8000/api/check-auth');
// //           setUser(response.data.user);
// //           setIsAuthenticated(true);
// //         }
// //       } catch (error) {
// //         console.error('Authentication check failed:', error);
// //         logout();
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     checkAuth();
// //   }, []);

// //   const login = async (email, password) => {
// //     try {
// //       const response = await axios.post('http://localhost:8000/api/login', { email, password });
// //       localStorage.setItem('token', response.data.token);
// //       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
// //       setUser(response.data.user);
// //       setIsAuthenticated(true);
// //       return { success: true };
// //     } catch (error) {
// //       console.error('Login failed:', error);
// //       return { success: false, message: error.response?.data?.error || 'Login failed' };
// //     }
// //   };

// //   const register = async (email, password, name) => {
// //     try {
// //       const response = await axios.post('http://localhost:8000/api/register', { email, password, name });
// //       localStorage.setItem('token', response.data.token);
// //       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
// //       setUser(response.data.user);
// //       setIsAuthenticated(true);
// //       return { success: true };
// //     } catch (error) {
// //       console.error('Registration failed:', error);
// //       return { success: false, message: error.response?.data?.error || 'Registration failed' };
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     delete axios.defaults.headers.common['Authorization'];
// //     setUser(null);
// //     setIsAuthenticated(false);
// //     navigate('/');
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);

// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// // Create and export the context
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   // ... rest of your AuthProvider code ...

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         isLoading,
//         login,
//         logout
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };