const jwt = require('jsonwebtoken');

// ============================
//  Verificar Token
// ============================
let verificarToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify( token, process.env.SEED_TOKEN, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                message: err
            });
        }
        
        req.usuario = decoded.usuario;
        
        next();
        
    });
};

module.exports = {
    verificarToken
}