const { Router } = require("express");
const {
  addUser,
  listUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("./user.controller.js");
const userRouter = Router();
const { hashPassword } = require("../middleware");
const { passwordMatch } = require("../middleware");

userRouter.post("/user", hashPassword, addUser); //CRUD CREATE
userRouter.get("/user", listUser); //CRUD READ
userRouter.put("/user", hashPassword, passwordMatch, updateUser); //CRUD UPDATE
userRouter.delete("/user", deleteUser); //CRUD DELETE

userRouter.post("/user", loginUser);

module.exports = userRouter;
