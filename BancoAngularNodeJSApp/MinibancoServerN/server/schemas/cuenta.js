const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Instanciamos mongoose Schema para poder crear Schemas
let Schema = mongoose.Schema;

// creamos el schema Cuenta
let Cuenta = new Schema({

    saldo: {
        type: Number,
        default: 0
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    cuenta: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }

});

// Validador de uniques
Cuenta.plugin(uniqueValidator, { message: '{PATH} debe ser unico.' });

//exportamos el model Schema cuenta
module.exports = mongoose.model('cuenta', Cuenta);