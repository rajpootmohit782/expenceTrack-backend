const PremiumUser = require("../models/Premium");
exports.createPremiumUser = async (req, res) => {
  try {
    const { userType, signature } = req.body;
    const ExpuserId = req.headers.id; // Assuming the user ID is present in the headers

    // Create the premium user in the database
    const premiumUser = await PremiumUser.create({
      userType,
      signature,
      ExpuserId, // Associate the user ID with the premium user
    });

    res.status(201).json(premiumUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getPremiumUsers = async (req, res) => {
  try {
    // Retrieve all premium users
    const premiumUsers = await PremiumUser.findAll();

    res.status(200).json(premiumUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.deletePremiumUser = async (req, res) => {
  try {
    const premiumUserId = req.params.premiumUserId; // Assuming the premium user ID is passed as a route parameter

    // Find the premium user by ID
    const premiumUser = await PremiumUser.findByPk(premiumUserId);

    // Check if the premium user exists
    if (!premiumUser) {
      return res.status(404).json({ error: "Premium user not found" });
    }

    // Delete the premium user
    await premiumUser.destroy();

    res.status(200).json({ message: "Premium user deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
