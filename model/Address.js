const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Address extends Model{}

Address.init({
    addressId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    line1: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    line2: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    line3: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    pincodeId: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    addressType: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Address",
    tableName: "user_address"
});

module.exports = Address;