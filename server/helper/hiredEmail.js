const nodemailer = require("nodemailer");

const rejectionEmail = (name, to) => {
  const subject = "Congratulations!";
  const hiredMessage = `Dear ${name},\n\nCongratulations! We are pleased to inform you that your application for the position has been successful, and you have been hired.\n\nWelcome to our team!\n\nSincerely,\nThe Hiring Team`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "corahr38@gmail.com",
      pass: "pthsochrmqubcwzm",
    },
  });

  const mailOptions = {
    from: "corahr38@gmail.com",
    to: to,
    subject: subject,
    text: hiredMessage, // Plain text message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Hired email sent:", info.response);
    }
  });
};

module.exports = rejectionEmail;
