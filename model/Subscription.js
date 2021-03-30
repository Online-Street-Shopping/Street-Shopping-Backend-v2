const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Subscription extends Model{}

Subscription.init({
    subscriptionId: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    addedBy: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    subscriptionName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    subscriptionDes: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    subscriptionPrice: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Subscription",
    tableName: "subscription_master"
});

console.log( Subscription === sequelize.models.Subscription );

module.exports = Subscription;