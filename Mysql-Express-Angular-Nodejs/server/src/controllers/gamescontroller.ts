import { Request, Response } from 'express';
import db from '../database';
import pool from '../database';

class GamesController {
    //las funciones son asincronas para no esperar a que responda los datos.
    
    //Listar todos los juegos
    public async list(req: Request, res: Response){ 
        const lista = await pool.query('select * from games');
        
        if(lista.length > 0){
            res.json(lista);
        }else{
            res.json({ msj:"No se encontraron juegos." });
        } 
    }

    //Buscar juego por ID
    public async getById(req: Request, res: Response){
        //desestructura de obj solo se obtiene una parte de req.params
        const { id } = req.params;
        const juego = await pool.query('select * from games where id = ?', [id]);
        
        if(juego.length > 0){
            res.status(200).json(juego[0]);
        }else{
            return res.status(404).json({ msj: "Juego no encontrado." });
        }        
    }

    //Crear Juego
    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('insert into games set ?', [req.body])
        res.json({ msj: "Juego creado." });
    }

    //Actualizar Juego
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //se pasaran los datos por el req.body y sera actualizada la tabla con algun dato que haya cambiado.
        await pool.query('update games set ? where id = ?', [req.body, id]);
        
        res.json({ msj: "El juego ha sido actualizado." });
    }

    //Eliminar Juego
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('delete from games where id = ?', [id]);
        res.json({ msj: "Juego eliminado.", Id: req.params.id });
    }
}

//cuando exportas directamente debes importar con llaves (import { gamesController } from '...';)
//si exportas por default al importar lo haras sin llaves (import gamesController from '...';)
export const gamesController = new GamesController();