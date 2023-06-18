const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.dbname,
  process.env.myusername,
  process.env.databasepass,
  {
    host: process.env.myhost,
    dialect: "mysql",
  }
);

module.exports = sequelize;
