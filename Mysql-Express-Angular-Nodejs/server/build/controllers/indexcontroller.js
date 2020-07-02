"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json("Index");
    }
}
//cuando exportas directamente debes importar con llaves (import { indexController } from '...';)
//si exportas por default al importar lo haras sin llaves (import indexController from '...';)
exports.indexController = new IndexController();
