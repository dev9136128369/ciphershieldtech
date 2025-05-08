//yashveer

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Configure file storage
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadDir));

// Database simulation
let users = [];
let posts = [];

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Auth check
app.get('/api/auth/check', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) return res.sendStatus(404);
  
  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});



// // ✅ New `/submit-form` route
app.post('/submit-form', async (req, res) => {
  const { name, email, state, designation, contact, gender, message } = req.body;

  if (!name || !email || !state || !designation || !contact || !gender || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'yashveersingh7648@gmail.com',
    subject: `New Application from ${name}`,
    html: `
      <h2>New Application Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Designation:</strong> ${designation}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: '✅ Form submitted and email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: '❌ Failed to send email. Please try again.' });
  }
});

app.post('/login-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'yashveersingh7648@gmail.com',
      subject: `New Message: ${subject}`,
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: '✅ Email sent successfully!' });
    } catch (error) {
      console.error('❌ Error:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  });
  
// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      createdAt: new Date()
    };

    users.push(newUser);

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// File Upload
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  res.json({ 
    success: true,
    filePath: `/uploads/${req.file.filename}`
  });
});

// Create Post
app.post('/api/posts', authenticateToken, (req, res) => {
  try {
    const { title, content, category, attachments = [] } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ success: false, error: 'Title, content, and category are required' });
    }

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      category,
      attachments,
      userId: req.user.userId,
      createdAt: new Date()
    };

    posts.push(newPost);

    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ success: false, error: 'Failed to create post' });
  }
});

// Get All Posts
app.get('/api/posts', (req, res) => {
  res.json({ success: true, posts });
});

// Get Posts by Category
app.get('/api/posts/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  const filteredPosts = posts.filter(post => post.category?.toLowerCase() === category);

  res.json({ success: true, posts: filteredPosts || [] });
});

// ✅ Delete Post by ID (NEW)
// Delete post by ID (only owner can delete)
app.delete('/api/posts/:id', authenticateToken, (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }

  const post = posts[postIndex];

  // Check ownership
  if (post.userId !== req.user.userId) {
    return res.status(403).json({ success: false, error: 'Forbidden: Not your post' });
  }

  posts.splice(postIndex, 1);

  res.json({ success: true, message: 'Post deleted successfully' });
});




// ✅ Fix GET post by ID
app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id); // or fetch from DB

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json({ post });
});

// ✅ Fix PUT post by ID
// Example: Express.js route to handle updating a post
app.put('/api/posts/id/:id', async (req, res) => {
  const { title, content } = req.body;
  const postId = req.params.id;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const post = await Post.findById(postId); // Assuming you're using MongoDB with Mongoose
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post
    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({ success: true, post });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to update the post.' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${uploadDir}`);
  console.log(`Available endpoints:`);
  console.log(`- POST /api/auth/register`);
  console.log(`- POST /api/auth/login`);
  console.log(`- GET /api/auth/check`);
  console.log(`- POST /api/upload`);
  console.log(`- POST /api/posts`);
  console.log(`- GET /api/posts`);
  console.log(`- GET /api/posts/:category`);
  console.log(`- DELETE /api/posts/:id`);
});






















//sagar

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fs = require('fs');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const nodemailer = require('nodemailer');

// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 8000;

// // Configure file storage
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   }
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 } // 10MB
// });

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000'],
//   credentials: true
// }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/uploads', express.static(uploadDir));

// // Database simulation
// let users = [];
// let posts = [];

// // JWT Configuration
// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// // Auth middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
  
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK' });
// });

// // Auth check
// app.get('/api/auth/check', authenticateToken, (req, res) => {
//   const user = users.find(u => u.id === req.user.userId);
//   if (!user) return res.sendStatus(404);
  
//   res.json({
//     success: true,
//     user: {
//       id: user.id,
//       email: user.email,
//       name: user.name
//     }
//   });
// });

// // Submit Form Route
// app.post('/submit-form', async (req, res) => {
//   const { name, email, state, designation, contact, gender, message } = req.body;

//   if (!name || !email || !state || !designation || !contact || !gender || !message) {
//     return res.status(400).json({ error: 'All fields are required.' });
//   }

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: 'yashveersingh7648@gmail.com',
//     subject: `New Application from ${name}`,
//     html: `
//       <h2>New Application Form Submission</h2>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>State:</strong> ${state}</p>
//       <p><strong>Designation:</strong> ${designation}</p>
//       <p><strong>Contact:</strong> ${contact}</p>
//       <p><strong>Gender:</strong> ${gender}</p>
//       <p><strong>Message:</strong> ${message}</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: '✅ Form submitted and email sent successfully!' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: '❌ Failed to send email. Please try again.' });
//   }
// });

// // Contact form email route
// app.post('/login-email', async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ error: 'All fields are required.' });
//   }

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: 'yashveersingh7648@gmail.com',
//     subject: `New Message: ${subject}`,
//     html: `
//       <h2>Contact Form Submission</h2>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Subject:</strong> ${subject}</p>
//       <p><strong>Message:</strong> ${message}</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: '✅ Email sent successfully!' });
//   } catch (error) {
//     console.error('❌ Error:', error);
//     res.status(500).json({ error: 'Failed to send email.' });
//   }
// });

// // Register
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const { email, password, name } = req.body;
//     if (!email || !password || !name) {
//       return res.status(400).json({ success: false, error: 'All fields are required' });
//     }

//     const userExists = users.some(user => user.email === email);
//     if (userExists) {
//       return res.status(400).json({ success: false, error: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = {
//       id: users.length + 1,
//       email,
//       password: hashedPassword,
//       name,
//       createdAt: new Date()
//     };

//     users.push(newUser);

//     const token = jwt.sign(
//       { userId: newUser.id, email: newUser.email },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(201).json({
//       success: true,
//       token,
//       user: {
//         id: newUser.id,
//         email: newUser.email,
//         name: newUser.name
//       }
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ success: false, error: 'Registration failed' });
//   }
// });

// // Login
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ success: false, error: 'Email and password are required' });
//     }

//     const user = users.find(user => user.email === email);
//     if (!user) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({
//       success: true,
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name
//       }
//     });

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ success: false, error: 'Login failed' });
//   }
// });

// // File Upload
// app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ success: false, error: 'No file uploaded' });
//   }

//   res.json({ 
//     success: true,
//     filePath: `/uploads/${req.file.filename}`
//   });
// });

// // Create Post
// app.post('/api/posts', authenticateToken, (req, res) => {
//   const { title, content, category, attachments = [] } = req.body;
//   if (!title || !content || !category) {
//     return res.status(400).json({ success: false, error: 'Title, content, and category are required' });
//   }

//   const newPost = {
//     id: posts.length + 1,
//     title,
//     content,
//     category,
//     attachments,
//     userId: req.user.userId,
//     createdAt: new Date()
//   };

//   posts.push(newPost);

//   res.status(201).json({ success: true, post: newPost });
// });

// // Get All Posts
// app.get('/api/posts', (req, res) => {
//   res.json({ success: true, posts });
// });

// // Get Post by ID
// app.get('/api/posts/id/:id', (req, res) => {
//   const postId = req.params.id;
//   const postsPath = path.join(__dirname, 'data', 'posts.json');

//   if (!fs.existsSync(postsPath)) {
//     return res.status(404).json({ error: 'No posts found' });
//   }

//   const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8')).posts || [];
//   const post = postsData.find(p => String(p.id) === postId);

//   if (!post) {
//     return res.status(404).json({ error: 'Post not found' });
//   }

//   return res.json({ post });
// });


// // Update Post by ID
// app.put('/api/posts/:id', (req, res) => {
//   const postId = req.params.id;
//   const { title, content, category } = req.body;

//   const postsPath = path.join(__dirname, 'data', 'posts.json');
//   if (!fs.existsSync(postsPath)) return res.status(404).json({ error: 'Posts file missing' });

//   const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
//   const index = postsData.posts.findIndex(p => String(p.id) === postId);

//   if (index === -1) return res.status(404).json({ error: 'Post not found' });

//   postsData.posts[index] = {
//     ...postsData.posts[index],
//     title: title || postsData.posts[index].title,
//     content: content || postsData.posts[index].content,
//     category: category || postsData.posts[index].category,
//     updatedAt: new Date().toISOString()
//   };

//   fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2));
//   return res.json({ success: true, post: postsData.posts[index] });
// });

// // Delete Post by ID
// app.delete('/api/posts/:id', authenticateToken, (req, res) => {
//   const postId = parseInt(req.params.id);
//   const postIndex = posts.findIndex(post => post.id === postId);

//   if (postIndex === -1) {
//     return res.status(404).json({ success: false, error: 'Post not found' });
//   }

//   const post = posts[postIndex];
//   if (post.userId !== req.user.userId) {
//     return res.status(403).json({ success: false, error: 'Forbidden: Not your post' });
//   }

//   posts.splice(postIndex, 1);

//   res.json({ success: true, message: 'Post deleted successfully' });
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server is running on port ${PORT}`);
// });
