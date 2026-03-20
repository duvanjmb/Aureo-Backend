import connection from './connection.js';
import md5 from 'md5';

const login = async(req, res) => {
    const data = req.query;
    try {
        const [results, fields] = await connection.query(
            "SELECT * FROM `usuarios` WHERE `correo` = ? AND `clave` = ?",
            [data.correo, md5(data.clave)]
        );

        if (results.length > 0) {
            const usuarioEncontrado = results[0];

            if (req.session) {
                req.session.correo = data.correo;
            }


            res.json({
                message: "Login exitoso",
                nombre: usuarioEncontrado.nombre,
                rol: "cliente"
            });
        } else {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }   

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
        res.status(500).send('Error del servidor');
    }
}

export default login;