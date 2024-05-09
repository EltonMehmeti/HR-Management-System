const nodemailer = require('nodemailer');

const sendEmail = (subject,name, to, join_url,datetime) => {
console.log(subject, name, to , join_url, datetime)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'corahr38@gmail.com',
      pass: 'pthsochrmqubcwzm' 
       }
  });

  const mailOptions = {
    from: 'corahr38@gmail.com',
    to: to, 
    subject: subject,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
            h2 {
              color: #333;
            }
            p {
              margin-bottom: 20px;
            }
            a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Interview Invitation</h2>
            <p>Hi ${name} </p>
            <p>We are excited to invite you to an interview for the position at our company.</p>
            <p>Date & Time: ${datetime}</p>
            <p>Please use the following link to join the Zoom meeting:</p>
            <a href="${join_url}" target="_blank">Join Zoom Meeting</a>
          </div>
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
