const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class User extends Model{}

User.init({
    userId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    emailId: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    userRole: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    profileImage: {
        type: Sequelize.STRING(50)
    },
    contactNo: {
        type: Sequelize.INTEGER(10),
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "User",
    tableName: "user_master"
});

console.log( User === sequelize.models.User );

module.exports = User;