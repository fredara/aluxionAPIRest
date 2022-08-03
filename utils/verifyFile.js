const response = require("../network/response");

const verifyFile = (req,res,next) => {
    console.log("deberia mostrarme el archivo ", req.files);
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file)
        return response.error(req, res, 'No se cargó ningun archivo', 401);

    next();
};

module.exports = {
    verifyFile
};