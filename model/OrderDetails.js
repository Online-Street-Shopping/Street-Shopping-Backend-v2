const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class OrderDetails extends Model{}

OrderDetails.init({
    detailsId: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    orderId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    productId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    subAmount: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "OrderDetails",
    tableName: "order_details"
});

module.exports = OrderDetails;