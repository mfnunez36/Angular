const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../../schemas/usuario');
const Cuenta = require('../../schemas/cuenta');

app.post('/api/login', (req, res) =>{

    let body = req.body;

    Usuario.findOne({ rut: body.rut }, (err, usuarioDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                message: err
            });
        }

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos.'
            });
        }

        let matchPass = bcrypt.compareSync( body.password, usuarioDB.password );

        if(!matchPass){
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos.'
            });
        }else {
            
            // creamos un token para el usuario
            let jwttoken = jwt.sign({
                // definimos el payload
                usuario: usuarioDB
            },
            // definimos el secret 
            process.env.SEED_TOKEN, 
            { 
                // definimos expiracion de 30 dias
                // 60 seg * 60 min * 24 hrs * 30 dias
                expiresIn: process.env.CADUCIDAD_TOKEN
            });

            Cuenta.findOne({ usuario: usuarioDB._id }).exec((err, cuentaDB) => {
                res.json({
                    ok: true,
                    usuario: usuarioDB,
                    cuenta: cuentaDB,
                    token: jwttoken
                });
            });
        }
    });
});

module.exports = app;