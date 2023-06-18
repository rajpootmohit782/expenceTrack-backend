const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes"); // Import the expenseRoutes module
const salaryRoutes = require("./routes/salaryRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const resetRoutes = require("./routes/resetRoutes");
const premiumUserRoutes = require("./routes/premiumUserRoutes");
const sequelize = require("./db");
const { getDownloadExpenses } = require("./controllers/expenseController");
const { default: helmet } = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const app = express();
const PORT = process.env.PORT;

console.log(PORT);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes); // Use the expenseRoutes middleware for the "/expenses" endpoint
app.use("/salary", salaryRoutes);
app.use("/payment", paymentRoutes);
app.use("/api", premiumUserRoutes);
app.use("/reset", resetRoutes);
app.use("/download/:userId", getDownloadExpenses);

const logfile = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: logfile }));
// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
