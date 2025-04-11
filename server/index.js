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
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// ✅ CORS setup (React runs on port 5173 or 3000)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-production-domain.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// ✅ Contact form route
app.post('/api/send-email', async (req, res) => {
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
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: '✅ Email sent successfully!' });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(8000, () => {
  console.log('🚀 Server is running on http://localhost:8000');
});
