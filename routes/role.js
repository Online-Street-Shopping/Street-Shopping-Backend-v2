const express = require("express");
const { check } = require("express-validator");
const {  } = require("../controller/feedbackDetail");
const { addRole, updateRole, deleteRole } = require("../controller/role");
const routes = express.Router();



//add role 
routes.post(
    "/role",
    [
        check("roleName").isLength({ min: 1, max: 50 }).withMessage("role must be greater than 1 !!"),
        ],
    addRole
);

//update role 
routes.put(
    "/role/:roleId",
    [
        check("roleName").isLength({ min: 1, max: 50 }).withMessage("role must be greater than 1 !!"),
        ],
    updateRole
);

//delete role 
routes.delete(
    "/role/:roleId",
    deleteRole
);

module.exports = routes;