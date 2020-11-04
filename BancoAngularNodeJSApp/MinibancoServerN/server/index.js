require('./config/config');

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

// app.use(express.static( __dirname + '/public' ));

// app.get('/', function(req, res){
//     res.sendFile( path.join(__dirname + '/public/index.html') );
// });


const cors = require('cors');


// quitar cors
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// var corsOptions = {
//     origin: 'https://minibanco-angular.herokuapp.com',
//     optionsSuccessStatus: 200 // For legacy browser support
// }

// //para que angular pida los datos a nuestro server (no recibe parametros)
// app.use(cors(corsOptions));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Rutas
app.use(require('./routes/index'));



// Conexion a la base de datos
mongoose.connect(process.env.URLDB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
}, (err, res) => {
    if(err){ throw err; }

    console.log("Base de datos conectada. ");
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});