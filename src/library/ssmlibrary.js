var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: 'AKIATF3BYQDHDVCKGOFO',
    secretAccessKey: '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',
    region: 'us-east-1'
});
const parameterStore = new AWS.SSM();
var getParamStore=function(){

}

getParamStore.prototype.getParam = (param,callback) => {

    parameterStore.getParameter({
      Name: param
    }, (err, data) => {
        if (err) {
           callback(err,null)
        }
         callback(null,data)
    })

}

module.exports=new getParamStore();