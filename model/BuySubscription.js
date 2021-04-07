const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class BuySubscription extends Model{}

BuySubscription.init({
    buySubscriptionId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    subscriptionId: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    shopId: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
    },
    subscriptionEndsAt: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "BuySubscription",
    tableName: "buy_subscription"
});

module.exports = BuySubscription;