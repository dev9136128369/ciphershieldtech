const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// CORS Middleware Setup
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer Configuration
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

// ✅ New `/submit-form` route
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

// Start Server
app.listen(8000, () => {
  console.log('🚀 Server is running on port 8000');
});




// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');

// const app = express();

// // CORS Configuration (Production + Development)
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://www.ciphershieldtech.com',
//   'https://yourdomain.com' // Apna production domain daalein
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.options('*', cors()); // Preflight requests handle kare

// // Body Parser Middleware
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// // Nodemailer Configuration with Improved Error Handling
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.GMAIL_USER, // .env file mein daalein
//     pass: process.env.GMAIL_APP_PASSWORD // Google App Password
//   },
//   tls: {
//     rejectUnauthorized: false // Development ke liye
//   },
//   logger: true, // Debugging ke liye
//   debug: true
// });

// // Test SMTP Connection Endpoint
// app.get('/test-smtp', async (req, res) => {
//   try {
//     await transporter.verify();
//     res.status(200).json({ 
//       success: true,
//       message: 'SMTP connection successful!'
//     });
//   } catch (error) {
//     console.error('SMTP Error:', error);
//     res.status(500).json({
//       success: false,
//       error: 'SMTP connection failed',
//       solution: 'Check your GMAIL_USER and GMAIL_APP_PASSWORD in .env file'
//     });
//   }
// });

// // Contact Form Endpoint
// app.post('/send-email', async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   // Input Validation
//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({
//       success: false,
//       error: 'All fields are required'
//     });
//   }

//   const mailOptions = {
//     from: `"Website Contact" <${process.env.GMAIL_USER}>`,
//     to: 'yashveersingh7648@gmail.com',
//     replyTo: email,
//     subject: `New Contact: ${subject}`,
//     html: `
//       <div style="font-family: Arial, sans-serif;">
//         <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
//         <p><strong>From:</strong> ${name} (${email})</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #3498db;">
//           <p>${message.replace(/\n/g, '<br>')}</p>
//         </div>
//         <p style="color: #7f8c8d; font-size: 0.9em;">
//           Sent from website contact form
//         </p>
//       </div>
//     `,
//     text: `New message from ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.messageId);
    
//     res.status(200).json({
//       success: true,
//       message: 'Email sent successfully!'
//     });
//   } catch (error) {
//     console.error('Email Error:', error);
    
//     let errorMessage = 'Failed to send email. Please try again.';
//     if (error.code === 'EAUTH') {
//       errorMessage = 'Email authentication failed. Check your credentials.';
//     }
    
//     res.status(500).json({
//       success: false,
//       error: errorMessage
//     });
//   }
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: 'Internal server error',
//     details: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// // Start Server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log('Test SMTP connection at /test-smtp');
// });// backend/server.js






// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const app = express();

// // ✅ CORS setup (React runs on port 5173 or 3000)
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-production-domain.com'],
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type'],
// }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // ✅ Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   }
// });

// // ✅ Contact form route
// app.post('/api/send-email', async (req, res) => {
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
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: '✅ Email sent successfully!' });
//   } catch (error) {
//     console.error('❌ Error:', error);
//     res.status(500).json({ error: 'Failed to send email.' });
//   }
// });

// app.listen(8000, () => {
//   console.log('🚀 Server is running on http://localhost:8000');
// });



// require('dotenv').config();
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const fs = require('fs');
// const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const app = express();

// // Create necessary directories
// const uploadDir = path.join(__dirname, 'uploads');
// const dataDir = path.join(__dirname, 'data');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
// if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// // Database files
// const postsFile = path.join(dataDir, 'posts.json');
// const usersFile = path.join(dataDir, 'users.json');

// // Initialize data files if they don't exist
// if (!fs.existsSync(postsFile)) fs.writeFileSync(postsFile, '[]');
// if (!fs.existsSync(usersFile)) {
//   const hashedPassword = bcrypt.hashSync('admin123', 10);
//   fs.writeFileSync(usersFile, JSON.stringify([{
//     id: 1,
//     email: 'admin@example.com',
//     password: hashedPassword,
//     role: 'admin'
//   }]));
// }

// // Load data
// let posts = JSON.parse(fs.readFileSync(postsFile));
// let users = JSON.parse(fs.readFileSync(usersFile));

// // Save data functions
// const savePosts = () => fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
// const saveUsers = () => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:8000', 'https://www.ciphershieldtech.com'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
// app.use(express.json());
// app.use('/uploads', express.static(uploadDir));

// // File upload setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|pdf|txt/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     extname && mimetype ? cb(null, true) : cb(new Error('Only images, PDFs, and text files are allowed'));
//   }
// });

// // Authentication middleware
// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Authentication required' });

//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// // Routes
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find(u => u.email === email);
  
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   const token = jwt.sign(
//     { userId: user.id, email: user.email, role: user.role },
//     process.env.JWT_SECRET || 'your-secret-key',
//     { expiresIn: '1h' }
//   );

//   res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
// });

// app.post('/api/upload', authenticate, upload.single('file'), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
//   res.json({
//     success: true,
//     filePath: `/uploads/${req.file.filename}`,
//     originalName: req.file.originalname,
//     size: req.file.size
//   });
// });

// app.post('/api/posts', authenticate, (req, res) => {
//   const { title, content, category, attachments } = req.body;
//   if (!title || !content || !category) {
//     return res.status(400).json({ error: 'Title, content and category are required' });
//   }

//   const newPost = {
//     id: Date.now(),
//     title,
//     content,
//     category,
//     attachments: attachments || [],
//     createdAt: new Date().toISOString(),
//     author: req.user.email
//   };

//   posts.push(newPost);
//   savePosts();
//   res.status(201).json(newPost);
// });

// app.delete('/api/posts/:id', authenticate, (req, res) => {
//   const postId = parseInt(req.params.id);
//   const postIndex = posts.findIndex(post => post.id === postId);
  
//   if (postIndex === -1) {
//     return res.status(404).json({ error: 'Post not found' });
//   }

//   // Check if user is author or admin
//   const post = posts[postIndex];
//   if (post.author !== req.user.email && req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Not authorized to delete this post' });
//   }

//   // Delete associated files
//   post.attachments?.forEach(filePath => {
//     const file = path.join(__dirname, filePath);
//     if (fs.existsSync(file)) fs.unlinkSync(file);
//   });

//   posts.splice(postIndex, 1);
//   savePosts();
//   res.json({ success: true, message: 'Post deleted successfully' });
// });

// app.get('/api/posts', (req, res) => {
//   res.json(posts);
// });

// app.get('/api/posts/:category', (req, res) => {
//   const category = req.params.category;
//   res.json(posts.filter(post => post.category === category));
// });

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ error: 'File upload error', message: err.message });
//   }
//   res.status(500).json({ error: 'Something went wrong' });
// });


// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📁 Uploads directory: ${uploadDir}`);
// });




// require('dotenv').config();
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const fs = require('fs');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const app = express();

// // Configuration
// const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret-key';
// const PORT = process.env.PORT || 8000;

// // Create necessary directories
// const uploadDir = path.join(__dirname, 'uploads');
// const dataDir = path.join(__dirname, 'data');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
// if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// // Database files
// const postsFile = path.join(dataDir, 'posts.json');
// const usersFile = path.join(dataDir, 'users.json');

// // Initialize data files if they don't exist
// if (!fs.existsSync(postsFile)) fs.writeFileSync(postsFile, '[]');
// if (!fs.existsSync(usersFile)) {
//   const hashedPassword = bcrypt.hashSync('admin123', 10);
//   fs.writeFileSync(usersFile, JSON.stringify([{
//     id: 1,
//     email: 'admin@example.com',
//     password: hashedPassword,
//     role: 'admin',
//     name: 'Admin User'
//   }]));
// }

// // Load data
// let posts = JSON.parse(fs.readFileSync(postsFile));
// let users = JSON.parse(fs.readFileSync(usersFile));

// // Save data functions
// const savePosts = () => fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
// const saveUsers = () => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:8000', 'https://www.ciphershieldtech.com'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
// app.use(express.json());
// app.use('/uploads', express.static(uploadDir));

// // File upload setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|pdf|txt/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     extname && mimetype ? cb(null, true) : cb(new Error('Only images, PDFs, and text files are allowed'));
//   }
// }).single('file');

// // Authentication middleware
// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Authentication required' });

//   try {
//     req.user = jwt.verify(token, JWT_SECRET);
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

// // Routes

// // User registration
// app.post('/api/register', async (req, res) => {
//   const { email, password, name } = req.body;
  
//   if (!email || !password || !name) {
//     return res.status(400).json({ error: 'Email, password, and name are required' });
//   }
  
//   if (users.some(u => u.email === email)) {
//     return res.status(400).json({ error: 'Email already registered' });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = {
//       id: Date.now(),
//       email,
//       password: hashedPassword,
//       name,
//       role: 'user'
//     };
    
//     users.push(newUser);
//     saveUsers();
    
//     const token = jwt.sign(
//       { userId: newUser.id, email: newUser.email, role: newUser.role },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );
    
//     res.status(201).json({ 
//       token, 
//       user: { 
//         id: newUser.id, 
//         email: newUser.email, 
//         name: newUser.name,
//         role: newUser.role 
//       } 
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // User login
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   const user = users.find(u => u.email === email);
  
//   if (!user) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   try {
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { userId: user.id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({ 
//       token, 
//       user: { 
//         id: user.id, 
//         email: user.email, 
//         name: user.name,
//         role: user.role 
//       } 
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// // Check authentication status
// app.get('/api/check-auth', authenticate, (req, res) => {
//   const user = users.find(u => u.id === req.user.userId);
//   if (!user) return res.status(404).json({ error: 'User not found' });
  
//   res.json({ 
//     user: { 
//       id: user.id, 
//       email: user.email, 
//       name: user.name,
//       role: user.role 
//     } 
//   });
// });

// // File upload
// app.post('/api/upload', authenticate, (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({ error: err.message });
//       } else {
//         return res.status(400).json({ error: err.message });
//       }
//     }
    
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }
    
//     res.json({
//       success: true,
//       filePath: `/uploads/${req.file.filename}`,
//       originalName: req.file.originalname,
//       size: req.file.size
//     });
//   });
// });

// // Blog post routes
// app.post('/api/posts', authenticate, (req, res) => {
//   const { title, content, category, attachments } = req.body;
  
//   if (!title || !content || !category) {
//     return res.status(400).json({ error: 'Title, content and category are required' });
//   }

//   const user = users.find(u => u.id === req.user.userId);
//   if (!user) return res.status(404).json({ error: 'User not found' });

//   const newPost = {
//     id: Date.now(),
//     title,
//     content,
//     category,
//     attachments: attachments || [],
//     createdAt: new Date().toISOString(),
//     author: user.email,
//     authorName: user.name
//   };

//   posts.push(newPost);
//   savePosts();
//   res.status(201).json(newPost);
// });

// app.get('/api/posts', (req, res) => {
//   res.json(posts);
// });

// app.get('/api/posts/:category', (req, res) => {
//   const category = req.params.category;
//   const categoryPosts = posts.filter(post => post.category === category);
//   res.json(categoryPosts);
// });

// app.delete('/api/posts/:id', authenticate, (req, res) => {
//   const postId = parseInt(req.params.id);
//   const postIndex = posts.findIndex(post => post.id === postId);
  
//   if (postIndex === -1) {
//     return res.status(404).json({ error: 'Post not found' });
//   }

//   const post = posts[postIndex];
//   const user = users.find(u => u.id === req.user.userId);
  
//   if (!user) return res.status(404).json({ error: 'User not found' });
  
//   // Check if user is author or admin
//   if (post.author !== user.email && user.role !== 'admin') {
//     return res.status(403).json({ error: 'Not authorized to delete this post' });
//   }

//   // Delete associated files
//   post.attachments?.forEach(filePath => {
//     const file = path.join(__dirname, filePath);
//     if (fs.existsSync(file)) fs.unlinkSync(file);
//   });

//   posts.splice(postIndex, 1);
//   savePosts();
//   res.json({ success: true, message: 'Post deleted successfully' });
// });

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong' });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📁 Uploads directory: ${uploadDir}`);
// });

// require('dotenv').config();
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const fs = require('fs');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const app = express();

// // Create necessary directories
// const uploadDir = path.join(__dirname, 'uploads');
// const dataDir = path.join(__dirname, 'data');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
// if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// // Database files
// const postsFile = path.join(dataDir, 'posts.json');
// const usersFile = path.join(dataDir, 'users.json');

// // Initialize data files if they don't exist
// if (!fs.existsSync(postsFile)) fs.writeFileSync(postsFile, '[]');
// if (!fs.existsSync(usersFile)) {
//   const hashedPassword = bcrypt.hashSync('admin123', 10);
//   fs.writeFileSync(usersFile, JSON.stringify([{
//     id: 1,
//     email: 'admin@example.com',
//     password: hashedPassword,
//     role: 'admin',
//     name: 'Admin User'
//   }]));
// }

// axios.post("http://localhost:8000/api/login", { email, password })
//   .then((res) => {
//     console.log("Login successful:", res.data);
//   })
//   .catch((err) => {
//     console.log("Login failed:", err.response.data.message); // backend se jo message aaya
//   });


// // Load data
// let posts = JSON.parse(fs.readFileSync(postsFile));
// let users = JSON.parse(fs.readFileSync(usersFile));

// // Save data functions
// const savePosts = () => fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
// const saveUsers = () => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:8000', 'https://www.ciphershieldtech.com'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());
// app.use('/uploads', express.static(uploadDir));

// // File upload setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|pdf|txt/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     extname && mimetype ? cb(null, true) : cb(new Error('Only images, PDFs, and text files are allowed'));
//   }
// });

// // Authentication middleware
// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Authentication required' });

//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// // Routes
// app.post('/api/register', async (req, res) => {
//   const { name, email, password } = req.body;
  
//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'Name, email and password are required' });
//   }
  
//   if (users.some(u => u.email === email)) {
//     return res.status(400).json({ error: 'Email already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = {
//     id: Date.now(),
//     name,
//     email,
//     password: hashedPassword,
//     role: 'user'
//   };

//   users.push(newUser);
//   saveUsers();

//   const token = jwt.sign(
//     { userId: newUser.id, email: newUser.email, role: newUser.role },
//     process.env.JWT_SECRET || 'your-secret-key',
//     { expiresIn: '1h' }
//   );

//   res.status(201).json({ 
//     token, 
//     user: { 
//       id: newUser.id, 
//       name: newUser.name,
//       email: newUser.email, 
//       role: newUser.role 
//     } 
//   });
// });

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   // Input validation
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   const user = users.find(u => u.email === email);
  
//   if (!user) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   try {
//     // Compare passwords with bcrypt
//     const passwordMatch = await bcrypt.compare(password, user.password);
    
//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Create token
//     const token = jwt.sign(
//       {
//         userId: user.id,
//         email: user.email,
//         role: user.role
//       },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '1h' }
//     );

//     res.json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/api/check-auth', authenticate, (req, res) => {
//   const user = users.find(u => u.id === req.user.userId);
//   if (!user) return res.status(404).json({ error: 'User not found' });
  
//   res.json({ 
//     user: { 
//       id: user.id, 
//       name: user.name,
//       email: user.email, 
//       role: user.role 
//     } 
//   });
// });

// app.post('/api/upload', authenticate, upload.single('file'), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
//   res.json({
//     success: true,
//     filePath: `/uploads/${req.file.filename}`,
//     originalName: req.file.originalname,
//     size: req.file.size
//   });
// });

// app.post('/api/posts', authenticate, (req, res) => {
//   const { title, content, category, attachments } = req.body;
//   if (!title || !content || !category) {
//     return res.status(400).json({ error: 'Title, content and category are required' });
//   }

//   const user = users.find(u => u.id === req.user.userId);
//   if (!user) return res.status(404).json({ error: 'User not found' });

//   const newPost = {
//     id: Date.now(),
//     title,
//     content,
//     category,
//     attachments: attachments || [],
//     createdAt: new Date().toISOString(),
//     authorId: user.id,
//     authorName: user.name,
//     authorEmail: user.email
//   };

//   posts.push(newPost);
//   savePosts();
//   res.status(201).json(newPost);
// });

// app.delete('/api/posts/:id', authenticate, (req, res) => {
//   const postId = parseInt(req.params.id);
//   const postIndex = posts.findIndex(post => post.id === postId);
  
//   if (postIndex === -1) {
//     return res.status(404).json({ error: 'Post not found' });
//   }

//   // Check if user is author or admin
//   const post = posts[postIndex];
//   if (post.authorId !== req.user.userId && req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Not authorized to delete this post' });
//   }

//   // Delete associated files
//   post.attachments?.forEach(filePath => {
//     const file = path.join(__dirname, filePath);
//     if (fs.existsSync(file)) fs.unlinkSync(file);
//   });

//   posts.splice(postIndex, 1);
//   savePosts();
//   res.json({ success: true, message: 'Post deleted successfully' });
// });

// app.get('/api/posts', (req, res) => {
//   res.json(posts);
// });

// app.get('/api/posts/:category', (req, res) => {
//   const category = req.params.category;
//   res.json(posts.filter(post => post.category === category));
// });

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ error: 'File upload error', message: err.message });
//   }
//   res.status(500).json({ error: 'Something went wrong' });
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📁 Uploads directory: ${uploadDir}`);
// });



// require('dotenv').config();
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const fs = require('fs');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// const { v4: uuidv4 } = require('uuid'); // Add this for UUID support

// const app = express();

// // Config
// const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret-key';
// const PORT = process.env.PORT || 8000;
// const uploadDir = path.join(__dirname, 'uploads');
// const dataDir = path.join(__dirname, 'data');
// const postsFile = path.join(dataDir, 'posts.json');
// const usersFile = path.join(dataDir, 'users.json');

// // Middleware
// const corsOptions = {
//   origin: ['http://localhost:5173', 'http://localhost:8000', 'https://www.ciphershieldtech.com'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// };
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(uploadDir));

// // Initialize data
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
// if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
// if (!fs.existsSync(postsFile)) fs.writeFileSync(postsFile, '[]');
// if (!fs.existsSync(usersFile)) {
//   const hashedPassword = bcrypt.hashSync('admin123', 10);
//   fs.writeFileSync(usersFile, JSON.stringify([{
//     id: 1,
//     email: 'admin@example.com',
//     password: hashedPassword,
//     role: 'admin',
//     name: 'Admin User'
//   }]));
// }

// let posts = JSON.parse(fs.readFileSync(postsFile));
// let users = JSON.parse(fs.readFileSync(usersFile));

// const savePosts = () => fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
// const saveUsers = () => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

// // Multer Setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|pdf|txt/;
//     const isValid = filetypes.test(path.extname(file.originalname).toLowerCase()) && filetypes.test(file.mimetype);
//     isValid ? cb(null, true) : cb(new Error('Only JPEG, PNG, PDF, or TXT files are allowed'));
//   }
// }).single('file');

// // Auth Middleware
// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Authentication required' });

//   try {
//     req.user = jwt.verify(token, JWT_SECRET);
//     next();
//   } catch {
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

// // Blog Posts Routes
// app.get('/api/posts', (req, res) => {
//   res.json(posts);
// });

// app.get('/api/posts/:id', (req, res) => {
//   const post = posts.find(p => p.id === req.params.id);
//   if (post) {
//     res.json(post);
//   } else {
//     res.status(404).json({ error: 'Post not found' });
//   }
// });

// app.post('/api/posts', authenticate, (req, res) => {
//   const { title, content, images = [], category } = req.body;
  
//   const newPost = {
//     id: uuidv4(), // Using UUID instead of Date.now()
//     title,
//     content,
//     images,
//     category,
//     author: req.user.email,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     likes: 0,
//     comments: []
//   };
  
//   posts.push(newPost);
//   savePosts();
//   res.status(201).json(newPost);
// });

// app.put('/api/posts/:id', authenticate, (req, res) => {
//   const postIndex = posts.findIndex(p => p.id === req.params.id);
//   if (postIndex === -1) return res.status(404).json({ error: 'Post not found' });

//   // Check if user is author or admin
//   if (posts[postIndex].author !== req.user.email && req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Unauthorized to edit this post' });
//   }

//   const { title, content, images } = req.body;
//   posts[postIndex] = {
//     ...posts[postIndex],
//     title: title || posts[postIndex].title,
//     content: content || posts[postIndex].content,
//     images: images || posts[postIndex].images,
//     updatedAt: new Date().toISOString()
//   };

//   savePosts();
//   res.json(posts[postIndex]);
// });

// app.delete('/api/posts/:id', authenticate, (req, res) => {
//   const postIndex = posts.findIndex(p => p.id === req.params.id);
//   if (postIndex === -1) return res.status(404).json({ error: 'Post not found' });

//   // Check if user is author or admin
//   if (posts[postIndex].author !== req.user.email && req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Unauthorized to delete this post' });
//   }

//   const deletedPost = posts.splice(postIndex, 1);
//   savePosts();
//   res.json(deletedPost[0]);
// });

// // Comments Routes
// app.post('/api/posts/:id/comments', authenticate, (req, res) => {
//   const postIndex = posts.findIndex(p => p.id === req.params.id);
//   if (postIndex === -1) return res.status(404).json({ error: 'Post not found' });

//   const { text } = req.body;
//   if (!text) return res.status(400).json({ error: 'Comment text is required' });

//   const newComment = {
//     id: uuidv4(),
//     text,
//     author: req.user.email,
//     createdAt: new Date().toISOString()
//   };

//   posts[postIndex].comments.push(newComment);
//   savePosts();
//   res.status(201).json(newComment);
// });

// // Like/Unlike Routes
// app.post('/api/posts/:id/like', authenticate, (req, res) => {
//   const postIndex = posts.findIndex(p => p.id === req.params.id);
//   if (postIndex === -1) return res.status(404).json({ error: 'Post not found' });

//   const userLikeIndex = posts[postIndex].likes.findIndex(
//     like => like.user === req.user.email
//   );

//   if (userLikeIndex === -1) {
//     // Add like
//     posts[postIndex].likes.push({
//       user: req.user.email,
//       createdAt: new Date().toISOString()
//     });
//   } else {
//     // Remove like
//     posts[postIndex].likes.splice(userLikeIndex, 1);
//   }

//   savePosts();
//   res.json({
//     likes: posts[postIndex].likes.length,
//     isLiked: userLikeIndex === -1
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const fs = require("fs");

// const app = express();
// const PORT = 8000;

// app.use(cors());
// app.use(bodyParser.json());

// app.post("/api/articles", (req, res) => {
//   const { title, content } = req.body;
//   if (!title || !content) return res.status(400).json({ message: "Missing fields" });

//   const article = { id: Date.now(), title, content };
//   const existing = JSON.parse(fs.readFileSync("articles.json", "utf8") || "[]");
//   existing.push(article);
//   fs.writeFileSync("articles.json", JSON.stringify(existing, null, 2));

//   res.json({ message: "Article saved", article });
// });

// app.get("/api/articles", (req, res) => {
//   const articles = JSON.parse(fs.readFileSync("articles.json", "utf8") || "[]");
//   res.json(articles);
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });






// === server/server.js ===
// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const app = express();
// const { v4: uuidv4 } = require('uuid');
// // Configuration
// const SECRET = process.env.JWT_SECRET || "your_jwt_secret_should_be_strong_and_in_env";
// const PORT = process.env.PORT || 8000;
// const UPLOAD_DIR = path.join(__dirname, "uploads");

// // Ensure directories exist
// if (!fs.existsSync("data")) fs.mkdirSync("data");
// if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// const USERS_FILE = path.join(__dirname, "data", "users.json");
// const ARTICLES_FILE = path.join(__dirname, "data", "articles.json");

// // Initialize empty files if they don't exist
// if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]", "utf8");
// if (!fs.existsSync(ARTICLES_FILE)) fs.writeFileSync(ARTICLES_FILE, "[]", "utf8");

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173', 'http://localhost:8000'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));
// app.use(express.json());
// app.use("/uploads", express.static(UPLOAD_DIR));

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, UPLOAD_DIR);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ 
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "application/pdf"];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type. Only images, videos and PDFs are allowed"), false);
//     }
//   },
//   limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
// });

// // Utility functions
// const readJSON = (file) => {
//   try {
//     const data = fs.readFileSync(file, "utf8");
//     return data ? JSON.parse(data) : [];
//   } catch (err) {
//     console.error(`Error reading ${file}:`, err);
//     return [];
//   }
// };

// const writeJSON = (file, data) => {
//   try {
//     fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
//     return true;
//   } catch (err) {
//     console.error(`Error writing to ${file}:`, err);
//     throw err;
//   }
// };

// // Auth Middleware
// function verifyToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  
//   if (!token) return res.status(401).json({ error: "Access token required" });
  
//   try {
//     const decoded = jwt.verify(token, SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error("JWT Verification Error:", err);
//     res.status(403).json({ error: "Invalid or expired token" });
//   }
// }

// // === Routes ===

// // Health Check
// app.get("/api/health", (req, res) => {
//   res.json({ 
//     status: "OK",
//     server: "Blog API",
//     time: new Date().toISOString()
//   });
// });

// // Register
// app.post("/api/auth/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const users = readJSON(USERS_FILE);
    
//     if (users.some(u => u.email === email)) {
//       return res.status(409).json({ error: "User already exists" });
//     }

//     const hashed = await bcrypt.hash(password, 10);
//     const newUser = { 
//       id: Date.now().toString(), 
//       name, 
//       email, 
//       password: hashed,
//       createdAt: new Date().toISOString()
//     };

//     users.push(newUser);
//     writeJSON(USERS_FILE, users);
    
//     res.status(201).json({ 
//       message: "User registered successfully",
//       user: { id: newUser.id, name: newUser.name, email: newUser.email }
//     });
//   } catch (err) {
//     console.error("Registration Error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Login
// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const users = readJSON(USERS_FILE);
//     const user = users.find(u => u.email === email);
    
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user.id, name: user.name, email: user.email }, 
//       SECRET,
//       { expiresIn: "24h" }
//     );

//     console.log("Generated token:", token); // Log the token for testing
//     res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
//   } catch (err) {
//     console.error("Login Error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // File upload endpoint
// app.post("/api/upload", verifyToken, upload.single("media"), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const fileUrl = `/uploads/${req.file.filename}`;
    
//     res.json({ 
//       url: fileUrl,
//       type: req.file.mimetype.startsWith("image") ? "image" : 
//             req.file.mimetype.startsWith("video") ? "video" : "file",
//       filename: req.file.filename
//     });
//   } catch (err) {
//     console.error("Upload Error:", err);
//     res.status(500).json({ error: "File upload failed" });
//   }
// });

// // Get all articles (published only for public, all for owner)
// app.get("/api/articles", (req, res) => {
//   try {
//     const articles = readJSON(ARTICLES_FILE);
//     const token = req.headers["authorization"]?.split(" ")[1];

//     if (token) {
//       try {
//         const decoded = jwt.verify(token, SECRET);
//         // Return all articles for logged in users
//         res.json(articles);
//         return;
//       } catch (err) {
//         // Token invalid, fall through to public view
//       }
//     }

//     // Public view - only published articles
//     const publishedArticles = articles.filter(a => a.status === "published");
//     res.json(publishedArticles);
//   } catch (err) {
//     console.error("Get Articles Error:", err);
//     res.status(500).json({ error: "Failed to fetch articles" });
//   }
// });

// // Create article
// app.post("/api/articles", verifyToken, (req, res) => {
//   try {
//     const { title, content, status = "draft" } = req.body;
    
//     if (!title || !content) {
//       return res.status(400).json({ error: "Title and content are required" });
//     }

//     const articles = readJSON(ARTICLES_FILE);
//     const newArticle = { 
//       id: uuidv4(),
//       userId: req.user.id,
//       author: req.user.name,
//       title,
//       content,
//       status,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     };

//     articles.push(newArticle);
//     writeJSON(ARTICLES_FILE, articles);
    
//     console.log("Created article:", newArticle); // Log the created article
//     res.status(201).json(newArticle);
//   } catch (err) {
//     console.error("Create Article Error:", err);
//     res.status(500).json({ error: "Failed to create article" });
//   }
// });

// // Get one article
// // Update your article retrieval endpoint
// // Get one article
// app.get("/api/articles/:id", (req, res) => {
//   try {
//     console.log(`Looking for article with ID: ${req.params.id}`);
    
//     const articles = readJSON(ARTICLES_FILE);
//     console.log(`Available article IDs: ${articles.map(a => a.id)}`);
    
//     const article = articles.find(a => a.id === req.params.id);

//     if (!article) {
//       console.log('Article not found in database');
//       return res.status(404).json({ 
//         error: "Article not found",
//         message: "The requested blog post does not exist"
//       });
//     }

//     // Rest of your existing code...
//   } catch (err) {
//     console.error("Detailed error:", err);
//     return res.status(500).json({ 
//       error: "Server error",
//       message: "Failed to retrieve the article"
//     });
//   }
// });

// // Edit article
// app.put("/api/articles/:id", verifyToken, (req, res) => {
//   try {
//     const { title, content, status } = req.body;
    
//     if (!title && !content && !status) {
//       return res.status(400).json({ error: "No fields to update" });
//     }

//     const articles = readJSON(ARTICLES_FILE);
//     const index = articles.findIndex(a => a.id === req.params.id);
    
//     if (index === -1) {
//       return res.status(404).json({ error: "Article not found" });
//     }
    
//     if (articles[index].userId !== req.user.id) {
//       return res.status(403).json({ error: "Not authorized to edit this article" });
//     }

//     // Update only provided fields
//     if (title) articles[index].title = title;
//     if (content) articles[index].content = content;
//     if (status) articles[index].status = status;
//     articles[index].updatedAt = new Date().toISOString();
    
//     writeJSON(ARTICLES_FILE, articles);
    
//     res.json(articles[index]);
//   } catch (err) {
//     console.error("Update Article Error:", err);
//     res.status(500).json({ error: "Failed to update article" });
//   }
// });

// // Delete article
// app.delete("/api/articles/:id", verifyToken, (req, res) => {
//   try {
//     let articles = readJSON(ARTICLES_FILE);
//     const article = articles.find(a => a.id === req.params.id);
    
//     if (!article) {
//       return res.status(404).json({ error: "Article not found" });
//     }
    
//     if (article.userId !== req.user.id) {
//       return res.status(403).json({ error: "Not authorized to delete this article" });
//     }
    
//     articles = articles.filter(a => a.id !== req.params.id);
//     writeJSON(ARTICLES_FILE, articles);
    
//     res.json({ message: "Article deleted successfully" });
//   } catch (err) {
//     console.error("Delete Article Error:", err);
//     res.status(500).json({ error: "Failed to delete article" });
//   }
// });

// // Publish/Unpublish article
// app.patch("/api/articles/:id/publish", verifyToken, (req, res) => {
//   try {
//     const articles = readJSON(ARTICLES_FILE);
//     const index = articles.findIndex(a => a.id === req.params.id);
    
//     if (index === -1) {
//       return res.status(404).json({ error: "Article not found" });
//     }
    
//     if (articles[index].userId !== req.user.id) {
//       return res.status(403).json({ error: "Not authorized to modify this article" });
//     }

//     // Toggle publish status
//     const newStatus = articles[index].status === "published" ? "draft" : "published";
//     articles[index].status = newStatus;
//     articles[index].updatedAt = new Date().toISOString();
    
//     writeJSON(ARTICLES_FILE, articles);
    
//     res.json({
//       message: `Article ${newStatus === "published" ? "published" : "unpublished"} successfully`,
//       article: articles[index]
//     });
//   } catch (err) {
//     console.error("Publish Error:", err);
//     res.status(500).json({ error: "Failed to update article status" });
//   }
// });




// // ...............

// function verifyToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
  
//   if (!token) {
//     return res.status(401).json({ 
//       error: "Access token required",
//       message: "Please login to access this resource"
//     });
//   }
  
//   try {
//     const decoded = jwt.verify(token, SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error("JWT Error:", err.message);
//     res.status(403).json({ 
//       error: "Invalid token",
//       message: "Your session has expired. Please login again."
//     });
//   }
// }
// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
  
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ 
//       error: "File upload error",
//       message: err.message 
//     });
//   } else if (err) {
//     return res.status(500).json({ 
//       error: "Internal server error",
//       message: err.message 
//     });
//   }
  
//   next();
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log(`Upload directory: ${UPLOAD_DIR}`);
// }).on("error", (err) => {
//   console.error("Server failed to start:", err);
//   if (err.code === "EADDRINUSE") {
//     console.error(`Port ${PORT} is already in use`);
//     process.exit(1);
//   }
// });