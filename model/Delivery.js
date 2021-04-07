const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Delivery extends Model{
}

Delivery.init({
    deliveryId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    orderId: {
        type: Sequelize.INTEGER(8),
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    deliveryStatus: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Delivery",
    tableName: "delivery_master"
});
console.log( Delivery === sequelize.models.Delivery );


module.exports = Delivery;