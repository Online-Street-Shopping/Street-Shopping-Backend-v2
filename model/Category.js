const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class Category extends Model{
}

Category.init({
    categoryId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    categoryName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "Category",
    tableName: "category_master"

});

console.log( Category === sequelize.models.Category );


module.exports = Category;