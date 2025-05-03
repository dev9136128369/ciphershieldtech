// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError('Email and password are required');
//       return;
//     }
//     if (!email.includes('@')) {
//       setError('Please enter a valid email');
//       return;
//     }
//     setIsLoggedIn(true);
//     navigate('/blog-editor');
//   };

//   return (
//     <div className="auth-container">
//       <h2>Blog Editor Login</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit} className="login-form">
//         <div className="form-group">
//           <label>Email:</label>
//           <input 
//             type="text" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//           />
//         </div>
//         <button type="submit" className="submit-btn">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//         'http://localhost:8000/api/auth/login',
//         { email, password }
//       );

//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('userId', response.data.user.id);
      
//       // Redirect to previous page or home
//       const from = location.state?.from || '/';
//       navigate(from, { replace: true });
//     } catch (err) {
//       console.error('Login Error:', err);
//       setError(err.response?.data?.error || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';


const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    // Mock authentication
    setIsLoggedIn(true);
    setCurrentUser({ 
      email, 
      name: email.split('@')[0],
      id: Date.now().toString()
    });

    // Redirect logic here
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
