const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.signup = (req, res) => {
  // Extract and validate request data
  const { name, email, password } = req.body;

  // Check if the email is already present in the database
  User.findOne({ where: { email } })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({
          message: "Email already exists, please choose a different email",
        });
      }

      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "An error occurred" });
        }

        // Create a new user in the database with the hashed password
        User.create({ name, email, password: hashedPassword })
          .then((user) => {
            // Send a response back to the client
            res
              .status(201)
              .json({ message: "User created successfully", user });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "An error occurred" });
          });
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

  // Find the user by email
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the entered password with the hashed password stored in the database
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "An error occurred" });
        }

        if (!result) {
          return res.status(401).json({ message: "Invalid password" });
        }

        // User authentication successful
        res.json({ message: "Login successful", user });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    });
};
