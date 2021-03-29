const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class City extends Model{
}

City.init({
    cityId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    cityName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    stateId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "City",
    tableName: "city_master"
});
console.log( City === sequelize.models.City );


module.exports = City;