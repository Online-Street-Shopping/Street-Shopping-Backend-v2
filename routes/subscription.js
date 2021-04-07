const express = require("express");
const { check } = require("express-validator");
const { getAllSubscription, getAllSubscriptionWithBuySubscription, getSubscriptionWithBuySubscriptionBySubscriptionId, addSubscription, updateSubscription, deleteSubscription, getBuySubscriptionByBuySubscriptionId, getAllBuySubscriptionWithShop } = require("../controller/subscription");
const routes = express.Router();

//get all subscription
routes.get(
    "/subscriptions",
    getAllSubscription
);

//get all subscription along with buy subscription
routes.get(
    "/subscriptions/buySubscription",
    getAllSubscriptionWithBuySubscription
);

//get all buySubscription with shop details
routes.get(
    "/buySubscriptions/shop",
    getAllBuySubscriptionWithShop
);

//get all subscription along with buy subscription by id
routes.get(
    "/subscription/:subscriptionId",
    getSubscriptionWithBuySubscriptionBySubscriptionId
);

//get buySubscription with shop details by buySubscriptionId
routes.get(
    "/buySubscription/:buySubscriptionId",
    getBuySubscriptionByBuySubscriptionId
);

//add subscription
routes.post(
    "/subscription",
    [
        check("addedBy").isLength({ min: 1, max: 50 }).withMessage("addedBy must be greater than 1 !!"),
        check("subscriptionName").isLength({ min: 1, max: 50 }).withMessage("subscription name must be greater than 1 !!"),
        check("subscriptionDes").isLength({ min: 1, max: 50 }).withMessage("subscription description  must be greater than 1 !!"),
        check("subscriptionPrice").isLength({ min: 1, max: 20 }).withMessage("subscription price must be greater then 1 "),
        check("duration").isLength({ min: 1, max: 10 }).withMessage("duration must be greater then 1")
    ],
    addSubscription
);

//update subscription
routes.put(
    "/subscription/:subscriptionId",
    [
        check("addedBy").isLength({ min: 1, max: 50 }).withMessage("addedBy must be greater than 1 !!"),
        check("subscriptionName").isLength({ min: 1, max: 50 }).withMessage("subscription name must be greater than 1 !!"),
        check("subscriptionDes").isLength({ min: 1, max: 50 }).withMessage("subscription description  must be greater than 1 !!"),
        check("subscriptionPrice").isLength({ min: 1, max: 20 }).withMessage("subscription price must be greater then 1 "),
        check("duration").isLength({ min: 1, max: 10 }).withMessage("duration must be greater then 1")
    ],
    updateSubscription
);

//delete subscription
routes.delete(
    "/subscription/:subscriptionId",
    deleteSubscription
);

module.exports = routes;