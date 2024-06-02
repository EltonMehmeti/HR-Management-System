const nodemailer = require('nodemailer');

const sendJobOfferEmail = (subject, name, to, attachmentPath) => {
  console.log(subject, name, to, attachmentPath)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'corahr38@gmail.com',
        pass: 'pthsochrmqubcwzm' 
    }
  });

  const mailOptions = {
    from: "corahr38@gmail.com",
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
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Job Offer</h2>
            <p>Hi ${name},</p>
            <p>We are pleased to offer you the position at our company. Please find the attached document for more details regarding the job offer.</p>
            <p>We look forward to having you on our team.</p>
            <p>Best regards,</p>
            <p>Cora</p>
          </div>
        </body>
      </html>
    `
  };

  if (attachmentPath) {
    mailOptions.attachments = [
      {
        filename: 'JobOffer.pdf', // You can change the name of the attachment file if needed
        path: attachmentPath
      }
    ];
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendJobOfferEmail;
