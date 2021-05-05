const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Media extends Model{}

Media.init({
    mediaId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
    },
    FullPath: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    // mediaName: {
    //     type: Sequelize.STRING(200),
    //     allowNull: false,
    // },
    // extension: {
    //     type: Sequelize.STRING(200),
    //     allowNull: false,
    // },
    productId:{
        type: Sequelize.STRING(20),
    },
    marketId:{
        type: Sequelize.STRING(20),
    },
    reviewId:{
        type: Sequelize.STRING(20),
    },
    shopId:{
        type: Sequelize.STRING(20),
    },
    isVideo: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    mediaSize: {
        type: Sequelize.INTEGER(10),
    }, 
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Media",
    tableName: "media_master"
});

module.exports = Media;