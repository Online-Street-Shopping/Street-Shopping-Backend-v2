const Sequelize = require("sequelize");
const Client = require("ssh2").Client;
// const sequelize = new Sequelize("epiz_28331744_street_shopping", "epiz_28331744", "OKT7c5Bc3H3i2Mb", {
//     host: "sql105.epizy.com",
//     dialect: "mysql",
// });

// const Connection = new Client();

// Connection.on("ready", ()=>{
// 	console.log("Clien");
// });

// const sequelize = new Sequelize("3801250_streetshopping", "3801250_streetshopping", "Aakash@987", {
//   host: "fdb29.awardspace.net",
//   dialect: "mysql",
// });

const sequelize = new Sequelize("street_shopping", "admin", "rootroot", {
    host: "street-shopping1.c0ndxw1eox5h.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
});

// const sequelize = new Sequelize("street-shopping", "root", "", {
//     host: "localhost",
//     dialect: "mysql",
// });

// try {
//     sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

module.exports = sequelize;
global.sequelize = sequelize;