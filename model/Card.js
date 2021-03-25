const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Card extends Model{}

Card.init({
    cardId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    userId: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    cardNo: {
        type: Sequelize.INTEGER(16),
        allowNull: false,
    },
    cardType: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    cvvNo: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
    },
    nameOnCard: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    expiryDate: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Card",
    tableName: "card_master"
});

module.exports = Card;