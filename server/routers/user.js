const { Router } = require("express");
const userController = require("../controllers/user.js");

const userRouter = Router();

// note need to authenticate and authorise here

// userRouter.get('/:id', userController.getUserInfo);
userRouter.get('/:id/stats', userController.getUserStats); // if is_teacher == false
// userRouter.get('/:id/classes, userController.getClasses); // if is_teacher == false {return only names} else if is_teacher == true {return class objects}
// userRouter.get('/:id/classes/:class, userController.getClassByTeacher);  // if is_teacher == true

userRouter.post('/login', userController.createUser);
// userRouter.post('/signup', userController.signup);
// userRouter.post('/:id/classes/:class, userController.createClass);  // if is_teacher == true

// userRouter.patch('/:id/classes/:class, userController.updateClassDetails);  // if is_teacher == true

// userRouter.delete(“/:id”, userController.deleteUser);
// userRouter.delete('/:id/classes/:class, userController.deleteClass);  // if is_teacher == true

module.exports = userRouter;