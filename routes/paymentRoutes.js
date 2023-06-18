const express = require("express");
const router = express.Router();
const { Payment } = require("../controllers/paymentController");
const { verifyPayment } = require("../controllers/paymentController");

router.route("/verifyPayment/:userId").post(verifyPayment);
router.route("/").post(Payment);
module.exports = router;
