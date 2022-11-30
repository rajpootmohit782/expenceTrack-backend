const Sequelize = require("sequelize");

const sequelize = new Sequelize("shopback", "rajpootmohit782", "singhmohit", {
  host: "db4free.net",
  dialect: "mysql",
});

module.exports = sequelize;
