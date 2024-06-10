const { createJWT } = require("../Helper/jsonwebtoken");
const bcrypt = require('bcrypt');
const { createUser, getUserById, updateUser, taskById, createTask, updateTask, getAllUser, taskById_task } = require("../Models/userModel");

const getUserByIdControllers = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    const { user_id } = req.user; 
    const { id } = req.params;

    if (user_id !== parseInt(id)) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        const user = await getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const createUserControllers = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        const userId = await createUser(name, email, password, role);
        const token = createJWT({user_id: userId, name, role}, process.env.JWT_KEY, '1h');
        res.status(201).json({id: userId, name, email, role, token});     
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const updateUserControllers = async (req, res) => {
    if(!req.user){
        return res.status(401).json({message: 'Unauthorized access'});
    }
    const {user_id} = req.user;
    const {id} = req.params;
    if(user_id !== parseInt(id)){
        return res.status(403).json({message: 'Forbidden'});
    }
    try{
        const {id} = req.params;
        const {name, email, password, role} = req.body;
        let hashedPassword = password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        const success = await updateUser (id, name, email, hashedPassword, role);
        if(success){
            res.status(200).json({message: 'User updated successfully'});
        }else{
            res.status(404).json({message: 'User not found'});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const taskByIdControllers = async (req,res) => {
    if(!req.user){
        return res.status(401).json({message: 'Unauthorized access'});
    }
    const {user_id} = req.user;
    const {id} = req.params;
    if(user_id !== parseInt(id)){
        return res.status(403).json({message: 'Forbidden'});
    }
    try{
        const task = await taskById(req.params.id);
        if(task){
            res.status(200).json(task);
        }else{
            res.status(404).json({message: 'Task not found'});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const createTaskControllers = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const {id: tokenUserId } = req.user;
    try {
        const { title, description, status } = req.body;
        const task_id = await createTask(tokenUserId, title, description, status);
        res.status(201).json({ id: task_id, user_id: tokenUserId, title, description, status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateTaskControllers = async (req,res) => {
    if(!req.user){
        return res.status(401).json({message: 'Unauthorized access'});
    }
    const {user_id: tokenUserId} = req.user;
    const {id: task_id} = req.params;
    try{
        const task = await taskById_task(task_id);
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        if (task.user_id !== tokenUserId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const {id} = req.params;
        const {title, description, status} = req.body;
        const success = await updateTask(id, title, description, status);
        if(success){
            res.status(200).json({message: 'Task updated'});
        }else{
            res.status(404).json({message: 'Task not found'});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const users = await getAllUser();
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    try {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = createJWT({ user_id: user.user_id, name: user.name, role: user.role }, process.env.JWT_KEY, '1h');
        console.log('Generated token:', token); // Log the generated token
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserByIdControllers,
    createUserControllers,
    updateUserControllers,
    taskByIdControllers,
    createTaskControllers,
    updateTaskControllers,
    userLogin
}