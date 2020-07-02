import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import morgan from 'morgan';
import cors from 'cors';

class Server {
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set( 'port', process.env.port || 3000 ); //para tomar puerto actual o 3000
        this.app.use(morgan('dev')); //para ver las peticiones por consola (recibe una propiedad string)
        this.app.use(cors()); //para que angular pida los datos a nuestro server (no recibe parametros)
        this.app.use(express.json()); //para aceptar formatos json y entenderlos antes era BodyParser
        this.app.use(express.urlencoded({extended: false})); //para enviar desde un formulario html (no recibe parametros)
    }


    //aquí se registran las rutas
    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/games', gamesRoutes);
    }


    start(): void {
        this.app.listen(this.app.get('port'), () => { 
            console.log("Server en puerto: ", this.app.get('port') );
    });
    }
}

const server = new Server();

server.start();