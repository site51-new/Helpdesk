const pool = require('../db');

const Categoria = {
    async crearCategoria(categoria) {
        try {
            const query = {
                text: `INSERT INTO tCategoria (nombre_categoria, descripcion)
         VALUES ($1, $2) RETURNING *`,
                values: [categoria.nombre_categoria, categoria.descripcion],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerCategoria(id) {
        try {
            const query = {
                text: `SELECT * FROM tCategoria WHERE Id_Categoria = $1`,
                values: [id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerTodasLasCategorias() {
        try {
            const query = {
                text: `SELECT * FROM tCategoria`,
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async actualizarCategoria(id, categoria) {
        try {
            const query = {
                text: `UPDATE tCategoria SET nombre_categoria = $1, descripcion = $2
         WHERE Id_Categoria = $3 RETURNING *`,
                values: [categoria.nombre_categoria, categoria.descripcion, id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async eliminarCategoria(id) {
        try {
            const query = {
                text: `DELETE FROM tCategoria WHERE Id_Categoria = $1`,
                values: [id],
            };
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = Categoria;