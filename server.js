import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import nodemailer from 'nodemailer';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 80;

// Middleware to parse JSON bodies
app.use(express.json());

// Log all requests to help debug image loading
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files with caching headers
app.use('/', express.static('dist', {
  maxAge: '1y',
  setHeaders: (res, path) => {
    // Set caching headers for images
    if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.gif') || path.endsWith('.svg')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      console.log(`Serving image: ${path}`);
    }
  }
}));

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'hub@neuraframelab.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ''}
Message:
${message}
      `.trim(),
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Handle all other routes for SPA
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Static files being served from: ${join(__dirname, 'dist')}`);
}); 