const nodemailer = require("nodemailer");
require("dotenv").config();
const password = 'Kwame2001$$'
async function sendEmail (recipient, message){

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

  transporter.sendMail(mailOptions).catch((e)=>{
    console.log(`Email Error: ${e.response}`)
  })
};

module.exports = {sendEmail} 
