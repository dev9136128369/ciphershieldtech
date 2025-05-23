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
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Routes, Route } from 'react-router-dom';
// import BlogDashboard from './Blog/BlogDashboard';
// import BlogEditor from './Blog/BlogEditor';
// import BlogPage from './BlogPage';
// import ManagePostsPage from './ManagePostsPage';
// import AllPermissions from './AllPermissions';

// const DashboardLayout = ({ currentUser, setIsLoggedIn, blogs, setBlogs }) => {
//   const [activeTab, setActiveTab] = useState('blogs');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle tab changes
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     navigate(`/dashboard/${tab}`);
//   };

//   // Centralized blog management functions
//   const handleCreateBlog = () => {
//     navigate('/dashboard/blogs/editor/new');
//   };

//   const handleEditBlog = (id) => {
//     navigate(`/dashboard/blogs/editor/${id}`);
//   };

//   const handleDeleteBlog = (id) => {
//     if (window.confirm('Are you sure you want to delete this blog?')) {
//       setBlogs(prev => prev.filter(blog => blog.id !== id));
//     }
//   };

//   const handlePublishBlog = (blogData, isEditMode) => {
//     if (isEditMode) {
//       setBlogs(prev => prev.map(blog => 
//         blog.id === blogData.id ? blogData : blog
//       ));
//     } else {
//       setBlogs(prev => [...prev, {
//         ...blogData,
//         id: Date.now().toString(), // Generate unique ID
//         author: currentUser,
//         date: new Date().toISOString()
//       }]);
//     }
//     navigate('/dashboard/blogs');
//   };


//   const handlePublishBlog1 = (blogData, isEditMode) => {
//     if (isEditMode) {
//       setBlogs(prev => prev.map(blog => 
//         blog.id === blogData.id ? blogData : blog
//       ));
//     } else {
//       setBlogs(prev => [...prev, {
//         ...blogData,
//         id: Date.now().toString(), // Generate unique ID
//         author: currentUser,
//         date: new Date().toISOString()
//       }]);
//     }
//     navigate('/editor/blogs');
//   };


//   const handleCreateNew = () => {
//     navigate('/blog/new');
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-layout">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <h4>Welcome, {currentUser?.name || 'User'}!</h4>
//         </div>

//         <nav className="sidebar-nav">
        

//           <button
//             className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
//             onClick={() => handleTabChange('create')}
//           >
//             <i className="fas fa-plus me-2"></i>Create Portfolio
//           </button>

//           {/* <button
//             className={nav-btn ${activeTab === 'create1' ? 'active' : ''}}
//             onClick={() => handleTabChange('create1')}
//           >
//             <i className="fas fa-plus me-2"></i>Create Blog
//           </button> */}

//           <button  
//           className={`nav-btn ${activeTab === 'create1' ? 'active' : ''}`}
//           onClick={handleCreateNew} >
//           <i className="fas fa-plus me-2"></i>Create Your First Blog
//               </button>

//           <button
//             className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
//             onClick={() => handleTabChange('products')}
//           >
//             <i className="fas fa-tags me-2"></i>Show PortFolio
//           </button>

//           <button
//             className={`nav-btn ${activeTab === 'blogs' ? 'active1' : ''}`}
//             onClick={() => handleTabChange('blogs')}
//           >
//             <i className="fas fa-blog me-2"></i>Show Blogs
//           </button>

//           <button
//             className={`nav-btn ${activeTab === 'AllPermission' ? 'active1' : ''}`}
//             onClick={() => handleTabChange('AllPermission')}
//           >
//             <i className="fas fa-blog me-2"></i>AllPermissions
//           </button>

//           <button
//             className="nav-btn logout-btn"
//             onClick={() => {
//               localStorage.removeItem('token');
//               setIsLoggedIn(false);
//               navigate('/login');
//             }}
//           >
//             <i className="fas fa-sign-out-alt me-2"></i> Logout
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="content-header">
//           <h3 className="dashheading text-center">Dashboard
//             <span className="decorative-line7"></span>
//           </h3>
//         </div>

//         <div className="content-body">
//           <Routes>

//           <Route path="products" element={<ManagePostsPage />} />

//             <Route path="blogs" element={
//               <BlogDashboard 
//                 blogs={blogs.filter(blog => blog.author === currentUser)} 
//                 onEdit={handleEditBlog}
//                 onDelete={handleDeleteBlog}
//                 currentUser={currentUser}
//               />
//             } />
            
//             <Route path="create" element={
//               <BlogPage 
//                 onPublish={(blogData) => handlePublishBlog(blogData, false)}
//                 currentUser={currentUser}
//               />
//             } />
            
//             <Route path="blogs/editor/new" element={
//               <BlogEditor 
//                 onPublish={(blogData) => handlePublishBlog(blogData, false)}
//                 currentUser={currentUser}
//               />
//             } />
            
//             <Route path="blogs/editor/:id" element={
//               <BlogEditor 
//                 blogs={blogs}
//                 onPublish={(blogData) => handlePublishBlog(blogData, true)}
//                 currentUser={currentUser}
//               />
//             } />
            

//             <Route path="create1" element={
//               <BlogEditor 
//                 onPublish={(blogData) => handlePublishBlog(blogData, false)}
//                 currentUser={currentUser}
//               />
//             } />
            
//           <Route path="AllPermission" element={<AllPermissions />} />


//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;




import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import BlogDashboard from './Blog/BlogDashboard';
import BlogEditor from './Blog/BlogEditor';
import BlogPage from './BlogPage';
import ManagePostsPage from './ManagePostsPage';
import AllPermissions from './AllPermissions';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DashboardLayout = ({ currentUser, setIsLoggedIn, blogs, setBlogs }) => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Show modal when any tab is clicked if user is admin
    if (currentUser?.role === 'admin') {
      setShowAddModal(true);
    } else {
      navigate(`/dashboard/${tab}`);
    }
  };

  const handleAddCredentials = async (e) => {
    e.preventDefault();
    setModalError('');
    setModalSuccess('');

    if (!newEmail || !newPassword) {
      setModalError('Both email and password are required');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/add-test-login',
        { 
          email: newEmail, 
          password: newPassword,
          role: 'manager'
        },
      );

      if (response.data.success) {
        setModalSuccess('Manager credentials added successfully!');
        setNewEmail('');
        setNewPassword('');
        setTimeout(() => {
          setShowAddModal(false);
          navigate(`/dashboard/${activeTab}`);
        }, 1500);
      } else {
        setModalError(response.data.message || 'Failed to add credentials');
      }
    } catch (err) {
      console.error('Add credentials error:', err);
      setModalError(err.response?.data?.message || 'Failed to add credentials. Please try again.');
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    navigate(`/dashboard/${activeTab}`);
  };

  const handleCreateBlog = () => {
    navigate('/dashboard/blogs/editor/new');
  };

  const handleEditBlog = (id) => {
    navigate(`/dashboard/blogs/editor/${id}`);
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    }
  };

  const handlePublishBlog = (blogData, isEditMode) => {
    if (isEditMode) {
      setBlogs(prev => prev.map(blog => 
        blog.id === blogData.id ? blogData : blog
      ));
    } else {
      setBlogs(prev => [...prev, {
        ...blogData,
        id: Date.now().toString(),
        author: currentUser,
        date: new Date().toISOString()
      }]);
    }
    navigate('/dashboard/blogs');
  };

  const handleCreateNew = () => {
    navigate('/blog/new');
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h4>Welcome, {currentUser?.name || 'User'}!</h4>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => handleTabChange('create')}
          >
            <i className="fas fa-plus me-2"></i>Create Portfolio
          </button>

          <button  
            className={`nav-btn ${activeTab === 'create1' ? 'active' : ''}`}
            onClick={handleCreateNew}
          >
            <i className="fas fa-plus me-2"></i>Create Your First Blog
          </button>

          <button
            className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => handleTabChange('products')}
          >
            <i className="fas fa-tags me-2"></i>Show PortFolio
          </button>

          <button
            className={`nav-btn ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => handleTabChange('blogs')}
          >
            <i className="fas fa-blog me-2"></i>Show Blogs
          </button>

          <button
            className={`nav-btn ${activeTab === 'AllPermission' ? 'active' : ''}`}
            onClick={() => handleTabChange('AllPermission')}
          >
            <i className="fas fa-blog me-2"></i>AllPermissions
          </button>

          <button
            className="nav-btn logout-btn"
            onClick={() => {
              localStorage.removeItem('token');
              setIsLoggedIn(false);
              navigate('/login');
            }}
          >
            <i className="fas fa-sign-out-alt me-2"></i> Logout
          </button>
        </nav>
      </div>

      <div className="main-content">
        <div className="content-header">
          <h3 className="dashheading">Dashboard</h3>
          {/* <span className="decorative-line"></span> */}
        </div>

        <div className="content-body">
          <Routes>
            <Route path="products" element={<ManagePostsPage />} />

            <Route path="blogs" element={
              <BlogDashboard 
                blogs={blogs.filter(blog => blog.author === currentUser)} 
                onEdit={handleEditBlog}
                onDelete={handleDeleteBlog}
                currentUser={currentUser}
              />
            } />
            
            <Route path="create" element={
              <BlogPage 
                onPublish={(blogData) => handlePublishBlog(blogData, false)}
                currentUser={currentUser}
              />
            } />
            
            <Route path="blogs/editor/new" element={
              <BlogEditor 
                onPublish={(blogData) => handlePublishBlog(blogData, false)}
                currentUser={currentUser}
              />
            } />
            
            <Route path="blogs/editor/:id" element={
              <BlogEditor 
                blogs={blogs}
                onPublish={(blogData) => handlePublishBlog(blogData, true)}
                currentUser={currentUser}
              />
            } />
            
            <Route path="create1" element={
              <BlogEditor 
                onPublish={(blogData) => handlePublishBlog(blogData, false)}
                currentUser={currentUser}
              />
            } />
            
            <Route path="AllPermission" element={<AllPermissions />} />
          </Routes>
        </div>
      </div>

      {/* Modal for adding manager credentials */}
      {/* <div className='container'>
        <h2>Add Manager Credentials</h2>

      </div> */}
      <Modal
        isOpen={showAddModal}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        
        {modalError && <div className="error-message">{modalError}</div>}
        {modalSuccess && <div className="success-message">{modalSuccess}</div>}
        
        <form onSubmit={handleAddCredentials} className='modelForm'>
            <div className='container'>
        <h2>Add Manager Credentials</h2>

      </div>
          <div className="form-group">
            <label htmlFor="newEmail">Email</label>
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <div className="role-display">
              manager (auto-assigned)
            </div>
          </div>
          
          <div className="modal-buttons">
            <button type="submit">Add Manager</button>
            <button type="button" onClick={closeModal}>Skip</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardLayout;