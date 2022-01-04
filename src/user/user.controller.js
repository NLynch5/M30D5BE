const User = require("./user.model'");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.status(200).send({ user: user.username, token });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id }, process.env.SECRET);
    res.status(200).send({ user: req.user.username, token });
  } catch (error) {
    console.log(error);
  }
};
