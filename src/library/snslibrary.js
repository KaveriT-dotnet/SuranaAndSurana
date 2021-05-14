var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: 'AKIATF3BYQDHDVCKGOFO',
    secretAccessKey: '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',
    region: 'us-east-1'
});
var applicationARN = "arn:aws:sns:us-east-1:544398799920:app/GCM/Membership";///awc create panna registration link
var sns = new AWS.SNS();
var SNSLibrary = function() {};
//create end point based on token;
SNSLibrary.prototype.getEndpoint = function(token, callback) {
    if (token == "" || token == undefined) {
        callback("Token undefined or Empty", null);
    } else {
        sns.createPlatformEndpoint({
            PlatformApplicationArn: applicationARN,
            Token: token
        }, function(err, data) {
            if (err) {
                console.log(err.stack);
                callback("Problem in Creating EndPoint", null);
                return;
            }
            // return data.EndpointArn;
            callback(null, data);
        });
    }
}

//send notification message to mobile.........................
SNSLibrary.prototype.sendMessage = function(arnEndPoint, msgData, callbackmessage) {

    var endpointArn = arnEndPoint;
    var payload = {
        default: msgData.msg,
        GCM: {
            data: { message: msgData.msg, usersData: msgData.additionalData }
        }
    };
    payload.GCM = JSON.stringify(payload.GCM);
    payload = JSON.stringify(payload);
    sns.publish({
        Message: payload,
        MessageStructure: 'json',
        TargetArn: endpointArn
    }, function(err, data) {
        if (err) {
            console.log(err.stack);
            // return;
            callbackmessage(err, null);
        }
        callbackmessage(null, data);
    })
}
SNSLibrary.prototype.sendSMS = function(data, callbacksms) {
    var params = {
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                'DataType': 'String',
                'StringValue': 'Transactional'
            }
        },
        Message: data.msg,
        PhoneNumber: "+" + data.countryCode + "" + data.mobileNumber
    };
    var publishTextPromise = sns.publish(params).promise();
    publishTextPromise.then(function(data) {
        callbacksms(null, data)
    }).catch(function(err) {
        callbacksms(err, null);
    });
}


module.exports = new SNSLibrary();