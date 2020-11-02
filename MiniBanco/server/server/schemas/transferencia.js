const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Instanciamos mongoose Schema para poder crear Schemas
let Schema = mongoose.Schema;

// creamos el schema Transferencia
let Transferencia = new Schema({

    monto: {
        type: Number,
        required: [true, 'El monto es requerido.']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    cuenta: {
        type: Schema.Types.ObjectId,
        ref: 'cuenta',
        required: true
    },
    tipo: {
        type: String,
        enum: ['ENTRANTE', 'SALIENTE']
    },
    estado: {
        type: Boolean,
        default: true
    }

});

// Validador de uniques
Transferencia.plugin(uniqueValidator, { message: '{PATH} debe ser unico.' });

//exportamos el model Schema transferencia
module.exports = mongoose.model('transferencia', Transferencia);