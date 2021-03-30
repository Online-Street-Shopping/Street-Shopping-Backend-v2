const express = require("express");
const { check } = require("express-validator");
const { getAllSubCategory, getSubCategoryBySubCategoryId, addSubCategory, updateSubCategory, deleteSubCategory,  } = require("../controller/subCategory");
const routes = express.Router();

//get all sub category
routes.get(
    "/subCategories",
    getAllSubCategory
);



//get all subCategory by subCategory id
routes.get(
    "/subCategory/:subCategoryId",
    getSubCategoryBySubCategoryId
);

//add subCategory
routes.post(
    "/subCategory",
    [
        check("subCategoryName").isLength({ min: 1, max: 50 }).withMessage("sub category name must be greater than 1 !!"),
        check("categoryId").isLength({ min: 1, max: 50 }).withMessage("category id must be greater than 1 !!"),
    ],
    addSubCategory
);

//update subCategory
routes.put(
    "/subCategory/:subCategoryId",
    [
        check("subCategoryName").isLength({ min: 1, max: 50 }).withMessage("sub category name must be greater than 1 !!"),
        check("categoryId").isLength({ min: 1, max: 50 }).withMessage("category id must be greater than 1 !!"),
    ],
    updateSubCategory
);

//delete subCategory
routes.delete(
    "/subCategory/:subCategoryId",
    deleteSubCategory
);

module.exports = routes;