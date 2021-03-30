const express = require("express");
const { check } = require("express-validator");
const { getAllState, getAllStateWithCity, getStateWithCityByStateId, addState, updateState, deleteState } = require("../controller/state");
const routes = express.Router();

//get all state
routes.get(
    "/states",
    getAllState
);

//get all state along with city 
routes.get(
    "/states/city",
    getAllStateWithCity
);

//get all state along with city  by id
routes.get(
    "/state/:stateId",
    getStateWithCityByStateId
);

//add state
routes.post(
    "/state",
    [
        check("stateName").isLength({ min: 1, max: 50 }).withMessage("state must be greater than 1 !!"),
    ],
    addState
);

//update state
routes.put(
    "/state/:stateId",
    [
        check("stateName").isLength({ min: 1, max: 50 }).withMessage("state must be greater than 1 !!"),
    ],
    updateState
);

//delete state
routes.delete(
    "/state/:stateId",
    deleteState
);

module.exports = routes;