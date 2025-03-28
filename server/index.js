const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

const isProduction = process.env.NODE_ENV === 'production';


// CORS Configuration
const corsOptions = {
  origin: isProduction 
    ? ['https://www.ciphererp.com', 'https://ciphererp.com']
    : ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
// CORS Middleware Setup
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000'], 
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: isProduction ? 'gmail' : 'gmail',
  host: isProduction ? 'smtp.gmail.com' : 'smtp.gmail.com',
  port: isProduction ? 465 : 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: isProduction // Production mein true rakhna chahiye
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

app.post('/send-email', async (req, res) => {
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
app.listen(8001, () => {
  console.log('🚀 Server is running on port 8000');
});
