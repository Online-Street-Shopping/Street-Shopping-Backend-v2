const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Feedback extends Model{}

Feedback.init({
    feedbackId: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    feedbackTitle: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    feedbackDescription: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    addedBy: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    isForUser: {
        type: Sequelize.BOOLEAN(),
        allowNull: false
    },
    isForVendor: {
        type: Sequelize.BOOLEAN(),
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Feedback",
    tableName: "feedback_master"
});

console.log( Feedback === sequelize.models.Feedback );

module.exports = Feedback;