// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const app = express();

// // CORS Middleware Setup
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000'], 
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Nodemailer Configuration
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

// // ✅ New `/submit-form` route
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

// app.post('/send-email', async (req, res) => {
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

// // Start Server
// app.listen(8000, () => {
//   console.log('🚀 Server is running on port 8000');
// });




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




require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const app = express();

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret-key';
const PORT = process.env.PORT || 8000;

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter failed:', error);
  } else {
    console.log('Email transporter is ready');
  }
});

// Create necessary directories
const uploadDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Database files
const postsFile = path.join(dataDir, 'posts.json');
const usersFile = path.join(dataDir, 'users.json');

// Initialize data files
if (!fs.existsSync(postsFile)) fs.writeFileSync(postsFile, '[]');
if (!fs.existsSync(usersFile)) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  fs.writeFileSync(usersFile, JSON.stringify([{
    id: 1,
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    name: 'Admin User'
  }]));
}

// Load data
let posts = JSON.parse(fs.readFileSync(postsFile));
let users = JSON.parse(fs.readFileSync(usersFile));

// Save data functions
const savePosts = () => fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
const saveUsers = () => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8000', 'https://www.ciphershieldtech.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|txt/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    extname && mimetype ? cb(null, true) : cb(new Error('Only images, PDFs, and text files are allowed'));
  }
}).single('file');

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};




app.post('/login-email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    // Send Login Confirmation Email to User
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Login Successful - CipherERP',
      html: `
        <h2>Welcome Back to CipherERP!</h2>
        <p>You have successfully logged in to your CipherERP account.</p>
        <p>If this was not you, please contact our support team immediately.</p>
        <p>Best regards,<br/>CipherERP Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Login Confirmation Email Sent Successfully:', email);

    res.status(200).json({ success: true, message: 'Login confirmation email sent.' });
  } catch (error) {
    console.error('❌ Email Sending Error:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

// Routes

// User registration
app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }
  
  // Normalize email
  const normalizedEmail = email.toLowerCase().trim();
  
  if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      email: normalizedEmail,
      password: hashedPassword,
      name,
      role: 'user'
    };
    
    users.push(newUser);
    saveUsers();
    
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.status(201).json({ 
      token, 
      user: { 
        id: newUser.id, 
        email: newUser.email, 
        name: newUser.name,
        role: newUser.role 
      } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// User login with email notification
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt for:', email);
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Normalize email
  const normalizedEmail = email.toLowerCase().trim();
  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send email notification
    try {
      await transporter.sendMail({
        from: `"Blog System" <${process.env.EMAIL_USER}>`,
        to: 'yashveersingh7648@gmail.com',
        subject: 'New Login Detected',
        html: `
          <h2>New User Login</h2>
          <p>A user has logged into your blog system:</p>
          <ul>
            <li><strong>Name:</strong> ${user.name}</li>
            <li><strong>Email:</strong> ${user.email}</li>
            <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
            <li><strong>IP:</strong> ${req.ip}</li>
          </ul>
        `
      });
      console.log('Login notification email sent');
    } catch (emailError) {
      console.error('Failed to send login email:', emailError);
    }

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        role: user.role 
      } 
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Check authentication status
app.get('/api/check-auth', authenticate, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  res.json({ 
    user: { 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role 
    } 
  });
});

// File upload
app.post('/api/upload', authenticate, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else {
        return res.status(400).json({ error: err.message });
      }
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({
      success: true,
      filePath: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      size: req.file.size
    });
  });
});

// Blog post routes
app.post('/api/posts', authenticate, (req, res) => {
  const { title, content, category, attachments } = req.body;
  
  if (!title || !content || !category) {
    return res.status(400).json({ error: 'Title, content and category are required' });
  }

  const user = users.find(u => u.id === req.user.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const newPost = {
    id: Date.now(),
    title,
    content,
    category,
    attachments: attachments || [],
    createdAt: new Date().toISOString(),
    author: user.email,
    authorName: user.name
  };

  posts.push(newPost);
  savePosts();
  res.status(201).json(newPost);
});

// Other routes...

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${uploadDir}`);
});