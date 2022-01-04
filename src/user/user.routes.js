const { Router } = require("express");
const { addUser, login } = require("./user.controllers");
const {
  decryptPassword,
  hashPassword,
  tokenDecoding,
} = require("../middleware");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.post("/login", decryptPassword, login);
userRouter.get("/user", tokenDecoding, login);

module.exports = userRouter;
