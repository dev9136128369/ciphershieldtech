// import React, { lazy, Suspense,useEffect, } from "react";
// import './App.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Helmet } from 'react-helmet';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // import Navbar from './Components/Navbar';
// // import Footer from './Components/Footer';
// // import Services from './Components/Services';
// // import Automation from './Components/Automation';
// // import ValueforInvestors from './Components/ValueforInvestors';
// // import WeServe from './Components/WeServe';
// // import Career from './Components/Career';
// // import Contactus from './Components/Contactus';
// // import PrivacyPolicy from './Components/PrivacyPolicy';
// // import RefundPolicy from './Components/RefundPolicy';

// // Lazy Load Components
// const Home = lazy(() => import("./Components/Home"));
// const AboutUs = lazy(() => import("./Components/AboutUs"));

// const Footer = lazy(() => import("./Components/Footer"));
// const Services = lazy(() => import("./Components/Services"));
// const Automation = lazy(() => import("./Components/Automation"));
// const ValueforInvestors = lazy(() => import("./Components/ValueforInvestors"));
// const WeServe = lazy(() => import("./Components/WeServe"));
// const Career = lazy(() => import("./Components/Career"));
// const Contactus = lazy(() => import("./Components/Contactus"));
// const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy"));
// const RefundPolicy = lazy(() => import("./Components/RefundPolicy"));
// const Navbar = lazy(() => import("./Components/Navbar"));
// const BlogPage = lazy(() => import("./Components/BlogPage.jsx"));
// const CategoryPage = lazy(() => import("./Components/CategoryPage"));
// const Chatbot = lazy(() => import("./Components/Chatbot"));
// const ChatbotBox = lazy(() => import("./Components/ChatbotBox"));

// const ArticlePreview = lazy(() => import("./Components/ArticlePreview"));



// const BlogList = lazy(() => import("./Components/Blog/BlogList"));
// const BlogDetail = lazy(() => import("./Components/Blog/BlogDetail"));


// const NotFound = lazy(() => import("./Components/NotFound"));

// const App = () => {
//   // SEO H1 & H2 को रिमूव करने का कोड
 
//    // Combined SEO elements removal in a single useEffect
//    useEffect(() => {
//     if (process.env.NODE_ENV === 'development') {
//       const seoH1 = document.getElementById("seo-h1");
//       const seoH2 = document.getElementById("seo-h2");
      
//       if (seoH1) seoH1.remove();
//       if (seoH2) seoH2.remove();
//     }
//   }, []);
 
//   return (
//     <Router>
//       <Helmet>
//       <h1 id="seo-h1">Welcome to CipherShield Tech - Secure IT Solutions & Automation</h1> 
//       <h2 id="seo-h2">Why Choose CipherShield Tech for Your Cybersecurity Needs?</h2>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta name="description" content="CipherShield Tech provides cutting-edge IT solutions, automation services, and cybersecurity technologies to protect your business." />
//         <meta name="keywords" content="AI automation, Business automation, Cloud automation, AI cybersecurity, IT automation, Security automation" />
//         <meta name="author" content="CipherShield Technologies" />

//         {/* Open Graph Meta Tags */}
//         <meta property="og:title" content="CipherShield Tech - Secure Your Data" />
//         <meta property="og:description" content="CipherShield Tech specializes in AI-powered security solutions, automation, and cyber defense. Protect your business with our innovative technology and stay ahead of evolving threats." />

//         <meta property="og:image" content="https://www.ciphershieldtech.com/og-image.jpg" />
//         <meta property="og:url" content="https://www.ciphershieldtech.com/" />

//         {/* Twitter Meta Tags */}
//         <meta name="twitter:title" content="CipherShield Tech - Secure Your Data" />
//         <meta property="og:description" content="CipherShield Tech specializes in AI-powered security solutions, automation, and cyber defense. Protect your business with our innovative technology and stay ahead of evolving threats." />

//         <meta name="twitter:image" content="https://www.ciphershieldtech.com/twitter-image.jpg" />
//         <meta name="twitter:card" content="summary_large_image" />
//       </Helmet>

//       <Navbar />

//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/AboutUs" element={<AboutUs />} />
//           <Route path="/Services" element={<Services />} />
//           <Route path="/Automation" element={<Automation />} />
//           <Route path="/ValueforInvestors" element={<ValueforInvestors />} />
//           <Route path="/WeServe" element={<WeServe />} />
//           <Route path="/Career" element={<Career />} />
//           <Route path="/Contactus" element={<Contactus />} />
//           <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
//           <Route path="/RefundPolicy" element={<RefundPolicy />} />
//           <Route path="/BlogPage" element={<BlogPage />} />
//           <Route path="/CategoryPage" element={<CategoryPage />} />
//           <Route path="/Chatbot" element={<Chatbot />} />
//           <Route path="/ChatbotBox" element={<ChatbotBox />} />


//           <Route path="/ArticlePreview" element={<ArticlePreview />} />


//           <Route path="/blog" element={<BlogList />} />
//           <Route path="/blog/:id" element={<BlogDetail />} />

//            {/* 404 Page for Unknown Routes */}
//     <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Suspense>

//       <Footer />
//     </Router>
//   );
// }

// export default App;




// import React, { lazy, Suspense, useEffect, useState } from "react";
// import './App.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Helmet } from 'react-helmet';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // Lazy Load Components
// const Home = lazy(() => import("./Components/Home"));
// const AboutUs = lazy(() => import("./Components/AboutUs"));
// const Footer = lazy(() => import("./Components/Footer"));
// const Services = lazy(() => import("./Components/Services"));
// const Automation = lazy(() => import("./Components/Automation"));
// const ValueforInvestors = lazy(() => import("./Components/ValueforInvestors"));
// const WeServe = lazy(() => import("./Components/WeServe"));
// const Career = lazy(() => import("./Components/Career"));
// const Contactus = lazy(() => import("./Components/Contactus"));
// const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy"));
// const RefundPolicy = lazy(() => import("./Components/RefundPolicy"));
// const Navbar = lazy(() => import("./Components/Navbar"));
// const BlogPage = lazy(() => import("./Components/BlogPage.jsx"));
// const CategoryPage = lazy(() => import("./Components/CategoryPage"));
// const Chatbot = lazy(() => import("./Components/Chatbot"));
// const ChatbotComponent = lazy(() => import("./Components/ChatbotComponent"));
// const DashboardLayout = lazy(() => import("./Components/DashboardLayout"));
// const ArticlePreview = lazy(() => import("./Components/ArticlePreview"));
// const ArticleForm = lazy(() => import("./Components/ArticleForm"));
// const LinkedInArticle = lazy(() => import("./Components/LinkedInArticle"));
// const NotFound = lazy(() => import("./Components/NotFound"));

// // Blog Components
// const BlogList = lazy(() => import("./Components/Blog/BlogList"));
// const BlogDetail = lazy(() => import("./Components/Blog/BlogDetail"));
// const BlogEditor = lazy(() => import("./Components/Blog/BlogEditor"));
// const BlogDashboard = lazy(() => import("./Components/Blog/BlogDashboard"));
// const Login = lazy(() => import("./Components/Auth/Login"));

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     return localStorage.getItem('isLoggedIn') === 'true';
//   });
//   const [currentUser, setCurrentUser] = useState(() => {
//     return JSON.parse(localStorage.getItem('currentUser')) || null;
//   });
//   const [blogs, setBlogs] = useState(() => {
//     try {
//       const savedBlogs = localStorage.getItem('blogs');
//       return savedBlogs ? JSON.parse(savedBlogs) : [];
//     } catch (error) {
//       console.error('Failed to load blogs from localStorage:', error);
//       return [];
//     }
//   });

//   // Save states to localStorage
//   useEffect(() => {
//     localStorage.setItem('isLoggedIn', isLoggedIn);
//     localStorage.setItem('currentUser', JSON.stringify(currentUser));
//     try {
//       localStorage.setItem('blogs', JSON.stringify(blogs));
//     } catch (error) {
//       console.error('Failed to save blogs to localStorage:', error);
//     }
//   }, [isLoggedIn, currentUser, blogs]);

//   // Remove SEO elements in development
//   useEffect(() => {
//     if (process.env.NODE_ENV === 'development') {
//       const seoH1 = document.getElementById("seo-h1");
//       const seoH2 = document.getElementById("seo-h2");
//       if (seoH1) seoH1.remove();
//       if (seoH2) seoH2.remove();
//     }
//   }, []);

//   return (
//     <Router>
//       <Helmet>
//         <h1 id="seo-h1">Welcome to CipherShield Tech - Secure IT Solutions & Automation</h1> 
//         <h2 id="seo-h2">Why Choose CipherShield Tech for Your Cybersecurity Needs?</h2>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta name="description" content="CipherShield Tech provides cutting-edge IT solutions, automation services, and cybersecurity technologies to protect your business." />
//         <meta name="keywords" content="AI automation, Business automation, Cloud automation, AI cybersecurity, IT automation, Security automation" />
//         <meta name="author" content="CipherShield Technologies" />
//         <meta property="og:title" content="CipherShield Tech - Secure Your Data" />
//         <meta property="og:description" content="CipherShield Tech specializes in AI-powered security solutions, automation, and cyber defense." />
//         <meta property="og:image" content="https://www.ciphershieldtech.com/og-image.jpg" />
//         <meta property="og:url" content="https://www.ciphershieldtech.com/" />
//         <meta name="twitter:title" content="CipherShield Tech - Secure Your Data" />
//         <meta name="twitter:image" content="https://www.ciphershieldtech.com/twitter-image.jpg" />
//         <meta name="twitter:card" content="summary_large_image" />
//       </Helmet>

//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

//       <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/AboutUs" element={<AboutUs />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/automation" element={<Automation />} />
//           <Route path="/ValueforInvestors" element={<ValueforInvestors />} />
//           <Route path="/WeServe" element={<WeServe />} />
//           <Route path="/career" element={<Career />} />
//           <Route path="/Contactus" element={<Contactus />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/refund-policy" element={<RefundPolicy />} />
//           <Route path="/BlogPage" element={<BlogPage />} />
//           <Route path="/category-page" element={<CategoryPage />} />
//           <Route path="/chatbot" element={<Chatbot />} />
//           <Route path="/chatbot-component" element={<ChatbotComponent />} />
//           <Route path="/article-preview" element={<ArticlePreview />} />
//           <Route path="/article-form" element={<ArticleForm />} />
//           <Route path="/linkedin-article" element={<LinkedInArticle />} />
          
//           {/* Blog Routes */}
//           <Route path="/blog" element={<BlogList blogs={blogs} />} />
//           <Route path="/blog/:slug" element={<BlogDetail blogs={blogs} />} />
          
//           {/* Auth Routes */}
//           <Route path="/login" element={
//             isLoggedIn ? <Navigate to="/editor" replace /> : 
//             <Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
//           } />

//           <Route path="/editor" element={
//             isLoggedIn ? 
//               <BlogEditor blogs={blogs} setBlogs={setBlogs} currentUser={currentUser} /> : 
//               <Navigate to="/login" replace state={{ from: '/editor' }} />
//           } />

//           <Route path="/editor/:id" element={
//             isLoggedIn ? 
//               <BlogEditor blogs={blogs} setBlogs={setBlogs} currentUser={currentUser} /> : 
//               <Navigate to="/login" replace state={{ from: window.location.pathname }} />
//           } />

//           <Route path="/DashboardLayout" element={
//             isLoggedIn ? 
//               <DashboardLayout 
//                 blogs={blogs}
//                 setBlogs={setBlogs}
//                 currentUser={currentUser}
//                 setIsLoggedIn={setIsLoggedIn}
//               /> : 
//               <Navigate to="/login" replace />
//           } />

//           {/* 404 Route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Suspense>

//       <Footer />
//     </Router>
//   );
// }

// export default App;





import React, { lazy, Suspense, useEffect, useState } from "react";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// Lazy Load Components
const Home = lazy(() => import("./Components/Home"));
const AboutUs = lazy(() => import("./Components/AboutUs"));
const Footer = lazy(() => import("./Components/Footer"));
const Services = lazy(() => import("./Components/Services"));
const Automation = lazy(() => import("./Components/Automation"));
const ValueforInvestors = lazy(() => import("./Components/ValueforInvestors"));
const WeServe = lazy(() => import("./Components/WeServe"));
const Career = lazy(() => import("./Components/Career"));
const Contactus = lazy(() => import("./Components/Contactus"));
const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./Components/RefundPolicy"));
const Navbar = lazy(() => import("./Components/Navbar"));
const BlogPage = lazy(() => import("./Components/BlogPage.jsx"));
const CategoryPage = lazy(() => import("./Components/CategoryPage"));
const Chatbot = lazy(() => import("./Components/Chatbot"));
// const ChatbotComponent = lazy(() => import("./Components/ChatbotComponent"));
const DashboardLayout = lazy(() => import("./Components/DashboardLayout"));
const ArticlePreview = lazy(() => import("./Components/ArticlePreview"));
const ArticleForm = lazy(() => import("./Components/ArticleForm"));
const LinkedInArticle = lazy(() => import("./Components/LinkedInArticle"));

const EditPostPage = lazy(() => import("./Components/EditPostPage"));


const NotFound = lazy(() => import("./Components/NotFound"));

// Blog Components
const BlogList = lazy(() => import("./Components/Blog/BlogList"));
const BlogDetail = lazy(() => import("./Components/Blog/BlogDetail"));
const BlogEditor = lazy(() => import("./Components/Blog/BlogEditor"));
const BlogDashboard = lazy(() => import("./Components/Blog/BlogDashboard"));
const Login = lazy(() => import("./Components/Auth/Login"));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('token') !== null;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
  });
  const [blogs, setBlogs] = useState(() => {
    try {
      const savedBlogs = localStorage.getItem('blogs');
      return savedBlogs ? JSON.parse(savedBlogs) : [];
    } catch (error) {
      console.error('Failed to load blogs:', error);
      return [];
    }
  });

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    try {
      localStorage.setItem('blogs', JSON.stringify(blogs));
    } catch (error) {
      console.error('Failed to save blogs:', error);
    }
  }, [isLoggedIn, currentUser, blogs]);

  // Remove SEO elements in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const seoH1 = document.getElementById("seo-h1");
      const seoH2 = document.getElementById("seo-h2");
      if (seoH1) seoH1.remove();
      if (seoH2) seoH2.remove();
    }
  }, []);

  return (
    <Router>
      <Helmet>
        <title>CipherShield Technologies</title>
        <meta name="description" content="IT solutions and cybersecurity services" />
      </Helmet>

      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/ValueforInvestors" element={<ValueforInvestors />} />
          <Route path="/WeServe" element={<WeServe />} />
          <Route path="/career" element={<Career />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/RefundPolicy" element={<RefundPolicy />} />
          <Route path="/BlogPage" element={<BlogPage />} />
          <Route path="/CategoryPage" element={<CategoryPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          {/* <Route path="/ChatbotComponent" element={<ChatbotComponent />} /> */}
          <Route path="/article-preview" element={<ArticlePreview />} />
          <Route path="/article-form" element={<ArticleForm />} />
          <Route path="/linkedin-article" element={<LinkedInArticle />} />
          <Route path="/EditPostPage" element={<EditPostPage />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<BlogList blogs={blogs} />} />
          <Route path="/blog/:slug" element={<BlogDetail blogs={blogs} />} />
          

          

       
          {/* Auth Routes */}
          <Route path="/login" element={
        
            <Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
          } />

          <Route path="/editor" element={
            isLoggedIn ? 
              <BlogEditor blogs={blogs} setBlogs={setBlogs} currentUser={currentUser} /> : 
              <Navigate to="/login" state={{ from: '/DashboardLayout' }} replace />
          } />

          <Route path="/Login/:id" element={
            isLoggedIn ? 
              <BlogEditor blogs={blogs} setBlogs={setBlogs} currentUser={currentUser} /> : 
              <Navigate to="/login" state={{ from: window.location.pathname }} replace />
          } />

          <Route path="DashboardLayout" element={
            isLoggedIn ? 
              <DashboardLayout 
                blogs={blogs}
                setBlogs={setBlogs}
                currentUser={currentUser}
                setIsLoggedIn={setIsLoggedIn}
              /> : 
              <Navigate to="/login" state={{ from: '/DashboardLayout' }} replace />
            // <DashboardLayout/>
          } />


<Route path="/login" element={
          isLoggedIn ? 
            <Navigate to="/dashboard" replace /> : 
            <Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
        } />

        {/* Dashboard Routes */}
        <Route path="/dashboard/*" element={
          isLoggedIn ? 
            <DashboardLayout 
              currentUser={currentUser}
              setIsLoggedIn={setIsLoggedIn}
              blogs={blogs}
              setBlogs={setBlogs}
            /> : 
            <Navigate to="/login" state={{ from: '/dashboard' }} replace />
        } />



          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </Router>
    
  );
};

export default App;

