const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Market extends Model{
}

Market.init({
    marketId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    marketName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    addressId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER(5),
        allowNull: false
    },
    marketImage: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    marketVideo: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Market",
    tableName: "market_master"
});

module.exports = Market;