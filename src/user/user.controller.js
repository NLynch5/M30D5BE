//import { useState } from "react";
const bcrypt = require("bcryptjs");
const User = require("./user.model");

//CREATE (POST)
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({ message: "Successfully add user", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unsuccessful, please try again" });
  }
};

//READ (GET)
exports.listUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ message: "List of all users", users });
  } catch (error) {
    console.log(error);
  }
};

// UPDATE (PUT/PATCH)
exports.updateUser = async (req, res) => {
  try {
    updateUser = await User.findByIdAndUpdate(req.body._id, req.body);
    updateUser = await User.findById(req.body._id);
    res.status(200).send({ message: "Updated user", updateUser });
  } catch (error) {
    console.log(error);
  }
};

// DELETE (DELETE)
exports.deleteUser = async (req, res) => {
  try {
    deleteUser = await User.deleteOne(req.params.body);
    res.status(200).send({ message: "User Deleted", deleteUser });
  } catch (error) {
    console.log(error);
  }
};

//login function
exports.loginUser = async (req, res, next) => {
  try {
    const loginUser = await User.findOne({ email: req.body.email });
    if (await bcrypt.compare(req.body.password, loginUser.password)) {
      req.user = loginUser;
      next();
      res.status(200).send({ message: "succesfully logged in", });
    } else {
      console.log("error decrypt")
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "incorrect Email or Password  Try Again!" });
  }
};
//check connection in terminal using node src/server.js - once connection is succeessfully established then
//test using GET/POST etc in Insomnia before checking the database has changed correctly in MongoDB/Mongoose