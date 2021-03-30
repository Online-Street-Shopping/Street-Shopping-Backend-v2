const express = require("express");
const { check } = require("express-validator");
const {  } = require("../controller/address");
const { getAllFeedback, getAllFeedbackWithFeedbackDetail, getFeedbackWithFeedbackDetailByFeedbackId, addFeedback, updateFeedback, deleteFeedback } = require("../controller/feedback");
const routes = express.Router();

//get all feedback
routes.get(
    "/feedbacks",
    getAllFeedback
);

//get all feedback along with feedback details
routes.get(
    "/feedbacks/feedbackDetails",
    getAllFeedbackWithFeedbackDetail
);

//get all feedback along with feedback details by id
routes.get(
    "/feedback/:feedbackId",
    getFeedbackWithFeedbackDetailByFeedbackId
);

//add feedback
routes.post(
    "/feedback",
    [
        check("feedbackTitle").isLength({ min: 1, max: 50 }).withMessage("feedback title must be greater than 1 !!"),
        check("feedbackDescription").isLength({ min: 1, max: 50 }).withMessage("feedback description must be greater than 1 !!"),
        check("addedBy").isLength({ min: 1, max: 50 }).withMessage("addedby  must be greater than 1 !!"),
        check("isForUser").isLength({ min: 1, max: 20 }).withMessage("is for user must be greater then 1 "),
        check("isForVendor").isLength({ min: 1, max: 10 }).withMessage("is vendor must be greater then 1")
    ],
    addFeedback
);

//update feedback
routes.put(
    "/feedback/:feedbackId",
    [
        check("feedbackTitle").isLength({ min: 1, max: 50 }).withMessage("feedback title must be greater than 1 !!"),
        check("feedbackDescription").isLength({ min: 1, max: 50 }).withMessage("feedback description must be greater than 1 !!"),
        check("addedBy").isLength({ min: 1, max: 50 }).withMessage("addedby  must be greater than 1 !!"),
        check("isForUser").isLength({ min: 1, max: 20 }).withMessage("is for user must be greater then 1 "),
        check("isForVendor").isLength({ min: 1, max: 10 }).withMessage("is vendor must be greater then 1")
    ],
    updateFeedback
);

//delete feedback
routes.delete(
    "/feedback/:feedbackId",
    deleteFeedback
);

module.exports = routes;