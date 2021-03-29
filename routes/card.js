const express = require("express");
const { check } = require("express-validator");
const { getAllCard, getCardByCardId, addCard, updatecard, deleteCard } = require("../controller/card");
const routes = express.Router();

//get all card
routes.get(
    "/cards",
    getAllCard
);



//get all card by card id
routes.get(
    "/card/:cardId",
    getCardByCardId
);

//add card
routes.post(
    "/card",
    [
        check("userId").isLength({ min: 1, max: 50 }).withMessage("user id must be greater than 1 !!"),
        check("cardNo").isLength({ min: 1, max: 50 }).withMessage("card  no must be greater than 1 !!"),
        check("cardType").isLength({ min: 1, max: 50 }).withMessage("card  type must be greater than 1 !!"),
        check("cvvNo").isLength({ min: 3, max: 3 }).withMessage("cvv  no should be of exactlt 3 numbers !!"),
        check("expiryDate").isLength({ min: 1, max: 50 }).withMessage("expiry date must be greater than 1 !!"),
        check("nameOnCard").isLength({ min: 1, max: 50 }).withMessage("name on card must be greater than 1 !!"),
    ],
    addCard
);

//update card
routes.put(
    "/card/:cardId",
    [
        check("userId").isLength({ min: 1, max: 50 }).withMessage("user id must be greater than 1 !!"),
        check("cardNo").isLength({ min: 1, max: 50 }).withMessage("card  no must be greater than 1 !!"),
        check("cardType").isLength({ min: 1, max: 50 }).withMessage("card  type must be greater than 1 !!"),
        check("cvvNo").isLength({ min: 3, max: 3 }).withMessage("cvv  no should be of exactlt 3 numbers !!"),
        check("expiryDate").isLength({ min: 1, max: 50 }).withMessage("expiry date must be greater than 1 !!"),
        check("nameOnCard").isLength({ min: 1, max: 50 }).withMessage("name on card must be greater than 1 !!"),
    ],
    updatecard
);

//delete card
routes.delete(
    "/card/:cardId",
    deleteCard
);

module.exports = routes;