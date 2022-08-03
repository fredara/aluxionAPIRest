require("dotenv").config()

const express = require('express');

var cors = require('cors')

const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const files = require('./components/files/network');
const buscador = require('./components/buscador/network');


const fetch = (...args) => import('node-fetch').then(({default: fetch,Headers:Headers,Request:Request,Response:Response}) => fetch(...args));

  
if (!globalThis.fetch) {
    globalThis.fetch = fetch
    globalThis.Headers = fetch.Headers
    globalThis.Request = fetch.Request
    globalThis.Response = fetch.Response
}

const app = express();


const swaggerDoc = require('./swagger.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/files', files);
app.use('/api/buscador', buscador);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});