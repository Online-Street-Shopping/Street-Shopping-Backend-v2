const express = require("express");
const { check } = require("express-validator");
const { getAllMarket, addMarket, updateMarket, deleteMarket } = require("../controller/market");
const Market = require("../model/Market");
const routes = express.Router();

routes.get(
    "/market",
    getAllMarket
);

routes.post(
    "/market",
    [
        check("addressId").isLength({ min: 20, max: 20 }).withMessage("addressId length must be equal to 20 !!"),
        check("marketName").isLength({ min: 1, max: 50 }).withMessage("market-name can't be empty !!"),
        check("rating").isLength({ min: 1, max: 1 }).withMessage("rating can't be empty !!"),
        check("marketImage").isLength({ min: 1, max: 1000 }).withMessage("market-image can't be empty !!"),
        check("marketVideo").isLength({ min: 1, max: 1000 }).withMessage("market-video can't be empty !!"),
    ],
    addMarket
);

routes.put(
    "/market/:marketId",
    [
        check("addressId").isLength({ min: 20, max: 20 }).withMessage("addressId length must be equal to 20 !!"),
        check("marketName").isLength({ min: 1, max: 50 }).withMessage("market-name can't be empty !!"),
        check("rating").isLength({ min: 1, max: 1 }).withMessage("rating can't be empty !!"),
        check("marketImage").isLength({ min: 1, max: 50 }).withMessage("market-image can't be empty !!"),
        check("marketVideo").isLength({ min: 1, max: 50 }).withMessage("market-video can't be empty !!"),
    ],
    updateMarket
);

routes.delete(
    "/market/:marketId",
    deleteMarket
);
module.exports = routes;