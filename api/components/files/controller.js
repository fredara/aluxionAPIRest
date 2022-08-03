const {uploadToBucket} = require('../../../helpers/s3');

module.exports = function () {
    
    const upload = async (req,res) => {
        const file = req.files.file;
        const result = await uploadToBucket(file);
        return result;
        //res.json(result);
    };

    return {
        upload,
    };
}