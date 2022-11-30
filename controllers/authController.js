const User = require("../models/user");

exports.signup = (req, res) => {
  // Extract and validate request data
  const { name, email, password } = req.body;

  // Check if the email is already present in the database
  User.findOne({ where: { email } })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(409)
          .json({
            message: "Email already exists, please choose a different email",
          });
      }

      // Create a new user in the database
      User.create({ name, email, password })
        .then((user) => {
          // Send a response back to the client
          res.status(201).json({ message: "User created successfully", user });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "An error occurred" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    });
};

exports.login = (req, res) => {
  // Extract and validate request data
  const { email, password } = req.body;
  // Perform login logic, e.g., check if user exists and verify password
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check password validity, you can use bcrypt or any other library for password hashing/verification
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // User authentication successful
      res.json({ message: "Login successful", user });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    });
};
