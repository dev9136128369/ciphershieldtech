//sagar
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Define MongoDB models
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  attachments: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', postSchema);

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
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'], credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadDir));

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id) && (new mongoose.Types.ObjectId(id)).toString() === id;
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.get('/api/auth/check', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) return res.sendStatus(404);
  res.json({ success: true, user });
});

app.post('/submit-form', async (req, res) => {
  const { name, email, state, designation, contact, gender, message } = req.body;
  if (!name || !email || !state || !designation || !contact || !gender || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await transporter.sendMail({
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
      `
    });
    res.status(200).json({ success: true, message: '✅ Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: '❌ Email failed.' });
  }
});

app.post('/login-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'yashveersingh7648@gmail.com',
      subject: `New Message: ${subject}`,
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });
    res.status(200).json({ success: true, message: '✅ Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ success: false, error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({
    success: true,
    token,
    user: { id: user._id, email: user.email, name: user.name }
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ success: false, error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.json({
    success: true,
    token,
    user: { id: user._id, email: user.email, name: user.name }
  });
});

app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });
  res.json({ success: true, filePath: `/uploads/${req.file.filename}` });
});

app.post('/api/posts', authenticateToken, async (req, res) => {
  const { title, content, category, attachments = [] } = req.body;
  if (!title || !content || !category) {
    return res.status(400).json({ success: false, error: 'Title, content, and category are required' });
  }

  try {
    const post = await Post.create({
      title,
      content,
      category,
      attachments,
      userId: req.user.userId
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    console.error('❌ Error creating post:', err);
    res.status(500).json({ success: false, error: 'Failed to create post' });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'name email');
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch posts' });
  }
});

app.get('/api/posts/:category', async (req, res) => {
  try {
    const posts = await Post.find({ category: req.params.category });
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch posts' });
  }
});

app.get('/api/posts/id/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }
  
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/posts/id/:id', authenticateToken, async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.userId.toString() !== req.user.userId) return res.status(403).json({ error: 'Forbidden' });

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  const postId = req.params.id;
  console.log("Post ID received:", postId); // Log the post ID to check if it's being received correctly

  if (!isValidObjectId(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Check if the logged-in user is the author of the post
    if (post.userId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await Post.findByIdAndDelete(postId);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    console.error('❌ Error while deleting post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/delete-file/:filePath', authenticateToken, async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.params.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ success: true, message: 'File deleted successfully' });
    }
    res.status(404).json({ error: 'File not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

















//yashveer

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

// // Routes

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



// // // ✅ New `/submit-form` route
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

// app.post('/login-email', async (req, res) => {
//     const { name, email, subject, message } = req.body;
  
//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({ error: 'All fields are required.' });
//     }
  
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: 'yashveersingh7648@gmail.com',
//       subject: `New Message: ${subject}`,
//       html: `
//         <h2>Contact Form Submission</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <p><strong>Message:</strong> ${message}</p>
//       `,
//     };
  
//     try {
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ success: true, message: '✅ Email sent successfully!' });
//     } catch (error) {
//       console.error('❌ Error:', error);
//       res.status(500).json({ error: 'Failed to send email.' });
//     }
//   });
  
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
//   try {
//     const { title, content, category, attachments = [] } = req.body;
//     if (!title || !content || !category) {
//       return res.status(400).json({ success: false, error: 'Title, content, and category are required' });
//     }

//     const newPost = {
//       id: posts.length + 1,
//       title,
//       content,
//       category,
//       attachments,
//       userId: req.user.userId,
//       createdAt: new Date()
//     };

//     posts.push(newPost);

//     res.status(201).json({ success: true, post: newPost });
//   } catch (err) {
//     console.error('Create post error:', err);
//     res.status(500).json({ success: false, error: 'Failed to create post' });
//   }
// });

// // Get All Posts
// app.get('/api/posts', (req, res) => {
//   res.json({ success: true, posts });
// });

// // Get Posts by Category
// app.get('/api/posts/:category', (req, res) => {
//   const category = req.params.category.toLowerCase();
//   const filteredPosts = posts.filter(post => post.category?.toLowerCase() === category);

//   res.json({ success: true, posts: filteredPosts || [] });
// });

// // ✅ Delete Post by ID (NEW)
// // Delete post by ID (only owner can delete)
// app.delete('/api/posts/:id', authenticateToken, (req, res) => {
//   const postId = parseInt(req.params.id);
//   const postIndex = posts.findIndex(post => post.id === postId);

//   if (postIndex === -1) {
//     return res.status(404).json({ success: false, error: 'Post not found' });
//   }

//   const post = posts[postIndex];

//   // Check ownership
//   if (post.userId !== req.user.userId) {
//     return res.status(403).json({ success: false, error: 'Forbidden: Not your post' });
//   }

//   posts.splice(postIndex, 1);

//   res.json({ success: true, message: 'Post deleted successfully' });
// });




// // ✅ Fix GET post by ID
// app.get('/api/posts/:id', (req, res) => {
//   const { id } = req.params;
//   const post = posts.find(p => p.id === id); // or fetch from DB

//   if (!post) {
//     return res.status(404).json({ error: 'Post not found' });
//   }

//   res.json({ post });
// });

// // ✅ Fix PUT post by ID
// // Example: Express.js route to handle updating a post
// app.put('/api/posts/id/:id', async (req, res) => {
//   const { title, content } = req.body;
//   const postId = req.params.id;

//   if (!title || !content) {
//     return res.status(400).json({ error: 'Title and content are required' });
//   }

//   try {
//     const post = await Post.findById(postId); // Assuming you're using MongoDB with Mongoose
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     // Update the post
//     post.title = title;
//     post.content = content;
//     await post.save();

//     res.status(200).json({ success: true, post });
//   } catch (err) {
//     console.error(err);  // Log the error for debugging
//     res.status(500).json({ error: 'Failed to update the post.' });
//   }
// });


// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Upload directory: ${uploadDir}`);
//   console.log(`Available endpoints:`);
//   console.log(`- POST /api/auth/register`);
//   console.log(`- POST /api/auth/login`);
//   console.log(`- GET /api/auth/check`);
//   console.log(`- POST /api/upload`);
//   console.log(`- POST /api/posts`);
//   console.log(`- GET /api/posts`);
//   console.log(`- GET /api/posts/:category`);
//   console.log(`- DELETE /api/posts/:id`);
// });




















