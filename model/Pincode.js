const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Pincode extends Model{
}

Pincode.init({
    pincodeId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    pincode: {
        type: Sequelize.INTEGER(8),
        allowNull: false
    },
    cityId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Pincode",
    tableName: "pincode_master"
});
console.log( Pincode === sequelize.models.Pincode );


module.exports = Pincode;