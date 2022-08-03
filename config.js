module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'algunaNotaSecretaGenerada',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || 'aluxion_db',
    },
    email: {
        correoFrom: process.env.CORREO_FROM || 'fredarava@gmail.com',
        claveCorreoFrom: process.env.PASSWORD_FROM || 'sjcpqyhpocytudlw',
    },
}