const express = require("express");
const { check } = require("express-validator");
const { addFeedbackDetail, updateFeedbackDetail, deleteFeedbackDetail } = require("../controller/feedbackDetail");
const routes = express.Router();



//add feedback detail
routes.post(
    "/feedbackDetail",
    [
        check("feedbackId").isLength({ min: 1, max: 50 }).withMessage("feedback id must be greater than 1 !!"),
        check("question").isLength({ min: 1, max: 100 }).withMessage("qusetion must be greater than 1 !!"),
        check("answer").isLength({ min: 1, max: 100 }).withMessage("answer  must be greater than 1 !!"),
        ],
    addFeedbackDetail
);

//update feedback detail
routes.put(
    "/feedbackDetail/:feedbackDetailId",
    [
        check("feedbackId").isLength({ min: 1, max: 50 }).withMessage("feedback id must be greater than 1 !!"),
        check("question").isLength({ min: 1, max: 100 }).withMessage("qusetion must be greater than 1 !!"),
        check("answer").isLength({ min: 1, max: 100 }).withMessage("answer  must be greater than 1 !!"),
        ],
    updateFeedbackDetail
);

//delete feedback detail
routes.delete(
    "/feedbackDetail/:feedbackDetailId",
    deleteFeedbackDetail
);

module.exports = routes;