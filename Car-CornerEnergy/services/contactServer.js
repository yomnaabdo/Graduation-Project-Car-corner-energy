// contact us page 

const nodemailer = require('nodemailer');
const { StatusCodes } = require('http-status-codes');

const sendEmail = async (req, res) => {
    const { fullname, email, phone, message } = req.body;

    // Create a transporter using Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Define email options
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Message from ${fullname} <${email}>`,
        text: `Name: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(StatusCodes.OK).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error sending message' });
    }
};

module.exports = { sendEmail };