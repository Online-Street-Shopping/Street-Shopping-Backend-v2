const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const BuySubscription = require("../model/BuySubscription");




exports.addBuySubscription = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const { subscriptionId, shopId, subscriptionEndsAt } = req.body;
        const buySubscriptionId = generateUniqueId({
            length: 20
        });

        console.log(buySubscriptionId);

        BuySubscription.create({
            buySubscriptionId,
            subscriptionId,
            shopId,
            subscriptionEndsAt
        })
        .then(( response )=>{
            return res.status(200).json(response);
        })
        .catch(( error )=>{
            return res.status(402).json(error);
        });
    } else {
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

exports.updateBuySubscription = async( req, res )=>{
    const buySubscriptionId = req.params.buySubscriptionId;
    const { subscriptionId, shopId, subscriptionEndsAt } = req.body;

    BuySubscription.findOne({ where: { buySubscriptionId }})
    .then(( buySubscriptions )=>{
        if( buySubscriptions ){
            buySubscriptions.update({
                subscriptionId,
                shopId,
                subscriptionEndsAt
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this buySubscriptionId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteBuySubscription = async( req, res )=>{
    const buySubscriptionId = req.params.buySubscriptionId;

    BuySubscription.destroy({
        where: { buySubscriptionId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "BuySubscription  deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};