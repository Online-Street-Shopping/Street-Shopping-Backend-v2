const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Shop extends Model{}

Shop.init({
    shopId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    userId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    shopKepperName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    shopName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    video: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    images: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    marketId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    addressId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    shopRating: {
        type: Sequelize.INTEGER(5),
        allowNull: false
    },
    subCategoryId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Shop",
    tableName: "shop_master"
});

module.exports = Shop;