import React from "react";

import './App.css'

import '@fortawesome/fontawesome-free/css/all.min.css';
import { Helmet } from 'react-helmet';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HeaderSlider from "./components/HeaderSlider";
import Home from "./Components/Home";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AboutUs from './Components/AboutUs';
import Services from './Components/Services';
import Automation from './Components/Automation';
import Value_for_Investors from './Components/Value_for_Investors';
import We_Serve from './Components/We_Serve';
import Career from './Components/Career';
import Contactus from './Components/Contactus';


const App = () => {
  return (
    <>
   
    <Router>
    <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="All Type Web Design,Digital marketing,Artificial Inteligence,Machine Learning and Data Science are  free" />
        <meta name="keywords" content="AI automation for businesses, Deep tech investment opportunities, AI business solutions, Scalable AI solutions, Invest in AI and automation, AI cybersecurity solutions, Business automation ROI, Predictive analytics for business growth,•	AI Automation,•	Robotic Process Automation (RPA),•	Industrial Automation,•	Business Process Automation, IT Automation,	Cloud Automation,	Security Automation,	AI Automation solutions for businesses,	Best AI automation tools in the USA,	AI automation services for cybersecurity,AI-driven automation software,	AI automation for IT companies, Cloud-based AI automation solutions,	AI automation for data security,	AI Automation companies in the USA,	Top AI automation firms in the USA, AI automation services in the USA,	AI automation solutions for American businesses,	AI automation experts in the USA " />
        <meta name="author" content="CipherShield Technologies" />
      </Helmet>
       <Navbar /> 
      <Routes>
        
        {/* <Route path="/" element={<HeaderSlider />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Automation" element={<Automation />} />
        <Route path="/Value_for_Investors" element={<Value_for_Investors />} />
        <Route path="/We_Serve" element={<We_Serve />} />
        <Route path="/Career" element={<Career />} />
        <Route path="/Contactus" element={<Contactus />} />

      </Routes>
      <Footer/>
    </Router>
    </>
    
  );
}

export default App;
