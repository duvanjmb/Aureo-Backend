import connection from '../connection.js';

// LISTAR TODOS LOS PRODUCTOS
export const listProducts = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM productos");
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener catálogo", error: err.message });
    }
};

// AGREGAR UN NUEVO PRODUCTO
export const addProduct = async (req, res) => {
    const { id, nombre, precio, imagen, descripcion, stock } = req.body;
    try {
        const [result] = await connection.query(
            "INSERT INTO productos (id, nombre, precio, imagen, descripcion, stock) VALUES (?, ?, ?, ?, ?, ?)",
            [id, nombre, precio, imagen, descripcion, stock]
        );
        res.status(201).json({ message: "Producto creado", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: "Error al guardar", error: err.message });
    }
};

// ELIMINAR UN PRODUCTO
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query("DELETE FROM productos WHERE id = ?", [id]);
        res.status(200).json({ message: "Producto eliminado", id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    listProducts,
    addProduct,
    deleteProduct
};  