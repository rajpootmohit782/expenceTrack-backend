const express = require("express");
const router = express.Router();
const ResetController = require("../controllers/ResetController");

// Other app configurations and middleware...

// Route to check the reset request

// Route to check the reset request
router.get("/:requestId", ResetController.checkResetRequest);

// Route to update the password
router.post("/update", ResetController.updatePassword);

router.post("/create", ResetController.createResetPass);
module.exports = router;
