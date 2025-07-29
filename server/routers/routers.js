const { Router } = require("express");
const userController = require("../controllers/user");
const userRouter = Router();

// userRouter.get('/', userController.);
userRouter.get('/:id', userController.getUserStats);
userRouter.post('/', userController.createUser);
// userRouter.patch(“/:id”, userController.);
// userRouter.delete(“/:id”, userController.);

module.exports = userRouter;