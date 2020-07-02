import mysql from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);
pool.getConnection().then((conection) => {
    pool.releaseConnection(conection);
    console.log("Conectado a la base de datos.");
    
}, (err) => {
    console.log("Error en conexion: ", err);
});

export default pool;