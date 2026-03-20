import connection from '../connection.js';


export const listUsers = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT id, nombre, correo FROM usuarios");
        
        return res.status(200).json(results); 
    } catch (err) {
        console.error("Error en listUsers:", err);
        return res.status(500).json({ message: "Error al obtener usuarios", error: err.message });
    }
};


export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await connection.query("SELECT id, nombre, correo FROM usuarios WHERE id = ?", [id]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        return res.status(200).json(results[0]);
    } catch (err) {
        return res.status(500).json({ message: "Error interno", error: err.message });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await connection.query("DELETE FROM usuarios WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No se encontró el usuario para eliminar" });
        }

        return res.status(200).json({ message: "Usuario eliminado correctamente", idDeleted: id });
    } catch (err) {
        return res.status(500).json({ message: "Error al intentar eliminar", error: err.message });
    }
};


export default {
    listUsers,
    getUser,
    deleteUser
};