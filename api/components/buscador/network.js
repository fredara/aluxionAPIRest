const express = require('express');

const Controller = require('./index');
const router = express.Router();
const response = require('../../../network/response');

router.get("/buscar/:key", function(req, res, next) {
    const keyBuscar = req.params.key
    Controller.buscar(keyBuscar)
    .then(resp => {
        response.success(req, res, resp, 200);
    })
    .catch(next)
});



module.exports = router;