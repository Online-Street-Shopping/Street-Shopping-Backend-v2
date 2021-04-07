const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Order extends Model{}

Order.init({
    orderId: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    userId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    addressId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    grandAmount: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    orderStatus: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    paymentMode: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    cardId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    deliveryType: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Order",
    tableName: "order_master"
});

module.exports = Order;