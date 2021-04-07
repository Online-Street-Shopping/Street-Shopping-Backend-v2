const express = require("express");
const { check } = require("express-validator");
const { addBuySubscription, updateBuySubscription, deleteBuySubscription } = require("../controller/buySubscription");
const routes = express.Router();



//add  buySubscription
routes.post(
    "/buySubscription",
    [
        check("subscriptionId").isLength({ min: 1, max: 50 }).withMessage("subscription id must be greater than 1 !!"),
        check("shopId").isLength({ min: 1, max: 50 }).withMessage("shop id must be greater than 1 !!"),
        ],
    addBuySubscription
);

//update buySubscription 
routes.put(
    "/buySubscription/:buySubscriptionId",
    [
        check("subscriptionId").isLength({ min: 1, max: 50 }).withMessage("subscription id must be greater than 1 !!"),
        check("shopId").isLength({ min: 1, max: 50 }).withMessage("shop id must be greater than 1 !!"),
        ],
    updateBuySubscription
);

//delete  buySubscription
routes.delete(
    "/buySubscription/:buySubscriptionId",
    deleteBuySubscription
);

module.exports = routes;