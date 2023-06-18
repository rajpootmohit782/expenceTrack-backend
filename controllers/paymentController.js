const Razorpay = require("razorpay");
const crypto = require("crypto");
const YOUR_KEY_ID = "rzp_test_uXuHsMrzD4gT4k";
const YOUR_KEY_SECRET = "rnmjSEwrpdLuckGEoCp6RNpU";
const PremiumUser = require("../models/Premium");
const instance = new Razorpay({
  key_id: YOUR_KEY_ID,
  key_secret: YOUR_KEY_SECRET,
});

const Payment = async (req, res) => {
  console.log("hi=====================================>", req.body);
  var options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
      order,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({
      error: "Failed to create order",
    });
  }
};

const verifyPayment = async (req, res) => {
  const userId = req.params.userId;
  console.log(req);
  const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "rnmjSEwrpdLuckGEoCp6RNpU")
    .update(body.toString())
    .digest("hex");
  const Signature_received = req.body.razorpay_signature;
  console.log("Signature received:", req.body.razorpay_signature);
  console.log("Signature generated:", expectedSignature);

  if (expectedSignature === Signature_received) {
    try {
      // Create the premium user in the database
      const premiumUser = await PremiumUser.create({
        userType: "One",
        signature: expectedSignature,
        ExpuserId: userId,
      });
     res.redirect('https://jum7lv-3000.csb.app/premiumSucessfull');
      // res.status(200).json({ Match: true, premiumUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  } else {
    res
      .status(203)
      .json({ Match: false, Signature_received, expectedSignature });
  }
};

module.exports = {
  Payment,
  verifyPayment,
};
