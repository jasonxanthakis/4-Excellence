// routers/userRouter.js
const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/user");

//User Routers

userRouter.get('/student/:id/stats', userController.getUserStats); // /student/:id/stats change to this for specificity
userRouter.get('/:id', userController.getUserInfo);  
userRouter.get('/:id/classes', userController.getClassByTeacher); //if is_teacher == false {return only names} else if is_teacher == true {return class objects}
userRouter.get('/students/classes/:id', userController.getStudentsInClass); // pass a class id and get the students in the class returned
userRouter.get('/:id/classes', userController.getClasses);  //test
userRouter.get('/classes', userController.getAllClasses);  // test



userRouter.post('/signup', userController.createUser);
userRouter.post('/login', userController.CheckUserExists);


userRouter.delete('/:username', userController.deleteUser); // fix this 
userRouter.delete('/:id/classes/:class', userController.deleteClass);  // if is_teacher == true



// // userRouter.post('/:id/classes/:class, userController.createClass);  // if is_teacher == true

// // userRouter.patch('/:id/classes/:class, userController.updateClassDetails);  // if is_teacher == true


// // userRouter.delete('/:id/classes/:class, userController.deleteClass);  // if is_teacher == true


module.exports = userRouter;