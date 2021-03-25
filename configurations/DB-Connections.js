const Sequelize = require("sequelize");
const sequelize = new Sequelize("street-shopping", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
global.sequelize = sequelize;