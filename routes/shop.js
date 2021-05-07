const express = require("express");
const { check } = require("express-validator");
const { 
    getShops, 
    getShop, 
    getShopsWithProducts,
    getShopByProduct,
    getShopWithProduct,
    addShop,
    updateShop,
    deleteShop,
    getShopsFromMarketId
} = require("../controller/shop");
const routes = express.Router();

routes.get(
    "/shops",
    getShops
);

routes.get(
    "/shop/:shopId",
    getShop
);

// get shops from market Id
routes.get( 
    "/shop/market/:marketId",
    getShopsFromMarketId
);

routes.get(
    "/shops/products/",
    getShopsWithProducts
);

routes.get(
    "/shop/product/:shopId",
    getShopWithProduct
);

routes.post(
    "/shop",
    [
        check("userId").isLength({ min: 20, max: 20 }).withMessage("userId length must be equal to 20 !!"),
        check("addressId").isLength({ min: 20, max: 20 }).withMessage("addressId length must be equal to 20 !!"),
        check("shopKeeperName").isLength({ min: 5, max: 50 }).withMessage("shopKeeperName cant'be empty !!!"),
        check("shopName").isLength({ min: 5, max: 50 }).withMessage("shopName cant'be empty !!!"),
        check("video").isLength({ min: 5, max: 50 }).withMessage("paymentMode cant'be empty !!!"),
        check("images").isLength({ min: 5, max: 50 }).withMessage("deliveryType cant'be empty !!!"),
        check("marketId").isLength({ min: 20, max: 20 }).withMessage("marketId length must be equal to 20 !!"),
        check("subCategoryId").isLength({ min: 20, max: 20 }).withMessage("subCategoryId length must be equal to 20 !!"),
        check("shopRating").isLength({ min: 1, max: 1 }).withMessage("shopRating length must be equal to 1 !!"),
    ],
    addShop
);

routes.put(
    "/shop/:shopId",
    [
        check("userId").isLength({ min: 20, max: 20 }).withMessage("userId length must be equal to 20 !!"),
        check("addressId").isLength({ min: 20, max: 20 }).withMessage("addressId length must be equal to 20 !!"),
        check("shopKeeperName").isLength({ min: 5, max: 50 }).withMessage("shopKeeperName cant'be empty !!!"),
        check("shopName").isLength({ min: 5, max: 50 }).withMessage("shopName cant'be empty !!!"),
        check("video").isLength({ min: 5, max: 50 }).withMessage("paymentMode cant'be empty !!!"),
        check("images").isLength({ min: 5, max: 50 }).withMessage("deliveryType cant'be empty !!!"),
        check("marketId").isLength({ min: 20, max: 20 }).withMessage("marketId length must be equal to 20 !!"),
        check("subCategoryId").isLength({ min: 20, max: 20 }).withMessage("subCategoryId length must be equal to 20 !!"),
        check("shopRating").isLength({ min: 1, max: 1 }).withMessage("shopRating length must be equal to 1 !!"),
    ],
    updateShop
);

routes.delete(
    "/shop/:shopId",
    deleteShop
);

module.exports = routes;