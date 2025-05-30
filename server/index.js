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
const router = express.Router();
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
  panCard: String,      // File path
  msmemCard: String,    // File path
  aadhaarCard: String,  // File path
  photo: String,       
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

// const blogPostSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   media: [{
//     url: { type: String, required: true },
//     type: { type: String, enum: ['image', 'video'], required: true },
//     caption: { type: String, default: '' },
//     isLocal: { type: Boolean, default: true },
//     width: { type: String, default: '100%' },
//     originalUrl: { type: String }, // Only for videos
//     embedUrl: { type: String }     // Only for videos
//   }],
//   bannerImage: {
//     url: String,
//     isLocal: Boolean
//   },
//   seoTitle: String,
//   seoDescription: String,
//   seoKeywords: [String],
//   urlSlug: { type: String, required: true, unique: true },
//   titleStyles: mongoose.Schema.Types.Mixed,
//   contentStyles:mongoose.Schema.Types.Mixed,
//   author: {
//     id: String,
//     name: String,
//     email: String
//   }
// }, { timestamps: true });


const testLoginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role:{ type: String,default:"manager" }
});

const Testlogin = mongoose.model('Testlogin', testLoginSchema);




const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // HTML content
  plainText: { type: String, required: true }, // Plain text version
  contentStyle: { // Stores styling information
    formats: [mongoose.Schema.Types.Mixed], // Array of format objects
    blocks: [{ // Array of content blocks with styling
      insert: mongoose.Schema.Types.Mixed, // The actual content
      attributes: mongoose.Schema.Types.Mixed // Styling attributes
    }]
  },
  media: [{
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String }, // URL for external media or path for uploaded
    originalUrl: { type: String }, // Original URL for videos
    embedUrl: { type: String }, // Embed URL for videos
    caption: { type: String, default: '' },
    width: { type: String, default: '100%' },
    fileId: { type: String } // Reference to file storage if uploaded
  }],
  bannerImage: {
    url: String,
    fileId: String // Reference to file storage if uploaded
  },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
  urlSlug: { type: String, required: true, unique: true },
  titleStyles: { // Formatting for the title
    bold: Boolean,
    italic: Boolean,
    underline: Boolean,
    fontSize: String,
    color: String,
    backgroundColor: String,
    align: String
  },
  author: {
    id: { type: String, required: true },
    name: String,
    email: String
  },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

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

// Comment

// app.post('/api/blogs/publish', 
//   upload.fields([
//     { name: 'bannerImage', maxCount: 1 },
//     { name: 'mediaFiles', maxCount: 10 }
//   ]), 
//   async (req, res) => {
//     try {
//       const blogData = JSON.parse(req.body.blogData);

//       // Process banner image
//       const bannerImage = req.files['bannerImage'] ? {
//         url: `/uploads/${req.files['bannerImage'][0].filename}`,
//         isLocal: true
//       } : null;

//       // Process media files (images only)
//       const mediaFiles = req.files['mediaFiles'] || [];
//       const media = [];

//       // Handle uploaded files (images)
//       mediaFiles.forEach(file => {
//         media.push({
//           url: `/uploads/${file.filename}`,
//           type: 'image',
//           caption: '',
//           isLocal: true,
//           width: '100%'
//         });
//       });

//       // Handle video URLs from blogData.media
//       if (blogData.media && Array.isArray(blogData.media)) {
//         blogData.media.forEach(item => {
//           if (item.type === 'video') {
//             media.push({
//               url: item.embedUrl, // The embeddable URL
//               type: 'video',
//               caption: item.caption || '',
//               isLocal: false,
//               width: item.width || '100%',
//               originalUrl: item.originalUrl, // Original user-provided URL
//               embedUrl: item.embedUrl        // Processed embed URL
//             });
//           }
//         });
//       }

//       // Ensure slug is unique
//       const baseSlug = blogData.urlSlug || generateSlug(blogData.title);
//       const uniqueSlug = await ensureUniqueSlug(baseSlug, blogData._id);

//       const completeBlogData = {
//         ...blogData,
//         media,
//         bannerImage,
//         urlSlug: uniqueSlug
//       };

//       let blogPost;
//       if (blogData._id) {
//         blogPost = await BlogPost.findByIdAndUpdate(blogData._id, completeBlogData, { new: true });
//       } else {
//         blogPost = new BlogPost(completeBlogData);
//         await blogPost.save();
//       }

//       res.status(blogData._id ? 200 : 201).json({ 
//         message: `Blog ${blogData._id ? 'updated' : 'published'} successfully!`, 
//         blogPost 
//       });

//     } catch (error) {
//       console.error('Error:', error);

//       // Clean up uploaded files if error occurs
//       if (req.files) {
//         Object.values(req.files).flat().forEach(file => {
//           fs.unlinkSync(path.join(UPLOAD_DIR, file.filename));
//         });
//       }

//       res.status(500).json({ 
//         message: 'Error processing blog', 
//         error: error.message 
//       });
//     }
// });



app.post('/api/blogs/publish', 
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'mediaFiles', maxCount: 10 }
  ]), 
  async (req, res) => {
    try {
      const blogData = JSON.parse(req.body.blogData);
      console.log('Received files:', req.files); // Debugging

      // Process banner image
      let bannerImage = null;
      if (req.files['bannerImage']) {
        bannerImage = {
          url: `/uploads/${req.files['bannerImage'][0].filename}`,
          fileId: req.files['bannerImage'][0].filename
        };
      }

      // Process media files
      const media = [];
      const mediaFiles = req.files['mediaFiles'] || [];

      // Handle uploaded media files
      mediaFiles.forEach(file => {
        const matchingItem = blogData.media.find(m => 
          m.file && m.file.name === file.originalname
        );
        
        media.push({
          type: matchingItem?.type || 'image',
          url: `/uploads/${file.filename}`,
          fileId: file.filename,
          caption: matchingItem?.caption || '',
          width: matchingItem?.width || '100%',
          ...(matchingItem?.type === 'video' ? {
            originalUrl: matchingItem.originalUrl,
            embedUrl: matchingItem.embedUrl
          } : {})
        });
      });

      // Handle external media (non-file items)
      blogData.media.forEach(item => {
        if (!item.file) {
          media.push({
            type: item.type,
            url: item.type === 'video' ? item.embedUrl : item.url,
            caption: item.caption || '',
            width: item.width || '100%',
            ...(item.type === 'video' ? {
              originalUrl: item.originalUrl,
              embedUrl: item.embedUrl
            } : {})
          });
        }
      });

      // Ensure slug is unique
      const baseSlug = blogData.urlSlug || generateSlug(blogData.title);
      const uniqueSlug = await ensureUniqueSlug(baseSlug, blogData._id);

      const completeBlogData = {
        ...blogData,
        media,
        bannerImage,
        urlSlug: uniqueSlug,
        status: 'published'
      };

      let blogPost;
      if (blogData._id) {
        blogPost = await BlogPost.findByIdAndUpdate(
          blogData._id, 
          completeBlogData, 
          { new: true }
        );
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
      
      // Clean up uploaded files if error occurs
      if (req.files) {
        Object.values(req.files).flat().forEach(file => {
          try {
            fs.unlinkSync(path.join(UPLOAD_DIR, file.filename));
          } catch (err) {
            console.error('Failed to delete file:', file.filename, err);
          }
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
// app.post("/api/partner-registration", upload.fields([
//   { name: 'panCard', maxCount: 1 },
//   { name: 'msmemCard', maxCount: 1 },
//   { name: 'aadhaarCard', maxCount: 1 },
//   { name: 'photo', maxCount: 1 }
// ]), async (req, res) => {
//   try {
//     const { 
//       name, companyName, companyWebsite, numberOfEmployees, 
//       turnover, numberOfBranches, area, areaInSqFt,
//       bankName, bankAddress, accountNumber, ifsc,
//       gstNumber, state, city, pinCode, mobile, email, address
//     } = req.body;

//     // Get file paths
//     const panCardPath = req.files['panCard'] ? `/uploads/${req.files['panCard'][0].filename}` : null;
//     const msmemCardPath = req.files['msmemCard'] ? `/uploads/${req.files['msmemCard'][0].filename}` : null;
//     const aadhaarCardPath = req.files['aadhaarCard'] ? `/uploads/${req.files['aadhaarCard'][0].filename}` : null;
//     const photoPath = req.files['photo'] ? `/uploads/${req.files['photo'][0].filename}` : null;
//     const newPartner = new Partner({
//       name,
//       companyName,
//       companyWebsite,
//       numberOfEmployees: parseInt(numberOfEmployees),
//       turnover,
//       numberOfBranches: parseInt(numberOfBranches),
//       area,
//       areaInSqFt: parseInt(areaInSqFt),
//       bankName,
//       bankAddress,
//       accountNumber,
//       ifsc,
//       panCard: panCardPath,
//       msmemCard: msmemCardPath,
//       aadhaarCard: aadhaarCardPath,
//       photo: photoPath,
//       gstNumber,
//       state,
//       city,
//       pinCode,
//       mobile,
//       email,
//       address
//     });

//     await newPartner.save();
//     res.status(201).json({ success: true, message: "Partner registered successfully" });
//   } catch (err) {
//     console.error("Partner registration error:", err);
//     res.status(500).json({ error: "Failed to register partner" });
//   }
// });

const fields = [
  { name: 'photo' },
  { name: 'panCard' },
  { name: 'msmemCard' },
  { name: 'aadhaarCard' },
];

app.post('/api/partner-registration', upload.fields(fields), async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = Object.keys(files || {}).map((field) => ({
      filename: files[field][0].originalname,
      content: files[field][0].buffer,
    }));

    const htmlContent = `
      <h2>New Partner Registration</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Company:</strong> ${data.companyName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mobile:</strong> ${data.mobile}</p>
      <p><strong>City:</strong> ${data.city}, ${data.state}</p>
      <p><strong>GST Number:</strong> ${data.gstNumber}</p>
      <p><strong>Address:</strong> ${data.address}</p>
      <p><strong>More details attached.</strong></p>
    `;

    const mailOptions = {
      from: `"Partner Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Partner Registration Received',
      html: htmlContent,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
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




app.get('/api/auth/test-logins',async (req, res) => {
  try {
    const logins = await Testlogin.find({});
    res.json(logins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logins' });
  }
});





 app.delete('/auth/test-logins/:id',async (req, res) => {
  try {
    const { id } = req.params;
    const { adminEmail } = req.body; // Expect admin's email in request body

    // Find the admin user
    const admin = await Testlogin.findOne({ email: adminEmail, role: 'admin' });
    if (!admin) {
      return res.status(403).json({ message: 'Only admin can delete users' });
    }

    // Find the user to delete
    const userToDelete = await Testlogin.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves or other admins
    if (userToDelete.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin users' });
    }

    await Testlogin.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});





app.put(
  '/Components/Blog/blogpost/:id',
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'media', maxCount: 100 }
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, titleStyles } = req.body;

      // Find the existing post
      const existingPost = await BlogPost.findById(id);
      if (!existingPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      // Parse title styles if it's a string
      const parsedTitleStyles = typeof titleStyles === 'string' 
        ? JSON.parse(titleStyles) 
        : titleStyles;

      // Prepare update data
      const updateData = {
        title,
        content,
        titleStyles: parsedTitleStyles
      };

      // Handle banner image update
      if (req.files['bannerImage']) {
        // Delete old banner image if it exists
        if (existingPost.bannerImage?.url && existingPost.bannerImage.isLocal) {
          try {
            const oldFilePath = path.join(UPLOAD_DIR, path.basename(existingPost.bannerImage.url));
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath);
            }
          } catch (err) {
            console.error('Error deleting old banner image:', err);
          }
        }

        updateData.bannerImage = {
          url: `/uploads/${req.files['bannerImage'][0].filename}`,
          isLocal: true
        };
      }

      // Handle media files update
      if (req.files['media']) {
        // First delete any existing local media files that are being replaced
        // (This is a simplified approach - you might want more sophisticated logic)
        for (const mediaItem of existingPost.media) {
          if (mediaItem.isLocal) {
            try {
              const oldFilePath = path.join(UPLOAD_DIR, path.basename(mediaItem.url));
              if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
              }
            } catch (err) {
              console.error('Error deleting old media file:', err);
            }
          }
        }

        // Create new media array with the uploaded files
        updateData.media = req.files['media'].map(file => ({
          url: `/uploads/${file.filename}`,
          type: file.mimetype.startsWith('image') ? 'image' : 'video',
          caption: '', // You might want to get this from the request
          isLocal: true,
          width: '100%'
        }));
      }

      // Update the post
      const updatedPost = await BlogPost.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true }
      );

      res.status(200).json({ 
        message: 'Blog post updated successfully',
        post: updatedPost
      });

    } catch (error) {
      console.error('Update error:', error);
      
      // Clean up any uploaded files if there was an error
      if (req.files) {
        Object.values(req.files).flat().forEach(file => {
          try {
            fs.unlinkSync(path.join(UPLOAD_DIR, file.filename));
          } catch (err) {
            console.error('Error cleaning up uploaded file:', err);
          }
        });
      }

      res.status(500).json({ 
        message: 'Server error during update',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);





// app.post('/api/auth/logins', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // ... user check code ...

//     // send notification email
//     await transporter.sendMail({
//       from: 'your-email@gmail.com',
//           to: 'yashveersingh7648@gmail.com, ciphershieldtechnologies@gmail.com',
//       subject: 'Login Alert',
//       text: `Hi, you logged in successfully.`,
//     });

//     return res.json({ success: true, user: { email, name: 'Yash' }, token: 'dummy-token' });
//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });


// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     console.log(req.body);
//     const user = await Testlogin.findOne({ email });
    
//     if (!user) {
//       console.log(user);
//       return res.status(401).json({ success: false, message: 'Invalid credentials:user' });
//     }

//     if (password !== user.password) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//     res.json({
//       success: true,
//       user: {
//         id: user._id,
//         email: user.email,
//         role:user.role
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

app.post('/api/auth/logins', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Testlogin.findOne({ email });

    if (!user || password !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // ✅ Prepare and send login alert email
    const loginTime = new Date().toLocaleString();
    const emailText = `
      Hi,

      A user just logged in.

       Email: ${user.email}
       Role: ${user.role || 'N/A'}
       Time: ${loginTime}

      Regards,
      CipherShield Technologies
    `;

    await transporter.sendMail({
      from: `"Login Alert" <${process.env.EMAIL_USER}>`,
      to: 'yashveersingh7648@gmail.com, ciphershieldtechnologies@gmail.com',
      subject: 'User Login Notification',
      text: emailText,
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.put('/api/posts/id/:postId', upload.single('image'), async (req, res) => { // Changed 'attachment' to 'image' to match frontend
  try {
    const { title, content, category } = req.body;
    const { postId } = req.params;

    // Validate input
    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Title, content, and category are required' });
    }

    const existingPost = await Article.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // File handling
    if (req.file) {
      // Delete old file if it exists
      if (existingPost.attachments && existingPost.attachments.length > 0) {
        const oldFilePath = path.join(UPLOAD_DIR, path.basename(existingPost.attachments[0]));
        try {
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        } catch (err) {
          console.error('Error deleting old file:', err);
          // Continue with update even if file deletion fails
        }
      }

      existingPost.attachments = [`/uploads/${req.file.filename}`];
    }

    // Update fields
    existingPost.title = title;
    existingPost.content = content;
    existingPost.category = category;
    existingPost.updatedAt = Date.now(); // Add update timestamp

    const updatedPost = await existingPost.save();

    res.json({ 
      message: 'Post updated successfully',
      post: {
        _id: updatedPost._id,
        title: updatedPost.title,
        content: updatedPost.content,
        category: updatedPost.category,
        attachments: updatedPost.attachments,
        createdAt: updatedPost.createdAt,
        updatedAt: updatedPost.updatedAt
      }
    });

  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ 
      message: 'Failed to update post',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

//After Login Can Add Credentials 

app.post('/api/auth/add-test-login',async(req,res)=>{
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Both email and password are required'
      });
    }
    console.log(req.body);
    // Check if email already exists
    const existingLogin = await Testlogin.findOne({ email });
    if (existingLogin) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists in test logins'
      });
    }

    // Create new test login
    const newTestLogin = await Testlogin.create({
      email,
      password, 
    });

    res.status(201).json({
      success: true,
      message: 'Test login credentials added successfully',
      data: {
        id: newTestLogin._id,
        email: newTestLogin.email
      }
    });

  } catch (error) {
    console.error('Error adding test login:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
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
    to: 'yashveersingh7648@gmail.com, ciphershieldtechnologies@gmail.com',
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
    to: 'yashveersingh7648@gmail.com, ciphershieldtechnologies@gmail.com',
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

// Get single blog post by ID
// app.get('/Components/Blog/blogpost/:id', (req, res) => {
//   const id = req.params.id;
//   const blogDataPath = path.join(__dirname, 'blogs.json');

//   try {
//     const data = fs.readFileSync(blogDataPath, 'utf8');
//     const blogs = JSON.parse(data);
//     const post = blogs.find((p) => p._id === id);

//     if (!post) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }

//     res.json(post);
//   } catch (error) {
//     console.error('Error reading blog file:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
// Get all blog posts
// app.get('/Components/Blog/blogpost', async (req, res) => {
//   try {
//     const posts = await BlogPost.find().sort({ createdAt: -1 });
//     res.json(posts);
//   } catch (err) {
//     console.error("Get blog posts error:", err);
//     res.status(500).json({ error: "Failed to fetch blog posts" });
//   }
// });



// Route to get blog post by slug
const blogPosts = [
  {
    slug: 'fhfgh',
    title: 'Sample Blog Post',
    content: '<p>This is a sample blog post content.</p>',
    bannerImage: '/uploads/sample-image.jpg',
  },
  // Add more posts here if needed
];

// Route to get blog post by slug
app.get('/Components/Blog/blogslug/:slug', (req, res) => {
  const slug = req.params.slug;

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  res.json({ post });
});

// router.get('/:id', async (req, res) => {
//   try {
//     // Validate ID format
//     if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
//       return res.status(400).json({ message: 'Invalid blog ID format' });
//     }

//     const blog = await Blog.findById(req.params.id);
    
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }

//     res.status(200).json(blog);
//   } catch (error) {
//     console.error('Error fetching blog:', error);
    
//     if (error.name === 'CastError') {
//       return res.status(400).json({ message: 'Invalid blog ID' });
//     }
    
//     res.status(500).json({ 
//       message: 'Error fetching blog', 
//       error: error.message 
//     });
//   }
// });


// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Uploads available at /uploads`);
});
