const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail (recipient, message){
    console.log(message)

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PSWD.replaceAll("\\$", "$"),
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: recipient.email,
    subject: "SMOOCHIES BAKES",
    text: message.body
  };

  transporter.sendMail(mailOptions).catch((e)=>{console.log(e)})

};

module.exports = {sendEmail} 
