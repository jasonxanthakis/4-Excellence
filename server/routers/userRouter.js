// routers/userRouter.js
const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/user");

//User Routers
userRouter.get('/student/:id/stats', userController.getUserStats); // /student/:id/stats change to this for specificity
userRouter.get('/:id', userController.getUserInfo);  
userRouter.get('/:id/classes', userController.getClassByTeacher); //if is_teacher == false {return only names} else if is_teacher == true {return class objects}
userRouter.get('/students/classes/:id', userController.getStudentsInClass); // pass a class id and get the students in the class returned
userRouter.get('/:id/classes', userController.getClasses);
userRouter.get('/:teacherid/:id/classes', userController.getAllClasses);  // test


userRouter.post('/signup', userController.createUser);
userRouter.post('/login', userController.CheckUserExists);
userRouter.post('/:teacherid/classes', userController.createClass); 


userRouter.delete('/:teacherid/:username', userController.deleteUser); // fix this 
userRouter.delete('/:id/classes/:class', userController.deleteClass);  // fix this


userRouter.patch('/:teacherid/classes/:class', userController.updateClassDetails);  // test



module.exports = userRouter;