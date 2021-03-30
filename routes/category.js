const express = require("express");
const { check } = require("express-validator");
const { getAllCategory, getAllCategoryWithSubCategory, getCategoryWithSubCategoryByCategoryId, addCategory, updateCategory, deleteCategory } = require("../controller/category");
const routes = express.Router();

//get all category
routes.get(
    "/categories",
    getAllCategory
);

//get all category along with sub category 
routes.get(
    "/categories/subCategory",
    getAllCategoryWithSubCategory
);

//get all category along with sub category by id
routes.get(
    "/category/:categoryId",
    getCategoryWithSubCategoryByCategoryId
);

//add state
routes.post(
    "/category",
    [
        check("categoryName").isLength({ min: 1, max: 50 }).withMessage("category name must be greater than 1 !!"),
    ],
    addCategory
);

//update category
routes.put(
    "/category/:categoryId",
    [
        check("categoryName").isLength({ min: 1, max: 50 }).withMessage("category name must be greater than 1 !!"),
    ],
    updateCategory
);

//delete category
routes.delete(
    "/category/:categoryId",
    deleteCategory
);

module.exports = routes;