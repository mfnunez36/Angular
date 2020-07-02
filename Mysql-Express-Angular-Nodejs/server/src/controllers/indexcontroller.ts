import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response){ 
        res.json("Index");
    } 
}

//cuando exportas directamente debes importar con llaves (import { indexController } from '...';)
//si exportas por default al importar lo haras sin llaves (import indexController from '...';)
export const indexController = new IndexController();