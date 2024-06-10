const express = require('express');
const { getAllusersControllers, AllTaskControllers, taskByIdControllers, deleteTaskControllers, deleteUserControllers } = require('../Controllers/adminControllers');
const { taskById } = require('../Models/adminModel');
const { verifyToken } = require('../Helper/authCheck');
const adminRouter = express.Router();


adminRouter.get('/users', verifyToken, getAllusersControllers);
adminRouter.get('/tasks', verifyToken, AllTaskControllers);
adminRouter.get('/task_id/:id', verifyToken, taskByIdControllers);
adminRouter.delete('/task/:id', verifyToken, deleteTaskControllers);
adminRouter.delete('/users/:id', verifyToken, deleteUserControllers);

module.exports = adminRouter;