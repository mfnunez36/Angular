const express = require('express');
const app = express();


// Registro de rutas de API
app.use(require('./usuario/index'));
app.use(require('./usuario/login'));
app.use(require('./transferencia/index'));


module.exports = app;