// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
// import ChatbotBox from './Components/ChatbotBox'
import ChatbotComponent from "./Components/ChatbotComponent"; 


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <ChatbotBox/> */}
    <ChatbotComponent />

  </React.StrictMode>
);