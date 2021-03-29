const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class FeedbackDetail extends Model{}

FeedbackDetail.init({
    feedbackDetailsId: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    feedbackId: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    question: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "FeedbackDetail",
    tableName: "feedback_detail"
});

console.log( FeedbackDetail === sequelize.models.FeedbackDetail );

module.exports = FeedbackDetail;