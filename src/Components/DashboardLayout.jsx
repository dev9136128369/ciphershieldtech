// import { useState } from 'react';
// import BlogDashboard from '../Components/Blog/BlogDashboard';
// import CategoryPage from '../Components/CategoryPage';

// const DashboardLayout = ({ blogs, setBlogs, currentUser, setisLoggedIn }) => {
//   const [activeTab, setActiveTab] = useState('blogs');

//   return (
//     <div className="dashboard-layout">
//       <div className="dashboard-sidebar">
//         <button 
//           className={`tab-button ${activeTab === 'blogs' ? 'active' : ''}`}
//           onClick={() => setActiveTab('blogs')}
//         >
//           My Blogs
//         </button>
//         <button 
//           className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
//           onClick={() => setActiveTab('categories')}
//         >
//           Products & Services
//         </button>
//       </div>

//       <div className="dashboard-content">
//         {activeTab === 'blogs' ? (
//           <BlogDashboard 
//             blogs={blogs} 
//             setBlogs={setBlogs} 
//             currentUser={currentUser} 
//             setisLoggedIn={setisLoggedIn} 
//           />
//         ) : (
//           <CategoryPage />
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;




// DashboardLayout.js
import React, { useState } from 'react';
import BlogDashboard from './Blog/BlogDashboard';
import CategoryPage from './CategoryPage';

const DashboardLayout = ({ blogs, setBlogs, currentUser, setIsLoggedIn }) => {
  const [activeTab, setActiveTab] = useState('blogs');

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h4>Welcome, {currentUser?.name || 'User'}!</h4>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-btn ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            <i className="fas fa-blog me-2"></i>Products & Services
          </button>

          <button
            className={`nav-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <i className="fas fa-tags me-2"></i>  My Blogs 
          </button>

          <button
            className="nav-btn logout-btn"
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem('token');
            }}
          >
            <i className="fas fa-sign-out-alt me-2"></i> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h3 className="dashheading text-center">Dashboard
      <span className="decorative-line7"></span>

          </h3>
        </div>

        <div className="content-body">
          {activeTab === 'blogs' ? (
            <CategoryPage blogs={blogs} setBlogs={setBlogs} currentUser={currentUser} />
          ) : (
            <BlogDashboard />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

