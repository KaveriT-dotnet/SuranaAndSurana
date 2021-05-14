const AWS = require('aws-sdk');
const BUCKET_NAME = 'www.ivneu.com/ivneuUploadsDir';
const IAM_USER_KEY = 'AKIATF3BYQDHDVCKGOFO';
const IAM_USER_SECRET = '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';

var S3Library = function() {};

// function uploadToS3(file) {
    // console.log(AWS.S3)
  
 let s3bucket = new AWS.S3({
   accessKeyId: IAM_USER_KEY,
   secretAccessKey: IAM_USER_SECRET,
   Bucket: BUCKET_NAME,
 });

S3Library.prototype.UploadFile=function(file,callback){
  s3bucket.createBucket(function () {
    var params = {
     Bucket: BUCKET_NAME,
     Key: file.name,
     Body: file.data,
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
       console.log('error in callback');
       console.log(err);
       callback(err,null);
       // return err;
      }
      console.log('success',data);
      // console.log(data);
      // res.send(data);
      callback(null,"Sent");
     });
})
}



 module.exports = new S3Library;