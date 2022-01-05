const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");

exports.tokenDecoding = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decodedToken._id);
    if (req.user) {
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
};

exports.hashPassword = async (req, res, next) => {
  try {
    req.body.pass = await bcrypt.hash(req.body.pass, 8);
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.decryptPassword = async (req, res, next) => {
  try {
    req.user = await User.findOne({ username: req.body.username });
    if (await bcrypt.compare(req.body.pass, req.user.pass)) {
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
};
