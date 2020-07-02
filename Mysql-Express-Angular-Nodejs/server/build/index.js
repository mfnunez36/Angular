"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.port || 3000); //para tomar puerto actual o 3000
        this.app.use(morgan_1.default('dev')); //para ver las peticiones por consola (recibe una propiedad string)
        this.app.use(cors_1.default()); //para que angular pida los datos a nuestro server (no recibe parametros)
        this.app.use(express_1.default.json()); //para aceptar formatos json y entenderlos antes era BodyParser
        this.app.use(express_1.default.urlencoded({ extended: false })); //para enviar desde un formulario html (no recibe parametros)
    }
    //aquí se registran las rutas
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/games', gamesRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server en puerto: ", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
