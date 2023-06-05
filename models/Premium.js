const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const PremiumUser = sequelize.define("PremiumUser", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  signature: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ExpuserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// User has one PremiumUser

module.exports = PremiumUser;
