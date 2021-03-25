const express = require("express");
const { getUserDetailsById } = require("../controller/user");
const routes = express.Router();

routes.get(
    "/user/details/:userId",
    getUserDetailsById
);

module.exports = routes;