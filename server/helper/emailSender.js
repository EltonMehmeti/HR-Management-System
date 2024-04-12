const nodemailer = require('nodemailer');



const sendEmail = ( subject,to, join_url) => {
  subject = 'Interview Invitation';
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'kristoffer12@ethereal.email',
      pass: 'meZ5TmPQqXqRf3THZw'
    }
  });

  const mailOptions = {
    from: '"Maddison Foo Koch 👻" <kristoffer12@ethereal.email>', 
    to: to,
    subject: subject, 
    html: `
    <html>
      <body>
        <h2>Interview Invitation</h2>
        <p>Please join the Zoom meeting using the following link:</p>
        <a href="${join_url}">Join Zoom Meeting</a>
      </body>
    </html>
  ` 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};


module.exports = sendEmail;