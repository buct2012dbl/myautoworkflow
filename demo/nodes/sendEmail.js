const nodemailer = require('nodemailer');

module.exports = async function(config, input) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: config.to,
    subject: config.subject,
    text: config.body.replace('{{data}}', JSON.stringify(input))
  });
  return input;
};
