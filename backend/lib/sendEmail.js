const nodemailer = require('nodemailer');
// import apiList from '../../frontend/src/lib/apiList';
// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: process.ENV.SERVICE, // e.g., Gmail, Yahoo, etc.
    auth: {
        user: process.ENV.USER, // Your email address
        pass: process.ENV.PASS// Your email password or application-specific password
    }
});

// Generate a verification link
const verificationLink = "localhost:8000/login"

// Email content
const mailOptions = {
    from: proces.ENV.USER, // Sender email address
    to: user.email, // Receiver email address
    subject: 'Email Verification', // Subject line
    html: `Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    } else {
        console.log('Email sent:', info.response);
        res.json({
            token: token,
            type: user.type
        });
    }
});
