const express = require("express");
const { check } = require("express-validator");
const { getAllPincode, getPincodeByPincodeId, addPincode, updatePincode, deletePincode } = require("../controller/pincode");
const routes = express.Router();

//get all pincode
routes.get(
    "/pincodes",
    getAllPincode
);



//get all pincode by pincode id
routes.get(
    "/pincode/:pincodeId",
    getPincodeByPincodeId
);

//add pincode
routes.post(
    "/pincode",
    [
        check("pincode").isLength({ min: 1, max: 50 }).withMessage("pincode must be greater than 1 !!"),
        check("cityId").isLength({ min: 1, max: 50 }).withMessage("city id must be greater than 1 !!"),
    ],
    addPincode
);

//update city
routes.put(
    "/pincode/:pincodeId",
    [
        check("pincode").isLength({ min: 1, max: 50 }).withMessage("pincode must be greater than 1 !!"),
        check("cityId").isLength({ min: 1, max: 50 }).withMessage("city id must be greater than 1 !!"),
    ],
    updatePincode
);

//delete pincode
routes.delete(
    "/pincode/:pincodeId",
    deletePincode
);

module.exports = routes;