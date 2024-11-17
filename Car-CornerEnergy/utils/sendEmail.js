const nodemailer = require('nodemailer');

// Nodemailer
const sendEmail = async (options) => {
  // 1) Create transporter ( service that will send email like "gmail"**,"Mailgun", "mialtrap", sendGrid)
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, // if secure false port = 587, if true port= 465
    secure: true,
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    },
    });

  // 2) Define email options (like from, to, subject, email content)
    const mailOpts = {
    from: 'carConerEnergy App <mhabiba1998@gmail.com>',
    to: options.email,           //from Body
    subject: options.subject,
    text: options.message,      //content of email
    };

  // 3) Send email
    await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;