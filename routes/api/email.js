const express = require('express')
var cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const router = express.Router()
var nodemailer = require('nodemailer');
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: "AKIAI352XKEX4A4ZKRYQ",
  secretAccessKey: "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",
  region: 'eu-west-3'
})
const s3 = new AWS.S3()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

router.post('/', cors(corsOptions), (req, res) => {

  const { content } = req.body

  var s3Bucket = new AWS.S3( { params: {Bucket: 'send.images'} } );

  var buf = Buffer.from(req.body.data.replace(/^data:image\/\w+;base64,/, ""),'base64');

  var data = {
    Key: uuidv4(),
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };

  s3Bucket.putObject(data, function(err, data){
    if (err) {
      console.log(err);
      console.log('Error uploading data: ', data);
    } else {
      console.log('succesfully uploaded the image!');
    }
  });
  res.json("message")
})


module.exports = router
