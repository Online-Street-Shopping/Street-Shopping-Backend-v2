const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class State extends Model{
}

State.init({
    stateId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    stateName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "State",
    tableName: "state_master"

});

console.log( State === sequelize.models.State );


module.exports = State;