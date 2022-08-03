const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', function(req, res, next) {
    //console.log("este es el body:", req.body);
    Controller.login(req.body.correo, req.body.password)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch(next)
})

module.exports = router;