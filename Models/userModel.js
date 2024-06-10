const { pool } = require('./db.js');
const bcrypt = require('bcrypt');

const checkEmailExists = async (email) => {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM users WHERE email = ?', [email]);
    return rows[0].count > 0;
}

const createUser = async (name, email, password, role) => {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
        throw new Error('Email already exists.Please use anothr email or login.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role]);
    return result.insertId;
}

const getUserById = async (user_id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [user_id]);
    return rows[0];
}

const updateUser = async (user_id, name, email, password, role) => {
    const [result] = await pool.query('UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE user_id = ?', [name, email, password, role, user_id]);
    return result.affectedRows > 0;
}

const taskById = async (user_id) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [user_id]);
    return rows;
}

const taskById_task = async (task_id) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE task_id = ?', [task_id]);
    return rows[0];
}
const createTask = async (user_id, title, description, status) => {
    const [result] = await pool.query('INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)', [user_id, title, description, status]);
    return result.insertId;
};

const updateTask = async (task_id, title, description, status) => {
    const [result] = await pool.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE task_id = ?', [title,description,status,task_id]);
    return result.affectedRows > 0;
}

const getAllUser = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

module.exports = {
    createUser,
    getUserById,
    updateUser,
    taskById,
    createTask,
    updateTask,
    getAllUser,
    taskById_task
}
