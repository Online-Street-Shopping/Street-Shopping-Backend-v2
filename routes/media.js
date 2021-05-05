const express = require("express");
const { check } = require("express-validator");
const { getAllMedia, getMediaById, addMedia, updateMedia } = require("../controller/media");
const routes = express.Router();

routes.get(
    "/medias",
    getAllMedia
);

routes.get(
    "/media/:mediaId",
    getMediaById
);

routes.post(
    "/media",
    addMedia
);

routes.put(
    "/media",
    updateMedia
);

module.exports = routes;