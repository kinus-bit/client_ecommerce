const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

//creating a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({

    //SMTP server host
    host:process.env.EMAIL_HOST,

    // Port (587 for TLS, 465 for SSL, 25 for unencrypted)
    port:process.env.EMAIL_PORT,

    // true for 465, false for other ports
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

    // Accept self-signed certificates (useful for development)
    tls: {
        rejectUnauthorized: false
    }
});


// Verify connection configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

//core email sending function
const sendEmail = async (options) => {
    try {

        //constructing email options
        const mailOptions = {
            from: `"Shopease" <${process.env.EMAIL_FROM}>`,
            to: options.email,
            subject: options.subject,
            html: options.html
        };

        //sending email using transporter
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Email sending error:', error);

        //Throwing a user friendly error
        throw new Error('Email could not be sent');
    }
};

module.exports = { sendEmail };