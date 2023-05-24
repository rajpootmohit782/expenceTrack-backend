const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes"); // Import the expenseRoutes module
const salaryRoutes = require("./routes/salaryRoutes");
const sequelize = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes); // Use the expenseRoutes middleware for the "/expenses" endpoint
app.use("/salary", salaryRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
