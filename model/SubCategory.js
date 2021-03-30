const { Sequelize, Model } = require("sequelize");
const sequelize = require("../configurations/DB-Connections");

class SubCategory extends Model{
}

SubCategory.init({
    subCategoryId: {
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    subCategoryName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    categoryId: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    sequelize,
    modelName: "SubCategory",
    tableName: "sub_category_master"
});
console.log( SubCategory === sequelize.models.SubCategory );


module.exports = SubCategory;