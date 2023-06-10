const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const { v4: uuidv4 } = require("uuid");
const User = require("./user");

const ForgotPasswordRequest = sequelize.define("ForgotPasswordRequest", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

ForgotPasswordRequest.beforeCreate((request) => {
  request.id = uuidv4();
});

module.exports = ForgotPasswordRequest;
