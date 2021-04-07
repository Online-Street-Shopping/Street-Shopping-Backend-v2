const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const Delivery = require("../model/Delivery");
const Order = require("../model/Order");
const User = require("../model/User");

Delivery.hasMany( Order, { as: "Order", foreignKey: "orderId" });
Order.belongsTo( Delivery, { as: "Delivery", foreignKey: "orderId" });

User.hasMany( Delivery, { as: "Delivery", foreignKey: "userId" });
Delivery.belongsTo( User, { as: "User", foreignKey: "userId" });


//get all delivery
exports.getAllDelivery = async( req, res )=>{
    Delivery.findAll()
    .then(( deliveries )=>{
        return res.status( 200 ).json( deliveries );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

//get all delivery along with order and deliveryBoy(user)
exports.getAllDeliveryWithDeliveryBoyAndOrder = async( req, res )=>{
    Delivery.findAll({
        include: [
            {
                model: Order, as: "Order",
            },
            {
                model: User, as: "User",
            }
        ]
    })
    .then(( delivery )=>{
        return res.status(200).json( delivery );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })
};

//get all delivery by deliverId
exports.getDeliveryByDeliveryId = async( req, res )=>{
    const deliveryId = req.params.deliveryId;
    
    Delivery.findOne({
        where: { deliveryId },
        include: [
            {
                model: Order, as: "Order",
            },
            {
                model: User, as: "User",
            }
        ]
    })
    .then(( delivery )=>{
        return res.status(200).json( delivery );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

//get delivery by delivery boy(userId)
exports.getDeliveryByDeliveryBoy = async( req, res )=>{
    const deliveryId = req.params.deliveryId;
    
    Delivery.findOne({
        where: { userId },
        include: [
            {
                model: User, as: "User",
            }
        ]
    })
    .then(( delivery )=>{
        return res.status(200).json( delivery );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

//add delivery
exports.addDelivery = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const { orderId, userId, deliveryStatus } = req.body;
        const deliveryId = generateUniqueId({
            length: 20
        });

        console.log(deliveryId);

        Delivery.create({
            deliveryId,
            orderId,
            userId,
            deliveryStatus
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

//update delivery
exports.updateDelivery = async( req, res )=>{
    const deliveryId = req.params.deliveryId;
    const { orderId, userId, deliveryStatus } = req.body;

    Delivery.findOne({ where: { deliveryId }})
    .then(( delivery )=>{
        if( delivery ){
            delivery.update({
                orderId,
                userId,
                deliveryStatus
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this deliveryId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

//delete delivery
exports.deleteDelivery = async( req, res )=>{
    const deliveryId = req.params.deliveryId;

    Delivery.destroy({
        where: { deliveryId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "Delivery deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};