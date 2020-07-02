import { Router } from 'express';
import { indexController } from '../controllers/indexcontroller';

class IndexRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        //esta es otra forma de generar una ruta sin controller de ruta
        //this.router.get('/', (req, res) => { res.send("Index") });
        this.router.get('/', indexController.index); 
    }
}

const indexRoutes = new IndexRoutes();

export default indexRoutes.router; 