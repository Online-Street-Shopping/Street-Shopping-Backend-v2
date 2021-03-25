const express = require("express");
const { check } = require("express-validator");
const { getAllAddress, getAllAddressWithUser, addAddress, updateAddress, deleteAddress } = require("../controller/address");
const routes = express.Router();

routes.get(
    "/addresses",
    getAllAddress
);

routes.get(
    "/address/user",
    getAllAddressWithUser
);

routes.post(
    "/address",
    [
        check("userId").isLength({ min: 20, max: 20 }).withMessage("Please enter valid userId !!"),
        check("line1").isLength({ min: 5, max: 50 }).withMessage("line1 must be greater than 3 !!"),
        check("line2").isLength({ min: 5, max: 50 }).withMessage("line2 must be greater than 3 !!"),
        check("line3").isLength({ min: 5, max: 50 }).withMessage("line3 must be greater than 3 !!"),
        check("pincodeId").isLength({ min: 20, max: 20 }).withMessage("please enter valid pincodeId !!! "),
        check("addressType").isLength({ min: 4, max: 10 }).withMessage("email is not valid...")
    ],
    addAddress
);

routes.put(
    "/address/:addressId",
    [
        check("userId").isLength({ min: 20, max: 20 }).withMessage("Please enter valid userId !!"),
        check("line1").isLength({ min: 5, max: 50 }).withMessage("line1 must be greater than 3 !!"),
        check("line2").isLength({ min: 5, max: 50 }).withMessage("line2 must be greater than 3 !!"),
        check("line3").isLength({ min: 5, max: 50 }).withMessage("line3 must be greater than 3 !!"),
        check("pincodeId").isLength({ min: 20, max: 20 }).withMessage("please enter valid pincodeId !!! "),
        check("addressType").isLength({ min: 4, max: 10 }).withMessage("email is not valid...")
    ],
    updateAddress
);

routes.delete(
    "/address/:addressId",
    deleteAddress
);

module.exports = routes;