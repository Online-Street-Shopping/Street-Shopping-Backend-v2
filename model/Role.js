const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Role extends Model{
}

Role.init({
    roleId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    roleName: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Role",
    tableName: "user_role"
});
console.log( Role === sequelize.models.Role );


module.exports = Role;