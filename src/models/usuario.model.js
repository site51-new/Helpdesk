const pool = require('../db');

const Usuario = {
    async crearUsuario(usuario) {
        try {
            const resultPersonal = await pool.query(`
                INSERT INTO "tPersonal" (correo, dni, "Id_Dependencia", usuario, password, "Nombres", apellidos)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING "Id_Personal"
            `, [
                usuario.correo,
                usuario.dni,
                usuario.Id_Dependencia || '1',
                usuario.usuario,
                usuario.password,
                usuario.nombre,
                usuario.apellido
            ]);

            const idPersonal = resultPersonal.rows[0].Id_Personal;

            await pool.query(`
                INSERT INTO "tUsuarios" ("Id_Personal")
                VALUES ($1)
            `, [idPersonal]);

            return { Id_Personal: idPersonal };
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw new Error('No se pudo registrar el usuario. Intente nuevamente.');
        }
    },

    async existeUsuarioPorCorreoODni(correo, dni) {
        try {
            const result = await pool.query(`
                SELECT 1 FROM "tPersonal" WHERE correo = $1 OR dni = $2 LIMIT 1
            `, [correo, dni]);
            return result.rowCount > 0;
        } catch (error) {
            console.error('Error al verificar existencia de usuario:', error);
            throw new Error('Error al verificar la existencia del usuario.');
        }
    },

    async obtenerUsuario(id) {
        try {
            const result = await pool.query(`
                SELECT u."Id_Usuario", p.*
                FROM "tUsuarios" u
                JOIN "tPersonal" p ON u."Id_Personal" = p."Id_Personal"
                WHERE u."Id_Personal" = $1
            `, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            throw new Error('Error al obtener usuario.');
        }
    },

    async obtenerUsuarioPorNombre(usuarioNombre) {
        try {
            const result = await pool.query(`
                SELECT u."Id_Usuario", p.*
                FROM "tUsuarios" u
                JOIN "tPersonal" p ON u."Id_Personal" = p."Id_Personal"
                WHERE p.usuario = $1
            `, [usuarioNombre]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener usuario por nombre:', error);
            throw new Error('Error al obtener usuario.');
        }
    },

    async obtenerTodosLosUsuarios() {
        try {
            const result = await pool.query(`
                SELECT u."Id_Usuario", p.*
                FROM "tUsuarios" u
                JOIN "tPersonal" p ON u."Id_Personal" = p."Id_Personal"
            `);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw new Error('Error al obtener usuarios.');
        }
    },

    async actualizarUsuario(id, usuario) {
        try {
            const result = await pool.query(`
                UPDATE "tPersonal"
                SET usuario = $2,
                    password = $3,
                    "Nombres" = $4,
                    apellidos = $5,
                    dni = $6,
                    correo = $7
                WHERE "Id_Personal" = $1
                RETURNING *
            `, [
                id,
                usuario.usuario,
                usuario.password,
                usuario.nombre,
                usuario.apellido,
                usuario.dni,
                usuario.correo
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw new Error('Error al actualizar usuario.');
        }
    },

    async eliminarUsuario(id) {
        try {
            await pool.query(`
                DELETE FROM "tUsuarios" WHERE "Id_Personal" = $1
            `, [id]);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw new Error('Error al eliminar usuario.');
        }
    },
};

module.exports = Usuario;
