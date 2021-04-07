const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Product extends Model{}

Product.init({
    productId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    shopId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    productName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER(5),
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER(3),
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
    modelName: "Product",
    tableName: "product_master"
});

module.exports = Product;