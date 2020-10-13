const express = require('express')
var cors = require('cors');
const router = express.Router()
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'skydev100@gmail.com',
    pass: 'F4st3r1991(*)'
  }
});

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

router.post('/', cors(corsOptions), (req, res) => {

  const { content } = req.body

  var mailOptions = {
    from: 'skydev100@gmail.com',
    to: 'skydev100@gmail.com',
    subject: 'Sending Email using Node.js',
    text: req.body.data
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.json("message")
})


module.exports = router
