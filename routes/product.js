const express = require("express");
const routes = express.Router();
const { check } = require("express-validator");
const { 
    getProducts, 
    getProductByShop, 
    getProduct, 
    getProductByCategory, 
    addProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controller/product");

// get-all-products
routes.get(
    "/products",
    getProducts
);

// get product by id
routes.get(
    "/product/:productId",
    getProduct
);

// get product by shop
routes.get(
    "/product/shop/:shopId",
    getProductByShop
);

// get product by category/subCategory
routes.get(
    "/product/category/:subCategoryId",
    getProductByCategory
);

// add product
routes.post(
    "/product",
    [
        check("shopId").isLength({ min: 20, max: 20 }).withMessage("shopId length must be equal to 20 !!"),
        check("productName").isLength({ min: 5, max: 50 }).withMessage("productName length must be 5 "),
        check("description").isLength({ min: 5, max: 100 }).withMessage("description length must be 5 "),
        check("price").isLength({ min: 1, max: 5 }).withMessage("price length must be 5 "),
        check("stock").isLength({ min: 1, max: 5 }).withMessage("stock length must be 5 "),
        check("subCategoryId").isLength({ min: 20, max: 20 }).withMessage("categoryId length must be equal to 20 !!"),
    ],
    addProduct
)

// update product
routes.put(
    "/product/:productId",
    [
        check("shopId").isLength({ min: 20, max: 20 }).withMessage("shopId length must be equal to 20 !!"),
        check("productName").isLength({ min: 5, max: 50 }).withMessage("productName length must be 5 "),
        check("description").isLength({ min: 5, max: 100 }).withMessage("description length must be 5 "),
        check("price").isLength({ min: 1, max: 5 }).withMessage("price length must be 5 "),
        check("stock").isLength({ min: 1, max: 5 }).withMessage("stock length must be 5 "),
        check("subCategoryId").isLength({ min: 20, max: 20 }).withMessage("categoryId length must be equal to 20 !!"),
    ],
    updateProduct
);

// delete product
routes.delete(
    "/product/:productId",
    deleteProduct
);

module.exports = routes;