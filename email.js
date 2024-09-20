var nodemailer = require('nodemailer');
let code = ""
require('dotenv').config();

function sendVerificationMail(mail) {
  return new Promise((resolve) => {
    try {
      let uuid = crypto.randomUUID();
    uuid = uuid.split("-");
    code = uuid[0];

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS
      }
    });

    var mailOptions = {
      from: process.env.MAIL,
      to: mail,
      subject: 'Verify email',
      text: `Your code to log in to Magic Manager : ${uuid[0]} \nIf you are not trying to log in just ignore this mail, It's safe :)`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    resolve(code)
    } catch (error) {
      console.log(error)
      resolve(code)
    }
    
  })

}

function verifyCode(cod) {
  if (cod == code) {
    return true;
  } else {
    return false;
  }

}

module.exports = { sendVerificationMail, verifyCode }