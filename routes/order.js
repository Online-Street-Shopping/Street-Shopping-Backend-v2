const express = require("express");
const { check } = require("express-validator");
const { 
    getOrders, 
    getOrderByUser, 
    getOrder,
    deleteOrder,
    addOrder,
    updateOrder
} = require("../controller/order");
const routes = express.Router();

routes.get(
    "/orders",
    getOrders
);

routes.get(
    "/order/:orderId",
    getOrder
);

routes.get(
    "/order/user/:userId",
    getOrderByUser
);

routes.post(
    "/order",
    [
        check("userId").isLength({ min: 20, max: 20 }).withMessage("userId length must be equal to 20 !!"),
        check("addressId").isLength({ min: 20, max: 20 }).withMessage("addressId length must be equal to 20 !!"),
        check("grandAmount").isLength({ min: 1 }).withMessage("grandAmount cant'be empty !!!"),
        check("orderStatus").isLength({ min: 1 }).withMessage("orderStatus cant'be empty !!!"),
        check("paymentMode").isLength({ min: 1 }).withMessage("paymentMode cant'be empty !!!"),
        check("deliveryType").isLength({ min: 1 }).withMessage("deliveryType cant'be empty !!!"),
        check("cardId").isLength({ min: 20, max: 20 }).withMessage("cardId length must be equal to 20 !!"),
    ],
    addOrder
);

routes.put(
    "/order/:orderId",
    updateOrder
);

// routes.delete(
//     "/order/:orderId",
//     deleteOrder
// );

module.exports = routes;