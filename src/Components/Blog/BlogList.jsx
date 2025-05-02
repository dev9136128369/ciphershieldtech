// import React from 'react';
// import { Link } from 'react-router-dom';

// const BlogList = ({ blogs = [] }) => {
//   // Filter only published blogs if not authenticated
//   const showBlogs = blogs.filter(blog => 
//     blog.status === 'published' || 
//     blog.userId === localStorage.getItem('userId')
//   );

//   return (
//     <div className="blog-list-container">
//       <h1>Latest Blog Posts</h1>
//       {showBlogs.length === 0 ? (
//         <p>No blog posts available</p>
//       ) : (
//         <div className="blogs-grid">
//           {showBlogs.map(blog => (
//             <div key={blog.id} className="blog-card">
//               <h2>{blog.title}</h2>
//               <p className="blog-meta">
//                 By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
//                 {blog.status !== 'published' && (
//                   <span className="draft-badge">Draft</span>
//                 )}
//               </p>
//               <div 
//                 className="blog-excerpt" 
//                 dangerouslySetInnerHTML={{ 
//                   __html: blog.content.substring(0, 200) + '...' 
//                 }} 
//               />
//               <Link to={`/blog/${blog.id}`} className="read-more-btn">
//                 Read {blog.status === 'published' ? 'More' : 'Draft'}
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogList;


import React from 'react';

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list-container">
      <h2>All Blog Posts</h2>
      {blogs.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <div className="blog-grid">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.content.substring(0, 150)}...</p>
              <a href={`/blog/${blog.id}`}>Read More</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;