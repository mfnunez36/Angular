import { Router } from 'express';
import { gamesController } from '../controllers/gamescontroller';

class GamesRoutes {
 
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        //creación de rutas utilizando los metodos del controller
        this.router.get('/', gamesController.list);
        this.router.get('/:id', gamesController.getById);
        this.router.post('/', gamesController.create);
        this.router.put('/:id', gamesController.update);
        this.router.delete('/:id', gamesController.delete);
    }
}

const gamesRoutes = new GamesRoutes();

export default gamesRoutes.router; 