const User = require("../models/userModel");

const allUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(error);
  }
};
const postUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    let newUser = new User({ username, email });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.error(err);
  }
};
const putUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    let user = User.findOneAndUpdate(
      { _id: req.params.id },
      { username, email },
      { new: true }
    );
    res.send({ message: "User successfully updated", user });
  } catch (err) {
    console.error(err);
  }
};
const removeUser = async (req, res) => {
  await User.findOneAndDelete(req.params.id);
  res.send({ message: "User deleted successfully" });
};

module.exports = { allUsers, postUser, putUser, removeUser };
