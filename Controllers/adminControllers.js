const {getAllUsers, deleteUser, AllTask, taskById, deleteTask} = require('../Models/adminModel.js');
const getAllusersControllers = async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(403).json({message: 'Forbiden'});
        return ;
    }
    try{
        const users = await getAllUsers();
        res.status(200).json(users);
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const deleteUserControllers = async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(403).json({message: 'You are not allowed to delete user'});
        return ;
    }
    try{
        const {id} = req.params;
        const success = await deleteUser(id);
        if(success){
            res.status(200).json({message: 'User deleted successfully'});
        }else{
            res.status(404).json({message: 'User not found'});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const AllTaskControllers = async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(403).json({message: 'Forbiden'});
        return ;
    }
    try{
        const tasks = await AllTask();
        res.status(200).json(tasks);
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const taskByIdControllers = async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(403).json({message: 'Forbiden'});
        return ;
    }
    try{
        const task = await taskById(req.params.id);
        if(task){
            res.status(200).json(task);
        }else{
            res.status(404).json({message: 'Task not found'});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const deleteTaskControllers = async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(403).json({message: 'Forbiden'});
        return ;
    }
    try{
        const {id} = req.params;
        const success = await deleteTask(id);
        if(success){
            res.status(200).json({message: 'Task deleted successfully'});
        }else{
            res.status(404).json({message: 'Task not found'});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllusersControllers,
    deleteUserControllers,
    AllTaskControllers,
    taskByIdControllers,
    deleteTaskControllers
}