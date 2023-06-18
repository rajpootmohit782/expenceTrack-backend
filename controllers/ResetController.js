const ForgotPasswordRequest = require("../models/ForgotPasswordRequest");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const checkResetRequest = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    // Check if the reset request exists and is active
    const resetRequest = await ForgotPasswordRequest.findOne({
      where: {
        id: requestId,
        isActive: true,
      },
      include: [{ model: User }],
    });

    if (!resetRequest) {
      return res
        .status(404)
        .json({ error: "Reset request not found or expired" });
    }

    // Render a form for the user to update the new password
    res.render("password-reset-form", {
      requestId,
      userId: resetRequest.User.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  const requestId = req.body.requestId;
  const newPassword = req.body.newPassword;

  try {
    // Check if the reset request exists and is active
    const resetRequest = await ForgotPasswordRequest.findOne({
      where: {
        id: requestId,
        isActive: true,
      },
      include: [{ model: User }],
    });

    if (!resetRequest) {
      return res
        .status(404)
        .json({ error: "Reset request not found or expired" });
    }

    // Update the password in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the password for the user using the provided userId
    const user = resetRequest.ExpUser;

    user.password = hashedPassword;
    await user.save();

    // Set the reset request as inactive
    resetRequest.isActive = false;
    await resetRequest.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

const createResetPass = async (req, res) => {
  const email = req.body.email;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new forgot password request and associate it with the user
    const resetRequest = await ForgotPasswordRequest.create({
      ExpUserId: user.id,
    });

    res.status(201).json({
      message: "Reset password request created successfully",
      resetRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createResetPass,
  checkResetRequest,
  updatePassword,
};
