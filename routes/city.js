const express = require("express");
const { check } = require("express-validator");
const { getAllCityWithPincode, getAllCity, getCityWithPincodeByCityId, addCity, updateCity, deleteCity } = require("../controller/city");
const routes = express.Router();

//get all city
routes.get(
    "/cities",
    getAllCity
);

//get all city along with pincode 
routes.get(
    "/cities/pincode",
    getAllCityWithPincode
);

//get all city along with pincode  by id
routes.get(
    "/city/:cityId",
    getCityWithPincodeByCityId
);

//add city
routes.post(
    "/city",
    [
        check("stateId").isLength({ min: 1, max: 50 }).withMessage("state id must be greater than 1 !!"),
        check("cityName").isLength({ min: 1, max: 50 }).withMessage("city must be greater than 1 !!"),
    ],
    addCity
);

//update city
routes.put(
    "/city/:cityId",
    [
        check("stateId").isLength({ min: 1, max: 50 }).withMessage("state id must be greater than 1 !!"),
        check("cityName").isLength({ min: 1, max: 50 }).withMessage("city must be greater than 1 !!"),
    ],
    updateCity
);

//delete city
routes.delete(
    "/city/:cityId",
    deleteCity
);

module.exports = routes;