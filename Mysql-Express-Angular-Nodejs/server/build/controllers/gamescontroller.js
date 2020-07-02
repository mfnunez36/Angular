"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesController = void 0;
const database_1 = __importDefault(require("../database"));
class GamesController {
    //las funciones son asincronas para no esperar a que responda los datos.
    //Listar todos los juegos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista = yield database_1.default.query('select * from games');
            if (lista.length > 0) {
                res.json(lista);
            }
            else {
                res.json({ msj: "No se encontraron juegos." });
            }
        });
    }
    //Buscar juego por ID
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //desestructura de obj solo se obtiene una parte de req.params
            const { id } = req.params;
            const juego = yield database_1.default.query('select * from games where id = ?', [id]);
            if (juego.length > 0) {
                res.status(200).json(juego[0]);
            }
            else {
                return res.status(404).json({ msj: "Juego no encontrado." });
            }
        });
    }
    //Crear Juego
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('insert into games set ?', [req.body]);
            res.json({ msj: "Juego creado." });
        });
    }
    //Actualizar Juego
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //se pasaran los datos por el req.body y sera actualizada la tabla con algun dato que haya cambiado.
            yield database_1.default.query('update games set ? where id = ?', [req.body, id]);
            res.json({ msj: "El juego ha sido actualizado." });
        });
    }
    //Eliminar Juego
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('delete from games where id = ?', [id]);
            res.json({ msj: "Juego eliminado.", Id: req.params.id });
        });
    }
}
//cuando exportas directamente debes importar con llaves (import { gamesController } from '...';)
//si exportas por default al importar lo haras sin llaves (import gamesController from '...';)
exports.gamesController = new GamesController();
