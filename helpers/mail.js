require('dotenv').config();

const logger = require('./logger');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: 'kel0oo0@yahoo.com.tw',
  subject: 'Sending Email using Node.js',
  text: 'That was easy???',
  html: `<h1>HI~~!!</h1><img src="https://miro.medium.com/max/676/1*XEgA1TTwXa5AvAdw40GFow.png">`,
};

const sendEmail = (options = {}) => {
  let mergeOption = {
    ...mailOptions,
    ...options,
  };

  transporter.sendMail(mergeOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      logger.info(mergeOption);
    }
  });
};

//判斷呼叫此模組的來源是不是自己
if (require.main === module) {
  sendEmail();
}

module.exports = sendEmail;
