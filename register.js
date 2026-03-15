import connection from './connection.js';
import md5 from 'md5';


const register = async(req, res) => {
    const data = req.query;
    try {
        const [results, fields] = await connection.query(
            "INSERT INTO `usuarios` (`id`, `nombre`, `clave`, `correo`) VALUES (NULL, ?, ?, ?)",
            [data.nombre, md5(data.clave), data.correo]
        );

        if (results.affectedRows > 0) {
            if (req.session) req.session.correo = data.correo;
            res.status(200).json({ message: 'Registro exitoso' }); 
        } else {
            res.status(400).json({ message: 'Error al registrar usuario' });
        }

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
        res.status(500).send('Error del servidor');
    }
}

export default register;