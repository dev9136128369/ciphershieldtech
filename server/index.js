const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const slugify = require('slugify');

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ciphershield').then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Schema & Model
const articleSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  attachments: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Article = mongoose.model("Article", articleSchema);

app.use('/uploads', express.static('server/uploads'));


//partner schema 

// Add this with your other schemas
const partnerSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  companyName: String,
  companyWebsite: String,
  numberOfEmployees: Number,
  turnover: String,
  numberOfBranches: Number,
  area: String,
  areaInSqFt: Number,
  bankName: String,
  bankAddress: String,
  accountNumber: String,
  ifsc: String,
  panCard: String,  // Store file path
  msmemCard: String, // Store file path
  aadhaarCard: String, // Store file path
  gstNumber: String,
  state: String,
  city: String,
  pinCode: String,
  mobile: String,
  email: String,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

const Partner = mongoose.model("Partner", partnerSchema);

// blog Schema 

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  media: [{
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], required: true },
    caption: { type: String, default: '' },
    isLocal: { type: Boolean, default: true },
    width: { type: String, default: '100%' }
  }],
  bannerImage: {
    url: String,
    isLocal: Boolean
  },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
  urlSlug: { type: String, required: true, unique: true },
  titleStyles: mongoose.Schema.Types.Mixed,
  contentStyles:mongoose.Schema.Types.Mixed,
  author: {
    id: String,
    name: String,
    email: String
  }
}, { timestamps: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Server Config
const PORT = process.env.PORT || 8000;
const UPLOAD_DIR = path.join(__dirname, "uploads");

// Create upload directory
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Middleware

app.use(cors({
  origin: 'http://localhost:5173', // This allows requests from localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use("/uploads", express.static(UPLOAD_DIR));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/quicktime"];
    cb(allowed.includes(file.mimetype) ? null : new Error("Invalid file type"), true);
  },
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// Nodemailer config
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: { rejectUnauthorized: false }
});

// Routes


function generateSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

// Ensures the slug is unique in the database
async function ensureUniqueSlug(baseSlug, postId = null) {
  let slug = baseSlug;
  let counter = 1;

  let existingPost = await BlogPost.findOne({ urlSlug: slug });
  while (existingPost && (!postId || existingPost._id.toString() !== postId.toString())) {
    slug = `${baseSlug}-${counter++}`;
    existingPost = await BlogPost.findOne({ urlSlug: slug });
  }

  return slug;
}

app.post('/api/blogs/publish', 
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'mediaFiles', maxCount: 10 }
  ]), 
  async (req, res) => {
    try {
      const blogData = JSON.parse(req.body.blogData);

      // Process files
      const bannerImage = req.files['bannerImage'] ? {
        url: `/uploads/${req.files['bannerImage'][0].filename}`,
        isLocal: true
      } : null;

      const mediaFiles = req.files['mediaFiles'] || [];
      const mediaUrls = blogData.mediaUrls || [];
      const mediaCaptions = blogData.mediaCaptions || [];
      const mediaTypes = blogData.mediaTypes || [];

      const media = [
        ...mediaFiles.map((file, index) => ({
          url: `/uploads/${file.filename}`,
          type: file.mimetype.startsWith('image') ? 'image' : 'video',
          caption: mediaCaptions[index] || '',
          isLocal: true,
          width: '100%'
        })),
        ...mediaUrls.map((url, index) => ({
          url,
          type: mediaTypes[index] || (url.includes('youtube') || url.includes('vimeo') ? 'video' : 'image'),
          caption: mediaCaptions[index + mediaFiles.length] || '',
          isLocal: false,
          width: '100%'
        }))
      ];

      // Ensure slug is unique
      const baseSlug = blogData.urlSlug || generateSlug(blogData.title);
      const uniqueSlug = await ensureUniqueSlug(baseSlug, blogData._id);

      const completeBlogData = {
        ...blogData,
        media,
        bannerImage,
        urlSlug: uniqueSlug
      };

      let blogPost;
      if (blogData._id) {
        blogPost = await BlogPost.findByIdAndUpdate(blogData._id, completeBlogData, { new: true });
      } else {
        blogPost = new BlogPost(completeBlogData);
        await blogPost.save();
      }

      res.status(blogData._id ? 200 : 201).json({ 
        message: `Blog ${blogData._id ? 'updated' : 'published'} successfully!`, 
        blogPost 
      });

    } catch (error) {
      console.error('Error:', error);

      if (req.files) {
        Object.values(req.files).flat().forEach(file => {
          fs.unlinkSync(path.join(UPLOAD_DIR, file.filename));
        });
      }

      res.status(500).json({ 
        message: 'Error processing blog', 
        error: error.message 
      });
    }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      titleFormatting,
      content,
      media,
      bannerImage,
      seoTitle,
      seoDescription,
      seoKeywords,
      urlSlug,
    } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        titleFormatting,
        content,
        media,
        bannerImage,
        seoTitle,
        seoDescription,
        seoKeywords,
        urlSlug,
      },
      { new: true } // return the updated blog
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ error: 'Error updating blog', details: err.message });
  }
});







// Add this with your other routes
app.post("/api/partner-registration", upload.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'msmemCard', maxCount: 1 },
  { name: 'aadhaarCard', maxCount: 1 }
]), async (req, res) => {
  try {
    const { 
      name, companyName, companyWebsite, numberOfEmployees, 
      turnover, numberOfBranches, area, areaInSqFt,
      bankName, bankAddress, accountNumber, ifsc,
      gstNumber, state, city, pinCode, mobile, email, address
    } = req.body;

    // Get file paths
    const panCardPath = req.files['panCard'] ? `/uploads/${req.files['panCard'][0].filename}` : null;
    const msmemCardPath = req.files['msmemCard'] ? `/uploads/${req.files['msmemCard'][0].filename}` : null;
    const aadhaarCardPath = req.files['aadhaarCard'] ? `/uploads/${req.files['aadhaarCard'][0].filename}` : null;

    const newPartner = new Partner({
      name,
      companyName,
      companyWebsite,
      numberOfEmployees: parseInt(numberOfEmployees),
      turnover,
      numberOfBranches: parseInt(numberOfBranches),
      area,
      areaInSqFt: parseInt(areaInSqFt),
      bankName,
      bankAddress,
      accountNumber,
      ifsc,
      panCard: panCardPath,
      msmemCard: msmemCardPath,
      aadhaarCard: aadhaarCardPath,
      gstNumber,
      state,
      city,
      pinCode,
      mobile,
      email,
      address
    });

    await newPartner.save();
    res.status(201).json({ success: true, message: "Partner registered successfully" });
  } catch (err) {
    console.error("Partner registration error:", err);
    res.status(500).json({ error: "Failed to register partner" });
  }
});



app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    server: "Blog API",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    time: new Date().toISOString()
  });
});


app.get("/Components/Blog/blogpost", async (req, res) => {
  try {
    const articles = await BlogPost.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error("Get articles error:", err);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error("Get articles error:", err);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

app.post("/api/articles", upload.array('files'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ error: "Title, content, and category are required." });
    }

    const attachments = req.files.map(file => `/uploads/${file.filename}`);
    const newArticle = new Article({ title, content, category, attachments });
    const saved = await newArticle.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create article error:", err);
    res.status(500).json({ error: "Failed to create article" });
  }
});


// Deleting Blog 
app.delete(`/Components/Blog/blogpost/:id`,async(req,res)=>{
    try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "blog not found" });
    res.json({ success: true, message: "blog deleted" });
  } catch (err) {
    console.error("Delete blog error:", err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});
app.delete("/api/articles/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Article not found" });
    res.json({ success: true, message: "Article deleted" });
  } catch (err) {
    console.error("Delete article error:", err);
    res.status(500).json({ error: "Failed to delete article" });
  }
});

// To Edit The portfolio

app.get(`/api/posts/id/:postId`, async (req, res) => {
  try {
    const post = await Article.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// get blog for edit

app.get(`/Components/Blog/blogpost/:postId`, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.put(
  '/Components/Blog/blogpost/:id',
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'media' }
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, titleStyles } = req.body;

      const updatedData = {
        title,
        content,
        titleStyles: JSON.parse(titleStyles)
      };

      // Handle banner image
      if (req.files['bannerImage']) {
        updatedData.bannerImage = `/uploads/${req.files['bannerImage'][0].filename}`;
      }

      // Handle media files
      if (req.files['media']) {
        const mediaFiles = req.files['media'].map(file => `/uploads/${file.filename}`);
        updatedData.media = mediaFiles;
      }

      const updatedPost = await BlogPost.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      res.status(200).json({ message: 'Blog post updated', post: updatedPost });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PUT /api/posts/id/:postId
app.put('/api/posts/id/:postId', upload.single('attachment'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const { postId } = req.params;

    const existingPost = await Article.findById(postId);
    if (!existingPost) return res.status(404).json({ message: 'Post not found' });

    // Delete old file if new one is uploaded
    if (req.file) {
      if (existingPost.attachments && existingPost.attachments.length > 0) {
        const oldFilePath = path.join(UPLOAD_DIR, path.basename(existingPost.attachments[0]));
        if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
      }

      existingPost.attachments = [`/uploads/${req.file.filename}`];
    }

    // Update fields
    existingPost.title = title;
    existingPost.content = content;
    existingPost.category = category;

    const updatedPost = await existingPost.save();

    res.json({ message: 'Post updated', post: updatedPost });
  } catch (error) {
    console.error('Update Error:', error.message);
    res.status(500).json({ message: 'Failed to update post' });
  }
});



// Contact Form Routes
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
      <h2>New Application</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Designation:</strong> ${designation}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: '✅ Email sent!' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: '❌ Failed to send email.' });
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
      <h2>Contact Form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: '✅ Email sent successfully!' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: '❌ Failed to send email.' });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: "File upload error", message: err.message });
  }
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Uploads available at /uploads`);
});


















































// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const fs = require("fs");
// const path = require("path");
// const multer = require("multer");
// const nodemailer = require('nodemailer');
// const { v4: uuidv4 } = require('uuid');
// require('dotenv').config();

// const app = express();

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ciphershield').then(() => {
//   console.log('✅ Connected to MongoDB');
// }).catch(err => {
//   console.error('❌ MongoDB connection error:', err);
// });

// // Schema & Model
// const articleSchema = new mongoose.Schema({
//   _id: { type: String, default: uuidv4 },
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   category: { type: String, required: true },
//   attachments: [String],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });
// const Article = mongoose.model("Article", articleSchema);

// // Server Config
// const PORT = process.env.PORT || 8000;
// const UPLOAD_DIR = path.join(__dirname, "uploads");

// // Create upload directory
// if (!fs.existsSync(UPLOAD_DIR)) {
//   fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// }

// // Middleware

// app.use(cors({
//   origin: 'http://localhost:5173', // This allows requests from localhost:5173
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// app.use(express.json());
// app.use("/uploads", express.static(UPLOAD_DIR));

// // Multer config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, UPLOAD_DIR),
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowed = ["image/jpeg", "image/png", "application/pdf", "text/plain"];
//     cb(allowed.includes(file.mimetype) ? null : new Error("Invalid file type"), true);
//   },
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// });

// // Nodemailer config
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
//   tls: { rejectUnauthorized: false }
// });

// // Routes
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "OK",
//     server: "Blog API",
//     database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
//     time: new Date().toISOString()
//   });
// });

// app.get("/api/articles", async (req, res) => {
//   try {
//     const articles = await Article.find().sort({ createdAt: -1 });
//     res.json(articles);
//   } catch (err) {
//     console.error("Get articles error:", err);
//     res.status(500).json({ error: "Failed to fetch articles" });
//   }
// });

// app.post("/api/articles", upload.array('files'), async (req, res) => {
//   try {
//     const { title, content, category } = req.body;
//     if (!title || !content || !category) {
//       return res.status(400).json({ error: "Title, content, and category are required." });
//     }

//     const attachments = req.files.map(file => `/uploads/${file.filename}`);
//     const newArticle = new Article({ title, content, category, attachments });
//     const saved = await newArticle.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error("Create article error:", err);
//     res.status(500).json({ error: "Failed to create article" });
//   }
// });

// app.delete("/api/articles/:id", async (req, res) => {
//   try {
//     const deleted = await Article.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: "Article not found" });
//     res.json({ success: true, message: "Article deleted" });
//   } catch (err) {
//     console.error("Delete article error:", err);
//     res.status(500).json({ error: "Failed to delete article" });
//   }
// });

// // Contact Form Routes
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
//       <h2>New Application</h2>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>State:</strong> ${state}</p>
//       <p><strong>Designation:</strong> ${designation}</p>
//       <p><strong>Contact:</strong> ${contact}</p>
//       <p><strong>Gender:</strong> ${gender}</p>
//       <p><strong>Message:</strong> ${message}</p>
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: '✅ Email sent!' });
//   } catch (err) {
//     console.error('Email error:', err);
//     res.status(500).json({ error: '❌ Failed to send email.' });
//   }
// });

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
//       <h2>Contact Form</h2>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Subject:</strong> ${subject}</p>
//       <p><strong>Message:</strong> ${message}</p>
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: '✅ Email sent successfully!' });
//   } catch (err) {
//     console.error('Email error:', err);
//     res.status(500).json({ error: '❌ Failed to send email.' });
//   }
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ error: "File upload error", message: err.message });
//   }
//   console.error("Unhandled error:", err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
//   console.log(`📁 Uploads available at /uploads`);
// });

























