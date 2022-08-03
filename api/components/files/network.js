const express = require('express');

//const Controller = require('./index');

const router = express.Router();
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');


aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,

});
const BUCKET = process.env.BUCKET
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    })
})

router.post('/upload', upload.single('file'), async function (req, res, next) {
    res.send('Subido archivo correctamente ' + req.file.location + ' location!')
})


router.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send(x.Body)
});

router.get("/update/:newname/:filename", async (req, res) => {
    const newname = req.params.newname
    const filename = req.params.filename

    s3.copyObject({
        Bucket: BUCKET,
        CopySource: `${BUCKET}/${filename}`,
        Key: newname
      }).promise()
        .then((response) => {
          s3.deleteObject({
            Bucket: BUCKET,
            Key: filename
          }).promise()
          .then(()=>{
            var params = {Bucket: BUCKET, Key: newname};
            const x = s3.getObject(params);
            res.json({
                res: x.httpRequest,
                ulrfile: `https://${BUCKET}.s3.amazonaws.com/${newname}`
            });
          })
        })
        .catch((e) => console.error(e))

});



module.exports = router;