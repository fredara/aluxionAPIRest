 const nodemailer = require('nodemailer');
 const config = require('../config.js');
function enviaCorreo(correoEnviar){

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: config.email.correoFrom,
        pass: config.email.claveCorreoFrom,
        }
    });
      
    let mensajeHTML = `<h3>Hola, </h3></br><p>Desea Recuperar la contraseña del Usuario ${correoEnviar} </p>`;
    
    var mailOptions = {
        from: config.email.correoFrom,
        to: correoEnviar,
        subject: 'Recuperar Contraseña Aluxion(Test)',
        html: mensajeHTML,
    };
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(err, info){
            if (err) return reject(err); 
            console.log('Email de Recuperacion enviado: ' + info.response);
            resolve(info);
            
        })
    })
 }


 module.exports = { enviaCorreo };