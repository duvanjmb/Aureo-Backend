import connection from './connection.js';

const obtainUsers = async(req, res) => {
    if (!req.session.correo) {
        res.status(200).send('Sesión válida');  
        return; // Exit the function after sending the response
    }
    try {
        const [results, fields] = await connection.query(
            "SELECT * FROM `usuarios`",
        );
        res.status(200).json(results); // Send the results as JSON response

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
        res.status(500).send('Error del servidor');
    }
}


const deleteUser = async(req, res) => {
    if (!req.session.correo) {
        res.status(200).send('Sesión válida');  
        return; // Exit the function after sending the response
    }
    const data = req.query;
    try {
        const [results, fields] = await connection.query(
            "DELETE FROM usuarios WHERE `usuarios`.`id` = ?",
            [data.id]
        );
        if (results.affectedRows > 0) {
            res.status(200).send('Registro eliminado exitosamente');
        } else {
            res.status(401).send('Error al eliminar registro');
        } 

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
        res.status(500).send('Error del servidor');
    }
}

export { obtainUsers, deleteUser };