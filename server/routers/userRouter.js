// routers/userRouter.js
const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/user");

//User Routers
userRouter.post('/bye', userController.deleteUser);
userRouter.post('/signup', userController.createUser);
userRouter.post('/login', userController.CheckUserExists);
userRouter.get('/student/:id', userController.getStats);

module.exports = userRouter;