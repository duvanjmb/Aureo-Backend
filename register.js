import connection from './connection.js';
import md5 from 'md5';


const register = async(req, res) => {
    const { nombre, clave, correo } = req.body;
    try {

        if (!nombre || !clave || !correo) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const [results] = await connection.query(
            "INSERT INTO `usuarios` (`id`, `nombre`, `clave`, `correo`) VALUES (NULL, ?, ?, ?)",
            [nombre, md5(clave), correo]
        );

        if (results.affectedRows > 0) {
            if (req.session) req.session.correo = correo;
            res.status(200).json({ message: 'Registro exitoso' }); 
        } else {
            res.status(400).json({ message: 'Error al registrar usuario' });
        }

    } catch (err) {
        console.error("Error en el registro:", err);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export default register;