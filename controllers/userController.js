const User = require("../models/user");

exports.getUser = (req, res) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const { name, email } = req.body;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.name = name;
      user.email = email;
      return user.save();
    })
    .then((updatedUser) => {
      res.json({ message: "User updated successfully", user: updatedUser });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    });
};
