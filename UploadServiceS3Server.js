/**
 * Created by delwar on 12/19/16.
 */
'use strict'
module.exports = function(){
  var AWS = require('aws-sdk');

  var S3 = new AWS.S3();
  var UPLOAD_BUCKET = "delwar.upload";

  return {
    uploadFileToS3: function (paramFile, paramFileName, paramCallback) {
      var me = this;
      var bucket = new AWS.S3({params:{Bucket:UPLOAD_BUCKET}});
        var fileName = 'profile'+'/'+paramFileName;

      bucket.upload({Key: fileName, Body: paramFile, ACL: "public-read"}, function(err, res){
        if(err){
          if(err.code =='NoSuchBucket'){
            me.createBucket(UPLOAD_BUCKET, function(err, res){
              if(err){
                //WinstonLog.AWSLog('Error uploading file to S3 - file name: '+fileName+' bucket: '+bucketName+ ' error: '+err);
                return callback(err);
              }
              else{
                me.uploadFileToS3(paramFile, paramFileName, paramCallback);
              }
            });
          }
          else{
            //WinstonLog.AWSLog('Error uploading file to S3 - file name: '+fileName+' bucket: '+bucketName+ ' error: '+err);
            return paramCallback(err);
          }

        }
        else{
          //WinstonLog.AWSLog('File uploaded to S3 - file name: '+fileName+' bucket: '+bucketName+ ' url: '+res.Location);
          paramCallback(null, {url: res.Location});
        }


      });
    },

    createBucket: function(paramBucketName, paramCallBack){
      var s3 = new AWS.S3();
      s3.createBucket({Bucket: paramBucketName}, function(err, data) {
        if (err) {
          paramCallBack(err);
        }
        else{
          paramCallBack(null);
        }
      });
    }

  }


}
