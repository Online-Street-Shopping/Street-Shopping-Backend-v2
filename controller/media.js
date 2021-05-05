const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");
const Media = require("../model/Media");
const { response } = require("express");

exports.getAllMedia = async( req, res )=>{
    Media.findAll()
    .then(( response )=>{
        res.status( 200 ).json( response );
    })
    .catch(( error )=>{
        res.status( 402 ).json( error );
    });
};

exports.getMediaById = async( req, res )=>{

    const mediaId = req.params.mediaId;

    Media.findAll({ where: { mediaId }})
    .then(( response )=>{
        res.status( 200 ).json( response );
    })
    .catch(( error )=>{
        res.status( 402 ).json( error );
    });
};

exports.addMedia = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
        const { FullPath, mediaName, extension, productId, reviewId, marketId, isVideo, shopId, mediaSize } = req.body;
        
        const mediaId = generateUniqueId({
            length: 20
        });
        
        Media.create({
            mediaId,
            FullPath,
            mediaName,
            extension,
            productId,
            reviewId,
            marketId,
            isVideo,
            shopId,
            mediaSize
        }).then(( response )=>{
            res.status( 200 ).json( response );
        }).catch(( error )=>{
            res.status( 402 ).json( error );
        });
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

exports.updateMedia = async( req, res )=>{
    const mediaId = req.params.mediaId;
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() && mediaId ){
        const { FullPath, mediaName, extension, isProduct, isReview, isMarket, isVideo, isShop, mediaSize } = req.body;

        Media.findOne({ where: { mediaId }})
        .then(( response )=>{
            if( response ){
                response.update({
                    FullPath,
                    mediaName,
                    extension,
                    isProduct,
                    isReview,
                    isMarket,
                    isVideo,
                    isShop,
                    mediaSize
                }).then(( response )=>{
                    return res.status(200).json(response);
                })
                .catch(( error )=>{
                    return res.status(402).json(error);
                });
            }
        }).catch(( error )=>{
            return res.status(402).json(error);
        });
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};