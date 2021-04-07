const { validationResult } = require("express-validator");
const generateUniqueId = require("generate-unique-id");

const Address = require("../model/Address");
const Market = require("../model/Market");

Address.hasOne( Market, { as:"Market", foreignKey: "addressId" });
Market.belongsTo( Address, { as: "Address", foreignKey: "addressId" });

exports.getAllMarket = async( req, res )=>{
    Market.findAll({
        // where: { addressId },
        include: [
            {
                model: Address, as: "Address"
            }
        ]
    })
    .then(( markets )=>{
        return res.status( 200 ).json( markets );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

exports.addMarket = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
        const marketId = generateUniqueId({
            length: 20
        });

        const { marketName, addressId, rating, marketImage, marketVideo } = req.body;

        Market.create({
            marketId,
            marketName,
            addressId,
            rating,
            marketImage,
            marketVideo
        })
        .then(( response )=>{
            res.status(200).json( response );
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

exports.updateMarket = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
        const marketId = req.params.marketId;

        Market.findOne({
            where: { marketId }
        })
        .then(( market )=>{
            if( market ){
                const { marketName, addressId, rating, marketImage, marketVideo } = req.body;
                market.update({
                    marketId,
                    marketName,
                    addressId,
                    rating,
                    marketImage,
                    marketVideo
                })
                .then(( response )=>{
                    return res.status(200).json(response);
                })
                .catch(( error )=>{
                    return res.status(402).json(error);
                });
            } else{
                return res.status(402).json({
                    error: "invalid market id !!!"
                });
            }
        })
        .catch(( error )=>{
            return res.status(402).json({
                error: "market not found !!!"
            });
        });
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

exports.deleteMarket = async( req, res )=>{
    const marketId = req.params.marketId;

    if( marketId ){
        Market.destroy({
            where: { marketId }
        })
        .then(( response )=>{
            if( response ){
                return res.status(200).json({
                    success: "Market deleted succesfuly !!"
                });
            }
        })
        .catch(( error )=>{
            return res.status(402).json(error);
        });
    } else{
        return res.status(402).json({
            error: "market-id not found !!!"
        });
    }
};

//  = async( req, res )=>{};
/*
const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
    } else{

    }
*/