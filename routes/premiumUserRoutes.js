const express = require("express");
const router = express.Router();

const {
  createPremiumUser,
  getPremiumUsers,
  deletePremiumUser,
} = require("../controllers/premiumUser");

router.route("/premiumUsers").post(createPremiumUser);
router.route("/premiumUsers").get(getPremiumUsers);
router.route("/premiumUsers/:premiumUserId").delete(deletePremiumUser);

module.exports = router;
