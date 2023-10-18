const nodemailer = require("nodemailer");
require("dotenv").config();
const password = process.env.EMAIL_PSWD.replaceAll("\\$", "$");

async function sendEmail (recipient, message){
    console.log(message)

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: password,
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

console.log(password)

module.exports = {sendEmail} 
