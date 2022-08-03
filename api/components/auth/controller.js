const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    async function login(correo, password) {
        const data = await store.query(TABLA, { correo: correo });

        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    console.log("User Logeado");
                    // Generar token;
                    return auth.sign(data)
                } else {
                    throw error('Informacion invalida', 401);
                }
            });
    }

    async function RegistrarUser(data) {
        const authData = {
            id_usuario: data.id_usuario,
        }

        if (data.correo) {
            authData.correo = data.correo;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }
        return store.RegistrarUser(TABLA, authData);
    }

    return {
        RegistrarUser,
        login,
    };
};