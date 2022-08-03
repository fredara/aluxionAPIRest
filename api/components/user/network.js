const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();


// Rutas
router.get('/', ListaUser); //Para Listar los usuarios
router.post('/register', CrearUser); //Registra user
router.get('/olvidepassword/:correo', OlvidaPassword); //Olvide contraseña (envio correo)



// Lista todos los Usuarios
function ListaUser(req, res, next) {
    Controller.ListaUser()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
}

function CrearUser(req, res, next) {
    Controller.CrearUser(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}

function OlvidaPassword(req, res, next){
    Controller.olvidaPassword(req.params.correo)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}

module.exports = router;