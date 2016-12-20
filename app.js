/**
 * Created by delwar on 12/19/16.
 */
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws-config.json');
var fs = require('fs');
var uuid = require('node-uuid');

var uploadService = require('./UploadServiceS3Server')();

fs.readFile('./test1.png', function (err, data) {
  var uniqueId = uuid.v4();
  uploadService.uploadFileToS3(data, uniqueId + ".png", function(err, res){
    console.log(err, res);
  })
});

