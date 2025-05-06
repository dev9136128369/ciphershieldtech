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






import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post('/api/register', {
        name,
        email,
        password
      });

      if (response.data.success) {
        const { accessToken, user } = response.data;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setToken(accessToken);
        setUser(user);
        return { success: true };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password
      });

      if (response.data.success) {
        const { accessToken, user } = response.data;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setToken(accessToken);
        setUser(user);
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      register, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};