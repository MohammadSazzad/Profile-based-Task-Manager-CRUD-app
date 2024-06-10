const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { text } = require('express');

dotenv.config();

const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASS
        },
    });
    const verififacationLink = `http: //localhost: 3000/verify-email/${token}`;

    const mailOptions = {
        from: process.env.SMTP_USERNAME,
        to: email,
        subject: 'Email Verification',
        text: 'Click on the link to verify your email: ' + verififacationLink,
    };
    try{
        await transporter.sendMail(mailOptions);
    }catch(errir){
        throw new Error('Failed to send verification email');
    }
}

module.exports = {sendVerificationEmail};