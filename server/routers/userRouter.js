// routers/userRouter.js
const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/user");
const authenticator = require('../middleware/authenticator');

//User Routers
userRouter.get('/student/:id/stats', userController.getUserStats); // returns array of objects
userRouter.get('/:id', userController.getUserInfo);  
userRouter.get('/:teacherid/classes', userController.getClassByTeacher); //get class by a specific teacher id
userRouter.get('/students/classes/:id', userController.getStudentsInClass); // get students in a class using classid
userRouter.get('/:teacherid/allclasses', userController.getAllClasses);  // require teacherid 

userRouter.post('/signup', userController.createUser);
userRouter.post('/login', userController.CheckUserExists);
userRouter.post('/:teacherid/classes', userController.createClass); 


userRouter.delete('/:username', userController.deleteUser); 
userRouter.delete('/:teacherid/classes/:class', userController.deleteClass);  // teachers can only delete classes they are part of user id and class_id have to match


userRouter.patch('/:teacherid/classes/:classId', userController.updateClassDetails);



module.exports = userRouter;