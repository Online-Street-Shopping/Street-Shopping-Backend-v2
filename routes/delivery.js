const express = require("express");
const { check } = require("express-validator");
const { getAllDelivery, getAllDeliveryWithDeliveryBoyAndOrder, getDeliveryByDeliveryId, getDeliveryByDeliveryBoy, updateDelivery, deleteDelivery, addDelivery } = require("../controller/delivery");
const routes = express.Router();

//get all delivery
routes.get(
    "/deliveries",
    getAllDelivery
);

//get all delivery along with order and user
routes.get(
    "/delivery/order",
    getAllDeliveryWithDeliveryBoyAndOrder
);

//get all delivery by deliverId
routes.get(
    "/delivery/:deliveryId",
    getDeliveryByDeliveryId
);

//get delivery by delivery boy(userId)
routes.get(
    "/delivery/:userId",
    getDeliveryByDeliveryBoy
);



//add delivery
routes.post(
    "/delivery",
    [
        check("orderId").isLength({ min: 1, max: 50 }).withMessage("orderId must be greater than 1 !!"),
        check("userId").isLength({ min: 1, max: 50 }).withMessage("userId name must be greater than 1 !!"),
        check("deliveryStatus").isLength({ min: 1, max: 50 }).withMessage("delivery status description  must be greater than 1 !!"),
    ],
    addDelivery
);

//update delivery
routes.put(
    "/delivery/:deliveryId",
    [
        check("orderId").isLength({ min: 1, max: 50 }).withMessage("orderId must be greater than 1 !!"),
        check("userId").isLength({ min: 1, max: 50 }).withMessage("userId name must be greater than 1 !!"),
        check("deliveryStatus").isLength({ min: 1, max: 50 }).withMessage("delivery status description  must be greater than 1 !!"),
    ],
    updateDelivery
);

//delete delivery
routes.delete(
    "/delivery/:deliveryId",
    deleteDelivery
);

module.exports = routes;