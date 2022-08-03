var uuid = require('uuid');

const auth = require('../auth');
const TABLA = 'usuario';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    function ListaUser() {
        return store.ListaUser(TABLA);
    }

    async function CrearUser(body) {
        const usuario = {
            nombre: body.nombre,
            correo: body.correo
        }

        if (body.id_usuario) {
            usuario.id_usuario = body.id_usuario;
        } else {
            usuario.id_usuario = uuid.v1();
        }
        if(body.password || body.correo){
            await auth.RegistrarUser({
                id_usuario: usuario.id_usuario,
                correo: usuario.correo,
                password: body.password,
            })
        }

        return store.RegistrarUser(TABLA, usuario);
    }

    mail = require('../../../utils/mail');

    function olvidaPassword(correo) {
        //console.log("correo a recuperar contraseña", correo);
        return mail.enviaCorreo(correo);
    }

    return {
        ListaUser,
        CrearUser,
        olvidaPassword,
    };
}