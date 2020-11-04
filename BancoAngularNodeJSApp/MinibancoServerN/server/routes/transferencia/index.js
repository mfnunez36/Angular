const express = require('express');
const app = express();
const { verificarToken } = require('../../middlewares/auth');

const Transferencia = require('../../schemas/transferencia');
const Usuario = require('../../schemas/usuario');
const Cuenta = require('../../schemas/cuenta');


// Obtener las transferencias de usuario
app.get('/api/transferencias/:id', verificarToken, (req, res) => {
    
    let id = req.params.id;

    // para obtener los campos a eleccion solo debemos pasar el/los nombre/es del/de los campo/os entre ''
    Transferencia.find({ usuario: id })
    .populate('cuenta')
    .populate('usuario')
    .exec((err, transfersDB) => {
        
        if(err) {
            return res.status(400).json({
                ok: false,
                message: err
            });
        }

        Transferencia.countDocuments({ estado: true }, (err, total) => {
            return res.json({
                ok: true,
                transfersDB: transfersDB,
                cantidadRegistros: total
            });
        });
    });
});


// Transferir
app.post('/api/transferir', verificarToken, (req, res) => {

    let body = req.body;
    let monto = parseInt(body.monto);

    // obtenemos al usuario origen
    Usuario.findOne({ rut: body.origen }, (err, usuarioOrigen) => {

        if (err) {
            return res.json({
                ok: false,
                message: 'No se encontro al usuario origen.',
                error: err
            });
        }

        // Obtenemos el usuario destinatario
        Usuario.findOne({ rut: body.destino }, (err, usuarioDestino) => {

            if (err) {
                return res.json({
                    ok: false,
                    message: 'No se encontro al usuario destino.',
                    error: err
                });
            }

            // Obtenemos la cuenta del origen
            Cuenta.findOne({ usuario: usuarioOrigen._id }, (err, cuentaOrigen) => {

                if (err) {
                    return res.json({
                        ok: false,
                        message: 'No se encontro la cuenta Origen.',
                        error: err
                    });
                }
                
                // Obtenemos la cuenta del destinatario
                Cuenta.findOne({ usuario: usuarioDestino._id }, (err, cuentaDestino) => {
                    if (err) {
                        return res.json({
                            ok: false,
                            message: 'No se encontro la cuenta Destino.',
                            error: err
                        });
                    }  

                    let saldoOrigen = cuentaOrigen.saldo;
                    let saldoDestino = cuentaDestino.saldo;
                    let saldoFinalOrigen = 0;                                           
                    let saldoFinalDestino = 0;


                    if(body.tipo == 'ENTRANTE'){

                        // Creamos una transferencia en base de datos y actualizamos saldos de cuentas
                        let transfer = new Transferencia({
                            monto: monto,
                            usuario: usuarioOrigen._id,
                            cuenta: cuentaOrigen._id,
                            tipo: body.tipo
                        });
        
                        transfer.save((err, transferDB) => {
                            if(err) {
                                return res.status(400).json({
                                    ok: false,
                                    mensaje: 'Ocurrio un error al intentar guardar la transferencia.',
                                    error: err
                                });
                            }

                            // sumamos el saldo de origen con el monto para obtener el saldo final de la cta.
                            saldoFinalOrigen = saldoOrigen + monto;

                            // Actualizamos el saldo de la cuenta origen
                            UpdateSaldo(transferDB.cuenta, saldoFinalOrigen);

                            return res.json({
                                ok: true,
                                message: 'transferencia realizada con exito',
                                transfer: transferDB
                            });

                        });                        
                    
                    }else if (body.tipo === 'SALIENTE'){
                        
                        // Si saldo disponible es mayor o igual al monto a transferir 
                        if(saldoOrigen >= monto){
                            
                            // restamos el monto del saldo de la cuenta origen
                            saldoFinalOrigen = saldoOrigen - monto;

                            // sumamos el monto al saldo de la cuenta destino
                            saldoFinalDestino = saldoDestino + monto;

                            // Creamos una transferencia en base de datos y actualizamos saldos de cuentas
                            let transfer = new Transferencia({
                                monto: monto,
                                usuario: usuarioOrigen._id,
                                cuenta: cuentaDestino._id,
                                tipo: body.tipo
                            });
            
                            transfer.save((err, transferDB) => {
                                if(err) {
                                    return res.status(400).json({
                                        ok: false,
                                        mensaje: 'Ocurrio un error al intentar guardar la transferencia.',
                                        error: err
                                    });
                                }

                                // Actualizamos el saldo de la cuenta origen
                                UpdateSaldo(cuentaOrigen._id, saldoFinalOrigen);

                                // Actualizamos el saldo de la cuenta destino
                                UpdateSaldo(transferDB.cuenta, saldoFinalDestino);

                                return res.json({
                                    ok: true,
                                    message: 'transferencia realizada con exito',
                                    transfer: transferDB
                                });

                            });
    
                        } else {
    
                            return res.json({
                                ok: false,
                                message: 'El monto es mayor al saldo disponible en esta cuenta.'
                            });
                        }
                    }

                });
                
            });
        });

    });

});

// Actualizar saldo cuenta
function UpdateSaldo(id, monto){
    
    Cuenta.findOneAndUpdate({ _id: id }, { $set: { saldo: monto } }, { new: true }, (err, cuentaDB) => {
        if (err) {
            return err;
        }

        return cuentaDB;
    });
}

module.exports = app;