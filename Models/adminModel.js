const { pool } = require('./db.js');

const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

const deleteUser = async (user_id) => {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);
    return result.affectedRows > 0;
}

const AllTask = async () => {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
}

const taskById = async (task_id) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE task_id = ?', [task_id]);
    return rows[0];
}

const deleteTask = async (task_id) => {
    const [result] = await pool.query('DELETE FROM tasks WHERE task_id = ?', [task_id]);
    return result.affectedRows > 0;
}

module.exports = {
    getAllUsers,
    deleteUser,
    taskById,
    AllTask,
    deleteTask
}
