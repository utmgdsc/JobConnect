const nodemailer = require("nodemailer");

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "naufal.adityo16@gmail.com",
      pass: process.env.PASS,
    },
  });

  return transporter;
};

module.exports = { createMailTransporter };
