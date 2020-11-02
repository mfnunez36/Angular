const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
// underscore.js es para reemplazar el req.body 
// se usa para obtener los parametros especificos de un objeto 
const _ = require('underscore');

// const { verificarToken } = require('../../middlewares/auth');

const Usuario = require('../../schemas/usuario');
const Cuenta = require('../../schemas/cuenta');

// Crear usuario
app.post('/api/usuario', function(req, res) {

    let body = req.body;
    
    let usuario = new Usuario({
        rut: body.rut,
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    usuario.save( (err, usuarioDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Ocurrio un error al intentar guardar.',
                error: err
            });
        }

        let cuenta = new Cuenta({
            saldo: 0,
            usuario: usuarioDB._id
        });

        cuenta.save((err, cuentaDB) =>{
            if(err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ocurrio un error al intentar crear una cuenta.',
                    error: err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB,
                cta: cuentaDB
            });
        });
        
    });

});

module.exports = app;