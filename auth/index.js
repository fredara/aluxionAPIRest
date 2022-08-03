const jwt = require('jsonwebtoken');
const config = require('../config');


const secret = config.jwt.secret;


function sign(data) {
    let jsonData = JSON.parse(JSON.stringify(data));
    return jwt.sign(jsonData, secret);
}


module.exports = {
    sign
};