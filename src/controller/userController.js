import pool from "../db.js"

const validateRole = async (user_id) => {
    const sql = "SELECT rol_id FROM users WHERE id_users = ?"
    const [rs] = await pool.execute(sql, [user_id])
    if (rs[0].rol_id !== 1) {
        throw { message: "Usuario no autorizado", status: 401 }
    }

}

const readUser = async (q, r) => {
    try {
        const sql = "SELECT * FROM users"
        const [response] = await pool.execute(sql)
        r.status(200).json(response)
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message })
    }
}

const createUser = async (q, r) => {
    try {

        const { body: { user_name, email, rol_id, profile_picture }, headers: { user_id } } = q;
        await validateRole(user_id)

        const sql = "INSERT INTO users (user_name, email, rol_id, profile_picture) VALUES (?, ?, ?, ?)";
        await pool.execute(sql, [user_name, email, rol_id, profile_picture]);
        r.status(200).json({ success: 'Usuario creado correctamente' })
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message })
    }
}

const deleteUser = async (q, r) => {
    try {

        const { params: { id }, headers: { user_id } } = q;
        await validateRole(user_id)

        const sql = "DELETE FROM users WHERE id_users = ?"
        await pool.execute(sql, [id])
        r.status(201).json({ success: 'Usuario eliminado correctamente' })
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message })
    }
}

const updateUser = async (q, r) => {
    try {

        const { body: { user_name, email, rol_id, profile_picture }, headers: { user_id }, params: { id } } = q
        await validateRole(user_id)

        const sql = "UPDATE users SET user_name = ?, email = ?, rol_id = ?, profile_picture = ? WHERE id_users = ?"
        await pool.execute(sql, [user_name, email, rol_id, profile_picture, id])
        r.status(201).json({ success: 'Usuario actualizado correctamente' })
    } catch (error) {
        r.status(error.status || 400).json({ error: error.message })
    }
}


export { readUser, createUser, deleteUser, updateUser }