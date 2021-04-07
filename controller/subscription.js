const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const BuySubscription = require("../model/BuySubscription");
const Subscription = require("../model/Subscription");
const Shop = require("../model/Shop");

Subscription.hasMany( BuySubscription, { as: "BuySubscription", foreignKey: "subscriptionId" });
BuySubscription.belongsTo( Subscription, { as: "Subscription", foreignKey: "subscriptionId" });

Shop.hasOne(BuySubscription, {as: "BuySubscription", foreignKey: "shopId"});
BuySubscription.belongsTo( Shop, { as: "Shop", foreignKey: "shopId" });


exports.getAllSubscription = async( req, res )=>{
    Subscription.findAll()
    .then(( subscriptions )=>{
        return res.status( 200 ).json( subscriptions );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

exports.getAllSubscriptionWithBuySubscription = async( req, res )=>{
    Subscription.findAll({
        include: [{
            model: BuySubscription, as: "BuySubscription",
            include: [{
                model: Shop, as: "Shop"
            }]
        }]
    })
    .then(( subscription )=>{
        return res.status(200).json( subscription );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })
};

//get all buySubscription with shop details
exports.getAllBuySubscriptionWithShop = async( req, res )=>{
    BuySubscription.findAll({
        include: [{
            model: Shop, as: "Shop",
        }]
    })
    .then(( buySubscription )=>{
        return res.status(200).json( buySubscription );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })
};

//exports.getAddressByUserId = async( req, res )=>{};

exports.getSubscriptionWithBuySubscriptionBySubscriptionId = async( req, res )=>{
    const subscriptionId = req.params.subscriptionId;
    
    Subscription.findOne({
        where: { subscriptionId },
        include: [
            {
                model: BuySubscription, as: "BuySubscription",
                include: [{
                    model: Shop, as: "Shop"
                }]
            }
        ]
    })
    .then(( subscription )=>{
        return res.status(200).json( subscription );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

//get by buySubscriptionId
exports.getBuySubscriptionByBuySubscriptionId = async( req, res )=>{
    const buySubscriptionId = req.params.buySubscriptionId;
    
    BuySubscription.findOne({
        where: { buySubscriptionId },
        include: [
            {
                model: Shop, as: "Shop",
            }
        ]
    })
    .then(( buySubscription )=>{
        return res.status(200).json( buySubscription );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

exports.addSubscription = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const { addedBy, subscriptionName, subscriptionDes, subscriptionPrice, duration } = req.body;
        const subscriptionId = generateUniqueId({
            length: 20
        });

        console.log(subscriptionId);

        Subscription.create({
            subscriptionId,
            addedBy,
            subscriptionName,
            subscriptionDes,
            subscriptionPrice,
            duration
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

exports.updateSubscription = async( req, res )=>{
    const subscriptionId = req.params.subscriptionId;
    const { addedBy, subscriptionName, subscriptionDes, subscriptionPrice, duration } = req.body;

    Subscription.findOne({ where: { subscriptionId }})
    .then(( subscription )=>{
        if( subscription ){
            subscription.update({
                addedBy,
                subscriptionName,
                subscriptionDes,
                subscriptionPrice,
                duration
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this subscriptionId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteSubscription = async( req, res )=>{
    const subscriptionId = req.params.subscriptionId;

    Subscription.destroy({
        where: { subscriptionId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "Subscription deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};