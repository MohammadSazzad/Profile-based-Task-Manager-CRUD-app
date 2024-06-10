const express = require('express');
const { getUserByIdControllers, createUserControllers, updateUserControllers, taskByIdControllers, createTaskControllers, updateTaskControllers, userLogin } = require('../Controllers/userControllers');
const { verifyToken } = require('../Helper/authCheck');
const userRouter = express.Router();

userRouter.post('/Register', createUserControllers);
userRouter.post('/login', userLogin);
userRouter.get('/Profile/:id', verifyToken, getUserByIdControllers);
userRouter.put('/Profile-update/:id', verifyToken, updateUserControllers);
userRouter.get('/Task/:id', verifyToken, taskByIdControllers);
userRouter.post('/Task-Register', verifyToken, createTaskControllers);
userRouter.put('/Task-update/:id', verifyToken, updateTaskControllers);

module.exports = userRouter;