const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Instanciamos mongoose Schema para poder crear Schemas
let Schema = mongoose.Schema;

// creamos el schema Usuario
let Usuario = new Schema({
    rut: {
        type: String,
        unique: true,
        required: [true, 'El rut es requerido.']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido.']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido.']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.']
    },
    estado: {
        type: Boolean,
        default: true
    }

});

// Validador de uniques
Usuario.plugin(uniqueValidator, { message: '{PATH} debe ser unico.' });

//exportamos el model Schema usuario
module.exports = mongoose.model('usuario', Usuario);