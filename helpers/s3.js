const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');


const region = process.env.AWS_REGION || 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY || 'AKIAY74DF3JTFUGFP5OT';
const secretAccessKey = process.env.AWS_SECRET_KEY || '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';
const bucketName = process.env.AWS_BUCKET_NAME || 'aluxion-testing';


const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
});



const getBuckets = () => {
    return storage.listBuckets().promise();
};

const uploadToBucket = (file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket:bucketName,
        Key:file.name,
        Body:stream
    };
    return storage.upload(params).promise();
};

module.exports = {
    getBuckets,
    uploadToBucket
};