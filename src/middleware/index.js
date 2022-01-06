const bcrypt = require("bcryptjs");
const User = require("../user/user.model");

exports.hashPassword = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    await next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unsuccessful, please try again" });
  }
};

exports.passwordMatch = async (req, res) => {
  try {
    const userPassword = await req.body.password;
    const match = await bcrypt.compare(userPassword, req.body.password);
    if (match) {
      res.status(201).send({ message: "Bingo!" });
    } else {
      res.status(202).send("Password does not a match");
    }
  } catch (error) {
    res.status(501).send({ message: "Unsuccessful" });
  }
};
