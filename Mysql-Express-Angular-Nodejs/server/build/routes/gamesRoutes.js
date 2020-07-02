"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamescontroller_1 = require("../controllers/gamescontroller");
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //creación de rutas utilizando los metodos del controller
        this.router.get('/', gamescontroller_1.gamesController.list);
        this.router.get('/:id', gamescontroller_1.gamesController.getById);
        this.router.post('/', gamescontroller_1.gamesController.create);
        this.router.put('/:id', gamescontroller_1.gamesController.update);
        this.router.delete('/:id', gamescontroller_1.gamesController.delete);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
