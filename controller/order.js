const { validationResult } = require("express-validator");
const generateUniqueId = require("generate-unique-id");

const Order = require("../model/Order");
const OrderDetails = require("../model/OrderDetails");
const Product = require("../model/Product");
const User = require("../model/User");

Order.hasMany( OrderDetails, { as: "OrderDetails", foreignKey: "orderId" });
OrderDetails.belongsTo( Order, { as: "Order", foreignKey: "orderId" });

Product.hasOne( OrderDetails, { as: "OrderDetails", foreignKey: "productId" });
OrderDetails.belongsTo( Product, { as: "Product", foreignKey: "productId" });

User.hasMany( Order, { as: "Order", foreignKey: "userId" });
Order.belongsTo( User, { as: "User", foreignKey: "userId" });

// Order.hasOne( User, { as: "User", foreignKey: "userId" });
// User.belongsTo( Order, { as: "Order", foreignKey: "userId" });

// OrderDetails.hasMany( Product, { as: "Product", foreignKey: "productId" });
// Product.belongsTo( OrderDetails, { as: "OrderDetails", foreignKey: "productId" });

exports.getOrders = async( req, res )=>{
    Order.findAll({
        include: [
            {
                model: OrderDetails, as: "OrderDetails",
                include: [{
                    model: Product, as: "Product"
                }]
            },
            {
                model: User, as: "User"
            },
            // {
            //     model: Product, as: "Product"
            // }
        ]
    })
    .then(( orders )=>{
        res.status( 200 ).json( orders );
    })
    .catch(( error )=>{
        res.status( 402 ).json( error );
    });
};

exports.getOrder = async( req, res )=>{
    const orderId = req.params.orderId;

    if( orderId ){
        Order.findOne({
            where: { orderId },
            include: [
                {
                    model: OrderDetails, as: "OrderDetails"
                }
            ]
        })
        .then(( order )=>{
            res.status( 200 ).json( order );
        })
        .catch(( error )=>{
            res.status( 402 ).json( error );
        });
    } else{
        res.status( 402 ).json({
            error: "Please provide order-id..."
        });
    }
};

exports.getOrderByUser = async( req, res )=>{
    const userId = req.params.userId;

    if( userId ){
        Order.findOne({
            where: { userId },
            include: [
                {
                    model: OrderDetails, as: "OrderDetails"
                }
            ]
        })
        .then(( order )=>{
            res.status( 200 ).json( order );
        })
        .catch(( error )=>{
            res.status( 402 ).json( error );
        });
    } else{
        res.status( 402 ).json({
            error: "Please provide user-id..."
        });
    }
};

exports.addOrder = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
        const { userId, addressId, grandAmount, orderStatus, paymentMode, cardId, deliveryType } = req.body;
        const products = req.body.products;
        const prices = req.body.prices;
        const quantity = req.body.quantity;

        const orderId = generateUniqueId({
            length: 20
        });

        await Order.create({
            orderId,
            userId,
            addressId,
            grandAmount,
            orderStatus,
            paymentMode,
            cardId,
            deliveryType
        })
        .then(( response )=>{
            let i = 0;
            console.log(products);
            products.forEach( productId => {
                // console.log( productId, i, quantity[i]);
                const detailsId = generateUniqueId({
                    length: 20
                });

                const subAmount = parseInt(prices[i]) * parseInt( quantity[i] );
                console.log(subAmount);
                OrderDetails.create({
                    detailsId,
                    orderId,
                    productId,
                    quantity: quantity[i],
                    subAmount
                })
                .then(( details )=>{
                    console.log(details);
                })
                .catch(( error )=>{
                    res.status( 402 ).json( error );
                    console.log(error);
                });
                i++;
            });
            res.status( 200 ).json( response );
        })
        .catch(( error )=>{
            res.status( 402 ).json( error );
        });
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

exports.updateOrder = async( req, res )=>{
    const validationErrors = validationResult( req );
    if( validationErrors.isEmpty() ){
        const orderId = req.params.orderId;
        const orderStatus = req.body.orderStatus;
    
        Order.findOne({
            where: { orderId }
        })
        .then(( order )=>{
            order.update({
                orderStatus
            })
            .then(( response )=>{
                res.status( 200 ).json( response );
            })
            .catch(( error )=>{
                res.status( 402 ).json( error );
            });
        })
        .catch(( error )=>{
            res.status( 402 ).json( error );
        });
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

exports.deleteOrder = async( req, res )=>{
    const orderId = req.params.orderId;

    if( orderId ){
        Order.destroy({
            where: { orderId },
            include: [
                {
                    model: OrderDetails, as: "OrderDetails"
                }
            ]
        })
        .then(( order )=>{
            res.status( 200 ).json( order );
        })
        .catch(( error )=>{
            res.status( 402 ).json( error );
        });
    } else{
        res.status( 402 ).json({
            error: "Please provide order-id to delete order..."
        });
    }
};

const getProductById = async( productId )=>{
    console.log("From getProduct");

    if( productId ){
        console.log("From getProduct");
        await Product.findOne({
            where: {
                productId
            }
        })
        .then(( product )=>{
        console.log("From getProduct-then");
        console.log("0000000-------------00000",product.price);
            return product;
        })
        .catch(( error )=>{
            console.log("From getProduct-catch");
            return error;
            // res.status( 402 ).json( error );
        });
    } else{
    }
};