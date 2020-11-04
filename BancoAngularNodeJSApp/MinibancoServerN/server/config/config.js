const { url } = require('./database');

// ============================
//  Puerto 
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
// process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Vencimiento de Token
// ============================
process.env.CADUCIDAD_TOKEN = (60 * 60 * 24 * 30);

// ============================
//  Seed de Autenticacion
// ============================
process.env.SEED_TOKEN = 'KJL($#YEU#H&uIUGCsu';

// ============================
//  Base de datos
// ============================
process.env.URLDB = url;